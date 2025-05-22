

import { ACL } from '@easyflow/acl';
import { availableActions } from './available-action';

export function createACL() {
  const acl = new ACL();

  for (const [actionName, actionParams] of Object.entries(availableActions)) {
    acl.setAvailableAction(actionName, actionParams);
  }

  return acl;
}
