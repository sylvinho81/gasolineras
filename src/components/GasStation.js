import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {ImageGasStation} from './ImageGasStation'
import { Link } from 'react-router-dom'

const LIMIT_ADDRESS = 25
const utils = require("../utils.js")
export class GasStation extends Component {
  static propTypes = {
    address: PropTypes.string,
    ideess: PropTypes.number,
    label: PropTypes.string,
    location: PropTypes.string,
    price_diesel_a: PropTypes.string,
    price_diesel_b: PropTypes.string,
    price_gasoline_95_protection: PropTypes.string,
    price_gasoline_98: PropTypes.string
  }

  _formatAddress(address) {
    return address.length > LIMIT_ADDRESS ? address.substring(0,LIMIT_ADDRESS)+"..." : address
  }



  render () {
    const { address, ideess, label, location, price_diesel_a, price_diesel_b,price_gasoline_95_protection, price_gasoline_98, updated_at } = this.props
    const type_gas = [price_diesel_a, price_diesel_b, price_gasoline_95_protection, price_gasoline_98];
    const title_gas = ["Diesel A", "Diesel B", "Gasolina 95", "Gasolina 98"];
    const labelLowerCase = label.toLowerCase()
    const locationLowerCase = location.toLowerCase()
    const listItems = type_gas.map((price,i) => {
      if (price &&  price.trim() !== "") {
        return <li className="list-group-item" key={title_gas[i]}>{title_gas[i]}: {price} €/l</li>
      } else {
        return <li className="list-group-item" key={title_gas[i]}>{title_gas[i]}: - </li>
      }
    })

    return (

        <Link to={`/${labelLowerCase}-en-${locationLowerCase}-${ideess}/`}>
          <div key={ideess} className="card" style={{width: "100%"}}>
              <ImageGasStation label={label}/>
              <div className="card-body">
                <h5 className="card-title">{label}</h5>
                <small className="last_update">Última actualización: {utils.formatDate(updated_at)}</small>
                <p className="card-text">{this._formatAddress(address)}</p>
                <ul className="list-group list-group-flush">{listItems}</ul>
              </div>
          </div>
        </Link>
    )
  }
}
