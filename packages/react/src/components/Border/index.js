import React from 'react';
import cn from 'classnames';

export default function Border(props) {
  const {
    className,
    bottom,
    top,
    left,
    right,
    all
  } = props;
  const cls = cn('hair-line', {
    'hair-line--b': bottom,
    'hair-line--t': top,
    'hair-line--l': left,
    'hair-line--r': right,
    'hair-line--a': all
  }, className);
  return (
    <div className={cls}>{props.children}</div>
  )
}
