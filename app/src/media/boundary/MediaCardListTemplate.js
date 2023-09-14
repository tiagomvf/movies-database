// import { html,render } from "../../libs/lit-html.js"
import { render, html} from "lit-html";
// import "./MediaCard.js"

export const template = (media_type, list) => html`

<dds-card-section-carousel> 
    <dds-carrousel style="display:flex">
    ${list.map(({id, title, poster_path, overview, release_date}) => html`
        <dds-card href="#" style="width: fit-content;">
        <dds-card-eyebrow>${title}</dds-card-eyebrow>
        <dds-card-heading>
        <a href="/movie/${id}" title="${title}">
                    <img loading="lazy" src="https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}" srcset="https://image.tmdb.org/t/p/w220_and_h330_face${poster_path} 1x, https://image.tmdb.org/t/p/w440_and_h660_face${poster_path} 2x" alt="">
            </a>
        </dds-card-heading>
        <dds-card-footer slot="footer">
            <div>
            ${title}

</div>
            <svg
            slot="icon"
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            >
            <path d="M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z"></path>
            </svg>
        </dds-card-footer>
        </dds-card>
            
        `)}
    </dds-carrousel>
</dds-card-section-carousel>

    <!--<ul style="display: flex; flex-direction: row; overflow-x: scroll">
        ${list.map(element => html`
            <li style="list-style-type: none; padding: 1rem">
                <tmdb-media-card data-media_type="${media_type}" data-id="${element.id}"><tmbd-media-card>
            </li>
        `)}
    </ul> -->`
     
