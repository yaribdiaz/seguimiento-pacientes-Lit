import { LitElement, html, css } from 'lit';

export class ErrorComponent extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }

            p {
                background-color: red;
                color: black;
                padding: 1em;
                text-align: center;
                border-radius: 0.25em;
                margin-bottom:0.5em;
                font-size: large;
                font-weight: bold;
            }
        `
    ];

    static properties = {
        message: {type: String},
    };

    constructor(){
        super();
        this.message = "Soy tu error preferido";
    }

    render() {
        console.log("rederizado error-component");
        return html`
        <p>${this.message}</p>
        `;
    }
}
customElements.define('error-component', ErrorComponent);
