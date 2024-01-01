import { LitElement, html, css } from "lit";
import "./components/cita-paciente"
import "./components/form-component"
import "./components/header-citas"

export class SeguimientoCitas extends LitElement{

    static styles = css `
        .seguimiento {
            display: flex;
            justify-content: space-around;
        }
    `

    banderaEditar = false;

    static properties = {
        pacientes: {}
    }

    constructor(){
        super();
        this.getData();
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
        console.log("Renderizado de seguimiento de citas");
        return html `
        <header-citas></header-citas>
        <div class="seguimiento">
        <div>
        <form-component .textoBoton=${this.banderaEditar ? "Editar" : "Enviar"} .mascota=${this.mascota}></form-component>
        </div>
        <div>
        <cita-paciente .pacientes=${this.pacientes}></cita-paciente>
        </div>
        </div>
        `;
    }

    async handleDatosActualizados(event){
        if (this.banderaEditar){
            const datos = event.detail;
            const body = JSON.stringify(datos);

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var requestOptions = {
                method: 'PUT',
                body: body,
                headers: myHeaders
            };

            await fetch(`http://localhost:8080/api-citas/${datos.id}`, requestOptions)
                .then(response => response.json())
                .catch(error => console.log('error', error));
            this.getData();
            this.banderaEditar = false;
            this.mascota = {nombre:'', propietario:'', email:'', fecha: '', sintomas: ''};


        } else {
            const datos = event.detail;
            const body = JSON.stringify(datos);

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var requestOptions = {
                method: 'POST',
                body: body,
                headers: myHeaders
            };

            await fetch("http://localhost:8080/api-citas", requestOptions)
                .then(response => response.json())
                .catch(error => console.log('error', error));
            this.getData();
        }
    }

    async getData(){
        const result = await fetch("http://localhost:8080/api-citas", {method: 'GET'})
        .then(response => response.json())
        .catch(error => console.log('error', error));
        this.pacientes = [...result];
    }

    handleSetData(event){
        const datos = event.detail;
        this.mascota = {...datos};
        this.banderaEditar = true;
        this.requestUpdate();
    }
}

customElements.define('seguimiento-citas', SeguimientoCitas);