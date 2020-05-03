import React, {Component} from 'react'
import {Config} from '../configuration'
import Autocomplete from './AutocompleteInput'

const URL_API_SEARCH = Config.apiSearchUrl

export class SearchForm extends Component {

  state = {
    inputSearch: '',
    latitude: 0,
    longitude: 0
  }

  _handleChangeAutocomplete = (targetValue) => {
    const {inputSearch, latitude, longitude} = targetValue
    console.log("_handleChangeAutocomplete " + inputSearch + " " + latitude + " " + longitude)
    this.setState({ inputSearch: inputSearch, latitude: latitude, longitude: longitude })
  }

  _handleSubmit = (e) => {
    e.preventDefault()
    const { inputSearch, latitude, longitude } = this.state
    let urlApi
    if (latitude !== 0 && longitude !== 0 ) {
      urlApi = `${URL_API_SEARCH}?lat=${latitude}&lon=${longitude}&page=0`
    } else {
      urlApi = `${URL_API_SEARCH}?q=${inputSearch}&page=0`
    }
    fetch(urlApi)
      .then(res => res.json())
      .then(results => {
        this.props.onResults(results)
      })
  }

  render () {
    return (
      <form onSubmit={this._handleSubmit}>
        <div className="row">
          <div className="col-md-12">
            <Autocomplete
              classname="form-control py-2 border-left-0 border"
              placeholder="Busca tu gasolinera más cercana. Introduce municipio, localidad, provincia, dirección o código postal..."
              onInput={this._handleChangeAutocomplete}/>
          </div>
        </div>
      </form>
    )
  }
}
