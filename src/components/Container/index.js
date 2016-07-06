import React from 'react';
import ReactDOM from 'react-dom';

import { container, item } from './Container.scss';
import { Viewer } from '../Viewer'
import { Editor } from '../Editor'

export class Container extends React.Component {

  constructor(props){
    super(props)
  }

  render () {
    console.log("CONTAINER", container)
    return(
      <span className={ container }>
        <div className={ item }>
          <Editor/>
        </div>
        <div className={ item }>
          <Viewer/>
        </div>
      </span>
    )
  }
}