import { createMachine, assign, fromPromise, createActor } from 'xstate';
import { initialCards } from './config';

export type CardData = {
  id: string;
  title: string;
  content: string;
  children?: CardData[];
};

export type CardContext = {
  cards: CardData[];
  childActors: Map<string, any>;
};

type CardMachineContext = {
  isExpanded: boolean;
  isEditing: boolean;
  data: CardData;
  editData: {
    title: string;
    content: string;
  } | null;
  childCards: CardData[];
  childActors: Map<string, any>;
  [key: string]: any;
};

export const createCardMachine = (id: string) =>
  createMachine(
    {
      id,
      context: ({ input }: any) => ({
        isExpanded: false,
        isEditing: false,
        data: input.data,
        editData: null,
        childCards: input.data.children || [],
        childActors: new Map(),
      }) as CardMachineContext,
      initial: 'idle',
      states: {
        idle: {
          entry: assign({
            childActors: ({ context }: any) => {
              const actors = new Map();
              context.childCards.forEach((card) => {
                const cardMachine = createCardMachine(card.id);
                const actor = createActor(cardMachine, { input: { data: card } });
                actor.start();
                actors.set(card.id, actor);
              });
              return actors;
            },
          }),
          on: {
            TOGGLE_EXPAND: {
              actions: 'toggleExpand',
            },
            EDIT: {
              target: 'editing',
              actions: 'initializeEditData',
            },
            ADD_CHILD: {
              actions: [
                assign({
                  childCards: ({ context }: any) => {
                    const newCard = {
                      id: `${context.data.id}-child-${Date.now()}`,
                      title: 'New Child Card',
                      content: 'Edit this child card',
                      children: [],
                    };
                    return [...context.childCards, newCard];
                  },
                }),
                assign({
                  childActors: ({ context }: any) => {
                    const newCard = {
                      id: `${context.data.id}-child-${Date.now()}`,
                      title: 'New Child Card',
                      content: 'Edit this child card',
                      children: [],
                    };
                    const newActors = new Map(context.childActors);
                    const cardMachine = createCardMachine(newCard.id);
                    const actor = createActor(cardMachine, { input: { data: newCard } });
                    actor.start();
                    newActors.set(newCard.id, actor);
                    return newActors;
                  },
                }),
              ],
            },
          },
        },
        editing: {
          on: {
            UPDATE_FIELD: {
              actions: 'updateField',
            },
            SAVE: {
              target: 'idle',
              actions: ['saveData', 'clearEditData'],
            },
            CANCEL: {
              target: 'idle',
              actions: 'clearEditData',
            },
          },
        },
      },
    },
    {
      actions: {
        toggleExpand: assign({
          isExpanded: ({ context }: any) => !context.isExpanded,
        }),
        initializeEditData: assign({
          editData: ({ context }: any) => ({
            title: context.data.title,
            content: context.data.content,
          }),
          isEditing: () => true,
        }),
        updateField: assign({
          editData: ({ context, event }: any) => ({
            ...context.editData!,
            [event.field]: event.value,
          }),
        }),
        saveData: assign({
          data: ({ context }: any) => ({
            ...context.data,
            title: context.editData?.title || context.data.title,
            content: context.editData?.content || context.data.content,
          }),
          isEditing: () => false,
        }),
        clearEditData: assign({
          editData: () => null,
          isEditing: () => false,
        }),
      },
    },
  );

export const parentCardMachine = createMachine({
  id: 'parentCard',
  context: {
    cards: initialCards,
    childActors: new Map(),
  } as CardContext,
  initial: 'active',
  states: {
    active: {
      entry: assign({
        childActors: ({ context }) => {
          const actors = new Map();
          context.cards.forEach((card) => {
            const cardMachine = createCardMachine(card.id);
            const actor = createActor(cardMachine, { input: { data: card } });
            actor.start();
            actors.set(card.id, actor);
          });
          return actors;
        },
      }),
      on: {
        ADD_CARD: {
          actions: [
            assign({
              cards: ({ context, event }) => [...context.cards, event.card],
            }),
            assign({
              childActors: ({ context, event }) => {
                const newActors = new Map(context.childActors);
                const cardMachine = createCardMachine(event.card.id);
                const actor = createActor(cardMachine, { input: { data: event.card } });
                actor.start();
                newActors.set(event.card.id, actor);
                return newActors;
              },
            }),
          ],
        },
        REMOVE_CARD: {
          actions: [
            assign({
              cards: ({ context, event }) =>
                context.cards.filter((card) => card.id !== event.id),
            }),
            assign({
              childActors: ({ context, event }) => {
                const newActors = new Map(context.childActors);
                const actor = newActors.get(event.id);
                if (actor) {
                  actor.stop();
                  newActors.delete(event.id);
                }
                return newActors;
              },
            }),
          ],
        },
      },
    },
  },
});
