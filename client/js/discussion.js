let currentRating = 0; // Track current rating

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const bookTitle = urlParams.get('title');
    const bookAuthor = urlParams.get('author');
    const imgSrc = urlParams.get('imgSrc');

    // Display the book title, author, and image
    const titleElement = document.getElementById('bookTitle');
    titleElement.textContent = bookTitle;

    const authorElement = document.getElementById('bookAuthor');
    authorElement.textContent = bookAuthor;

    const bookCoverElement = document.getElementById('bookCover');
    bookCoverElement.src = imgSrc;
});

// Function to handle rating selection
function rateBook(rating) {
    currentRating = rating;
    console.log('Selected rating:', rating);

    // Update the appearance of the stars based on the selected rating
    for (let i = 1; i <= 5; i++) {
        const starButton = document.getElementById(`star${i}`);
        if (i <= rating) {
            // Highlight the selected stars
            starButton.classList.remove('text-gray-300');
            starButton.classList.add('text-yellow-500');
        } else {
            // Reset the appearance of unselected stars
            starButton.classList.remove('text-yellow-500');
            starButton.classList.add('text-gray-300');
        }
    }
}

// Function to add a review
document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const reviewText = document.getElementById('reviewText').value.trim();
    if (reviewText === '') {
        alert('Please enter your review.');
        return;
    }

    if (currentRating === 0) {
        alert('Please select a rating.');
        return;
    }

    // Create review element
    const reviewNumber = document.getElementById('reviewsList').childElementCount + 1; // Incremental review number
    const reviewElement = document.createElement('div');
    reviewElement.className = 'bg-white p-6 rounded-lg shadow-md';
    reviewElement.innerHTML = `
        <h3 class="text-lg font-semibold mb-2">Review ${reviewNumber}</h3>
        <p class="text-sm mb-4">${reviewText}</p>
        <div class="mb-4">
            <p class="text-lg font-semibold mb-2">Rating:</p>
            <div class="flex justify-center">
                ${'★'.repeat(currentRating)}${'☆'.repeat(5 - currentRating)}
            </div>
        </div>
    `;

    // Append review to the reviews list
    document.getElementById('reviewsList').appendChild(reviewElement);

    // Reset the form and rating
    document.getElementById('reviewForm').reset();
    resetStarRating();
});

// Function to reset the star rating appearance
function resetStarRating() {
    currentRating = 0;
    // Reset the appearance of all stars
    for (let i = 1; i <= 5; i++) {
        const starButton = document.getElementById(`star${i}`);
        starButton.classList.remove('text-yellow-500');
        starButton.classList.add('text-gray-300');
    }
}
