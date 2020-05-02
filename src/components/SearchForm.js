import React, {Component} from 'react'
import {Config} from '../configuration'
import Autocomplete from './AutocompleteInput'

const URL_API_SEARCH = Config.apiSearchUrl

export class SearchForm extends Component {

  state = {
    inputSearch: ''
  }

  _handleChange = (e) => {
    this.setState({ inputSearch: e.target.value })
  }

  _handleChangeAutocomplete = (target_value) => {
    console.log("_handleChangeAutocomplete " + target_value)
    this.setState({ inputSearch: target_value })
  }

  _handleSubmit = (e) => {
    e.preventDefault()
    const { inputSearch } = this.state
    console.log(inputSearch)
    fetch(`${URL_API_SEARCH}?q=${inputSearch}&page=0`)
      .then(res => res.json())
      .then(results => {
        console.log(results)
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
