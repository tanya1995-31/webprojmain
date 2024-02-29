const subjects = ['love', 'kids', 'music'];
const booksLimit = 15; // Limit of books to display initially

// Object to hold the fetched books data for each subject
let booksDataBySubject = {};

async function fetchBooksAndStoreData(subject) {
    try {
        const url = `https://openlibrary.org/subjects/${subject}.json?limit=${booksLimit}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        const books = data.works.map(work => ({
            title: work.title,
            author: work.authors.map(author => author.name).join(', '),
            imgSrc: work.cover_id ? `https://covers.openlibrary.org/b/id/${work.cover_id}-L.jpg` : 'path/to/default/image.jpg'
        }));

        // Store the books data for the subject
        booksDataBySubject[subject] = books;
    } catch (error) {
        console.error(`Failed to fetch books for ${subject}:`, error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all(subjects.map(subject => fetchBooksAndStoreData(subject)));
    subjects.forEach(subject => {
        const container = document.getElementById(`${subject}Container`);
        displayBooks(subject, container);
    });
});

function displayBooks(subject, container) {
    const books = booksDataBySubject[subject];

    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md';
        bookDiv.innerHTML = `
            <img src="${book.imgSrc}" alt="${book.title}" class="w-full h-48 mb-2 object-cover" />
            <h3 class="text-lg font-semibold">${book.title}</h3>
            <p class="text-sm">${book.author}</p>
            <button id="GroupDisscusionButton" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4">Group Disscusion</button>

        `;
        container.appendChild(bookDiv);

    
              // Add event listener to the discussion button
        bookDiv.querySelector('#GroupDisscusionButton').addEventListener("click", function() {
            // Redirect the user to the discussion page with the book title and author as query parameters
            window.location.href = `discussion.html?title=${encodeURIComponent(book.title)}&author=${encodeURIComponent(book.author)}&imgSrc=${encodeURIComponent(book.imgSrc)}`;          });
    });
}

// Event listeners for login and signup buttons
document.getElementById("loginButton").addEventListener("click", function() {
    window.location.href = "login.html";
});

document.getElementById("signupButton").addEventListener("click", function() {
    window.location.href = "signup.html";
});

