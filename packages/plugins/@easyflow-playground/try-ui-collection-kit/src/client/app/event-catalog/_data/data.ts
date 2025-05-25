export const collections = ['domains', 'events', 'queries', 'commands', 'services'];

export const repository = [
  {
    id: 'E-Commerce-1.0.0',
    data: {
      domains: [
        {
          id: 'Orders-0.0.3',
          data: {
            services: [
              {
                id: 'InventoryService',
                version: 'latest',
              },
              {
                id: 'OrdersService',
                version: 'latest',
              },
              {
                id: 'NotificationService',
                version: 'latest',
              },
              {
                id: 'ShippingService',
                version: 'latest',
              },
            ],
            entities: [
              {
                id: 'Order',
                version: 'latest',
              },
              {
                id: 'OrderItem',
                version: 'latest',
              },
              {
                id: 'Customer',
                version: 'latest',
              },
            ],
            id: 'Orders',
            name: 'Orders',
            version: '0.0.3',
            badges: [
              {
                content: 'Subdomain',
                backgroundColor: 'blue',
                textColor: 'blue',
                icon: 'RectangleGroupIcon',
              },
            ],
            owners: [
              {
                id: 'dboyne',
              },
              {
                id: 'full-stack',
              },
            ],
            resourceGroups: [
              {
                id: 'related-resources',
                title: 'Core resources',
                items: [
                  {
                    id: 'InventoryService',
                    version: 'latest',
                    type: 'service',
                  },
                  {
                    id: 'OrdersService',
                    version: 'latest',
                    type: 'service',
                  },
                  {
                    id: 'NotificationService',
                    version: 'latest',
                    type: 'service',
                  },
                  {
                    id: 'ShippingService',
                    version: 'latest',
                    type: 'service',
                  },
                ],
                limit: 10,
                sidebar: true,
              },
            ],
          },
          collection: 'domains',
        },
        {
          id: 'Payment-0.0.1',
          data: {
            services: [
              {
                id: 'PaymentService',
                version: 'latest',
              },
            ],
            entities: [
              {
                id: 'Invoice',
                version: 'latest',
              },
              {
                id: 'Payment',
                version: 'latest',
              },
              {
                id: 'PaymentMethod',
                version: 'latest',
              },
              {
                id: 'Transaction',
                version: 'latest',
              },
            ],
            id: 'Payment',
            name: 'Payment',
            summary: 'Domain that contains payment related services and messages.',
            version: '0.0.1',
            badges: [
              {
                content: 'Subdomain',
                backgroundColor: 'blue',
                textColor: 'blue',
                icon: 'BoltIcon',
              },
            ],
            owners: [
              {
                id: 'dboyne',
              },
            ],
          },
          collection: 'domains',
        },
        {
          id: 'Subscription-0.0.1',
          data: {
            services: [
              {
                id: 'SubscriptionService',
                version: 'latest',
              },
            ],
            entities: [
              {
                id: 'BillingProfile',
                version: 'latest',
              },
              {
                id: 'SubscriptionPeriod',
                version: 'latest',
              },
            ],
            id: 'Subscription',
            name: 'Subscription',
            summary: 'Domain that contains subscription related services and messages.',
            version: '0.0.1',
            badges: [
              {
                content: 'Subdomain',
                backgroundColor: 'blue',
                textColor: 'blue',
              },
            ],
            owners: [
              {
                id: 'subscriptions-management',
              },
            ],
          },
          collection: 'domains',
        },
      ],
      id: 'E-Commerce',
      name: 'E-Commerce',
      version: '1.0.0',
      badges: [
        {
          content: 'Core domain',
          backgroundColor: 'blue',
          textColor: 'blue',
          icon: 'RectangleGroupIcon',
        },
        {
          content: 'Business Critical',
          backgroundColor: 'yellow',
          textColor: 'yellow',
          icon: 'ShieldCheckIcon',
        },
      ],
      owners: [
        {
          id: 'dboyne',
        },
        {
          id: 'full-stack',
        },
      ],
      resourceGroups: [
        {
          id: 'related-resources',
          title: 'Core FlowMart Services',
          items: [
            {
              id: 'InventoryService',
              version: 'latest',
              type: 'service',
            },
            {
              id: 'OrdersService',
              version: 'latest',
              type: 'service',
            },
            {
              id: 'NotificationService',
              version: 'latest',
              type: 'service',
            },
            {
              id: 'ShippingService',
              version: 'latest',
              type: 'service',
            },
            {
              id: 'CustomerService',
              version: 'latest',
              type: 'service',
            },
            {
              id: 'PaymentService',
              version: 'latest',
              type: 'service',
            },
            {
              id: 'AnalyticsService',
              version: 'latest',
              type: 'service',
            },
          ],
          limit: 10,
          sidebar: true,
        },
      ],
      services: [
        {
          id: 'InventoryService-0.0.2',
          data: {
            sends: [
              {
                id: 'InventoryAdjusted',
                version: 'latest',
              },
              {
                id: 'OutOfStock',
                version: 'latest',
              },
              {
                id: 'GetOrder',
                version: 'latest',
              },
            ],
            receives: [
              {
                id: 'OrderConfirmed',
                version: 'latest',
              },
              {
                id: 'GetInventoryList',
                version: 'latest',
              },
              {
                id: 'OrderAmended',
                version: 'latest',
              },
              {
                id: 'UpdateInventory',
                version: 'latest',
              },
              {
                id: 'AddInventory',
                version: 'latest',
              },
              {
                id: 'GetInventoryStatus',
                version: 'latest',
              },
              {
                id: 'DeleteInventory',
                version: 'latest',
              },
            ],
            id: 'InventoryService',
            name: 'Inventory Service',
            summary: 'Service that handles the inventory',
            version: '0.0.2',
            owners: [
              {
                id: 'order-management',
              },
            ],
          },
          collection: 'services',
        },
        {
          id: 'OrdersService-0.0.3',
          data: {
            sends: [
              {
                id: 'OrderAmended',
                version: 'latest',
              },
              {
                id: 'OrderCancelled',
                version: 'latest',
              },
              {
                id: 'OrderConfirmed',
                version: 'latest',
              },
              {
                id: 'AddInventory',
                version: '0.0.3',
              },
            ],
            receives: [
              {
                id: 'InventoryAdjusted',
                version: '0.0.3',
              },
              {
                id: 'GetOrder',
                version: 'latest',
              },
              {
                id: 'PlaceOrder',
                version: 'latest',
              },
              {
                id: 'UserSubscriptionCancelled',
                version: 'latest',
              },
            ],
            id: 'OrdersService',
            name: 'Orders Service',
            summary: 'Service that handles orders',
            version: '0.0.3',
            owners: [
              {
                id: 'order-management',
              },
            ],
            specifications: [
              {
                type: 'asyncapi',
                path: 'order-service-asyncapi.yaml',
              },
              {
                type: 'openapi',
                path: 'openapi-v1.yml',
                name: 'v1 API',
              },
              {
                type: 'openapi',
                path: 'openapi-v2.yml',
                name: 'v2 API',
              },
            ],
          },
          collection: 'services',
        },
        {
          id: 'NotificationService-0.0.2',
          data: {
            sends: [
              {
                id: 'OutOfStock',
                version: 'latest',
              },
              {
                id: 'GetInventoryList',
                version: '0.0.x',
              },
            ],
            receives: [
              {
                id: 'InventoryAdjusted',
                version: '1.0.0',
              },
              {
                id: 'PaymentProcessed',
                version: '^1.0.0',
              },
              {
                id: 'GetUserNotifications',
                version: 'x',
              },
              {
                id: 'GetNotificationDetails',
                version: 'x',
              },
            ],
            id: 'NotificationService',
            name: 'Notifications',
            summary: 'Service that handles orders',
            version: '0.0.2',
            owners: [
              {
                id: 'order-management',
              },
            ],
          },
          collection: 'services',
        },
        {
          id: 'ShippingService-0.0.1',
          data: {
            sends: [
              {
                id: 'ShipmentCreated',
                version: 'latest',
              },
              {
                id: 'ReturnInitiated',
                version: 'latest',
              },
              {
                id: 'ShipmentDispatched',
                version: 'latest',
              },
              {
                id: 'ShipmentInTransit',
                version: 'latest',
              },
              {
                id: 'ShipmentDelivered',
                version: 'latest',
              },
              {
                id: 'DeliveryFailed',
                version: 'latest',
              },
            ],
            receives: [
              {
                id: 'CancelShipment',
                version: 'latest',
              },
              {
                id: 'CreateReturnLabel',
                version: 'latest',
              },
              {
                id: 'CreateShipment',
                version: 'latest',
              },
              {
                id: 'UpdateShipmentStatus',
                version: 'latest',
              },
              {
                id: 'PaymentProcessed',
                version: 'latest',
              },
            ],
            id: 'ShippingService',
            name: 'Shipping Service',
            summary: 'Service that handles shipping',
            version: '0.0.1',
            owners: [
              {
                id: 'dboyne',
              },
            ],
          },
          collection: 'services',
        },
        {
          id: 'PaymentService-0.0.1',
          data: {
            sends: [
              {
                id: 'PaymentProcessed',
                version: '0.0.1',
              },
              {
                id: 'GetOrder',
                version: 'latest',
              },
            ],
            receives: [
              {
                id: 'PaymentInitiated',
                version: '0.0.1',
              },
              {
                id: 'GetPaymentStatus',
                version: 'latest',
              },
              {
                id: 'UserSubscriptionStarted',
                version: 'latest',
              },
              {
                id: 'InventoryAdjusted',
                version: 'latest',
              },
            ],
            id: 'PaymentService',
            name: 'Payment Service',
            summary: 'Service that handles payments',
            version: '0.0.1',
            owners: [
              {
                id: 'dboyne',
              },
            ],
          },
          collection: 'services',
        },
        {
          id: 'SubscriptionService-0.0.1',
          data: {
            sends: [
              {
                id: 'UserSubscriptionStarted',
                version: '0.0.1',
              },
              {
                id: 'UserSubscriptionCancelled',
                version: '0.0.1',
              },
            ],
            receives: [
              {
                id: 'SubscribeUser',
                version: '0.0.1',
              },
              {
                id: 'CancelSubscription',
                version: '0.0.1',
              },
              {
                id: 'GetSubscriptionStatus',
                version: 'latest',
              },
              {
                id: 'PaymentProcessed',
                version: '0.0.1',
              },
            ],
            id: 'SubscriptionService',
            name: 'Subscription Service',
            summary: 'Service that handles subscriptions',
            version: '0.0.1',
            owners: [
              {
                id: 'subscriptions-management',
              },
            ],
          },
          collection: 'services',
        },
      ],
      entities: [],
      latestVersion: '1.0.0',
      versions: ['1.0.0'],
    },
    sends: [
      {
        id: 'InventoryAdjusted-1.0.1',
        data: {
          channels: [
            {
              id: 'inventory.{env}.events',
              version: 'latest',
            },
          ],
          id: 'InventoryAdjusted',
          name: 'Inventory adjusted',
          summary: 'Indicates a change in inventory level',
          version: '1.0.1',
          badges: [
            {
              content: 'Recently updated!',
              backgroundColor: 'green',
              textColor: 'green',
            },
            {
              content: 'Broker:Apache Kafka',
              backgroundColor: 'yellow',
              textColor: 'yellow',
              icon: 'kafka',
            },
          ],
          owners: [
            {
              id: 'dboyne',
            },
            {
              id: 'msmith',
            },
            {
              id: 'asmith',
            },
            {
              id: 'full-stack',
            },
            {
              id: 'mobile-devs',
            },
          ],
          schemaPath: 'schema.avro',
        },
        collection: 'events',
      },
      {
        id: 'OutOfStock-0.0.4',
        data: {
          channels: [
            {
              id: 'inventory.{env}.events',
              version: 'latest',
            },
          ],
          id: 'OutOfStock',
          name: 'Inventory out of stock',
          summary: 'Indicates inventory is out of stock',
          version: '0.0.4',
          badges: [
            {
              content: 'Recently updated!',
              backgroundColor: 'green',
              textColor: 'green',
            },
            {
              content: 'Broker:Apache Kafka',
              backgroundColor: 'yellow',
              textColor: 'yellow',
              icon: 'kafka',
            },
          ],
          owners: [
            {
              id: 'dboyne',
            },
            {
              id: 'msmith',
            },
            {
              id: 'asmith',
            },
            {
              id: 'full-stack',
            },
            {
              id: 'mobile-devs',
            },
          ],
        },
        collection: 'events',
      },
      {
        id: 'GetOrder-0.0.1',
        data: {
          id: 'GetOrder',
          name: 'Get order details',
          summary:
            'GET request that will return detailed information about a specific order, identified by its orderId.',
          version: '0.0.1',
          badges: [
            {
              content: 'Recently updated!',
              backgroundColor: 'green',
              textColor: 'green',
            },
          ],
          owners: [
            {
              id: 'order-management',
            },
          ],
          schemaPath: 'schema.json',
          sidebar: {
            badge: 'GET',
          },
        },

        collection: 'queries',
      },
      {
        id: 'OrderAmended-0.0.1',
        data: {
          channels: [
            {
              parameters: {
                env: 'staging',
              },
              id: 'orders.{env}.events',
              version: 'latest',
            },
          ],
          id: 'OrderAmended',
          name: 'Order amended',
          summary: 'Indicates an order has been changed',
          version: '0.0.1',
          badges: [
            {
              content: 'Recently updated!',
              backgroundColor: 'green',
              textColor: 'green',
            },
            {
              content: 'Broker:Apache Kafka',
              backgroundColor: 'yellow',
              textColor: 'yellow',
              icon: 'kafka',
            },
          ],
          owners: [
            {
              id: 'order-management',
            },
          ],
          schemaPath: 'schema.avro',
        },

        collection: 'events',
      },
      {
        id: 'OrderCancelled-0.0.1',
        data: {
          channels: [
            {
              id: 'orders.{env}.events',
              version: 'latest',
            },
          ],
          id: 'OrderCancelled',
          name: 'Order cancelled',
          summary: 'Indicates an order has been canceled',
          version: '0.0.1',
          badges: [
            {
              content: 'Recently updated!',
              backgroundColor: 'green',
              textColor: 'green',
            },
            {
              content: 'Broker:Apache Kafka',
              backgroundColor: 'yellow',
              textColor: 'yellow',
              icon: 'kafka',
            },
          ],
          owners: [
            {
              id: 'order-management',
            },
          ],
          schemaPath: 'schema.json',
        },

        collection: 'events',
      },
      {
        id: 'OrderConfirmed-0.0.1',
        data: {
          channels: [
            {
              id: 'orders.{env}.events',
              version: 'latest',
            },
          ],
          id: 'OrderConfirmed',
          name: 'Order confirmed',
          summary: 'Indicates an order has been confirmed',
          version: '0.0.1',
          badges: [
            {
              content: 'Recently updated!',
              backgroundColor: 'green',
              textColor: 'green',
              icon: 'StarIcon',
            },
            {
              content: 'Broker:Apache Kafka',
              backgroundColor: 'yellow',
              textColor: 'yellow',
              icon: 'kafka',
            },
          ],
          owners: [
            {
              id: 'order-management',
            },
          ],
          schemaPath: 'schema.json',
        },

        collection: 'events',
      },
      {
        id: 'AddInventory-0.0.3',
        data: {
          channels: [
            {
              parameters: {
                env: 'staging',
              },
              id: 'inventory.{env}.events',
              version: 'latest',
            },
          ],
          id: 'AddInventory',
          name: 'Add inventory',
          summary: 'Command that will add item to a given inventory id',
          version: '0.0.3',
          badges: [
            {
              content: 'Recently updated!',
              backgroundColor: 'green',
              textColor: 'green',
            },
          ],
          owners: [
            {
              id: 'dboyne',
            },
            {
              id: 'asmith',
            },
            {
              id: 'full-stack',
            },
            {
              id: 'mobile-devs',
            },
          ],
          schemaPath: 'schema.json',
          sidebar: {
            badge: 'POST',
          },
        },

        collection: 'commands',
      },
      {
        id: 'GetInventoryList-0.0.1',
        data: {
          id: 'GetInventoryList',
          name: 'List inventory list',
          summary: 'GET request that will return inventory list',
          version: '0.0.1',
          badges: [
            {
              content: 'Recently updated!',
              backgroundColor: 'green',
              textColor: 'green',
            },
          ],
          owners: [
            {
              id: 'dboyne',
            },
          ],
          schemaPath: 'schema.json',
        },

        collection: 'queries',
      },
      {
        id: 'ShipmentCreated-0.0.1',
        data: {
          id: 'ShipmentCreated',
          name: 'Shipment created',
          summary: 'Event that is emitted when a shipment is created.',
          version: '0.0.1',
          owners: [
            {
              id: 'dboyne',
            },
          ],
          schemaPath: 'schema.json',
        },

        collection: 'events',
      },
      {
        id: 'ReturnInitiated-0.0.1',
        data: {
          id: 'ReturnInitiated',
          name: 'Return initiated',
          summary: 'Event that is emitted when a return is initiated.',
          version: '0.0.1',
          owners: [
            {
              id: 'dboyne',
            },
          ],
          schemaPath: 'schema.json',
        },

        collection: 'events',
      },
      {
        id: 'ShipmentDispatched-0.0.1',
        data: {
          id: 'ShipmentDispatched',
          name: 'Shipment dispatched',
          summary: 'Event that is emitted when a shipment is dispatched.',
          version: '0.0.1',
          owners: [
            {
              id: 'dboyne',
            },
          ],
          schemaPath: 'schema.json',
        },

        collection: 'events',
      },
      {
        id: 'ShipmentInTransit-0.0.1',
        data: {
          id: 'ShipmentInTransit',
          name: 'Shipment in transit',
          summary: 'Event that is emitted when a shipment is in transit.',
          version: '0.0.1',
          owners: [
            {
              id: 'dboyne',
            },
          ],
          schemaPath: 'schema.json',
        },
        collection: 'events',
      },
      {
        id: 'ShipmentDelivered-0.0.1',
        data: {
          id: 'ShipmentDelivered',
          name: 'Shipment delivered',
          summary: 'Event that is emitted when a shipment is delivered.',
          version: '0.0.1',
          owners: [
            {
              id: 'dboyne',
            },
          ],
          schemaPath: 'schema.json',
        },

        collection: 'events',
      },
      {
        id: 'DeliveryFailed-0.0.1',
        data: {
          id: 'DeliveryFailed',
          name: 'Delivery failed',
          summary: 'Event that is emitted when a shipment delivery fails.',
          version: '0.0.1',
          owners: [
            {
              id: 'dboyne',
            },
          ],
          schemaPath: 'schema.json',
        },
        collection: 'events',
      },
      {
        id: 'PaymentProcessed-0.0.1',
        data: {
          id: 'PaymentProcessed',
          name: 'Payment Processed',
          summary: 'Event is triggered after the payment has been successfully processed',
          version: '0.0.1',
          owners: [
            {
              id: 'dboyne',
            },
          ],
        },

        collection: 'events',
      },
      {
        id: 'UserSubscriptionStarted-0.0.1',
        data: {
          id: 'UserSubscriptionStarted',
          name: 'User subscription started',
          summary: 'An event that is triggered when a new user subscription has started',
          version: '0.0.1',
          badges: [
            {
              content: 'New!',
              backgroundColor: 'green',
              textColor: 'green',
            },
          ],
          owners: [
            {
              id: 'subscriptions-management',
            },
          ],
        },

        collection: 'events',
      },
      {
        id: 'UserSubscriptionCancelled-0.0.1',
        data: {
          id: 'UserSubscriptionCancelled',
          name: 'User subscription cancelled',
          summary: 'An event that is triggered when a users subscription has been cancelled',
          version: '0.0.1',
          badges: [
            {
              content: 'New!',
              backgroundColor: 'green',
              textColor: 'green',
            },
          ],
          owners: [
            {
              id: 'subscriptions-management',
            },
          ],
        },
        collection: 'events',
      },
    ],
    receives: [
      {
        id: 'OrderConfirmed-0.0.1',
        data: {
          channels: [
            {
              id: 'orders.{env}.events',
              version: 'latest',
            },
          ],
          id: 'OrderConfirmed',
          name: 'Order confirmed',
          summary: 'Indicates an order has been confirmed',
          version: '0.0.1',
          badges: [
            {
              content: 'Recently updated!',
              backgroundColor: 'green',
              textColor: 'green',
              icon: 'StarIcon',
            },
            {
              content: 'Broker:Apache Kafka',
              backgroundColor: 'yellow',
              textColor: 'yellow',
              icon: 'kafka',
            },
          ],
          owners: [
            {
              id: 'order-management',
            },
          ],
          schemaPath: 'schema.json',
        },
        collection: 'events',
      },
      {
        id: 'GetInventoryList-0.0.1',
        data: {
          id: 'GetInventoryList',
          name: 'List inventory list',
          summary: 'GET request that will return inventory list',
          version: '0.0.1',
          badges: [
            {
              content: 'Recently updated!',
              backgroundColor: 'green',
              textColor: 'green',
            },
          ],
          owners: [
            {
              id: 'dboyne',
            },
          ],
          schemaPath: 'schema.json',
        },
        collection: 'queries',
      },
      {
        id: 'OrderAmended-0.0.1',
        data: {
          channels: [
            {
              parameters: {
                env: 'staging',
              },
              id: 'orders.{env}.events',
              version: 'latest',
            },
          ],
          id: 'OrderAmended',
          name: 'Order amended',
          summary: 'Indicates an order has been changed',
          version: '0.0.1',
          badges: [
            {
              content: 'Recently updated!',
              backgroundColor: 'green',
              textColor: 'green',
            },
            {
              content: 'Broker:Apache Kafka',
              backgroundColor: 'yellow',
              textColor: 'yellow',
              icon: 'kafka',
            },
          ],
          owners: [
            {
              id: 'order-management',
            },
          ],
          schemaPath: 'schema.avro',
        },
        collection: 'events',
      },
      {
        id: 'UpdateInventory-0.0.3',
        data: {
          channels: [
            {
              parameters: {
                env: 'staging',
              },
              id: 'inventory.{env}.events',
              version: 'latest',
            },
          ],
          id: 'UpdateInventory',
          name: 'Update inventory',
          summary: 'Command that will update a given inventory item',
          version: '0.0.3',
          badges: [
            {
              content: 'Recently updated!',
              backgroundColor: 'green',
              textColor: 'green',
            },
          ],
          owners: [
            {
              id: 'dboyne',
            },
            {
              id: 'msmith',
            },
            {
              id: 'asmith',
            },
            {
              id: 'full-stack',
            },
            {
              id: 'mobile-devs',
            },
          ],
          schemaPath: 'schema.json',
          sidebar: {
            badge: 'PUT',
          },
        },
        collection: 'commands',
      },
      {
        id: 'AddInventory-0.0.3',
        data: {
          channels: [
            {
              parameters: {
                env: 'staging',
              },
              id: 'inventory.{env}.events',
              version: 'latest',
            },
          ],
          id: 'AddInventory',
          name: 'Add inventory',
          summary: 'Command that will add item to a given inventory id',
          version: '0.0.3',
          badges: [
            {
              content: 'Recently updated!',
              backgroundColor: 'green',
              textColor: 'green',
            },
          ],
          owners: [
            {
              id: 'dboyne',
            },
            {
              id: 'asmith',
            },
            {
              id: 'full-stack',
            },
            {
              id: 'mobile-devs',
            },
          ],
          schemaPath: 'schema.json',
          sidebar: {
            badge: 'POST',
          },
        },
        collection: 'commands',
      },
      {
        id: 'GetInventoryStatus-0.0.1',
        data: {
          id: 'GetInventoryStatus',
          name: 'Get inventory status',
          summary: 'GET request that will return the current stock status for a specific product.',
          version: '0.0.1',
          badges: [
            {
              content: 'GET Request',
              backgroundColor: 'green',
              textColor: 'green',
            },
          ],
          owners: [
            {
              id: 'dboyne',
            },
          ],
          schemaPath: 'schema.json',
        },
        collection: 'queries',
      },
      {
        id: 'DeleteInventory-0.0.3',
        data: {
          channels: [
            {
              parameters: {
                env: 'staging',
              },
              id: 'inventory.{env}.events',
              version: 'latest',
            },
          ],
          id: 'DeleteInventory',
          name: 'Delete Inventory',
          summary: 'Command that will delete a given inventory item from the system',
          version: '0.0.3',
          badges: [
            {
              content: 'Recently updated!',
              backgroundColor: 'green',
              textColor: 'green',
            },
          ],
          owners: [
            {
              id: 'dboyne',
            },
            {
              id: 'msmith',
            },
            {
              id: 'asmith',
            },
            {
              id: 'full-stack',
            },
            {
              id: 'mobile-devs',
            },
          ],
          schemaPath: 'schema.json',
          sidebar: {
            badge: 'DELETE',
          },
        },
        collection: 'commands',
      },
      {
        id: 'GetOrder-0.0.1',
        data: {
          id: 'GetOrder',
          name: 'Get order details',
          summary:
            'GET request that will return detailed information about a specific order, identified by its orderId.',
          version: '0.0.1',
          badges: [
            {
              content: 'Recently updated!',
              backgroundColor: 'green',
              textColor: 'green',
            },
          ],
          owners: [
            {
              id: 'order-management',
            },
          ],
          schemaPath: 'schema.json',
          sidebar: {
            badge: 'GET',
          },
        },
        collection: 'queries',
      },
      {
        id: 'PlaceOrder-0.0.1',
        data: {
          id: 'PlaceOrder',
          name: 'Place Order',
          summary: 'Command that will place an order',
          version: '0.0.1',
          badges: [
            {
              content: 'Recently updated!',
              backgroundColor: 'green',
              textColor: 'green',
            },
          ],
          owners: [
            {
              id: 'dboyne',
            },
            {
              id: 'msmith',
            },
            {
              id: 'asmith',
            },
            {
              id: 'full-stack',
            },
            {
              id: 'mobile-devs',
            },
          ],
          schemaPath: 'schema.json',
          sidebar: {
            badge: 'POST',
          },
        },
        collection: 'commands',
      },
      {
        id: 'UserSubscriptionCancelled-0.0.1',
        data: {
          id: 'UserSubscriptionCancelled',
          name: 'User subscription cancelled',
          summary: 'An event that is triggered when a users subscription has been cancelled',
          version: '0.0.1',
          badges: [
            {
              content: 'New!',
              backgroundColor: 'green',
              textColor: 'green',
            },
          ],
          owners: [
            {
              id: 'subscriptions-management',
            },
          ],
        },
        collection: 'events',
      },
      {
        id: 'InventoryAdjusted-1.0.1',
        data: {
          channels: [
            {
              id: 'inventory.{env}.events',
              version: 'latest',
            },
          ],
          id: 'InventoryAdjusted',
          name: 'Inventory adjusted',
          summary: 'Indicates a change in inventory level',
          version: '1.0.1',
          badges: [
            {
              content: 'Recently updated!',
              backgroundColor: 'green',
              textColor: 'green',
            },
            {
              content: 'Broker:Apache Kafka',
              backgroundColor: 'yellow',
              textColor: 'yellow',
              icon: 'kafka',
            },
          ],
          owners: [
            {
              id: 'dboyne',
            },
            {
              id: 'msmith',
            },
            {
              id: 'asmith',
            },
            {
              id: 'full-stack',
            },
            {
              id: 'mobile-devs',
            },
          ],
          schemaPath: 'schema.avro',
        },
        collection: 'events',
      },
      {
        id: 'PaymentProcessed-1.0.0',
        data: {
          channels: [
            {
              parameters: {
                env: 'staging',
              },
              id: 'payments.{env}.events',
              version: 'latest',
            },
          ],
          id: 'PaymentProcessed',
          name: 'Payment Processed',
          summary: 'Event is triggered after the payment has been successfully processed',
          version: '1.0.0',
          owners: [
            {
              id: 'dboyne',
            },
          ],
        },
        collection: 'events',
      },
      {
        id: 'GetUserNotifications-0.0.1',
        data: {
          id: 'GetUserNotifications',
          name: 'Get user notifications',
          summary:
            'GET request that will return a list of notifications for a specific user, with options to filter by status (unread or all).',
          version: '0.0.1',
          badges: [
            {
              content: 'Recently updated!',
              backgroundColor: 'green',
              textColor: 'green',
            },
          ],
          owners: [
            {
              id: 'dboyne',
            },
          ],
          schemaPath: 'schema.json',
          sidebar: {
            badge: 'GET',
          },
        },
        collection: 'queries',
      },
      {
        id: 'GetNotificationDetails-0.0.1',
        data: {
          id: 'GetNotificationDetails',
          name: 'Get notification details',
          summary:
            'GET request that will return detailed information about a specific notification, identified by its notificationId.',
          version: '0.0.1',
          badges: [
            {
              content: 'Recently updated!',
              backgroundColor: 'green',
              textColor: 'green',
            },
          ],
          owners: [
            {
              id: 'dboyne',
            },
          ],
          schemaPath: 'schema.json',
          sidebar: {
            badge: 'GET',
          },
        },
        collection: 'queries',
      },
      {
        id: 'CancelShipment-0.0.1',
        data: {
          id: 'CancelShipment',
          name: 'Cancel shipment',
          summary: 'POST request that will cancel a shipment, identified by its shipmentId.',
          version: '0.0.1',
          owners: [
            {
              id: 'dboyne',
            },
          ],
          schemaPath: 'schema.json',
          sidebar: {
            badge: 'POST',
          },
        },
        collection: 'commands',
      },
      {
        id: 'CreateReturnLabel-0.0.1',
        data: {
          id: 'CreateReturnLabel',
          name: 'Create return label',
          summary:
            'POST request that will create a return label for a specific shipment, identified by its shipmentId.',
          version: '0.0.1',
          owners: [
            {
              id: 'dboyne',
            },
          ],
          schemaPath: 'schema.json',
          sidebar: {
            badge: 'POST',
          },
        },
        collection: 'commands',
      },
      {
        id: 'CreateShipment-0.0.1',
        data: {
          id: 'CreateShipment',
          name: 'Create shipment',
          summary: 'POST request that will create a shipment for a specific order, identified by its orderId.',
          version: '0.0.1',
          owners: [
            {
              id: 'dboyne',
            },
          ],
          schemaPath: 'schema.json',
          sidebar: {
            badge: 'POST',
          },
        },
        collection: 'commands',
      },
      {
        id: 'UpdateShipmentStatus-0.0.1',
        data: {
          id: 'UpdateShipmentStatus',
          name: 'Update shipment status',
          summary: 'POST request that will update the status of a shipment, identified by its shipmentId.',
          version: '0.0.1',
          owners: [
            {
              id: 'dboyne',
            },
          ],
          schemaPath: 'schema.json',
          sidebar: {
            badge: 'POST',
          },
        },
        collection: 'commands',
      },
      {
        id: 'PaymentInitiated-0.0.1',
        data: {
          channels: [
            {
              parameters: {
                env: 'staging',
              },
              id: 'payments.{env}.events',
              version: 'latest',
            },
          ],
          id: 'PaymentInitiated',
          name: 'Payment Initiated',
          summary: 'Event is triggered when a user initiates a payment through the Payment Service',
          version: '0.0.1',
          owners: [
            {
              id: 'dboyne',
            },
          ],
        },
        collection: 'events',
      },
      {
        id: 'GetPaymentStatus-0.0.1',
        data: {
          id: 'GetPaymentStatus',
          name: 'Get payment status',
          summary: 'GET request that will return the payment status for a specific order, identified by its orderId.',
          version: '0.0.1',
          badges: [
            {
              content: 'Recently updated!',
              backgroundColor: 'green',
              textColor: 'green',
            },
          ],
          owners: [
            {
              id: 'dboyne',
            },
          ],
          schemaPath: 'schema.json',
          sidebar: {
            badge: 'GET',
          },
        },
        collection: 'queries',
      },
      {
        id: 'UserSubscriptionStarted-0.0.1',
        data: {
          id: 'UserSubscriptionStarted',
          name: 'User subscription started',
          summary: 'An event that is triggered when a new user subscription has started',
          version: '0.0.1',
          badges: [
            {
              content: 'New!',
              backgroundColor: 'green',
              textColor: 'green',
            },
          ],
          owners: [
            {
              id: 'subscriptions-management',
            },
          ],
        },
        collection: 'events',
      },
      {
        id: 'SubscribeUser-0.0.1',
        data: {
          id: 'SubscribeUser',
          name: 'Subscribe user',
          summary: 'Command that will try and subscribe a given user',
          version: '0.0.1',
          badges: [
            {
              content: 'New!',
              backgroundColor: 'green',
              textColor: 'green',
            },
          ],
          owners: [
            {
              id: 'subscriptions-management',
            },
          ],
          sidebar: {
            badge: 'POST',
          },
        },
        collection: 'commands',
      },
      {
        id: 'CancelSubscription-0.0.1',
        data: {
          id: 'CancelSubscription',
          name: 'Cancel subscription',
          summary: 'Command that will try and cancel a users subscription',
          version: '0.0.1',
          badges: [
            {
              content: 'New!',
              backgroundColor: 'green',
              textColor: 'green',
            },
          ],
          owners: [
            {
              id: 'subscriptions-management',
            },
          ],
          sidebar: {
            badge: 'POST',
          },
        },
        collection: 'commands',
      },
      {
        id: 'GetSubscriptionStatus-0.0.2',
        data: {
          id: 'GetSubscriptionStatus',
          name: 'Get subscription status',
          summary:
            'GET request that will return the current subscription status for a specific user, identified by their userId.',
          version: '0.0.2',
          badges: [
            {
              content: 'Recently updated!',
              backgroundColor: 'green',
              textColor: 'green',
            },
          ],
          owners: [
            {
              id: 'subscriptions-management',
            },
          ],
          schemaPath: 'schema.json',
          sidebar: {
            badge: 'GET',
          },
        },
        collection: 'queries',
      },
    ],
  },
];


export const getRepo = (repoId: any) => {
  return repository.find((item: any) => item.id === repoId) || null;
};

export const getDomain = ({ repoId, domainId }: any) => {
  const repo = getRepo(repoId) || null;

  if (!repo) {
    return null;
  }

  return getRepo(repoId).data.domains.find((item: any) => item.id === domainId) || null;
};

export const findEvent = (eventId: any, eventsList: any) => {
  return eventsList.find((item: any) => item.id === eventId) || null;
};

export const getSendEvent = (repoId: any, eventId: any) => {
  const repo = getRepo(repoId) || null;

  if (!repo) {
    return null;
  }

  return findEvent(eventId, repo.sends);
};

export const getReceiveEvent = ({ repoId, eventId }: any) => {
  const repo = getRepo(repoId) || null;

  if (!repo) {
    return null;
  }

  return findEvent(eventId, repo.receives);
};
