

export const configDefaults = {
  play: {
    eventCatalog: {
      collections: {
        catalog: [
          {
            id: 'ecommerce',
            name: 'E-Commerce',
            description: 'Browse services and messages in the E-Commerce domain',
            domains: [
              {
                id: 'Orders-0.0.3',
                name: 'Orders',
                version: '0.0.3',
                services: [
                  {
                    key: 'InventoryService-0.0.2',
                    id: 'InventoryService',
                    version: '0.0.2',
                    name: 'Inventory Service',
                    summary: 'Service that handles the inventory',
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
                    ],
                    owners: [
                      {
                        id: 'order-management',
                      },
                    ]
                  },
                  {
                    key: 'OrdersService-0.0.3',
                    sends: [
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

                    ],
                    receives: [
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
                  {
                    key: 'NotificationService-0.0.2',
                    sends: [
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
                    ],
                    receives: [
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
                  {
                    key: 'ShippingService-0.0.1',
                    sends: [
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
                    ],
                    receives: [
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
                ],
                entities: [
                  {
                    id: 'Order',
                    name: 'Order',
                    version: 'latest',
                  },
                  {
                    id: 'OrderItem',
                    name: 'OrderItem',
                    version: 'latest',
                  },
                  {
                    id: 'Customer',
                    name: 'Customer',
                    version: 'latest',
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
              {
                id: 'Payment-0.0.1',
                services: [
                  {
                    key: 'PaymentService-0.0.1',
                    sends: [
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
                    ],
                    receives: [
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
                ],
                entities: [
                  {
                    id: 'Invoice',
                    name: 'Invoice',
                    version: 'latest',
                  },
                  {
                    id: 'Payment',
                    name: 'Payment',
                    version: 'latest',
                  },
                  {
                    id: 'PaymentMethod',
                    name: 'PaymentMethod',
                    version: 'latest',
                  },
                  {
                    id: 'Transaction',
                    name: 'Transaction',
                    version: 'latest',
                  },
                ],
                version: '0.0.1',
                name: 'Payment',
                summary: 'Domain that contains payment related services and messages.',
                owners: [
                  {
                    id: 'dboyne',
                  },
                ],
              },
              {
                id: 'Subscription-0.0.1',
                services: [
                  {
                    key: 'SubscriptionService-0.0.1',
                    sends: [
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
                ],
                entities: [
                  {
                    id: 'BillingProfile',
                    name: 'BillingProfile',
                    version: 'latest',
                  },
                  {
                    id: 'SubscriptionPeriod',
                    name: 'SubscriptionPeriod',
                    version: 'latest',
                  },
                ],
                name: 'Subscription',
                summary: 'Domain that contains subscription related services and messages.',
                version: '0.0.1',
                owners: [
                  {
                    id: 'subscriptions-management',
                  },
                ],
              },
            ],
          }
        ]
      }
    }
  },
}

