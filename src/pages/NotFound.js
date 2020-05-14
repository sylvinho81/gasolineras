import React from 'react'
import { ButtonBackToHome } from '../components/ButtonBackToHome'

export const NotFound = () => (
  <div className="container">
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
</div>
)
