import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import "./estilosBotonesIdiomas.css";
import "./formularioNuevaPublicacion.css";
import "./estilosBotonesIdiomas.css";
import { Translate, withLocalize } from "react-localize-redux";


const API = "http://localhost:3000/api";


class EditaPublicacion extends Component {
    constructor(props) {
        super(props);

        this.state = { loading: true,loading: false, selectedFile: false,  };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.tornar = this.tornar.bind(this);
        this.submit = this.submit.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.loadData = this.loadData.bind(this);

    }

    componentDidMount() {
        this.loadData();
    }
    onChangeHandler = event=>{
        this.setState({
          selectedFile: event.target.files[0],
          loaded: 0,
        })
      }

    /*loadData*/
    loadData() {

        let itemId = this.props.match.params.idPublicacion;
        fetch(API + "/publicacion/" + itemId)
            .then(results => results.json())
            .then(data => {
                console.log(data);
                return data.data;
            })
            .then(data =>
                this.setState({
                    idPublicacion: data.idPublicacion,
                    nombre_ES: data.nombre_ES,
                    precio: data.precio,
                    Info_ES: data.Info_ES,
                    file: data.file,
                    ubicacion_latitud: data.ubicacion_latitud,
                    ubicacion_longitud: data.ubicacion_longitud
                }))
            .then(() => this.setState({ loading: false }))
            .catch(err => console.log(err));

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }



    submit(e) {
        e.preventDefault();
        let itemId = this.props.match.params.idPublicacion;
        const data = new FormData() 
        data.append('file', this.state.selectedFile);
     
        data.append('ubicacion_latitud', this.state.ubicacion_latitud);
        data.append('ubicacion_longitud', this.state.ubicacion_longitud);
        data.append('precio', this.state.precio);
        data.append('Info_ES', this.state.Info_ES);
        data.append('nombre_ES', this.state.nombre_ES);
        axios.put(API+"/publicacion/"+itemId, data)
        .then(res => { 
            console.log(res);
            this.setState({toList: true });
        })

    }


/* pestaña para que avise si quiere salir sin guardar*/
tornar() {
    let mensaje;
    switch (this.props.activeLanguage.code) {
        case "es":
            mensaje = "¿Salir sin guardar?"
            break;
        case "en":
            mensaje = "¿Exit without save?"
            break;

        case "ch":
            mensaje = "退出而不保存?"
            break;

            default:
            break;
    }
    let resultado = window.confirm(mensaje);
    if (resultado===true){this.setState({ toList: true })}

}
    render() {


        if (this.state.loading) {
            return (
                <>

                    Carregant dades...
                </>
            );
        }

        if (this.state.toList) {
            return <Redirect to="/producto" />
        }


        return (
            <>
                <Form className="formPublicacion" onSubmit={this.submit}>

                    <Row>
                        <Col><h3 className="tituloPublicacion"><Translate id="global.editarPublicacion" /></h3></Col>
                        <Col>
                            <span className="float-right">
                                <Button style={{margin: 2}} type="button" onClick={this.tornar} className='' size='sm' color="danger" ><Translate id="global.salirPublicacion"/></Button>

                                <Button  type="submit" className='' size='sm' color="success" ><Translate id="global.publicarPublicacion" /></Button>
                            </span>
                        </Col>
                    </Row>


                    <Row>

                        <Col sm="6">
                            <FormGroup>
                                <Label for="ubicacion_latitudInput" className="textoPublicacion"><Translate id="global.ubicacionLatitud" /></Label>
                                <Input type="text" name="ubicacion_latitud" id="ubicacion_latitudInput"
                                    value={this.state.ubicacion_latitud}
                                    onChange={this.handleInputChange} />
                            </FormGroup>
                        </Col>
                        <Col sm="6">
                            <FormGroup>
                                <Label for="ubicacion_longitudInput" className="textoPublicacion"><Translate id="global.ubicacionLongitud" /></Label>
                                <Input type="text" name="ubicacion_longitud" id="ubicacion_longitudInput"
                                    value={this.state.ubicacion_longitud}
                                    onChange={this.handleInputChange} />
                            </FormGroup>
                        </Col>

                        <Col sm="6">
                            <FormGroup>
                                <Label for="nombreInput" className="textoPublicacion"><Translate id="global.nombrePublicacion" /></Label>
                                <Input type="text" name="nombre_ES" id="nombreInput"
                                    value={this.state.nombre_ES}
                                    onChange={this.handleInputChange} />
                            </FormGroup>
                        </Col>

                        <Col sm="6">
                            <FormGroup>
                                <Label for="precioInput" className="textoPublicacion"><Translate id="global.precioPublicacion" /></Label>
                                <Input type="text" name="precio" id="precioInput"
                                    value={this.state.precio}
                                    onChange={this.handleInputChange} />
                            </FormGroup>
                        </Col>

                        <Col sm="6">
                            <FormGroup>
                                <Label for="infoInput" className="textoPublicacion"><Translate id="global.informacionPublicacion" /></Label>
                                <Input type="text" name="Info_ES" id="infoInput"
                                    value={this.state.Info_ES}
                                    onChange={this.handleInputChange} />
                            </FormGroup>
                        </Col>

                        <Col sm="6">
                            <FormGroup>
                                <Label for="imgInput" className="textoPublicacion"><Translate id="global.imagenPublicacion" /><img className="imagenBotonEnviar" src="https://img.icons8.com/ultraviolet/40/000000/upload-to-ftp.png" /></Label>
                                <Input type="file" name="file" id="imgInput"
                                    onChange={this.onChangeHandler} className="botonEnviar" />

                            </FormGroup>
                        </Col>


                    </Row>


                </Form>

            </>

        );
    }
}




export default withLocalize(EditaPublicacion);


