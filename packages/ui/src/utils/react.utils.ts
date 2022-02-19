import React from 'react';

export const classname = (...items: (string | boolean | undefined)[]): string => {
  return items.filter(item => !!item).join(' ');
};

export const omitChildren = <T> (props: React.PropsWithChildren<T>): Omit<React.PropsWithChildren<T>, 'children'> => {
  const { children: _children, ...otherProps } = props;
  return otherProps;
};
