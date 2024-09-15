// Filtriranje na postovi
// event listener za izvrshuvanje na funkcija pri klik na kopcheto filter
document.getElementById('filterButton').addEventListener('click', function() {
  // Zemanje na vrednosta
  const selectedType = document.querySelector('input[name="radio"]:checked').value;

  // Zemanje na site postovi
  const posts = document.querySelectorAll('.items');

  // Promenliva za proverka dali ima dostapni postovi
  let anyVisible = false;

  // Baranje niz sekoj post za tip na mileniche
  posts.forEach(post => {
    if (post.getAttribute('data-pet-type') === selectedType) {
      // Ako e pronajden post sprema baraniot tip se prikazuva
      post.style.display = 'block';
      anyVisible = true;
    } else {
      // Ako ne e pogoden ko krie
      post.style.display = 'none';
    }
  });

  // Prikazuvanje na tekstot nema rezultati
  const noResults = document.getElementById('no-results');
  if (noResults) {
    noResults.style.display = anyVisible ? 'none' : 'block';
  } else {
    console.error('No results element not found');
  }
});