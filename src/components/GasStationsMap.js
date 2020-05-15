import React, { Component } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import pin7 from '../assets/pin7.png'
import {ImageGasStation} from './ImageGasStation'
import {Config} from '../configuration'

const API_KEY = Config.apiKey
const URL_API_SEARCH = Config.apiSearchUrl

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
       {selectedCenter.price_diesel_a !== null ? <li className="list-group-item" key={"price_diesel_a"}><b>Diesel A:</b> {selectedCenter.price_diesel_a} €</li> : ''}
       {selectedCenter.price_diesel_b !== null ? <li className="list-group-item" key={"price_diesel_b"}><b>Diesel B:</b> {selectedCenter.price_diesel_b} €</li> : ''}
       {selectedCenter.price_gasoline_95_protection !== null ? <li className="list-group-item" key={"price_gasolina_95"}><b>Gasolina 95:</b> {selectedCenter.price_gasoline_95_protection} €</li> : ''}
       {selectedCenter.price_gasoline_98 !== null ? <li className="list-group-item" key={"price_gasolina_98"}><b>Gasolina 98:</b> {selectedCenter.price_gasoline_98} €</li> : ''}
     </ul>
    </div>
  </div>
)


export class GasStationMap extends Component {

  state = {
    selectedCenter: null,
    centerMap: this.props.center,
    markers: this.props.markers,
    zoom: this.props.zoom,
    viewPage: this.props.viewPage
  }

  setSelectedCenter(marker) {
    this.setState({selectedCenter: marker})
  }

  _fetchGasStation(latitude, longitude) {
    const urlApi = `${URL_API_SEARCH}?lat=${latitude}&lon=${longitude}&page=0`
    fetch(urlApi)
      .then(res => res.json())
      .then(results => {
        this.props.onResultsMap(results)
      })
  }

  handleMapLoad = (map) => {
    this.setState({map: map});
  }

  boundsCallBack = () => {
    if (this.state.viewPage === "home"){
      const {map} = this.state;
      const latitude = map.getCenter().lat()
      const longitude = map.getCenter().lng()
      console.log('lat: ', latitude)
      console.log('lng: ', longitude)
      this._fetchGasStation(latitude,longitude)
    }

  }

  handleClickMap = (e) => {
    if (this.state.viewPage === "home"){
      const latitude = e.latLng.lat()
      const longitude = e.latLng.lng()
      console.log('lat_click: ', latitude)
      console.log('lng_click: ', longitude)
      this._fetchGasStation(latitude,longitude)
    }
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
          zoom={this.state.zoom}
          center={this.state.centerMap}
          mapContainerClassName={"containerMap"}
          mapContainerStyle={{ height: `100%` }}
          onDragEnd={this.boundsCallBack}
          onClick={this.handleClickMap}
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
