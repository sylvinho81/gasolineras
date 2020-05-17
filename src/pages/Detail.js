import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { ButtonBackToHome } from '../components/ButtonBackToHome'
import {MenuHeader} from '../components/MenuHeader'
import {Footer} from '../components/Footer'
import {Config} from '../configuration'
import {GasStationMap} from '../components/GasStationsMap'
import Loader from 'react-loader-spinner'
const utils = require("../utils.js")

const URL_API_DETAIL = Config.apiDetailUrl

export class Detail extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
      isExact: PropTypes.bool,
      path: PropTypes.string,
      url: PropTypes.string
    })
  }

  state = { gas_station: {}, usedSearch: false }

  _fetchGasStation ({ id }) {
    console.log("-----  " + id)
    fetch(URL_API_DETAIL + id)
      .then(res => res.json())
      .then(gas_station => {
        //console.log({ gas_station })
        this.setState({ gas_station: gas_station, usedSearch: true })
      }).catch(err => {
        this.setState({ usedSearch: true })
        console.log("Not found! \n\n"+err);
      });
  }


  _renderResults () {
    return (Object.entries(this.state.gas_station).length===0)
      ? <div>
          <p>Lo sentimos! No se encontraron resultados!</p>
        </div>
      :
      <div>
        <h1 className="my-4">{this.state.gas_station.label}
          <small> en {this.state.gas_station.location} ({this.state.gas_station.province})</small>
        </h1>

        <div className="row">

          <div className="col-md-8">
            <GasStationMap key="map-detail"
              markers={[this.state.gas_station]}
              center={{lat: parseFloat(this.state.gas_station.latitude), lng: parseFloat(this.state.gas_station.longitude)}}
              zoom={14}
              viewPage={"detail"}
              selectedRadio={"all"}
             />
          </div>

          <div className="col-md-4">
            <small className="last_update">Última actualización: {utils.formatDate(this.state.gas_station.updated_at)}</small>
            <h3 className="my-3">Horario y Dirección</h3>
            <p><b>Horario:</b> {this.state.gas_station.schedule}</p>
            <p><b>Dirección:</b> {this.state.gas_station.address}, {this.state.gas_station.location}, {this.state.gas_station.cp}</p>
            <h3 className="my-3">Precios Carburantes</h3>
            <ul className="list-group list-group-flush">
              <li key="Diesel A" className="list-group-item">Diesel A: {this.state.gas_station.price_diesel_a &&  this.state.gas_station.price_diesel_a.trim() !== "" ? this.state.gas_station.price_diesel_a + " €/l" : '-'}</li>
              <li key="Diesel+" className="list-group-item">Diesel A+ (Plus): {this.state.gas_station.price_new_diesel_a &&  this.state.gas_station.price_new_diesel_a.trim() !== "" ? this.state.gas_station.price_new_diesel_a + " €/l" : '-'}</li>
              <li key="Diesel B" className="list-group-item">Gasóleo B: {this.state.gas_station.price_diesel_b &&  this.state.gas_station.price_diesel_b.trim() !== "" ? this.state.gas_station.price_diesel_b + " €/l" : '-'}</li>
              <li key="Gasolina 95" className="list-group-item">Gasolina 95: {this.state.gas_station.price_gasoline_95_protection &&  this.state.gas_station.price_gasoline_95_protection.trim() !== "" ? this.state.gas_station.price_gasoline_95_protection + " €/l" : '-'}</li>
              <li key="Gasolina 98" className="list-group-item">Gasolina 98: {this.state.gas_station.price_gasoline_98 &&  this.state.gas_station.price_gasoline_98.trim() !== "" ? this.state.gas_station.price_gasoline_98 + " €/l" : '-'}</li>
            </ul>
            <br/>
            <ButtonBackToHome/>
          </div>

        </div>
      </div>
  }

  componentDidMount () {
    //console.log(this.props)
    const { label, location, ideess } = this.props.match.params
    console.log(label + " " + location)
    this._fetchGasStation({id: ideess})
  }

  componentDidUpdate() {
    document.title = `Precios carburantes en la Gasolinera ${this.state.gas_station.label} de ${this.state.gas_station.location}`
    document.getElementsByTagName("META")[3].content = `Gasolinera ${this.state.gas_station.label} de ${this.state.gas_station.location}. Esta gasolinera se encuentra en la localidad de ${this.state.gas_station.location}, en el municipio de ${this.state.gas_station.municipality} perteneciente a la provincia de ${this.state.gas_station.province}`
  }

  render () {

    return (
      <div className="App d-flex flex-column min-vh-100">
        <div className="wrapper flex-grow-1">
          <MenuHeader />
          <main className="container" style={{"paddingTop": "20px"}}>
            {this.state.usedSearch
              ? <div>
                  {this._renderResults()}
                </div>
              : <div className="spinner">
                  <Loader
                     type="Puff"
                     color="#00BFFF"
                     height={100}
                     width={100}
                     timeout={5000} //5 secs

                  />
                </div>
            }
          </main>

        </div>
        <Footer/>
      </div>

    )
  }
}
