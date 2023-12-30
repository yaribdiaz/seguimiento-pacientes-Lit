import { LitElement, css, html, nothing } from "lit";
import "./error-component";
import { when } from "lit/directives/when.js";

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
   padding-left: 1.25rem;
   padding-right: 1.25rem;
    }

    div {
        margin-bottom: 1em;
    }

    label {
        color: #4a5568;
   text-transform: uppercase;
   font-weight: bold;

    }
    textarea,
    input {
        border: 2px solid;
   width: 100%;
   margin-top: 0.5rem;
   padding: 0.25rem;
   border-radius: 0.375rem;
    }
    input::placeholder {
   color: #cbd5e0;
    }

    button {
   background-color: #4f46e5; 
   width: 100%;
   color: white;
   padding: 0.75rem; 
   border-radius: 0.375rem; 
   text-transform: uppercase;
   cursor: pointer;
   transition: all 0.3s; 
}


button:hover {
   background-color: #4338ca;
}

  `;

  static properties = {
    mascota: {},
    error: { type: Boolean },
  };

  constructor() {
    super();
    this.mascota = { nombre: "", propietario: "", email: "", fecha: "", sintomas: "" };
    this.error = false;
  }

  render() {
    return html`
      <div>
        <h2>Seguimiento Pacientes</h2>
        <p>Añade Pacientes y Adminístralos</p>
        <form>
          ${when(
            this.error,
            () => html`<error-component mensaje="Todos los campos son obligatorios" />`,
            () => nothing
          )}
          <div>
            <label htmlFor="mascota">Nombre de la Mascota</label>
            <input
              id="mascota"
              type="text"
              placeholder="Nombre de Mascota"
              .value=${this.mascota.nombre}
              @input=${(e) => this.handleFieldChange(e, "nombre")}
            />
          </div>

          <div>
            <label htmlFor="propietario">Propietario</label>
            <input
              id="propietario"
              type="text"
              placeholder="Propietario"
              .value=${this.mascota.propietario}
              @input=${(e) => this.handleFieldChange(e, "propietario")}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              .value=${this.mascota.email}
              @input=${(e) => this.handleFieldChange(e, "email")}
            />
          </div>

          <div>
            <label htmlFor="alta">Alta</label>
            <input
              id="alta"
              type="date"
              .value=${this.mascota.fecha}
              @input=${(e) => this.handleFieldChange(e, "fecha")}
            />
          </div>

          <div>
            <label for="sintomas">Síntomas</label>
            <textarea
              id="sintomas"
              cols="30" rows="4"
              placeholder="Describe los síntomas"
              .value=${this.mascota.sintomas}
              @input=${(e) => this.handleFieldChange(e, "sintomas")}
            ></textarea>
          </div>
          </div>
          <button
            type="button"
            @click=${() => {
              this.setMascota(this.mascota);
              this.mascota = { nombre: "", propietario: "", email: "", fecha: "", sintomas: "" };
            }}
          >
            Agregar Paciente
          </button>
        </form>
      </div>
    `;
  }

  handleFieldChange(event, field) {
    const value = event?.target?.value || '';
    this.mascota = { ...this.mascota, [field]: value };
  }

  setMascota(mascota) {
    this.dispatchEvent(
      new CustomEvent("datos-actualizados", {
        bubbles: true,
        composed: true,
        detail: mascota,
      })
    );
  }
}

customElements.define("form-component", FormComponent);