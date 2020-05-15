import React, { Component } from 'react'
import PropTypes from 'prop-types'
import bp from '../assets/bp.png'
import campsa from '../assets/campsa.png'
import carrefour from '../assets/carrefour.png'
import cepsa from '../assets/cepsa.png'
import galp from '../assets/galp.png'
import meroil from '../assets/meroil.png'
import petronor from '../assets/petronor.png'
import repsol from '../assets/repsol.png'
import shell from '../assets/shell.png'
import top_oil from '../assets/top_oil.png'
import no_image from '../assets/no-image.png'
import alcampo from '../assets/alcampo.jpg'
import eroski from '../assets/eroski.jpg'
import ballenoil from '../assets/ballenoil.png'
import saras from '../assets/saras.png'
import avia from '../assets/avia.jpg'
import carbugal from '../assets/carbugal.png'
import easygas from '../assets/easygas.jpg'
import petroprix from '../assets/petroprix.png'
import ortegal_oil from '../assets/ortegal_oil.png'
import plenoil from '../assets/plenoil.png'
import beroil from '../assets/beroil.jpg'
import galioil from '../assets/galioil.png'
import nuroil from '../assets/nuroil.jpg'
import norpetrol from '../assets/norpetrol.png'

export class ImageGasStation extends Component {
  static propTypes = {
    label: PropTypes.string,
  }

  _getImage (label) {
    switch(true) {
      case /^bp/.test(label):
        return bp;
      case /campsa/.test(label):
        return campsa;
      case /carrefour/.test(label):
        return carrefour;
      case /cepsa/.test(label):
        return cepsa;
      case /galp/.test(label):
        return galp;
      case /meroil/.test(label):
        return meroil;
      case /petronor/.test(label):
        return petronor;
      case /repsol/.test(label):
        return repsol;
      case /shell/.test(label):
        return shell;
      case /top oil/.test(label):
        return top_oil;
      case /alcampo/.test(label):
        return alcampo;
      case /eroski/.test(label):
        return eroski;
      case /ballenoil/.test(label):
        return ballenoil;
      case /^saras$/.test(label):
        return saras;
      case /^avia/.test(label):
        return avia;
      case /carbugal/.test(label):
        return carbugal;
      case /easygas/.test(label):
        return easygas;
      case /petroprix/.test(label):
        return petroprix;
      case /ortegal oil/.test(label):
        return ortegal_oil;
      case /plenoil/.test(label):
        return plenoil;
      case /beroil/.test(label):
        return beroil;
      case /galioil/.test(label):
        return galioil;
      case /nuroil/.test(label):
        return nuroil;
      case /norpetrol/.test(label):
        return norpetrol;
      default:
        return no_image;
    }
  }

  render () {
    const { label } = this.props

    return (
      <div className="text-center">
        <img className="card-img-top results-logotype"  src={this._getImage(label.toLowerCase())} alt={label.toLowerCase()}/>
      </div>
    )
  }
}
