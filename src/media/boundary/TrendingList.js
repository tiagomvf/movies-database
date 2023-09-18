// import { html,render } from "../../libs/lit-html.js"
import { render, html} from "lit-html";
// import "./MediaCard.js"
import {template as listTemplate} from "./MediaCardListTemplate.js"
import API_KEY from "../../../key.js"

const template = (list, _this) => html`
    <div style="display: flex; flex-direction: row;align-items: center">
        <h1>Tendências</h1>
        <cds-content-switcher style="width: fit-content"
          value="day"
          @cds-content-switcher-selected="${ ({detail: {item}}) => _this.setAttribute("data-range", item.value)}">
            <cds-content-switcher-item value="day">Dia</cds-content-switcher-item>
            <cds-content-switcher-item value="week">Semana</cds-content-switcher-item>
        </cds-content-switcher>
    </div>
    <div>
    ${listTemplate("movie", list)}
    </div>`
class TrendingList extends HTMLElement {

    constructor(){
        super();
        if(!this.getAttribute("data-range")){
            this.setAttribute("data-range", "day");
        }
    }

    connectedCallback(){
        this.view();
    }

    attributeChangedCallback(name, oldValue, newValue){
        this.view();
    }

    view(){
        const range = this.getAttribute("data-range");
        fetch(`https://api.themoviedb.org/3/trending/all/${range}\?api_key\=${API_KEY}`)
            .then(response => response.json())
            .then(json => ({ results: json.results, component: this}))
            .then(({results, component}) => ({ template: template(results, component), component}))
            .then(({template, component}) => render(template, component));
    }

    static get observedAttributes(){return ["data-range"]}
}

customElements.define("tmdb-trending-list", TrendingList);
