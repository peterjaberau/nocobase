import React from 'react';
import { Splitter as ArkSplitter } from '@ark-ui/react'
import { createSlotRecipeContext } from '@chakra-ui/react';
import { splitterSlotRecipe } from "./recipe"
import './style.css'

const { withProvider, withContext, PropsProvider: ArkPropsProvider } =
  createSlotRecipeContext({ recipe: splitterSlotRecipe });

export const RootProvider: any =
  withProvider(ArkSplitter.RootProvider, 'root', { forwardAsChild: true });

export const Root: any =
  withProvider(ArkSplitter.Root, 'root', { forwardAsChild: true });

export const PropsProvider: any =
  ArkPropsProvider as React.Provider<ArkSplitter.RootBaseProps>

export const Panel: any =
  withContext(ArkSplitter.Panel, 'panel');

export const ResizeTrigger: any =
  withContext(ArkSplitter.ResizeTrigger, 'resizeTrigger');

export const Context: any = ArkSplitter.Context;
