import React from 'react';
import { Option } from 'lib/utils';

export class InputWithValidation extends React.Component {

  constructor(props) {
    super(props);

    this.validator = (
      props.validator || (() => true)
    )

    this.message = (
      props.message || (() => '')
    )
  }

  render () {
    const that = this;

    const isValid = this.validator(this.props.value);
    return (
      <span>
        <input
          ref={ this.props.ref }
          className={ this.props.className + (!isValid? ' invalid' : '') }
          value={ this.props.value }
          onChange={ this.props.onChange.bind(this) } />
        {
          new Option(!isValid).filter(x => x).map(() =>
            <span className="msg">{ that.message(this.props.value) }</span>
          ).getOrElse(<span></span>)
        }
      </span>
    )
  }
}
