import React, {Component} from 'react'
import {SearchForm} from '../components/SearchForm'
import {GasStationsList} from '../components/GasStationsList'
import {MenuHeader} from '../components/MenuHeader'
import ReactPaginate from 'react-paginate';
import {GasStationMap} from '../components/GasStationsMap'
import {Config} from '../configuration'


const URL_API_INDEX = Config.apiIndexUrl
const URL_API_SEARCH = Config.apiSearchUrl

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { usedSearch: false,
              results: [],
              initialLoaded: false,
              currentPageNumber: 0,
              totalPages: 1,
              inputSearch: '',
              latitude: 0,
              longitude: 0,
              typeSearch: 'normal'

    };
  }

  _handleResults = (results) => {
    console.log("currentPageNumber" + results.page)
    console.log("totalPages" + results.pages)
    this.setState({ results: results.gas_stations,
                    usedSearch: true,
                    initialLoaded:  true,
                    currentPageNumber: results.page,
                    totalPages: results.pages,
                    inputSearch: results.input_search,
                    latitude: parseFloat(results.latitude),
                    longitude: parseFloat(results.longitude),
                    typeSearch: 'normal'
                  })
  }


  _renderResults () {
    console.log("_renderResults " + this.state.latitude)
    console.log("_renderResults " + this.state.longitude)
    return this.state.results.length === 0
      ? <div><p>Lo sentimos! No se encontraron resultados!</p></div>
      :
       <div>
       <GasStationMap
         markers={this.state.results}
         center={{lat: this.state.latitude, lng: this.state.longitude}}
        />
        <GasStationsList gas_stations={this.state.results} />
        <ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handleClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}/>
      </div>
  }

  _searchByCoordinates(latitude, longitude, page) {
    console.log("search by coordinates")
    fetch(`${URL_API_INDEX}?lat=${latitude}&long=${longitude}&page=${page}`)
      .then(res => res.json())
      .then(results => {
        this.setState({ results: results.gas_stations,
                        usedSearch: true,
                        initialLoaded:  true,
                        currentPageNumber: results.page,
                        totalPages: results.pages,
                        inputSearch: '',
                        latitude: parseFloat(results.latitude),
                        longitude: parseFloat(results.longitude),
                        typeSearch: 'coordinates'
                      })
      })
  }

  _searchByText(inputSearch, page) {
    console.log("search by text")
    fetch(`${URL_API_SEARCH}?q=${inputSearch}&page=${page}`)
      .then(res => res.json())
      .then(results => {
        this.setState({ results: results.gas_stations,
                        usedSearch: true,
                        initialLoaded:  true,
                        currentPageNumber: results.page,
                        totalPages: results.pages,
                        inputSearch: results.input_search,
                        latitude: parseFloat(results.latitude),
                        longitude: parseFloat(results.longitude),
                        typeSearch: 'normal'
                      })
      })
  }



  handleClick = (e) => {
    const selectedPage = e.selected;
    console.log("selectedPage " + selectedPage)
    console.log("latitude", this.state.latitude)
    console.log("input search", this.state.inputSearch)
    if (this.state.typeSearch === 'coordinates'){
      this._searchByCoordinates(this.state.latitude, this.state.longitude, selectedPage)
    } else {
      this._searchByText(this.state.inputSearch, selectedPage)
    }

  };


  componentDidMount() {
    console.log("componentDidMount")
    if (navigator.geolocation && this.state.results.length === 0 && this.state.initialLoaded === false){
      navigator.geolocation.getCurrentPosition(function(position){
        var lat = position.coords.latitude
        var long = position.coords.longitude
        localStorage.setItem('lat', lat)
        localStorage.setItem('long', long)
      })
      this._searchByCoordinates(localStorage.getItem('lat'), localStorage.getItem('long'), this.state.currentPageNumber)
    }
  }

  render (){
    console.log("render")
    return (
      <div className="App">
        <MenuHeader />
        <div className="container" style={{"paddingTop": "20px"}}>
          <SearchForm onResults={this._handleResults}/>
          {this.state.usedSearch
            ? <div>
                {this._renderResults()}
              </div>
            : <div><small>Realiza una nueva búsqueda</small></div>
          }
        </div>
      </div>
    )
  }

}