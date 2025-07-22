import { Plugin } from '@easyflow/client';
import { StoryBookComponent } from './StoryBook';
import { ContentProvider } from './ContentProvider';
import { StoreProvider } from './StoreProvider';
import { ConfigActorProvider } from './actors/useConfigActor';

export class PluginDesignerClient extends Plugin {
  async load() {
    this.app.addProvider(ContentProvider);
    this.app.addProvider(StoreProvider);
    this.app.addProvider(ConfigActorProvider);

    this.app.router.add('storybook', {
      path: '/storybook',
      Component: StoryBookComponent,
    });
  }
}

export default PluginDesignerClient;
