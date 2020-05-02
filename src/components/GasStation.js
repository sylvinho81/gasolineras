import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {ImageGasStation} from './ImageGasStation'

const LIMIT_ADDRESS = 25

export class GasStation extends Component {
  static propTypes = {
    ideess: PropTypes.number,
    label: PropTypes.string,
    address: PropTypes.string,
    price_diesel_a: PropTypes.string,
    price_diesel_b: PropTypes.string,
    price_gasoline_95_protection: PropTypes.string,
    price_gasoline_98: PropTypes.string
  }

  _formatAddress(address) {
    return address.length > LIMIT_ADDRESS ? address.substring(0,LIMIT_ADDRESS)+"..." : address
  }

  render () {
    const { ideess, label, address, price_diesel_a, price_diesel_b,price_gasoline_95_protection, price_gasoline_98 } = this.props
    const type_gas = [price_diesel_a, price_diesel_b, price_gasoline_95_protection, price_gasoline_98];
    const title_gas = ["Diesel A", "Diesel B", "Gasolina 95", "Gasolina 98"];
    const listItems = type_gas.map((price,i) => {
      if (price &&  price.trim() !== "") {
        return <li className="list-group-item" key={title_gas[i]}>{title_gas[i]}: {price}€</li>
      } else {
        return <li className="list-group-item" key={title_gas[i]}>{title_gas[i]}: - </li>
      }
    })
    return (
        <div key={ideess} className="card" style={{width: "100%"}}>
            <ImageGasStation label={label}/>
            <div className="card-body">
              <h5 className="card-title">{label}</h5>
              <p className="card-text">{this._formatAddress(address)}</p>
              <ul className="list-group list-group-flush">{listItems}</ul>
            </div>
        </div>
    )
  }
}
