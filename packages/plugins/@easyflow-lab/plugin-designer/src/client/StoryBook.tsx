import * as React from 'react';
import { StoryBook, useControls, useCreateStore } from '@lobehub/ui';
import { CodeEditorDemo } from './demos/CodeEditorDemo';
import { Row, Col, Card, Space, Button, Typography } from 'antd';
import { useCallback, useContext, useMemo, useState } from 'react';
import { TryProviders } from './demos/app/TryProviders';
import { useContentScope } from './ContentProvider';
import { JsonViewer } from './actors/components/JsonViewer';
import { useConfigActor } from './actors/useConfigActor';
import { Tag } from '@lobehub/ui';
const { Text, Link } = Typography;

const demoList = [
  'pageStateDemo',
  'gloablStateDemo',
  'calcContext',
  'compStateDemo',
  'tmpCalcContext',
  'compPropsDemo',
  'compExposingDemo',
];

const ProEditStates = () => {
  const { actor, state, isIdle, isReady, isBusy, hasSelected, currentValue, nextEvents, definition, definitions } = useConfigActor();

  const currentState = useMemo(() => {
    return {
      state: state.value,
      isIdle: isIdle,
      isReady: isReady,
      hasSelected: hasSelected,
      isBusy: isBusy,
      hasDefinitions: definitions && definitions.length > 0 ? 'true' : 'false',
      selectedDefinitionId: state.context.selectedDefinitionId,
      nextEvents: nextEvents,
    };
  }, [state]);

  return (
    <Space direction={'vertical'}>
      <Card title={'Pro Editor Controls'}>
        {isReady === true && hasSelected === false ? (
          <Button disabled={false} onClick={() => actor.send({ type: 'SELECT_CONFIG', key: 'button' })}>
            Trigger Pro Editor
          </Button>
        ) : (
          <Button disabled={true}>Selected!</Button>
        )}
        <Button onClick={() => console.log(state)}>Log State</Button>
      </Card>
      <Card title={'Pro Editor States'}>
        <Space direction={'vertical'}>
          {Object.keys(currentState).map((key) => {
            return (
              <div key={key}>
                <Text strong>{key}</Text>
                <Text code>{typeof currentState[key] === 'boolean' ? (currentState[key] ? 'true' : 'false') : currentState[key]}</Text>
              </div>
            );
          })}

          {/*<pre>*/}
          {/*  <code>{JSON.stringify(state.context, null, 2)}</code>*/}
          {/*</pre>*/}
        </Space>
      </Card>
    </Space>
  );
};

export const StoryBookComponent = () => {
  const globalContent = useContentScope('editor', 'withTempState');
  const [content, setContent] = useState(globalContent.button1.text);
  // const value = globalContent.button1.text;

  const handleChange = useCallback(
    (e) => {
      console.log('----Storybook', e);
      setContent(e.doc.toString());
    },
    [globalContent],
  );

  const store = useCreateStore();
  const {
    panelPlaceholder,
    panelLabel,
    cardTitle,
    cardContent,
    text,
    color,
    fontSize,
    fontWeight,
    upperCase,
    bordered,
    enableClickCompName,
    disableCard,
    enableExposingDataAutoCompletion,
    contentKey,
    demoId,
    codeText,
  } = useControls(
    {
      color: '#ff005b',
      fontSize: {
        max: 100,
        min: 4,
        step: 2,
        value: 14,
      },
      fontWeight: {
        options: ['normal', 'bold'],
        value: 'normal',
      },
      text: 'StoryBook',
      upperCase: false,
      bordered: true,
      enableClickCompName: true,
      disableCard: false,
      enableExposingDataAutoCompletion: true,
      codeText: '',
      cardTitle: '',
      contentKey: {
        options: [
          'withPageState',
          'withTempState',
          'withLogicState',
          'withGlobalState',
          'autoCompletionScenario',
          'stringSnippetsScenario',
        ],
        value: 'withTempState',
      },
      demoId: {
        options: [
          'pageStateDemo',
          'gloablStateDemo',
          'calcContext',
          'compStateDemo',
          'tmpCalcContext',
          'compPropsDemo',
          'compExposingDemo',
        ],
        value: 'pageStateDemo',
      },
      cardContent: '',
      panelPlaceholder: 'static or {{dynamic expressions}}',
      panelLabel: 'draggable panel label',
    },
    { store },
  );

  return (
    <StoryBook levaStore={store} style={{ backgroundColor: '#fafafa', width: '100%' }}>
      <Row gutter={24} style={{ backgroundColor: '#fafafa', width: '1200px' }}>
        <Col span={8}>
          <Card title={'Sotrybook'} bordered={false}>
            <Space direction={'horizontal'} wrap>
              <TryProviders />
            </Space>

            <div>
              (<div style={{ color, fontSize, fontWeight }}>{upperCase ? text.toUpperCase() : text}</div>)
              <p>StoryBook is a tool for developing UI components in isolation for React, Vue, and Angular.</p>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title={'Editor'} bordered={false}>
            <Space direction={'vertical'}>
              <Card title="Code Editor">
                <CodeEditorDemo
                  cardContent={cardContent}
                  placeholder={panelPlaceholder}
                  label={panelLabel}
                  cardTitle={cardTitle}
                  demoId={demoId !== null ? demoId : null}
                  bordered={bordered}
                  enableClickCompName={enableClickCompName}
                  enableExposingDataAutoCompletion={enableExposingDataAutoCompletion}
                  codeText={codeText}
                />
              </Card>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <ProEditStates />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={8}></Col>
        <Col span={16}>
          <Card title={'Rendered Component'} bordered={false} style={{ backgroundColor: '#fafafa', width: '1200px' }}>
            <JsonViewer />
            {/*<RenderProBuilderDemo />*/}
          </Card>
        </Col>
      </Row>
    </StoryBook>
  );
};
