import React, { Component } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import pin7 from '../assets/pin7.png'
import {ImageGasStation} from './ImageGasStation'
import {Config} from '../configuration'

const API_KEY = Config.apiKey
const utils = require("../utils.js")

const _renderInfoWindowScreen = (selectedCenter) => (
  <div id="contentInfoWindow">
    <div id="infowindowSiteNotice">
     <ImageGasStation label={selectedCenter.label}/>
    </div>
    <hr/>
    <h5 id="thirdHeading" className="thirdHeading">{selectedCenter.label}</h5>
    <div id="bodyContent">
     <p><small>Última actualización: {utils.formatDate(selectedCenter.updated_at)}</small></p>
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


export class GasStationMap extends Component {

  state = {
    selectedCenter: null,
    centerMap: this.props.center,
    markers: this.props.markers,
    map: {}
  }

  setSelectedCenter(marker) {
    this.setState({selectedCenter: marker})
  }

  boundsCallBack = () => {
    const {map} = this.state;
    console.log('lat: ', map.getCenter().lat())
    console.log('lng: ', map.getCenter().lng())
  }

  handleMapLoad = (map) => {
    this.setState({map: map});
  }

  static getDerivedStateFromProps(props, state){
    return {centerMap: props.center, markers: props.markers}
  }


  //componentDidMount(){
  //  console.log("componentDidMount")
  //  this.setState({centerMap: this.props.center, markers: this.props.markers})
  //}

  render() {
     return (
      <LoadScript
        id="script-loader"
        googleMapsApiKey={API_KEY}
      >
        <GoogleMap
          key={"mapp"}
          zoom={12}
          center={this.state.centerMap}
          mapContainerClassName={"containerMap"}
          mapContainerStyle={{ height: `100%` }}
          onDragEnd={this.boundsCallBack}
          onLoad={this.handleMapLoad}
        >
        {this.state.markers.map(marker => {
           return (
             <Marker
               key={marker.ideess}
               position={{ lat: marker.latitude, lng: marker.longitude }}
               options={{ icon: { url: pin7}}}
               onClick={() => {
                  this.setSelectedCenter(marker);
               }}
             >
               {this.state.selectedCenter === marker &&
                 <InfoWindow
                    position={{lat: marker.latitude, lng: marker.longitude}}
                    onCloseClick={() => {
                      this.setSelectedCenter(null);
                    }}>
                    {_renderInfoWindowScreen(this.state.selectedCenter)}
                 </InfoWindow>
               }
             </Marker>
           )
          }
        )}


        </GoogleMap>
      </LoadScript>
     )
  }
}
