import React, {Component} from 'react'

const to = "https://datos.gob.es/es/catalogo/e04990201-precio-de-carburantes-en-las-gasolineras-espanolas"
const font = "datos.gob.es"
export class Footer extends Component {

  render () {

    return (
      <footer id="footer" className="footer">
        <div className="container">
          <span className="text-muted">Fuente: <a rel="noopener" href={to}>{font}</a></span>
        </div>
      </footer>
    )
  }
}
