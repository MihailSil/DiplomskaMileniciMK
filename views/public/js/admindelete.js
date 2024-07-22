function deletePost(postId) {
    fetch(`/admin/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        location.reload(); // Reload the page after deleting the post
      } else {
        alert('Error deleting post.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }