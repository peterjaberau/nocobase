import React from 'react';
import { Play } from './play';
import PlayContext from './PlayContext';

export default ({hasActors = true}: any) => {

  return (
    <PlayContext>
      <Play hasActors={hasActors} />
    </PlayContext>
  )
}
