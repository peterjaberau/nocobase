import { getCollection } from './database';
import path from 'path';
import { getVersionForCollectionItem, satisfies } from './collections';
import { getMessages } from './messages';

const PROJECT_DIR = process.env.PROJECT_DIR || process.cwd();

interface Props {
  getAllVersions?: boolean;
}

// cache for build time
let cachedChannels: Record<string, any[]> = {
  allVersions: [],
  currentVersions: [],
};

export const getChannels = async ({ getAllVersions = true }: Props = {}): Promise<any[]> => {
  const cacheKey = getAllVersions ? 'allVersions' : 'currentVersions';

  if (cachedChannels[cacheKey].length > 0) {
    return cachedChannels[cacheKey];
  }

  const allChannels = await getCollection('channels');
  const channels = allChannels.filter((channel) => {
    return (getAllVersions || !channel.filePath?.includes('versioned')) && channel.data.hidden !== true;
  });

  const { commands, events, queries } = await getMessages();
  const allMessages = [...commands, ...events, ...queries];

  cachedChannels[cacheKey] = channels.map((channel) => {
    const { latestVersion, versions } = getVersionForCollectionItem(channel, channels);

    const messagesForChannel = allMessages.filter((message) => {
      return message.data.channels?.some((messageChannel) => {
        if (messageChannel.id != channel.data.id) return false;
        if (messageChannel.version == 'latest' || messageChannel.version == undefined)
          return channel.data.version == latestVersion;
        return satisfies(channel.data.version, messageChannel.version);
      });
    });

    const messages = messagesForChannel.map((message: any) => {
      return {
        id: message.data.id,
        name: message.data.name,
        version: message.data.version,
        collection: message.collection,
      };
    });

    return {
      ...channel,
      data: {
        ...channel.data,
        versions,
        latestVersion,
        messages,
      },
      catalog: {
        path: path.join(channel.collection, channel.id.replace('/index.mdx', '')),
        absoluteFilePath: path.join(PROJECT_DIR, channel.collection, channel.id.replace('/index.mdx', '/index.md')),
        astroContentFilePath: path.join(process.cwd(), 'src', 'content', channel.collection, channel.id),
        filePath: path.join(
          process.cwd(),
          'src',
          'catalog-files',
          channel.collection,
          channel.id.replace('/index.mdx', ''),
        ),
        publicPath: path.join('/generated', channel.collection, channel.id.replace(`-${channel.data.version}`, '')),
        type: 'event',
      },
    };
  });

  // order them by the name of the channel
  cachedChannels[cacheKey].sort((a, b) => {
    return (a.data.name || a.data.id).localeCompare(b.data.name || b.data.id);
  });

  return cachedChannels[cacheKey];
};
