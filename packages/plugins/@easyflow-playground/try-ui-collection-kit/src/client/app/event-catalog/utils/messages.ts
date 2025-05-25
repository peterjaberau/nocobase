// Exporting getCommands and getEvents directly
import { getCommands } from './commands';
import { getEvents } from './events';
import { getQueries } from './queries';
export { getCommands } from './commands';
export { getEvents } from './events';

interface Props {
  getAllVersions?: boolean;
}

type Messages = {
  commands: any[];
  events: any[];
  queries: any[];
};

// Main function that uses the imported functions
export const getMessages = async ({ getAllVersions = true }: Props = {}): Promise<Messages> => {
  const [commands, events, queries] = await Promise.all([
    getCommands({ getAllVersions }),
    getEvents({ getAllVersions }),
    getQueries({ getAllVersions }),
  ]);

  return {
    commands,
    events,
    queries,
  };
};
