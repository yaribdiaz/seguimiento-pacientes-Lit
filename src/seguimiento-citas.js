import { LitElement, html, css } from "lit";
import "./components/cita-paciente"
import "./components/form-component"

export class SeguimientoCitas extends LitElement{

    static styles = css `
        .seguimiento {
            display: flex;
            justify-content: space-around;
        }
    `

    static properties = {
        pacientes: {}
    }

    constructor(){
        super();
        this.pacientes = [{nombre: "Doug", propietario: "Miriam", email: "ad@gmail.com", fecha: "29/02/2024", sintomas: "Hace esto y olo otro", id: 1}, {nombre: "Champi", propietario: "Miriam", email: "ad@gmail.com", fecha: "29/02/2024", sintomas: "Hace esto y olo otro", id: 2}];
        this.mascota = {nombre:'', propietario:'', email:'', fecha: '', sintomas: ''};
    }

    connectedCallback(){
        super.connectedCallback();
        this.addEventListener('datos-actualizados', this.handleDatosActualizados);
        this.addEventListener('editar-datos', this.handleSetData);
    }

    disconnectedCallback(){
        super.disconnectedCallback();
        this.removeEventListener('datos-actualizados', this.handleDatosActualizados);
        this.removeEventListener('editar-datos', this.handleSetData);
    }

    render(){
        return html `
        <div class="seguimiento">
        <div>
        <form-component .mascota=${this.mascota}></form-component>
        </div>
        <div>
        <cita-paciente .pacientes=${this.pacientes}></cita-paciente>
        </div>
        </div>
        `;
    }

    handleDatosActualizados(event){
        const datos  = event.detail;
        this.pacientes = [...this.pacientes, datos];
        this.requestUpdate();
    }

    handleSetData(event){
        const datos = event.detail;
        this.mascota = {...datos};
        this.requestUpdate();
    }
}

customElements.define('seguimiento-citas', SeguimientoCitas);