import { html, LitElement } from 'lit';
import {} from './cita-paciente';

export class ListadoPacientes extends LitElement {
    static properties = {
        pacientes: { type: Array }
    }

    constructor(){
        super();
        this.pacientes = [{nombre: "Doug", propietario: "Adonis", email: "ad@gmail.com", fecha: "29/02/2024", sintomas: "Hace esto y olo otro", id: 1}]
    }

    

    render(){
        return html`<cita-paciente></cita-paciente>`
    }


}

customElements.define('listado-pacientes', ListadoPacientes);