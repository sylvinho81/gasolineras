import React, { Component, Fragment } from "react";
import {Config} from '../configuration'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons'


const URL_API_AUTOCOMPLETE = Config.apiAutocompleteUrl


class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ""
    };
  }

  // Event fired when the input value is changed
  _onChange = e => {
    const userInput = e.target.value;
    console.log("_onChange " + userInput)
    this.setState({
      userInput: userInput
    });

    if (userInput.length > 3) {
      fetch(`${URL_API_AUTOCOMPLETE}?q=${userInput}`)
        .then(res => res.json())
        .then(results => {
          this.setState({
            activeSuggestion: 0,
            filteredSuggestions: results.suggestions,
            showSuggestions: true
          });
        })
    }
    this.props.onInput(userInput)
  };

  // Event fired when the user clicks on a suggestion
  _onClick = e => {
    // Update the user input and reset the rest of the state
    const seletectInput = e.currentTarget.innerText
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: seletectInput
    });
    this.props.onInput(seletectInput)
  };


  render() {
    let suggestionsListComponent;
    if (this.state.showSuggestions && this.state.userInput) {
      if (this.state.filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {this.state.filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === this.state.activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li
                  className={className}
                  key={suggestion}
                  onClick={this._onClick}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No tenemos ninguna sugerencia. Lo sentimos!</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
          <div className="input-group">
              <span className="input-group-prepend">
                  <div className="input-group-text bg-transparent border-right-0"><FontAwesomeIcon icon={faSearch} /></div>
              </span>
              <input
                type="text"
                placeholder={this.props.placeholder}
                className={this.props.classname}
                onChange={this._onChange}
                value={this.state.userInput}
              />
              <span className="input-group-append">
              <button className="btn btn-outline-secondary border-left-0 border">
                  Buscar
              </button>
            </span>
          </div>
          {suggestionsListComponent}

      </Fragment>
    );
  }
}

export default Autocomplete;
