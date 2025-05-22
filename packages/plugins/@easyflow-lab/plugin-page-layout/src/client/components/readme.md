# Command Bar Integration with XState and React Context

## Overview

This document explains how to integrate an XState machine with React context to manage the state of a command bar. It covers the following steps:

1. Define the XState machine.
2. Create a React context.
3. Provide the machine via context.
4. Consume the context in components.
5. Dynamically add commands to the command bar.

## Step-by-Step Breakdown

### 1. Define the XState Machine

The `commandBarMachine` is defined in `commandBarMachine.ts`. This machine manages the state transitions and actions for the command bar.

```typescript
// src/machines/commandBarMachine.ts

import { createMachine, assign } from 'xstate';

export const commandBarMachine = createMachine({
  id: 'Command Bar',
  initial: 'Closed',
  context: {
    selectedCommand: null,
    currentArgument: null,
    commands: [],
  },
  states: {
    Closed: {
      on: {
        Open: 'Selecting command',
      },
    },
    'Selecting command': {
      on: {
        Select: {
          target: 'Gathering arguments',
          actions: assign({
            selectedCommand: (_, event) => event.command,
          }),
        },
      },
    },
    'Gathering arguments': {
      on: {
        'Edit argument': {
          actions: assign({
            currentArgument: (_, event) => event.data.arg,
          }),
        },
        'Deselect command': 'Selecting command',
      },
    },
    Review: {
      on: {
        'Change current argument': {
          actions: assign({
            currentArgument: (_, event) => event.data.arg,
          }),
        },
        'Deselect command': 'Selecting command',
      },
    },
  },
  on: {
    'Add command': {
      actions: assign({
        commands: (context, event) => [...context.commands, event.command],
      }),
    },
  },
});




```



### 2. Create a React context

```typescript
// src/machines/CommandBarContext.ts

import { createActorContext } from '@xstate/react';
import { commandBarMachine } from 'machines/commandBarMachine';

export const CommandsContext = createActorContext(
  commandBarMachine.provide({
    guards: {
      'Command has no arguments': ({ context }) => {
        return !context.selectedCommand?.args || Object.keys(context.selectedCommand?.args).length === 0;
      },
      'All arguments are skippable': ({ context }) => {
        return Object.values(context.selectedCommand!.args!).every((argConfig) => argConfig.skip);
      },
    },
  }),
);


```




### 3. Provide the machine via context

```typescript
// src/machines/CommandBarProvider.ts

// src/components/CommandBar/CommandBarProvider.tsx
import { createActorContext } from '@xstate/react';
import { editorManager } from 'lib/singletons';
import { commandBarMachine } from 'machines/commandBarMachine';
import { useEffect } from 'react';

export const CommandsContext = createActorContext(
  commandBarMachine.provide({
    guards: {
      'Command has no arguments': ({ context }) => {
        return !context.selectedCommand?.args || Object.keys(context.selectedCommand?.args).length === 0;
      },
      'All arguments are skippable': ({ context }) => {
        return Object.values(context.selectedCommand!.args!).every((argConfig) => argConfig.skip);
      },
    },
  }),
);

export const CommandBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <CommandsContext.Provider>
      <CommandBarProviderInner>{children}</CommandBarProviderInner>
    </CommandsContext.Provider>
  );
};

function CommandBarProviderInner({ children }: { children: React.ReactNode }) {
  const commandBarActor = CommandsContext.useActorRef();

  useEffect(() => {
    editorManager.setCommandBarSend(commandBarActor.send);
  });

  const addCommand = (command) => {
    commandBarActor.send({ type: 'Add command', command });
  };

  return <CommandsContext.Provider value={{ addCommand }}>{children}</CommandsContext.Provider>;
}




```


### 4. Consume the context in components

```typescript
// src/machines/CommandBar.ts

import React, { useEffect, Fragment } from 'react';
import { useCommandsContext } from 'context/CommandBarContext';
import { useHotkeyWrapper } from 'hooks/useHotkeyWrapper';
import { Transition } from '@headlessui/react';
import Popover from 'components/Popover';
import Dialog from 'components/Dialog';
import CommandComboBox from 'components/CommandComboBox';
import CommandBarArgument from 'components/CommandBarArgument';
import CommandBarReview from 'components/CommandBarReview';
import CustomIcon from 'components/CustomIcon';
import Tooltip from 'components/Tooltip';

const CommandBar = () => {
  const { commandBarState, commandBarSend } = useCommandsContext();
  const {
    context: { selectedCommand, currentArgument, commands },
  } = commandBarState;
  const isSelectionArgument = currentArgument?.inputType === 'selection';
  const WrapperComponent = isSelectionArgument ? Popover : Dialog;

  useEffect(() => {
    commandBarSend({ type: 'Close' });
  }, [pathname]);

  useHotkeyWrapper([COMMAND_PALETTE_HOTKEY], () => {
    if (commandBarState.context.commands.length === 0) return;
    if (commandBarState.matches('Closed')) {
      commandBarSend({ type: 'Open' });
    } else {
      commandBarSend({ type: 'Close' });
    }
  });

  function stepBack() {
    if (!currentArgument) {
      if (commandBarState.matches('Review')) {
        const entries = Object.entries(selectedCommand?.args || {}).filter(([_, argConfig]) =>
          typeof argConfig.required === 'function' ? argConfig.required(commandBarState.context) : argConfig.required,
        );

        const currentArgName = entries[entries.length - 1][0];
        const currentArg = {
          name: currentArgName,
          ...entries[entries.length - 1][1],
        };

        commandBarSend({
          type: 'Edit argument',
          data: {
            arg: currentArg,
          },
        });
      } else {
        commandBarSend({ type: 'Deselect command' });
      }
    } else {
      const entries = Object.entries(selectedCommand?.args || {});
      const index = entries.findIndex(([key, _]) => key === currentArgument.name);

      if (index === 0) {
        commandBarSend({ type: 'Deselect command' });
      } else {
        commandBarSend({
          type: 'Change current argument',
          data: {
            arg: { name: entries[index - 1][0], ...entries[index - 1][1] },
          },
        });
      }
    }
  }

  return (
    <Transition.Root
      show={!commandBarState.matches('Closed') || false}
  afterLeave={() => {
    if (selectedCommand?.onCancel) selectedCommand.onCancel();
    commandBarSend({ type: 'Clear' });
  }}
  as={Fragment}
  >
  <WrapperComponent
    open={!commandBarState.matches('Closed') || isSelectionArgument}
  onClose={() => {
    commandBarSend({ type: 'Close' });
  }}
  className={'fixed inset-0 z-50 overflow-y-auto pb-4 pt-1 ' + (isSelectionArgument ? 'pointer-events-none' : '')}
  >
  <Transition.Child
    enter="duration-100 ease-out"
  enterFrom="opacity-0 scale-95"
  enterTo="opacity-100 scale-100"
  leave="duration-75 ease-in"
  leaveFrom="opacity-100 scale-100"
  leaveTo="opacity-0 scale-95"
  >
  <WrapperComponent.Panel
    className="relative z-50 pointer-events-auto w-full max-w-xl py-2 mx-auto border rounded rounded-tl-none shadow-lg bg-chalkboard-10 dark:bg-chalkboard-100 dark:border-chalkboard-70"
  as="div"
  data-testid="command-bar"
    >
    {commandBarState.matches('Selecting command') ? (
        <CommandComboBox options={commands} />
) : commandBarState.matches('Gathering arguments') ? (
    <CommandBarArgument stepBack={stepBack} />
) : (
    commandBarState.matches('Review') && <CommandBarReview stepBack={stepBack} />
)}
  <button
    onClick={() => commandBarSend({ type: 'Close' })}
  className="group block !absolute left-auto right-full top-[-3px] m-2.5 p-0 border-none bg-transparent hover:bg-transparent"
  >
  <CustomIcon
    name="close"
  className="w-5 h-5 rounded-sm bg-destroy-10 text-destroy-80 dark:bg-destroy-80 dark:text-destroy-10 group-hover:brightness-110"
  />
  <Tooltip position="bottom" delay={500}>
    Cancel <kbd className="hotkey ml-4 dark:!bg-chalkboard-80">esc</kbd>
    </Tooltip>
    </button>
    </WrapperComponent.Panel>
    </Transition.Child>
    </WrapperComponent>
    </Transition.Root>
);
};

export default CommandBar;


```


### 5. Usages

```typescript
// src/machines/SomeComponent.ts

import React from 'react'
import { useCommandsContext } from 'context/CommandBarContext'

const SomeComponent = () => {
  const { addCommand } = useCommandsContext()

  const newCommand = {
    name: 'New Command',
    args: {},
    execute: () => {
      console.log('Executing new command')
    },
  }

  return (
    <button onClick={() => addCommand(newCommand)}>
  Add New Command
  </button>
)
}

export default SomeComponent

```
