import { render, html} from "lit-html";

const calcDate = ({release_date, first_air_date}) => {
  const date = Date.parse(release_date? release_date : first_air_date);
  const languages = navigator.languages || ['en-US'];
  return new Intl.DateTimeFormat(languages, { dateStyle: "medium" })
    .format(date);
}

const image_host = "https://image.tmdb.org";
export const template = (media_type, list) => html`

<div style="display: flex; overflow-y: auto; scrollbar-width: thin;">
    ${
        list
        .map(({title, name, release_date, first_air_date, ...rest}) => 
          ({
            title: title? title: name,
            release_date: calcDate({release_date, first_air_date}),
            ...rest
          })
        ).map(({id, title, poster_path, overview, release_date}) => html`
    <cds-layer style="min-width: fit-content; padding: 0 16px 16px 16px">
    
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
    `)}
</div>
`

