import { render, html} from "lit-html";
import {template as listTemplate} from "./MediaCardListTemplate.js"
import API_KEY from "../../key.js";


const template = (type, list, _this) => html`
    <div style="display: flex; flex-direction: row;align-items: center; gap: 16px; padding: 20px">
        <h1 class="cds--type-productive-heading-04">Grátis para Assistir</h1>
        <cds-content-switcher style="width: fit-content"
          value="movie"
          @cds-content-switcher-selected="${ ({detail: {item}}) => _this.setAttribute("data-media-type", item.value)}">
            <cds-content-switcher-item value="movie">Filmes</cds-content-switcher-item>
            <cds-content-switcher-item value="tv">TV</cds-content-switcher-item>
        </cds-content-switcher>
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
