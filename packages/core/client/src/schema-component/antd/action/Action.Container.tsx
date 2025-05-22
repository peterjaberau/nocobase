

import { observer, useField, useFieldSchema } from '@formily/react';
import React from 'react';
import { useActionContext } from '.';
import { EasyFlowRecursionField } from '../../../formily/EasyFlowRecursionField';
import { useOpenModeContext } from '../../../modules/popup/OpenModeProvider';
import { ComposedActionDrawer } from './types';
import { ActionDrawer } from './Action.Drawer';

const PopupLevelContext = React.createContext(0);

export const ActionContainer: ComposedActionDrawer = observer(
  (props: any) => {
    const { getComponentByOpenMode, defaultOpenMode } = useOpenModeContext() || {};
    const { openMode = defaultOpenMode } = useActionContext();
    const popupLevel = React.useContext(PopupLevelContext);
    const currentLevel = popupLevel + 1;

    const Component = getComponentByOpenMode(openMode) || ActionDrawer;

    return (
      <PopupLevelContext.Provider value={currentLevel}>
        <Component footerNodeName={'Action.Container.Footer'} level={currentLevel || 1} {...props} />
      </PopupLevelContext.Provider>
    );
  },
  { displayName: 'ActionContainer' },
);

ActionContainer.Footer = observer(
  () => {
    const field = useField();
    const schema = useFieldSchema();
    return <EasyFlowRecursionField basePath={field.address} schema={schema} onlyRenderProperties />;
  },
  { displayName: 'ActionContainer.Footer' },
);

export default ActionContainer;
