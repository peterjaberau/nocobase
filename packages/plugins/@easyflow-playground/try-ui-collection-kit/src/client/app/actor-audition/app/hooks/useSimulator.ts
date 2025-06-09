import { useSelector } from '@xstate/react';
import { rootContext } from '../RootContext';
import { useParams } from './useParams';
import { useStories } from './useStories';

export const useSimulator = () => {
  const { stateParams, sendToParams }: any = useParams();
  const { isSelectedStory, selectedStory }: any = useStories();

  const simulatorRef = rootContext.useActorRef().system.get('simulator');
  const simulator: any = useSelector(simulatorRef, (state) => state);

  const isRunning = simulator.matches('running');
  const isDisabled = !selectedStory;
  const attachedStory = selectedStory;


  const sendToSimulator = simulatorRef.send;

  const startSimulator = (id: string) => {
    sendToSimulator({ type: 'START' });
  };

  const stopSimulator = (id: string) => {
    sendToSimulator({ type: 'STOP' });
  };



  return {
    simulator,
    startSimulator,
    stopSimulator,
    isRunning,
    isDisabled,
    attachedStory
  };
}
