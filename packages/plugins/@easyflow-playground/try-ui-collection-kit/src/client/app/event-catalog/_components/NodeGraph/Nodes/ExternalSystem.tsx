import React from 'react';
import { ServerIcon } from '@heroicons/react/16/solid';
import { GlobeAmericasIcon } from '@heroicons/react/20/solid';
import { Handle } from '@xyflow/react';
import { TinyAccordion } from '../../../ui/tiny.accordion';
import { List, chakra } from '@chakra-ui/react';
import { LuCircleCheck } from 'react-icons/lu';
import { SimpleGrid } from '@chakra-ui/react';

interface Data {
  label: string;
  bgColor: string;
  color: string;
  mode: 'simple' | 'full';
  step: {
    id: string;
    title: string;
    summary: string;
    externalSystem: { name: string; summary?: string; url?: string };
  };
  showTarget?: boolean;
  showSource?: boolean;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function ExternalSystemNode({ data, sourcePosition, targetPosition }: any) {
  const { mode, step } = data as Data;
  const { externalSystem } = step;
  const { name, summary, url } = externalSystem;

  return (
    <TinyAccordion
      w={'400px'}
      items={[
        {
          title: { name },
          value: { name },
          titleExtension: <>External</>,
          content: (
            <>
              {targetPosition && <Handle type="target" position={targetPosition} style={{ top: 16, marginLeft: -4, transform: 'none'}} />}
              {sourcePosition && <Handle type="source" position={sourcePosition} style={{ top: 16, marginRight: -4, transform: 'none'}} />}
              {summary}
              {mode === 'full' && (
                <List.Root variant="plain" mb={0}>
                  <SimpleGrid columns={2} gap={2}>
                    <List.Item>
                      <List.Indicator asChild>
                        <LuCircleCheck />
                      </List.Indicator>
                      External System
                    </List.Item>
                    <List.Item>
                      <List.Indicator asChild>
                        <LuCircleCheck />
                      </List.Indicator>
                      URL:
                      <chakra.a href={url} target="_blank">
                        {url}
                      </chakra.a>
                    </List.Item>
                  </SimpleGrid>
                </List.Root>
              )}
            </>
          ),
        },
      ]}
      defaultExpandedValues={[name]}
      collapsible={false}
    />
  );
}
