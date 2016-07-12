import React from 'react'
import { tdStyle, rightAlign, toggleStyle, tdRight } from './Editor.scss'
import { Button } from '../Button'
import { Toggle } from '../Toggle'
import className from 'classnames'

export const FormRow = React.createClass({
  render: function() {
    const {
      checked,
      onChange,
      required,
      onChangeRequired,
      onClick
    } = this.props
    return(
      <tr>  
        <td className = { tdStyle } >
          <Button handleOnClick={ onClick } size={ 'small' } color={ 'red' } text={ 'Delete' }>
          </Button>
          { this.props.text }
        </td>
        <td className = { className(tdStyle, tdRight)  }>
          <Toggle className={ className(toggleStyle, rightAlign) } toggleValue={ onChangeRequired }/>
        </td>
      </tr>
    ) 
  }
})