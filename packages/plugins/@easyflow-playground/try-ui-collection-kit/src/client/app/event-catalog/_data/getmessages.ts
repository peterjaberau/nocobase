export const getmessages = {
  commands: [
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
        messageChannels: [
          {
            id: 'inventory.{env}.events-1.0.0',
            data: {
              address: 'inventory.{env}.events',
              protocols: ['kafka'],
              parameters: {
                env: {
                  enum: ['dev', 'sit', 'prod'],
                  description: 'Environment to use',
                },
              },
              id: 'inventory.{env}.events',
              name: 'Inventory Events Channel',
              summary:
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: ' jsonfrom datetime import datetimeKafka configurationbootstrap_servers = [localhost:9092]topic = inventory.{env}.eventsCreate a Kafka producerproducer = KafkaProducer(    bootstrap_servers=bootstrap_servers,    value_serializer=lambda v: json.dumps(v).encode(utf-8))Example inventory update eventinventory_event = {    eventType: STOCK_LEVEL_CHANGED,    timestamp: datetime.utcnow().isoformat(),    version: 1.0,    payload: {        productId: PROD-456,        locationId: WH-123,        previousQuantity: 100,        newQuantity: 95,        changeReason: ORDER_FULFILLED,        unitOfMeasure: EACH,        batchInfo: {            batchId: BATCH-789,            expiryDate: 2025-12-31       }    },    metadata: {        source: warehouse_system,        correlationId: inv-xyz-123,        userId: john.doe   }}Send the message - using productId as key for partitioningproducer.send(    topic,     key=inventory_event[payload][productId].encode(utf-8),    value=inventory_event)producer.flush()print(fInventory event sent to topic {topic})##Subscription examplepythonfrom kafka import KafkaConsumerimport jsonfrom datetime import datetimeclass InventoryEventConsumer:    def __init__(self):        Kafka configuration        self.topic = inventory.{env}.events        self.consumer = KafkaConsumer(            self.topic,            bootstrap_servers=[localhost:9092],            group_id=inventory-processor-group,            auto_offset_reset=earliest,            enable_auto_commit=False,            value_deserializer=lambda x: json.loads(x.decode(utf-8)),            key_deserializer=lambda x: x.decode(utf-8) if x else None        )    def process_event(self, event):        Process individual inventory events based on type       event_type = event.get(eventType)                if event_type == STOCK_LEVEL_CHANGED:            self.handle_stock_level_change(event)        elif event_type == LOW_STOCK_ALERT:            self.handle_low_stock_alert(event)        Add more event type handlers as needed    def handle_stock_level_change(self, event):        Handle stock level change events       payload = event[payload]        print(fStock level change detected for product {payload[productId]})        print(fNew quantity: {payload[newQuantity]})        Add your business logic here    def handle_low_stock_alert(self, event):        Handle low stock alert events       payload = event[payload]        print(fLow stock alert for product {payload[productId]})        print(fCurrent quantity: {payload[currentQuantity]})        Add your business logic here    def start_consuming(self):        Start consuming messages from the topic       try:            print(fStarting consumption from topic: {self.topic})            for message in self.consumer:                try:                    Process the message                    event = message.value                    print(fReceived event: {event[eventType]} for product: {event[payload][productId]})                                        Process the event                    self.process_event(event)                                        Commit the offset after successful processing                    self.consumer.commit()                                    except Exception as e:                    print(fError processing message: {str(e)})                    Implement your error handling logic here                    You might want to send to a DLQ (Dead Letter Queue)                except Exception as e:            print(fConsumer error: {str(e)})        finally:            Clean up            self.consumer.close()if     Create and start the consumer    consumer = InventoryEventConsumer()    consumer.start_consuming() ',
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
        ],
        producers: [
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
              summary: 'Service that handles orders',
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
            body: 'import Footer fromcatalog/components/footer.astro OverviewThe Orders Service is responsible for managing customer orders within the system. It handles order creation, updating, status tracking, and interactions with other services such as Inventory, Payment, and Notification services to ensure smooth order processing and fulfillment.#Architecture diagram <Footer />',
            filePath:
              '../examples/default/domains/E-Commerce/subdomains/Orders/services/OrdersService/versioned/0.0.2/index.mdx',
            digest: '942495f4e1b12dcb',
            deferredRender: true,
            collection: 'services',
          },
        ],
        consumers: [
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
              repository: {
                language: 'JavaScript',
                url: 'https://github.com/event-catalog/pretend-shipping-service',
              },
              deprecated: {
                message:
                  'This service is **being deprecated** and replaced by the new service **InventoryServiceV2**.Please contact the [team for more information](mailto:inventory-team@example.com) or visit our [website](https://eventcatalog.dev).',
                date: '2026-05-01T00:00:00.000Z',
              },
            },
            filePath: '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/index.mdx',
            digest: '6aaa18b0014d9edc',
            deferredRender: true,
            collection: 'services',
          },
        ],
        versions: ['0.0.3'],
        latestVersion: '0.0.3',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewThe AddInventory command is issued to add new stock to the inventory. This command is used by the inventory management system to update the quantity of products available in the warehouse or store.#Architecture diagram<NodeGraph/>#Payload examplejson Payload example{  productId: 789e1234-b56c-78d9-e012-3456789fghij,  quantity: 50,  warehouseId: 456e7891-c23d-45f6-b78a-123456789abc,  timestamp: 2024-07-04T14:48:00Z}#Schema<Schema fileschema.json/><Footer />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/commands/AddInventory/index.mdx',
      digest: '106b7429daebcbb9',
      deferredRender: true,
      collection: 'commands',
      catalog: {
        path: 'commands/AddInventory-0.0.3',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/commands/AddInventory-0.0.3',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/commands/AddInventory-0.0.3',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/commands/AddInventory-0.0.3',
        publicPath: '/generated/commands/AddInventory',
        type: 'command',
      },
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
        messageChannels: [],
        producers: [],
        consumers: [
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
        ],
        versions: ['0.0.1'],
        latestVersion: '0.0.1',
      },
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/ShippingService/commands/CancelShipment/index.mdx',
      digest: '48d96360e9322568',
      deferredRender: true,
      collection: 'commands',
      catalog: {
        path: 'commands/CancelShipment-0.0.1',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/commands/CancelShipment-0.0.1',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/commands/CancelShipment-0.0.1',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/commands/CancelShipment-0.0.1',
        publicPath: '/generated/commands/CancelShipment',
        type: 'command',
      },
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
        messageChannels: [],
        producers: [],
        consumers: [
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
        ],
        versions: ['0.0.1'],
        latestVersion: '0.0.1',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewTheCancelSubscriptioncommand will try and cancel a subscription for the user.#Architecture diagram<Footer />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Subscriptions/services/SubscriptionService/commands/CancelSubscription/index.mdx',
      digest: 'ff2d317b58f56dbe',
      deferredRender: true,
      collection: 'commands',
      catalog: {
        path: 'commands/CancelSubscription-0.0.1',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/commands/CancelSubscription-0.0.1',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/commands/CancelSubscription-0.0.1',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/commands/CancelSubscription-0.0.1',
        publicPath: '/generated/commands/CancelSubscription',
        type: 'command',
      },
    },
    {
      id: 'CreateReturnLabel-0.0.1',
      data: {
        id: 'CreateReturnLabel',
        name: 'Create return label',
        summary: 'POST request that will create a return label for a specific shipment, identified by its shipmentId.',
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
        messageChannels: [],
        producers: [],
        consumers: [
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
        ],
        versions: ['0.0.1'],
        latestVersion: '0.0.1',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewTheCreateReturnLabelmessage is a command used to create a return label for a specific shipment, identified by itsshipmentId. It provides information such as the shipment status (e.g., pending, completed, shipped), the items within the shipment, billing and shipping details, payment information, and the orders total amount. This query is commonly used by systems managing order processing, customer service, or order tracking functionalities.This command can be applied in e-commerce systems, marketplaces, or any platform where users and systems need real-time shipment data for tracking, auditing, or managing customer purchases. fileschema.jsonJSON SchemaHeight500',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/ShippingService/commands/CreateReturnLabel/index.mdx',
      digest: '0a834e6a2e68b14a',
      deferredRender: true,
      collection: 'commands',
      catalog: {
        path: 'commands/CreateReturnLabel-0.0.1',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/commands/CreateReturnLabel-0.0.1',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/commands/CreateReturnLabel-0.0.1',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/commands/CreateReturnLabel-0.0.1',
        publicPath: '/generated/commands/CreateReturnLabel',
        type: 'command',
      },
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
        messageChannels: [],
        producers: [],
        consumers: [
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
        ],
        versions: ['0.0.1'],
        latestVersion: '0.0.1',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewTheCreateShipmentmessage is a command used to create a shipment for a specific order, identified by itsorderId. It provides information such as the order status (e.g., pending, completed, shipped), the items within the order, billing and shipping details, payment information, and the orders total amount. This query is commonly used by systems managing order processing, customer service, or order tracking functionalities.This command can be applied in e-commerce systems, marketplaces, or any platform where users and systems need real-time order data for tracking, auditing, or managing customer purchases. fileschema.jsonJSON SchemaHeight500',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/ShippingService/commands/CreateShipment/index.mdx',
      digest: '98b8b56fe0d04090',
      deferredRender: true,
      collection: 'commands',
      catalog: {
        path: 'commands/CreateShipment-0.0.1',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/commands/CreateShipment-0.0.1',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/commands/CreateShipment-0.0.1',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/commands/CreateShipment-0.0.1',
        publicPath: '/generated/commands/CreateShipment',
        type: 'command',
      },
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
        messageChannels: [
          {
            id: 'inventory.{env}.events-1.0.0',
            data: {
              address: 'inventory.{env}.events',
              protocols: ['kafka'],
              parameters: {
                env: {
                  enum: ['dev', 'sit', 'prod'],
                  description: 'Environment to use',
                },
              },
              id: 'inventory.{env}.events',
              name: 'Inventory Events Channel',
              summary:
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
        ],
        producers: [],
        consumers: [
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
              repository: {
                language: 'JavaScript',
                url: 'https://github.com/event-catalog/pretend-shipping-service',
              },
              deprecated: {
                message:
                  'This service is **being deprecated** and replaced by the new service **InventoryServiceV2**.Please contact the [team for more information](mailto:inventory-team@example.com) or visit our [website](https://eventcatalog.dev).',
                date: '2026-05-01T00:00:00.000Z',
              },
            },
            filePath: '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/index.mdx',
            digest: '6aaa18b0014d9edc',
            deferredRender: true,
            collection: 'services',
          },
        ],
        versions: ['0.0.3'],
        latestVersion: '0.0.3',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewThe DeleteInventory command is issued to remove a product from the inventory system. This command is used by the inventory management system when a product needs to be completely removed from the warehouse or store catalog, typically due to discontinuation or permanent removal of the item.#Architecture diagram<Footer />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/commands/DeleteInventory/index.mdx',
      digest: '17b28d5ec21cc1f1',
      deferredRender: true,
      collection: 'commands',
      catalog: {
        path: 'commands/DeleteInventory-0.0.3',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/commands/DeleteInventory-0.0.3',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/commands/DeleteInventory-0.0.3',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/commands/DeleteInventory-0.0.3',
        publicPath: '/generated/commands/DeleteInventory',
        type: 'command',
      },
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
        messageChannels: [],
        producers: [],
        consumers: [
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
        ],
        versions: ['0.0.1'],
        latestVersion: '0.0.1',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewThe Order Placement Command is a versatile and robust system designed to streamline the process of placing an order. This command takes care of all the essential details needed to complete a purchase, ensuring a smooth and efficient transaction from start to finish.#Architecture diagram<NodeGraph/>#Schema fileschema.json/><Footer />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/OrdersService/commands/PlaceOrder/index.mdx',
      digest: '19d07e3824d444da',
      deferredRender: true,
      collection: 'commands',
      catalog: {
        path: 'commands/PlaceOrder-0.0.1',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/commands/PlaceOrder-0.0.1',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/commands/PlaceOrder-0.0.1',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/commands/PlaceOrder-0.0.1',
        publicPath: '/generated/commands/PlaceOrder',
        type: 'command',
      },
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
        messageChannels: [],
        producers: [],
        consumers: [
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
        ],
        versions: ['0.0.1'],
        latestVersion: '0.0.1',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewTheSubscribeUsercommand represents when a new user wants to subscribe to our service.#Architecture diagram<Footer />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Subscriptions/services/SubscriptionService/commands/SubscribeUser/index.mdx',
      digest: 'a96417bf8e330295',
      deferredRender: true,
      collection: 'commands',
      catalog: {
        path: 'commands/SubscribeUser-0.0.1',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/commands/SubscribeUser-0.0.1',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/commands/SubscribeUser-0.0.1',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/commands/SubscribeUser-0.0.1',
        publicPath: '/generated/commands/SubscribeUser',
        type: 'command',
      },
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
        messageChannels: [
          {
            id: 'inventory.{env}.events-1.0.0',
            data: {
              address: 'inventory.{env}.events',
              protocols: ['kafka'],
              parameters: {
                env: {
                  enum: ['dev', 'sit', 'prod'],
                  description: 'Environment to use',
                },
              },
              id: 'inventory.{env}.events',
              name: 'Inventory Events Channel',
              summary:
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
        ],
        producers: [],
        consumers: [
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
              repository: {
                language: 'JavaScript',
                url: 'https://github.com/event-catalog/pretend-shipping-service',
              },
              deprecated: {
                message:
                  'This service is **being deprecated** and replaced by the new service **InventoryServiceV2**.Please contact the [team for more information](mailto:inventory-team@example.com) or visit our [website](https://eventcatalog.dev).',
                date: '2026-05-01T00:00:00.000Z',
              },
            },
            filePath: '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/index.mdx',
            digest: '6aaa18b0014d9edc',
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
              summary: 'Service that handles the inventory',
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
            body: '#OverviewThe Inventory Service is a critical component of the system responsible for managing product stock levels, tracking inventory movements, and ensuring product availability. It interacts with other services to maintain accurate inventory records and supports operations such as order fulfillment, restocking, and inventory audits.#Architecture diagram<NodeGraph Hello world',
            filePath:
              '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/versioned/0.0.1/index.mdx',
            digest: '405a2c4b0e672d22',
            deferredRender: true,
            collection: 'services',
          },
        ],
        versions: ['0.0.3'],
        latestVersion: '0.0.3',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewThe UpdateInventory command is issued to update the existing stock levels of a product in the inventory. This command is used by the inventory management system to adjust the quantity of products available in the warehouse or store, either by increasing or decreasing the current stock levels.#Architecture diagram fileschema.jsonJSON SchemaHeight500#Payload examplejson Payload example{  productId: 789e1234-b56c-78d9-e012-3456789fghij,  quantityChange: -10,  warehouseId: 456e7891-c23d-45f6-b78a-123456789abc,  timestamp: 2024-07-04T14:48:00Z}#Schema (JSON schema)<Schema fileschema.json/><Footer />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/commands/UpdateInventory/index.mdx',
      digest: '7a6aa4f22e442604',
      deferredRender: true,
      collection: 'commands',
      catalog: {
        path: 'commands/UpdateInventory-0.0.3',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/commands/UpdateInventory-0.0.3',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/commands/UpdateInventory-0.0.3',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/commands/UpdateInventory-0.0.3',
        publicPath: '/generated/commands/UpdateInventory',
        type: 'command',
      },
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
        messageChannels: [],
        producers: [],
        consumers: [
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
        ],
        versions: ['0.0.1'],
        latestVersion: '0.0.1',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewTheUpdateShipmentStatusmessage is a command used to update the status of a shipment, identified by itsshipmentId. It provides information such as the shipment status (e.g., pending, completed, shipped), the items within the shipment, billing and shipping details, payment information, and the orders total amount. This query is commonly used by systems managing order processing, customer service, or order tracking functionalities.This command can be applied in e-commerce systems, marketplaces, or any platform where users and systems need real-time shipment data for tracking, auditing, or managing customer purchases. fileschema.jsonJSON SchemaHeight500',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/ShippingService/commands/UpdateShipmentStatus/index.mdx',
      digest: '73cf35e5d36acfd9',
      deferredRender: true,
      collection: 'commands',
      catalog: {
        path: 'commands/UpdateShipmentStatus-0.0.1',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/commands/UpdateShipmentStatus-0.0.1',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/commands/UpdateShipmentStatus-0.0.1',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/commands/UpdateShipmentStatus-0.0.1',
        publicPath: '/generated/commands/UpdateShipmentStatus',
        type: 'command',
      },
    },
  ],
  events: [
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
        messageChannels: [],
        producers: [
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
        ],
        consumers: [],
        versions: ['0.0.1'],
        latestVersion: '0.0.1',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewTheDeliveryFailedevent is emitted when a shipment delivery fails. It provides information such as the shipment status (e.g., pending, completed, shipped), the items within the shipment, billing and shipping details, payment information, and the orders total amount. This query is commonly used by systems managing order processing, customer service, or order tracking functionalities.This event can be applied in e-commerce systems, marketplaces, or any platform where users and systems need real-time shipment data for tracking, auditing, or managing customer purchases. fileschema.jsonJSON SchemaHeight500',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/ShippingService/events/DeliveryFailed/index.mdx',
      digest: '388b45c6a5232dd7',
      deferredRender: true,
      collection: 'events',
      catalog: {
        path: 'events/DeliveryFailed-0.0.1',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/events/DeliveryFailed-0.0.1',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/events/DeliveryFailed-0.0.1',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/events/DeliveryFailed-0.0.1',
        publicPath: '/generated/events/DeliveryFailed',
        type: 'event',
      },
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
        messageChannels: [
          {
            id: 'inventory.{env}.events-1.0.0',
            data: {
              address: 'inventory.{env}.events',
              protocols: ['kafka'],
              parameters: {
                env: {
                  enum: ['dev', 'sit', 'prod'],
                  description: 'Environment to use',
                },
              },
              id: 'inventory.{env}.events',
              name: 'Inventory Events Channel',
              summary:
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
        ],
        producers: [
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
              repository: {
                language: 'JavaScript',
                url: 'https://github.com/event-catalog/pretend-shipping-service',
              },
              deprecated: {
                message:
                  'This service is **being deprecated** and replaced by the new service **InventoryServiceV2**.Please contact the [team for more information](mailto:inventory-team@example.com) or visit our [website](https://eventcatalog.dev).',
                date: '2026-05-01T00:00:00.000Z',
              },
            },
            filePath: '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/index.mdx',
            digest: '6aaa18b0014d9edc',
            deferredRender: true,
            collection: 'services',
          },
        ],
        consumers: [
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
              summary: 'Service that handles orders',
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
        ],
        versions: ['1.0.1', '1.0.0', '0.0.1'],
        latestVersion: '1.0.1',
      },
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/events/InventoryAdjusted/index.mdx',
      digest: 'ade660eb81993fdd',
      deferredRender: true,
      collection: 'events',
      catalog: {
        path: 'events/InventoryAdjusted-1.0.1',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/events/InventoryAdjusted-1.0.1',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/events/InventoryAdjusted-1.0.1',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/events/InventoryAdjusted-1.0.1',
        publicPath: '/generated/events/InventoryAdjusted',
        type: 'event',
      },
    },
    {
      id: 'InventoryAdjusted-1.0.0',
      data: {
        id: 'InventoryAdjusted',
        name: 'Inventory adjusted',
        summary: 'Indicates a change in inventory level',
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
        messageChannels: [],
        producers: [],
        consumers: [],
        versions: ['1.0.1', '1.0.0', '0.0.1'],
        latestVersion: '1.0.1',
      },
      body: '#OverviewTheInventory Adjustedevent is triggered whenever there is a change in the inventory levels of a product. This could occur due to various reasons such as receiving new stock, sales, returns, or manual adjustments by the inventory management team. The event ensures that all parts of the system that rely on inventory data are kept up-to-date with the latest inventory levels.#Event Details##Event Nameinventory.adjusted##DescriptionThis event indicates that the inventory count for one or more products has been adjusted. The event carries the updated inventory details including the product ID, the new quantity, and the reason for the adjustment.##PayloadThe payload of theInventory Adjustedevent includes the following fields:json Example of payloadframeterminal{  event_id: string,  timestamp: ISO 8601 date-time,  product_id: string,  adjusted_quantity: integer,  new_quantity: integer,  adjustment_reason: string,  adjusted_by: string}##Producing the EventTo produce an Inventory Adjusted event, use the following example Kafka producer configuration in Python:python Produce event in Pythonframeterminalfrom kafka import KafkaProducerimport jsonfrom datetime import datetimeKafka configurationproducer = KafkaProducer(    bootstrap_servers=[localhost:9092],    value_serializer=lambda v: json.dumps(v).encode(utf-8))Event dataevent_data = {  event_id: abc123,  timestamp: datetime.utcnow().isoformat() + Z,  product_id: prod987,  adjusted_quantity: 10,  new_quantity: 150,  adjustment_reason: restock,  adjusted_by: user123}Send event to Kafka topicproducer.send(inventory.adjusted, event_data)producer.flush()##Consuming the EventTo consume an Inventory Adjusted event, use the following example Kafka consumer configuration in Python:python Consuming the event with pythonframeterminalfrom kafka import KafkaConsumerimport jsonKafka configurationconsumer = KafkaConsumer(    inventory.adjusted,    bootstrap_servers=[localhost:9092],    auto_offset_reset=earliest,    enable_auto_commit=True,    group_id=inventory_group,    value_serializer=lambda v: json.dumps(v).encode(utf-8))Consume eventsfor message in consumer:    event_data = json.loads(message.value)    print(fReceived Inventory Adjusted event: {event_data})',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/events/InventoryAdjusted/versioned/1.0.0/index.mdx',
      digest: '154e74d94c13ff7f',
      deferredRender: true,
      collection: 'events',
      catalog: {
        path: 'events/InventoryAdjusted-1.0.0',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/events/InventoryAdjusted-1.0.0',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/events/InventoryAdjusted-1.0.0',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/events/InventoryAdjusted-1.0.0',
        publicPath: '/generated/events/InventoryAdjusted',
        type: 'event',
      },
    },
    {
      id: 'InventoryAdjusted-0.0.1',
      data: {
        id: 'InventoryAdjusted',
        name: 'Inventory adjusted',
        summary: 'Indicates a change in inventory level',
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
        messageChannels: [],
        producers: [],
        consumers: [],
        versions: ['1.0.1', '1.0.0', '0.0.1'],
        latestVersion: '1.0.1',
      },
      body: ':::warningWhen firing this event make sure you set thecorrelation-idin the headers. Our schemas have standard metadata make sure you read and follow it.:::##Details',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/events/InventoryAdjusted/versioned/0.0.1/index.mdx',
      digest: 'fa4f677953cd3546',
      deferredRender: true,
      collection: 'events',
      catalog: {
        path: 'events/InventoryAdjusted-0.0.1',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/events/InventoryAdjusted-0.0.1',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/events/InventoryAdjusted-0.0.1',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/events/InventoryAdjusted-0.0.1',
        publicPath: '/generated/events/InventoryAdjusted',
        type: 'event',
      },
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
        messageChannels: [
          {
            id: 'inventory.{env}.events-1.0.0',
            data: {
              address: 'inventory.{env}.events',
              protocols: ['kafka'],
              parameters: {
                env: {
                  enum: ['dev', 'sit', 'prod'],
                  description: 'Environment to use',
                },
              },
              id: 'inventory.{env}.events',
              name: 'Inventory Events Channel',
              summary:
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
        ],
        producers: [
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
              summary: 'Service that handles orders',
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
              summary: 'Service that handles the inventory',
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
                  'This service is **being deprecated** and replaced by the new service **InventoryServiceV2**.Please contact the [team for more information](mailto:inventory-team@example.com) or visit our [website](https://eventcatalog.dev).',
                date: '2026-05-01T00:00:00.000Z',
              },
            },
            filePath: '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/index.mdx',
            digest: '6aaa18b0014d9edc',
            deferredRender: true,
            collection: 'services',
          },
        ],
        consumers: [],
        versions: ['0.0.4', '0.0.1'],
        latestVersion: '0.0.4',
      },
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/events/OutOfStock/index.mdx',
      digest: '5a97dd73fa169ad6',
      deferredRender: true,
      collection: 'events',
      catalog: {
        path: 'events/OutOfStock-0.0.4',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/events/OutOfStock-0.0.4',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/events/OutOfStock-0.0.4',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/events/OutOfStock-0.0.4',
        publicPath: '/generated/events/OutOfStock',
        type: 'event',
      },
    },
    {
      id: 'OutOfStock-0.0.1',
      data: {
        id: 'OutOfStock',
        name: 'Inventory out of stock',
        summary: 'Indicates inventory is out of stock',
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
        messageChannels: [],
        producers: [],
        consumers: [],
        versions: ['0.0.4', '0.0.1'],
        latestVersion: '0.0.4',
      },
      body: '#OverviewTheInventory Adjustedevent is triggered whenever there is a change in the inventory levels of a product. This could occur due to various reasons such as receiving new stock, sales, returns, or manual adjustments by the inventory management team. The event ensures that all parts of the system that rely on inventory data are kept up-to-date with the latest inventory levels.##PayloadThe payload of theInventory Adjustedevent includes the following fields:json Example of payloadframeterminal{  event_id: string,  timestamp: ISO 8601 date-time,  product_id: string,  adjusted_quantity: integer,  new_quantity: integer,  adjustment_reason: string,  adjusted_by: string}##Producing the EventTo produce an Inventory Adjusted event, use the following example Kafka producer configuration in Python:python Produce event in Pythonframeterminalfrom kafka import KafkaProducerimport jsonfrom datetime import datetimeKafka configurationproducer = KafkaProducer(    bootstrap_servers=[localhost:9092],    value_serializer=lambda v: json.dumps(v).encode(utf-8))Event dataevent_data = {  event_id: abc123,  timestamp: datetime.utcnow().isoformat() + Z,  product_id: prod987,  adjusted_quantity: 10,  new_quantity: 150,  adjustment_reason: restock,  adjusted_by: user123}Send event to Kafka topicproducer.send(inventory.adjusted, event_data)producer.flush()##Consuming the EventTo consume an Inventory Adjusted event, use the following example Kafka consumer configuration in Python:python Consuming the event with pythonframeterminalfrom kafka import KafkaConsumerimport jsonKafka configurationconsumer = KafkaConsumer(    inventory.adjusted,    bootstrap_servers=[localhost:9092],    auto_offset_reset=earliest,    enable_auto_commit=True,    group_id=inventory_group,    value_serializer=lambda v: json.dumps(v).encode(utf-8))Consume eventsfor message in consumer:    event_data = json.loads(message.value)    print(fReceived Inventory Adjusted event: {event_data})',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/events/OutOfStock/versioned/0.0.1/index.mdx',
      digest: '01f920ef8d292ab3',
      deferredRender: true,
      collection: 'events',
      catalog: {
        path: 'events/OutOfStock-0.0.1',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/events/OutOfStock-0.0.1',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/events/OutOfStock-0.0.1',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/events/OutOfStock-0.0.1',
        publicPath: '/generated/events/OutOfStock',
        type: 'event',
      },
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
        messageChannels: [
          {
            id: 'orders.{env}.events-1.0.1',
            data: {
              address: 'orders.{env}.events',
              protocols: ['azure-servicebus'],
              parameters: {
                env: {
                  enum: ['dev', 'sit', 'prod'],
                  description: 'Environment to use',
                },
              },
              id: 'orders.{env}.events',
              name: 'Order Events Channel',
              summary: 'Central event stream for all order-related events in the order processing lifecycle',
              version: '1.0.1',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
              sidebar: {
                badge: 'ServiceBus',
              },
            },
            filePath: '../examples/default/channels/orders.{env}.events/index.mdx',
            digest: 'c2c6119dcd57051c',
            deferredRender: true,
            collection: 'channels',
          },
        ],
        producers: [
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
        ],
        consumers: [
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
              repository: {
                language: 'JavaScript',
                url: 'https://github.com/event-catalog/pretend-shipping-service',
              },
              deprecated: {
                message:
                  'This service is **being deprecated** and replaced by the new service **InventoryServiceV2**.Please contact the [team for more information](mailto:inventory-team@example.com) or visit our [website](https://eventcatalog.dev).',
                date: '2026-05-01T00:00:00.000Z',
              },
            },
            filePath: '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/index.mdx',
            digest: '6aaa18b0014d9edc',
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
              summary: 'Service that handles the inventory',
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
            body: '#OverviewThe Inventory Service is a critical component of the system responsible for managing product stock levels, tracking inventory movements, and ensuring product availability. It interacts with other services to maintain accurate inventory records and supports operations such as order fulfillment, restocking, and inventory audits.#Architecture diagram<NodeGraph Hello world',
            filePath:
              '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/versioned/0.0.1/index.mdx',
            digest: '405a2c4b0e672d22',
            deferredRender: true,
            collection: 'services',
          },
        ],
        versions: ['0.0.1'],
        latestVersion: '0.0.1',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewThe OrderAmended event is triggered whenever an existing order is modified. This event ensures that all relevant services are notified of changes to an order, such as updates to order items, quantities, shipping information, or status. The event allows the system to maintain consistency and ensure that all dependent services can react appropriately to the amendments.#Example payloadjson Example Payload{  orderId: 123e4567-e89b-12d3-a456-426614174000,  userId: 123e4567-e89b-12d3-a456-426614174000,  amendedItems: [    {      productId: 789e1234-b56c-78d9-e012-3456789fghij,      productName: Example Product,      oldQuantity: 2,      newQuantity: 3,      unitPrice: 29.99,      totalPrice: 89.97    }  ],  orderStatus: confirmed,  totalAmount: 150.75,  timestamp: 2024-07-04T14:48:00Z}#Schema (Avro)s<Schema fileschema.avro#Schema (JSON)<Schema fileschema.json<Footer />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/OrdersService/events/OrderAmended/index.mdx',
      digest: '1c2e739addd67a6a',
      deferredRender: true,
      collection: 'events',
      catalog: {
        path: 'events/OrderAmended-0.0.1',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/events/OrderAmended-0.0.1',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/events/OrderAmended-0.0.1',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/events/OrderAmended-0.0.1',
        publicPath: '/generated/events/OrderAmended',
        type: 'event',
      },
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
        messageChannels: [
          {
            id: 'orders.{env}.events-1.0.1',
            data: {
              address: 'orders.{env}.events',
              protocols: ['azure-servicebus'],
              parameters: {
                env: {
                  enum: ['dev', 'sit', 'prod'],
                  description: 'Environment to use',
                },
              },
              id: 'orders.{env}.events',
              name: 'Order Events Channel',
              summary: 'Central event stream for all order-related events in the order processing lifecycle',
              version: '1.0.1',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
              sidebar: {
                badge: 'ServiceBus',
              },
            },
            filePath: '../examples/default/channels/orders.{env}.events/index.mdx',
            digest: 'c2c6119dcd57051c',
            deferredRender: true,
            collection: 'channels',
          },
        ],
        producers: [
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
        ],
        consumers: [
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
              summary: 'Service that handles the inventory',
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
            body: '#OverviewThe Inventory Service is a critical component of the system responsible for managing product stock levels, tracking inventory movements, and ensuring product availability. It interacts with other services to maintain accurate inventory records and supports operations such as order fulfillment, restocking, and inventory audits.#Architecture diagram<NodeGraph Hello world',
            filePath:
              '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/versioned/0.0.1/index.mdx',
            digest: '405a2c4b0e672d22',
            deferredRender: true,
            collection: 'services',
          },
        ],
        versions: ['0.0.1'],
        latestVersion: '0.0.1',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewThe OrderCancelled event is triggered whenever an existing order is cancelled. This event ensures that all relevant services are notified of the cancellation, allowing them to take appropriate actions such as updating inventory levels, refunding payments, and notifying the user. The event helps maintain consistency across the system by ensuring all dependent services are aware of the order cancellation.#Example payloadjson Example payload{  orderId: 123e4567-e89b-12d3-a456-426614174000,  userId: 123e4567-e89b-12d3-a456-426614174000,  orderItems: [    {      productId: 789e1234-b56c-78d9-e012-3456789fghij,      productName: Example Product,      quantity: 2,      unitPrice: 29.99,      totalPrice: 59.98    }  ],  orderStatus: cancelled,  totalAmount: 59.98,  cancellationReason: Customer requested cancellation,  timestamp: 2024-07-04T14:48:00Z}#SchemaJSON schema for the event.<Schema JSON Schemafileschema.json/><Footer />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/OrdersService/events/OrderCancelled/index.mdx',
      digest: '978875f2e0eb596a',
      deferredRender: true,
      collection: 'events',
      catalog: {
        path: 'events/OrderCancelled-0.0.1',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/events/OrderCancelled-0.0.1',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/events/OrderCancelled-0.0.1',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/events/OrderCancelled-0.0.1',
        publicPath: '/generated/events/OrderCancelled',
        type: 'event',
      },
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
        messageChannels: [
          {
            id: 'orders.{env}.events-1.0.1',
            data: {
              address: 'orders.{env}.events',
              protocols: ['azure-servicebus'],
              parameters: {
                env: {
                  enum: ['dev', 'sit', 'prod'],
                  description: 'Environment to use',
                },
              },
              id: 'orders.{env}.events',
              name: 'Order Events Channel',
              summary: 'Central event stream for all order-related events in the order processing lifecycle',
              version: '1.0.1',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
              sidebar: {
                badge: 'ServiceBus',
              },
            },
            filePath: '../examples/default/channels/orders.{env}.events/index.mdx',
            digest: 'c2c6119dcd57051c',
            deferredRender: true,
            collection: 'channels',
          },
        ],
        producers: [
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
        ],
        consumers: [
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
              repository: {
                language: 'JavaScript',
                url: 'https://github.com/event-catalog/pretend-shipping-service',
              },
              deprecated: {
                message:
                  'This service is **being deprecated** and replaced by the new service **InventoryServiceV2**.Please contact the [team for more information](mailto:inventory-team@example.com) or visit our [website](https://eventcatalog.dev).',
                date: '2026-05-01T00:00:00.000Z',
              },
            },
            filePath: '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/index.mdx',
            digest: '6aaa18b0014d9edc',
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
              summary: 'Service that handles the inventory',
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
            body: '#OverviewThe Inventory Service is a critical component of the system responsible for managing product stock levels, tracking inventory movements, and ensuring product availability. It interacts with other services to maintain accurate inventory records and supports operations such as order fulfillment, restocking, and inventory audits.#Architecture diagram<NodeGraph Hello world',
            filePath:
              '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/versioned/0.0.1/index.mdx',
            digest: '405a2c4b0e672d22',
            deferredRender: true,
            collection: 'services',
          },
        ],
        versions: ['0.0.1'],
        latestVersion: '0.0.1',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewThe OrderConfirmed event is triggered when an order has been successfully confirmed. This event notifies relevant services that the order is ready for further processing, such as inventory adjustment, payment finalization, and preparation for shipping.#Architecture Diagram#Payloadjson Example payload{  orderId: 123e4567-e89b-12d3-a456-426614174000,  userId: 123e4567-e89b-12d3-a456-426614174000,  orderItems: [    {      productId: 789e1234-b56c-78d9-e012-3456789fghij,      productName: Example Product,      quantity: 2,      unitPrice: 29.99,      totalPrice: 59.98    }  ],  orderStatus: confirmed,  totalAmount: 150.75,  confirmationTimestamp: 2024-07-04T14:48:00Z}#Schema<Schema fileschema.json/><Footer />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/OrdersService/events/OrderConfirmed/index.mdx',
      digest: '25c0eccde9d78e40',
      deferredRender: true,
      collection: 'events',
      catalog: {
        path: 'events/OrderConfirmed-0.0.1',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/events/OrderConfirmed-0.0.1',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/events/OrderConfirmed-0.0.1',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/events/OrderConfirmed-0.0.1',
        publicPath: '/generated/events/OrderConfirmed',
        type: 'event',
      },
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
        messageChannels: [
          {
            id: 'payments.{env}.events-1.0.0',
            data: {
              address: 'payments.{env}.events',
              protocols: ['kafka'],
              parameters: {
                env: {
                  enum: ['dev', 'sit', 'prod'],
                  description: 'Environment to use for payment events',
                },
              },
              id: 'payments.{env}.events',
              name: 'Payment Events Channel',
              summary: 'All events contain payment ID for traceability and ordered processing.',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            filePath: '../examples/default/channels/payment.{env}.events/index.mdx',
            digest: '261c4005551cac3f',
            deferredRender: true,
            collection: 'channels',
          },
        ],
        producers: [],
        consumers: [
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
        ],
        versions: ['0.0.1'],
        latestVersion: '0.0.1',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewThe Payment Initiated event is triggered when a user initiates a payment through the Payment Service. This event signifies the beginning of the payment process and contains all necessary information to process the payment.##Payload Examplejson Payload example{  userId: 123e4567-e89b-12d3-a456-426614174000,  orderId: 789e1234-b56c-78d9-e012-3456789fghij,  amount: 100.50,  paymentMethod: CreditCard,  timestamp: 2024-07-04T14:48:00Z}##Security Considerations- **Authentication**: Ensure that only authenticated users can initiate a payment, and the userId in the payload matches the authenticated user.- **Data Validation**: Validate all input data to prevent injection attacks or other malicious input.- **Sensitive Data Handling**: Avoid including sensitive information (e.g., credit card numbers) in the event payload. Use secure channels and encryption for such data.<Footer />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Payment/services/PaymentService/events/PaymentInitiated/index.mdx',
      digest: '9dba7743582f388c',
      deferredRender: true,
      collection: 'events',
      catalog: {
        path: 'events/PaymentInitiated-0.0.1',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/events/PaymentInitiated-0.0.1',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/events/PaymentInitiated-0.0.1',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/events/PaymentInitiated-0.0.1',
        publicPath: '/generated/events/PaymentInitiated',
        type: 'event',
      },
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
        messageChannels: [
          {
            id: 'payments.{env}.events-1.0.0',
            data: {
              address: 'payments.{env}.events',
              protocols: ['kafka'],
              parameters: {
                env: {
                  enum: ['dev', 'sit', 'prod'],
                  description: 'Environment to use for payment events',
                },
              },
              id: 'payments.{env}.events',
              name: 'Payment Events Channel',
              summary: 'All events contain payment ID for traceability and ordered processing.',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '##OverviewThe Payments Events channel is the central stream for all payment lifecycle events. This includes payment initiation, authorization, capture, completion and failure scenarios. Events for a specific payment are guaranteed to be processed in sequence when using paymentId as the partition key.<ChannelInformation />##Publishing Events Using KafkaHeres an example of publishing a payment event:pythonfrom kafka import KafkaProducerimport jsonfrom datetime import datetimeKafka configurationbootstrap_servers = [localhost:9092]topic = payments.{env}.eventsCreate Kafka producerproducer = KafkaProducer(   bootstrap_servers=bootstrap_servers,   value_serializer=lambda v: json.dumps(v).encode(utf-8))Example payment processed eventpayment_event = {   eventType: PAYMENT_PROCESSED,   timestamp: datetime.utcnow().isoformat(),   version: 1.0,   payload: {       paymentId: PAY-123-456,        orderId: ORD-789,       amount: {           value: 99.99,           currency: USD      },       status: SUCCESS,       paymentMethod: {           type: CREDIT_CARD,           last4: 4242,           expiryMonth: 12,           expiryYear: 2025,           network: VISA      },       transactionDetails: {           processorId: stripe_123xyz,           authorizationCode: AUTH123,           captureId: CAP456      }   },   metadata: {       correlationId: corr-123-abc,       merchantId: MERCH-456,        source: payment_service,       environment: prod,       idempotencyKey: PAY-123-456-2024-11-11-99.99  }}Send message - using paymentId as key for partitioningproducer.send(   topic,   key=payment_event[payload][paymentId].encode(utf-8),   value=payment_event)producer.flush()',
            filePath: '../examples/default/channels/payment.{env}.events/index.mdx',
            digest: '261c4005551cac3f',
            deferredRender: true,
            collection: 'channels',
          },
        ],
        producers: [],
        consumers: [
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
              summary: 'Service that handles orders',
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
        ],
        versions: ['1.0.0', '0.0.1'],
        latestVersion: '1.0.0',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewThe PaymentProcessed event is triggered after the payment has been successfully processed by the Payment Service. This event signifies that a payment has been confirmed, and it communicates the outcome to other services and components within the system.##Payload Examplejson Payload example{  transactionId: 123e4567-e89b-12d3-a456-426614174000,  userId: 123e4567-e89b-12d3-a456-426614174000,  orderId: 789e1234-b56c-78d9-e012-3456789fghij,  amount: 100.50,  paymentMethod: CreditCard,  status: confirmed,  confirmationDetails: {    gatewayResponse: Approved,    transactionId: abc123 },  timestamp: 2024-07-04T14:48:00Z}##Security Considerations- **Data Validation**: Ensure that all data in the event payload is validated before publishing to prevent injection attacks or other malicious activities.- **Sensitive Data Handling**: Avoid including sensitive information (e.g., full credit card numbers) in the event payload. Use secure channels and encryption for such data.- **Authentication and Authorization**: Ensure that only authorized services can publish or consume PaymentProcessed events.<Footer />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Payment/services/PaymentService/events/PaymentProcessed/index.mdx',
      digest: '45b319e31a874a90',
      deferredRender: true,
      collection: 'events',
      catalog: {
        path: 'events/PaymentProcessed-1.0.0',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/events/PaymentProcessed-1.0.0',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/events/PaymentProcessed-1.0.0',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/events/PaymentProcessed-1.0.0',
        publicPath: '/generated/events/PaymentProcessed',
        type: 'event',
      },
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
        messageChannels: [],
        producers: [
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
        ],
        consumers: [
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
        ],
        versions: ['1.0.0', '0.0.1'],
        latestVersion: '1.0.0',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewThe PaymentProcessed event is triggered after the payment has been successfully processed by the Payment Service. This event signifies that a payment has been confirmed, and it communicates the outcome to other services and components within the system.##Payload Examplejson Payload example{  transactionId: 123e4567-e89b-12d3-a456-426614174000,  userId: 123e4567-e89b-12d3-a456-426614174000,  orderId: 789e1234-b56c-78d9-e012-3456789fghij,  amount: 100.50,  paymentMethod: CreditCard,  status: confirmed,  confirmationDetails: {    gatewayResponse: Approved,    transactionId: abc123 },  timestamp: 2024-07-04T14:48:00Z}##Security Considerations- **Data Validation**: Ensure that all data in the event payload is validated before publishing to prevent injection attacks or other malicious activities.- **Sensitive Data Handling**: Avoid including sensitive information (e.g., full credit card numbers) in the event payload. Use secure channels and encryption for such data.- **Authentication and Authorization**: Ensure that only authorized services can publish or consume PaymentProcessed events.<Footer />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Payment/services/PaymentService/events/PaymentProcessed/versioned/0.0.1/index.mdx',
      digest: '1b67685ce94288a6',
      deferredRender: true,
      collection: 'events',
      catalog: {
        path: 'events/PaymentProcessed-0.0.1',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/events/PaymentProcessed-0.0.1',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/events/PaymentProcessed-0.0.1',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/events/PaymentProcessed-0.0.1',
        publicPath: '/generated/events/PaymentProcessed',
        type: 'event',
      },
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
        messageChannels: [],
        producers: [
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
        ],
        consumers: [],
        versions: ['0.0.1'],
        latestVersion: '0.0.1',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewTheReturnInitiatedevent is emitted when a return is initiated. It provides information such as the shipment status (e.g., pending, completed, shipped), the items within the shipment, billing and shipping details, payment information, and the orders total amount. This query is commonly used by systems managing order processing, customer service, or order tracking functionalities.This event can be applied in e-commerce systems, marketplaces, or any platform where users and systems need real-time return data for tracking, auditing, or managing customer purchases. fileschema.jsonJSON SchemaHeight500',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/ShippingService/events/ReturnInitiated/index.mdx',
      digest: '8c07547b7d221ec0',
      deferredRender: true,
      collection: 'events',
      catalog: {
        path: 'events/ReturnInitiated-0.0.1',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/events/ReturnInitiated-0.0.1',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/events/ReturnInitiated-0.0.1',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/events/ReturnInitiated-0.0.1',
        publicPath: '/generated/events/ReturnInitiated',
        type: 'event',
      },
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
        messageChannels: [],
        producers: [
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
        ],
        consumers: [],
        versions: ['0.0.1'],
        latestVersion: '0.0.1',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewTheShipmentCreatedevent is emitted when a shipment is created. It provides information such as the shipment status (e.g., pending, completed, shipped), the items within the shipment, billing and shipping details, payment information, and the orders total amount. This query is commonly used by systems managing order processing, customer service, or order tracking functionalities.This event can be applied in e-commerce systems, marketplaces, or any platform where users and systems need real-time shipment data for tracking, auditing, or managing customer purchases. fileschema.jsonJSON SchemaHeight500',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/ShippingService/events/ShipmentCreated/index.mdx',
      digest: '81baf1c8ce150762',
      deferredRender: true,
      collection: 'events',
      catalog: {
        path: 'events/ShipmentCreated-0.0.1',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/events/ShipmentCreated-0.0.1',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/events/ShipmentCreated-0.0.1',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/events/ShipmentCreated-0.0.1',
        publicPath: '/generated/events/ShipmentCreated',
        type: 'event',
      },
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
        messageChannels: [],
        producers: [
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
        ],
        consumers: [],
        versions: ['0.0.1'],
        latestVersion: '0.0.1',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewTheShipmentDeliveredevent is emitted when a shipment is delivered. It provides information such as the shipment status (e.g., pending, completed, shipped), the items within the shipment, billing and shipping details, payment information, and the orders total amount. This query is commonly used by systems managing order processing, customer service, or order tracking functionalities.This event can be applied in e-commerce systems, marketplaces, or any platform where users and systems need real-time shipment data for tracking, auditing, or managing customer purchases. fileschema.jsonJSON SchemaHeight500',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/ShippingService/events/ShipmentDelivered/index.mdx',
      digest: '4aa31b957c9f7f14',
      deferredRender: true,
      collection: 'events',
      catalog: {
        path: 'events/ShipmentDelivered-0.0.1',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/events/ShipmentDelivered-0.0.1',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/events/ShipmentDelivered-0.0.1',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/events/ShipmentDelivered-0.0.1',
        publicPath: '/generated/events/ShipmentDelivered',
        type: 'event',
      },
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
        messageChannels: [],
        producers: [
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
        ],
        consumers: [],
        versions: ['0.0.1'],
        latestVersion: '0.0.1',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewTheShipmentDispatchedevent is emitted when a shipment is dispatched. It provides information such as the shipment status (e.g., pending, completed, shipped), the items within the shipment, billing and shipping details, payment information, and the orders total amount. This query is commonly used by systems managing order processing, customer service, or order tracking functionalities.This event can be applied in e-commerce systems, marketplaces, or any platform where users and systems need real-time shipment data for tracking, auditing, or managing customer purchases. fileschema.jsonJSON SchemaHeight500',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/ShippingService/events/ShipmentDispatched/index.mdx',
      digest: 'cb4e2735758f102b',
      deferredRender: true,
      collection: 'events',
      catalog: {
        path: 'events/ShipmentDispatched-0.0.1',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/events/ShipmentDispatched-0.0.1',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/events/ShipmentDispatched-0.0.1',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/events/ShipmentDispatched-0.0.1',
        publicPath: '/generated/events/ShipmentDispatched',
        type: 'event',
      },
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
        messageChannels: [],
        producers: [
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
        ],
        consumers: [],
        versions: ['0.0.1'],
        latestVersion: '0.0.1',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewTheShipmentInTransitevent is emitted when a shipment is in transit. It provides information such as the shipment status (e.g., pending, completed, shipped), the items within the shipment, billing and shipping details, payment information, and the orders total amount. This query is commonly used by systems managing order processing, customer service, or order tracking functionalities.This event can be applied in e-commerce systems, marketplaces, or any platform where users and systems need real-time shipment data for tracking, auditing, or managing customer purchases. fileschema.jsonJSON SchemaHeight500',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/ShippingService/events/ShipmentInTransit/index.mdx',
      digest: '57803e3280f01326',
      deferredRender: true,
      collection: 'events',
      catalog: {
        path: 'events/ShipmentInTransit-0.0.1',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/events/ShipmentInTransit-0.0.1',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/events/ShipmentInTransit-0.0.1',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/events/ShipmentInTransit-0.0.1',
        publicPath: '/generated/events/ShipmentInTransit',
        type: 'event',
      },
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
        messageChannels: [],
        producers: [
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
        ],
        consumers: [
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
        ],
        versions: ['0.0.1'],
        latestVersion: '0.0.1',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewTheUserSubscriptionCancelledevent is triggered when a users subscription has been cancelled.#Architecture diagram<Footer />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Subscriptions/services/SubscriptionService/events/UserSubscriptionCancelled/index.mdx',
      digest: 'f4393a7ec584dfcb',
      deferredRender: true,
      collection: 'events',
      catalog: {
        path: 'events/UserSubscriptionCancelled-0.0.1',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/events/UserSubscriptionCancelled-0.0.1',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/events/UserSubscriptionCancelled-0.0.1',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/events/UserSubscriptionCancelled-0.0.1',
        publicPath: '/generated/events/UserSubscriptionCancelled',
        type: 'event',
      },
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
        messageChannels: [],
        producers: [
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
        ],
        consumers: [
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
        ],
        versions: ['0.0.1'],
        latestVersion: '0.0.1',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewTheUserSubscriptionStartedevent is triggered when a user starts a new subscription with our service.#Architecture diagram<Footer />',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Subscriptions/services/SubscriptionService/events/UserSubscriptionStarted/index.mdx',
      digest: '975a26dbf5b9579a',
      deferredRender: true,
      collection: 'events',
      catalog: {
        path: 'events/UserSubscriptionStarted-0.0.1',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/events/UserSubscriptionStarted-0.0.1',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/events/UserSubscriptionStarted-0.0.1',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/events/UserSubscriptionStarted-0.0.1',
        publicPath: '/generated/events/UserSubscriptionStarted',
        type: 'event',
      },
    },
  ],
  queries: [
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
        messageChannels: [],
        producers: [],
        consumers: [
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
              repository: {
                language: 'JavaScript',
                url: 'https://github.com/event-catalog/pretend-shipping-service',
              },
              deprecated: {
                message:
                  'This service is **being deprecated** and replaced by the new service **InventoryServiceV2**.Please contact the [team for more information](mailto:inventory-team@example.com) or visit our [website](https://eventcatalog.dev).',
                date: '2026-05-01T00:00:00.000Z',
              },
            },
            filePath: '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/index.mdx',
            digest: '6aaa18b0014d9edc',
            deferredRender: true,
            collection: 'services',
          },
        ],
        versions: ['0.0.1'],
        latestVersion: '0.0.1',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewThe GetInventoryStatus message is a query designed to retrieve the current stock status for a specific product. This query provides detailed information about the available quantity, reserved quantity, and the warehouse location where the product is stored. It is typically used by systems or services that need to determine the real-time availability of a product, enabling efficient stock management, order fulfillment, and inventory tracking processes. This query is essential for ensuring accurate stock levels are reported to downstream systems, including e-commerce platforms, warehouse management systems, and sales channels. fileschema.jsonJSON SchemaHeight500##Query using CURLUse this snippet to query the inventory statussh Example CURL commandcurl -X GET https://api.yourdomain.com/inventory/status\\-H Content-Type: application/json\\-d {  productId: 12345}',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/queries/GetInventoryStatus/index.mdx',
      digest: '00eb1684c4519d03',
      deferredRender: true,
      collection: 'queries',
      catalog: {
        path: 'queries/GetInventoryStatus-0.0.1',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/queries/GetInventoryStatus-0.0.1',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/queries/GetInventoryStatus-0.0.1',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/queries/GetInventoryStatus-0.0.1',
        publicPath: '/generated/queries/GetInventoryStatus',
        type: 'event',
      },
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
        messageChannels: [],
        producers: [],
        consumers: [
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
              summary: 'Service that handles orders',
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
        ],
        versions: ['0.0.1'],
        latestVersion: '0.0.1',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewTheGetNotificationDetailsmessage is a query used to retrieve detailed information about a specific notification identified by itsnotificationId. It provides a comprehensive overview of the notification, including the title, message content, status (read/unread), the date it was created, and any additional metadata related to the notification, such as associated orders or system events. This query is helpful in scenarios where users or systems need detailed insights into a particular notification, such as retrieving full messages or auditing notifications sent to users.Use cases include viewing detailed information about order updates, system notifications, or promotional messages, allowing users to view their full notification history and details. fileschema.jsonJSON SchemaHeight500',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/NotificationService/queries/GetNotificationDetails/index.mdx',
      digest: '5825f3b294eb2545',
      deferredRender: true,
      collection: 'queries',
      catalog: {
        path: 'queries/GetNotificationDetails-0.0.1',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/queries/GetNotificationDetails-0.0.1',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/queries/GetNotificationDetails-0.0.1',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/queries/GetNotificationDetails-0.0.1',
        publicPath: '/generated/queries/GetNotificationDetails',
        type: 'event',
      },
    },
    {
      id: 'GetOrder-0.0.1',
      data: {
        id: 'GetOrder',
        name: 'Get order details',
        summary: 'GET request that will return detailed information about a specific order, identified by its orderId.',
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
        messageChannels: [],
        producers: [
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
              repository: {
                language: 'JavaScript',
                url: 'https://github.com/event-catalog/pretend-shipping-service',
              },
              deprecated: {
                message:
                  'This service is **being deprecated** and replaced by the new service **InventoryServiceV2**.Please contact the [team for more information](mailto:inventory-team@example.com) or visit our [website](https://eventcatalog.dev).',
                date: '2026-05-01T00:00:00.000Z',
              },
            },
            filePath: '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/index.mdx',
            digest: '6aaa18b0014d9edc',
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
              summary: 'Service that handles payments',
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
        ],
        consumers: [
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
        ],
        versions: ['0.0.1'],
        latestVersion: '0.0.1',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewTheGetOrdermessage is a query used to retrieve detailed information about a specific order, identified by itsorderId. It provides information such as the order status (e.g., pending, completed, shipped), the items within the order, billing and shipping details, payment information, and the orders total amount. This query is commonly used by systems managing order processing, customer service, or order tracking functionalities.This query can be applied in e-commerce systems, marketplaces, or any platform where users and systems need real-time order data for tracking, auditing, or managing customer purchases. fileschema.jsonJSON SchemaHeight500',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/OrdersService/queries/GetOrder/index.mdx',
      digest: '71f186bfcba04dad',
      deferredRender: true,
      collection: 'queries',
      catalog: {
        path: 'queries/GetOrder-0.0.1',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/queries/GetOrder-0.0.1',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/queries/GetOrder-0.0.1',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/queries/GetOrder-0.0.1',
        publicPath: '/generated/queries/GetOrder',
        type: 'event',
      },
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
        messageChannels: [],
        producers: [],
        consumers: [
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
              repository: {
                language: 'JavaScript',
                url: 'https://github.com/event-catalog/pretend-shipping-service',
              },
            },
            body: 'The Payment Service is a crucial component of our system that handles all payment-related operations. It processes payments, manages transactions, and communicates with other services through events. Using an event-driven architecture, it ensures that all actions are asynchronous, decoupled, and scalable.##Core features| Feature | Description  Payment Processing | Processes payments and manages transactions || Event-Driven Architecture | Ensures asynchronous, decoupled, and scalable operations || Integration with Payment Gateways | Interfaces with external payment providers |<MessageTable formatalllimit={4} />#InfrastructureThe Payment Service is hosted on AWS.The diagram below shows the infrastructure of the Payment Service. The service is hosted on AWS and uses AWS Lambda to handle the payment requests. The payment is stored in an AWS Aurora database and the payment metadata is stored in an AWS S3 bucket.mermaidarchitecture-beta    group api(logos:aws)    service db(logos:aws-aurora)[Payment DB] in api    service disk1(logos:aws-s3)[Payment Metadata] in api    service server(logos:aws-lambda)[Payment Handler] in api    db:L -- R:server    disk1:T -- B:serverYou can find more information about the Payment Service infrastructure in the [Payment Service documentation](https://github.com/event-catalog/pretend-payment-service/blob/main/README.md).##Key Components- Payment API: Exposes endpoints for initiating payments and querying payment status.- Payment Processor: Handles the core payment processing logic.- Event Bus: Manages the communication between services using events.- Payment Gateway: Interfaces with external payment providers.- Transaction Service: Manages transaction records and states.- Notification Service: Sends notifications related to payment status changes.- Database: Stores transaction data and payment status.',
            filePath: '../examples/default/domains/E-Commerce/subdomains/Payment/services/PaymentService/index.mdx',
            digest: 'f34269b53f50aded',
            deferredRender: true,
            collection: 'services',
          },
        ],
        versions: ['0.0.1'],
        latestVersion: '0.0.1',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewTheGetPaymentStatusmessage is a query used to retrieve the payment status for a specific order, identified by itsorderId. This query returns the current status of the payment, such as whether it is pending, completed, failed, or refunded. It is used by systems that need to track the lifecycle of payments associated with orders, ensuring that the payment has been successfully processed or identifying if any issues occurred during the transaction.This query is useful in scenarios such as order management, refund processing, or payment auditing, ensuring that users or systems have real-time visibility into the payment status for a given order. fileschema.jsonJSON SchemaHeight500',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Payment/services/PaymentService/queries/GetPaymentStatus/index.mdx',
      digest: '85185bb48c156df5',
      deferredRender: true,
      collection: 'queries',
      catalog: {
        path: 'queries/GetPaymentStatus-0.0.1',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/queries/GetPaymentStatus-0.0.1',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/queries/GetPaymentStatus-0.0.1',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/queries/GetPaymentStatus-0.0.1',
        publicPath: '/generated/queries/GetPaymentStatus',
        type: 'event',
      },
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
        messageChannels: [],
        producers: [],
        consumers: [
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
        ],
        versions: ['0.0.2', '0.0.1'],
        latestVersion: '0.0.2',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewTheGetSubscriptionStatusmessage is a query used to retrieve the current subscription status for a specific user, identified by theiruserId. This query returns detailed information about the users subscription, such as its current status (active, canceled, expired), the subscription tier or plan, and the next billing date. It is typically used by systems that manage user subscriptions, billing, and renewal processes to ensure that users are aware of their subscription details and any upcoming renewals.This query is particularly useful in managing subscriptions for SaaS products, media services, or any recurring payment-based services where users need to manage and view their subscription information. fileschema.jsonJSON SchemaHeight500',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Subscriptions/services/SubscriptionService/queries/GetSubscriptionStatus/index.mdx',
      digest: 'c8a50e0186a41b74',
      deferredRender: true,
      collection: 'queries',
      catalog: {
        path: 'queries/GetSubscriptionStatus-0.0.2',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/queries/GetSubscriptionStatus-0.0.2',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/queries/GetSubscriptionStatus-0.0.2',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/queries/GetSubscriptionStatus-0.0.2',
        publicPath: '/generated/queries/GetSubscriptionStatus',
        type: 'event',
      },
    },
    {
      id: 'GetSubscriptionStatus-0.0.1',
      data: {
        id: 'GetSubscriptionStatus',
        name: 'Get subscription status',
        summary:
          'GET request that will return the current subscription status for a specific user, identified by their userId.',
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
        messageChannels: [],
        producers: [],
        consumers: [],
        versions: ['0.0.2', '0.0.1'],
        latestVersion: '0.0.2',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewTheGetSubscriptionStatusmessage is a query used to retrieve the current subscription status for a specific user, identified by theiruserId. This query returns detailed information about the users subscription, such as its current status (active, canceled, expired), the subscription tier or plan, and the next billing date. It is typically used by systems that manage user subscriptions, billing, and renewal processes to ensure that users are aware of their subscription details and any upcoming renewals.This query is particularly useful in managing subscriptions for SaaS products, media services, or any recurring payment-based services where users need to manage and view their subscription information. fileschema.jsonJSON SchemaHeight500',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Subscriptions/services/SubscriptionService/queries/GetSubscriptionStatus/versioned/0.0.1/index.mdx',
      digest: 'c1544eddb39795d7',
      deferredRender: true,
      collection: 'queries',
      catalog: {
        path: 'queries/GetSubscriptionStatus-0.0.1',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/queries/GetSubscriptionStatus-0.0.1',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/queries/GetSubscriptionStatus-0.0.1',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/queries/GetSubscriptionStatus-0.0.1',
        publicPath: '/generated/queries/GetSubscriptionStatus',
        type: 'event',
      },
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
        messageChannels: [],
        producers: [],
        consumers: [
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
              summary: 'Service that handles orders',
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
        ],
        versions: ['0.0.1'],
        latestVersion: '0.0.1',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewTheGetUserNotificationsmessage is a query used to retrieve a list of notifications for a specific user. It allows filtering by notification status, such as unread or all notifications. This query is typically utilized by notification services to display user-specific messages, such as order updates, promotional offers, or system notifications. It supports pagination throughlimitandoffsetparameters, ensuring that only a manageable number of notifications are retrieved at once. This query helps users stay informed about important events or updates related to their account, orders, or the platform.Use cases include delivering notifications for order updates, promotional campaigns, or general system messages to keep the user informed. fileschema.jsonJSON SchemaHeight500',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/NotificationService/queries/GetUserNotifications/index.mdx',
      digest: '4b02e9790b934892',
      deferredRender: true,
      collection: 'queries',
      catalog: {
        path: 'queries/GetUserNotifications-0.0.1',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/queries/GetUserNotifications-0.0.1',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/queries/GetUserNotifications-0.0.1',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/queries/GetUserNotifications-0.0.1',
        publicPath: '/generated/queries/GetUserNotifications',
        type: 'event',
      },
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
        messageChannels: [],
        producers: [
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
              summary: 'Service that handles orders',
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
        ],
        consumers: [
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
              repository: {
                language: 'JavaScript',
                url: 'https://github.com/event-catalog/pretend-shipping-service',
              },
              deprecated: {
                message:
                  'This service is **being deprecated** and replaced by the new service **InventoryServiceV2**.Please contact the [team for more information](mailto:inventory-team@example.com) or visit our [website](https://eventcatalog.dev).',
                date: '2026-05-01T00:00:00.000Z',
              },
            },
            filePath: '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/index.mdx',
            digest: '6aaa18b0014d9edc',
            deferredRender: true,
            collection: 'services',
          },
        ],
        versions: ['0.0.1'],
        latestVersion: '0.0.1',
      },
      body: 'import Footer fromcatalog/components/footer.astro OverviewThe GetInventoryList message is a query used to retrieve a comprehensive list of all available inventory items within a system. It is designed to return detailed information about each item, such as product names, quantities, availability status, and potentially additional metadata like categories or locations. This query is typically utilized by systems or services that require a real-time view of current stock, ensuring that downstream applications or users have accurate and up-to-date information for decision-making or operational purposes. The GetInventoryList is ideal for use cases such as order processing, stock management, or reporting, providing visibility into the full range of inventory data.',
      filePath:
        '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/queries/GetInventoryList/index.mdx',
      digest: '4517b5ebf16ef267',
      deferredRender: true,
      collection: 'queries',
      catalog: {
        path: 'queries/GetInventoryList-0.0.1',
        absoluteFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/examples/default/queries/GetInventoryList-0.0.1',
        astroContentFilePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/content/queries/GetInventoryList-0.0.1',
        filePath:
          '/Users/peterjaber/Desktop/Easyflow.io/Code/eventcatalog/eventcatalog/src/catalog-files/queries/GetInventoryList-0.0.1',
        publicPath: '/generated/queries/GetInventoryList',
        type: 'event',
      },
    },
  ],
};
