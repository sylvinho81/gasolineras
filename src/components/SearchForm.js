import React, {Component} from 'react'
import {Config} from '../configuration'
import Autocomplete from './AutocompleteInput'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
              <FormControlLabel value="all" control={<Radio />} label="Todos" onChange={this._handleChange} checked={selectedRadio === SELECTED_RADIO_BY_DEFAULT} />
              <FormControlLabel value="price_gasoline_95_e10" control={<Radio />} label="Gasolina 95 E10" onChange={this._handleChange} checked={selectedRadio === 'price_gasoline_95_e10'}/>
              <FormControlLabel value="price_gasoline_98_e10" control={<Radio />} label="Gasolina 98 E10" onChange={this._handleChange} checked={selectedRadio === 'price_gasoline_98_e10'}/>
              <FormControlLabel value="price_gasoline_95_e5" control={<Radio />} label="Gasolina 95 E5" onChange={this._handleChange} checked={selectedRadio === 'price_gasoline_95_e5'}/>
              <FormControlLabel value="price_gasoline_98_e5" control={<Radio />} label="Gasolina 98 E5" onChange={this._handleChange} checked={selectedRadio === 'price_gasoline_98_e5'}/>
              <FormControlLabel value="price_diesel_a" control={<Radio />} label="Diesel A" onChange={this._handleChange} checked={selectedRadio === 'price_diesel_a'}/>
              <FormControlLabel value="price_diesel_premium" control={<Radio />} label="Diesel Premium" onChange={this._handleChange} checked={selectedRadio === 'price_diesel_premium'}/>
              <FormControlLabel value="price_diesel_b" control={<Radio />} label="Gasóleo B" onChange={this._handleChange} checked={selectedRadio === 'price_diesel_b'}/>
            </div>
          </div>
        </div>
      </form>
    )
  }
}
