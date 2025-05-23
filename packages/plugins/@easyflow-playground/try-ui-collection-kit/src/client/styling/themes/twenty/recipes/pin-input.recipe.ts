import { pinInputAnatomy } from '@ark-ui/react'
import { defineSlotRecipe } from '@chakra-ui/react'

import { mapEntries } from '../../../utils'
import { inputRecipe } from './input.recipe'

const { variants, defaultVariants } = inputRecipe

export const pinInputSlotRecipe = defineSlotRecipe({
  className: 'chakra-pin-input',
  slots: pinInputAnatomy.keys(),
  base: {
    input: {
      ...inputRecipe.base,
      textAlign: 'center',
      width: 'var(--input-height)',
    },
  },
  variants: {
    size: mapEntries(variants!.size, (key, value) => [
      key,
      {
        input: {
          ...value,
          px: 0,
        },
      },
    ]),
    variant: mapEntries(variants!.variant, (key, value) => [
      key,
      { input: value },
    ]),
  },
  defaultVariants: defaultVariants,
})
