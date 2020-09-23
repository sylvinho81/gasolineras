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
                  address={gas_station.address}
                  ideess={gas_station.ideess}
                  label={gas_station.label}
                  location={gas_station.location}
                  price_diesel_a={gas_station.price_diesel_a}
                  price_diesel_premium={gas_station.price_diesel_premium}
                  price_diesel_b={gas_station.price_diesel_b}
                  price_gasoline_95_e10={gas_station.price_gasoline_95_e10}
                  price_gasoline_95_e5={gas_station.price_gasoline_95_e5}
                  price_gasoline_95_e5_premium={gas_station.price_gasoline_95_e5_premium}
                  price_gasoline_98_e10={gas_station.price_gasoline_98_e10}
                  price_gasoline_98_e5={gas_station.price_gasoline_98_e5}
                  updated_at={gas_station.updated_at}
                />
              </div>
            )
          })
        }

      </div>
    )
  }
}
