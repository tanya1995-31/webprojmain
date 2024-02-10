const recommendedBooksData = [
  { title: "Book 1", author: "Author 1", imgSrc: "Top_books_month/page2.jpeg"},
  { title: "Book 2", author: "Author 2", imgSrc: "Top_books_month/page3.jpeg"},
  { title: "Book 3", author: "Author 3", imgSrc: "Top_books_month/page4.jpeg"},
  { title: "Book 4", author: "Author 4", imgSrc: "Top_books_month/page5.jpeg"},
  { title: "Book 5", author: "Author 5", imgSrc: "Top_books_month/page6.jpeg"},
  { title: "Book 6", author: "Author 6", imgSrc: "book7.jpg"},
  { title: "Book 7", author: "Author 7", imgSrc: "book8.jpg"},
  { title: "Book 8", author: "Author 8", imgSrc: "book9.jpg"},

  // Add more books as needed
];
const classicsAndliterature = [
  { title: "Book 1", author: "Author 1", imgSrc: "history_books/history1.jpg" },
  { title: "Book 2", author: "Author 2", imgSrc: "history_books/history2.jpg"},
  { title: "Book 3", author: "Author 3", imgSrc: "history_books/history3.jpg"},
  { title: "Book 4", author: "Author 4", imgSrc: "history_books/history4.jpg"},


];
  const bookoftheweek = [
    { title: "Book 1", author: "Science", imgSrc: "categories/science.jpg"},
    { title: "Book 2", author: "Romantic", imgSrc: "categories/romance.jpg"},
    { title: "Book 3", author: "Classics And literature", imgSrc: "categories/literature.jpg"},
    { title: "Book 4", author: "Nature", imgSrc: "categories/nature.jpg"},
   
  

  // Add more books as needed
];

// Function to render recommended books
function renderRecommendedBooks() {
  const recommendedBooksContainer = document.getElementById('recommendedBooks');
  recommendedBooksData.forEach(book => {
      const card = document.createElement('div');
      card.classList.add('recommended-book-card', 'rounded-lg', 'shadow-md', 'p-4', 'bg-white', 'hover:shadow-lg', 'flex', 'flex-col', 'items-center');
      card.innerHTML = `
          <img src="${book.imgSrc}" alt="${book.title}" class="mb-4 rounded-md w-32 h-45">
          <h3 class="text-xl font-semibold mb-2">${book.title}</h3>
          <p class="text-gray-600 mb-2">${book.author}</p>
          <a href="bookdetails.html?title=${encodeURIComponent(book.title)}&author=${encodeURIComponent(book.author)}&image=${encodeURIComponent(book.imgSrc)}"class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">View Details
          </a>
      `;
      recommendedBooksContainer.appendChild(card);
  });
  const classicsAndliteratureContainer = document.getElementById('classicsAndliterature');
  classicsAndliterature.forEach(book => {
      const card = document.createElement('div');
      card.classList.add('recommended-book-card', 'rounded-lg', 'shadow-md', 'p-4', 'bg-white', 'hover:shadow-lg', 'flex', 'flex-col', 'items-center');
      card.innerHTML = `
          <img src="${book.imgSrc}" alt="${book.title}" class="mb-4 rounded-md w-32 h-45">
          <h3 class="text-xl font-semibold mb-2">${book.title}</h3>
          <p class="text-gray-600 mb-2">${book.author}</p>
          <a href="bookdetails.html?title=${encodeURIComponent(book.title)}&author=${encodeURIComponent(book.author)}" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">View Details</a>
      `;
      classicsAndliteratureContainer.appendChild(card);
  });
}

const bookoftheweekContainer = document.getElementById('bookoftheweek');
bookoftheweek.forEach(book => {
    const card = document.createElement('div');
    card.classList.add('recommended-book-card', 'rounded-lg', 'shadow-md', 'p-4', 'bg-white', 'hover:shadow-lg', 'flex', 'flex-col', 'items-center');
    card.innerHTML = `
        <img src="${book.imgSrc}" alt="${book.title}" class="mb-4 rounded-md w-32 h-45">
        <h3 class="text-xl font-semibold mb-2">${book.title}</h3>
        <p class="text-gray-600 mb-2">${book.author}</p>
        <a href="Groupdetails.html?title=${encodeURIComponent(book.title)}&author=${encodeURIComponent(book.author)}" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Discussion Group</a>
    `;
    bookoftheweekContainer.appendChild(card);
});

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();
  // Implement form submission logic here
  console.log('Form submission prevented for demonstration.');
}

// Add event listener to the review form
document.addEventListener('DOMContentLoaded', () => {
  const reviewForm = document.getElementById('reviewForm');
  reviewForm.addEventListener('submit', handleSubmit);
  renderRecommendedBooks();
});

// Add event listener to the login button
document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('loginButton');
  loginButton.addEventListener('click', () => {
    // Redirect to the login page
    window.location.href = 'login.html';
  });
});
// Add event listener to the login button
document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('SigninButton');
  loginButton.addEventListener('click', () => {
    // Redirect to the login page
    window.location.href = 'signup.html';
  });
});

