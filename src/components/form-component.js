import { LitElement, css, html, nothing } from "lit";
import "./error-component";
import {when} from 'lit/directives/when.js';


class FormComponent extends LitElement {
    static styles = css`
        h1 {
            color: blue;
        }

        .input {
            display: block;
            font-weight: bold;
        }

        .form-title {
            margin: 5px 0 10px 0;
        }

        .form-input {
            margin-bottom: 10px;
        }
    `;

    static properties = {
        mascota: {},
        error: {}
    };

    constructor() {
        super();
        this.mascota = {nombre:'', propietario:'', email:'', fecha: '', sintomas: ''};
        this.error = false;
    }

    render() {
        return html`
        <div className="md:w-1/2 lg:w-2/5 mx-5">

        <h2 className="font-black text-2xl text-center">Seguimiento Pacientes</h2>
    
        <p className="text-lg mt-5 text-center mb-10" class="form-title">
            Añade Pacientes y
            <span className="text-indigo-600 font-bold">Administralos</span>
        </p>
    
        <form
            className="bg-white shadow-md rounded-xl py-10 px-5">
    
            ${when(this.error, () => html `<error-component mensaje='Todos los campos son obligatorios' />`, () =>nothing)}
    
            <div className="mb-5" class="form-input">
                <label htmlFor="mascota" class="input" className="block text-gray-700 uppercase font-bold">
                    Nombre Mascota </label>
                <input id="mascota" type="text" placeholder="Nombre de Mascota"
                .value=${this.mascota.nombre}
                @input=${(e) => this.handleFieldChange(e, 'nombre')}
                />
            </div>
     
            <div  className="mb-5" class="form-input">
                <label htmlFor="propietario" class="input" className="block text-gray-700 uppercase font-bold">
                    Nombre Propietario</label>
                <input id="propietario" type="text" placeholder="Nombre del Propietario"
                .value=${this.mascota.propietario} 
                @input=${(e) => this.handleFieldChange(e, 'propietario')}
                />
            </div>
    
            <div  className="mb-5" class="form-input">
                <label htmlFor="email" class="input" className="block text-gray-700 uppercase font-bold">
                    Email</label>
                <input id="email" type="email" placeholder="Email Contacto Propietario" 
                @input=${(e) => this.handleFieldChange(e, 'email')}
                .value=${this.mascota.email} 
                />
            </div>
    
            <div  className="mb-5" class="form-input">
                <label htmlFor="alta" class="input" className="block text-gray-700 uppercase font-bold">
                    Alta</label>
                <input id="alta" type="date" 
                .value=${this.mascota.fecha} 
                @input=${(e) => this.handleFieldChange(e, 'fecha')}
                />
            </div>
    
            <div className="mb-5" class="form-input">
                <label htmlFor="sintomas" class="input" className="block text-gray-700 uppercase font-bold">
                    Sintomas</label>
                <textarea className="border-2 w-full mt-2 p-1 rounded-md" id="sintomas" cols="30" rows="4" 
                placeholder="Describe los Síntomas"
                .value=${this.mascota.sintomas} 
                @input=${(e) => this.handleFieldChange(e, 'sintomas')}

                ></textarea>
            </div>
    
            <button type="button"
            @click=${() => {this.setMascota(this.mascota); this.mascota = {nombre:'', propietario:'', email:'', fecha: '', sintomas: ''}}} 
            >Enviar</button>           
            
        </form>
    
        </div>
        `;
    }

    handleFieldChange(event, field) {
        this.mascota = { ...this.mascota, [field]: event.target.value };
      }

    setMascota(mascota){
        this.dispatchEvent(new CustomEvent('datos-actualizados', {
            bubbles: true,
            composed: true,
            detail: mascota
        }));
    }
}

customElements.define("form-component", FormComponent);

//Aqui utilizar conectedCallBack(){}(cuando se inicia el componente)
/* useEffect( () => {
    if( Object.keys(paciente).length > 0 ){
        setNombre(paciente.nombre)
        setPropietario(paciente.propietario)
        setEmail(paciente.email)
        setFecha(paciente.fecha)
        setSintomas(paciente.sintomas)
    }
}, [paciente]) */