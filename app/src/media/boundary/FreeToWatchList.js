import { render, html} from "lit-html";
// import "./MediaCard.js"
import {template as listTemplate} from "./MediaCardListTemplate.js"
import API_KEY from "../../../key.js"

const template = (type, list, _this) => html`
    <div style="display: flex; flex-direction: row;align-items: center">
        <h2>grátis para assistir</h2>
        <div style="text-transform: capitalize">
        <input type="radio" checked @click=${e => _this.setAttribute("data-media-type", e.target.value)} name="free-to-watch-media-type" id="movie" value="movie">
        <label for="movie">filmes</label>
        <input type="radio" @click=${e => _this.setAttribute("data-media-type", e.target.value)} name="free-to-watch-media-type" id="tv" value="tv">
        <label for="tv">tv</label>
        </div>
    </div>
    ${listTemplate(type, list)}`
class FreeToWatchList extends HTMLElement {

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
        const url = `https://api.themoviedb.org/3/discover/${type}\?api_key\=${API_KEY}\&with_watch_monetization_types\=free&sort_by\=popularity.desc\&watch_region\=US\&certification_country=\US`
        fetch(url)
            .then(response => response.json())
            .then(json => render(template(type, json.results, this), this));
    }

    static get observedAttributes(){return ["data-media-type"]}
}

customElements.define("tmdb-free-to-watch-list", FreeToWatchList);
