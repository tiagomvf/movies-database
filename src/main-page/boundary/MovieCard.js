import { html, render } from "lit-html";

const template = ({ id, title, image_host, poster_path, release_date }) => html`
<style>

img {
  border-radius: 8px;
}

a {
  text-decoration: none;
}

cds-link * {
  text-color: green;
}
</style>
<cds-link href="/movie/${id}" title="${title}">
  <div>
   <img loading="lazy" class="poster"
     src="${image_host}/t/p/w220_and_h330_face${poster_path}"
     srcset="${image_host}/t/p/w220_and_h330_face${poster_path} 1x, ${image_host}/t/p/w440_and_h660_face${poster_path} 2x" alt="">
    <div>${title}</div>
    <div>${release_date}</div>
  </div>
</cds-link>
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
