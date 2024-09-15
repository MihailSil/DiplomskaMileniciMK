// Brishenje na postovi
// Gi selektira site formi i za sekoj ima event listener
document.querySelectorAll('.delete-form').forEach(form => {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Zema ID od posto
      const postId = this.getAttribute('data-post-id');
  
      // Baranje do servero za brishenje
      fetch(`/delete-post/${postId}`, {
        method: 'POST'
      })
      // Povratni poraki od serverot
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert(data.message); // Ako e uspeshno
          window.location.href = '/oglas'; // Nasoka do oglas stranata
        } else {
          alert(data.message); // Vo sluchaj na error
        }
      })
      // Greshka pri fetch
      .catch(error => {
        console.error('Error:', error);
        alert('Грешка при бришење на огласот. Ве молиме обидете се повторно.');
      });
    });
  });