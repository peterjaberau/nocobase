import React from 'react';
import { Handle } from '@xyflow/react';
import { TinyAccordion } from '../../../ui/tiny.accordion';
import * as Icons from '@heroicons/react/24/solid';
import type { ComponentType } from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import * as Tooltip from '@radix-ui/react-tooltip';
import { List, chakra } from '@chakra-ui/react';
import { LuCircleCheck } from 'react-icons/lu';
import { SimpleGrid } from '@chakra-ui/react';
type MenuItem = {
  label: string;
  url?: string;
};

interface Data {
  title: string;
  label: string;
  bgColor: string;
  color: string;
  mode: 'simple' | 'full';
  step: { id: string; title: string; summary: string; name: string; actor: { name: string } };
  showTarget?: boolean;
  showSource?: boolean;
  custom: {
    icon?: string;
    type?: string;
    title?: string;
    summary?: string;
    url?: string;
    color?: string;
    properties?: Record<string, string>;
    menu?: MenuItem[];
    height?: number;
  };
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function UserNode({ data, sourcePosition, targetPosition }: any) {
  const { mode, step, custom: customProps } = data as Data;

  const {
    color = 'blue',
    title = 'Custom',
    icon = 'UserIcon',
    type = 'custom',
    summary = '',
    url = '',
    properties = {},
    menu = [],
    height = 5,
  } = customProps;

  const IconComponent: ComponentType<{ className?: string }> | undefined = Icons[icon as keyof typeof Icons];

  const { actor: { name } = {} } = step;

  const isLongType = type && type.length > 10;
  const displayType = isLongType ? `${type.substring(0, 10)}...` : type;

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <TinyAccordion
          w={'400px'}
          items={[
            {
              title: { title },
              value: { title },
              titleExtension: <>{displayType}</>,
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
                          {`Type: ${type}`}
                        </List.Item>
                        <List.Item>
                          <List.Indicator asChild>
                            <LuCircleCheck />
                          </List.Indicator>
                          {`displayType: ${displayType}`}
                        </List.Item>
                        {properties && (
                          <>
                            {Object.entries(properties).map(([key, value]) => (
                              <List.Item key={key}>
                                <List.Indicator asChild>
                                  <LuCircleCheck />
                                </List.Indicator>
                                {key}:{' '}
                                {typeof value === 'string' && value.startsWith('http') ? (
                                  <chakra.a href={value} target="_blank" rel="noopener noreferrer">
                                    {value}
                                  </chakra.a>
                                ) : (
                                  value
                                )}
                              </List.Item>
                            ))}
                          </>
                        )}
                        <List.Item>
                          <List.Indicator asChild>
                            <LuCircleCheck />
                          </List.Indicator>
                          {`displayType: ${displayType}`}
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
      </ContextMenu.Trigger>
      {menu?.length > 0 && (
        <ContextMenu.Portal>
          <ContextMenu.Content className="min-w-[220px] bg-white rounded-md p-1 shadow-md border border-gray-200">
            {menu?.map((item) => {
              return (
                <ContextMenu.Item
                  asChild
                  className="text-sm px-2 py-1.5 outline-none cursor-pointer hover:bg-orange-100 rounded-sm flex items-center"
                >
                  <a href={item.url}>{item.label}</a>
                </ContextMenu.Item>
              );
            })}
          </ContextMenu.Content>
        </ContextMenu.Portal>
      )}
    </ContextMenu.Root>
  );
}
