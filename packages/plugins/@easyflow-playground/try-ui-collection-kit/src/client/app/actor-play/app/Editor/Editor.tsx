import React from 'react';
import EditorContext from './EditorContext';

export const Editor = ({ children }) => {
  return <EditorContext>{children}</EditorContext>;
};
