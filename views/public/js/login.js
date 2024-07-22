document.querySelector('.sign-in1-form1').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
  
    const formData = new FormData(this);
    const username = formData.get('username');
    const password = formData.get('password');
  
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Успешно се најавивте!');
        window.location.href = data.redirectUrl;
      } else {
        alert(data.message); // Show specific error message
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Настана грешка при најавувањето. Ве молиме обидете се повторно.');
    });
  });