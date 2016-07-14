import React from 'react'

import { Case } from './Case';

export class Select extends React.Component {

  render() {
    if (!this.props.children) {
      return <noscript />;
    }

    const validChildren = this.props.children.filter(x => x.type === Case);

    if (validChildren.length !== this.props.children.length) {
      console.warn('Only use Case as a direct child of Select');
    }

    const activeCase = validChildren.find(child => child.props.when === this.props.on);

    if (activeCase) {
      return activeCase;
    } else {
      return <noscript />;
    }

  }

}
