import React, { Component } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import pin_normal from '../assets/pin_normal.png'
import pin_cheap from '../assets/pin_cheap.png'
import {ImageGasStation} from './ImageGasStation'
import {Config} from '../configuration'

const API_KEY = Config.apiKey
const URL_API_SEARCH = Config.apiSearchUrl
const MAX_NUM_CHEAP_STATIONS = 4
const SELECTED_RADIO_BY_DEFAULT = Config.selectedRadioByDefault
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
       {selectedCenter.price_diesel_a !== null ? <li className="list-group-item" key={"price_diesel_a"}><b>Diesel A:</b> {selectedCenter.price_diesel_a} €/l</li> : ''}
       {selectedCenter.price_diesel_premium !== null ? <li className="list-group-item" key={"price_diesel_premium"}><b>Diesel Premium:</b> {selectedCenter.price_diesel_premium} €/l</li> : ''}
       {selectedCenter.price_diesel_b !== null ? <li className="list-group-item" key={"price_diesel_b"}><b>Gasóleo B:</b> {selectedCenter.price_diesel_b} €/l</li> : ''}
       {selectedCenter.price_gasoline_95_e10 !== null ? <li className="list-group-item" key={"price_gasoline_95_e10"}><b>Gasolina 95 E10:</b> {selectedCenter.price_gasoline_95_e10} €/l</li> : ''}
       {selectedCenter.price_gasoline_95_e5 !== null ? <li className="list-group-item" key={"price_gasoline_95_e5"}><b>Gasolina 95 E5:</b> {selectedCenter.price_gasoline_95_e5} €/l</li> : ''}
       {selectedCenter.price_gasoline_95_e5_premium !== null ? <li className="list-group-item" key={"price_gasoline_95_e5_premium"}><b>Gasolina 95 E5 Premium:</b> {selectedCenter.price_gasoline_95_e5_premium} €/l</li> : ''}
       {selectedCenter.price_gasoline_98_e10 !== null ? <li className="list-group-item" key={"price_gasoline_98_e10"}><b>Gasolina 98 E10:</b> {selectedCenter.price_gasoline_98_e10} €/l</li> : ''}
       {selectedCenter.price_gasoline_98_e5 !== null ? <li className="list-group-item" key={"price_gasoline_98_e5"}><b>Gasolina 98 E5:</b> {selectedCenter.price_gasoline_98_e5} €/l</li> : ''}

     </ul>
    </div>
  </div>
)


export class GasStationMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCenter: null,
      centerMap: props.center,
      markers: props.markers,
      zoom: props.zoom,
      viewPage: props.viewPage,
      selectedRadio: props.selectedRadio
    }
  }


  setSelectedCenter(marker) {
    this.setState({selectedCenter: marker})
  }

  _fetchGasStation(latitude, longitude) {
    const urlApi = `${URL_API_SEARCH}?lat=${latitude}&lon=${longitude}&page=0&radio=${this.state.selectedRadio}`
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
    return {centerMap: props.center, markers: props.markers, selectedRadio: props.selectedRadio}
  }


  //componentDidMount(){
  //  console.log("componentDidMount")
  //  this.setState({centerMap: this.props.center, markers: this.props.markers})
  //}

  render() {
     console.log("map")
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
          //onDragEnd={this.boundsCallBack}
          onClick={this.handleClickMap}
          onLoad={this.handleMapLoad}
        >
        {this.state.markers.map((marker,index) => {
           return (
             <Marker
               key={marker.ideess}
               position={{ lat: marker.latitude, lng: marker.longitude }}
               options={{ icon: { url: this.state.selectedRadio !== SELECTED_RADIO_BY_DEFAULT && index < MAX_NUM_CHEAP_STATIONS ?  pin_cheap : pin_normal}}}
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
