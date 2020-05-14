import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { ButtonBackToHome } from '../components/ButtonBackToHome'
import {MenuHeader} from '../components/MenuHeader'
import {Footer} from '../components/Footer'
import {Config} from '../configuration'
import {GasStationMap} from '../components/GasStationsMap'

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

  state = { gas_station: {} }

  _fetchGasStation ({ id }) {
    fetch(`${URL_API_DETAIL}${id}`)
      .then(res => res.json())
      .then(gas_station => {
        //console.log({ gas_station })
        this.setState({ gas_station })
      })
  }

  componentDidMount () {
    //console.log(this.props)
    const { label, location, ideess } = this.props.match.params
    console.log(label + " " + location)
    this._fetchGasStation({id: ideess})
  }

  componentDidUpdate() {
    document.title = `Precios carburantes en la Gasolinera ${this.state.gas_station.label} de ${this.state.gas_station.location}`
    document.getElementsByTagName("META")[2].content = `Gasolinera ${this.state.gas_station.label} de ${this.state.gas_station.location}. Esta gasolinera se encuentra en la localidad de ${this.state.gas_station.location}, en el municipio de ${this.state.gas_station.municipality} perteneciente a la provincia de ${this.state.gas_station.province}`
  }

  render () {

    return (
      <div className="App d-flex flex-column min-vh-100">
        <div className="wrapper flex-grow-1">
          <MenuHeader />
          <main className="container" style={{"paddingTop": "20px"}}>
            <h1 className="my-4">{this.state.gas_station.label}
              <small> en {this.state.gas_station.location}</small>
            </h1>

            <div className="row">

              <div className="col-md-8">
                <GasStationMap key="map-detail"
                  markers={[this.state.gas_station]}
                  center={{lat: parseFloat(this.state.gas_station.latitude), lng: parseFloat(this.state.gas_station.longitude)}}
                  zoom={14}
                 />
              </div>

              <div className="col-md-4">
                <h3 className="my-3">Dirección y Horario</h3>
                <p><b>Horario:</b> {this.state.gas_station.schedule}</p>
                <p>{this.state.gas_station.address}, {this.state.gas_station.location}, {this.state.gas_station.cp}</p>
                <h3 className="my-3">Precios Carburantes</h3>
                <ul className="list-group list-group-flush">
                  <li key="Diesel A" className="list-group-item">Diesel A: {this.state.gas_station.price_diesel_a &&  this.state.gas_station.price_diesel_a.trim() !== "" ? this.state.gas_station.price_diesel_a : '-'}</li>
                  <li key="Diesel B" className="list-group-item">Diesel B: {this.state.gas_station.price_diesel_b &&  this.state.gas_station.price_diesel_b.trim() !== "" ? this.state.gas_station.price_diesel_b : '-'}</li>
                  <li key="Gasolina 95" className="list-group-item">Gasolina 95: {this.state.gas_station.price_gasoline_95_protection &&  this.state.gas_station.price_gasoline_95_protection.trim() !== "" ? this.state.gas_station.price_gasoline_95_protection : '-'}</li>
                  <li key="Gasolina 98" className="list-group-item">Gasolina 98: {this.state.gas_station.price_gasoline_98 &&  this.state.gas_station.price_gasoline_98.trim() !== "" ? this.state.gas_station.price_gasoline_98 : '-'}</li>
                </ul>
                <br/>
                <ButtonBackToHome/>
              </div>

            </div>
          </main>

        </div>
        <Footer/>
      </div>

    )
  }
}
