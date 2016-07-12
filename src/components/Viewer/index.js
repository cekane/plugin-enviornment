import React from 'react'
import { Button } from '../Button'
import { Select, Case } from '../Select'
import { frmInput } from './Viewer.scss'

import className from 'classnames'

export class Viewer extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      values: { },
      visObjs: { },
      errorMsg: ' ',
      sub: 'Submit'
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  _setValue (key) {
    const that = this
    return function(e){
      var newState = that.state;
      newState.values[key] = e.target.value;
      console.log(newState.values[key])
      that.setState(newState); 
    }
  }

  visibleFields(fields)
  {
    var flds = fields
    return flds.map(k =>{
      var asterix
      if (k.req) 
        asterix = ' (Required)'
      else
        asterix = '' 
      return (  <div>{k.name + asterix}
                  <input 
                    className={ className("form-control", frmInput) } 
                    type="text"  
                    placeholder={ k.name }
                    onChange={ this._setValue(k.name) }/>
                </div>)
    }) 
  }

  render(){
    const that = this
    return (
      <Select on={ this.validateEmail(this.props.data.email) }>
        <Case when={ false }>
          <div>INVALID EMAIL</div>
        </Case>
        <Case when={ true }>
          <div>
            {console.log("VALIDATE EMAIL", this.validateEmail(this.props.data.email))}
            {this.visibleFields(this.props.data.fields)}
            <p>{ this.state.errorMsg }</p>
            <Button  text={'Submit'} handleOnClick={
              function(){
                  console.log("You would have submited stuff")
                }
              }>
            </Button>
          </div>
        </Case>
      </Select>
    )
  }
}
