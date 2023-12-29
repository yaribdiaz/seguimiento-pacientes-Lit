import { LitElement, html, css } from "lit";
import {map} from 'lit/directives/map.js';

export class CitaPaciente extends LitElement {
    static properties = {
        pacientes: { type: Array }
    }

    static styles = css `
        p {
            font-weight: bold;
        }

        span {
            font-weight: normal;
        }

        button {
            background-color: red;
            color: white;
            padding: 6px 8px;
            border-radius: 5px;
            border: white;
            font-weight: bold;
            cursor: pointer;
        }

        .buttons{
            display: flex;
            justify-content: space-around;
        }

        .paciente {
            box-shadow: 5px 5px 5px gray;
            border-radius: 10px;
            padding: 40px 10px;
        }
    `;

    constructor(){
        super();
        this.pacientes = [];
    }

    render(){
        return html `
        ${map(this.pacientes, (paciente) => html `<div class="paciente">
            
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
            <span>
            ${paciente.sintomas}
            </span>
        </p>

        <div class="buttons">

            <div>
            <button type="button"
            @click=${() => this.deletePaciente(paciente.id)}
            >Eliminar</button>
            </div>

            <div>
            <button style='background-color: blue' type="button"
            @click=${() => this.setPaciente(paciente.id)}
            >Editar</button>
            </div>


        </div>

        </div>`,
        (paciente) => paciente.id
 )}
        
        `


}

deletePaciente(id){
    this.pacientes = this.pacientes.filter((p) => p.id !== id);
    this.requestUpdate();
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