import { html, render } from "lit-html";

import { template as listTemplate } from "./MediaCardListTemplate.js"
import { trendings } from "../control/MoviesStore.js";

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

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.addEventListener(
      'cds-content-switcher-selected',
      (e) => { this.setAttribute('data-range', e.detail.item.value); }
    );
    if (!this.getAttribute("data-range")) {
      this.setAttribute("data-range", "day");
    }
    this.view();
  }

  // connectedCallback() {
  // }

  attributeChangedCallback(name, oldValue, newValue) { this.view(); }

  view() {
    const range = this.getAttribute("data-range");
    trendings(range).then(json => render(template(json), this.shadowRoot));
  }

  static get observedAttributes() { return ["data-range"] }
}

customElements.define("tmdb-trending-list", TrendingList);
