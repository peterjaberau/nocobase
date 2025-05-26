import React, { useState } from 'react';
import { Collapsible, Flex, Box, Stack, HStack, For, Container, useCollapsible, Button } from '@chakra-ui/react';
import { Accordion, useAccordion } from '@chakra-ui/react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';



interface ItemProps {
  title?: any;
  value?: any;
  content?: any;
  titleExtension?: any;
  [key: string]: any;

}


export interface TinyAccordionProps {
  items: ItemProps[];
  defaultExpandedValues?: string[];
  type?: 'default' | 'muted' | 'selected';
  [key: string]: any;
}


export const RootProvider = (props: TinyAccordionProps) => {
  const { items = [], defaultExpandedValues = [], type='default', collapsible, ...rest } = props;

  const [value, setValue] = useState(defaultExpandedValues);

  const accordion = useAccordion({
    multiple: true,
    collapsible: collapsible,
    value,
    onValueChange: (e) => setValue(e.value),
  });

  return (
    <>
      <Accordion.RootProvider value={accordion}  {...rest}>
          <Stack gap={4}>
            <For each={items}>
              {
                (item: any, index: any) => (
                  <Accordion.Item
                    gap={4}
                    key={index}
                    value={item.value}
                    borderRadius={'lg'}
                    shadow={'sm'}
                    backgroundColor={'bg.panel'}
                  >
                    <Accordion.ItemTrigger
                      backgroundColor={accordion.value.includes(item.value) ? 'bg.emphasized' : undefined}
                      borderBottomRadius={accordion.value.includes(item.value) ? 'none' : undefined}
                      px={4}
                    >
                      <HStack justify={'space-between'} w={'full'}>
                        <HStack justify={'flex-start'} flex={1}><Box css={{ textWrap: 'nowrap' }}>{item.title}</Box></HStack>
                        <HStack justify={'flex-end'} flex={1}>
                          <>
                            {item.titleExtension && (<Box css={{ textWrap: 'nowrap' }}>{item.titleExtension}</Box>)}

                          </>
                          <Accordion.ItemIndicator>
                            <ChevronDownIcon />
                          </Accordion.ItemIndicator>
                        </HStack>
                      </HStack>
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent
                    >
                      <Accordion.ItemBody px={4}>
                        {item.content}
                      </Accordion.ItemBody>
                    </Accordion.ItemContent>
                  </Accordion.Item>
                )
              }
            </For>
          </Stack>
      </Accordion.RootProvider>
    </>
  );
};

export const TinyAccordion = RootProvider;
