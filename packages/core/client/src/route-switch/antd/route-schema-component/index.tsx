

import React from 'react';
import { RemoteSchemaComponent, useCurrentPageUid } from '../../../';

export function RouteSchemaComponent() {
  const currentPageUid = useCurrentPageUid();
  return <RemoteSchemaComponent onlyRenderProperties uid={currentPageUid} />;
}
