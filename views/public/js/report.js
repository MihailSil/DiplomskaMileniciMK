// Kreiranje report
// Event listener za dugmeto report
document.getElementById('reportForm').addEventListener('submit', function(event) {
  event.preventDefault(); 

  // Zemanje na podatoci
  const formData = new FormData(this);
  const reportText = formData.get('report_text');

  // Baranje do serverot za kreiranje report
  fetch('/submit-report', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // Pretvoranje na podatokot vo json 
    body: JSON.stringify({ report_text: reportText }),
  })
  // Povratni poraki od serverot
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert(data.message); // Ako e uspeshno
    } else {
      alert(data.message); // Vo sluchaj na greshka
    }
  })
  // Greshka pri fetch
  .catch(error => {
    console.error('Error:', error);
    alert('Се појаве грешка! Обидете се повторно.');
  });
});