// import hitsCards from './templates/card-photos.hbs'
import './css/styles.css'

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";
import FetchPixabay from "./fetchPixabay";

const searchForm = document.querySelector('#search-form');
const galleryCotainer = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
const galleryList = document.querySelector('.gallery-list')
const newsApi = new FetchPixabay();
btnLoadMore.classList.add('is-hidden')
let totalHits = 0;
let page = 1;
const per_page = 40;
totalHits = page * per_page;
let lightbox = new SimpleLightbox('.gallery_link a', {
    captions: true,
    captionsData: 'alt',
    captionsDelay: 300,
});


searchForm.addEventListener('submit', handleSearch);
btnLoadMore.addEventListener('click', handleLoadMore);
const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});


function handleSearch(event) {
    event.preventDefault();
        
    clearHitsPhotos();
    newsApi.query = event.currentTarget.elements.searchQuery.value.trim();
    newsApi.resetPage();
    if (newsApi.query === '') {
        btnLoadMore.classList.add('is-hidden');
        Notiflix.Notify.warning('Please enter a search parameter');
        return;
    }   Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`)
        btnLoadMore.classList.remove('is-hidden')
        newsApi.resetPage();
        newsApi.fetchPixabayGallery().then(appendHitsMarkup);
    }

function handleLoadMore() {
    totalHits += page * per_page
    if ((totalHits - page * per_page) > 0) {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    } else if ((totalHits - page * per_page) <= 0) {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results");
        btnLoadMore.classList.add('is-hidden');
    }
    newsApi.fetchPixabayGallery().then(appendHitsMarkup)
    
}

function appendHitsMarkup(hits) {
    const markup = hits.map(
        ({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
        }) => {
            return `
        <li>
    <a href="${largeImageURL}" target="_blank" class="gallery_link">
        <div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" width="auto" height="150" />

            <div class="info">
                <p class="info-item">
                    <b>Likes:</b>${likes}
                </p>
                <p class="info-item">
                    <b>Views:</b>${views}
                </p>
                <p class="info-item">
                    <b>Comments:</b>${comments}
                </p>
                <p class="info-item">
                    <b>Downloads:</b>${downloads}
                </p>
            </div>
        </div>
    </a>
</li>`
        }
    ).join('');
    galleryList.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
}

function clearHitsPhotos() {
    galleryList.innerHTML = '';
}