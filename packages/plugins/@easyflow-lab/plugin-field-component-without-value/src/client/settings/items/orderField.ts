/**
 * This file is part of the easyflow (R) project.
 * Copyright (c) 2020-2024 easyflow Co., Ltd.
 * Authors: easyflow Team.
 *
 * This project is dual-licensed under AGPL-3.0 and easyflow Commercial License.
 * For more information, please refer to: https://www.easyflow.com/agreement.
 */

import { createSelectSchemaSettingsItem } from "@easyflow/client";
import { tStr } from "../../locale";
import { useFieldOptions } from '../../initializer'

export const orderFieldSchemaSettingsItem = createSelectSchemaSettingsItem({
  name: 'orderField',
  title: tStr('Order field'),
  useOptions: useFieldOptions,
  schemaKey: `x-component-props.orderField`,
});
