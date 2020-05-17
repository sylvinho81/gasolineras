import React from 'react'
import { ButtonBackToHome } from '../components/ButtonBackToHome'
import {MenuHeader} from '../components/MenuHeader'
import {Footer} from '../components/Footer'
export const NotFound = () => (
  <div className="App d-flex flex-column min-vh-100">
    <div className="wrapper flex-grow-1">
      <MenuHeader />
      <main className="container" style={{"paddingTop": "50px"}}>
        <div className="row">
            <div className="col-md-12">
                <div className="error-template">
                    <h1>
                        Oops!</h1>
                    <h2>
                        Página no encontrada</h2>
                    <div className="error-details">
                        Lo sentimos, pero parece que la página que buscas no existe
                    </div>
                    <div className="error-actions">
                        <ButtonBackToHome/>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
    <Footer/>
  </div>
)
