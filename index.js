const podcastreviews = document.querySelector('.podcastreviews');
const createBox = document.querySelector('.create-box');
const nameInput = document.querySelector('#name-input');
const hostInput = document.querySelector('#host-input');
const reviewInput = document.querySelector('#review-input');
const addButton = document.querySelector('.add');
const createButton = document.querySelector('.create-box-actions .primary');
const closeButton = document.querySelector('.create-box-actions .secondary');

// Event Listeners
addButton.addEventListener('click', handleAddButton);
createButton.addEventListener('click', createReview);
closeButton.addEventListener('click', handleCloseButton);
podcastreviews.addEventListener('click', function(e) {
  e.preventDefault();
  deleteReview(e.target);
});

document.addEventListener('DOMContentLoaded', function() {
  const ratingStars = [...document.getElementsByClassName("rating__star")];
  let reviews = JSON.parse(localStorage.getItem('reviews'))

  if (!reviews) {
    reviews = []
  }

  const reviewElements = reviews.map(review => {
    const div = document.createElement('div');
    const ratingElements = new Array(5).fill(null).map((_, i) => {
      if (i <= review.rating - 1) {
        return '<i class="rating__star fa fa-star checked"></i>'
      }
  
      return '<i class="rating__star fa fa-star"></i>'
    });
    div.classList.add('podcastreview');
    div.innerHTML = `
      <a data-id="${review.id}" href="#" class="delete">X</a>
      <h2>Podcast: ${review.name}</h2>  
      <h2>Host: ${review.host}</h2>
      <p>${review.review}</p>
      <div class="podcastrating">${ratingElements.join(' ')}</div>
      <div class="today">${review.date}</div>
    `;

    return div.outerHTML
  }).join('');

  podcastreviews.innerHTML = reviewElements;
})

// Show create-box when you click the + button
function handleAddButton() {
  createBox.style.display = 'block';
}

function getCurrentDate() {
  return new Date().toISOString().slice(0, 10)
}

function generateId() {
  return (new Date().valueOf()).toString();
}

// Show new podcast review when you click the create button
function createReview() {
  const ratingStars = [...document.querySelectorAll('.create-box .rating__star')];
  // Store the rating as a number
  const rating = ratingStars.filter(starElement => starElement.classList.contains('checked')).length;
  // Create a new array of star elements
  const ratingElements = new Array(ratingStars.length).fill(null).map((_, i) => {
    if (i <= rating - 1) {
      return '<i class="rating__star fa fa-star checked"></i>'
    }

    return '<i class="rating__star fa fa-star"></i>'
  });

  const reviewEntity = {
    name: nameInput.value,
    host: hostInput.value,
    review: reviewInput.value,
    rating: rating,
    date: getCurrentDate(),
    id: generateId()
  }

  const div = document.createElement('div');
  div.classList.add('podcastreview');
  div.innerHTML = `
    <a data-id="${reviewEntity.id}" href="#" class="delete">X</a>
    <h2>Podcast: ${reviewEntity.name}</h2>  
    <h2>Host: ${reviewEntity.host}</h2>
    <p>${reviewEntity.review}</p>
    <div class="podcastrating">${ratingElements.join(' ')}</div>
    <div class="date">${reviewEntity.date}</div>
  `;

  podcastreviews.prepend(div);

  let reviews = JSON.parse(localStorage.getItem('reviews'))

  if (reviews === null) {
    reviews = []
  }

  reviews.unshift(reviewEntity)
  localStorage.setItem('reviews', JSON.stringify(reviews))

  clearField();

}

// Clear field 
function clearField() {
  nameInput.value = '';
  hostInput.value = '';
  reviewInput.value = '';
  document.querySelector('.create-box .rating').innerHTML = `
  <i class="rating__star fa fa-star"></i>
  <i class="rating__star fa fa-star"></i>
  <i class="rating__star fa fa-star"></i>
  <i class="rating__star fa fa-star"></i>
  <i class="rating__star fa fa-star"></i>
  `;
  createRatingEventListeners();
}

// Delete Review
function deleteReview(target) {
  const id = target.getAttribute('data-id');
  let reviews = JSON.parse(localStorage.getItem('reviews'));
  if (reviews === null) {
    reviews = []
  }
  const filteredReviews = reviews.filter(review => {
    return review.id !== id
  });
  localStorage.setItem('reviews', JSON.stringify(filteredReviews));
  
  if(target.className === 'delete') {
    target.parentElement.remove();
  }
}

// Star Rating
function createRatingEventListeners() {
  const stars = [...document.querySelectorAll(".create-box .rating__star")];
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

createRatingEventListeners();


// Close create box when you click close button
function handleCloseButton() {
  createBox.style.display = 'none';
}



  
