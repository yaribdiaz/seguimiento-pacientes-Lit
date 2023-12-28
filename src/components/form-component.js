import { LitElement, css, html } from "lit";
import "./error-component";

class FormComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    h2 {
      font-weight: bold;
      font-size: 1.5rem;
      text-align: center;
    }

    p {
      color: #4f46e5;
      font-weight: bold;
      font-size: large;
    }

    form {
        background-color: white;
   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
   border-radius: 1.5rem;
   padding-top: 2.5rem;
   padding-bottom: 2.5rem;
   padding-left: 1.25rem;
   padding-right: 1.25rem;
    }

    div {
        margin-bottom: 5em;
    }

    label {
        color: #4a5568;
   text-transform: uppercase;
   font-weight: bold;
    }

    input {
        border: 2px solid;
   width: 100%;
   margin-top: 0.5rem;
   padding: 0.25rem;
   border-radius: 0.375rem;
    }
    input::placeholder {
   color: #cbd5e0;
  `;

  static properties = {
    nombre: { type: String },
    error: {type: Boolean}
  };

  constructor() {
    super();
    this.nombre = "";
    this.error = false;
  }

  render() {
    return html`
      <div>
        <h2>Seguimiento Pacientes</h2>

        <p>Añade Pacientes y Administralos</p>

        <form>
            <div>
                <label>Nombre de la Mascota</label>
                <input id="mascota" type="text" placeholder="Nombre de Mascota"
                />
            </div>
        </form>
      </div>
    `;
  }
}

customElements.define("form-component", FormComponent);

