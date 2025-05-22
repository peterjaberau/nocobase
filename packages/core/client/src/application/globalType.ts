

import { ISchema as FormilySchema } from '@formily/json-schema';

export interface ISchema extends FormilySchema {
  'x-use-component-props'?: string | Function;
  'x-use-decorator-props'?: string;
}
