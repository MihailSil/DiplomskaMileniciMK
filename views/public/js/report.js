document.getElementById('reportForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  const formData = new FormData(this);
  const reportText = formData.get('report_text');

  fetch('/submit-report', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ report_text: reportText }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Пораката е успешно пратена!');
    } else {
      alert('Грешка при пуштање на пораката. Обидетесе Повторно');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  });
});