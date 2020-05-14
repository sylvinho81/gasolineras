import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { ButtonBackToHome } from '../components/ButtonBackToHome'
import {MenuHeader} from '../components/MenuHeader'
import {Footer} from '../components/Footer'
import {Config} from '../configuration'
import {GasStationsList} from '../components/GasStationsList'
import ReactPaginate from 'react-paginate';

const URL_API_PROVINCE = Config.apiProvinceUrl

export class Province extends Component {
  constructor(props) {
    super(props);
    this.state = { results: [],
              currentPageNumber: 0,
              totalPages: 1,
              province: ''
    };
    this.containerRef = React.createRef()
  }


  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
      isExact: PropTypes.bool,
      path: PropTypes.string,
      url: PropTypes.string
    })
  }

  _fetchGasStation(province, page) {
    fetch(`${URL_API_PROVINCE}${province}?page=${page}`)
      .then(res => res.json())
      .then(results => {
        //console.log({ gas_station })
        this.setState({ results: results.gas_stations,
          currentPageNumber: results.page,
          totalPages: results.pages,
          province: province
         })
      })
  }

  handleClick = (e) => {
    const selectedPage = e.selected;
    this._fetchGasStation(this.state.province, selectedPage)

  };


  _renderResults () {
    return this.state.results.length === 0
      ? <div>
          <p>Lo sentimos! No se encontraron resultados!</p>
        </div>
      :
       <div ref={this.containerRef}>
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

  scrollToContainerRef = () => window.scrollTo(0, this.containerRef.offsetTop)

  componentDidMount () {
    //console.log(this.props)
    const { province } = this.props.match.params
    console.log(province)
    this._fetchGasStation(province, this.state.currentPageNumber)
  }


  componentDidUpdate() {
    document.title = `Precios carburantes en las Gasolineras de la provincia de ${this.state.province}`
    document.getElementsByTagName("META")[3].content = `Mejores precios de carburante en la provincia de ${this.state.province}. Si buscas los precios más económicos a la hora de repostar tu vehículo esta es tu página`
    this.scrollToContainerRef()
  }

  render () {

    return (
      <div className="App d-flex flex-column min-vh-100">
        <div className="wrapper flex-grow-1">
          <MenuHeader />
          <main className="container" style={{"paddingTop": "20px"}}>
            <h1 className="my-4">Gasolineras en {this.state.province.toUpperCase()}
            </h1>
            {this._renderResults()}
          </main>
          <ButtonBackToHome/>
        </div>
        <Footer/>
      </div>

    )
  }
}
