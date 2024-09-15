// Vmetnuvanje na biblioteki/paketi
const express = require('express'); // Framework za kreiranje na web app 
const bodyParser = require('body-parser'); // Pretvoranje na dojdovni baranja pred nivna obrabotka
const path = require('path'); // Paket za rabota so pateki
const db = require('./db'); // Konekcija so bazata na podatoci
const session = require('express-session'); // Paket za kreiranje na sesii za korisnici
const bcrypt = require('bcryptjs'); // Biblioteka za heshiranje na password
const multer = require('multer'); // Paket za prikachuvanje na fajlovi 
const fs = require('fs'); // Paket za chitanje i zapishuvanje na podatoci

// Inicijalizacija na Express aplikacija
const app = express();
// Port na koj serverot ,,slusha,,
const port = 3000;
//const port = process.env.PORT || 3000;

// Middleware za JSON podatoci
// Analizira JSON baranja od korisnik i go pravi dostapno vo req.body
app.use(express.json()); // Express framework
// Analizira baranja od korisnik preku html formi
app.use(bodyParser.urlencoded({ extended: false })); // BodyParser paket
// Ista funkcionalnost kako express.json
app.use(bodyParser.json());

// Middleware za kreiranje sesija na korisnici, Paket express-session
app.use(session({
  // Enkripcija na sesijata
  secret: 'MIHAILINKI745', 
  // Ako nema promeni vo sesijata ne pravi zachuvuvanje
  resave: false,
  // Zachuvuvanje na novo kreirana sesija
  saveUninitialized: true
}));

// Middleware za proverka dali korisnikot e logiran
// Spored toа se renderira stranicata 
// req - request , res - response, next - povikuvanje na slednata Funkcija
app.use((req, res, next) => {
  // res.locals sodrzi povratnata informacija na baranjeto
  // req.session.isAuthenticated True/False za korisnikot dali e logiran
  res.locals.isAuthenticated = req.session.isAuthenticated;
  // Zachuva podatoci od korisnikot kako ID
  res.locals.username = req.session.username;
  // Se povikuva slednata Funkcija ili sledna ,,ruta,,
  next();
});

// Funkcija za provekra na korisnikot dali e najaven
// Funkcijata se koristi za strani kade shto korisnikot mora da bide logiran
function ensureAuthenticated(req, res, next) {
  // Ako e vistinit se povikuva slednata Funkcija ili sledna ,,ruta,,
  if (req.session.isAuthenticated) {
    // Se povikuva slednata Funkcija ili sledna ,,ruta,,
    return next();
    // Ako ne e vistinit go nosi na login stranata
  } else {
    res.redirect('/login');
  }
}

// Funkcija za proverka dali korisnikot e admin
function ensureAdmin(req, res, next) {
  // Proverka dali e najaven i dali e admin, Dvete vrednosti True/False
  if (req.session.isAuthenticated && req.session.is_admin) {
    // Ako dvete se True se povikuva sledna Funkcija ili sledna ,,ruta,, 
    return next();
  } else {
    // Go nosi vo home page
    res.redirect('/');
  }
}

// Funkcija za izbegavanje na login i register ako e logiran
function redirectIfAuthenticated(req, res, next) {
  // Ako e najaven go nosi na home page
  if (req.session.isAuthenticated) {
    return res.redirect('/');
  }
  // Se povikuva sledna Funkcija ili sledna ,,ruta,, 
  next();
}

// Middleware za setiranje na promenlivi
// Ovozmozuva renderiranje na strani bez razlika dali korisnikot e logiran ili ne
app.use((req, res, next) => {
    // Vo sluchaj ako req.session.isAuthenticated nema vrednost se setira na false
  res.locals.isAuthenticated = req.session.isAuthenticated || false;
  // Ako req.session.username nema vrednost se setira vo Anonymous
  res.locals.username = req.session.username || 'Anonymous';
  // Vo sluchaj ako req.session.is_admin nema vrednost se setira na false
  res.locals.isAdmin = req.session.is_admin || false;
  next();
});

// Naogjanje na statichni fajlovi kako sliki, css od papkata views
app.use(express.static(path.join(__dirname, 'views')));

// Naogjanje na statichni fajlovi od uploads papkata
app.use(express.static('uploads')); 

// Renderiranje na ejs fajlovi (html fajl so ejs ekstenzija)
app.set('view engine', 'ejs');
// Naogjanje na stranicite od papkata views
app.set('views', path.join(__dirname, 'views'));

// Paket multer za prikachuvanje na sliki
// Konfiguracija za prostor na zachuvuvanje
const storage = multer.diskStorage({
  // Destinacija na zachuvuvanje
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Ime na fajlot
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Instanca koja se koristi vo rutite za zachuvuvanje
const upload = multer({ storage: storage });

// Davanje na prikacheni dokumenti kako statichni 
app.use('/uploads', express.static('uploads'));


// Kreiranje na uploads papka vo sluchaj ako ne postoj
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Kreiranje na Ruti, sekoja ruta nosi kon nekoja strana i definira shto da se sluchi koga ke se odi vo nea
// So get() zemame podatok od serverot, vozvrakja so renderiranje na index
app.get('/', (_req, res) => { // _req ne se koristi tuka, res vozvrakja so index
    res.render('index');
});

// Ruta za login
// redirectIfAuthenticated funkcija koja ne go nosi korisnikot vo login ako e najaven
app.get('/login', redirectIfAuthenticated, (req, res) => {
  res.render('login');
});

// Ruta za register
// redirectIfAuthenticated funkcija koja ne go nosi korisnikot vo login ako e register
app.get('/register', redirectIfAuthenticated, (req, res) => {
  res.render('register');
});

// Ruta za vdomi
app.get('/vdomi', (req, res) => {
  // Povikuvanje na stored procedure (funkcija) od bazata
  db.query('CALL GetAllPosts()', (err, results) => {
    // Vo sluchaj na greshka
    if (err) {
      console.error('Error fetching posts:', err);
      return res.status(500).send('Грешка при превземање на објавите');
    }

    // posts se koristi vo html za renderiranje na rezultatite
    res.render('vdomi', { posts: results[0] }); // Vdomi kade shto se renderiraat ovie rezultati
  });
});

// Ruta za oglas
// ensureAuthenticated funkcija koja proveruva dali korisnikot e najaven
app.get('/oglas', ensureAuthenticated, (req, res) => {
  // Zema ID od korisnikot koj e vo sesija
  // Potrebno e za zemanje na postovite od toj korisnik
  const userId = req.session.user_id;

  // Zema postovi od bazata na korisnikot soodvetno so negoviot ID
  // Treba stored procedura
  const query = 'SELECT * FROM posts WHERE user_id = ?';

  // Izvrshuvanje na prashalnikot vo bazata
  db.query(query, [userId], (err, results) => {
      // Vo sluchaj na error
      if (err) {
          console.error('Error fetching posts:', err);
          return res.status(500).send('Грешка при превземање на објавите');
      }
      // Go renderira oglas stranata so rezultatite
      res.render('oglas', { posts: results });
  });
});

// Kreiranje post
// Koristi multer za prikachuvanje na slika
app.post('/create-post', upload.single('image'), (req, res) => {

  // Promenlivi koi se vneseni preku front delot
  const { name, phone, email, pet_type, description } = req.body;
  // Ime na slikata koja e uploadirana ako postoj, ako ne setirana e na null
  const image = req.file ? req.file.filename : null;
  // Zema ID od korisnik preku sesijata
  const user_id = req.session.user_id;

  // Moralno popolnuvanje na polinjata
  if (!name || !phone || !email || !pet_type || !description || !image) {
    return res.status(400).json({
      success: false,
      message: 'Сите полиња се задолжителни.',
    });
  }

  // Povikuvanje na Stored Procedure od bazata za kreiranje post
  const sql = "CALL CreatePost(?, ?, ?, ?, ?, ?, ?)";
  // odeluvanje na  vrednosti vo bazata
  const values = [user_id, name, phone, email, pet_type, image, description];

  // Izvrshuvanje na SQL funkcijata
  db.query(sql, values, (err, result) => {
    // Vo sluchaj na greshka
    if (err) {
      console.error('Error inserting post:', err);
      return res.status(500).json({
        success: false,
        message: 'Грешка при креирање на оглас.',
      });
    }
    // Ako e uspeshno
    res.json({
      success: true,
      message: 'Огласот е успешно креиран!',
    });
  });
});

// Editiranje na post
// /edit-post/:id - se koristi vo html i id za posto
// Koristi multer za slika
app.post('/edit-post/:id', upload.single('picture'), (req, res) => {
  // Zemanje ID od post
  const postId = req.params.id;
  // Zemanje na podatoci
  const { name, phone, email, pet_type, description } = req.body;
  // Patekata od slikata
  let picture = req.file ? `/uploads/${req.file.filename}` : null;

  const updatePost = (picturePath) => {
    // Povikuvanje na Edit Stores Procedure
    const sql = 'CALL EditPost(?, ?, ?, ?, ?, ?, ?)';
    // Parametri za prashalnikot
    db.query(sql, [postId, name, phone, email, pet_type, description, picturePath], (err, result) => {
      // Vo sluchaj na greshka
      if (err) {
        console.error('Error updating post:', err);
        return res.status(500).json({ success: false, message: 'Грешка при ажурирање на огласот.' });
      }
      res.json({ success: true, message: 'Огласот е успешно ажуриран!' });
    });
  };

  // Ako nema nova slika 
  if (!picture) {
    // Ja zema veke postojachkata slika od bazata
    
    // Treba stored procedura
    const getExistingPictureQuery = 'SELECT picture FROM posts WHERE id = ?';
    db.query(getExistingPictureQuery, [postId], (err, results) => {
      
      // Vo sluchaj na greshka
      if (err) {
        console.error('Error fetching the existing picture:', err);
        return res.status(500).json({ success: false, message: 'Грешка на серверот.' });
      }
      // Ako e pronajdena slikata ja updatirva so patekata koja ja ima
      if (results.length > 0) {
        picture = results[0].picture;
        updatePost(picture);
        // Vo sluchaj na greshka
      } else {
        res.status(404).json({ success: false, message: 'Огласот не е пронајден.' });
      }
    });
    // Ako nova slika e vnesena se povikuva update
  } else {
    updatePost(picture);
  }
});


// Brishenje na post
// delete-post se zema od front end so se negov id
app.post('/delete-post/:id', (req, res) => {
  // ID od postot
  const postId = req.params.id;
  // ID od korisnikot koj e logiran za da mozi da izbrishi svoj post
  const userId = req.session.user_id;

  // Povikuvanje na Stored Procedure od bazata za brishenje
  db.query('CALL DeletePost(?, ?)', [postId, userId], (err, results) => {
    // Vo sluchaj na greshka
    if (err) {
      console.error('Error deleting post:', err);
      return res.status(500).json({ success: false, message: 'Грешка при бришење на огласот.' });
    }
    // Ako e uspeshno
    return res.json({ success: true, message: 'Огласот е успешно избришан.' });
  });
});

// Ruta do za nas stranata
app.get('/za-nas', (req, res) => {
    res.render('za-nas'); // Renderiranje na za nas stranata
});

// Kreiranje report
app.post('/submit-report', (req, res) => {
  // report_text go zema tekstot od front delot
  const { report_text } = req.body;

  // Vo sluchaj prazen report ako se pushti
  if (!report_text) {
      return res.status(400).json({ success: false, message: 'Задолжително е внес на полето' });
  }

  // Povikuvanje Stored Procedure od bazata za zachuvuvanje
  const sql = "CALL CreateReport(?)";
  // Niza koja go sodrzi tekstot koja se dodeluva na stored procedurata
  const values = [report_text];

  // Vnes na vrednosta vo bazata
  db.query(sql, values, (err, results) => {
      // Vo sluchaj na error
      if (err) {
          console.error('Error submitting report:', err);
          res.status(500).json({ success: false, message: 'Грешка при испраќање' });
      } else {
          res.json({ success: true, message: 'Успешно испратено!' });
      }
  });
});

// Spushtanje na file od stranata
app.get('/download-file', (req, res) => {
  const file = path.join(__dirname, 'views/public/download', 'app.rar'); // Pateka do podatoko za spushtanje
  // zapochnuvanje na spushtanjeto
  res.download(file, (err) => {
    // Vo sluchaj na error
    if (err) {
      console.error('Error downloading the file:', err);
      res.status(500).send('Грешка при превземање на датотеката.');
    }
  });
});

// Ruta za admin panel
// Povikuvanje na funkcija za proverka dali korisnikot e admin
app.get('/admin', ensureAdmin, (req, res) => {

  // Zemanje na postojte od bazata
  // Treba stored procedura
  const sql = 'SELECT * FROM posts';
  db.query(sql, (err, results) => {

    // Vo sluchaj na greshka
    if (err) {
      console.error('Error fetching posts:', err);
      return res.status(500).send('Серверска грешка');
    }
    // Renderiranje na admin stranata so zemenite postoj od bazata
    res.render('admin', { username: req.session.username, posts: results });
  });
});

// Brishenje na post kako admin
app.post('/admin/delete-post', ensureAdmin, (req, res) => {
  // Zemanje na ID od postot koj treba da se izbrishe
  const postId = req.body.postId;

  // Povikuvanje na Stored Procedure od bazata za brishenje
  const sql = 'CALL AdminDeletePost(?)';
  // Brishenje na post preku negoviot ID
  db.query(sql, [postId], (err, results) => {
    // Vo sluchaj na greshka
    if (err) {
      console.error('Error deleting post:', err);
    }
    // Reload na stranata
    res.redirect('/admin');
  });
});
  
// Registracija 
// Povikuvanje na funkcja za proverka dali korisnikot e najaven
// Koristi bycript za heshiranje na password
app.post('/register', redirectIfAuthenticated, (req, res) => {
  // Zemanje na vnesenite username i password
  const { username, password } = req.body;
  
  // Vo sluchaj ako username i password e pregolem
  if (username.length > 25 || password.length > 25) {
    return res.status(400).json({
      success: false,
      message: 'Корисничкото име или лозинката е премногу долга!',
      });
  }

  try {
    // Proverka dali postoj korisnikot
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      // Vo sluchaj na greshka
      if (err) {
        console.error('Error checking username:', err);
        res.status(500).json({ success: false, message: 'Серверска грешка' });
        // Ako postoj accauntot
      } else if (results.length > 0) {
        // Vo sluchaj ako postoj korisnikot
        res.status(400).json({ success: false, message: 'Акаунтот веќе постои!' });
        // Prodolzuvanje so registracijata
      } else {
        // Heshiranje na password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Povikuvanje na Stored Procedure
        const sql = 'CALL RegisterUser(?, ?)';
        // Vrednosti za zachuvuvanje vo bazata
        const values = [username, hashedPassword];

        // Vnes vo bazata
        db.query(sql, values, (err, results) => {
          // Vo sluchaj na greshka
          if (err) {
            console.error('Error registering user:', err);
            res.status(500).json({ success: false, message: 'Грешка при регистрирање!' });
          } else {
            res.status(200).json({ success: true, message: 'Успешно сте регистрирани!' });
          }
        });
      }
    });
      // Kakva bilo greshka pri porcesot na registracija
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ success: false, message: 'Грешка при регистрирање' });
  }
});
  
// Ruta za login
// Funkcija za proverka dali e veke najaven
// Koristi express-session  
// Koristi bcrypt
app.post('/login', redirectIfAuthenticated, (req, res) => {
  // Zemanje na vnesenite vrednosti
  const { username, password } = req.body;

  // Proverka dali username i password se vneseni
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Корисничко име и лозинка се задолжителни.',
    });
  }

  // Prashalnik za zemanje na podatoci od bazata
  // Treba stored procedura
  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], async (err, results) => {

    // Vo sluchaj na greshka
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({
        success: false,
        message: 'Внатрешна грешка на серверот.',
      });
    }

    // Ako ne postoj korisnichkoto ime
    if (results.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Не постој таков корисник.',
      });
    }

    // Resultatot od username 
    const user = results[0];
    // Proverka na vneseniot password so heshiraniot password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Ako ne se sovpagja passwordo
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Погрешна лозинка.',
      });
    }

    // Ako vnesenite podatoci se validni
    // promenlivi za sesija
    req.session.isAuthenticated = true; // Funkcijata isAuthenticated se setira vo true
    req.session.user_id = user.id; // Se chuva id na korisnikot
    req.session.username = username; // Se chuva username na korisnikot
    req.session.is_admin = user.is_admin; // Indicira dali korisnikot ima admin alatki

    // Nasoka sprema odgovornosta
    // Ako e admin go nosi na admin panel
    if (user.is_admin) {
      return res.status(200).json({
        success: true,
        message: 'Успешно се најавивте!',
        redirectUrl: '/admin' // Nasoka kon admin panelot
      });
      // Ako e obichen korisnik go nosi vo home 
    } else {
      return res.status(200).json({
        success: true,
        message: 'Успешно се најавивте!',
        user_id: user.id,
        redirectUrl: '/' // Nasoka vo home stranata
      });
    }
  });
});

// Ruta za logout
app.post('/logout', (req, res) => {
  // Prekin na sesija
  req.session.destroy(err => {
    // Vo sluchaj na greshka
    if (err) {
      return res.status(500).json({ success: false, message: 'Грешка при одјавување' });
    }
    res.status(200).json({ success: true, message: 'Успешно се одјавивте' });
  });
});

// Startuvanje na server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Treba css za na mobilen
// Da se dodaj zaginati stranica
// Da se dodaj Forum
// Da se dodaj reset password
// Da se dodaj Profil??
// Podobruvanje na filtering
// Da se dodaj filtering kaj admin
// Poveke sliki pri kreiranje oglas
// Brishenje na sliki od upload pri brishenje na oglas i editiranje na slika