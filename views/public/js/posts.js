// Kreiranje post
// Event listener na dugmeto
document.getElementById('create-post-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Zemanje na podatocite
  const formData = new FormData(this);

  // Baranje do serverot za kreiranje post
  fetch('/create-post', {
    method: 'POST',
    body: formData
  })
  // Povratni poraki od serverot
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert(data.message); // Ako e uspeshno
      window.location.href = '/oglas'; // Nasoka do oglas
    } else {
      alert(data.message); // Vo sluchaj na greshka
    }
  })
  // Greshka pri fetch
  .catch(error => {
    console.error('Error:', error);
    alert('Грешка при креирање на огласот. Ве молиме обидете се повторно.');
  });
});