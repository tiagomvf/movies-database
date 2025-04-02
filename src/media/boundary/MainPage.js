
class MainPage extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <tmdb-trending-list></tmdb-trending-list>
        <tmdb-popular-list></tmdb-popular-list>
        <tmdb-free-to-watch-list></tmdb-free-to-watch-list>
    `;
  }

}

customElements.define("tmdb-main-page", MainPage);
