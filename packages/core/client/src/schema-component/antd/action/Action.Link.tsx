

import { observer } from '@formily/react';
import classnames from 'classnames';
import React from 'react';
import { withDynamicSchemaProps } from '../../../hoc/withDynamicSchemaProps';
import Action from './Action';
import { ComposedAction } from './types';

export const ActionLink: ComposedAction = withDynamicSchemaProps(
  observer((props: any) => {
    return (
      <Action
        {...props}
        component={props.component || 'a'}
        className={classnames('nb-action-link', props.className)}
        isLink
      />
    );
  }),
  { displayName: 'ActionLink' },
);
