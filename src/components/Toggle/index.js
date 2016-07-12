import React from 'react'

import { switchStyle, slider, round} from './Toggle.scss'
import className from 'classnames'

export class Toggle extends React.Component{
  constructor(props){
    super(props)
  }

  render () {
    return (
      <label className={switchStyle}>
        <input type="checkbox" ref="toggle" onChange={ this.props.toggleValue }/>
        <div className={className(slider, round)}/>
      </label>
    )
  }
}