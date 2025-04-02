import { html, render } from "lit-html";

const template = ({ id, title, image_host, poster_path, release_date }) => html`
<style>
cds-link h2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
     <cds-layer style="width: fit-content; height: fit-content; padding: 0">
     <div style="width: 150px; min-width: 150px; max-width: 322px">
       <a href="/movie/${id}" title="${title}" > 
         <img loading="lazy" class="poster" style="border-radius: 8px; width: 100%"
           src="${image_host}/t/p/w220_and_h330_face${poster_path}"
           srcset="${image_host}/t/p/w220_and_h330_face${poster_path} 1x, ${image_host}/t/p/w440_and_h660_face${poster_path} 2x" alt="">
       </a>
       <cds-link href="/movie/${id}" title="${title}">
         <h2 class="cds--type-heading-compact-02">${title}</h2>
       </cds-link>
       <p class="cds--type-caption-02">${release_date}</p>
     </div>
     </cds-layer>
`

class MovieListItem extends HTMLElement {

  constructor() { super(); }
  connectedCallback() {
    this.view();
    const observer = new MutationObserver(() => {
      observer.takeRecords();
      this.view();
    });
    observer.observe(this,
      { attributes: true, childList: false, subtree: false })
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
    render(template(data), this);
  }

  static get observedAttributes() { return ["data-movie"] }
}

customElements.define("tmdb-movie-list-item", MovieListItem);
