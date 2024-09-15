// Najava
// Event listener na dugmeto za najava
document.querySelector('.sign-in1-form1').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
  
    // Zemanje na podatoci od formata
    const formData = new FormData(this);
    const username = formData.get('username');
    const password = formData.get('password');
  
    // Baranje do serverot za login
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Pretvoranje na podatocite vo json file
      body: JSON.stringify({ username, password }),
    })
    // Povratni poraki od serverot
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert(data.message); // Ako e uspechno
        window.location.href = data.redirectUrl;
      } else {
        alert(data.message); //Vo sluchaj na greshka
      }
    })
    // Pri greshka vo fetch
    .catch(error => {
      console.error('Error:', error);
      alert('Настана грешка при најавувањето. Ве молиме обидете се повторно.');
    });
  });