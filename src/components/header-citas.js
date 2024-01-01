import { LitElement, html, css } from 'lit';

export class HeaderCitas extends LitElement {
  

  render() {
    return html`
      <div class="title">
        <h1>
          Seguimiento Pacientes 
          <span>
            Veterinaria
          </span>
        </h1>
      </div>
    `;
  }

  static styles = [
    css`
      .title{
        text-align: center;
        padding: 0 4%;
      }
      .title h1{
        color: black;
        font-weight: 800;
        font-size: 1.8rem;
      }
      .title span{
        color: #4f46e5;
      }
      @media (min-width: 768px) { 
        .title h1{
          font-size:2.6rem;
        }
      }
      @media (min-width: 1024px) {
        .title h1{
          font-size: 3rem;
        }
      }
    `
  ];

}
customElements.define('header-citas', HeaderCitas);