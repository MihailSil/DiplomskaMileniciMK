// odjava
// se izvrshuva koga ke se povika
function logout() {
  // Baranje do serverot za odjava
  fetch('/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  // Povratni poraki od serverot
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert(data.message); //Ako e uspeshno
      window.location.href = '/';
    } else {
      alert(data.message); // Vo sluchaj na greshka
    }
  })
  // Greshka pri fetch
  .catch(error => {
    console.error('Error:', error);
  });
}