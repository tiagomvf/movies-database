// import { html,render } from "../../libs/lit-html.js"
import { render, html} from "lit-html";
import "./MediaCard.js"
import {template as listTemplate} from "./MediaCardListTemplate.js"
import API_KEY from "../../../../key.js"

const template = (list, _this) => html`
    <div style="display: flex; flex-direction: row;align-items: center">
        <h2>Tendências</h2>
        <input type="radio" checked @click='${_ => _this.setAttribute("data-range", "day")}' name="range" id="day" value="day">
        <label for="day">Day</label>
        <input type="radio" @click='${_ => _this.setAttribute("data-range", "week")}' name="range" id="week" value="week">
        <label for="week">Week</label>
    </div>
    ${listTemplate("movie", list)}`
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
