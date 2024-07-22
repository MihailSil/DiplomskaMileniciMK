function logout() {
    fetch('/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Redirect to the homepage or handle success
        window.location.href = '/';
      } else {
        // Handle error
        console.error('Logout failed:', data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }