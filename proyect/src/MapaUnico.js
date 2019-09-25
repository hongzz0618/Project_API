import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from "react-google-maps";
import { Link } from "react-router-dom";
import './paginaPrincipal.css';


const mapa = Map;

const REACT_APP_GOOGLE_KEY = "AIzaSyC4g4B7cWdRTVvNkHJ8TjLZBlvr5IK-GtQ";


function Map(props) {

    const datos = props.datos;

    const [selectedItem, setSelectedItem] = React.useState(null);
    const  MapOptions = {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: false
    };
    
    console.log("AQUI",datos[0].ubicacion_latitud,datos[0].ubicacion_longitud);
    return (
        
        <GoogleMap 
            defaultCenter={{lat:datos[0].ubicacion_latitud*1,lng:datos[0].ubicacion_longitud*1}}
            defaultZoom={15}
            defaultOptions={MapOptions}
        >

            {datos.map((el) => (
                <Marker
                    key={el.idPublicacion}
                    position={{ lat: el.ubicacion_latitud*1, lng: el.ubicacion_longitud*1 }}
                    onClick={() => {
                        setSelectedItem(el);
                    }}
                    
                />
            ))} 

            {selectedItem &&(
                <InfoWindow
                    onCloseClick={() => {
                        setSelectedItem(null);
                    }}
                    position={{
                        lat: selectedItem.ubicacion_latitud*1,
                        lng: selectedItem.ubicacion_longitud*1
                    }}
                >
                    <div>
                        <h2>{selectedItem.nombre_ES}</h2>                
                    </div>
                </InfoWindow>
            )}
        
        </GoogleMap>

    );
}

const WrappedMap = withScriptjs(withGoogleMap(mapa));


export default class Mapa extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            coordenadas : {lat:0,lng:0}
        }
    }




    render() {

        const url = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${REACT_APP_GOOGLE_KEY}`;
        return (
            <>
            
            <div style={{ height: this.props.altura, width: this.props.anchura}}>
                <WrappedMap
                    datos = {this.props.datos}
                    googleMapURL={url}
                    loadingElement={<div style={{ height: '100%' }} />}
                    containerElement={<div style={{ height: '100vh' }} />}
                    mapElement={<div style={{ height: '100%' }} />}
                    
                />
            </div>
            </>
        );
    }
}