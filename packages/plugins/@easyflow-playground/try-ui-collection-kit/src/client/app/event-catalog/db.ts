export const collections = {
  domains: [
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
        summary: 'Domain that contains payment related services and messages.\n',
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
      filePath: '../examples/default/domains/E-Commerce/subdomains/Payment/index.mdx',
      digest: '1d8013dca1ff4413',
      deferredRender: true,
      collection: 'domains',
    },
    {
      id: 'E-Commerce-1.0.0',
      data: {
        domains: [
          {
            id: 'Orders',
            version: 'latest',
          },
          {
            id: 'Payment',
            version: 'latest',
          },
          {
            id: 'Subscription',
            version: 'latest',
          },
          {
            id: 'MySubdomain',
            version: 'latest',
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
      },
      filePath: '../examples/default/domains/E-Commerce/index.mdx',
      digest: 'eb51cb6c9ca73a4b',
      deferredRender: true,
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
        summary: 'Domain that contains subscription related services and messages.\n',
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
      filePath: '../examples/default/domains/E-Commerce/subdomains/Subscriptions/index.mdx',
      digest: 'b4b5bcc7e54bbaea',
      deferredRender: true,
      collection: 'domains',
    },
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
      filePath: '../examples/default/domains/E-Commerce/subdomains/Orders/index.mdx',
      digest: '807e56f5425bd33f',
      deferredRender: true,
      collection: 'domains',
    },
    {
      id: 'Orders-0.0.2',
      data: {
        services: [
          {
            id: 'InventoryService',
            version: '0.0.2',
          },
          {
            id: 'NotificationService',
            version: '0.0.2',
          },
          {
            id: 'OrdersService',
            version: '0.0.2',
          },
        ],
        id: 'Orders',
        name: 'Orders',
        version: '0.0.2',
        badges: [
          {
            content: 'New domain',
            backgroundColor: 'blue',
            textColor: 'blue',
          },
        ],
        owners: [
          {
            id: 'dboyne',
          },
        ],
      },
      filePath: '../examples/default/domains/E-Commerce/subdomains/Orders/versioned/0.0.2/index.mdx',
      digest: 'b395d6dd1442b98c',
      deferredRender: true,
      collection: 'domains',
    },
    {
      id: 'Orders-0.0.1',
      data: {
        services: [
          {
            id: 'InventoryService',
            version: '0.0.2',
          },
        ],
        id: 'Orders',
        name: 'Orders',
        summary: 'Domain for everything shopping\n',
        version: '0.0.1',
        badges: [
          {
            content: 'New domain',
            backgroundColor: 'blue',
            textColor: 'blue',
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
      },
      filePath: '../examples/default/domains/E-Commerce/subdomains/Orders/versioned/0.0.1/index.mdx',
      digest: '92e1f9f0299b99f8',
      deferredRender: true,
      collection: 'domains',
    },
  ],
  services: [
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
        summary: 'Service that handles orders\n',
        version: '0.0.3',
        owners: [
          {
            id: 'order-management',
          },
        ],
        schemaPath: 'openapi-v1.yml',
        repository: {
          language: 'JavaScript',
          url: 'https://github.com/event-catalog/pretend-shipping-service',
        },
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
      filePath: '../examples/default/domains/E-Commerce/subdomains/Orders/services/OrdersService/index.mdx',
      digest: '45e05f02eaf8e01a',
      deferredRender: true,
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
            version: '>1.0.0',
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
        summary: 'Service that handles orders\n',
        version: '0.0.2',
        owners: [
          {
            id: 'order-management',
          },
        ],
        repository: {
          language: 'JavaScript',
          url: 'https://github.com/event-catalog/pretend-shipping-service',
        },
      },
      filePath: '../examples/default/domains/E-Commerce/subdomains/Orders/services/NotificationService/index.mdx',
      digest: '2f3d49c49ec94a4a',
      deferredRender: true,
      collection: 'services',
    },
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
        summary: 'Service that handles the inventory\n',
        version: '0.0.2',
        owners: [
          {
            id: 'order-management',
          },
        ],
        repository: {
          language: 'JavaScript',
          url: 'https://github.com/event-catalog/pretend-shipping-service',
        },
        deprecated: {
          message:
            'This service is **being deprecated** and replaced by the new service **InventoryServiceV2**.\nPlease contact the [team for more information](mailto:inventory-team@example.com) or visit our [website](https://eventcatalog.dev).\n',
          date: '2026-05-01T00:00:00.000Z',
        },
      },
      filePath: '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/index.mdx',
      digest: '6aaa18b0014d9edc',
      deferredRender: true,
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
        summary: 'Service that handles shipping\n',
        version: '0.0.1',
        owners: [
          {
            id: 'dboyne',
          },
        ],
        repository: {
          language: 'JavaScript',
          url: 'https://github.com/event-catalog/pretend-shipping-service',
        },
      },
      filePath: '../examples/default/domains/E-Commerce/subdomains/Orders/services/ShippingService/index.mdx',
      digest: '4e966f3f6b5fd108',
      deferredRender: true,
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
        summary: 'Service that handles payments\n',
        version: '0.0.1',
        owners: [
          {
            id: 'dboyne',
          },
        ],
        repository: {
          language: 'JavaScript',
          url: 'https://github.com/event-catalog/pretend-shipping-service',
        },
      },
      filePath: '../examples/default/domains/E-Commerce/subdomains/Payment/services/PaymentService/index.mdx',
      digest: 'f34269b53f50aded',
      deferredRender: true,
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
        summary: 'Service that handles subscriptions\n',
        version: '0.0.1',
        owners: [
          {
            id: 'subscriptions-management',
          },
        ],
        repository: {
          language: 'JavaScript',
          url: 'https://github.com/event-catalog/pretend-subscription-service',
        },
      },
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Subscriptions/services/SubscriptionService/index.mdx',
      digest: 'd5a21a4bb4809fb0',
      deferredRender: true,
      collection: 'services',
    },
    {
      id: 'OrdersService-0.0.2',
      data: {
        sends: [
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
        ],
        id: 'OrdersService',
        name: 'Orders Service',
        summary: 'Service that handles orders\n',
        version: '0.0.2',
        owners: [
          {
            id: 'dboyne',
          },
        ],
        schemaPath: 'openapi.yml',
        repository: {
          language: 'JavaScript',
          url: 'https://github.com/event-catalog/pretend-shipping-service',
        },
        specifications: {
          openapiPath: 'openapi.yml',
          asyncapiPath: 'order-service-asyncapi.yaml',
        },
      },
      body: "import Footer from '@catalog/components/footer.astro';\n\n## Overview\n\nThe Orders Service is responsible for managing customer orders within the system. It handles order creation, updating, status tracking, and interactions with other services such as Inventory, Payment, and Notification services to ensure smooth order processing and fulfillment.\n\n## Architecture diagram \n\n<NodeGraph />\n\n<Footer />",
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/OrdersService/versioned/0.0.2/index.mdx',
      digest: '942495f4e1b12dcb',
      deferredRender: true,
      collection: 'services',
    },
    {
      id: 'InventoryService-0.0.1',
      data: {
        sends: [
          {
            id: 'InventoryAdjusted',
            version: '0.0.4',
          },
          {
            id: 'OutOfStock',
            version: '0.0.3',
          },
        ],
        receives: [
          {
            id: 'OrderConfirmed',
            version: '0.0.1',
          },
          {
            id: 'OrderCancelled',
            version: '0.0.1',
          },
          {
            id: 'OrderAmended',
            version: '0.0.1',
          },
          {
            id: 'UpdateInventory',
            version: '0.0.3',
          },
        ],
        id: 'InventoryService',
        name: 'Inventory Service',
        summary: 'Service that handles the inventory\n',
        version: '0.0.1',
        owners: [
          {
            id: 'dboyne',
          },
          {
            id: 'full-stack',
          },
          {
            id: 'mobile-devs',
          },
        ],
        repository: {
          language: 'JavaScript',
          url: 'https://github.com/event-catalog/pretend-shipping-service',
        },
      },
      body: '## Overview\n\nThe Inventory Service is a critical component of the system responsible for managing product stock levels, tracking inventory movements, and ensuring product availability. It interacts with other services to maintain accurate inventory records and supports operations such as order fulfillment, restocking, and inventory audits.\n\n## Architecture diagram\n\n<NodeGraph title="Hello world" />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/versioned/0.0.1/index.mdx',
      digest: '405a2c4b0e672d22',
      deferredRender: true,
      collection: 'services',
    },
  ],
  events: [
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
        summary: 'Indicates a change in inventory level\n',
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
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/events/InventoryAdjusted/index.mdx',
      digest: 'ade660eb81993fdd',
      deferredRender: true,
      collection: 'events',
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
        summary: 'Indicates an order has been changed\n',
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
      body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe OrderAmended event is triggered whenever an existing order is modified. This event ensures that all relevant services are notified of changes to an order, such as updates to order items, quantities, shipping information, or status. The event allows the system to maintain consistency and ensure that all dependent services can react appropriately to the amendments.\n\n<NodeGraph />\n\n## Example payload\n\n```json title="Example Payload"\n{\n  "orderId": "123e4567-e89b-12d3-a456-426614174000",\n  "userId": "123e4567-e89b-12d3-a456-426614174000",\n  "amendedItems": [\n    {\n      "productId": "789e1234-b56c-78d9-e012-3456789fghij",\n      "productName": "Example Product",\n      "oldQuantity": 2,\n      "newQuantity": 3,\n      "unitPrice": 29.99,\n      "totalPrice": 89.97\n    }\n  ],\n  "orderStatus": "confirmed",\n  "totalAmount": 150.75,\n  "timestamp": "2024-07-04T14:48:00Z"\n}\n```\n\n## Schema (Avro)s\n\n<Schema file="schema.avro" />\n\n## Schema (JSON)\n\n<Schema file="schema.json" />\n\n<Footer />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/OrdersService/events/OrderAmended/index.mdx',
      digest: '1c2e739addd67a6a',
      deferredRender: true,
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
        summary: 'Indicates inventory is out of stock\n',
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
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/events/OutOfStock/index.mdx',
      digest: '5a97dd73fa169ad6',
      deferredRender: true,
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
        summary: 'Indicates an order has been canceled\n',
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
      body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe OrderCancelled event is triggered whenever an existing order is cancelled. This event ensures that all relevant services are notified of the cancellation, allowing them to take appropriate actions such as updating inventory levels, refunding payments, and notifying the user. The event helps maintain consistency across the system by ensuring all dependent services are aware of the order cancellation.\n\n## Example payload\n\n```json title="Example payload"\n{\n  "orderId": "123e4567-e89b-12d3-a456-426614174000",\n  "userId": "123e4567-e89b-12d3-a456-426614174000",\n  "orderItems": [\n    {\n      "productId": "789e1234-b56c-78d9-e012-3456789fghij",\n      "productName": "Example Product",\n      "quantity": 2,\n      "unitPrice": 29.99,\n      "totalPrice": 59.98\n    }\n  ],\n  "orderStatus": "cancelled",\n  "totalAmount": 59.98,\n  "cancellationReason": "Customer requested cancellation",\n  "timestamp": "2024-07-04T14:48:00Z"\n}\n\n```\n\n## Schema\n\nJSON schema for the event.\n\n<Schema title="JSON Schema" file="schema.json"/>\n\n<Footer />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/OrdersService/events/OrderCancelled/index.mdx',
      digest: '978875f2e0eb596a',
      deferredRender: true,
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
      body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe PaymentProcessed event is triggered after the payment has been successfully processed by the Payment Service. This event signifies that a payment has been confirmed, and it communicates the outcome to other services and components within the system.\n\n<NodeGraph />\n\n### Payload Example\n\n```json title="Payload example"\n{\n  "transactionId": "123e4567-e89b-12d3-a456-426614174000",\n  "userId": "123e4567-e89b-12d3-a456-426614174000",\n  "orderId": "789e1234-b56c-78d9-e012-3456789fghij",\n  "amount": 100.50,\n  "paymentMethod": "CreditCard",\n  "status": "confirmed",\n  "confirmationDetails": {\n    "gatewayResponse": "Approved",\n    "transactionId": "abc123"\n  },\n  "timestamp": "2024-07-04T14:48:00Z"\n}\n```\n\n### Security Considerations\n\n- **Data Validation**: Ensure that all data in the event payload is validated before publishing to prevent injection attacks or other malicious activities.\n- **Sensitive Data Handling**: Avoid including sensitive information (e.g., full credit card numbers) in the event payload. Use secure channels and encryption for such data.\n- **Authentication and Authorization**: Ensure that only authorized services can publish or consume PaymentProcessed events.\n\n<Footer />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Payment/services/PaymentService/events/PaymentProcessed/index.mdx',
      digest: '45b319e31a874a90',
      deferredRender: true,
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
        summary: 'Indicates an order has been confirmed\n',
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
      body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe OrderConfirmed event is triggered when an order has been successfully confirmed. This event notifies relevant services that the order is ready for further processing, such as inventory adjustment, payment finalization, and preparation for shipping.\n\n## Architecture Diagram\n\n<NodeGraph />\n\n## Payload\n\n```json title="Example payload"\n{\n  "orderId": "123e4567-e89b-12d3-a456-426614174000",\n  "userId": "123e4567-e89b-12d3-a456-426614174000",\n  "orderItems": [\n    {\n      "productId": "789e1234-b56c-78d9-e012-3456789fghij",\n      "productName": "Example Product",\n      "quantity": 2,\n      "unitPrice": 29.99,\n      "totalPrice": 59.98\n    }\n  ],\n  "orderStatus": "confirmed",\n  "totalAmount": 150.75,\n  "confirmationTimestamp": "2024-07-04T14:48:00Z"\n}\n```\n\n## Schema\n\n<Schema file="schema.json"/>\n\n<Footer />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/OrdersService/events/OrderConfirmed/index.mdx',
      digest: '25c0eccde9d78e40',
      deferredRender: true,
      collection: 'events',
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
      body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe Payment Initiated event is triggered when a user initiates a payment through the Payment Service. This event signifies the beginning of the payment process and contains all necessary information to process the payment.\n\n<NodeGraph />\n\n### Payload Example\n\n```json title="Payload example"\n{\n  "userId": "123e4567-e89b-12d3-a456-426614174000",\n  "orderId": "789e1234-b56c-78d9-e012-3456789fghij",\n  "amount": 100.50,\n  "paymentMethod": "CreditCard",\n  "timestamp": "2024-07-04T14:48:00Z"\n}\n```\n\n### Security Considerations\n\n- **Authentication**: Ensure that only authenticated users can initiate a payment, and the userId in the payload matches the authenticated user.\n- **Data Validation**: Validate all input data to prevent injection attacks or other malicious input.\n- **Sensitive Data Handling**: Avoid including sensitive information (e.g., credit card numbers) in the event payload. Use secure channels and encryption for such data.\n\n<Footer />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Payment/services/PaymentService/events/PaymentInitiated/index.mdx',
      digest: '9dba7743582f388c',
      deferredRender: true,
      collection: 'events',
    },
    {
      id: 'DeliveryFailed-0.0.1',
      data: {
        id: 'DeliveryFailed',
        name: 'Delivery failed',
        summary: 'Event that is emitted when a shipment delivery fails.\n',
        version: '0.0.1',
        owners: [
          {
            id: 'dboyne',
          },
        ],
        schemaPath: 'schema.json',
      },
      body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe `DeliveryFailed` event is emitted when a shipment delivery fails. It provides information such as the shipment status (e.g., pending, completed, shipped), the items within the shipment, billing and shipping details, payment information, and the order\'s total amount. This query is commonly used by systems managing order processing, customer service, or order tracking functionalities.\n\nThis event can be applied in e-commerce systems, marketplaces, or any platform where users and systems need real-time shipment data for tracking, auditing, or managing customer purchases.\n\n<NodeGraph />\n\n<SchemaViewer file="schema.json" title="JSON Schema" maxHeight="500" />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/ShippingService/events/DeliveryFailed/index.mdx',
      digest: '388b45c6a5232dd7',
      deferredRender: true,
      collection: 'events',
    },
    {
      id: 'ReturnInitiated-0.0.1',
      data: {
        id: 'ReturnInitiated',
        name: 'Return initiated',
        summary: 'Event that is emitted when a return is initiated.\n',
        version: '0.0.1',
        owners: [
          {
            id: 'dboyne',
          },
        ],
        schemaPath: 'schema.json',
      },
      body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe `ReturnInitiated` event is emitted when a return is initiated. It provides information such as the shipment status (e.g., pending, completed, shipped), the items within the shipment, billing and shipping details, payment information, and the order\'s total amount. This query is commonly used by systems managing order processing, customer service, or order tracking functionalities.\n\nThis event can be applied in e-commerce systems, marketplaces, or any platform where users and systems need real-time return data for tracking, auditing, or managing customer purchases.\n\n<NodeGraph />\n\n<SchemaViewer file="schema.json" title="JSON Schema" maxHeight="500" />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/ShippingService/events/ReturnInitiated/index.mdx',
      digest: '8c07547b7d221ec0',
      deferredRender: true,
      collection: 'events',
    },
    {
      id: 'ShipmentCreated-0.0.1',
      data: {
        id: 'ShipmentCreated',
        name: 'Shipment created',
        summary: 'Event that is emitted when a shipment is created.\n',
        version: '0.0.1',
        owners: [
          {
            id: 'dboyne',
          },
        ],
        schemaPath: 'schema.json',
      },
      body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe `ShipmentCreated` event is emitted when a shipment is created. It provides information such as the shipment status (e.g., pending, completed, shipped), the items within the shipment, billing and shipping details, payment information, and the order\'s total amount. This query is commonly used by systems managing order processing, customer service, or order tracking functionalities.\n\nThis event can be applied in e-commerce systems, marketplaces, or any platform where users and systems need real-time shipment data for tracking, auditing, or managing customer purchases.\n\n<NodeGraph />\n\n<SchemaViewer file="schema.json" title="JSON Schema" maxHeight="500" />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/ShippingService/events/ShipmentCreated/index.mdx',
      digest: '81baf1c8ce150762',
      deferredRender: true,
      collection: 'events',
    },
    {
      id: 'ShipmentDelivered-0.0.1',
      data: {
        id: 'ShipmentDelivered',
        name: 'Shipment delivered',
        summary: 'Event that is emitted when a shipment is delivered.\n',
        version: '0.0.1',
        owners: [
          {
            id: 'dboyne',
          },
        ],
        schemaPath: 'schema.json',
      },
      body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe `ShipmentDelivered` event is emitted when a shipment is delivered. It provides information such as the shipment status (e.g., pending, completed, shipped), the items within the shipment, billing and shipping details, payment information, and the order\'s total amount. This query is commonly used by systems managing order processing, customer service, or order tracking functionalities.\n\nThis event can be applied in e-commerce systems, marketplaces, or any platform where users and systems need real-time shipment data for tracking, auditing, or managing customer purchases.\n\n<NodeGraph />\n\n<SchemaViewer file="schema.json" title="JSON Schema" maxHeight="500" />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/ShippingService/events/ShipmentDelivered/index.mdx',
      digest: '4aa31b957c9f7f14',
      deferredRender: true,
      collection: 'events',
    },
    {
      id: 'ShipmentDispatched-0.0.1',
      data: {
        id: 'ShipmentDispatched',
        name: 'Shipment dispatched',
        summary: 'Event that is emitted when a shipment is dispatched.\n',
        version: '0.0.1',
        owners: [
          {
            id: 'dboyne',
          },
        ],
        schemaPath: 'schema.json',
      },
      body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe `ShipmentDispatched` event is emitted when a shipment is dispatched. It provides information such as the shipment status (e.g., pending, completed, shipped), the items within the shipment, billing and shipping details, payment information, and the order\'s total amount. This query is commonly used by systems managing order processing, customer service, or order tracking functionalities.\n\nThis event can be applied in e-commerce systems, marketplaces, or any platform where users and systems need real-time shipment data for tracking, auditing, or managing customer purchases.\n\n<NodeGraph />\n\n<SchemaViewer file="schema.json" title="JSON Schema" maxHeight="500" />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/ShippingService/events/ShipmentDispatched/index.mdx',
      digest: 'cb4e2735758f102b',
      deferredRender: true,
      collection: 'events',
    },
    {
      id: 'ShipmentInTransit-0.0.1',
      data: {
        id: 'ShipmentInTransit',
        name: 'Shipment in transit',
        summary: 'Event that is emitted when a shipment is in transit.\n',
        version: '0.0.1',
        owners: [
          {
            id: 'dboyne',
          },
        ],
        schemaPath: 'schema.json',
      },
      body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe `ShipmentInTransit` event is emitted when a shipment is in transit. It provides information such as the shipment status (e.g., pending, completed, shipped), the items within the shipment, billing and shipping details, payment information, and the order\'s total amount. This query is commonly used by systems managing order processing, customer service, or order tracking functionalities.\n\nThis event can be applied in e-commerce systems, marketplaces, or any platform where users and systems need real-time shipment data for tracking, auditing, or managing customer purchases.\n\n<NodeGraph />\n\n<SchemaViewer file="schema.json" title="JSON Schema" maxHeight="500" />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/ShippingService/events/ShipmentInTransit/index.mdx',
      digest: '57803e3280f01326',
      deferredRender: true,
      collection: 'events',
    },
    {
      id: 'UserSubscriptionCancelled-0.0.1',
      data: {
        id: 'UserSubscriptionCancelled',
        name: 'User subscription cancelled',
        summary: 'An event that is triggered when a users subscription has been cancelled\n',
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
      body: "import Footer from '@catalog/components/footer.astro';\n\n## Overview\n\nThe `UserSubscriptionCancelled` event is triggered when a users subscription has been cancelled.\n\n## Architecture diagram\n\n<NodeGraph />\n\n<Footer />",
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Subscriptions/services/SubscriptionService/events/UserSubscriptionCancelled/index.mdx',
      digest: 'f4393a7ec584dfcb',
      deferredRender: true,
      collection: 'events',
    },
    {
      id: 'InventoryAdjusted-1.0.0',
      data: {
        id: 'InventoryAdjusted',
        name: 'Inventory adjusted',
        summary: 'Indicates a change in inventory level\n',
        version: '1.0.0',
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
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/events/InventoryAdjusted/versioned/1.0.0/index.mdx',
      digest: '154e74d94c13ff7f',
      deferredRender: true,
      collection: 'events',
    },
    {
      id: 'UserSubscriptionStarted-0.0.1',
      data: {
        id: 'UserSubscriptionStarted',
        name: 'User subscription started',
        summary: 'An event that is triggered when a new user subscription has started\n',
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
      body: "import Footer from '@catalog/components/footer.astro';\n\n## Overview\n\nThe `UserSubscriptionStarted` event is triggered when a user starts a new subscription with our service.\n\n## Architecture diagram\n\n<NodeGraph />\n\n<Footer />",
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Subscriptions/services/SubscriptionService/events/UserSubscriptionStarted/index.mdx',
      digest: '975a26dbf5b9579a',
      deferredRender: true,
      collection: 'events',
    },
    {
      id: 'InventoryAdjusted-0.0.1',
      data: {
        id: 'InventoryAdjusted',
        name: 'Inventory adjusted',
        summary: 'Indicates a change in inventory level\n',
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
      },
      body: ':::warning\nWhen firing this event make sure you set the `correlation-id` in the headers. Our schemas have standard metadata make sure you read and follow it.\n:::\n\n### Details\n\n<NodeGraph />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/events/InventoryAdjusted/versioned/0.0.1/index.mdx',
      digest: 'fa4f677953cd3546',
      deferredRender: true,
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
      body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe PaymentProcessed event is triggered after the payment has been successfully processed by the Payment Service. This event signifies that a payment has been confirmed, and it communicates the outcome to other services and components within the system.\n\n<NodeGraph />\n\n### Payload Example\n\n```json title="Payload example"\n{\n  "transactionId": "123e4567-e89b-12d3-a456-426614174000",\n  "userId": "123e4567-e89b-12d3-a456-426614174000",\n  "orderId": "789e1234-b56c-78d9-e012-3456789fghij",\n  "amount": 100.50,\n  "paymentMethod": "CreditCard",\n  "status": "confirmed",\n  "confirmationDetails": {\n    "gatewayResponse": "Approved",\n    "transactionId": "abc123"\n  },\n  "timestamp": "2024-07-04T14:48:00Z"\n}\n```\n\n### Security Considerations\n\n- **Data Validation**: Ensure that all data in the event payload is validated before publishing to prevent injection attacks or other malicious activities.\n- **Sensitive Data Handling**: Avoid including sensitive information (e.g., full credit card numbers) in the event payload. Use secure channels and encryption for such data.\n- **Authentication and Authorization**: Ensure that only authorized services can publish or consume PaymentProcessed events.\n\n<Footer />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Payment/services/PaymentService/events/PaymentProcessed/versioned/0.0.1/index.mdx',
      digest: '1b67685ce94288a6',
      deferredRender: true,
      collection: 'events',
    },
    {
      id: 'OutOfStock-0.0.1',
      data: {
        id: 'OutOfStock',
        name: 'Inventory out of stock',
        summary: 'Indicates inventory is out of stock\n',
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
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/events/OutOfStock/versioned/0.0.1/index.mdx',
      digest: '01f920ef8d292ab3',
      deferredRender: true,
      collection: 'events',
    },
  ],
  messages: {},
  commands: [
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
        summary: 'Command that will delete a given inventory item from the system\n',
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
      body: "import Footer from '@catalog/components/footer.astro';\n\n## Overview\n\nThe DeleteInventory command is issued to remove a product from the inventory system. This command is used by the inventory management system when a product needs to be completely removed from the warehouse or store catalog, typically due to discontinuation or permanent removal of the item.\n\n## Architecture diagram\n\n<NodeGraph />\n\n<Footer />",
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/commands/DeleteInventory/index.mdx',
      digest: '17b28d5ec21cc1f1',
      deferredRender: true,
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
        summary: 'Command that will add item to a given inventory id\n',
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
      body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe AddInventory command is issued to add new stock to the inventory. This command is used by the inventory management system to update the quantity of products available in the warehouse or store.\n\n## Architecture diagram\n\n<NodeGraph/>\n\n## Payload example\n\n```json title="Payload example"\n{\n  "productId": "789e1234-b56c-78d9-e012-3456789fghij",\n  "quantity": 50,\n  "warehouseId": "456e7891-c23d-45f6-b78a-123456789abc",\n  "timestamp": "2024-07-04T14:48:00Z"\n}\n\n```\n\n## Schema\n\n<Schema file="schema.json"/>\n\n<Footer />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/commands/AddInventory/index.mdx',
      digest: '106b7429daebcbb9',
      deferredRender: true,
      collection: 'commands',
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
        summary: 'Command that will update a given inventory item\n',
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
      body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe UpdateInventory command is issued to update the existing stock levels of a product in the inventory. This command is used by the inventory management system to adjust the quantity of products available in the warehouse or store, either by increasing or decreasing the current stock levels.\n\n## Architecture diagram\n\n<NodeGraph />\n\n<SchemaViewer file="schema.json" title="JSON Schema" maxHeight="500" />\n\n## Payload example\n\n```json title="Payload example"\n{\n  "productId": "789e1234-b56c-78d9-e012-3456789fghij",\n  "quantityChange": -10,\n  "warehouseId": "456e7891-c23d-45f6-b78a-123456789abc",\n  "timestamp": "2024-07-04T14:48:00Z"\n}\n```\n\n## Schema (JSON schema)\n\n<Schema file="schema.json"/>\n\n<Footer />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/commands/UpdateInventory/index.mdx',
      digest: '7a6aa4f22e442604',
      deferredRender: true,
      collection: 'commands',
    },
    {
      id: 'CancelShipment-0.0.1',
      data: {
        id: 'CancelShipment',
        name: 'Cancel shipment',
        summary: 'POST request that will cancel a shipment, identified by its shipmentId.\n',
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
      body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe `CancelShipment` message is a command used to cancel a shipment, identified by its `shipmentId`. It provides information such as the shipment status (e.g., pending, completed, shipped), the items within the shipment, billing and shipping details, payment information, and the order\'s total amount. This query is commonly used by systems managing order processing, customer service, or order tracking functionalities.\n\nThis command can be applied in e-commerce systems, marketplaces, or any platform where users and systems need real-time shipment data for tracking, auditing, or managing customer purchases.\n\n<SchemaViewer file="schema.json" title="Schema" maxHeight="500" />\n\n<NodeGraph />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/ShippingService/commands/CancelShipment/index.mdx',
      digest: '48d96360e9322568',
      deferredRender: true,
      collection: 'commands',
    },
    {
      id: 'UpdateShipmentStatus-0.0.1',
      data: {
        id: 'UpdateShipmentStatus',
        name: 'Update shipment status',
        summary: 'POST request that will update the status of a shipment, identified by its shipmentId.\n',
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
      body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe `UpdateShipmentStatus` message is a command used to update the status of a shipment, identified by its `shipmentId`. It provides information such as the shipment status (e.g., pending, completed, shipped), the items within the shipment, billing and shipping details, payment information, and the order\'s total amount. This query is commonly used by systems managing order processing, customer service, or order tracking functionalities.\n\nThis command can be applied in e-commerce systems, marketplaces, or any platform where users and systems need real-time shipment data for tracking, auditing, or managing customer purchases.\n\n<NodeGraph />\n\n<SchemaViewer file="schema.json" title="JSON Schema" maxHeight="500" />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/ShippingService/commands/UpdateShipmentStatus/index.mdx',
      digest: '73cf35e5d36acfd9',
      deferredRender: true,
      collection: 'commands',
    },
    {
      id: 'CreateShipment-0.0.1',
      data: {
        id: 'CreateShipment',
        name: 'Create shipment',
        summary: 'POST request that will create a shipment for a specific order, identified by its orderId.\n',
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
      body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe `CreateShipment` message is a command used to create a shipment for a specific order, identified by its `orderId`. It provides information such as the order status (e.g., pending, completed, shipped), the items within the order, billing and shipping details, payment information, and the order\'s total amount. This query is commonly used by systems managing order processing, customer service, or order tracking functionalities.\n\nThis command can be applied in e-commerce systems, marketplaces, or any platform where users and systems need real-time order data for tracking, auditing, or managing customer purchases.\n\n<NodeGraph />\n\n<SchemaViewer file="schema.json" title="JSON Schema" maxHeight="500" />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/ShippingService/commands/CreateShipment/index.mdx',
      digest: '98b8b56fe0d04090',
      deferredRender: true,
      collection: 'commands',
    },
    {
      id: 'PlaceOrder-0.0.1',
      data: {
        id: 'PlaceOrder',
        name: 'Place Order',
        summary: 'Command that will place an order\n',
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
      body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe Order Placement Command is a versatile and robust system designed to streamline the process of placing an order. This command takes care of all the essential details needed to complete a purchase, ensuring a smooth and efficient transaction from start to finish.\n\n## Architecture diagram\n\n<NodeGraph/>\n\n## Schema\n\n<SchemaViewer file="schema.json"/>\n\n<Footer />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/OrdersService/commands/PlaceOrder/index.mdx',
      digest: '19d07e3824d444da',
      deferredRender: true,
      collection: 'commands',
    },
    {
      id: 'CancelSubscription-0.0.1',
      data: {
        id: 'CancelSubscription',
        name: 'Cancel subscription',
        summary: 'Command that will try and cancel a users subscription\n',
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
      body: "import Footer from '@catalog/components/footer.astro';\n\n## Overview\n\nThe `CancelSubscription` command will try and cancel a subscription for the user.\n\n## Architecture diagram\n\n<NodeGraph />\n\n<Footer />",
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Subscriptions/services/SubscriptionService/commands/CancelSubscription/index.mdx',
      digest: 'ff2d317b58f56dbe',
      deferredRender: true,
      collection: 'commands',
    },
    {
      id: 'SubscribeUser-0.0.1',
      data: {
        id: 'SubscribeUser',
        name: 'Subscribe user',
        summary: 'Command that will try and subscribe a given user\n',
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
      body: "import Footer from '@catalog/components/footer.astro';\n\n## Overview\n\nThe `SubscribeUser` command represents when a new user wants to subscribe to our service.\n\n## Architecture diagram\n\n<NodeGraph />\n\n<Footer />",
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Subscriptions/services/SubscriptionService/commands/SubscribeUser/index.mdx',
      digest: 'a96417bf8e330295',
      deferredRender: true,
      collection: 'commands',
    },
    {
      id: 'CreateReturnLabel-0.0.1',
      data: {
        id: 'CreateReturnLabel',
        name: 'Create return label',
        summary:
          'POST request that will create a return label for a specific shipment, identified by its shipmentId.\n',
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
      body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe `CreateReturnLabel` message is a command used to create a return label for a specific shipment, identified by its `shipmentId`. It provides information such as the shipment status (e.g., pending, completed, shipped), the items within the shipment, billing and shipping details, payment information, and the order\'s total amount. This query is commonly used by systems managing order processing, customer service, or order tracking functionalities.\n\nThis command can be applied in e-commerce systems, marketplaces, or any platform where users and systems need real-time shipment data for tracking, auditing, or managing customer purchases.\n\n<NodeGraph />\n\n<SchemaViewer file="schema.json" title="JSON Schema" maxHeight="500" />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/ShippingService/commands/CreateReturnLabel/index.mdx',
      digest: '0a834e6a2e68b14a',
      deferredRender: true,
      collection: 'commands',
    },
  ],
  queries: [
    {
      "id": "CancelSubscription-1.0.0",
      "data": {
        "steps": [
          {
            "id": "cancel_subscription_initiated",
            "title": "Cancels Subscription",
            "summary": "User cancels their subscription",
            "actor": {
              "name": "User"
            },
            "next_step": {
              "id": "cancel_subscription_request",
              "label": "Initiate subscription cancellation"
            }
          },
          {
            "id": "cancel_subscription_request",
            "title": "Cancel Subscription",
            "message": {
              "id": "CancelSubscription",
              "version": "0.0.1"
            },
            "next_step": {
              "id": "subscription_service",
              "label": "Proceed to subscription service"
            }
          },
          {
            "id": "stripe_integration",
            "title": "Stripe",
            "externalSystem": {
              "name": "Stripe",
              "summary": "3rd party payment system",
              "url": "https://stripe.com/"
            },
            "next_step": {
              "id": "subscription_service",
              "label": "Return to subscription service"
            }
          },
          {
            "id": "subscription_service",
            "title": "Subscription Service",
            "service": {
              "id": "SubscriptionService",
              "version": "0.0.1"
            },
            "next_steps": [
              {
                "id": "stripe_integration",
                "label": "Cancel subscription via Stripe"
              },
              {
                "id": "subscription_cancelled",
                "label": "Successful cancellation"
              },
              {
                "id": "subscription_rejected",
                "label": "Failed cancellation"
              }
            ]
          },
          {
            "id": "subscription_cancelled",
            "title": "Subscription has been Cancelled",
            "message": {
              "id": "UserSubscriptionCancelled",
              "version": "0.0.1"
            },
            "next_step": {
              "id": "notification_service",
              "label": "Email customer"
            }
          },
          {
            "id": "subscription_rejected",
            "title": "Subscription cancellation has been rejected"
          },
          {
            "id": "notification_service",
            "title": "Notifications Service",
            "service": {
              "id": "NotificationService",
              "version": "0.0.2"
            }
          }
        ],
        "id": "CancelSubscription",
        "name": "User Cancels Subscription",
        "summary": "Flow for when a user has cancelled a subscription",
        "version": "1.0.0",
        "owners": [
          {
            "id": "subscriptions-management"
          }
        ]
      },
      "body": "<NodeGraph />",
      "filePath": "../examples/default/domains/E-Commerce/subdomains/Subscriptions/flows/CancelSubscription/index.mdx",
      "digest": "a5451a875f5326d4",
      "deferredRender": true,
      "collection": "flows"
    },
    {
      "id": "PaymentFlow-1.0.0",
      "data": {
        "steps": [
          {
            "id": "flow_step",
            "title": "Flow Step",
            "flow": {
              "id": "SubscriptionRenewed",
              "version": "latest"
            },
            "next_step": {
              "id": "place_order_request",
              "label": "Subscription Renewed, New Order Placed"
            }
          },
          {
            "id": "place_order_request",
            "title": "Place order",
            "message": {
              "id": "PlaceOrder",
              "version": "0.0.1"
            },
            "next_step": {
              "id": "payment_initiated",
              "label": "Initiate payment"
            }
          },
          {
            "id": "payment_initiated",
            "title": "Payment Initiated",
            "message": {
              "id": "PaymentInitiated",
              "version": "0.0.1"
            },
            "next_steps": [
              "payment_processed",
              "payment_failed"
            ]
          },
          {
            "id": "payment_processed",
            "title": "Payment Processed",
            "message": {
              "id": "PaymentProcessed",
              "version": "0.0.1"
            },
            "next_steps": [
              {
                "id": "adjust_inventory",
                "label": "Adjust inventory"
              },
              {
                "id": "send_custom_notification",
                "label": "Notify customer"
              }
            ]
          },
          {
            "id": "payment_failed",
            "type": "node",
            "title": "Payment Failed",
            "next_steps": [
              {
                "id": "failure_notification",
                "label": "Notify customer of failure"
              },
              {
                "id": "retry_payment",
                "label": "Retry payment"
              }
            ]
          },
          {
            "id": "adjust_inventory",
            "title": "Inventory Adjusted",
            "message": {
              "id": "InventoryAdjusted",
              "version": "1.0.1"
            },
            "next_step": {
              "id": "payment_complete",
              "label": "Complete order"
            }
          },
          {
            "id": "send_custom_notification",
            "type": "node",
            "title": "Customer Notified of Payment",
            "next_step": {
              "id": "payment_complete",
              "label": "Complete order"
            }
          },
          {
            "id": "failure_notification",
            "type": "node",
            "title": "Customer Notified of Failure"
          },
          {
            "id": "retry_payment",
            "type": "node",
            "title": "Retry Payment",
            "next_step": {
              "id": "payment_initiated",
              "label": "Retry payment process"
            }
          },
          {
            "id": "payment_complete",
            "title": "Payment Complete",
            "message": {
              "id": "PaymentComplete",
              "version": "0.0.2"
            },
            "next_step": {
              "id": "order-complete",
              "label": "Order completed"
            }
          },
          {
            "id": "order-complete",
            "type": "node",
            "title": "Order Completed"
          }
        ],
        "id": "PaymentFlow",
        "name": "Payment Flow for customers",
        "summary": "Business flow for processing payments in an e-commerce platform",
        "version": "1.0.0",
        "owners": [
          {
            "id": "dboyne"
          }
        ]
      },
      "body": "### Flow of feature\n<NodeGraph />",
      "filePath": "../examples/default/domains/E-Commerce/subdomains/Payment/flows/PaymentProcessed/index.mdx",
      "digest": "aea61d5977e014a1",
      "deferredRender": true,
      "collection": "flows"
    },
    {
      "id": "CancelSubscription-0.0.1",
      "data": {
        "steps": [
          {
            "id": "cancel_subscription_initiated",
            "title": "Cancels Subscription",
            "summary": "User cancels their subscription",
            "actor": {
              "name": "User"
            },
            "next_step": {
              "id": "cancel_subscription_request",
              "label": "Initiate subscription cancellation"
            }
          },
          {
            "id": "cancel_subscription_request",
            "title": "Cancel Subscription",
            "message": {
              "id": "CancelSubscription",
              "version": "0.0.1"
            },
            "next_step": {
              "id": "subscription_service",
              "label": "Proceed to subscription service"
            }
          },
          {
            "id": "stripe_integration",
            "title": "Stripe",
            "externalSystem": {
              "name": "Stripe",
              "summary": "3rd party payment system",
              "url": "https://stripe.com/"
            },
            "next_step": {
              "id": "subscription_service",
              "label": "Return to subscription service"
            }
          },
          {
            "id": "subscription_service",
            "title": "Subscription Service",
            "service": {
              "id": "SubscriptionService",
              "version": "0.0.1"
            },
            "next_steps": [
              {
                "id": "stripe_integration",
                "label": "Cancel subscription via Stripe"
              },
              {
                "id": "subscription_cancelled",
                "label": "Successful cancellation"
              },
              {
                "id": "subscription_rejected",
                "label": "Failed cancellation"
              }
            ]
          }
        ],
        "id": "CancelSubscription",
        "name": "User Cancels Subscription",
        "summary": "Flow for when a user has cancelled a subscription",
        "version": "0.0.1",
        "owners": [
          {
            "id": "subscriptions-management"
          }
        ]
      },
      "body": "<NodeGraph />",
      "filePath": "../examples/default/domains/E-Commerce/subdomains/Subscriptions/flows/CancelSubscription/versioned/0.0.1/index.mdx",
      "digest": "9f7066e31241beee",
      "deferredRender": true,
      "collection": "flows"
    },
    {
      "id": "SubscriptionRenewed-1.0.0",
      "data": {
        "steps": [
          {
            "id": "renewal_timer_triggered",
            "title": "Renewal Period Reached",
            "custom": {
              "title": "Renewal Timer",
              "icon": "ClockIcon",
              "type": "Scheduler",
              "summary": "Automated timer triggers the subscription renewal process",
              "color": "orange",
              "properties": {
                "subscription_id": "sub_12345678",
                "renewal_type": "Automatic",
                "billing_cycle": "Monthly",
                "next_billing_date": "2024-08-01"
              },
              "height": 8,
              "menu": [
                {
                  "label": "View scheduler configuration",
                  "url": "https://docs.example.com/scheduler"
                },
                {
                  "label": "Subscription timing documentation",
                  "url": "https://docs.example.com/subscription-timing"
                }
              ]
            },
            "next_step": {
              "id": "check_subscription_status",
              "label": "Verify subscription status"
            }
          },
          {
            "id": "check_subscription_status",
            "title": "Check Subscription Status",
            "service": {
              "id": "SubscriptionService",
              "version": "0.0.1"
            },
            "next_steps": [
              {
                "id": "payment_approval_check",
                "label": "Subscription active, proceed to payment"
              },
              {
                "id": "subscription_expired",
                "label": "Subscription has expired"
              },
              {
                "id": "subscription_canceled",
                "label": "Subscription was canceled"
              }
            ]
          },
          {
            "id": "subscription_expired",
            "type": "node",
            "title": "Subscription Expired",
            "next_step": {
              "id": "send_renewal_notification",
              "label": "Notify customer to renew"
            }
          },
          {
            "id": "subscription_canceled",
            "type": "node",
            "title": "Subscription Canceled",
            "next_step": {
              "id": "send_reactivation_offer",
              "label": "Send special reactivation offer"
            }
          },
          {
            "id": "send_renewal_notification",
            "title": "Send Renewal Notification",
            "service": {
              "id": "NotificationService",
              "version": "0.0.2"
            },
            "next_step": {
              "id": "await_customer_action",
              "label": "Wait for customer response"
            }
          },
          {
            "id": "send_reactivation_offer",
            "title": "Send Reactivation Offer",
            "service": {
              "id": "NotificationService",
              "version": "0.0.2"
            },
            "next_step": {
              "id": "await_customer_action",
              "label": "Wait for customer response"
            }
          },
          {
            "id": "await_customer_action",
            "title": "Await Customer Action",
            "custom": {
              "title": "Customer Decision Point",
              "icon": "UserIcon",
              "type": "Decision",
              "summary": "Waiting period for customer to take action on notification",
              "color": "purple",
              "properties": {
                "timeout_period": "7 days",
                "options": "Renew, Upgrade, Cancel, Ignore"
              },
              "height": 8
            },
            "next_steps": [
              {
                "id": "manual_renewal_flow",
                "label": "Customer manually renews"
              },
              {
                "id": "flow_ends",
                "label": "No action taken"
              }
            ]
          },
          {
            "id": "manual_renewal_flow",
            "type": "node",
            "title": "Manual Renewal Flow",
            "next_step": {
              "id": "payment_initiated",
              "label": "Process payment"
            }
          },
          {
            "id": "payment_approval_check",
            "title": "Check Payment Approval",
            "message": {
              "id": "GetPaymentStatus",
              "version": "0.0.1"
            },
            "next_steps": [
              {
                "id": "payment_initiated",
                "label": "Payment approved, proceed with billing"
              },
              {
                "id": "payment_method_invalid",
                "label": "Invalid payment method"
              }
            ]
          },
          {
            "id": "payment_method_invalid",
            "type": "node",
            "title": "Invalid Payment Method",
            "next_step": {
              "id": "request_payment_update",
              "label": "Request updated payment method"
            }
          },
          {
            "id": "request_payment_update",
            "title": "Request Payment Update",
            "service": {
              "id": "NotificationService",
              "version": "0.0.2"
            },
            "next_step": {
              "id": "await_updated_payment",
              "label": "Wait for payment update"
            }
          },
          {
            "id": "await_updated_payment",
            "title": "Await Updated Payment Method",
            "actor": {
              "name": "Customer"
            },
            "next_steps": [
              {
                "id": "payment_initiated",
                "label": "Payment method updated"
              },
              {
                "id": "subscription_grace_period",
                "label": "No update received"
              }
            ]
          },
          {
            "id": "subscription_grace_period",
            "title": "Grace Period",
            "custom": {
              "title": "Subscription Grace Period",
              "icon": "ShieldExclamationIcon",
              "type": "Timer",
              "summary": "Limited period where subscription remains active despite payment failure",
              "color": "yellow",
              "properties": {
                "duration": "7 days",
                "status": "At risk"
              }
            },
            "next_steps": [
              {
                "id": "payment_initiated",
                "label": "Payment updated during grace period"
              },
              {
                "id": "subscription_suspended",
                "label": "Grace period expired"
              }
            ]
          },
          {
            "id": "subscription_suspended",
            "title": "Subscription Suspended",
            "message": {
              "id": "UserSubscriptionCancelled",
              "version": "0.0.1"
            },
            "next_step": {
              "id": "send_suspension_notification",
              "label": "Notify customer of suspension"
            }
          },
          {
            "id": "send_suspension_notification",
            "title": "Send Suspension Notification",
            "service": {
              "id": "NotificationService",
              "version": "0.0.2"
            },
            "next_step": {
              "id": "flow_ends",
              "label": "Flow ends"
            }
          },
          {
            "id": "payment_initiated",
            "title": "Process Payment",
            "message": {
              "id": "PaymentInitiated",
              "version": "0.0.1"
            },
            "next_step": {
              "id": "payment_gateway",
              "label": "Send to payment gateway"
            }
          },
          {
            "id": "payment_gateway",
            "title": "Payment Gateway",
            "externalSystem": {
              "name": "Stripe",
              "summary": "3rd party payment processor",
              "url": "https://stripe.com/"
            },
            "next_steps": [
              {
                "id": "payment_processed",
                "label": "Payment successful"
              },
              {
                "id": "payment_failed",
                "label": "Payment failed"
              }
            ]
          },
          {
            "id": "payment_failed",
            "type": "node",
            "title": "Payment Failed",
            "next_step": {
              "id": "retry_payment",
              "label": "Retry payment"
            }
          },
          {
            "id": "retry_payment",
            "title": "Retry Payment",
            "custom": {
              "title": "Payment Retry Logic",
              "icon": "ArrowPathIcon",
              "type": "Processor",
              "summary": "Automated retry logic for failed payments",
              "color": "red",
              "properties": {
                "max_attempts": 3,
                "backoff_interval": "24 hours",
                "current_attempt": 1
              }
            },
            "next_steps": [
              {
                "id": "payment_initiated",
                "label": "Retry payment"
              },
              {
                "id": "subscription_grace_period",
                "label": "Max retries exceeded"
              }
            ]
          },
          {
            "id": "payment_processed",
            "title": "Payment Processed",
            "message": {
              "id": "PaymentProcessed",
              "version": "1.0.0"
            },
            "next_step": {
              "id": "update_subscription_status",
              "label": "Update subscription"
            }
          },
          {
            "id": "update_subscription_status",
            "title": "Update Subscription",
            "service": {
              "id": "SubscriptionService",
              "version": "0.0.1"
            },
            "next_step": {
              "id": "send_renewal_confirmation",
              "label": "Confirm renewal to customer"
            }
          },
          {
            "id": "send_renewal_confirmation",
            "title": "Send Renewal Confirmation",
            "service": {
              "id": "NotificationService",
              "version": "0.0.2"
            },
            "next_step": {
              "id": "analyze_customer_usage",
              "label": "Analyze customer usage patterns"
            }
          },
          {
            "id": "analyze_customer_usage",
            "title": "Analyze Usage Patterns",
            "custom": {
              "title": "Usage Analytics",
              "icon": "ChartBarIcon",
              "type": "Analytics",
              "summary": "Analyze customer usage patterns to identify upsell opportunities",
              "color": "blue",
              "properties": {
                "metrics_analyzed": "Feature usage, Resource consumption, Access patterns",
                "lookback_period": "90 days"
              },
              "menu": [
                {
                  "label": "View analytics dashboard",
                  "url": "https://analytics.example.com/subscriptions"
                },
                {
                  "label": "Documentation",
                  "url": "https://docs.example.com/analytics"
                }
              ]
            },
            "next_steps": [
              {
                "id": "send_upgrade_recommendation",
                "label": "Usage suggests upgrade opportunity"
              },
              {
                "id": "flow_ends",
                "label": "No upgrade opportunity identified"
              }
            ]
          },
          {
            "id": "send_upgrade_recommendation",
            "title": "Send Upgrade Recommendation",
            "service": {
              "id": "NotificationService",
              "version": "0.0.2"
            },
            "next_step": {
              "id": "flow_ends",
              "label": "Flow completed"
            }
          },
          {
            "id": "flow_ends",
            "type": "node",
            "title": "Flow Completed"
          }
        ],
        "id": "SubscriptionRenewed",
        "name": "Subscription Renewal Flow",
        "summary": "Business flow for automatic subscription renewals and related processes",
        "version": "1.0.0",
        "owners": [
          {
            "id": "subscriptions-management"
          }
        ]
      },
      "body": "## Subscription Renewal Flow\n\nThis flow documents the process of automatic subscription renewals, including handling various edge cases such as payment failures, expired subscriptions, and customer interactions.\n\n<NodeGraph />\n\n### Key Components\n\n* **Automatic Renewal Process**: Triggered by a scheduled timer when the subscription renewal period is reached\n* **Payment Processing**: Integration with payment gateway and handling of payment failures\n* **Customer Notifications**: Various notifications sent throughout the process\n* **Grace Period Handling**: Special handling when payments fail with a grace period before subscription suspension\n* **Usage Analytics**: Analysis of customer usage patterns to identify upgrade opportunities\n\n### Business Rules\n\n1. Subscriptions are renewed automatically unless explicitly canceled\n2. Failed payments trigger a retry process (up to 3 attempts)\n3. Customers receive a 7-day grace period before subscription suspension\n4. Usage patterns are analyzed to provide personalized upgrade recommendations",
      "filePath": "../examples/default/domains/E-Commerce/subdomains/Subscriptions/flows/SubscriptionRenewed/index.mdx",
      "digest": "c8f29ec346445de8",
      "deferredRender": true,
      "collection": "flows"
    }
  ],
  flows: [
    {
      "id": "CancelSubscription-1.0.0",
      "data": {
        "steps": [
          {
            "id": "cancel_subscription_initiated",
            "title": "Cancels Subscription",
            "summary": "User cancels their subscription",
            "actor": {
              "name": "User"
            },
            "next_step": {
              "id": "cancel_subscription_request",
              "label": "Initiate subscription cancellation"
            }
          },
          {
            "id": "cancel_subscription_request",
            "title": "Cancel Subscription",
            "message": {
              "id": "CancelSubscription",
              "version": "0.0.1"
            },
            "next_step": {
              "id": "subscription_service",
              "label": "Proceed to subscription service"
            }
          },
          {
            "id": "stripe_integration",
            "title": "Stripe",
            "externalSystem": {
              "name": "Stripe",
              "summary": "3rd party payment system",
              "url": "https://stripe.com/"
            },
            "next_step": {
              "id": "subscription_service",
              "label": "Return to subscription service"
            }
          },
          {
            "id": "subscription_service",
            "title": "Subscription Service",
            "service": {
              "id": "SubscriptionService",
              "version": "0.0.1"
            },
            "next_steps": [
              {
                "id": "stripe_integration",
                "label": "Cancel subscription via Stripe"
              },
              {
                "id": "subscription_cancelled",
                "label": "Successful cancellation"
              },
              {
                "id": "subscription_rejected",
                "label": "Failed cancellation"
              }
            ]
          },
          {
            "id": "subscription_cancelled",
            "title": "Subscription has been Cancelled",
            "message": {
              "id": "UserSubscriptionCancelled",
              "version": "0.0.1"
            },
            "next_step": {
              "id": "notification_service",
              "label": "Email customer"
            }
          },
          {
            "id": "subscription_rejected",
            "title": "Subscription cancellation has been rejected"
          },
          {
            "id": "notification_service",
            "title": "Notifications Service",
            "service": {
              "id": "NotificationService",
              "version": "0.0.2"
            }
          }
        ],
        "id": "CancelSubscription",
        "name": "User Cancels Subscription",
        "summary": "Flow for when a user has cancelled a subscription",
        "version": "1.0.0",
        "owners": [
          {
            "id": "subscriptions-management"
          }
        ]
      },
      "body": "<NodeGraph />",
      "filePath": "../examples/default/domains/E-Commerce/subdomains/Subscriptions/flows/CancelSubscription/index.mdx",
      "digest": "a5451a875f5326d4",
      "deferredRender": true,
      "collection": "flows"
    },
    {
      "id": "PaymentFlow-1.0.0",
      "data": {
        "steps": [
          {
            "id": "flow_step",
            "title": "Flow Step",
            "flow": {
              "id": "SubscriptionRenewed",
              "version": "latest"
            },
            "next_step": {
              "id": "place_order_request",
              "label": "Subscription Renewed, New Order Placed"
            }
          },
          {
            "id": "place_order_request",
            "title": "Place order",
            "message": {
              "id": "PlaceOrder",
              "version": "0.0.1"
            },
            "next_step": {
              "id": "payment_initiated",
              "label": "Initiate payment"
            }
          },
          {
            "id": "payment_initiated",
            "title": "Payment Initiated",
            "message": {
              "id": "PaymentInitiated",
              "version": "0.0.1"
            },
            "next_steps": [
              "payment_processed",
              "payment_failed"
            ]
          },
          {
            "id": "payment_processed",
            "title": "Payment Processed",
            "message": {
              "id": "PaymentProcessed",
              "version": "0.0.1"
            },
            "next_steps": [
              {
                "id": "adjust_inventory",
                "label": "Adjust inventory"
              },
              {
                "id": "send_custom_notification",
                "label": "Notify customer"
              }
            ]
          },
          {
            "id": "payment_failed",
            "type": "node",
            "title": "Payment Failed",
            "next_steps": [
              {
                "id": "failure_notification",
                "label": "Notify customer of failure"
              },
              {
                "id": "retry_payment",
                "label": "Retry payment"
              }
            ]
          },
          {
            "id": "adjust_inventory",
            "title": "Inventory Adjusted",
            "message": {
              "id": "InventoryAdjusted",
              "version": "1.0.1"
            },
            "next_step": {
              "id": "payment_complete",
              "label": "Complete order"
            }
          },
          {
            "id": "send_custom_notification",
            "type": "node",
            "title": "Customer Notified of Payment",
            "next_step": {
              "id": "payment_complete",
              "label": "Complete order"
            }
          },
          {
            "id": "failure_notification",
            "type": "node",
            "title": "Customer Notified of Failure"
          },
          {
            "id": "retry_payment",
            "type": "node",
            "title": "Retry Payment",
            "next_step": {
              "id": "payment_initiated",
              "label": "Retry payment process"
            }
          },
          {
            "id": "payment_complete",
            "title": "Payment Complete",
            "message": {
              "id": "PaymentComplete",
              "version": "0.0.2"
            },
            "next_step": {
              "id": "order-complete",
              "label": "Order completed"
            }
          },
          {
            "id": "order-complete",
            "type": "node",
            "title": "Order Completed"
          }
        ],
        "id": "PaymentFlow",
        "name": "Payment Flow for customers",
        "summary": "Business flow for processing payments in an e-commerce platform",
        "version": "1.0.0",
        "owners": [
          {
            "id": "dboyne"
          }
        ]
      },
      "body": "### Flow of feature\n<NodeGraph />",
      "filePath": "../examples/default/domains/E-Commerce/subdomains/Payment/flows/PaymentProcessed/index.mdx",
      "digest": "aea61d5977e014a1",
      "deferredRender": true,
      "collection": "flows"
    },
    {
      "id": "CancelSubscription-0.0.1",
      "data": {
        "steps": [
          {
            "id": "cancel_subscription_initiated",
            "title": "Cancels Subscription",
            "summary": "User cancels their subscription",
            "actor": {
              "name": "User"
            },
            "next_step": {
              "id": "cancel_subscription_request",
              "label": "Initiate subscription cancellation"
            }
          },
          {
            "id": "cancel_subscription_request",
            "title": "Cancel Subscription",
            "message": {
              "id": "CancelSubscription",
              "version": "0.0.1"
            },
            "next_step": {
              "id": "subscription_service",
              "label": "Proceed to subscription service"
            }
          },
          {
            "id": "stripe_integration",
            "title": "Stripe",
            "externalSystem": {
              "name": "Stripe",
              "summary": "3rd party payment system",
              "url": "https://stripe.com/"
            },
            "next_step": {
              "id": "subscription_service",
              "label": "Return to subscription service"
            }
          },
          {
            "id": "subscription_service",
            "title": "Subscription Service",
            "service": {
              "id": "SubscriptionService",
              "version": "0.0.1"
            },
            "next_steps": [
              {
                "id": "stripe_integration",
                "label": "Cancel subscription via Stripe"
              },
              {
                "id": "subscription_cancelled",
                "label": "Successful cancellation"
              },
              {
                "id": "subscription_rejected",
                "label": "Failed cancellation"
              }
            ]
          }
        ],
        "id": "CancelSubscription",
        "name": "User Cancels Subscription",
        "summary": "Flow for when a user has cancelled a subscription",
        "version": "0.0.1",
        "owners": [
          {
            "id": "subscriptions-management"
          }
        ]
      },
      "body": "<NodeGraph />",
      "filePath": "../examples/default/domains/E-Commerce/subdomains/Subscriptions/flows/CancelSubscription/versioned/0.0.1/index.mdx",
      "digest": "9f7066e31241beee",
      "deferredRender": true,
      "collection": "flows"
    },
    {
      "id": "SubscriptionRenewed-1.0.0",
      "data": {
        "steps": [
          {
            "id": "renewal_timer_triggered",
            "title": "Renewal Period Reached",
            "custom": {
              "title": "Renewal Timer",
              "icon": "ClockIcon",
              "type": "Scheduler",
              "summary": "Automated timer triggers the subscription renewal process",
              "color": "orange",
              "properties": {
                "subscription_id": "sub_12345678",
                "renewal_type": "Automatic",
                "billing_cycle": "Monthly",
                "next_billing_date": "2024-08-01"
              },
              "height": 8,
              "menu": [
                {
                  "label": "View scheduler configuration",
                  "url": "https://docs.example.com/scheduler"
                },
                {
                  "label": "Subscription timing documentation",
                  "url": "https://docs.example.com/subscription-timing"
                }
              ]
            },
            "next_step": {
              "id": "check_subscription_status",
              "label": "Verify subscription status"
            }
          },
          {
            "id": "check_subscription_status",
            "title": "Check Subscription Status",
            "service": {
              "id": "SubscriptionService",
              "version": "0.0.1"
            },
            "next_steps": [
              {
                "id": "payment_approval_check",
                "label": "Subscription active, proceed to payment"
              },
              {
                "id": "subscription_expired",
                "label": "Subscription has expired"
              },
              {
                "id": "subscription_canceled",
                "label": "Subscription was canceled"
              }
            ]
          },
          {
            "id": "subscription_expired",
            "type": "node",
            "title": "Subscription Expired",
            "next_step": {
              "id": "send_renewal_notification",
              "label": "Notify customer to renew"
            }
          },
          {
            "id": "subscription_canceled",
            "type": "node",
            "title": "Subscription Canceled",
            "next_step": {
              "id": "send_reactivation_offer",
              "label": "Send special reactivation offer"
            }
          },
          {
            "id": "send_renewal_notification",
            "title": "Send Renewal Notification",
            "service": {
              "id": "NotificationService",
              "version": "0.0.2"
            },
            "next_step": {
              "id": "await_customer_action",
              "label": "Wait for customer response"
            }
          },
          {
            "id": "send_reactivation_offer",
            "title": "Send Reactivation Offer",
            "service": {
              "id": "NotificationService",
              "version": "0.0.2"
            },
            "next_step": {
              "id": "await_customer_action",
              "label": "Wait for customer response"
            }
          },
          {
            "id": "await_customer_action",
            "title": "Await Customer Action",
            "custom": {
              "title": "Customer Decision Point",
              "icon": "UserIcon",
              "type": "Decision",
              "summary": "Waiting period for customer to take action on notification",
              "color": "purple",
              "properties": {
                "timeout_period": "7 days",
                "options": "Renew, Upgrade, Cancel, Ignore"
              },
              "height": 8
            },
            "next_steps": [
              {
                "id": "manual_renewal_flow",
                "label": "Customer manually renews"
              },
              {
                "id": "flow_ends",
                "label": "No action taken"
              }
            ]
          },
          {
            "id": "manual_renewal_flow",
            "type": "node",
            "title": "Manual Renewal Flow",
            "next_step": {
              "id": "payment_initiated",
              "label": "Process payment"
            }
          },
          {
            "id": "payment_approval_check",
            "title": "Check Payment Approval",
            "message": {
              "id": "GetPaymentStatus",
              "version": "0.0.1"
            },
            "next_steps": [
              {
                "id": "payment_initiated",
                "label": "Payment approved, proceed with billing"
              },
              {
                "id": "payment_method_invalid",
                "label": "Invalid payment method"
              }
            ]
          },
          {
            "id": "payment_method_invalid",
            "type": "node",
            "title": "Invalid Payment Method",
            "next_step": {
              "id": "request_payment_update",
              "label": "Request updated payment method"
            }
          },
          {
            "id": "request_payment_update",
            "title": "Request Payment Update",
            "service": {
              "id": "NotificationService",
              "version": "0.0.2"
            },
            "next_step": {
              "id": "await_updated_payment",
              "label": "Wait for payment update"
            }
          },
          {
            "id": "await_updated_payment",
            "title": "Await Updated Payment Method",
            "actor": {
              "name": "Customer"
            },
            "next_steps": [
              {
                "id": "payment_initiated",
                "label": "Payment method updated"
              },
              {
                "id": "subscription_grace_period",
                "label": "No update received"
              }
            ]
          },
          {
            "id": "subscription_grace_period",
            "title": "Grace Period",
            "custom": {
              "title": "Subscription Grace Period",
              "icon": "ShieldExclamationIcon",
              "type": "Timer",
              "summary": "Limited period where subscription remains active despite payment failure",
              "color": "yellow",
              "properties": {
                "duration": "7 days",
                "status": "At risk"
              }
            },
            "next_steps": [
              {
                "id": "payment_initiated",
                "label": "Payment updated during grace period"
              },
              {
                "id": "subscription_suspended",
                "label": "Grace period expired"
              }
            ]
          },
          {
            "id": "subscription_suspended",
            "title": "Subscription Suspended",
            "message": {
              "id": "UserSubscriptionCancelled",
              "version": "0.0.1"
            },
            "next_step": {
              "id": "send_suspension_notification",
              "label": "Notify customer of suspension"
            }
          },
          {
            "id": "send_suspension_notification",
            "title": "Send Suspension Notification",
            "service": {
              "id": "NotificationService",
              "version": "0.0.2"
            },
            "next_step": {
              "id": "flow_ends",
              "label": "Flow ends"
            }
          },
          {
            "id": "payment_initiated",
            "title": "Process Payment",
            "message": {
              "id": "PaymentInitiated",
              "version": "0.0.1"
            },
            "next_step": {
              "id": "payment_gateway",
              "label": "Send to payment gateway"
            }
          },
          {
            "id": "payment_gateway",
            "title": "Payment Gateway",
            "externalSystem": {
              "name": "Stripe",
              "summary": "3rd party payment processor",
              "url": "https://stripe.com/"
            },
            "next_steps": [
              {
                "id": "payment_processed",
                "label": "Payment successful"
              },
              {
                "id": "payment_failed",
                "label": "Payment failed"
              }
            ]
          },
          {
            "id": "payment_failed",
            "type": "node",
            "title": "Payment Failed",
            "next_step": {
              "id": "retry_payment",
              "label": "Retry payment"
            }
          },
          {
            "id": "retry_payment",
            "title": "Retry Payment",
            "custom": {
              "title": "Payment Retry Logic",
              "icon": "ArrowPathIcon",
              "type": "Processor",
              "summary": "Automated retry logic for failed payments",
              "color": "red",
              "properties": {
                "max_attempts": 3,
                "backoff_interval": "24 hours",
                "current_attempt": 1
              }
            },
            "next_steps": [
              {
                "id": "payment_initiated",
                "label": "Retry payment"
              },
              {
                "id": "subscription_grace_period",
                "label": "Max retries exceeded"
              }
            ]
          },
          {
            "id": "payment_processed",
            "title": "Payment Processed",
            "message": {
              "id": "PaymentProcessed",
              "version": "1.0.0"
            },
            "next_step": {
              "id": "update_subscription_status",
              "label": "Update subscription"
            }
          },
          {
            "id": "update_subscription_status",
            "title": "Update Subscription",
            "service": {
              "id": "SubscriptionService",
              "version": "0.0.1"
            },
            "next_step": {
              "id": "send_renewal_confirmation",
              "label": "Confirm renewal to customer"
            }
          },
          {
            "id": "send_renewal_confirmation",
            "title": "Send Renewal Confirmation",
            "service": {
              "id": "NotificationService",
              "version": "0.0.2"
            },
            "next_step": {
              "id": "analyze_customer_usage",
              "label": "Analyze customer usage patterns"
            }
          },
          {
            "id": "analyze_customer_usage",
            "title": "Analyze Usage Patterns",
            "custom": {
              "title": "Usage Analytics",
              "icon": "ChartBarIcon",
              "type": "Analytics",
              "summary": "Analyze customer usage patterns to identify upsell opportunities",
              "color": "blue",
              "properties": {
                "metrics_analyzed": "Feature usage, Resource consumption, Access patterns",
                "lookback_period": "90 days"
              },
              "menu": [
                {
                  "label": "View analytics dashboard",
                  "url": "https://analytics.example.com/subscriptions"
                },
                {
                  "label": "Documentation",
                  "url": "https://docs.example.com/analytics"
                }
              ]
            },
            "next_steps": [
              {
                "id": "send_upgrade_recommendation",
                "label": "Usage suggests upgrade opportunity"
              },
              {
                "id": "flow_ends",
                "label": "No upgrade opportunity identified"
              }
            ]
          },
          {
            "id": "send_upgrade_recommendation",
            "title": "Send Upgrade Recommendation",
            "service": {
              "id": "NotificationService",
              "version": "0.0.2"
            },
            "next_step": {
              "id": "flow_ends",
              "label": "Flow completed"
            }
          },
          {
            "id": "flow_ends",
            "type": "node",
            "title": "Flow Completed"
          }
        ],
        "id": "SubscriptionRenewed",
        "name": "Subscription Renewal Flow",
        "summary": "Business flow for automatic subscription renewals and related processes",
        "version": "1.0.0",
        "owners": [
          {
            "id": "subscriptions-management"
          }
        ]
      },
      "body": "## Subscription Renewal Flow\n\nThis flow documents the process of automatic subscription renewals, including handling various edge cases such as payment failures, expired subscriptions, and customer interactions.\n\n<NodeGraph />\n\n### Key Components\n\n* **Automatic Renewal Process**: Triggered by a scheduled timer when the subscription renewal period is reached\n* **Payment Processing**: Integration with payment gateway and handling of payment failures\n* **Customer Notifications**: Various notifications sent throughout the process\n* **Grace Period Handling**: Special handling when payments fail with a grace period before subscription suspension\n* **Usage Analytics**: Analysis of customer usage patterns to identify upgrade opportunities\n\n### Business Rules\n\n1. Subscriptions are renewed automatically unless explicitly canceled\n2. Failed payments trigger a retry process (up to 3 attempts)\n3. Customers receive a 7-day grace period before subscription suspension\n4. Usage patterns are analyzed to provide personalized upgrade recommendations",
      "filePath": "../examples/default/domains/E-Commerce/subdomains/Subscriptions/flows/SubscriptionRenewed/index.mdx",
      "digest": "c8f29ec346445de8",
      "deferredRender": true,
      "collection": "flows"
    }
  ],
  entities: [
    {
      "id": "Invoice-1.0.0",
      "data": {
        "identifier": "invoiceId",
        "properties": [
          {
            "name": "invoiceId",
            "type": "UUID",
            "required": true,
            "description": "Unique identifier for the invoice."
          },
          {
            "name": "customerId",
            "type": "UUID",
            "required": true,
            "description": "Identifier of the customer being invoiced."
          },
          {
            "name": "orderId",
            "type": "UUID",
            "required": false,
            "description": "Identifier of the associated order, if applicable."
          },
          {
            "name": "subscriptionId",
            "type": "UUID",
            "required": false,
            "description": "Identifier of the associated subscription, if applicable."
          },
          {
            "name": "invoiceNumber",
            "type": "string",
            "required": true,
            "description": "Human-readable, sequential identifier for the invoice (may have specific format)."
          },
          {
            "name": "issueDate",
            "type": "Date",
            "required": true,
            "description": "Date the invoice was generated and issued."
          },
          {
            "name": "dueDate",
            "type": "Date",
            "required": true,
            "description": "Date by which the payment for the invoice is due."
          },
          {
            "name": "totalAmount",
            "type": "decimal",
            "required": true,
            "description": "The total amount due on the invoice."
          },
          {
            "name": "currency",
            "type": "string",
            "required": true,
            "description": "Currency of the invoice amount."
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "description": "Current status of the invoice."
          },
          {
            "name": "billingAddressId",
            "type": "UUID",
            "required": true,
            "description": "Identifier for the billing address used on this invoice."
          },
          {
            "name": "lineItems",
            "type": "array",
            "required": true,
            "description": "List of individual items or services being charged on the invoice."
          },
          {
            "name": "createdAt",
            "type": "DateTime",
            "required": true,
            "description": "Timestamp when the invoice record was created."
          },
          {
            "name": "paidAt",
            "type": "DateTime",
            "required": false,
            "description": "Timestamp when the invoice was marked as paid."
          }
        ],
        "id": "Invoice",
        "name": "Invoice",
        "summary": "Represents a bill issued to a customer, detailing charges for products or services.",
        "version": "1.0.0"
      },
      "body": "## Overview\n\nThe Invoice entity represents a formal request for payment issued by the business to a customer. It details the products, services, quantities, prices, taxes, and total amount due, along with payment terms.\n\n### Entity Properties\n<EntityPropertiesTable />\n\n## Relationships\n\n*   **Customer:** An invoice is issued to one `Customer`.\n*   **Order/Subscription:** An invoice may be related to one or more `Order`s or a specific `Subscription` period.\n*   **Payment:** An invoice is settled by one or more `Payment` transactions.\n*   **InvoiceLineItem:** An invoice contains multiple `InvoiceLineItem`s detailing the charges.\n*   **BillingProfile:** Invoice generation often uses details from the customer's `BillingProfile`.\n\n## Examples\n\n*   Invoice #INV-00123 issued to Jane Doe for her monthly subscription renewal, due in 15 days.\n*   Invoice #INV-00124 issued to Acme Corp for consulting services rendered in the previous month, status Paid.",
      "filePath": "../examples/default/domains/E-Commerce/subdomains/Payment/entities/Invoice/index.mdx",
      "digest": "2e24f1a0970b8fcf",
      "deferredRender": true,
      "collection": "entities"
    },
      {
        "id": "Order-1.0.0",
        "data": {
          "aggregateRoot": true,
          "identifier": "orderId",
          "properties": [
            {
              "name": "orderId",
              "type": "UUID",
              "required": true,
              "description": "Unique identifier for the order"
            },
            {
              "name": "customerId",
              "type": "UUID",
              "required": true,
              "description": "Identifier for the customer placing the order"
            },
            {
              "name": "orderDate",
              "type": "DateTime",
              "required": true,
              "description": "Date and time when the order was placed"
            },
            {
              "name": "status",
              "type": "string",
              "required": true,
              "description": "Current status of the order (e.g., Pending, Processing, Shipped, Delivered, Cancelled)"
            },
            {
              "name": "orderItems",
              "type": "array",
              "required": true,
              "description": "List of items included in the order"
            },
            {
              "name": "totalAmount",
              "type": "decimal",
              "required": true,
              "description": "Total monetary value of the order"
            },
            {
              "name": "shippingAddress",
              "type": "Address",
              "required": true,
              "description": "Address where the order should be shipped"
            }
          ],
          "id": "Order",
          "name": "Order",
          "summary": "Represents a customer's request to purchase products or services.",
          "version": "1.0.0"
        },
        "body": "## Overview\n\nThe Order entity captures all details related to a customer's purchase request. It serves as the central aggregate root within the Orders domain, coordinating information about the customer, products ordered, payment, and shipping.\n\n### Entity Properties\n<EntityPropertiesTable />\n\n## Relationships\n\n*   **Customer:** Each order belongs to one `Customer` (identified by `customerId`).\n*   **OrderItem:** An order contains one or more `OrderItem` entities detailing the specific products and quantities.\n*   **Payment:** An order is typically associated with a `Payment` entity (not detailed here).\n*   **Shipment:** An order may lead to one or more `Shipment` entities (not detailed here).\n\n## Examples\n\n*   **Order #12345:** A customer orders 2 units of Product A and 1 unit of Product B, to be shipped to their home address. Status is 'Processing'.\n*   **Order #67890:** A customer places a large order for multiple items, requiring special shipping arrangements. Status is 'Pending' until payment confirmation.",
        "filePath": "../examples/default/domains/E-Commerce/subdomains/Orders/entities/Order/index.mdx",
        "digest": "b76e69f63f8bf2d5",
        "deferredRender": true,
        "collection": "entities"
      },
      {
        "id": "Customer-1.0.0",
        "data": {
          "identifier": "customerId",
          "properties": [
            {
              "name": "customerId",
              "type": "UUID",
              "required": true,
              "description": "Unique identifier for the customer"
            },
            {
              "name": "firstName",
              "type": "string",
              "required": true,
              "description": "Customer's first name"
            },
            {
              "name": "lastName",
              "type": "string",
              "required": true,
              "description": "Customer's last name"
            },
            {
              "name": "email",
              "type": "string",
              "required": true,
              "description": "Customer's primary email address (unique)"
            },
            {
              "name": "phone",
              "type": "string",
              "required": false,
              "description": "Customer's phone number"
            },
            {
              "name": "addresses",
              "type": "array",
              "required": false,
              "description": "List of addresses associated with the customer (e.g., shipping, billing)"
            },
            {
              "name": "dateRegistered",
              "type": "DateTime",
              "required": true,
              "description": "Date and time when the customer registered"
            }
          ],
          "id": "Customer",
          "name": "Customer",
          "summary": "Represents an individual or organization that places orders.",
          "version": "1.0.0"
        },
        "body": "## Overview\n\nThe Customer entity holds information about the individuals or organizations who interact with the system, primarily by placing orders. It stores contact details, addresses, and other relevant personal or business information.\n\n### Entity Properties\n<EntityPropertiesTable />\n\n## Relationships\n\n*   **Order:** A customer can have multiple `Order` entities. The `Order` entity holds a reference (`customerId`) back to the `Customer`.\n*   **Address:** A customer can have multiple associated `Address` value objects or entities.\n\n## Examples\n\n*   **Customer A:** Jane Doe, registered on 2023-01-15, with a primary shipping address and a billing address.\n*   **Customer B:** John Smith, a long-time customer with multiple past orders.",
        "filePath": "../examples/default/domains/E-Commerce/subdomains/Orders/entities/Customer/index.mdx",
        "digest": "5e0ecb5a1abe55bd",
        "deferredRender": true,
        "collection": "entities"
      },
      {
        "id": "Payment-1.0.0",
        "data": {
          "identifier": "paymentId",
          "properties": [
            {
              "name": "paymentId",
              "type": "UUID",
              "required": true,
              "description": "Unique identifier for the payment transaction."
            },
            {
              "name": "customerId",
              "type": "UUID",
              "required": true,
              "description": "Identifier of the customer making the payment."
            },
            {
              "name": "invoiceId",
              "type": "UUID",
              "required": false,
              "description": "Identifier of the invoice this payment settles."
            },
            {
              "name": "orderId",
              "type": "UUID",
              "required": false,
              "description": "Identifier of the order this payment is for."
            },
            {
              "name": "paymentMethodId",
              "type": "UUID",
              "required": true,
              "description": "Identifier of the payment method used (e.g., credit card, bank transfer)."
            },
            {
              "name": "amount",
              "type": "decimal",
              "required": true,
              "description": "The amount of money transferred in the payment."
            },
            {
              "name": "currency",
              "type": "string",
              "required": true,
              "description": "Currency of the payment amount."
            },
            {
              "name": "status",
              "type": "string",
              "required": true,
              "description": "Current status of the payment transaction."
            },
            {
              "name": "transactionReference",
              "type": "string",
              "required": false,
              "description": "External reference ID from the payment processor or bank."
            },
            {
              "name": "paymentDate",
              "type": "DateTime",
              "required": true,
              "description": "Timestamp when the payment was processed or attempted."
            },
            {
              "name": "failureReason",
              "type": "string",
              "required": false,
              "description": "Reason provided by the payment gateway if the payment failed."
            },
            {
              "name": "refundAmount",
              "type": "decimal",
              "required": false,
              "description": "The amount refunded, if any part of the payment was returned."
            },
            {
              "name": "refundDate",
              "type": "DateTime",
              "required": false,
              "description": "Timestamp when the refund was processed."
            }
          ],
          "id": "Payment",
          "name": "Payment",
          "summary": "Represents a payment transaction made by a customer, usually to settle an invoice or pay for an order.",
          "version": "1.0.0"
        },
        "body": "## Overview\n\nThe Payment entity records the details of a monetary transaction initiated by a customer towards the business. It captures the amount, currency, payment method used, status (success, failure, refund), and links to the relevant invoice or order being paid.\n\n### Entity Properties\n<EntityPropertiesTable />\n\n## Relationships\n\n*   **Customer:** A payment is made by one `Customer`.\n*   **Invoice/Order:** A payment typically corresponds to one `Invoice` or `Order`.\n*   **PaymentMethod:** A payment is executed using a specific `PaymentMethod`.\n*   **Transaction:** A payment attempt often results in one or more lower-level `Transaction` records (e.g., authorization, capture).\n\n## Examples\n\n*   Payment #PAY-98765 from Jane Doe for $19.99 via Credit Card ending in 1234, status Succeeded, settling Invoice #INV-00123.\n*   Payment #PAY-98766 attempt from John Smith for $50.00 via Bank Transfer, status Failed (Reason: Insufficient Funds).\n*   Payment #PAY-98760 for $100.00, partially refunded for $25.00 on 2024-05-18.",
        "filePath": "../examples/default/domains/E-Commerce/subdomains/Payment/entities/Payment/index.mdx",
        "digest": "4800672f12b30efc",
        "deferredRender": true,
        "collection": "entities"
      },
      {
        "id": "PaymentMethod-1.0.0",
        "data": {
          "identifier": "paymentMethodId",
          "properties": [
            {
              "name": "paymentMethodId",
              "type": "UUID",
              "required": true,
              "description": "Unique identifier for the payment method."
            },
            {
              "name": "customerId",
              "type": "UUID",
              "required": true,
              "description": "Identifier of the customer who owns this payment method."
            },
            {
              "name": "type",
              "type": "string",
              "required": true,
              "description": "The type of payment method."
            },
            {
              "name": "details",
              "type": "object",
              "required": true,
              "description": "Contains type-specific, often sensitive details (e.g., last 4 digits of card, card brand, bank name, account type, token). **Never store raw PANs or sensitive data.**"
            },
            {
              "name": "isDefault",
              "type": "boolean",
              "required": true,
              "description": "Indicates if this is the customer's default payment method."
            },
            {
              "name": "billingAddressId",
              "type": "UUID",
              "required": true,
              "description": "Identifier for the billing address verified for this payment method."
            },
            {
              "name": "status",
              "type": "string",
              "required": true,
              "description": "Current status of the payment method."
            },
            {
              "name": "createdAt",
              "type": "DateTime",
              "required": true,
              "description": "Timestamp when the payment method was added."
            },
            {
              "name": "updatedAt",
              "type": "DateTime",
              "required": true,
              "description": "Timestamp when the payment method was last updated."
            }
          ],
          "id": "PaymentMethod",
          "name": "PaymentMethod",
          "summary": "Represents a payment instrument a customer can use, like a credit card or bank account.",
          "version": "1.0.0"
        },
        "body": "## Overview\n\nThe PaymentMethod entity represents a specific payment instrument registered by a customer, such as a credit card or a linked bank account. It stores necessary (non-sensitive) details required to initiate payments and links to the associated customer and billing address.\n\n**Security Note:** Sensitive details like full card numbers or bank account numbers should **never** be stored directly. Rely on tokenization provided by payment gateways.\n\n### Entity Properties\n<EntityPropertiesTable />\n\n## Relationships\n\n*   **Customer:** A payment method belongs to one `Customer`.\n*   **Address:** Linked to a specific billing `Address`.\n*   **Payment:** Used to make `Payment` transactions.\n*   **Subscription:** May be designated as the payment method for a `Subscription`.\n\n## Examples\n\n*   Jane Doe's default Visa card ending in 1234, expiring 12/2025, status Active.\n*   John Smith's linked bank account (Chase, Checking), status Active.\n*   An old MasterCard ending in 5678 belonging to Jane Doe, status Expired.",
        "filePath": "../examples/default/domains/E-Commerce/subdomains/Payment/entities/PaymentMethod/index.mdx",
        "digest": "ad998bb9a47b6182",
        "deferredRender": true,
        "collection": "entities"
      },
      {
        "id": "OrderItem-1.0.0",
        "data": {
          "identifier": "orderItemId",
          "properties": [
            {
              "name": "orderItemId",
              "type": "UUID",
              "required": true,
              "description": "Unique identifier for the order item"
            },
            {
              "name": "orderId",
              "type": "UUID",
              "required": true,
              "description": "Identifier for the parent Order"
            },
            {
              "name": "productId",
              "type": "UUID",
              "required": true,
              "description": "Identifier for the product being ordered"
            },
            {
              "name": "productName",
              "type": "string",
              "required": false,
              "description": "Name of the product at the time of order"
            },
            {
              "name": "quantity",
              "type": "integer",
              "required": true,
              "description": "Number of units of the product ordered"
            },
            {
              "name": "unitPrice",
              "type": "decimal",
              "required": true,
              "description": "Price per unit of the product at the time of order"
            },
            {
              "name": "totalPrice",
              "type": "decimal",
              "required": true,
              "description": "Total price for this item line (quantity * unitPrice)"
            }
          ],
          "id": "OrderItem",
          "name": "OrderItem",
          "summary": "Represents a single item within a customer's order.",
          "version": "1.0.0"
        },
        "body": "## Overview\n\nThe OrderItem entity details a specific product and its quantity requested within an `Order`. It holds information about the product, the quantity ordered, and the price calculation for that line item. OrderItems are part of the `Order` aggregate.\n\n### Entity Properties\n<EntityPropertiesTable />\n\n## Relationships\n\n*   **Order:** Each `OrderItem` belongs to exactly one `Order` (identified by `orderId`). It is a constituent part of the Order aggregate.\n*   **Product:** Each `OrderItem` refers to one `Product` (identified by `productId`).\n\n## Examples\n\n*   **OrderItem A (for Order #12345):** Product ID: P001, Quantity: 2, Unit Price: $50.00, Total Price: $100.00\n*   **OrderItem B (for Order #12345):** Product ID: P002, Quantity: 1, Unit Price: $75.00, Total Price: $75.00",
        "filePath": "../examples/default/domains/E-Commerce/subdomains/Orders/entities/OrderItem/index.mdx",
        "digest": "52e5e80b7d383f9b",
        "deferredRender": true,
        "collection": "entities"
      },
      {
        "id": "Transaction-1.0.0",
        "data": {
          "identifier": "transactionId",
          "properties": [
            {
              "name": "transactionId",
              "type": "UUID",
              "required": true,
              "description": "Unique identifier for this specific gateway transaction."
            },
            {
              "name": "paymentId",
              "type": "UUID",
              "required": true,
              "description": "Identifier of the parent Payment this transaction belongs to."
            },
            {
              "name": "type",
              "type": "string",
              "required": true,
              "description": "The type of operation performed with the payment gateway."
            },
            {
              "name": "gatewayReferenceId",
              "type": "string",
              "required": true,
              "description": "Unique transaction ID provided by the external payment gateway."
            },
            {
              "name": "amount",
              "type": "decimal",
              "required": true,
              "description": "The amount associated with this specific transaction operation."
            },
            {
              "name": "currency",
              "type": "string",
              "required": true,
              "description": "Currency of the transaction amount."
            },
            {
              "name": "status",
              "type": "string",
              "required": true,
              "description": "Status reported by the gateway for this specific operation."
            },
            {
              "name": "responseCode",
              "type": "string",
              "required": false,
              "description": "Response code returned by the payment gateway."
            },
            {
              "name": "responseMessage",
              "type": "string",
              "required": false,
              "description": "Detailed message or reason returned by the gateway."
            },
            {
              "name": "processedAt",
              "type": "DateTime",
              "required": true,
              "description": "Timestamp when the transaction was processed by the gateway."
            },
            {
              "name": "rawRequest",
              "type": "text",
              "required": false,
              "description": "Raw request payload sent to the gateway (use with caution)."
            },
            {
              "name": "rawResponse",
              "type": "text",
              "required": false,
              "description": "Raw response payload received from the gateway (use with caution)."
            }
          ],
          "id": "Transaction",
          "name": "Transaction",
          "summary": "Represents a low-level interaction with a payment gateway or processor (e.g., authorize, capture, refund, void).",
          "version": "1.0.0"
        },
        "body": "## Overview\n\nThe Transaction entity logs the individual interactions with an external payment processor (like Stripe, PayPal, Adyen) that occur as part of processing a `Payment`. This provides a detailed audit trail of gateway operations, including authorizations, captures, refunds, and any associated success or failure responses.\n\n### Entity Properties\n<EntityPropertiesTable />\n\n## Relationships\n\n*   **Payment:** A transaction is part of one `Payment`.\n\n## Examples\n\n*   **Authorization Success:** Type: Authorize, PaymentID: PAY-98765, GatewayRef: auth_abc, Amount: $19.99, Status: Success.\n*   **Capture Success:** Type: Capture, PaymentID: PAY-98765, GatewayRef: ch_def, Amount: $19.99, Status: Success (following the authorization).\n*   **Authorization Failure:** Type: Authorize, PaymentID: PAY-98766, GatewayRef: auth_ghi, Amount: $50.00, Status: Failure, ResponseCode: 'declined', ResponseMessage: 'Insufficient Funds'.\n*   **Refund Success:** Type: Refund, PaymentID: PAY-98760, GatewayRef: re_jkl, Amount: $25.00, Status: Success.",
        "filePath": "../examples/default/domains/E-Commerce/subdomains/Payment/entities/Transaction/index.mdx",
        "digest": "9469e84c8e06f7c2",
        "deferredRender": true,
        "collection": "entities"
      },
      {
        "id": "SubscriptionPeriod-1.0.0",
        "data": {
          "identifier": "subscriptionPeriodId",
          "properties": [
            {
              "name": "subscriptionPeriodId",
              "type": "UUID",
              "required": true,
              "description": "Unique identifier for this specific subscription period."
            },
            {
              "name": "subscriptionId",
              "type": "UUID",
              "required": true,
              "description": "Identifier of the parent Subscription this period belongs to."
            },
            {
              "name": "planId",
              "type": "UUID",
              "required": true,
              "description": "Identifier of the Plan active during this period."
            },
            {
              "name": "startDate",
              "type": "Date",
              "required": true,
              "description": "The start date of this billing period."
            },
            {
              "name": "endDate",
              "type": "Date",
              "required": true,
              "description": "The end date of this billing period."
            },
            {
              "name": "invoiceId",
              "type": "UUID",
              "required": false,
              "description": "Identifier of the invoice created for this period's charge."
            },
            {
              "name": "paymentId",
              "type": "UUID",
              "required": false,
              "description": "Identifier of the payment that settled the invoice for this period."
            },
            {
              "name": "status",
              "type": "string",
              "required": true,
              "description": "Status specific to this period (reflects invoicing/payment state)."
            },
            {
              "name": "amountBilled",
              "type": "decimal",
              "required": false,
              "description": "The actual amount billed for this period (could differ from plan due to promotions, usage, etc.)."
            },
            {
              "name": "currency",
              "type": "string",
              "required": false,
              "description": "Currency of the billed amount."
            },
            {
              "name": "createdAt",
              "type": "DateTime",
              "required": true,
              "description": "Timestamp when this period record was created (often at the start of the period)."
            }
          ],
          "id": "SubscriptionPeriod",
          "name": "SubscriptionPeriod",
          "summary": "Represents a single billing cycle or interval within a subscription's lifetime.",
          "version": "1.0.0"
        },
        "body": "## Overview\n\nThe SubscriptionPeriod entity tracks the state and details of a specific billing cycle within a `Subscription`. It links the subscription to the relevant invoice and payment for that interval and records the exact dates and amount billed.\n\n### Entity Properties\n<EntityPropertiesTable />\n\n## Relationships\n\n*   **Subscription:** A subscription period belongs to one `Subscription`.\n*   **Plan:** Reflects the `Plan` active during this period.\n*   **Invoice:** May be associated with one `Invoice` generated for this period.\n*   **Payment:** May be associated with one `Payment` that settled the period's invoice.\n\n## Examples\n\n*   Period for Jane Doe's 'Pro Plan' from 2024-05-01 to 2024-05-31, invoiced via #INV-00123, status Paid.\n*   Period for Acme Corp's 'Enterprise Plan' from 2024-04-15 to 2024-05-14, status Billed, awaiting payment.\n*   The first period (trial) for a new subscription from 2024-05-20 to 2024-06-19, status Active, amountBilled $0.00.",
        "filePath": "../examples/default/domains/E-Commerce/subdomains/Subscriptions/entities/SubscriptionPeriod/index.mdx",
        "digest": "6fafd64db9d7994d",
        "deferredRender": true,
        "collection": "entities"
      },
      {
        "id": "BillingProfile-1.0.0",
        "data": {
          "identifier": "billingProfileId",
          "properties": [
            {
              "name": "billingProfileId",
              "type": "UUID",
              "required": true,
              "description": "Unique identifier for the billing profile."
            },
            {
              "name": "customerId",
              "type": "UUID",
              "required": true,
              "description": "Identifier of the customer this billing profile belongs to."
            },
            {
              "name": "billingEmail",
              "type": "string",
              "required": false,
              "description": "Specific email address for sending invoices and billing notifications."
            },
            {
              "name": "companyName",
              "type": "string",
              "required": false,
              "description": "Company name for billing purposes."
            },
            {
              "name": "taxId",
              "type": "string",
              "required": false,
              "description": "Tax identification number (e.g., VAT ID, EIN)."
            },
            {
              "name": "billingAddressId",
              "type": "UUID",
              "required": true,
              "description": "Identifier for the primary billing address associated with this profile."
            },
            {
              "name": "preferredPaymentMethodId",
              "type": "UUID",
              "required": false,
              "description": "Customer's preferred payment method for charges related to this profile."
            },
            {
              "name": "createdAt",
              "type": "DateTime",
              "required": true,
              "description": "Timestamp when the billing profile was created."
            },
            {
              "name": "updatedAt",
              "type": "DateTime",
              "required": true,
              "description": "Timestamp when the billing profile was last updated."
            }
          ],
          "id": "BillingProfile",
          "name": "BillingProfile",
          "summary": "Stores billing-related contact information and preferences for a customer, often used for invoices and communication.",
          "version": "1.0.0"
        },
        "body": "## Overview\n\nThe BillingProfile entity consolidates billing-specific details for a customer, such as the billing address, contact email for invoices, tax information, and potentially preferred payment methods. This might be distinct from the customer's general contact information or shipping addresses.\n\n### Entity Properties\n<EntityPropertiesTable />\n\n## Relationships\n\n*   **Customer:** A billing profile belongs to one `Customer`. A customer might potentially have multiple profiles in complex scenarios, but often just one.\n*   **Address:** Linked to a primary billing `Address`.\n*   **PaymentMethod:** May specify a preferred `PaymentMethod`.\n*   **Invoice:** Invoices are typically generated using information from the BillingProfile.\n*   **Subscription:** Subscriptions may use the associated customer's BillingProfile for charging.\n\n## Examples\n\n*   Jane Doe's personal billing profile with her home address and primary email.\n*   Acme Corp's billing profile with their HQ address, VAT ID, and accounts payable email address.",
        "filePath": "../examples/default/domains/E-Commerce/subdomains/Subscriptions/entities/BillingProfile/index.mdx",
        "digest": "a6ba8d592799fd54",
        "deferredRender": true,
        "collection": "entities"
      }
    ]
}
