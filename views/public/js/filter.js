document.getElementById('filterButton').addEventListener('click', function() {
  // Get the selected radio button value
  const selectedType = document.querySelector('input[name="radio"]:checked').value;

  // Get all posts
  const posts = document.querySelectorAll('.items');

  // Variable to track if any posts are visible
  let anyVisible = false;

  // Loop through each post and show/hide based on selected type
  posts.forEach(post => {
    if (post.getAttribute('data-pet-type') === selectedType) {
      post.style.display = 'block';
      anyVisible = true;
    } else {
      post.style.display = 'none';
    }
  });

  // Show or hide the "No results found" message based on visibility
  const noResults = document.getElementById('no-results');
  if (anyVisible) {
    noResults.style.display = 'none';
  } else {
    noResults.style.display = 'block';
  }
});