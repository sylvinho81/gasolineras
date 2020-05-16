import React, {Component} from 'react'
import {SearchForm} from '../components/SearchForm'
import {GasStationsList} from '../components/GasStationsList'
import {MenuHeader} from '../components/MenuHeader'
import ReactPaginate from 'react-paginate';
import {GasStationMap} from '../components/GasStationsMap'
import {Config} from '../configuration'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import {Footer} from '../components/Footer'

const URL_API_INDEX = Config.apiIndexUrl
const URL_API_SEARCH = Config.apiSearchUrl
const LATITUDE_MADRID = Config.latMadrid
const LONGITUDE_MADRID= Config.longMadrid
const SELECTED_RADIO_BY_DEFAULT= Config.selectedRadioByDefault

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { usedSearch: false,
              results: [],
              initialLoaded: false,
              currentPageNumber: 0,
              totalPages: 1,
              inputSearch: '',
              latitude: LATITUDE_MADRID,
              longitude: LONGITUDE_MADRID,
              typeSearch: 'normal',
              selectedRadio: SELECTED_RADIO_BY_DEFAULT

    };
    this.containerRef = React.createRef()
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
                    typeSearch: results.type_search,
                    selectedRadio: results.type_fuel
                  })
  }

  handleClick = (e) => {
    const selectedPage = e.selected;
    if (this.state.typeSearch === 'coordinates'){
      this._searchByCoordinates(this.state.latitude, this.state.longitude, selectedPage, this.state.selectedRadio)
    } else {
      this._searchByText(this.state.inputSearch, selectedPage, this.state.selectedRadio)
    }
  };



  _renderResults () {
    const listResults = (this.state.results.length === 0) ?
      <div className="row">
        <div className="col-md-12">
          <p>Lo sentimos! No se encontraron resultados!</p>
        </div>
      </div>
    :
      <span>
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
        </span>


    return(
     <div ref={this.containerRef}>
       <GasStationMap onResultsMap={this._handleResults}
         markers={this.state.results}
         center={{lat: this.state.latitude, lng: this.state.longitude}}
         zoom={12}
         viewPage={"home"}
         selectedRadio={this.state.selectedRadio}
        />
        {listResults}
     </div>
   )
  }

  _searchByCoordinates(latitude, longitude, page, selectedRadio) {
    fetch(`${URL_API_INDEX}?lat=${latitude}&long=${longitude}&page=${page}&radio=${selectedRadio}`)
      .then(res => res.json())
      .then(results => {
        this.setState({ results: results.gas_stations,
                        usedSearch: true,
                        initialLoaded:  true,
                        currentPageNumber: results.page,
                        totalPages: results.pages,
                        inputSearch: results.inputSearch,
                        latitude: parseFloat(results.latitude),
                        longitude: parseFloat(results.longitude),
                        typeSearch: results.type_search,
                        selectedRadio: results.type_fuel
                      })
      })
  }

  _searchByText(inputSearch, page, selectedRadio) {
    fetch(`${URL_API_SEARCH}?q=${inputSearch}&page=${page}&radio=${selectedRadio}`)
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
                        typeSearch: results.type_search,
                        selectedRadio: results.type_fuel
                      })
      })
  }


  tryAPIGeolocation = () => {
    localStorage.removeItem('lat')
    localStorage.removeItem('long')
    this._searchByCoordinates(this.state.latitude, this.state.longitude, this.state.currentPageNumber, this.state.selectedRadio)
  }



  show_pos = (position) => {
    var lat = position.coords.latitude
    var long = position.coords.longitude
    console.log("Browser geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
    localStorage.setItem('lat', lat)
    localStorage.setItem('long', long)
    this._searchByCoordinates(localStorage.getItem('lat'), localStorage.getItem('long'), this.state.currentPageNumber,this.state.selectedRadio)
  }

  error_pos = (error) => {
    console.log(error.message)
    this.tryAPIGeolocation()
  }

  scrollToContainerRef = () => window.scrollTo(0, this.containerRef.offsetTop)

  componentDidMount() {
    if (navigator.geolocation && this.state.results.length === 0 && this.state.initialLoaded === false){
      var geoOptions = { enableHighAccuracy:true, maximumAge : 50000, timeout: 20000 }
      navigator.geolocation.getCurrentPosition(this.show_pos, this.error_pos, geoOptions)
    }
  }


  componentDidUpdate(){
    this.scrollToContainerRef()
  }



  render (){
    return (
      <div className="App d-flex flex-column min-vh-100">
        <div className="wrapper flex-grow-1">
          <MenuHeader />
          <main className="container" style={{"paddingTop": "20px"}}>
            <SearchForm onResults={this._handleResults} lat={localStorage.getItem('lat') || this.state.latitude} lng={localStorage.getItem('long') || this.state.longitude}/>

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
          </main>
        </div>
        <Footer/>
      </div>
    )
  }

}
