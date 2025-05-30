

import { Cache } from '@easyflow/cache';
import { Database } from '@easyflow/database';
import { Action } from '@easyflow/resourcer';
import Koa from 'koa';
import lodash from 'lodash';
import * as actions from './actions';

export * as utils from './utils';

export * from './constants';

export type Next = () => Promise<any>;

export interface Context extends Koa.Context {
  db: Database;
  cache: Cache;
  action: Action;
  body: any;
  app: any;

  [key: string]: any;
}

/**
 * @internal
 */
export function registerActions(api: any) {
  api.actions(
    lodash.pick(actions, [
      'add',
      'create',
      'destroy',
      'get',
      'list',
      'remove',
      'set',
      'toggle',
      'update',
      'move',
      'firstOrCreate',
      'updateOrCreate',
    ]),
  );
}

export default actions;
