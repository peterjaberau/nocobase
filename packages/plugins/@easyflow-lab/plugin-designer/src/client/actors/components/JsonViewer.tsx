import React, { FC } from 'react';
import 'react18-json-view/src/style.css';
import JsonView from 'react18-json-view';
import { configMachineLogic, useConfigActor } from '../useConfigActor';

export const JsonViewer: FC<any> = (props) => {
  const {
    actor,
    send,
    isIdle,
    isReady,
    hasSelected,
    isBusy,
    nextEvents,
    state,
    currentValue,
    definition,
    definitions,
    model,
    codeTemplate,
    defaultConfig,
  } = useConfigActor();

  return (
    <JsonView
      src={{
        actor: actor,
        send: send,
        isIdle: isIdle,
        isReady: isReady,
        hasSelected: hasSelected,
        isBusy: isBusy,
        nextEvents: nextEvents,
        currentValue: currentValue,
        value: state.value,
        definition: definition,
        definitions: definitions,
        defaultConfig: defaultConfig,
        model: model,
        codeTemplate: codeTemplate,
        configMachineLogic: configMachineLogic,
      }}
      displaySize={false}
      theme={'default'}
      enableClipboard={true}
      collapseObjectsAfterLength={20}
      collapseStringsAfterLength={100}
      collapseStringMode={'word'}
      collapsed={2}
    />
  );
};
