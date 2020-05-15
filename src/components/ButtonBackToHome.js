import React from 'react'
import { Link } from 'react-router-dom'

export const ButtonBackToHome = () => (
  <div className="back-button">
    <Link
      className='button is-info btn btn-primary'
      to='/'>
      Volver a la página de inicio
    </Link>
  </div>
)
