import styled from 'styled-components';
import React, { ReactNode, useContext, useMemo, useRef, useState, createContext } from 'react';
import { Layers } from '../../constants';
import {
  ArrowsAltOutlined as CodeEditorOpenIcon,
  PushpinOutlined as CodeEditorPinnedIcon,
  PushpinOutlined as CodeEditorUnPinnedIcon,
  CloseOutlined as CodeEditorCloseIcon,
  DragOutlined as DragIcon,
} from '@ant-design/icons';
import Trigger from 'rc-trigger';
import { Resizable } from 'react-resizable';
import Handle from './handler';
import Draggable from 'react-draggable';
import { getPanelStyle, savePanelStyle } from './utils';
import { isEmpty } from 'lodash';
import { Tag } from 'antd';

const Wrapper = styled.div`
  max-width: 60vw;
  max-height: 70vh;
  position: fixed;
  z-index: ${Layers.codeEditorPanel};
  top: 35%;
  left: 50%;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;
const HeaderWrapper = styled.div`
  height: 40px;
  cursor: move;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e3eb;
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #222222;
  //margin-bottom: 16px;
`;
const StyledDragIcon = styled(DragIcon)`
  margin-right: 8px;
`;
const BodyWrapper = styled.div`
  height: calc(100% - 40px);
`;

const OpenButton = styled.div`
  position: absolute;
  height: 16px;
  width: 16px;
  border: 1px solid #d7d9e0;
  border-radius: 4px;
  z-index: 1;
  bottom: 8px;
  right: 8px;
  cursor: pointer;
  display: none;
  background-color: #ffffff;

  svg {
    height: 100%;
    display: block;
    margin: auto;
  }

  &:hover {
    svg g g {
      stroke: #222222;
    }
  }
`;
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CloseButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60px;
  height: 26px;
  background: #ffffff;
  border: 1px solid #d7d9e0;
  border-radius: 4px;

  font-size: 13px;
  color: #333333;
  padding: 6px 8px 5px;
  //margin-bottom: auto;
  cursor: pointer;

  &:hover {
    background: #f5f5f6;

    svg g g {
      stroke: #222222;
    }
  }
`;
const PinButton = styled.div`
  width: 32px;
  height: 26px;
  border: 1px solid #d7d9e0;
  border-radius: 4px;
  color: #333333;
  padding: 2px;
  cursor: pointer;

  &:hover {
    background: #f5f5f6;

    svg g g {
      stroke: #222222;
    }
  }

  // fixes the icon when there's no text in the container
  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`;

export const CompNameContext = createContext<string>(undefined as any);

export const CodeEditorPanel = (props: { editor: ReactNode; breadcrumb?: ReactNode[]; onVisibleChange: (visible: boolean) => void }) => {
  const draggableRef = useRef<HTMLDivElement>(null);
  const [unDraggable, setUnDraggable] = useState(true);
  const [pinned, setPinned] = useState(false);

  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const panelStyle = useMemo(() => getPanelStyle(), [props.editor]);
  const [size, setSize] = useState({
    w: panelStyle.codeEditor.w,
    h: panelStyle.codeEditor.h,
  });

  const [visible, setVisible] = useState(false);

  const compName = useContext(CompNameContext);

  return (
    <Trigger
      popupVisible={visible}
      action={['click']}
      zIndex={Layers.codeEditorPanel}
      popupStyle={{ opacity: 1, display: visible ? 'block' : 'none' }}
      maskClosable={!pinned}
      mask={true}
      onPopupVisibleChange={(visible) => setVisible(visible)}
      afterPopupVisibleChange={(visible) => props.onVisibleChange(visible)}
      getPopupContainer={(node: any) => node.parentNode.parentNode}
      popup={() => (
        <Draggable
          nodeRef={draggableRef}
          positionOffset={{ x: '-50%', y: '-50%' }}
          disabled={unDraggable}
          bounds={bounds}
          onStart={(event, uiData) => {
            const { clientWidth, clientHeight } = window.document.documentElement;
            const targetRect = draggableRef.current?.getBoundingClientRect();
            if (!targetRect) {
              return;
            }
            setBounds({
              left: -targetRect.left + uiData.x,
              right: clientWidth - (targetRect.right - uiData.x),
              top: -targetRect.top + uiData.y,
              bottom: clientHeight - (targetRect.bottom - uiData.y),
            });
          }}
        >
          <Resizable
            width={size.w}
            height={size.h}
            onResize={(event, { size }) => setSize({ w: size.width, h: size.height })}
            onResizeStop={() => savePanelStyle({ ...panelStyle, codeEditor: { w: size.w, h: size.h } })}
            handle={Handle}
            resizeHandles={['s', 'n', 'w', 'e', 'sw', 'nw', 'se', 'ne']}
            minConstraints={[480, 360]}
          >
            <Wrapper ref={draggableRef} style={{ width: size.w + 'px', height: size.h + 'px' }}>
              <HeaderWrapper onMouseOver={() => setUnDraggable(false)} onMouseOut={() => setUnDraggable(true)}>
                <TitleWrapper>
                  <Tag color="blue-inverse">codeEditorPanel</Tag>
                  <StyledDragIcon />
                  {[compName, ...(props.breadcrumb ?? [])].filter((t) => !isEmpty(t)).join(' / ')}
                </TitleWrapper>
                <Buttons>
                  <PinButton onClick={() => setPinned(!pinned)}>{pinned ? <CodeEditorPinnedIcon /> : <CodeEditorUnPinnedIcon />}</PinButton>
                  <CloseButton onClick={() => setVisible(false)}>
                    <CodeEditorCloseIcon />
                    {'Fold'}
                  </CloseButton>
                </Buttons>
              </HeaderWrapper>

              <BodyWrapper>{props.editor}</BodyWrapper>
            </Wrapper>
          </Resizable>
        </Draggable>
      )}
    >
      <OpenButton className={'code-editor-panel-open-button'} onClick={() => setVisible(true)}>
        <CodeEditorOpenIcon />
      </OpenButton>
    </Trigger>
  );
};
