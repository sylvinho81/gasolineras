import React, {Component} from 'react'
import {Config} from '../configuration'
import Autocomplete from './AutocompleteInput'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import pin_normal from '../assets/pin_normal.png'
import pin_cheap from '../assets/pin_cheap.png'
const URL_API_SEARCH = Config.apiSearchUrl
const SELECTED_RADIO_BY_DEFAULT = Config.selectedRadioByDefault

export class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputSearch: '',
      latitude: props.lat,
      longitude: props.lng,
      selectedRadio: SELECTED_RADIO_BY_DEFAULT
    }
  }


  _handleChangeAutocomplete = (targetValue) => {
    const {inputSearch, latitude, longitude} = targetValue
    console.log("_handleChangeAutocomplete " + inputSearch + " " + latitude + " " + longitude)
    this.setState({ inputSearch: inputSearch, latitude: latitude, longitude: longitude })
  }


  _handleSubmit = (e) => {
    e.preventDefault()
    const { inputSearch, latitude, longitude, selectedRadio } = this.state
    let urlApi
    if (latitude !== 0 && longitude !== 0 ) {
      urlApi = `${URL_API_SEARCH}?lat=${latitude}&lon=${longitude}&page=0&radio=${selectedRadio}`
    } else {
      urlApi = `${URL_API_SEARCH}?q=${inputSearch}&page=0&radio=${selectedRadio}`
    }
    fetch(urlApi)
      .then(res => res.json())
      .then(results => {
        this.props.onResults(results)
      })
  }

  _handleChange = (e) => {
    e.preventDefault()
    const newSelected = e.target.value
    this.setState({selectedRadio: e.target.value})
    const { inputSearch, latitude, longitude } = this.state
    let urlApi
    if (latitude !== 0 && longitude !== 0 ) {
      urlApi = `${URL_API_SEARCH}?lat=${latitude}&lon=${longitude}&page=0&radio=${newSelected}`
    } else {
      urlApi = `${URL_API_SEARCH}?q=${inputSearch}&page=0&radio=${newSelected}`
    }
    fetch(urlApi)
      .then(res => res.json())
      .then(results => {
        this.props.onResults(results)
      })
  }

  render () {
    const selectedRadio = this.state.selectedRadio
    return (
      <form onSubmit={this._handleSubmit}>
        <div className="row">
          <div className="col-md-12">
            <Autocomplete
              classname="form-control py-2 border-left-0 border"
              placeholder="Busca tu gasolinera más cercana. Introduce municipio, localidad, provincia, dirección o código postal..."
              onInput={this._handleChangeAutocomplete}
            />
            <div>
              <FormControlLabel value="all" control={<Radio />} label="Todos los combustiles" onChange={this._handleChange} checked={selectedRadio === SELECTED_RADIO_BY_DEFAULT} />
              <FormControlLabel value="price_gasoline_95_protection" control={<Radio />} label="Gasolina 95" onChange={this._handleChange} checked={selectedRadio === 'price_gasoline_95_protection'}/>
              <FormControlLabel value="price_gasoline_98" control={<Radio />} label="Gasolina 98" onChange={this._handleChange} checked={selectedRadio === 'price_gasoline_98'}/>
              <FormControlLabel value="price_diesel_a" control={<Radio />} label="Diesel A" onChange={this._handleChange} checked={selectedRadio === 'price_diesel_a'}/>
              <FormControlLabel value="price_diesel_b" control={<Radio />} label="Diesel B " onChange={this._handleChange} checked={selectedRadio === 'price_diesel_b'}/>
              <img src={pin_cheap} alt={"Mejor precio"} height={"40px"}/><span style={{marginLeft: "2px", marginRight: "2px"}}>Mejor precio</span>
              <img src={pin_normal} alt={"Precio normal"} height={"40px"}/><span style={{marginLeft: "3px", marginRight: "2px"}}>Precio normal</span>
            </div>
          </div>
        </div>
      </form>
    )
  }
}
