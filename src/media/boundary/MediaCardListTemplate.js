import "./MovieCard.js"

import { html } from "lit-html";

const calcDate =
  ({ release_date, first_air_date }) => {
    const date = Date.parse(release_date ? release_date : first_air_date);
    const languages = navigator.languages || ['en-US'];
    return new Intl.DateTimeFormat(languages, { dateStyle: "medium" })
      .format(date);
  }

export const template = (media_type, list) => html`

<div style="display: flex; gap: 1em; overflow-y: auto; scrollbar-width: thin;">
    ${list.map(({ title, name, release_date, first_air_date, ...rest }) => ({
  title: title ? title : name,
  release_date: calcDate({ release_date, first_air_date }),
  ...rest
}))
    .map(({ id, title, poster_path, overview, release_date }) => html`
        <tmdb-movie-list-item
          data-id=${id}
          data-title=${title}
          data-poster_path=${poster_path}
          data-overview=${overview}
          data-release_date=${release_date}
        ></tmdb-movie-list-item>
    `)}
</div>
`
