document.querySelector('.sign-up3-form1').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
  
    const formData = new FormData(this);
    const username = formData.get('username');
    const password = formData.get('password');
  
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Вашиот акаунт е креиран успешно!');
        window.location.href = '/login'; // Redirect to login page on success
      } else {
        alert(data.message); // Show error message
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while registering. Please try again.');
    });
  });