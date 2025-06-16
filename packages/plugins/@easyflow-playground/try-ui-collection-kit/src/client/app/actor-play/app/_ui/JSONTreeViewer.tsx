import React from 'react';
import JsonView from 'react18-json-view'

export const JSONTreeViewer = (props: any) => {
  const { data, shouldExpandNode } = props

  return (
    <JsonView src={data} collapsed={!shouldExpandNode} />
  )

}
