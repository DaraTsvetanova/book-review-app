const bookreviews = document.querySelector('.bookreviews');
const createBox = document.querySelector('.create-box');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const review = document.querySelector('#review');
const ratingStars = [...document.getElementsByClassName("rating__star")];const addButton = document.querySelector('.add');
const createButton = document.querySelector('.create-box-actions .primary');
const closeButton = document.querySelector('.create-box-actions .secondary');
// let contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

// Show create-box when you click the + button
function handleAddButton() {
  createBox.style.display = 'block';
}
// Show new book review when you click create button
function handleCreateButton() {
  const div = document.createElement('div');
  div.classList.add('bookreview');
  div.innerHTML = `
    <h2>${title.value}</h2>
    <h2>${author.value}</h2>
    <p>${review.value}</p>
    <div>${ratingStars.value}</div>
    <a href="#" class="delete">X</a>
  `
  bookreviews.appendChild(div);

  clearField();
}

// Clear field 
function clearField() {
  title.value = '';
  author.value = '';
  review.value = '';
}

// Delete Review
function deleteReview(target) {
  if(target.className === 'delete') {
    target.parentElement.remove();
  }
}

// Star Rating
function executeRating(stars) {
  const starClassActive = "rating__star fa fa-star checked";
  const starClassInactive = "rating__star fa fa-star";
  const starsLength = stars.length;
  let i;
  stars.map((star) => {
    star.onclick = () => {
      i = stars.indexOf(star);

      if (star.className === starClassInactive) {
        for (i; i >= 0; --i) stars[i].className = starClassActive;
      } else {
        for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
      }
    };
  });
}

executeRating(ratingStars);

// Save to localStorage

// Close create box when you click close button
function handleCloseButton() {
  createBox.style.display = 'none';
}


// Event Listeners
addButton.addEventListener('click', handleAddButton);
createButton.addEventListener('click', handleCreateButton);
closeButton.addEventListener('click', handleCloseButton);
bookreviews.addEventListener('click', function(e) {
  e.preventDefault();
  deleteReview(e.target);
});