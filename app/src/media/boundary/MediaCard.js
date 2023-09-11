import { render, html} from "lit-html";
import API_KEY from "../../../../key.js";

const template = ({id, title, poster_path, overview, release_date}) => html`
<div class="image">
    <div class="wrapper">
      <a class="image" href="/movie/${id}" title="${title}">
              <img loading="lazy" class="poster" src="https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}" srcset="https://image.tmdb.org/t/p/w220_and_h330_face${poster_path} 1x, https://image.tmdb.org/t/p/w440_and_h660_face${poster_path} 2x" alt="">
      </a>
    </div>
    <div class="options" data-id="${id}" data-object-id="5e55ba97a93d2500134fa1ee" data-media-type="movie" data-role="tooltip">
      <a class="no_click" href="#"><div class="glyphicons_v2 circle-more white"></div></a>
    </div>
  </div>
  <div class="content">
    <div class="consensus tight">
      <div class="outer_ring">
        <div class="user_score_chart 5e55ba97a93d2500134fa1ee" data-percent="72.46000000000001" data-track-color="#204529" data-bar-color="#21d07a">
          <div class="percent">
              <span class="icon icon-r72"></span>
          </div>
        <canvas style="height: 34px; width: 34px;" width="68" height="68"></canvas></div>
      </div>
    </div>
    <h2><a href="/movie/${id}" title="${title}">${title}</a></h2>
    <p>${release_date}</p>
  </div>
  <div class="hover ${id}"></div>
`;

class MediaCard extends HTMLElement {

    constructor(){
        super();
    }

    connectedCallback(){
      this.view();
    }

    view(){
        const id = this.dataset.id;
        const media = this.dataset.media_type;
        fetch(`https://api.themoviedb.org/3/${media}/${id}\?api_key\=${API_KEY}`)
            .then(response => response.json())
            .then(json => render(template(json), this));
    }

    attributeChangedCallback(name, oldValue, newValue){
      this.view();
  }

    static get observedAttributes(){return ["data-id"]}
}

customElements.define("tmdb-media-card", MediaCard);
