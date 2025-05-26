import React from 'react';
import { TinyAccordion } from '../../../ui/tiny.accordion';
import { BoltIcon } from '@heroicons/react/16/solid';
// import type { CollectionEntry } from 'astro:content';
import { Handle } from '@xyflow/react';
import { SimpleGrid } from '@chakra-ui/react';
import MessageContextMenu from './MessageContextMenu';
import { For, List } from '@chakra-ui/react';
import { LuCircleCheck } from 'react-icons/lu';
// import { getIcon } from '@utils/badges';
interface Data {
  title: string;
  label: string;
  bgColor: string;
  color: string;
  mode: 'simple' | 'full';
  message: any;
  showTarget?: boolean;
  showSource?: boolean;
  group?: {
    type: string;
    value: string;
  };
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function EventNode({ data, sourcePosition, targetPosition }: any) {
  const { mode, message, group } = data as Data;
  const { name, version, summary, owners = [], producers = [], consumers = [], styles } = message.data;
  const { node: { color = 'orange', label = 'Event' } = {}, icon = 'BoltIcon' } = styles || {};

  // const Icon = getIcon(icon);
  const nodeLabel = label || message?.data?.sidebar?.badge || 'Event';
  const fontSize = nodeLabel.length > 10 ? '7px' : '9px';

  return (
    <>


      <MessageContextMenu message={message} messageType="events">
        <TinyAccordion
          w={'400px'}
          items={[
            {
              title: `${name} (${version})`,
              value: `${name} (${version})`,
              titleExtension: <>{nodeLabel}</>,
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
                        Producers: {producers.length}
                      </List.Item>
                      <List.Item>
                        <List.Indicator asChild>
                          <LuCircleCheck />
                        </List.Indicator>
                        Owners: {owners.length}
                      </List.Item>
                      {group && (
                        <List.Item>
                          <List.Indicator asChild>
                            <LuCircleCheck />
                          </List.Indicator>
                          {group.type}: {group.value}
                        </List.Item>
                      )}
                      </SimpleGrid>
                    </List.Root>
                  )}
                </>
              )
            }
          ]}
          defaultExpandedValues={[`${name} (${version})`]}
        />
      </MessageContextMenu>
    </>
  );
}
