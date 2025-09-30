import { html, render } from "lit-html";

const template = ({ id, title, image_host, poster_path, release_date }) => html`
<style>

:host{
  display: grid;
  grid-template-rows: subgrid;
  grid-row-start: 1;
  grid-row-end: 3;
}

img {
  border-radius: 8px;
  max-width: 100%;
}

cds-link {
  grid-row-start: 1;
  grid-row-end: 2;
  cursor: pointer;
}
cds-link > div {
  min-height: 2em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>
<cds-link inline="false" size="lg" href="/movie/${id}" title="${title}" @click=${(e) => this.handleMovieClick(e, id)}>
   <img loading="lazy"
     src="${image_host}/t/p/w220_and_h330_face${poster_path}"
     srcset="${image_host}/t/p/w220_and_h330_face${poster_path} 1x, ${image_host}/t/p/w440_and_h660_face${poster_path} 2x" alt="">
    <div>${title}</div>
</cds-link>
<div>${release_date}</div>
`

class MovieListItem extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const observer = new MutationObserver(() => {
      observer.takeRecords();
      this.view();
    });
    observer.observe(this,
      { attributes: true, childList: false, subtree: false })
    this.view();
  }
  connectedCallback() {
  }

  disconnectedCallback() { observer.disconnect(); }

  handleMovieClick(e, movieId) {
    e.preventDefault();
    const router = document.querySelector("tmdb-router");
    if (router) {
      router.goTo(`/movie/${movieId}`);
    }
  }

  view() {
    const data = {
      id: this.dataset.id,
      title: this.dataset.title,
      poster_path: this.dataset.poster_path,
      overview: this.dataset.overview,
      release_date: this.dataset.release_date,
      image_host: 'https://image.tmdb.org'
    };
    render(template(data), this.shadowRoot);
  }

  static get observedAttributes() { return ["data-movie"] }
}

customElements.define("tmdb-movie-list-item", MovieListItem);
