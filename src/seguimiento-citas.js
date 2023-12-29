import { LitElement, html, css } from "lit";
import "./components/cita-paciente"
import "./components/form-component"

export class SeguimientoCitas extends LitElement{

    static properties = {
        pacientes: {}
    }

    constructor(){
        super();
        this.pacientes = [{nombre: "Doug", propietario: "Miriam", email: "ad@gmail.com", fecha: "29/02/2024", sintomas: "Hace esto y olo otro", id: 1}, {nombre: "Champi", propietario: "Miriam", email: "ad@gmail.com", fecha: "29/02/2024", sintomas: "Hace esto y olo otro", id: 2}];
    }


    render(){
        return html `
        <cita-paciente .pacientes=${this.pacientes}></cita-paciente>
        <form-component></form-component>
        `;
    }
}

customElements.define('seguimiento-citas', SeguimientoCitas);