import { Highlight, AwarenessEditor, ComponentAsset, generateJSXCode, ProBuilder } from '@ant-design/pro-editor';
import { RedoOutlined, UndoOutlined } from '@ant-design/icons';
import { LevaPanel as LevaPanelAnt } from '@ant-design/leva-panel';
// import { LevaPanel } from 'leva';
import React, { ReactNode, ReactElement, useEffect, useState } from 'react';
import { useLocalStorageState } from 'ahooks';
import { useProBuilderStore } from '@ant-design/pro-editor';
import { Button, Divider } from 'antd';
import isEqual from 'fast-deep-equal';
import { FC, memo } from 'react';
import { Flexbox } from 'react-layout-kit';
import { shallow } from 'zustand/shallow';
import { createStore } from './configStore';
import { useConfigActor } from './useConfigActor';

// const ValidLevaPanel: React.FC<any> = (props) => {
//   return <LevaPanelAnt {...props} />;
// };

const ValidLevaPanel: React.FC<any> = (props): ReactElement => {
  return <div>{LevaPanelAnt(props)}</div>;
};

interface ConfigVariantProps {
  props: { props: any; config: any } | any;
  children: React.ReactNode;
  updateConfig: (props: any, config: any) => void;
}

/* variants */
const RenderConfigVariantComponent: FC<ConfigVariantProps> = ({ children, props, updateConfig }) => {
  return (
    <Button
      onClick={() => {
        updateConfig(props.props, props.config);
      }}
    >
      {children}
    </Button>
  );
};

/* Config */
export const RenderConfigEditorComponent = memo(() => {
  const { model, definition } = useConfigActor();

  const data = useProBuilderStore((s) => s.config, isEqual);
  const [updateConfig, undo, redo, undoStack, redoStack] = useProBuilderStore(
    (s) => [s.setConfig, s.undo, s.redo, s.undoStack().length, s.redoStack().length],
    shallow,
  );

  return (
    <>
      <ValidLevaPanel
        schema={model}
        onChange={(data, item) => {
          updateConfig(item, { replace: true });
        }}
        value={data}
        title={definition.key}
      />
      <Divider />

      <Flexbox horizontal gap={4} align={'center'} padding={8}>
        variants：
        {Object.values(definition.variants).map((variant: any, index) => {
          return (
            <RenderConfigVariantComponent key={index} props={variant} updateConfig={updateConfig}>
              {variant.props.children}
            </RenderConfigVariantComponent>
          );
        })}
      </Flexbox>

      <Divider />
      <Flexbox horizontal padding={12} gap={8}>
        <Button icon={<UndoOutlined />} onClick={undo} disabled={undoStack === 0}>
          <Flexbox style={{ display: 'inline-flex' }} horizontal gap={4}>
            <div>cancel</div>
          </Flexbox>
        </Button>
        <Button icon={<RedoOutlined />} onClick={redo} disabled={redoStack === 0}>
          redo
        </Button>
      </Flexbox>
    </>
  );
});

export const RenderSelectedComponent = memo(() => {
  const data = useProBuilderStore((s) => s.config, isEqual);

  console.log(data);
  return <Button {...data} />;
});

export const codeEmitter = (config, codeTemplate) => {
  const code = codeTemplate({
    component: generateJSXCode(config.component, {
      ...config,
    }),
  });
  return code;
  // return prettier(code);
};

export const generateComponentAssetParams = () => {
  const { send, state, definition, model, codeTemplate, defaultConfig, isReady, hasSelected } = useConfigActor();

  if (!hasSelected) {
    return null;
  }

  return {
    id: definition.component,
    createStore,
    ui: {
      rules: [],
      Component: RenderSelectedComponent,
      ConfigPanel: RenderConfigEditorComponent,
    },
    models: [model],
    defaultConfig: defaultConfig, // Handle potential nullish defaultConfig
    codeEmitter: (config) => codeEmitter(config, codeTemplate),
  };
};

export const RenderProBuilderDemo = () => {
  const componentAssetParams: any = generateComponentAssetParams();

  if (componentAssetParams ?? false) {
    const RenderComponentAssets = new ComponentAsset(componentAssetParams);
    return <ProBuilder componentAsset={RenderComponentAssets} style={{ height: 600 }} />;
  } else {
    return null;
  }
};
