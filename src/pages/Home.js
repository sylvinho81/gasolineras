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
//const API_KEY_GEO = Config.apiKeyGeo

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
       <div ref={this.containerRef}>
         <GasStationMap
           markers={this.state.results}
           center={{lat: this.state.latitude, lng: this.state.longitude}}
           zoom={12}
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


  tryAPIGeolocation = () => {
    this._searchByCoordinates(LATITUDE_MADRID, LONGITUDE_MADRID, this.state.currentPageNumber)
    // fetch("https://api.ipify.org/?format=json")
    //  .then(response => response.json())
    //  .then(data => {
    //    console.log("API IP success" + data.ip)
    //    fetch("http://api.ipstack.com/" + data.ip + "?access_key="+ API_KEY_GEO)
    //       .then(response => response.json())
    //       .then(data => {
    //         console.log("API Geolocation success " + data.latitude + " " + data.longitude)
    //         this._searchByCoordinates(data.latitude, data.longitude, this.state.currentPageNumber)
    //       })
    //    .catch(err => {
    //       console.log("API Geolocation error! \n\n"+err);
    //       this._searchByCoordinates(LATITUDE_MADRID, LONGITUDE_MADRID, this.state.currentPageNumber)
    //    });
    //  }).catch(err => {
    //     console.log("API IP error! \n\n"+err);
    //     this._searchByCoordinates(LATITUDE_MADRID, LONGITUDE_MADRID, this.state.currentPageNumber)
    //  });

  }



  show_pos = (position) => {
    var lat = position.coords.latitude
    var long = position.coords.longitude
    console.log("Browser geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
    localStorage.setItem('lat', lat)
    localStorage.setItem('long', long)
    this._searchByCoordinates(localStorage.getItem('lat'), localStorage.getItem('long'), this.state.currentPageNumber)
  }

  error_pos = (error) => {
    console.log(error.code)
    console.log(error.TIMEOUT)
    console.log(error.PERMISSION_DENIED)
    console.log(error.POSITION_UNAVAILABLE)
    switch (error.code) {
      case error.TIMEOUT:
        console.log(error.message)
        this.tryAPIGeolocation()
        break;
      case error.PERMISSION_DENIED:
        console.log(error.message)
        this.tryAPIGeolocation()
        break;
      case error.POSITION_UNAVAILABLE:
        console.log(error.message)
        this.tryAPIGeolocation()
        break;
      default:
        this.tryAPIGeolocation()
        break;
    }
    //alert("Recuerda dar permisos de geolocalización en tu dispositivo. De lo contrario se mostrarán por defecto las gasolineras de Madrid")


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
    console.log("render")
    return (
      <div className="App d-flex flex-column min-vh-100">
        <div className="wrapper flex-grow-1">
          <MenuHeader />
          <main className="container" style={{"paddingTop": "20px"}}>
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
          </main>
        </div>
        <Footer/>
      </div>

    )
  }

}
