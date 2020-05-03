import React, {Component} from 'react'

const to = "https://datos.gob.es/es/catalogo/e04990201-precio-de-carburantes-en-las-gasolineras-espanolas"
const font = "datos.gob.es"
export class Footer extends Component {

  render () {

    return (
      <footer id="sticky-footer" className="py-4 bg-dark text-white-50">
        <div className="container">
          Fuente: <a rel="noopener" href={to}>{font}</a>
        </div>
      </footer>
    )
  }
}
