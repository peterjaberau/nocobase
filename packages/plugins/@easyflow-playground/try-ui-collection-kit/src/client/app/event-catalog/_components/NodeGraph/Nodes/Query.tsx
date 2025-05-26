import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
// import type { CollectionEntry } from 'astro:content';
import React from 'react';
import { Handle } from '@xyflow/react';
import MessageContextMenu from './MessageContextMenu';
import { List } from '@chakra-ui/react';
import { LuCircleCheck } from 'react-icons/lu';
// import { getIcon } from '@utils/badges';
import { SimpleGrid } from '@chakra-ui/react';
import { TinyAccordion } from '../../../ui/tiny.accordion';
interface Data {
  title: string;
  label: string;
  bgColor: string;
  color: string;
  mode: 'simple' | 'full';
  message: any;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function QueryNode({ data, sourcePosition, targetPosition }: any) {
  const { mode, message } = data as Data;

  const { name, version, summary, owners = [], producers = [], consumers = [], styles } = message.data;
  const { node: { color = 'green', label = 'Query' } = {}, icon = 'MagnifyingGlassIcon' } = styles || {};

  // const Icon = getIcon(icon);
  const nodeLabel = label || message?.data?.sidebar?.badge || 'Query';
  const fontSize = nodeLabel.length > 10 ? '7px' : '9px';
  const renderTarget = true;
  const renderSource = true;

  return (
    <MessageContextMenu message={message} messageType="queries">
      <TinyAccordion
        w={'400px'}
        items={[
          {
            title: `${name} (${version})`,
            value: `${name} (${version})`,
            titleExtension: <>{nodeLabel}</>,
            content: (
              <>

                {renderTarget && <Handle type="target" position={targetPosition} style={{ top: 16, marginLeft: -4, transform: 'none'}} />}
                {renderSource && <Handle type="source" position={sourcePosition} style={{ top: 16, marginRight: -4, transform: 'none'}} />}
                {summary}
                {mode === 'full' && (
                  <List.Root variant="plain" mb={0}>
                    <SimpleGrid columns={2} gap={2}>
                    <List.Item>
                      <List.Indicator asChild>
                        <LuCircleCheck />
                      </List.Indicator>
                      Producers: {producers.length}
                    </List.Item>
                    <List.Item>
                      <List.Indicator asChild>
                        <LuCircleCheck />
                      </List.Indicator>
                      Consumers: {consumers.length}
                    </List.Item>
                    <List.Item>
                      <List.Indicator asChild>
                        <LuCircleCheck />
                      </List.Indicator>
                      Owners: {owners.length}
                    </List.Item>
                      </SimpleGrid>
                  </List.Root>
                )}
              </>
            ),
          },
        ]}
        defaultExpandedValues={[`${name} (${version})`]}
        collapsible={false}
      />
    </MessageContextMenu>
  );
}
