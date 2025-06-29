const auth = "7MNJiUIciHMjQhpkxZgNqqS4jWLdfYDxd6SzN3wv2aTHKaf9mvxZmsJ5"; //ADD THE AUTH KEY
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;
const more = document.querySelector(".more");
let page = 1;
let fetchLink;
let currentSearch;

//Event Listeners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", e => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});
more.addEventListener("click", loadMore);

function updateInput(e) {
  searchValue = e.target.value;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth
    }
  });
  const data = await dataFetch.json();
  return data;
}

function generatePictures(data) {
  data.photos.forEach(photo => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
  <div class="gallery-info">
    <p>${photo.photographer}</p>
    <a href="${photo.url}" target="_blank" rel="noopener noreferrer">Download</a>
  </div>
  <img src="${photo.src.large}"></img>`;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?";
  const data = await fetchApi(fetchLink);

  generatePictures(data);
}

async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

curatedPhotos();

const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    let currentIndex = 0;

    function moveToSlide(index) {
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      moveToSlide(currentIndex);
    }

    setInterval(nextSlide, 3000);