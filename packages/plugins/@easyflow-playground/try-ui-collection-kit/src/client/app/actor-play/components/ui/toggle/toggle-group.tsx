import React from 'react';
import type { Assign } from "@ark-ui/react"
import { ToggleGroup as ArkToggleGroup } from '@ark-ui/react';
import { toggleGroupAnatomy } from '@ark-ui/react';
import { defineSlotRecipe, createSlotRecipeContext } from '@chakra-ui/react';

export const toggleGroupSlotRecipe = defineSlotRecipe({
  className: 'toggleGroup',
  slots: toggleGroupAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      overflow: 'hidden',
      position: 'relative',
      _vertical: {
        flexDirection: 'column',
      },
    },
    item: {
      alignItems: 'center',
      appearance: 'none',
      cursor: 'pointer',
      color: 'fg.subtle',
      display: 'inline-flex',
      fontWeight: 'semibold',
      minWidth: '0',
      justifyContent: 'center',
      outline: 'none',
      position: 'relative',
      transitionDuration: 'normal',
      transitionProperty: 'background, border-color, color, box-shadow',
      transitionTimingFunction: 'default',
      userSelect: 'none',
      verticalAlign: 'middle',
      whiteSpace: 'nowrap',
      // @ts-ignore
      _on: {
        background: 'gray.400',
        color: 'fg',
        _hover: {
          background: 'gray.400',
        },
      },
      _hover: {
        background: 'gray.200',
      },
      _disabled: {
        borderColor: 'border.disabled',
        color: 'fg.disabled',
        cursor: 'not-allowed',
        _hover: {
          background: 'transparent',
          borderColor: 'border.disabled',
          color: 'fg.disabled',
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
  variants: {
    variant: {
      outline: {
        root: {
          borderWidth: '1px',
          borderRadius: 'sm',
          borderColor: 'border.border',
          _horizontal: {
            divideX: '1px',
          },
          _vertical: {
            divideY: '1px',
          },
        },
        item: {
          borderColor: 'border.border',
          _focusVisible: {
            color: 'fg',
            background: 'gray.400',
          },
        },
      },
      ghost: {
        root: {
          gap: '1',
        },
        item: {
          borderRadius: 'sm',
          _focusVisible: {
            outlineOffset: '2px',
            outline: '2px solid',
            outlineColor: 'border.outline',
          },
        },
      },
    },
    size: {
      sm: {
        item: {
          h: '9',
          minW: '9',
          textStyle: 'sm',
          gap: '2',
          '& svg': {
            width: '4.5',
            height: '4.5',
          },
        },
      },
      md: {
        item: {
          h: '10',
          minW: '10',
          textStyle: 'sm',
          gap: '2',
          '& svg': {
            width: '5',
            height: '5',
          },
        },
      },
      lg: {
        item: {
          h: '11',
          minW: '11',
          textStyle: 'md',
          gap: '2',
          '& svg': {
            width: '5',
            height: '5',
          },
        },
      },
    },
  },
});

const { withProvider, withContext, PropsProvider: ArkPropsProvider } = createSlotRecipeContext({
  recipe: toggleGroupSlotRecipe,
});

export const RootProvider: any =
  withProvider(ArkToggleGroup.RootProvider, 'root', { forwardAsChild: true });

export const Root: any =
  withProvider(ArkToggleGroup.Root, 'root', { forwardAsChild: true });

export const PropsProvider: any =
  ArkPropsProvider as React.Provider<ArkToggleGroup.RootBaseProps>

export const Item: any =
  withContext(ArkToggleGroup.Item, 'item', { forwardAsChild: true });

export const Context: any = ArkToggleGroup.Context;

