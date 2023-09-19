// import { html,render } from "../../libs/lit-html.js"
import { render, html} from "lit-html";
// import "./MediaCard.js"

const image_host = "https://image.tmdb.org";
export const template = (media_type, list) => html`

<div style="display: flex">
    ${
        list
        .map(({title, name, release_date, first_air_date, ...rest}) => 
          ({
            title: title? title: name,
            release_date: release_date? release_date : first_air_date,
            ...rest
          })
        ).map(({id, title, poster_path, overview, release_date}) => html`
    <cds-tile style="min-width: 150px; max-width: 162px;">
    <div class="image" style="width: 100%; display: flex" >
    <div class="wrapper" style="width: inherit">
      <a class="image" href="/movie/${id}" title="${title}" style="width: inherit">
              <img loading="lazy" class="poster" style="width: inherit; border-radius: 8px"
                src="${image_host}/t/p/w220_and_h330_face${poster_path}"
                srcset="${image_host}/t/p/w220_and_h330_face${poster_path} 1x, ${image_host}/t/p/w440_and_h660_face${poster_path} 2x" alt="">
      </a>
    </div>
    <!-- <div class="options" data-id="${id}" data-object-id="5fa99158fcb8cc0041861bfa" data-media-type="movie" data-role="tooltip">
      <a class="no_click" href="#"><div class="glyphicons_v2 circle-more white"></div></a>
    </div> -->
  </div>
  <div class="content">
    <div class="consensus tight">
      <div class="outer_ring">
        <div class="user_score_chart 5fa99158fcb8cc0041861bfa" data-percent="64.53" data-track-color="#423d0f" data-bar-color="#d2d531">
          <div class="percent">
              <span class="icon icon-r65"></span>
          </div>
        <canvas style="height: 34px; width: 34px;" width="68" height="68"></canvas></div>
      </div>
    </div>

    <cds-link href="/movie/${id}" title="${title}">
    <h2 class="cds--type-heading-compact-02">${title}</h2>
    </cds-link>
    <p class="cds--type-caption-02">${release_date}</p>
  </div>

  <div class="hover 762430"></div>

    
    </cds-tile> `)}
</div>

    <!--<ul style="display: flex; flex-direction: row; overflow-x: scroll">
        ${list.map(element => html`
            <li style="list-style-type: none; padding: 1rem">
                <tmdb-media-card data-media_type="${media_type}" data-id="${element.id}"><tmbd-media-card>
            </li>
        `)}
    </ul> -->`
     
