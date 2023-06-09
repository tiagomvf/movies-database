import {html, render} from "../../libs/lit-html.js"
import "./MediaCard.js"
import {template as listTemplate} from "./MediaCardListTemplate.js"
import API_KEY from "../../../../key.js"

const template = (type, list, _this) => html`
    <div style="display: flex; flex-direction: row;align-items: center">
        <h2>Mais Populares</h2>
        <div style="text-transform: capitalize">
        <input type="radio" checked @click=${e => _this.setAttribute("data-media-type", e.target.value)} name="popular-media-type" id="movie" value="movie">
        <label for="movie">filmes</label>
        <input type="radio" @click=${e => _this.setAttribute("data-media-type", e.target.value)} name="popular-media-type" id="tv" value="tv">
        <label for="tv">tv</label>
        </div>
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
        fetch(`https://api.themoviedb.org/3/${type}/popular\?api_key\=${API_KEY}`)
            .then(response => response.json())
            .then(json => render(template(type, json.results, this), this));
    }

    static get observedAttributes(){return ["data-media-type"]}
}

customElements.define("tmdb-popular-list", PopularList);
