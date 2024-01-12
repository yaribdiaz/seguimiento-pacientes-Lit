import { LitElement, html, css } from "lit";
import "./components/cita-paciente"
import "./components/form-component"
import "./components/header-citas"
import "./components/cita-paciente"

export class SeguimientoCitas extends LitElement{

    static styles = css `
        .container{
            
        }
        main {
            display: flex;
            flex-direction: column;
            padding-inline: 1.2rem;
            height: 100%;
        }
        .seguimiento {
            width:100%;
        }
        .listado {
            padding-inline: 10px;
            overflow-y: scroll;
            width: 100%;
            margin-top: 5rem;
        }
        .listado::-webkit-scrollbar {
            background: #e1e1e1;
            border-radius: 10px;
            width: 11px;
        }
        .listado::-webkit-scrollbar-thumb{
            background-color: #9ca3af;
            border-radius: 15px;
        }
        @media (min-width: 540px) { 
            main{
                flex-direction: row;
                height: 78vh;
                justify-content:space-between;
            }
            .listado {
                margin-top: 0px;
            }
            .seguimiento {
                width:40%;
            }
            .listado {
                width: 55%;
            }
        }
        @media (min-width: 768px) { 
            main{
                padding-inline: 1.2rem;
            }
        }
        @media (min-width: 1024px) { 
            main{
                padding-inline: 4rem;
            }
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
        <div>
            <header-citas></header-citas>
            <main  class="container">
                <div class="seguimiento">
                    <form-component .textoBoton=${this.banderaEditar ? "Editar Paciente" : "Agregar paciente"} .mascota=${this.mascota}></form-component>
                </div>
                <div class="listado">
                <cita-paciente .pacientes=${this.pacientes}></cita-paciente>
                </div>
            </main>
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

            await fetch(`https://seguimiento-citas.onrender.com/api-citas/${datos.id}`, requestOptions)
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

            await fetch("https://seguimiento-citas.onrender.com/api-citas", requestOptions)
                .then(response => response.json())
                .catch(error => console.log('error', error));
            this.getData();
        }
    }

    async getData(){
        console.log('get data')
        const result = await fetch("https://seguimiento-citas.onrender.com/api-citas", {method: 'GET'})
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