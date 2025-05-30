import { SchemaSettings } from "@easyflow/client";
import { ActionNameLowercase } from "../constants";

export const documentActionSettings = new SchemaSettings({
  name: `actionSettings:${ActionNameLowercase}`,
  items: [
    {
      name: 'remove',
      type: 'remove',
    }
  ]
});
