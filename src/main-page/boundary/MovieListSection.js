import { html, render } from "lit-html";

const template = ({ title, options, list }) => html`
<style>
:host {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: auto auto;
}

.first-row {
  grid-row:  1 / 2;
  justify-self: start;
  align-self: center;
}

.second-row {
  grid-row: 2 / 3;
}

.header {
  grid-column: 1 / 3;
}

.switcher {
  grid-column: 3 / 5;
}

.full-width {
  grid-column: 1 / -1;
}
</style>
  <h1 class="first-row header cds--type-productive-heading-04">${title}</h1>
  <cds-content-switcher class="first-row switcher">
    ${[...options.entries()].map((entry) => html`
      <cds-content-switcher-item value=${entry[0]}>${entry[1]}</cds-content-switcher-item>
    `
)}
  </cds-content-switcher>
  <tmdb-media-list class="second-row full-width" .list=${list}></tmdb-media-list>
  `
export class MovieListSection extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.addEventListener(
      'cds-content-switcher-selected',
      (e) => { this.setAttribute('data-range', e.detail.item.value); }
    );
  }

  connectedCallback() {
    this.view();
  }

  attributeChangedCallback(name, oldValue, newValue) { this.view(); }

  view() {
    if (!this.getAttribute('data-range')) {
      this.setAttribute('data-range', [...this.options.keys()][0]);
      // this.shadowRoot.querySelector('.switcher').setAttribute("value", [...this.options.keys()][0])
    }
    const range = this.getAttribute("data-range");
    this.filter(range).then(json => {
      render(template({ title: this.title, options: this.options, list: json }), this.shadowRoot);
    });
  }

  static get observedAttributes() { return ["data-range"] }
}

