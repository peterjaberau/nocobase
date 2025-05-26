import React from 'react';
import { Handle } from '@xyflow/react';
import { TinyAccordion } from '../../../ui/tiny.accordion';

interface Data {
  title: string;
  label: string;
  bgColor: string;
  color: string;
  mode: 'simple' | 'full';
  step: { id: string; title: string; summary: string };
  showTarget?: boolean;
  showSource?: boolean;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function StepNode({ data, sourcePosition, targetPosition }: any) {
  const { mode, step } = data as Data;

  const { title, summary } = step;

  return (
    <TinyAccordion
      w={'400px'}
      items={[
        {
          title: { title },
          value: { title },
          titleExtension: <>Step</>,
          content: (
            <>
              {targetPosition && <Handle type="target" position={targetPosition} style={{ top: 16, marginLeft: -4, transform: 'none'}} />}
              {sourcePosition && <Handle type="source" position={sourcePosition} style={{ top: 16, marginRight: -4, transform: 'none'}} />}
              {summary}
            </>
          ),
        },
      ]}
      defaultExpandedValues={[title]}
      collapsible={false}
    />
  );
}
