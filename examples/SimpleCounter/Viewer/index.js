import React from 'react'
import { Button } from '../Button'
import { Select, Case } from '../Select'
import {  } from './Viewer.scss'

import className from 'classnames'

export class Viewer extends React.Component{
  constructor (props) {
    super(props);
  }

  render(){
    return (
      <div>{ this.props.data.count }</div>
    )
  }
}
