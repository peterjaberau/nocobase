import { Plugin } from '@easyflow/client';
import AuthPlugin from '@easyflow/plugin-auth/client';
import { authType } from '../constants';
import { OIDCButton } from './OIDCButton';
import { Options } from './Options';

export class PluginOIDCClient extends Plugin {
  async load() {
    const auth = this.app.pm.get(AuthPlugin);
    auth.registerType(authType, {
      components: {
        SignInButton: OIDCButton,
        AdminSettingsForm: Options,
      },
    });
  }
}

export default PluginOIDCClient;
