// import { html,render } from "../../libs/lit-html.js"
import { render, html} from "lit-html";

// import "./MediaCard.js"

export const template = (media_type, list) => html`

<dds-card-section-carousel> 
    <dds-carrousel style="display:flex">
    ${list.map(({id, title, poster_path, overview, release_date}) => html`
        <dds-card href="#" style="width: fit-content;">
        <!-- <dds-card-heading>${title}</dds-card-heading> -->
        <!-- <dds-card-eyebrow> -->
        <!-- </dds-card-eyebrow> -->
        <dds-image style="width: 200px">
                <dds-image-item media="(min-width:440px)" srcset="https://image.tmdb.org/t/p/w440_and_h660_face${poster_path}">
            </dds-image-item>
                <dds-image-item media="(min-width:220px)" srcset="https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}">
            </dds-image-item>
        </dds-image>
        <dds-card-footer slot="footer">
            <div>${title}</div>
            ${release_date}
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
     
