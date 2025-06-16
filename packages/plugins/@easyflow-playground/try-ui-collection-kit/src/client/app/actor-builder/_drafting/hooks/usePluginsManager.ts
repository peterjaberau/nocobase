import { useSelector } from '@xstate/react';
import { DraftContext } from '../draft.provider';

export function usePluginsManager() {
  const pluginsManagerActorRef = DraftContext.useActorRef().system.get('plugins-manager');
  const pluginsManagerState: any = useSelector(pluginsManagerActorRef, (state) => state);
  const sendToPluginsManager = pluginsManagerActorRef.send;
  // const pluginsMetaList = pluginsManagerState.context.metaList;
  const pluginsMetaList = Array.from(pluginsManagerState.context.metaList.entries());

  const isPluginEnabled = (pluginId) => {
    const meta = pluginsManagerState.context.metaList.get(pluginId);
    return meta.config.enabled;
  }


  return { pluginsManagerActorRef, pluginsManagerState, sendToPluginsManager, pluginsMetaList };

}
