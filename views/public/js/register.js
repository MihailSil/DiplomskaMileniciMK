// Registriranje
// Event listener na dugmeto za registriranje
document.querySelector('.sign-up3-form1').addEventListener('submit', function(event) {
    event.preventDefault(); 
  
    // Zemanje podatoci od formata
    const formData = new FormData(this);
    const username = formData.get('username');
    const password = formData.get('password');
  
    // Baranje do serverot za registriranje
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Pretvoranje na podatocite vo  json
      body: JSON.stringify({ username, password }),
    })
    // Povratni poraki od severot
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert(data.message); // Ako e uspeshno
        window.location.href = '/login'; // Nasoka do login
      } else {
        alert(data.message); // Vo sluchaj na greshka
      }
    })
    // Greshka pri fetch
    .catch(error => {
      console.error('Error:', error);
      alert('Се појаве грешка при регистрирање. Обидете се повторно');
    });
  });