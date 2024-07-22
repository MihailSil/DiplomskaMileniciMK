const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db'); // Import the database connection
const session = require('express-session'); // For handling sessions
const bcrypt = require('bcryptjs'); // Import bcryptjs for password hashing
const multer = require('multer'); // For handling file uploads
const fs = require('fs'); // For file system operations

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup sessions
app.use(session({
  secret: 'your_secret_key', // Replace with your own secret key
  resave: false,
  saveUninitialized: true
}));

// Middleware to check if user is logged in
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isAuthenticated;
  res.locals.username = req.session.username;
  next();
});

// Middleware to ensure the user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.session.isAuthenticated) {
    return next();
  } else {
    res.redirect('/login');
  }
}

// Middleware to ensure the user is an admin
function ensureAdmin(req, res, next) {
  if (req.session.isAuthenticated && req.session.is_admin) {
    return next();
  } else {
    res.redirect('/');
  }
}

// Middleware to redirect authenticated users away from login and register pages
function redirectIfAuthenticated(req, res, next) {
  if (req.session.isAuthenticated) {
    return res.redirect('/');
  }
  next();
}


// Serve static files from the 'public' directory within 'views'
app.use(express.static(path.join(__dirname, 'views')));


app.use(express.static('uploads')); // Serve images from the 'uploads' directory


// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });


app.use('/uploads', express.static('uploads'));


// Create 'uploads' directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}


// Routes
app.get('/', (_req, res) => {
    res.render('index');
});

app.get('/login', redirectIfAuthenticated, (req, res) => {
  res.render('login');
});

app.get('/register', redirectIfAuthenticated, (req, res) => {
  res.render('register');
});

app.get('/vdomi', (req, res) => {
  // Fetch posts from your database
  db.query('SELECT * FROM posts', (err, results) => {
    if (err) {
      console.error('Error fetching posts:', err);
      return res.status(500).send('Internal Server Error');
    }

    // Pass fetched posts to the EJS template for rendering
    res.render('vdomi', { posts: results }); // Assuming 'vdomi.ejs' is your EJS template
  });
});

app.get('/oglas', ensureAuthenticated, (req, res) => {
  const userId = req.session.user_id;
  const query = 'SELECT * FROM posts WHERE user_id = ?';

  db.query(query, [userId], (err, results) => {
      if (err) {
          console.error('Error fetching posts:', err);
          return res.status(500).send('Error fetching posts');
      }

      res.render('oglas', { posts: results });
  });
});

app.post('/edit-post/:id', upload.single('picture'), (req, res) => {
  const postId = req.params.id;
  const { name, phone, email, pet_type, description } = req.body;
  
  // Get the uploaded file if exists
  let picture = req.file ? `/uploads/${req.file.filename}` : null;

  // Function to update post with new or existing picture
  const updatePost = (picturePath) => {
    // Call the stored procedure to update the post
    const sql = 'CALL EditPost(?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [postId, name, phone, email, pet_type, description, picturePath], (err, result) => {
      if (err) {
        console.error('Error updating post:', err);
        return res.status(500).json({ success: false, message: 'Server error.' });
      }
      res.redirect('/oglas'); // Redirect to the oglas page after successful edit
    });
  };

  // If no new picture is uploaded, use the existing one
  if (!picture) {
    const getExistingPictureQuery = 'SELECT picture FROM posts WHERE id = ?';
    db.query(getExistingPictureQuery, [postId], (err, results) => {
      if (err) {
        console.error('Error fetching the existing picture:', err);
        return res.status(500).json({ success: false, message: 'Server error.' });
      }
      if (results.length > 0) {
        picture = results[0].picture;
        updatePost(picture);
      } else {
        res.status(404).json({ success: false, message: 'Post not found.' });
      }
    });
  } else {
    updatePost(picture);
  }
});

app.post('/delete-post/:id', (req, res) => {
  const postId = req.params.id;
  const userId = req.session.user_id; // assuming the user ID is stored in the session

  db.query('CALL DeletePost(?, ?)', [postId, userId], (err, results) => {
    if (err) {
      console.error('Error deleting post:', err);
      return res.status(500).json({ success: false, message: 'Внатрешна грешка на серверот.' });
    }
    res.redirect('/oglas');
  });
});

app.get('/za-nas', (req, res) => {
    res.render('za-nas'); // Renders 'views/login.ejs'
});

  // Admin panel route
  app.get('/admin', ensureAdmin, (req, res) => {
    const sql = 'SELECT * FROM posts';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching posts:', err);
        return res.status(500).send('Server error.');
      }
      res.render('admin', { username: req.session.username, posts: results });
    });
  });

// Route to delete a post
app.post('/admin/delete-post', ensureAdmin, (req, res) => {
  const postId = req.body.postId;

  // Call the stored procedure to delete the post
  const sql = 'CALL AdminDeletePost(?)';
  db.query(sql, [postId], (err, results) => {
    if (err) {
      console.error('Error deleting post:', err);
      return res.status(500).send('Error deleting post.');
    }
    res.redirect('/admin');
  });
});


// Route to handle report submission
app.post('/submit-report', (req, res) => {
    const { report_text } = req.body;

    if (!report_text) {
        return res.status(400).json({ success: false, message: 'Report text is required' });
    }

    // Insert the report into the database
    db.query('INSERT INTO reports (report_text) VALUES (?)', [report_text], (err, results) => {
        if (err) {
            console.error('Error submitting report:', err);
            res.status(500).json({ success: false, message: 'Error submitting report' });
        } else {
            res.json({ success: true, message: 'Report submitted successfully' });
        }
    });
});

// Serve the file download
app.get('/download-file', (req, res) => {
    const file = path.join(__dirname, 'views/public/download', 'app.rar'); // Adjust the file path as needed
    res.download(file, (err) => {
      if (err) {
        console.error('Error downloading the file:', err);
        res.status(500).send('Error downloading the file.');
      }
    });
  });
  
  // Register with bycript
  app.post('/register', redirectIfAuthenticated, (req, res) => {
    const { username, password } = req.body;
  
    // Check if the username or password exceeds 25 characters
    if (username.length > 25 || password.length > 25) {
      return res.status(400).json({
        success: false,
        message: 'Корисничкото име или лозинката е премногу долга!',
        });
    }

    try {
      // Check if the username already exists
      db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) {
          console.error('Error checking username:', err);
          res.status(500).json({ success: false, message: 'Internal server error' });
        } else if (results.length > 0) {
          // Username already exists
          res.status(400).json({ success: false, message: 'Акаунтот веќе постои!' });
        } else {
          // Hash the password and insert the new user
          const hashedPassword = await bcrypt.hash(password, 10);
          db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
            if (err) {
              console.error('Error registering user:', err);
              res.status(500).json({ success: false, message: 'Error registering user' });
            } else {
              res.status(200).json({ success: true, message: 'User registered successfully' });
            }
          });
        }
      });
    } catch (error) {
      console.error('Error hashing password:', error);
      res.status(500).json({ success: false, message: 'Error registering user' });
    }
  });
  
// Login route
app.post('/login', redirectIfAuthenticated, (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Корисничко име и лозинка се задолжителни.',
    });
  }

  // Query to get user details
  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], async (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({
        success: false,
        message: 'Внатрешна грешка на серверот.',
      });
    }

    if (results.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Погрешно корисничко име или лозинка.',
      });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Погрешно корисничко име или лозинка.',
      });
    }

    // Set session variables
    req.session.isAuthenticated = true;
    req.session.user_id = user.id;
    req.session.username = username;
    req.session.is_admin = user.is_admin;

    // Redirect based on user role
    if (user.is_admin) {
      return res.status(200).json({
        success: true,
        message: 'Успешно се најавивте!',
        redirectUrl: '/admin' // Redirect to admin panel if admin
      });
    } else {
      return res.status(200).json({
        success: true,
        message: 'Успешно се најавивте!',
        user_id: user.id,
        redirectUrl: '/' // Redirect to home page if not admin
      });
    }
  });
});

// Logout route
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Грешка при одјавување' });
    }
    res.status(200).json({ success: true, message: 'Успешно се одјавивте' });
  });
});


app.post('/create-post', upload.single('image'), (req, res) => {
  const { name, phone, email, pet_type, description } = req.body;
  const image = req.file ? req.file.filename : null;
  const user_id = req.session.user_id;

  if (!name || !phone || !email || !pet_type || !description || !image) {
    return res.status(400).json({
      success: false,
      message: 'Сите полиња се задолжителни.',
    });
  }

  const sql = "INSERT INTO posts (user_id, name, phone, email, pet_type, picture, description) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [user_id, name, phone, email, pet_type, image, description];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting post:', err);
      return res.status(500).json({
        success: false,
        message: 'Грешка при креирање на оглас.',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Успешно креиравте оглас!',
    });
  });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});