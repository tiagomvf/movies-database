// import {html, render} from "../../libs/lit-html.js"
import { render, html} from "lit-html";
// import "./MediaCard.js"
import {template as listTemplate} from "./MediaCardListTemplate.js"
import API_KEY from "../../key.js"

const urls = {
    tv: 'https://api.themoviedb.org/3/tv/popular',
    movie: 'https://api.themoviedb.org/3/movie/popular',
    in_theaters: 'https://api.themoviedb.org/3/movie/now_playing'
};


const template = (type, list, _this) => html`
    <div style="display: flex; flex-direction: row;align-items: center">
        <h1>Mais Populares</h1>
        <cds-content-switcher style="width: fit-content"
          value="movie"
          @cds-content-switcher-selected="${ ({detail: {item}}) => _this.setAttribute("data-media-type", item.value)}">
            <cds-content-switcher-item value="movie">Filmes</cds-content-switcher-item>
            <cds-content-switcher-item value="tv">Na TV</cds-content-switcher-item>
            <cds-content-switcher-item value="in_theaters">Nos Cinemas</cds-content-switcher-item>
        </cds-content-switcher>
    </div>
    ${listTemplate(type, list)}`
class PopularList extends HTMLElement {

    constructor(){
        super();
        if(!this.getAttribute("data-media-type")){
            this.setAttribute("data-media-type", "movie");
        }
    }
    connectedCallback(){
        this.view();
    }
    attributeChangedCallback(name, oldValue, newValue){
        this.view();
    }

    view(){
        const type = this.getAttribute("data-media-type");

        fetch(`${urls[type]}\?api_key\=${API_KEY}`)
        //  fetch(`https://api.themoviedb.org/3/${type}/popular\?api_key\=${API_KEY}`)
        // fetch(
        //     `https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_video=false&language=en_UR&page=1&sort_by=popularity.desc`,
        //     {headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMGZmNGMwMjE1Y2MyOTM4NDQ0NzFlNGMzOGRhMGE4NCIsInN1YiI6IjY0Mjg3NDRlMGYzNjU1MDBkMjdhMjQ5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OVU1QdK3D8Ak73THorxkr85QbntX8j9QjIHA8x7DWCI'}})
            .then(response => response.json())
            .then(json => render(template(type, json.results, this), this));
    }

    static get observedAttributes(){return ["data-media-type"]}
}



customElements.define("tmdb-popular-list", PopularList);
