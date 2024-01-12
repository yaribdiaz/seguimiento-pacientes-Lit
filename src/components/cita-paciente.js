import { LitElement, html, css } from "lit";
import {map} from 'lit/directives/map.js';
import { ModalComponent } from "./modal-component";

export class CitaPaciente extends LitElement {
    static properties = {
        pacientes: { type: Array, reflect: true },
        modal: { type: Boolean }
    }

    static styles = css `
        h2 {
            text-align: center;
        }
        .descripcion {
            text-align: center;
            font-weight: bold;
            font-size: large;
        }
        .descripcion span {
            color: #4f46e5;
            font-weight: bold;
        }
        p {
            font-weight: bold;
        }

        span {
            font-weight: normal;
        }
        .container{
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
        }
        button {
            background-color: red;
            color: white;
            padding: 8px 20px;
            border-radius: 10px;
            border: white;
            font-weight: bold;
            cursor: pointer;
            width: 8rem;
            font-size: 0.8rem;
            font-weight: 800;
            text-transform: uppercase;
        }

        .buttons{
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
        }

        .paciente {
            background-color: white;
            box-shadow: 5px 5px 5px gray;
            border-radius: 10px;
            padding: 30px;
        }
    `;
        
    constructor(){
        super();
        this.pacientes = [];
        this.modal = false;
    }
    paciente;
    render(){
        console.log("renderizado cita-paciente");
        return html `
        <modal-component ?modal=${this.modal} .paciente=${this.paciente} .deletePaciente=${this.deletePaciente} .closeModal=${this.closeModal.bind(this)} ></modal-component>
        <h2>Listado Pacientes ${this.modal}</h2>
        <p class="descripcion">
            Administra tus 
            <span>Pacientes y Citas</span>
        </p>
        <div class="container">
            ${map(this.pacientes, (paciente) => html `
            <div class="paciente">
                <p>Nombre: 
                    <span>${paciente.nombre}</span>
                </p>
                <p>Propietario:
                    <span>${paciente.propietario}</span>
                </p>
                <p>Email : 
                    <span>${paciente.email}</span>
                </p>
                <p>Fecha Alta :
                    <span>${paciente.fecha}</span>
                </p>
                <p>Síntomas : 
                    <span>${paciente.sintomas}</span>
                </p>
                <div class="buttons">

                        <button type="button"
                            @click=${() => {
                                this.showModal();
                                this.paciente = paciente.id;
                            }}
                        >
                            Eliminar
                        </button>

                        <button style='background-color: blue' type="button"
                        @click=${() => this.setPaciente(paciente.id)}
                        >
                            Editar
                        </button>

                </div>
            </div>
        
        `,
        (paciente) => paciente.id
 )}
        </div>
        
        `
}


showModal(){
    this.modal = true;
}
closeModal(){
    this.modal = false;
}
async deletePaciente(id) {
    this.closeModal();
    console.log('eliminando', id)
    await fetch(`https://seguimiento-citas.onrender.com/api-citas/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .catch(error => console.log('error', error));

    this.pacientes = await fetch("https://seguimiento-citas.onrender.com/api-citas", {method: 'GET'})
    .then(response => response.json())
    .catch(error => console.log('error', error));
    this.paciente = null;
}

setPaciente(id){
    this.dispatchEvent(new CustomEvent('editar-datos', {
        bubbles: true,
        composed: true,
        detail: this.pacientes.find((p) => p.id === id)
    }));
}



    
}

customElements.define('cita-paciente', CitaPaciente);
