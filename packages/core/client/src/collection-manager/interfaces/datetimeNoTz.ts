

import { CollectionFieldInterface } from '../../data-source/collection-field-interface/CollectionFieldInterface';
import { dateTimeProps, defaultProps, operators } from './properties';

export class DatetimeNoTzFieldInterface extends CollectionFieldInterface {
  name = 'datetimeNoTz';
  type = 'object';
  group = 'datetime';
  order = 2;
  title = '{{t("Datetime (without time zone)")}}';
  sortable = true;
  default = {
    type: 'datetimeNoTz',
    defaultToCurrentTime: false,
    onUpdateToCurrentTime: false,
    timezone: false,
    uiSchema: {
      type: 'string',
      'x-component': 'DatePicker',
      'x-component-props': {
        showTime: false,
        utc: false,
      },
    },
  };
  availableTypes = ['string', 'datetimeNoTz'];
  hasDefaultValue = true;
  properties = {
    ...defaultProps,
    ...dateTimeProps,
    defaultToCurrentTime: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Checkbox',
      'x-content': '{{t("Default value to current server time")}}',
    },
    onUpdateToCurrentTime: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Checkbox',
      'x-content': '{{t("Automatically update timestamp to the current server time on update")}}',
    },
    'uiSchema.x-component-props.gmt': {
      type: 'boolean',
      title: '{{t("GMT")}}',
      'x-hidden': true,
      'x-component': 'Checkbox',
      'x-content': '{{t("Use the same time zone (GMT) for all users")}}',
      'x-decorator': 'FormItem',
      default: false,
    },
  };
  filterable = {
    operators: operators.datetime,
  };
  titleUsable = true;
}
