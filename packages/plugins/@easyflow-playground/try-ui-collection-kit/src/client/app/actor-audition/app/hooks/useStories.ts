import { useSelector } from '@xstate/react';
import { rootContext } from '../RootContext';
import { useParams } from './useParams';

export const useStories = () => {
  const { stateParams, sendToParams }: any = useParams();
  const storiesRef = rootContext.useActorRef().system.get('stories');
  const stories: any = useSelector(storiesRef, (state) => state);

  const isSelectedStory = (id: string) => stateParams.context?.story === id;
  const selectedStory = stories.context.find((story) => story.id === stateParams.context?.story);

  const changeStory = (id: string) => {
    sendToParams({ type: 'STORY_CHANGE', story: id });
  };

  return {
    stories,
    isSelectedStory,
    selectedStory,
    changeStory,
  };
}
