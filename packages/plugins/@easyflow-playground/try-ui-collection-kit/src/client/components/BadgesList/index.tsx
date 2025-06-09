import React from "react"
import { Badge, Wrap } from '@chakra-ui/react'

type BadgesListProps = {
  badges: any[]
  className?: string
}

export const BadgesList = ({ badges, className }: BadgesListProps) => {
  return (
    <Wrap gap={1}>
      {badges.map((badgeProps, index) => (
        <Badge {...badgeProps} key={index} />
      ))}
    </Wrap>
  )
}
