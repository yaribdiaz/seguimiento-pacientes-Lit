import { LitElement, html, css } from 'lit';

export class TestComponent extends LitElement {

  static properties = {
    message: {},
  }

  constructor() {
    super();
    this.message = "Lit funcionando correctamente desde test-component.js!";
  }

  render() {
    return html`
      <h2>${this.message}</h2>
    `;
  }
}
customElements.define('test-component', TestComponent);
