import { ChatBubbleLeftIcon } from '@heroicons/react/16/solid';
import { Handle } from '@xyflow/react';
import MessageContextMenu from './MessageContextMenu';
import React from 'react';
import { TinyAccordion } from '../../../ui/tiny.accordion';
import { List } from '@chakra-ui/react';
import { LuCircleCheck } from 'react-icons/lu';

interface Data {
  title: string;
  label: string;
  bgColor: string;
  color: string;
  mode: 'simple' | 'full';
  message: any;
  showTarget?: boolean;
  showSource?: boolean;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function CommandNode({ data, sourcePosition, targetPosition }: any) {
  const { mode, message } = data as Data;

  const { id, name, version, summary, owners = [], producers = [], consumers = [], schemaPath, styles } = message.data;
  const { node: { color = 'blue', label = 'Command' } = {}, icon = 'ChatBubbleLeftIcon' } = styles || {};

  // const Icon = getIcon(icon);
  const nodeLabel = label || message?.data?.sidebar?.badge || 'Command';
  const fontSize = nodeLabel.length > 10 ? '7px' : '9px';

  return (
    <MessageContextMenu message={message} messageType="commands">
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
