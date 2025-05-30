

import { CollectionFieldInterface } from '../../data-source/collection-field-interface/CollectionFieldInterface';
import { dateTimeProps, defaultProps, operators } from './properties';

export class UpdatedAtFieldInterface extends CollectionFieldInterface {
  name = 'updatedAt';
  type = 'object';
  group = 'systemInfo';
  order = 2;
  title = '{{t("Last updated at")}}';
  sortable = true;
  default = {
    type: 'date',
    field: 'updatedAt',
    uiSchema: {
      type: 'datetime',
      title: '{{t("Last updated at")}}',
      'x-component': 'DatePicker',
      'x-component-props': {},
      'x-read-pretty': true,
    },
  };
  description = '{{t("Store the last update time of each record")}}';
  availableTypes = [];
  properties = {
    ...defaultProps,
    ...dateTimeProps,
  };
  filterable = {
    operators: operators.datetime,
  };
  titleUsable = true;
}
