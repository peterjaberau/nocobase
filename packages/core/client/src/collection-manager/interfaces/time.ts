

import { CollectionFieldInterface } from '../../data-source/collection-field-interface/CollectionFieldInterface';
import { defaultProps, operators, timeProps } from './properties';

export class TimeFieldInterface extends CollectionFieldInterface {
  name = 'time';
  type = 'object';
  group = 'datetime';
  order = 4;
  title = '{{t("Time")}}';
  sortable = true;
  default = {
    type: 'time',
    uiSchema: {
      type: 'string',
      'x-component': 'TimePicker',
    },
  };
  availableTypes = ['time'];
  hasDefaultValue = true;
  properties = {
    ...defaultProps,
    ...timeProps,
  };
  filterable = {
    operators: operators.time,
  };
  titleUsable = true;
}
