// import axios from "axios";

export default class FetchPixabay {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.per_page = 40;
    }
    
     fetchPixabayGallery() {
        const url = `https://pixabay.com/api/?key=35017734-fed2e09b3d8a04f799b9cec3a&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
       return fetch(url).then(response => response.json()).then(({hits, totalHits}) => {
const result = {hits, totalHits}
            this.incrementPage();
            console.log(result)
           return hits;
        })
    }
    // async fetchPixabayGallery() {
    //     const axiosOptions = {
    //         url: 'https://pixabay.com/api/',
    //         params: {
    //             key: '35017734-fed2e09b3d8a04f799b9cec3a',
    //             q: `${this.searchQuery}`,
    //             image_type: 'photo',
    //             orientation: 'horizontal',
    //             safesearch: true,
    //             per_page: `${this.per_page}`,
    //             page: `${this.page}`,
    //         }
    //     };
    //     try {
    //         const response = await axios(axiosOptions);
    //         const {hits, totalHits} = response.data;
    //         this.incrementPage();
    //         return hits;
    //     }
    //     catch (error) {
    //         console.error(error);
    //     }
    // }
    incrementPage() {
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }
    get query() {
        return this.searchQuery
    }
    set query(newQuery) {
        this.searchQuery = newQuery
    }
}