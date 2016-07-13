import React from 'react'
import {  } from './Editor.scss'
import { Button } from '../Button'
import { Select, Case } from '../Select'

import className from 'classnames'

export class Editor extends React.Component{
  constructor (props) {
    super(props);
  }

  render(){
    const that = this
    return(
      <Button type="good" small solid onClick={ 
        function(){
          if(!that.props.data.count)
            that.props.data.count = 0
          var newFields = that.props.data
          newFields.count = newFields.count + 1
          var obj = { target: { value: newFields } }
          that.props.handleChange('that.props.data.count')(obj)
        }
      }>
      +
      </Button>
    )
  }
}
