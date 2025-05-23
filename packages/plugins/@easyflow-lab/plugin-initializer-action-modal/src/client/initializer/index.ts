import { SchemaInitializerItemType, useSchemaInitializer } from "@easyflow/client"

import { useT } from "../locale";
import { createDocumentActionModalSchema } from '../schema';
import { ActionName, ActionNameLowercase } from "../constants";

export const createDocumentActionModalInitializerItem = (blockComponent: string): SchemaInitializerItemType => ({
  type: 'item',
  title: ActionName,
  name: ActionNameLowercase,
  useComponentProps() {
    const { insert } = useSchemaInitializer();
    const t = useT();
    return {
      title: t(ActionName),
      onClick: () => {
        insert(createDocumentActionModalSchema(blockComponent));
      },
    };
  },
})
