import React from 'react'

import classNameGen from 'classnames'

import classes from './Buttons.scss'

export const Button = ({
  children,
  onClick,
  onMouseDown,
  selected,
  style,
  type,
  thick,
  square,
  solid,
  small,
  tooltip,
  className,
  ...rest
}) =>
  <div
    style={ style }
    onClick={ onClick }
    onMouseDown={ onMouseDown }
    data-tooltip={ tooltip }
    className={ classNameGen(
      classes[`${ type }Btn`],
      classes.btn,
      {
        [`${classes.chosen}`]: selected,
        [`${classes.thickBorders}`]: thick,
        'solid': solid,
        [`${classes.square}`]: square,
        [`${classes.small}`]: small
      }
    ) + ' ' + className } { ...rest }>
    <span className={ classes.btnInner }>
      { children }
    </span>
  </div>
