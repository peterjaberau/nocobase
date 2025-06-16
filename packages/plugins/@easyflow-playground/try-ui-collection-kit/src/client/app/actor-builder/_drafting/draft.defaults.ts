export default {

  actorsStrategyDemos: {
    id: 'id',
    name: 'name',
    items: [
      {
        id: 'items[0].id',
        name: 'items[0].name',
      },
      {
        id: 'items[1].id',
        name: 'items[1].name',
      },
      {
        id: 'items[2].id',
        name: 'items[2].name',
      },
    ]

  },
}


export const pluginsPayload = {
  plugins: [
    {
      id: 'plugin-1',
      name: 'PDF Exporter',
      version: '1.0.0',
      icon: '🧾',
      capabilities: ['export']
    },
    {
      id: 'plugin-2',
      name: 'AI Assistant',
      version: '2.1.0',
      icon: '🤖',
      capabilities: ['analyze', 'suggest']
    }
  ],
  config: {
    'plugin-1': { enabled: true },
    'plugin-2': { enabled: false }
  }
};
