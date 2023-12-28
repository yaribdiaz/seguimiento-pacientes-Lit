import { LitElement, css, html } from "lit";
import "./error-component";

class FormComponent extends LitElement {
    static styles = css`
        :host {
            display: block;
        }

        h1 {
            color: blue;
        }
    `;

    static properties = {
        form: { type: String },
    };

    constructor() {
        super();
        this.form = "Soy el Form";
    }

    render() {
        return html`
            <h1>${this.form}</h1>
            <error-component></error-component>
        `;
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