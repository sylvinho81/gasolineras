import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GasStation } from './GasStation'


export class GasStationsList extends Component {
  static propTypes = {
    gas_stations: PropTypes.array
  }

  render () {
    const { gas_stations } = this.props
    return (
      <div className='GasStationsList row' style={{"paddingTop": "20px"}}>
        {
          gas_stations.map(gas_station => {
            return (
              <div key={gas_station.ideess} className='GasStationsList-item col-lg-3 mb-3 grid-margin'>
                <GasStation
                  ideess={gas_station.ideess}
                  label={gas_station.label}
                  address={gas_station.address}
                  price_diesel_a={gas_station.price_diesel_a}
                  price_diesel_b={gas_station.price_diesel_b}
                  price_gasoline_95_protection={gas_station.price_gasoline_95_protection}
                  price_gasoline_98={gas_station.price_gasoline_98}
                />
              </div>
            )
          })
        }

      </div>
    )
  }
}
