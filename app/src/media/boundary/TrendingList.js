import { html,render } from "../../libs/lit-html.js"
import "./MediaCard.js"
import API_KEY from "../../../../key.js"

const template = (list, _this) => html`
    <div style="display: flex; flex-direction: row;align-items: center">
        <h2>Tendências</h2>
        <input type="radio" @click=${e => _this.setAttribute("data-range", "day")} name="range" id="day" value="day">
        <label for="day">Day</label>
        <input type="radio" @click=${e => _this.setAttribute("data-range", "week")} name="range" id="week" value="week">
        <label for="week">Week</label>
    </div>
    <ul style="display: flex; flex-direction: row; overflow-x: scroll">
        ${list.map(element => html`
            <li style="list-style-type: none; padding: 1rem">
                <tmdb-media-card data-id="${element.id}"><tmbd-media-card>
            </li>
        `)}
    </ul>`
class TrendingList extends HTMLElement {

    constructor(){
        super();
    }

    connectedCallback(){
        this.view()
    }

    attributeChangedCallback(name, oldValue, newValue){
        this.view();
    }

    view(){
        const range = this.dataset.range || "day";
        fetch(`https://api.themoviedb.org/3/trending/all/${range}\?api_key\=${API_KEY}`)
            .then(response => response.json())
            .then(json => render(template(json.results, this), this));
    }

    static get observedAttributes(){return ["data-range"]}
}

customElements.define("tmdb-trending-list", TrendingList);
