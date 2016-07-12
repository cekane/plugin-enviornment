import React from 'react'
import { Container, ContainerHOC } from './Container'
import '../../styles/main.scss'

export class App extends React.Component {

  constructor(props){
    super(props)
  }

  render () {
    return(
    	<div>
	      <ContainerHOC></ContainerHOC>
	    </div>
    )
  }
}
