document.getElementById('create-post-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('/create-post', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Огласот е успешно креиран!');
        window.location.href = '/'; // Redirect to homepage or posts page
      } else {
        alert('Грешка при креирање на огласот: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });