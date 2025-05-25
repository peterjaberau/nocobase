export const mockData = {
  channelsFolder: {
    schema: {},
    data: {
      services: [
        {
          id: 'services/Order/OrderService/index.mdx',
          slug: 'services/Order/OrderService',
          collection: 'services',
          data: {
            id: 'OrderService',
            version: '1.0.0',
            sends: [
              {
                id: 'OrderCreatedEvent',
                name: 'Order Created',
                version: '0.0.1',
              },
            ],
            receives: [
              {
                id: 'PaymentProcessed',
                name: 'Payment Processed',
                version: '0.0.1',
              },
            ],
          },
        },
        {
          id: 'services/Inventory/InventoryService/index.mdx',
          slug: 'services/Inventory/InventoryService',
          collection: 'services',
          data: {
            id: 'InventoryService',
            version: '1.0.0',
            receives: [
              {
                id: 'OrderCreatedEvent',
                name: 'Order Created',
                version: '^1.3.0',
              },
            ],
            sends: [
              {
                id: 'InventoryAdjusted',
                version: '~2',
              },
            ],
          },
        },
        {
          id: 'services/Payment/PaymentService/index.mdx',
          slug: 'services/Payment/PaymentService',
          collection: 'services',
          data: {
            id: 'PaymentService',
            version: '1.0.0',
            receives: [
              {
                id: 'OrderCreatedEvent',
              },
              {
                id: 'OrderDeletedEvent',
              },
            ],
            sends: [
              {
                id: 'PaymentPaid',
              },
              {
                id: 'PaymentFailed',
                version: 'latest',
              },
              {
                id: 'EmailVerified',
              },
            ],
          },
        },
        {
          id: 'services/Notifications/NotificationsService/index.mdx',
          slug: 'services/Notifications/NotificationsService',
          collection: 'services',
          data: {
            id: 'NotificationsService',
            version: '1.0.0',
            receives: [
              {
                id: 'OrderCreatedEvent',
              },
            ],
            sends: [
              {
                id: 'OrderCreatedEvent',
              },
            ],
          },
        },
      ],
      events: [
        {
          id: 'OrderCreatedEvent',
          slug: 'OrderCreatedEvent',
          collection: 'events',
          data: {
            id: 'OrderCreatedEvent',
            version: '0.0.1',
            name: 'Order Created',
            channels: [
              {
                id: 'orders.{env}.events',
                version: '1.0.0',
              },
            ],
          },
        },
      ],
      commands: [
        {
          id: 'PaymentProcessed',
          slug: 'PaymentProcessed',
          collection: 'commands',
          data: {
            id: 'PaymentProcessed',
            version: '0.0.1',
          },
        },
      ],
      queries: [
        {
          id: 'GetOrder',
          slug: 'GetOrder',
          collection: 'queries',
          data: {
            id: 'GetOrder',
            version: '0.0.1',
            name: 'Get Order',
            channels: [
              {
                id: 'orders.{env}.events',
                version: '1.0.0',
              },
            ],
          },
        },
      ],
      channels: [
        {
          id: 'orders.{env}.events',
          slug: 'orders.{env}.events',
          collection: 'channels',
          data: {
            id: 'orders.{env}.events',
            version: '1.0.0',
          },
        },
        {
          id: 'inventory.{env}.events',
          slug: 'inventory.{env}.events',
          collection: 'channels',
          data: {
            id: 'inventory.{env}.events',
            version: '1.0.0',
          },
        },
      ],
    },
  },

  collectionsFolder: {
    schema: {
      events: {
        OrderAmended: {
          '0.0.1': {
            versioned: {
              $schema: 'http://json-schema.org/draft-07/schema#',
              title: 'OrderAmendedEvent',
              type: 'object',
              properties: {
                orderId: {
                  type: 'string',
                  format: 'uuid',
                  description: 'The unique identifier of the order that was amended.',
                },
                amendedItems: {
                  type: 'array',
                  description:
                    'A list of items that were amended in the order, each containing product details and updated quantities.',
                  items: {
                    type: 'object',
                    properties: {
                      productId: {
                        type: 'string',
                        format: 'uuid',
                        description: 'The unique identifier of the product.',
                      },
                      productName: {
                        type: 'string',
                        description: 'The name of the product.',
                      },
                      oldQuantity: {
                        type: 'integer',
                        description: 'The original quantity of the product ordered.',
                      },
                      newQuantity: {
                        type: 'integer',
                        description: 'The new quantity of the product ordered.',
                      },
                      unitPrice: {
                        type: 'number',
                        format: 'float',
                        description: 'The price per unit of the product.',
                      },
                      totalPrice: {
                        type: 'number',
                        format: 'float',
                        description: 'The total price for this order item (newQuantity * unitPrice).',
                      },
                    },
                    required: ['productId', 'productName', 'oldQuantity', 'newQuantity', 'unitPrice', 'totalPrice'],
                  },
                },
                orderStatus: {
                  type: 'string',
                  description: 'The current status of the order after the amendment.',
                },
                totalAmount: {
                  type: 'number',
                  format: 'float',
                  description: 'The total amount of the order after the amendment.',
                },
                timestamp: {
                  type: 'string',
                  format: 'date-time',
                  description: 'The date and time when the order was amended, in ISO 8601 format.',
                },
              },
              required: ['orderId', 'userId', 'amendedItems', 'orderStatus', 'totalAmount', 'timestamp'],
              additionalProperties: false,
            },
            unchanged: {
              $schema: 'http://json-schema.org/draft-07/schema#',
              title: 'OrderAmendedEvent',
              type: 'object',
              properties: {
                orderId: {
                  type: 'string',
                  format: 'uuid',
                  description: 'The unique identifier of the order that was amended.',
                },
                amendedItems: {
                  type: 'array',
                  description:
                    'A list of items that were amended in the order, each containing product details and updated quantities.',
                  items: {
                    type: 'object',
                    properties: {
                      productId: {
                        type: 'string',
                        format: 'uuid',
                        description: 'The unique identifier of the product.',
                      },
                      productName: {
                        type: 'string',
                        description: 'The name of the product.',
                      },
                      oldQuantity: {
                        type: 'integer',
                        description: 'The original quantity of the product ordered.',
                      },
                      newQuantity: {
                        type: 'integer',
                        description: 'The new quantity of the product ordered.',
                      },
                      unitPrice: {
                        type: 'number',
                        format: 'float',
                        description: 'The price per unit of the product.',
                      },
                      totalPrice: {
                        type: 'number',
                        format: 'float',
                        description: 'The total price for this order item (newQuantity * unitPrice).',
                      },
                    },
                    required: ['productId', 'productName', 'oldQuantity', 'newQuantity', 'unitPrice', 'totalPrice'],
                  },
                },
                orderStatus: {
                  type: 'string',
                  description: 'The current status of the order after the amendment.',
                },
                totalAmount: {
                  type: 'number',
                  format: 'float',
                  description: 'The total amount of the order after the amendment.',
                },
                timestamp: {
                  type: 'string',
                  format: 'date-time',
                  description: 'The date and time when the order was amended, in ISO 8601 format.',
                },
              },
              required: ['orderId', 'userId', 'amendedItems', 'orderStatus', 'totalAmount', 'timestamp'],
              additionalProperties: false,
            },
          },
        },
      },
    },
  },

  commandsFolder: {
    schema: {},
    data: {
      services: [
        {
          id: 'OrderService',
          slug: 'OrderService',
          collection: 'services',
          data: {
            id: 'OrderService',
            version: '0.0.1',
            sends: [
              {
                id: 'AdjustOrder',
                version: '0.0.1',
              },
            ],
            receives: [
              {
                id: 'PlaceOrder',
                version: '>1.5.0',
              },
            ],
          },
        },
        {
          id: 'PaymentService',
          slug: 'PaymentService',
          collection: 'services',
          data: {
            id: 'PaymentService',
            version: '0.0.1',
            receives: [
              {
                id: 'AdjustOrder',
                version: '0.0.1',
              },
            ],
          },
        },
        {
          id: 'InventoryService',
          slug: 'InventoryService',
          collection: 'services',
          data: {
            id: 'InventoryService',
            version: '0.0.1',
            sends: [{ id: 'NotifyLowStock' }],
          },
        },
        {
          id: 'NotificationService',
          slug: 'NotificationService',
          collection: 'services',
          data: {
            id: 'NotificationService',
            version: '0.0.1',
            receives: [{ id: 'NotifyLowStock', version: 'latest' }],
          },
        },
        {
          id: 'LegacyOrderService',
          slug: 'LegacyOrderService',
          collection: 'services',
          data: {
            id: 'LegacyOrderService',
            version: '0.0.1',
            receives: [{ id: 'GetOrder', version: 'latest' }],
            sends: [{ id: 'GetOrder', version: 'latest' }],
          },
        },
      ],

      commands: [
        {
          id: 'AdjustOrder',
          slug: 'AdjustOrder',
          collection: 'commands',
          data: {
            id: 'AdjustOrder',
            version: '0.0.1',
          },
        },
        {
          id: 'PlaceOrder',
          slug: 'PlaceOrder',
          collection: 'commands',
          data: {
            id: 'PlaceOrder',
            version: '1.5.1',
          },
        },
        {
          id: 'PlaceOrder',
          slug: 'PlaceOrder',
          collection: 'commands',
          data: {
            id: 'PlaceOrder',
            version: '2.0.1',
          },
        },
        {
          id: 'NotifyLowStock',
          slug: 'NotifyLowStock',
          collection: 'commands',
          data: {
            id: 'NotifyLowStock',
            version: '2.0.0',
          },
        },
        {
          id: 'NotifyLowStock',
          slug: 'NotifyLowStock',
          collection: 'commands',
          data: {
            id: 'NotifyLowStock',
            version: '2.0.1',
          },
        },
        {
          id: 'GetOrder',
          slug: 'GetOrder',
          collection: 'commands',
          data: {
            id: 'GetOrder',
            version: '0.0.1',
          },
        },
      ],
    },
  },

  domainsFolder: {
    schema: {},
    data: {
      domains: [
        {
          id: 'domains/Shipping/index.mdx',
          slug: 'domains/Shipping',
          collection: 'domains',
          data: {
            id: 'Shipping',
            name: 'Shipping',
            version: '0.0.1',
            services: [{ id: 'LocationService', version: '0.0.1' }],
            domains: [{ id: 'Checkout', version: '0.0.1' }],
          },
        },
        {
          id: 'domains/Checkout/index.mdx',
          slug: 'domains/Checkout',
          collection: 'domains',
          data: {
            id: 'Checkout',
            name: 'Checkout',
            version: '0.0.1',
            services: [{ id: 'OrderService' /* version: latest */ }, { id: 'PaymentService', version: '0.0.1' }],
          },
        },
        {
          id: 'domains/Notification/index.mdx',
          slug: 'domains/Notification',
          collection: 'domains',
          data: {
            id: 'Notification',
            name: 'Notification',
            version: '0.0.1',
            services: [{ id: 'MailService' }],
          },
        },
      ],

      services: [
        {
          id: 'services/LocationService/index.mdx',
          slug: 'services/LocationService',
          collection: 'services',
          data: {
            id: 'LocationService',
            version: '0.0.1',
            receives: [{ id: 'OrderPlaced', version: '0.0.1' }],
          },
        },
        {
          id: 'services/OrderService/versioned/001/index.mdx',
          slug: 'services/OrderService/versioned/001',
          collection: 'services',
          data: {
            id: 'OrderService',
            version: '0.0.1',
            receives: [{ id: 'PlaceOrder', version: '>1.5.0' }],
            sends: [{ id: 'OrderPlaced', version: '0.0.1' }],
          },
        },
        {
          id: 'services/OrderService/index.mdx',
          slug: 'services/OrderService',
          collection: 'services',
          data: {
            id: 'OrderService',
            version: '1.0.0',
            receives: [{ id: 'PlaceOrder', version: '>1.5.0' }],
            sends: [{ id: 'OrderPlaced', version: '0.0.1' }],
          },
        },
        {
          id: 'services/PaymentService/index.mdx',
          slug: 'services/PaymentService',
          collection: 'services',
          data: {
            id: 'PaymentService',
            version: '0.0.1',
            receives: [{ id: 'OrderPlaced' }],
            sends: [
              { id: 'PaymentPaid', version: 'x' },
              { id: 'PaymentRefunded' },
              { id: 'PaymentFailed', version: '^1.0.0' },
            ],
          },
        },
        {
          id: 'services/ServiceWithoutDomains/index.mdx',
          slug: 'services/ServiceWithoutDomains',
          collection: 'services',
          data: {
            id: 'ServiceWithoutDomains',
            version: '0.0.1',
          },
        },
      ],

      commands: [
        // PlaceOrder
        {
          id: 'commands/PlaceOrder/versioned/100/index.mdx',
          slug: 'commands/PlaceOrder/versoined/100',
          collection: 'commands',
          data: {
            id: 'PlaceOrder',
            version: '1.0.0',
          },
        },
        {
          id: 'commands/PlaceOrder/versioned/150/index.mdx',
          slug: 'commands/PlaceOrder/versoined/150',
          collection: 'commands',
          data: {
            id: 'PlaceOrder',
            version: '1.5.0',
          },
        },
        {
          id: 'commands/PlaceOrder/versioned/177/index.mdx',
          slug: 'commands/PlaceOrder/versoined/177',
          collection: 'commands',
          data: {
            id: 'PlaceOrder',
            version: '1.7.7',
          },
        },
      ],

      events: [
        // OrderPlaced
        {
          id: 'events/OrderPlaced/index.mdx',
          slug: 'events/OrderPlaced',
          collection: 'events',
          data: {
            id: 'OrderPlaced',
            version: '0.0.1',
          },
        },

        // PaymentPaid
        {
          id: 'events/PaymentPaid/versioned/001/index.mdx',
          slug: 'events/PaymentPaid/versioned/001',
          collection: 'events',
          data: {
            id: 'PaymentPaid',
            version: '0.0.1',
          },
        },
        {
          id: 'events/PaymentPaid/index.mdx',
          slug: 'events/PaymentPaid',
          collection: 'events',
          data: {
            id: 'PaymentPaid',
            version: '0.0.2',
          },
        },

        // PaymentRefunded
        {
          id: 'events/PaymentRefunded/index.mdx',
          slug: 'events/PaymentRefunded',
          collection: 'events',
          data: {
            id: 'PaymentRefunded',
            version: '0.0.1',
          },
        },
        {
          id: 'events/PaymentRefunded/index.mdx',
          slug: 'events/PaymentRefunded',
          collection: 'events',
          data: {
            id: 'PaymentRefunded',
            version: '1.0.0',
          },
        },

        // PaymentFailed
        {
          id: 'events/PaymentFailed/index.mdx',
          slug: 'events/PaymentFailed',
          collection: 'events',
          data: {
            id: 'PaymentFailed',
            version: '0.0.1',
          },
        },
        {
          id: 'events/PaymentFailed/index.mdx',
          slug: 'events/PaymentFailed',
          collection: 'events',
          data: {
            id: 'PaymentFailed',
            version: '1.0.0',
          },
        },
        {
          id: 'events/PaymentFailed/index.mdx',
          slug: 'events/PaymentFailed',
          collection: 'events',
          data: {
            id: 'PaymentFailed',
            version: '2.0.0',
          },
        },
      ],

      ubiquitousLanguages: [
        {
          id: 'domains/Shipping/ubiquitous-language.mdx',
          slug: 'domains/Shipping/ubiquitous-language',
          collection: 'ubiquitousLanguages',
          data: {
            id: 'Shipping',
            dictionary: [{ id: 'Payment', name: 'Payment' }],
          },
        },
      ],
    },
  },

  entitiesFolder: {
    schema: {},
    data: {
      domains: [
        {
          id: 'SupplierDomain',
          slug: 'SupplierDomain',
          collection: 'domains',
          data: {
            id: 'SupplierDomain',
            version: '0.0.1',
            entities: [
              {
                id: 'Supplier',
                version: '0.0.1',
              },
            ],
          },
        },
      ],
      services: [
        {
          id: 'OrderService',
          slug: 'OrderService',
          collection: 'services',
          data: {
            id: 'OrderService',
            version: '0.0.1',
            entities: [
              {
                id: 'Supplier',
                version: '0.0.1',
              },
            ],
          },
        },
      ],
      commands: [],
      events: [],
      queries: [],
      channels: [],
      entities: [
        {
          id: 'Supplier',
          slug: 'Supplier',
          collection: 'entities',
          data: {
            id: 'Supplier',
            version: '0.0.1',
            identifier: 'id',
            aggregateRoot: true,
            properties: [
              {
                id: 'name',
                type: 'string',
                required: true,
                description: 'The name of the supplier',
              },
            ],
          },
        },
      ],
    },
  },

  eventsFolder: {
    schema: {},
    data: {
      domains: [],
      services: [
        {
          id: 'OrderService',
          slug: 'OrderService',
          collection: 'services',
          data: {
            id: 'OrderService',
            version: '0.0.1',
            sends: [
              {
                id: 'OrderCreatedEvent',
                version: '0.0.1',
              },
            ],
          },
        },
        {
          id: 'PaymentService',
          slug: 'PaymentService',
          collection: 'services',
          data: {
            id: 'PaymentService',
            version: '0.0.1',
            receives: [
              {
                id: 'OrderCreatedEvent',
                version: '0.0.1',
              },
            ],
          },
        },
        {
          id: 'InventoryService',
          slug: 'InventoryService',
          collection: 'services',
          data: {
            id: 'InventoryService',
            version: '0.0.1',
            sends: [
              {
                id: 'InventoryAdjusted',
                version: '>1.2.0',
              },
              {
                id: 'ProductOutOfStock',
              },
              {
                id: 'ProductDiscontinued',
                version: 'latest',
              },
            ],
          },
        },
        {
          id: 'CatalogService',
          slug: 'CatalogService',
          collection: 'services',
          data: {
            id: 'CatalogService',
            version: '0.0.1',
            receives: [
              {
                id: 'InventoryAdjusted',
              },
              {
                id: 'ProductDiscontinued',
                version: '*',
              },
            ],
          },
        },
        {
          id: 'NotificationsService',
          slug: 'NotificationsService',
          collection: 'services',
          data: {
            id: 'NotificationsService',
            version: '0.0.1',
            receives: [
              {
                id: 'EmailSent',
              },
            ],
            sends: [
              {
                id: 'EmailSent',
              },
              {
                id: 'EmailVerified',
              },
            ],
          },
        },
      ],
      commands: [],
      events: [
        {
          id: 'OrderCreatedEvent',
          slug: 'OrderCreatedEvent',
          collection: 'events',
          data: {
            id: 'OrderCreatedEvent',
            version: '0.0.1',
          },
        },
        {
          id: 'InventoryAdjusted',
          slug: 'InventoryAdjusted',
          collection: 'events',
          data: {
            id: 'InventoryAdjusted',
            version: '1.5.1',
          },
        },
        {
          id: 'ProductOutOfStock',
          slug: 'ProductOutOfStock',
          collection: 'events',
          data: {
            id: 'ProductOutOfStock',
            version: '1.0.0',
          },
        },
        {
          id: 'ProductDiscontinued',
          slug: 'ProductDiscontinued',
          collection: 'events',
          data: {
            id: 'ProductDiscontinued',
            version: '0.0.1',
          },
        },
        {
          id: 'ProductDiscontinued',
          slug: 'ProductDiscontinued',
          collection: 'events',
          data: {
            id: 'ProductDiscontinued',
            version: '1.0.0',
          },
        },
        {
          id: 'EmailSent',
          slug: 'EmailSent',
          collection: 'events',
          data: {
            id: 'EmailSent',
            version: '1.0.0',
          },
        },
        {
          id: 'EmailVerified',
          slug: 'EmailVerified',
          collection: 'events',
          data: {
            id: 'EmailVerified',
            version: '1.0.0',
            channels: [
              {
                id: 'EmailChannel',
                version: '1.0.0',
              },
            ],
          },
        },
      ],
      queries: [],
      channels: [
        {
          id: 'EmailChannel',
          slug: 'EmailChannel',
          collection: 'channels',
          data: {
            id: 'EmailChannel',
            version: '1.0.0',
          },
        },
      ],
      entities: [],
    },
  },

  flowsFolder: {
    schema: {},
    data: {
      flow: [
        {
          id: 'Payment/PaymentProcessed/index.mdx',
          slug: 'payment/paymentprocessed',
          body: '',
          collection: 'flows',
          data: {
            steps: [
              {
                id: 1,
                type: 'node',
                title: 'Order Placed',
                next_step: {
                  id: 2,
                  label: 'Proceed to payment',
                },
              },
              {
                id: 2,
                title: 'Payment Initiated',
                message: {
                  id: 'PaymentInitiated',
                  version: '0.0.1',
                },
                next_steps: [
                  {
                    id: 3,
                    label: 'Payment successful',
                  },
                  {
                    id: 4,
                    label: 'Payment failed',
                  },
                ],
              },
              {
                id: 3,
                title: 'Payment Processed',
                message: {
                  id: 'PaymentProcessed',
                  version: '0.0.1',
                },
              },
              {
                id: 4,
                type: 'node',
                title: 'Payment Failed',
              },
            ],
            id: 'PaymentFlow',
            name: 'Payment Flow for E-commerce',
            summary: 'Business flow for processing payments in an e-commerce platform',
            version: '1.0.0',
            type: 'node',
          },
        },
      ],
      flowByIds: [
        {
          id: 'Payment/PaymentProcessed/index.mdx',
          slug: 'payment/paymentprocessed',
          body: '',
          collection: 'flows',
          data: {
            steps: [
              {
                id: 1,
                type: 'node',
                title: 'Order Placed',
                next_step: 2,
              },
              {
                id: 2,
                title: 'Payment Initiated',
                message: {
                  id: 'PaymentInitiated',
                  version: '0.0.1',
                },
                next_steps: [3, 4],
              },
              {
                id: 3,
                title: 'Payment Processed',
                message: {
                  id: 'PaymentProcessed',
                  version: '0.0.1',
                },
              },
              {
                id: 4,
                type: 'node',
                title: 'Payment Failed',
              },
            ],
            id: 'PaymentFlow',
            name: 'Payment Flow for E-commerce',
            summary: 'Business flow for processing payments in an e-commerce platform',
            version: '1.0.0',
            type: 'node',
          },
        },
        {
          id: 'Subscriptions/CancelSubscription/index.mdx',
          slug: 'subscriptions/CancelSubscription',
          body: '',
          collection: 'flows',
          data: {
            steps: [
              {
                id: 'cancel_subscription_initiated',
                title: 'Cancels Subscription',
                actor: {
                  name: 'User',
                },
                next_step: {
                  id: 'cancel_subscription_request',
                  label: 'Initiate subscription cancellation',
                },
              },
              {
                id: 'cancel_subscription_request',
                title: 'Cancel Subscription',
                message: {
                  id: 'CancelSubscription',
                  version: '0.0.1',
                },
                next_step: {
                  id: 'subscription_service',
                  label: 'Proceed to subscription service',
                },
              },
              {
                id: 'subscription_service',
                title: 'Subscription Service',
                service: {
                  id: 'SubscriptionService',
                  version: 'latest',
                },
                next_steps: [
                  {
                    id: 'subscription_cancelled',
                    label: 'Successful cancellation',
                  },
                  {
                    id: 'subscription_rejected',
                    label: 'Failed cancellation',
                  },
                ],
              },
              {
                id: 'subscription_cancelled',
                title: 'Subscription has been cancelled',
                message: {
                  id: 'UserSubscriptionCancelled',
                  version: '0.0.1',
                },
              },
              {
                id: 'subscription_rejected',
                title: 'Subscription cancellation has been rejected',
              },
            ],
            id: 'CancelSubscription',
            name: 'User Cancels Subscription',
            summary: 'Flow for when a user has cancelled a subscription',
            version: '1.0.0',
            // type: 'node',
          },
        },
      ],
      domains: [],
      services: [
        {
          slug: 'SubscriptionService',
          collection: 'services',
          data: {
            id: 'SubscriptionService',
            version: '0.0.1',
          },
        },
      ],
      commands: [],
      events: [
        {
          slug: 'PaymentInitiated',
          collection: 'events',
          data: {
            id: 'PaymentInitiated',
            version: '0.0.1',
          },
        },
        {
          slug: 'PaymentProcessed',
          collection: 'events',
          data: {
            id: 'PaymentProcessed',
            version: '0.0.1',
          },
        },
      ],
      queries: [],
      channels: [],
      entities: [],
    },
  },

  messagesFolder: {
    schema: {},
    data: {
      domains: [],
      services: [],
      commands: [
        {
          id: 'ProcessPayment',
          collection: 'commands',
          data: {
            id: 'ProcessPayment',
            version: '0.0.1',
            pathToFile: 'commands/ProcessPayment/versioned/0.0.1/index.md',
          },
        },
        {
          id: 'ProcessPayment',
          collection: 'commands',
          data: {
            id: 'ProcessPayment',
            version: '0.0.2',
            pathToFile: 'commands/ProcessPayment/versioned/0.0.2/index.md',
          },
        },
        {
          id: 'ProcessPayment',
          collection: 'commands',
          data: {
            id: 'ProcessPayment',
            version: '0.1.0',
            pathToFile: 'commands/ProcessPayment/index.md',
          },
        },
      ],
      events: [
        {
          id: 'PaymentProcessed',
          collection: 'events',
          data: {
            id: 'PaymentProcessed',
            version: '0.0.1',
            pathToFile: 'events/PaymentProcessed/versioned/0.0.1/index.md',
          },
        },
        {
          id: 'PaymentProcessed',
          collection: 'events',
          data: {
            id: 'PaymentProcessed',
            version: '0.0.2',
            pathToFile: 'events/PaymentProcessed/versioned/0.0.2/index.md',
          },
        },
        {
          id: 'PaymentProcessed',
          collection: 'events',
          data: {
            id: 'PaymentProcessed',
            version: '0.1.0',
            pathToFile: 'events/PaymentProcessed/index.md',
          },
        },
      ],
      queries: [],
      channels: [],
      entities: [],
    },
  },

  queriesFolder: {
    schema: {},
    data: {
      domains: [],
      services: [
        {
          id: 'OrderService',
          slug: 'OrderService',
          collection: 'services',
          data: {
            id: 'OrderService',
            version: '0.0.1',
            sends: [
              {
                id: 'GetLatestOrder',
                version: '0.0.1',
              },
            ],
          },
        },
        {
          id: 'PaymentService',
          slug: 'PaymentService',
          collection: 'services',
          data: {
            id: 'PaymentService',
            version: '0.0.1',
            receives: [
              {
                id: 'GetLatestOrder',
                version: '0.0.1',
              },
            ],
          },
        },
        {
          id: 'InventoryService',
          slug: 'InventoryService',
          collection: 'services',
          data: {
            id: 'InventoryService',
            version: '0.0.1',
            sends: [
              {
                id: 'GetInventoryItem',
                version: '>1.2.0',
              },
              {
                id: 'GetProductStatus',
              },
              {
                id: 'GetStockStatus',
                version: 'latest',
              },
            ],
          },
        },
        {
          id: 'CatalogService',
          slug: 'CatalogService',
          collection: 'services',
          data: {
            id: 'CatalogService',
            version: '0.0.1',
            receives: [
              {
                id: 'GetInventoryItem',
              },
              {
                id: 'GetStockStatus',
                version: '*',
              },
            ],
          },
        },
        {
          id: 'LegacyOrderService',
          slug: 'LegacyOrderService',
          collection: 'services',
          data: {
            id: 'LegacyOrderService',
            version: '0.0.1',
            receives: [
              {
                id: 'GetOrderLegacy',
              },
            ],
            sends: [
              {
                id: 'GetOrderLegacy',
              },
            ],
          },
        },
      ],
      commands: [],
      events: [],
      queries: [
        {
          id: 'GetLatestOrder',
          slug: 'GetLatestOrder',
          collection: 'queries',
          data: {
            id: 'GetLatestOrder',
            version: '0.0.1',
          },
        },
        {
          id: 'GetInventoryItem',
          slug: 'GetInventoryItem',
          collection: 'queries',
          data: {
            id: 'GetInventoryItem',
            version: '1.5.1',
          },
        },
        {
          id: 'GetStockStatus',
          slug: 'GetStockStatus',
          collection: 'queries',
          data: {
            id: 'GetStockStatus',
            version: '0.0.1',
          },
        },
        {
          id: 'GetStockStatus',
          slug: 'GetStockStatus',
          collection: 'queries',
          data: {
            id: 'GetStockStatus',
            version: '1.0.0',
          },
        },
        {
          id: 'GetProductStatus',
          slug: 'GetProductStatus',
          collection: 'queries',
          data: {
            id: 'GetProductStatus',
            version: '0.0.1',
          },
        },
        {
          id: 'GetOrderLegacy',
          slug: 'GetOrderLegacy',
          collection: 'queries',
          data: {
            id: 'GetOrderLegacy',
            version: '0.0.1',
          },
        },
      ],
      channels: [],
    },
  },

  schemasFolder: {
    schema: {},
    data: {
      domains: [],
      services: [],
      commands: [],
      events: [],
      queries: [],
      channels: [],
    },
  },

  servicesFolder: {
    schema: {},
    data: {
      domains: [],
      services: [
        {
          id: 'services/Order/OrderService/index.mdx',
          slug: 'services/Order/OrderService',
          collection: 'services',
          data: {
            id: 'OrderService',
            version: '1.0.0',
            specifications: [
              {
                type: 'asyncapi',
                path: 'asyncapi.yml',
                name: 'AsyncAPI Custom Name',
              },
              {
                type: 'openapi',
                path: 'openapi.yml',
                name: 'OpenAPI Custom Name',
              },
            ],
            sends: [
              {
                id: 'OrderCreatedEvent',
                version: '0.0.1',
              },
            ],
            receives: [
              {
                id: 'PaymentProcessed',
                version: '0.0.1',
              },
            ],
          },
        },
        {
          id: 'services/Inventory/InventoryService/index.mdx',
          slug: 'services/Inventory/InventoryService',
          collection: 'services',
          data: {
            id: 'InventoryService',
            version: '1.0.0',
            specifications: {
              asyncapiPath: 'asyncapi.yml',
              openapiPath: 'openapi.yml',
            },
            receives: [
              {
                id: 'OrderCreatedEvent',
                version: '^1.3.0',
              },
            ],
            sends: [
              {
                id: 'InventoryAdjusted',
                version: '~2',
              },
            ],
          },
        },
        {
          id: 'services/Payment/PaymentService/index.mdx',
          slug: 'services/Payment/PaymentService',
          collection: 'services',
          data: {
            id: 'PaymentService',
            version: '1.0.0',
            receives: [
              {
                id: 'OrderCreatedEvent',
              },
              {
                id: 'OrderDeletedEvent',
              },
            ],
            sends: [
              {
                id: 'PaymentPaid',
              },
              {
                id: 'PaymentFailed',
                version: 'latest',
              },
              {
                id: 'EmailVerified',
                version: '1.0.0',
              },
            ],
          },
        },
        {
          id: 'services/Notifications/NotificationsService/index.mdx',
          slug: 'services/Notifications/NotificationsService',
          collection: 'services',
          data: {
            id: 'NotificationsService',
            version: '1.0.0',
            receives: [
              {
                id: 'OrderCreatedEvent',
              },
            ],
            sends: [
              {
                id: 'OrderCreatedEvent',
              },
            ],
          },
        },
      ],
      commands: [
        {
          slug: 'PaymentProcessed',
          collection: 'commands',
          data: {
            id: 'PaymentProcessed',
            version: '0.0.1',
          },
        },
      ],
      events: [
        {
          slug: 'OrderCreatedEvent',
          collection: 'events',
          data: {
            id: 'OrderCreatedEvent',
            version: '0.0.1',
          },
        },
        {
          slug: 'OrderCreatedEvent',
          collection: 'events',
          data: {
            id: 'OrderCreatedEvent',
            version: '1.0.0',
          },
        },
        {
          slug: 'OrderCreatedEvent',
          collection: 'events',
          data: {
            id: 'OrderCreatedEvent',
            version: '1.3.9',
          },
        },
        {
          slug: 'OrderCreatedEvent',
          collection: 'events',
          data: {
            id: 'OrderCreatedEvent',
            version: '2.0.0',
          },
        },
        {
          slug: 'OrderDeletedEvent',
          collection: 'events',
          data: {
            id: 'OrderDeletedEvent',
            version: '2.0.0',
            channels: [
              {
                id: 'OrderChannel',
                version: '1.0.0',
              },
            ],
          },
        },
        {
          slug: 'InventoryAdjusted',
          collection: 'events',
          data: {
            id: 'InventoryAdjusted',
            version: '0.0.1',
          },
        },
        {
          slug: 'InventoryAdjusted',
          collection: 'events',
          data: {
            id: 'InventoryAdjusted',
            version: '1.0.0',
          },
        },
        {
          slug: 'InventoryAdjusted',
          collection: 'events',
          data: {
            id: 'InventoryAdjusted',
            version: '2.0.0',
          },
        },
        // 7
        {
          slug: 'PaymentPaid',
          collection: 'events',
          data: {
            id: 'PaymentPaid',
            version: '1.0.0',
          },
        },
        // 9
        {
          slug: 'PaymentPaid',
          collection: 'events',
          data: {
            id: 'PaymentPaid',
            version: '2.0.0',
          },
        },
        // 10
        {
          slug: 'PaymentFailed',
          collection: 'events',
          data: {
            id: 'PaymentFailed',
            version: '1.0.0',
          },
        },
        // 11
        {
          slug: 'PaymentFailed',
          collection: 'events',
          data: {
            id: 'PaymentFailed',
            version: '1.2.3',
          },
        },
        // 12
        {
          id: 'EmailVerified',
          slug: 'EmailVerified',
          collection: 'events',
          data: {
            id: 'EmailVerified',
            version: '1.0.0',
            channels: [
              {
                id: 'EmailChannel',
                version: '1.0.0',
              },
            ],
          },
        },
      ],
      queries: [
        {
          slug: 'GetOrder',
          collection: 'queries',
          data: {
            id: 'GetOrder',
            version: '0.0.1',
          },
        },
      ],
      channels: [
        {
          id: 'EmailChannel',
          slug: 'EmailChannel',
          collection: 'channels',
          data: {
            id: 'EmailChannel',
            version: '1.0.0',
            messages: [
              {
                id: 'OrderCreatedEvent',
                version: '0.0.1',
              },
            ],
          },
        },
        {
          id: 'OrderChannel',
          slug: 'OrderChannel',
          collection: 'channels',
          data: {
            id: 'OrderChannel',
            version: '1.0.0',
          },
        },
      ],
    },
  },
};
