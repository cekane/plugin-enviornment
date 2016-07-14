import React from 'react'

export class Case extends React.Component {

  render() {
    if (Array.isArray(this.props.children)) {
      console.warn('Case should only have one direct child has', this.props.children);
    }

    if (typeof this.props.children === "function") {
      return this.props.children();
    } else {
      return this.props.children;
    }
  }

}
