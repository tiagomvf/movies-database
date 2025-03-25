// import { html,render } from "../../libs/lit-html.js"
import { render, html} from "lit-html";
// import "./MediaCard.js"
import {template as listTemplate} from "./MediaCardListTemplate.js"
import API_KEY from "../../key.js"

const template = (list) => html`
    <div style="display: flex; flex-direction: row;align-items: center; gap: 16px; padding: 20px">
        <h1 class="cds--type-productive-heading-04">Tendências</h1>
        <cds-content-switcher style="width: fit-content;"
          value="day">
            <cds-content-switcher-item value="day">Hoje</cds-content-switcher-item>
            <cds-content-switcher-item value="week">Nesta Semana</cds-content-switcher-item>
        </cds-content-switcher>
    </div>
    ${listTemplate("movie", list)}
    `
class TrendingList extends HTMLElement {

    constructor(){
        super();
        if(!this.getAttribute("data-range")){
            this.setAttribute("data-range", "day");
        }
    }

    connectedCallback(){
        this.view();
        this.addEventListener('cds-content-switcher-selected', (e) => {
            this.setAttribute('data-range', e.detail.item.value);
        });
    }

    attributeChangedCallback(name, oldValue, newValue){
        this.view();
    }

    view(){
        const range = this.getAttribute("data-range");
        fetch(`/api/3/trending/all/${range}\?api_key\=${API_KEY}`)
            .then(response => response.json())
            .then(json => render(template(json.results), this))
    }

    static get observedAttributes(){return ["data-range"]}
}

customElements.define("tmdb-trending-list", TrendingList);
