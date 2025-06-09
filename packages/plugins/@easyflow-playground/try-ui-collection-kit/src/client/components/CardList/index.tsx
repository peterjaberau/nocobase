import React from "react"
import { CardUi, CardProps } from "../Card"
import { SimpleGrid } from "@chakra-ui/react"

type CardListProps = {
  items: CardProps[]
  itemsPerRow?: number
  defaultItemsPerRow?: number
}

export const CardList = ({
  items,
  itemsPerRow,
  defaultItemsPerRow,
}: CardListProps) => {
  if (!itemsPerRow) {
    // if length of items is even, set to `2`, else set to `3`
    itemsPerRow =
      items.length === 1
        ? 1
        : defaultItemsPerRow || (items.length % 2 === 0 ? 2 : 3)
  }
  return (
    <SimpleGrid
      columns={itemsPerRow}
      gap={2}
    >
      {items.map((item, key) => (
        <CardUi {...item} key={key} />
      ))}
    </SimpleGrid>
  )
}
