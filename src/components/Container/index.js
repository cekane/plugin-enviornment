import React from 'react';
import ReactDOM from 'react-dom';

import { container, item } from './Container.scss';
import { Viewer } from '../Viewer'
import { Editor } from '../Editor'
import { ComponentEditor } from '../ComponentEditor'
import { Button } from '../Button'

export class Container extends React.Component{

  constructor(props){
    super(props);
  }

  render () {
    return(
        <span className={ container }>
          <div className={ item }>
            <h1>Editor</h1>
            <Editor handleChange = { this.props.handleChange } data = { this.props.data }/>
          </div>
          <div className={ item }>
            <h1>Viewer</h1>
            <Viewer data={ this.props.data } />
          </div>
        </span>
    )
  }
};

export const ContainerHOC = ComponentEditor(Container)