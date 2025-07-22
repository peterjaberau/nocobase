// import { createBrowserInspector } from '@statelyai/inspect';
import { createActorContext } from '@xstate/react';
import { AnyMachineSnapshot, assign, createMachine, fromCallback, fromPromise } from 'xstate';
import { config } from './definitions';
import template from 'lodash/template';


const actions = {
  updateDefinitions: assign(({ context, event }) => {
    console.log('updateDefinitions - events--', event);
    console.log('updateDefinitions - context--', context);

    const changes = {
      ...context,
      definitions: event.output,
    };
    console.log('updateDefinitions', changes);

    return changes;
  }),
  selectConfig: assign(({ context, event }) => {
    console.log('context', context);
    // const selected = context.definitions[event['key']];
    const selected = context.definitions['button'];

    return {
      ...context,
      selectedDefinitionId: selected.key,
      selectedDefinition: selected,
    };
  }),
  updateConfig: assign(({ event }) => {
    console.log('updateConfig', event);
  }),
  resetConfig: assign(({ event }) => {
    console.log('resetConfig', event);
  }),
} as any;

const actors = {
  fetchDefinitions: fromPromise(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return config;
  }),
};

export const configMachineLogic = {
  id: 'config-machine',
  initial: 'idle',
  context: {
    selectedDefinitionId: 'button',
    currentValue: undefined,
    selectedDefinition: undefined,
    definitions: undefined,
  },

  states: {
    idle: {
      always: {
        target: 'loading',
      },
    },
    ready: {
      on: {
        SELECT_CONFIG: {
          actions: 'selectConfig',
          target: 'ready',
        },
        UPDATE_CONFIG: {
          actions: 'updateConfig',
          target: 'ready',
        },
        RESET_CONFIG: {
          actions: 'resetConfig',
          target: 'ready',
        },
      },
    },
    loading: {
      invoke: {
        src: 'fetchDefinitions',
        onDone: {
          target: 'complete',
          actions: ['updateDefinitions', 'selectConfig'],
        },
        onError: {
          target: 'ready',
        },
      },
    },
    complete: {
      always: {
        target: 'ready',
      },
    },
  },
} as any;

export const configMachine = (input = {} as any) =>
  createMachine(
    {
      ...configMachineLogic,
      context: ({ input }) => ({
        ...configMachineLogic?.context,
        input,
      }),
    },
    {
      actions,
      actors,
    },
  );

// const inspector = createBrowserInspector();
// export const ConfigActor = createActorContext(configMachine(), { inspect: inspector.inspect });

export const ConfigActor = createActorContext(configMachine());

export const ConfigActorProvider = ({ children }: { children: React.ReactNode }) => {
  return <ConfigActor.Provider>{children}</ConfigActor.Provider>;
};

export const useConfigActor = () => {
  const actor = ConfigActor.useActorRef();
  const state = ConfigActor.useSelector((state: any) => state);

  // selectedDefinitionId: 'button',
  //   currentValue: null,
  //   selectedDefinition: null,
  //   definitions: null,

  const model = {
    key: 'content',
    schema: () => state.context.selectedDefinition.schema.config,
    codeEmitter: (config) => {
      return {
        icon: config.content.text,
        children: config.content.text,
      };
    },
  } as any;

  // const codeTemplate: (params: any) => string = template(state.context.code.props.default);

  return {
    actor: actor,
    send: actor.send,
    state: state,
    isIdle: state.matches('idle'),
    isReady: state.matches('ready'),
    hasSelected: !!state.context.selectedDefinition, // not null and not undefined
    isBusy: !state.matches('ready') && !state.matches('idle'),
    nextEvents: getNextEvents(state),
    currentValue: state.context.currentValue,
    definition: state.context.selectedDefinition,
    definitions: state.context.definitions,
    model: model,
    defaultConfig: state.context.selectedDefinition?.defaultConfig?.props ?? {},
    codeTemplate: function (params: any): string {
      return template(state.context.code.props.default)(params);
    },
  };
};

function getNextEvents(snapshot: AnyMachineSnapshot) {
  return [...new Set([...snapshot._nodes.flatMap((sn) => sn.ownEvents)])];
}

