import React, {Component} from 'react'
import {SearchForm} from '../components/SearchForm'
import {GasStationsList} from '../components/GasStationsList'
import {MenuHeader} from '../components/MenuHeader'
import ReactPaginate from 'react-paginate';
import {GasStationMap} from '../components/GasStationsMap'
import {Config} from '../configuration'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'


const URL_API_INDEX = Config.apiIndexUrl
const URL_API_SEARCH = Config.apiSearchUrl
const LATITUDE_MADRID = Config.latMadrid
const LONGITUDE_MADRID= Config.longMadrid

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
    this.setState({ results: results.gas_stations,
                    usedSearch: true,
                    initialLoaded:  true,
                    currentPageNumber: results.page,
                    totalPages: results.pages,
                    inputSearch: results.input_search,
                    latitude: parseFloat(results.latitude),
                    longitude: parseFloat(results.longitude),
                    typeSearch: results.type_search
                  })
  }

  handleClick = (e) => {
    const selectedPage = e.selected;
    if (this.state.typeSearch === 'coordinates'){
      this._searchByCoordinates(this.state.latitude, this.state.longitude, selectedPage)
    } else {
      this._searchByText(this.state.inputSearch, selectedPage)
    }

  };


  _renderResults () {
    return this.state.results.length === 0
      ? <div>
          <p>Lo sentimos! No se encontraron resultados!</p>
        </div>
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
            forcePage={this.state.currentPageNumber}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}/>
      </div>
  }

  _searchByCoordinates(latitude, longitude, page) {
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
                        typeSearch: results.type_search
                      })
      })
  }

  _searchByText(inputSearch, page) {
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
                        typeSearch: results.type_search
                      })
      })
  }





  show_pos = (position) => {
    var lat = position.coords.latitude
    var long = position.coords.longitude
    if ((lat.isNaN && long.isNaN) || (lat !== "NaN" && long !== "NaN")){
      console.log("browser")
      localStorage.setItem('lat', lat)
      localStorage.setItem('long', long)
    } else {
      console.log("default")
      localStorage.setItem('lat', LATITUDE_MADRID)
      localStorage.setItem('long', LONGITUDE_MADRID)
    }
    this._searchByCoordinates(localStorage.getItem('lat'), localStorage.getItem('long'), this.state.currentPageNumber)
  }

  error_pos = () => {
    console.log("error geolocation")
    alert("Recuerda dar permisos de localización en tu ordenador. De lo contrario se mostrarán por defecto las gasolineras de Madrid")
    this._searchByCoordinates(LATITUDE_MADRID, LONGITUDE_MADRID, this.state.currentPageNumber)

  }

  componentDidMount() {
    if (navigator.geolocation && this.state.results.length === 0 && this.state.initialLoaded === false){
      var geoOptions = { enableHighAccuracy:true, maximumAge : 300000 }
      navigator.geolocation.getCurrentPosition(this.show_pos, this.error_pos, geoOptions)
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
            : <div className="spinner">
                <Loader
                   type="Puff"
                   color="#00BFFF"
                   height={100}
                   width={100}
                   timeout={5000} //5 secs

                />
              </div>
          }
        </div>
      </div>
    )
  }

}
