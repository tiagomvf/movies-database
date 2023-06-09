import { html,render } from "../../libs/lit-html.js"
import "./MediaCard.js"
import API_KEY from "../../../../key.js"

export const template = (media_type, list) => html`
    <ul style="display: flex; flex-direction: row; overflow-x: scroll">
        ${list.map(element => html`
            <li style="list-style-type: none; padding: 1rem">
                <tmdb-media-card data-media_type="${media_type}" data-id="${element.id}"><tmbd-media-card>
            </li>
        `)}
    </ul>`
