import React, {useState, Component} from 'react'
import { compose } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import {ImageGasStation} from './ImageGasStation'
import {Config} from '../configuration'

const API_KEY = Config.apiKey

const _renderInfoWindowScreen = (selectedCenter) => (
  <div id="contentInfoWindow">
    <div id="infowindowSiteNotice">
     <ImageGasStation label={selectedCenter.label}/>
    </div>
    <hr/>
    <h5 id="thirdHeading" className="thirdHeading">{selectedCenter.label}</h5>
    <div id="bodyContent">
     <p><b>Horario:</b> {selectedCenter.schedule}</p>
     <p>{selectedCenter.address}, {selectedCenter.location}</p>
     <ul className="list-group list-group-flush">
       {selectedCenter.price_diesel_a !== null ? <li className="list-group-item" key={"price_diesel_a"}><b>Diesel A:</b> {selectedCenter.price_diesel_a}</li> : ''}
       {selectedCenter.price_diesel_b !== null ? <li className="list-group-item" key={"price_diesel_b"}><b>Diesel B:</b> {selectedCenter.price_diesel_b}</li> : ''}
       {selectedCenter.price_gasoline_95_protection !== null ? <li className="list-group-item" key={"price_gasolina_95"}><b>Gasolina 95:</b> {selectedCenter.price_gasoline_95_protection}</li> : ''}
       {selectedCenter.price_gasoline_98 !== null ? <li className="list-group-item" key={"price_gasolina_98"}><b>Gasolina 98:</b> {selectedCenter.price_gasoline_98}</li> : ''}
     </ul>
    </div>
  </div>
)



const Map = compose(withScriptjs,withGoogleMap)(props => {
  const [selectedCenter, setSelectedCenter] = useState(null);

  return (
    <GoogleMap
      defaultZoom={13}
      center={{lat: props.latitude, lng: props.longitude }}
    >
    {props.markers.map(marker => {
       return (
         <Marker
           key={marker.ideess}
           position={{ lat: marker.latitude, lng: marker.longitude }}
           options={{ icon: { url: "http://cdn.webiconset.com/map-icons/images/pin7.png"}}}
           onClick={() => {
              setSelectedCenter(marker);
           }}
         >
           {selectedCenter === marker &&
             <InfoWindow
                onCloseClick={() => {
                  setSelectedCenter(null);
                }}>
                {_renderInfoWindowScreen(selectedCenter)}
             </InfoWindow>
           }
         </Marker>
       )
      }
    )}
    </GoogleMap>
  )
})

export default class MarkerMap extends Component {
  render() {
    return (
      <Map
        googleMapURL={"https://maps.googleapis.com/maps/api/js?key=" + API_KEY}
        loadingElement={<div style={{ height: `100%` }} >Cargando el mapa!</div>}
        containerElement={<div id="mapMarkers" style={{ height: `500px`, paddingTop: "20px" }} />}
        mapElement={<div style={{ height: `100%` }} />}
        markers={this.props.markers}
        latitude={this.props.latitude}
        longitude={this.props.longitude}
      />
    )
  }
}
