// Editiranje postovi
// Gi selektira site formi i za sekoj ima eventlistener
document.querySelectorAll('.edit-form').forEach(form => {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      // Gi zema site podatoci od formata
      const formData = new FormData(this);
      // Zema ID id posto
      const postId = this.getAttribute('data-post-id');
  
      // Baranje do servero za editiranje
      fetch(`/edit-post/${postId}`, {
        method: 'POST',
        body: formData
      })
      // Povratni poraki od serverot
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert(data.message); // Ako e uspeshno
          window.location.href = '/oglas'; // Nasoka kon oglas
        } else {
          alert(data.message); // Vo sluchaj na greshka
        }
      })
      // Greshka pri fetch
      .catch(error => {
        console.error('Error:', error);
        alert('Грешка при ажурирање на огласот. Ве молиме обидете се повторно.');
      });
    });
  });