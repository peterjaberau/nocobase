import { Plugin } from '@easyflow/client';
import AuthPlugin from '@easyflow/plugin-auth/client';
import { authType } from '../constants';
import { Options } from './Options';
import { AnonymousButton } from './AnonymousButton';

export class PluginAuthAnonymousClient extends Plugin {
  async load() {
    const auth = this.app.pm.get(AuthPlugin);
    auth.registerType(authType, {
      components: {
        SignInButton: AnonymousButton,
        AdminSettingsForm: Options,
      },
    });
  }
}

export default PluginAuthAnonymousClient;
