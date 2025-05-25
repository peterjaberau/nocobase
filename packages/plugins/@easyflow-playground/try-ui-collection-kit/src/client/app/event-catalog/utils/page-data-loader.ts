import { getChannels } from './channels';
import { getDomains } from './domains';
import { getCommands, getEvents } from './messages';
import { getQueries } from './queries';
import { getServices } from './services';
import { getFlows } from './flows';
import { getEntities } from './entities';

export const pageDataLoader: Record<any, () => Promise<any[]>> = {
  events: getEvents,
  commands: getCommands,
  queries: getQueries,
  services: getServices,
  domains: getDomains,
  channels: getChannels,
  flows: getFlows,
  entities: getEntities,
};
