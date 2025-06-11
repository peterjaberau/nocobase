import { useSelector } from '@xstate/react';
import { playContext } from '../PlayContext';

export const useSmartNode = () => {
  const smartNodeRef = playContext.useActorRef().system.get('smart-node');
  const smartNode: any = useSelector(smartNodeRef, (state) => state);
  const sendToSmartNode = smartNodeRef.send;

  const toolbarPlugins = smartNode.context.config.plugins.filter(
    (plugin) => plugin.scope === 'toolbar' && plugin.enabled
  );

  const footerPlugins = smartNode.context.config.plugins.filter(
    (plugin) => plugin.scope === 'footer' && plugin.enabled
  );

  const smartNodeId = smartNodeRef.id;


  return {
    smartNodeRef,
    smartNodeId,
    smartNode,
    sendToSmartNode,
    toolbarPlugins,
    footerPlugins,
  };
};
