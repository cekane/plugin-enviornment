import React from 'react'
import { stable, underline, fieldName, tdRight } from './Editor.scss'
import { Button } from '../Button'
import { FormRow } from './FormRow'

export class Editor extends React.Component{
  constructor (props) {
    super(props);
  }

  addField(name){ 
    var uuid = require('node-uuid')
    var id = uuid.v4()
    var newFields = this.props.data.fields
    var toAdd = { name: name, req: false, id: id }
    newFields.push(toAdd)
    this.props.data.fields = newFields
    var obj = { target: { value: newFields } }
    this.props.handleChange('this.props.data.fields')(obj)
    console.log(this.props.data.fields)
  }

  removeField(id){
    var newFields = this.props.data.fields.filter(k=>{
      if(id !== k.id)
        return k
    })
    this.props.data.fields = newFields
    var obj = { target: { value: newFields } }
    this.props.handleChange('this.props.data.fields')(obj)
  }

  render(){
    const that = this
    console.log("PROPS", this.props.data)
    if (!this.props.data.fields)
    {
      this.props.data.fields = []
    }
    if (!this.props.data.email){
      this.props.data.email = ''
    }
    console.log('EMAIL', this.props.data.email)
    return(
      <span>
        
        <li>
          <span>Your Email</span>
          <input
            className="form-control" 
            type="email"
            value={ this.props.data.email }
            onChange={ this.props.handleChange('data.email') }/>
        </li>
        <li>
          <span>Add Fields</span>
          <span className = { fieldName }>
            <input
              className = "form-control" 
              type = "text"
              ref = "field"
            />
            <Button text={ 'Click Me' } size={ 'small' } handleOnClick={ 
              function(){
                    that.addField(that.refs.field.value)
                    that.refs.field.value = ''
                  } 
                } />
          </span>
        </li>
        <li>
          <span>Visable Fields</span>
          <table className={ stable }>
            <tr>
              <td >
                Fields
              </td>
              <td className={ tdRight }>
                (Required)
              </td>
            </tr>
              {
                this.props.data.fields.map((k, i)=>{
                  return(
                      <FormRow 
                        text={ k.name } 
                        onChangeRequired={ this.props.handleChange( `data.fields.${ i }.req` ) }
                        require={ k.req } 
                        onClick={ function(){
                          that.removeField(k.id)
                        } }
                      />
                    )
                  }
                )
              }
          </table>
        </li>
      </span>
    )
  }
}
