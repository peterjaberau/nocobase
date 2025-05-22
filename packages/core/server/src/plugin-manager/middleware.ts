

import { Context, Next } from '@easyflow/actions';
import { koaMulter as multer } from '@easyflow/utils';

export async function uploadMiddleware(ctx: Context, next: Next) {
  if (ctx.action.resourceName === 'pm' && ['add', 'update'].includes(ctx.action.actionName)) {
    const upload = multer().single('file');
    return upload(ctx, next);
  }
  return next();
}
