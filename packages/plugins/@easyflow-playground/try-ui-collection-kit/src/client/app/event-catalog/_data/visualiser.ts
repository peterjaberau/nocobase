export const visualizerPayloads = {
  'domains.ecommerce': {
    id: 'E-Commerce',
    hrefLabel: 'Open documentation for E-Commerce v1.0.0',
    nodes: [
      {
        id: 'OrderConfirmed-0.0.1',
        type: 'events',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        position: {
          x: 75,
          y: 2000,
        },
      },
      {
        sourcePosition: 'right',
        targetPosition: 'left',
        id: 'OrderConfirmed-0.0.1-orders.{env}.events-1.0.1-InventoryService-0.0.2',
        data: {
          title: 'orders.{env}.events',
          mode: 'full',
          channel: {
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
              summary: 'Central event stream for all order-related events in the order processing lifecycle\n',
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
            body: '### Overview\nThe Orders Events channel is the central stream for all order-related events across the order processing lifecycle. This includes order creation, updates, payment status, fulfillment status, and customer communications. All events related to a specific order are guaranteed to be processed in sequence when using orderId as the partition key.\n\n<ChannelInformation />\n\n### Publishing a message using Azure Service Bus\n\nHere is an example of how to publish an order event using Azure Service Bus:\n\n```python\nimport json\nfrom datetime import datetime\nfrom azure.servicebus import ServiceBusClient, ServiceBusMessage\n\n# --- Azure Service Bus Configuration ---\n# Replace with your actual connection string and queue/topic name\nCONNECTION_STR = "YOUR_AZURE_SERVICE_BUS_CONNECTION_STRING"\nQUEUE_NAME = "orders"  # Or your specific queue/topic name e.g., f"orders.{env}.events"\n\n# --- Example Order Event Data ---\n# This is the same event structure as before\norder_event_data = {\n    "eventType": "ORDER_CREATED",\n    "timestamp": datetime.utcnow().isoformat() + "Z", # ISO 8601 format with Z for UTC\n    "version": "1.0",\n    "payload": {\n        "orderId": "12345",\n        "customerId": "CUST-789",\n        "items": [\n            {\n                "productId": "PROD-456",\n                "quantity": 2,\n                "price": 29.99\n            }\n        ],\n        "totalAmount": 59.98,\n        "shippingAddress": {\n            "street": "123 Main St",\n            "city": "Springfield",\n            "country": "US"\n        }\n    },\n    "metadata": {\n        "source": "web_checkout",\n        "correlationId": "abc-xyz-123"\n        # Potentially add a message ID if not automatically handled or for specific tracking\n        # "messageId": str(uuid.uuid4()) # Requires import uuid\n    }\n}\n\ndef send_order_event_to_service_bus(connection_string, queue_name, event_data):\n    # Create a ServiceBusClient object\n    with ServiceBusClient.from_connection_string(conn_str=connection_string) as servicebus_client:\n        # Create a sender for the queue\n        # For a topic, use: servicebus_client.get_topic_sender(topic_name=queue_name)\n        sender = servicebus_client.get_queue_sender(queue_name=queue_name)\n        with sender:\n            # Serialize the event data to a JSON string\n            event_json = json.dumps(event_data)\n            # Create a ServiceBusMessage object\n            message = ServiceBusMessage(event_json)\n            \n            # Set properties if needed, e.g., message_id or correlation_id\n            # message.message_id = event_data["metadata"].get("messageId")\n            message.correlation_id = event_data["metadata"]["correlationId"]\n            \n            # Send the message\n            sender.send_messages(message)\n            print(f"Sent order event (ID: {event_data[\'payload\'][\'orderId\']}) to Azure Service Bus queue: {queue_name}")\n\nif __name__ == "__main__":\n    # Example of how to call the function\n    # Ensure azure-servicebus package is installed: pip install azure-servicebus\n    \n    # Basic error handling for placeholders\n    if CONNECTION_STR == "YOUR_AZURE_SERVICE_BUS_CONNECTION_STRING" or QUEUE_NAME == "YOUR_QUEUE_NAME":\n        print("Please update CONNECTION_STR and QUEUE_NAME with your actual Azure Service Bus details.")\n    else:\n        try:\n            send_order_event_to_service_bus(CONNECTION_STR, QUEUE_NAME, order_event_data)\n        except Exception as e:\n            print(f"An error occurred: {e}")\n            print("Ensure your Azure Service Bus connection string and queue name are correct,")\n            print("and the \'azure-servicebus\' package is installed (\'pip install azure-servicebus\').")',
            filePath: '../examples/default/channels/orders.{env}.events/index.mdx',
            digest: 'c2c6119dcd57051c',
            deferredRender: true,
            collection: 'channels',
          },
          source: {
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
          target: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        position: {
          x: 585,
          y: 1950,
        },
        type: 'channels',
      },
      {
        id: 'GetInventoryList-0.0.1',
        type: 'queries',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
            id: 'GetInventoryList-0.0.1',
            data: {
              id: 'GetInventoryList',
              name: 'List inventory list',
              summary: 'GET request that will return inventory list\n',
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
            body: "import Footer from '@catalog/components/footer.astro';\n\n## Overview\n\nThe GetInventoryList message is a query used to retrieve a comprehensive list of all available inventory items within a system. It is designed to return detailed information about each item, such as product names, quantities, availability status, and potentially additional metadata like categories or locations. This query is typically utilized by systems or services that require a real-time view of current stock, ensuring that downstream applications or users have accurate and up-to-date information for decision-making or operational purposes. The GetInventoryList is ideal for use cases such as order processing, stock management, or reporting, providing visibility into the full range of inventory data.\n\n<NodeGraph />",
            filePath:
              '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/queries/GetInventoryList/index.mdx',
            digest: '4517b5ebf16ef267',
            deferredRender: true,
            collection: 'queries',
          },
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        position: {
          x: 3645,
          y: 50,
        },
      },
      {
        id: 'OrderAmended-0.0.1',
        type: 'events',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        position: {
          x: 6195,
          y: 1400,
        },
      },
      {
        sourcePosition: 'right',
        targetPosition: 'left',
        id: 'OrderAmended-0.0.1-orders.{env}.events-1.0.1-InventoryService-0.0.2',
        data: {
          title: 'orders.{env}.events',
          mode: 'full',
          channel: {
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
              summary: 'Central event stream for all order-related events in the order processing lifecycle\n',
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
            body: '### Overview\nThe Orders Events channel is the central stream for all order-related events across the order processing lifecycle. This includes order creation, updates, payment status, fulfillment status, and customer communications. All events related to a specific order are guaranteed to be processed in sequence when using orderId as the partition key.\n\n<ChannelInformation />\n\n### Publishing a message using Azure Service Bus\n\nHere is an example of how to publish an order event using Azure Service Bus:\n\n```python\nimport json\nfrom datetime import datetime\nfrom azure.servicebus import ServiceBusClient, ServiceBusMessage\n\n# --- Azure Service Bus Configuration ---\n# Replace with your actual connection string and queue/topic name\nCONNECTION_STR = "YOUR_AZURE_SERVICE_BUS_CONNECTION_STRING"\nQUEUE_NAME = "orders"  # Or your specific queue/topic name e.g., f"orders.{env}.events"\n\n# --- Example Order Event Data ---\n# This is the same event structure as before\norder_event_data = {\n    "eventType": "ORDER_CREATED",\n    "timestamp": datetime.utcnow().isoformat() + "Z", # ISO 8601 format with Z for UTC\n    "version": "1.0",\n    "payload": {\n        "orderId": "12345",\n        "customerId": "CUST-789",\n        "items": [\n            {\n                "productId": "PROD-456",\n                "quantity": 2,\n                "price": 29.99\n            }\n        ],\n        "totalAmount": 59.98,\n        "shippingAddress": {\n            "street": "123 Main St",\n            "city": "Springfield",\n            "country": "US"\n        }\n    },\n    "metadata": {\n        "source": "web_checkout",\n        "correlationId": "abc-xyz-123"\n        # Potentially add a message ID if not automatically handled or for specific tracking\n        # "messageId": str(uuid.uuid4()) # Requires import uuid\n    }\n}\n\ndef send_order_event_to_service_bus(connection_string, queue_name, event_data):\n    # Create a ServiceBusClient object\n    with ServiceBusClient.from_connection_string(conn_str=connection_string) as servicebus_client:\n        # Create a sender for the queue\n        # For a topic, use: servicebus_client.get_topic_sender(topic_name=queue_name)\n        sender = servicebus_client.get_queue_sender(queue_name=queue_name)\n        with sender:\n            # Serialize the event data to a JSON string\n            event_json = json.dumps(event_data)\n            # Create a ServiceBusMessage object\n            message = ServiceBusMessage(event_json)\n            \n            # Set properties if needed, e.g., message_id or correlation_id\n            # message.message_id = event_data["metadata"].get("messageId")\n            message.correlation_id = event_data["metadata"]["correlationId"]\n            \n            # Send the message\n            sender.send_messages(message)\n            print(f"Sent order event (ID: {event_data[\'payload\'][\'orderId\']}) to Azure Service Bus queue: {queue_name}")\n\nif __name__ == "__main__":\n    # Example of how to call the function\n    # Ensure azure-servicebus package is installed: pip install azure-servicebus\n    \n    # Basic error handling for placeholders\n    if CONNECTION_STR == "YOUR_AZURE_SERVICE_BUS_CONNECTION_STRING" or QUEUE_NAME == "YOUR_QUEUE_NAME":\n        print("Please update CONNECTION_STR and QUEUE_NAME with your actual Azure Service Bus details.")\n    else:\n        try:\n            send_order_event_to_service_bus(CONNECTION_STR, QUEUE_NAME, order_event_data)\n        except Exception as e:\n            print(f"An error occurred: {e}")\n            print("Ensure your Azure Service Bus connection string and queue name are correct,")\n            print("and the \'azure-servicebus\' package is installed (\'pip install azure-servicebus\').")',
            filePath: '../examples/default/channels/orders.{env}.events/index.mdx',
            digest: 'c2c6119dcd57051c',
            deferredRender: true,
            collection: 'channels',
          },
          source: {
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
          target: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        position: {
          x: 6705,
          y: 925,
        },
        type: 'channels',
      },
      {
        id: 'UpdateInventory-0.0.3',
        type: 'commands',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        position: {
          x: 75,
          y: 1800,
        },
      },
      {
        sourcePosition: 'right',
        targetPosition: 'left',
        id: 'UpdateInventory-0.0.3-inventory.{env}.events-1.0.0-InventoryService-0.0.2',
        data: {
          title: 'inventory.{env}.events',
          mode: 'full',
          channel: {
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
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Inventory Events channel is the central stream for all inventory-related events across the system. This includes stock level changes, inventory allocations, adjustments, and stocktake events. Events for a specific SKU are guaranteed to be processed in sequence when using productId as the partition key.\n\n<ChannelInformation />\n\n### Publishing and Subscribing to Events\n\n#### Publishing Example\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'inventory.{env}.events\'\n\n# Create a Kafka producer\nproducer = KafkaProducer(\n    bootstrap_servers=bootstrap_servers,\n    value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example inventory update event\ninventory_event = {\n    "eventType": "STOCK_LEVEL_CHANGED",\n    "timestamp": datetime.utcnow().isoformat(),\n    "version": "1.0",\n    "payload": {\n        "productId": "PROD-456",\n        "locationId": "WH-123",\n        "previousQuantity": 100,\n        "newQuantity": 95,\n        "changeReason": "ORDER_FULFILLED",\n        "unitOfMeasure": "EACH",\n        "batchInfo": {\n            "batchId": "BATCH-789",\n            "expiryDate": "2025-12-31"\n        }\n    },\n    "metadata": {\n        "source": "warehouse_system",\n        "correlationId": "inv-xyz-123",\n        "userId": "john.doe"\n    }\n}\n\n# Send the message - using productId as key for partitioning\nproducer.send(\n    topic, \n    key=inventory_event[\'payload\'][\'productId\'].encode(\'utf-8\'),\n    value=inventory_event\n)\nproducer.flush()\n\nprint(f"Inventory event sent to topic {topic}")\n\n```\n\n### Subscription example\n\n```python\nfrom kafka import KafkaConsumer\nimport json\nfrom datetime import datetime\n\nclass InventoryEventConsumer:\n    def __init__(self):\n        # Kafka configuration\n        self.topic = f\'inventory.{env}.events\'\n        self.consumer = KafkaConsumer(\n            self.topic,\n            bootstrap_servers=[\'localhost:9092\'],\n            group_id=\'inventory-processor-group\',\n            auto_offset_reset=\'earliest\',\n            enable_auto_commit=False,\n            value_deserializer=lambda x: json.loads(x.decode(\'utf-8\')),\n            key_deserializer=lambda x: x.decode(\'utf-8\') if x else None\n        )\n\n    def process_event(self, event):\n        """Process individual inventory events based on type"""\n        event_type = event.get(\'eventType\')\n        \n        if event_type == \'STOCK_LEVEL_CHANGED\':\n            self.handle_stock_level_change(event)\n        elif event_type == \'LOW_STOCK_ALERT\':\n            self.handle_low_stock_alert(event)\n        # Add more event type handlers as needed\n\n    def handle_stock_level_change(self, event):\n        """Handle stock level change events"""\n        payload = event[\'payload\']\n        print(f"Stock level change detected for product {payload[\'productId\']}")\n        print(f"New quantity: {payload[\'newQuantity\']}")\n        # Add your business logic here\n\n    def handle_low_stock_alert(self, event):\n        """Handle low stock alert events"""\n        payload = event[\'payload\']\n        print(f"Low stock alert for product {payload[\'productId\']}")\n        print(f"Current quantity: {payload[\'currentQuantity\']}")\n        # Add your business logic here\n\n    def start_consuming(self):\n        """Start consuming messages from the topic"""\n        try:\n            print(f"Starting consumption from topic: {self.topic}")\n            for message in self.consumer:\n                try:\n                    # Process the message\n                    event = message.value\n                    print(f"Received event: {event[\'eventType\']} for product: {event[\'payload\'][\'productId\']}")\n                    \n                    # Process the event\n                    self.process_event(event)\n                    \n                    # Commit the offset after successful processing\n                    self.consumer.commit()\n                    \n                except Exception as e:\n                    print(f"Error processing message: {str(e)}")\n                    # Implement your error handling logic here\n                    # You might want to send to a DLQ (Dead Letter Queue)\n        \n        except Exception as e:\n            print(f"Consumer error: {str(e)}")\n        finally:\n            # Clean up\n            self.consumer.close()\n\nif __name__ == "__main__":\n    # Create and start the consumer\n    consumer = InventoryEventConsumer()\n    consumer.start_consuming()\n  ```',
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
          source: {
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
          target: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        position: {
          x: 585,
          y: 1800,
        },
        type: 'channels',
      },
      {
        id: 'AddInventory-0.0.3',
        type: 'commands',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        position: {
          x: 6195,
          y: 3025,
        },
      },
      {
        sourcePosition: 'right',
        targetPosition: 'left',
        id: 'AddInventory-0.0.3-inventory.{env}.events-1.0.0-InventoryService-0.0.2',
        data: {
          title: 'inventory.{env}.events',
          mode: 'full',
          channel: {
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
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Inventory Events channel is the central stream for all inventory-related events across the system. This includes stock level changes, inventory allocations, adjustments, and stocktake events. Events for a specific SKU are guaranteed to be processed in sequence when using productId as the partition key.\n\n<ChannelInformation />\n\n### Publishing and Subscribing to Events\n\n#### Publishing Example\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'inventory.{env}.events\'\n\n# Create a Kafka producer\nproducer = KafkaProducer(\n    bootstrap_servers=bootstrap_servers,\n    value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example inventory update event\ninventory_event = {\n    "eventType": "STOCK_LEVEL_CHANGED",\n    "timestamp": datetime.utcnow().isoformat(),\n    "version": "1.0",\n    "payload": {\n        "productId": "PROD-456",\n        "locationId": "WH-123",\n        "previousQuantity": 100,\n        "newQuantity": 95,\n        "changeReason": "ORDER_FULFILLED",\n        "unitOfMeasure": "EACH",\n        "batchInfo": {\n            "batchId": "BATCH-789",\n            "expiryDate": "2025-12-31"\n        }\n    },\n    "metadata": {\n        "source": "warehouse_system",\n        "correlationId": "inv-xyz-123",\n        "userId": "john.doe"\n    }\n}\n\n# Send the message - using productId as key for partitioning\nproducer.send(\n    topic, \n    key=inventory_event[\'payload\'][\'productId\'].encode(\'utf-8\'),\n    value=inventory_event\n)\nproducer.flush()\n\nprint(f"Inventory event sent to topic {topic}")\n\n```\n\n### Subscription example\n\n```python\nfrom kafka import KafkaConsumer\nimport json\nfrom datetime import datetime\n\nclass InventoryEventConsumer:\n    def __init__(self):\n        # Kafka configuration\n        self.topic = f\'inventory.{env}.events\'\n        self.consumer = KafkaConsumer(\n            self.topic,\n            bootstrap_servers=[\'localhost:9092\'],\n            group_id=\'inventory-processor-group\',\n            auto_offset_reset=\'earliest\',\n            enable_auto_commit=False,\n            value_deserializer=lambda x: json.loads(x.decode(\'utf-8\')),\n            key_deserializer=lambda x: x.decode(\'utf-8\') if x else None\n        )\n\n    def process_event(self, event):\n        """Process individual inventory events based on type"""\n        event_type = event.get(\'eventType\')\n        \n        if event_type == \'STOCK_LEVEL_CHANGED\':\n            self.handle_stock_level_change(event)\n        elif event_type == \'LOW_STOCK_ALERT\':\n            self.handle_low_stock_alert(event)\n        # Add more event type handlers as needed\n\n    def handle_stock_level_change(self, event):\n        """Handle stock level change events"""\n        payload = event[\'payload\']\n        print(f"Stock level change detected for product {payload[\'productId\']}")\n        print(f"New quantity: {payload[\'newQuantity\']}")\n        # Add your business logic here\n\n    def handle_low_stock_alert(self, event):\n        """Handle low stock alert events"""\n        payload = event[\'payload\']\n        print(f"Low stock alert for product {payload[\'productId\']}")\n        print(f"Current quantity: {payload[\'currentQuantity\']}")\n        # Add your business logic here\n\n    def start_consuming(self):\n        """Start consuming messages from the topic"""\n        try:\n            print(f"Starting consumption from topic: {self.topic}")\n            for message in self.consumer:\n                try:\n                    # Process the message\n                    event = message.value\n                    print(f"Received event: {event[\'eventType\']} for product: {event[\'payload\'][\'productId\']}")\n                    \n                    # Process the event\n                    self.process_event(event)\n                    \n                    # Commit the offset after successful processing\n                    self.consumer.commit()\n                    \n                except Exception as e:\n                    print(f"Error processing message: {str(e)}")\n                    # Implement your error handling logic here\n                    # You might want to send to a DLQ (Dead Letter Queue)\n        \n        except Exception as e:\n            print(f"Consumer error: {str(e)}")\n        finally:\n            # Clean up\n            self.consumer.close()\n\nif __name__ == "__main__":\n    # Create and start the consumer\n    consumer = InventoryEventConsumer()\n    consumer.start_consuming()\n  ```',
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
          source: {
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
          target: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        position: {
          x: 6705,
          y: 3025,
        },
        type: 'channels',
      },
      {
        id: 'GetInventoryStatus-0.0.1',
        type: 'queries',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
            id: 'GetInventoryStatus-0.0.1',
            data: {
              id: 'GetInventoryStatus',
              name: 'Get inventory status',
              summary: 'GET request that will return the current stock status for a specific product.\n',
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
            body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe GetInventoryStatus message is a query designed to retrieve the current stock status for a specific product. \n\nThis query provides detailed information about the available quantity, reserved quantity, and the warehouse location where the product is stored. It is typically used by systems or services that need to determine the real-time availability of a product, enabling efficient stock management, order fulfillment, and inventory tracking processes. \n\nThis query is essential for ensuring accurate stock levels are reported to downstream systems, including e-commerce platforms, warehouse management systems, and sales channels.\n\n<NodeGraph />\n\n<SchemaViewer file="schema.json" title="JSON Schema" maxHeight="500" />\n\n\n### Query using CURL\n\nUse this snippet to query the inventory status\n\n```sh title="Example CURL command"\ncurl -X GET "https://api.yourdomain.com/inventory/status" \\\n-H "Content-Type: application/json" \\\n-d \'{\n  "productId": "12345"\n}\'\n```',
            filePath:
              '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/queries/GetInventoryStatus/index.mdx',
            digest: '00eb1684c4519d03',
            deferredRender: true,
            collection: 'queries',
          },
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        position: {
          x: 585,
          y: 1475,
        },
      },
      {
        id: 'DeleteInventory-0.0.3',
        type: 'commands',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        position: {
          x: 75,
          y: 1050,
        },
      },
      {
        sourcePosition: 'right',
        targetPosition: 'left',
        id: 'DeleteInventory-0.0.3-inventory.{env}.events-1.0.0-InventoryService-0.0.2',
        data: {
          title: 'inventory.{env}.events',
          mode: 'full',
          channel: {
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
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Inventory Events channel is the central stream for all inventory-related events across the system. This includes stock level changes, inventory allocations, adjustments, and stocktake events. Events for a specific SKU are guaranteed to be processed in sequence when using productId as the partition key.\n\n<ChannelInformation />\n\n### Publishing and Subscribing to Events\n\n#### Publishing Example\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'inventory.{env}.events\'\n\n# Create a Kafka producer\nproducer = KafkaProducer(\n    bootstrap_servers=bootstrap_servers,\n    value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example inventory update event\ninventory_event = {\n    "eventType": "STOCK_LEVEL_CHANGED",\n    "timestamp": datetime.utcnow().isoformat(),\n    "version": "1.0",\n    "payload": {\n        "productId": "PROD-456",\n        "locationId": "WH-123",\n        "previousQuantity": 100,\n        "newQuantity": 95,\n        "changeReason": "ORDER_FULFILLED",\n        "unitOfMeasure": "EACH",\n        "batchInfo": {\n            "batchId": "BATCH-789",\n            "expiryDate": "2025-12-31"\n        }\n    },\n    "metadata": {\n        "source": "warehouse_system",\n        "correlationId": "inv-xyz-123",\n        "userId": "john.doe"\n    }\n}\n\n# Send the message - using productId as key for partitioning\nproducer.send(\n    topic, \n    key=inventory_event[\'payload\'][\'productId\'].encode(\'utf-8\'),\n    value=inventory_event\n)\nproducer.flush()\n\nprint(f"Inventory event sent to topic {topic}")\n\n```\n\n### Subscription example\n\n```python\nfrom kafka import KafkaConsumer\nimport json\nfrom datetime import datetime\n\nclass InventoryEventConsumer:\n    def __init__(self):\n        # Kafka configuration\n        self.topic = f\'inventory.{env}.events\'\n        self.consumer = KafkaConsumer(\n            self.topic,\n            bootstrap_servers=[\'localhost:9092\'],\n            group_id=\'inventory-processor-group\',\n            auto_offset_reset=\'earliest\',\n            enable_auto_commit=False,\n            value_deserializer=lambda x: json.loads(x.decode(\'utf-8\')),\n            key_deserializer=lambda x: x.decode(\'utf-8\') if x else None\n        )\n\n    def process_event(self, event):\n        """Process individual inventory events based on type"""\n        event_type = event.get(\'eventType\')\n        \n        if event_type == \'STOCK_LEVEL_CHANGED\':\n            self.handle_stock_level_change(event)\n        elif event_type == \'LOW_STOCK_ALERT\':\n            self.handle_low_stock_alert(event)\n        # Add more event type handlers as needed\n\n    def handle_stock_level_change(self, event):\n        """Handle stock level change events"""\n        payload = event[\'payload\']\n        print(f"Stock level change detected for product {payload[\'productId\']}")\n        print(f"New quantity: {payload[\'newQuantity\']}")\n        # Add your business logic here\n\n    def handle_low_stock_alert(self, event):\n        """Handle low stock alert events"""\n        payload = event[\'payload\']\n        print(f"Low stock alert for product {payload[\'productId\']}")\n        print(f"Current quantity: {payload[\'currentQuantity\']}")\n        # Add your business logic here\n\n    def start_consuming(self):\n        """Start consuming messages from the topic"""\n        try:\n            print(f"Starting consumption from topic: {self.topic}")\n            for message in self.consumer:\n                try:\n                    # Process the message\n                    event = message.value\n                    print(f"Received event: {event[\'eventType\']} for product: {event[\'payload\'][\'productId\']}")\n                    \n                    # Process the event\n                    self.process_event(event)\n                    \n                    # Commit the offset after successful processing\n                    self.consumer.commit()\n                    \n                except Exception as e:\n                    print(f"Error processing message: {str(e)}")\n                    # Implement your error handling logic here\n                    # You might want to send to a DLQ (Dead Letter Queue)\n        \n        except Exception as e:\n            print(f"Consumer error: {str(e)}")\n        finally:\n            # Clean up\n            self.consumer.close()\n\nif __name__ == "__main__":\n    # Create and start the consumer\n    consumer = InventoryEventConsumer()\n    consumer.start_consuming()\n  ```',
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
          source: {
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
          target: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        position: {
          x: 585,
          y: 1050,
        },
        type: 'channels',
      },
      {
        id: 'InventoryService-0.0.2',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          service: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        type: 'services',
        position: {
          x: 1095,
          y: 1275,
        },
      },
      {
        id: 'InventoryAdjusted-1.0.1',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
          group: {
            type: 'Domain',
            value: 'Payment',
            id: 'Payment',
          },
        },
        type: 'events',
        position: {
          x: 2115,
          y: 1875,
        },
      },
      {
        sourcePosition: 'right',
        targetPosition: 'left',
        id: 'InventoryService-0.0.2-inventory.{env}.events-1.0.0-InventoryAdjusted-1.0.1',
        data: {
          title: 'inventory.{env}.events',
          mode: 'full',
          channel: {
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
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Inventory Events channel is the central stream for all inventory-related events across the system. This includes stock level changes, inventory allocations, adjustments, and stocktake events. Events for a specific SKU are guaranteed to be processed in sequence when using productId as the partition key.\n\n<ChannelInformation />\n\n### Publishing and Subscribing to Events\n\n#### Publishing Example\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'inventory.{env}.events\'\n\n# Create a Kafka producer\nproducer = KafkaProducer(\n    bootstrap_servers=bootstrap_servers,\n    value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example inventory update event\ninventory_event = {\n    "eventType": "STOCK_LEVEL_CHANGED",\n    "timestamp": datetime.utcnow().isoformat(),\n    "version": "1.0",\n    "payload": {\n        "productId": "PROD-456",\n        "locationId": "WH-123",\n        "previousQuantity": 100,\n        "newQuantity": 95,\n        "changeReason": "ORDER_FULFILLED",\n        "unitOfMeasure": "EACH",\n        "batchInfo": {\n            "batchId": "BATCH-789",\n            "expiryDate": "2025-12-31"\n        }\n    },\n    "metadata": {\n        "source": "warehouse_system",\n        "correlationId": "inv-xyz-123",\n        "userId": "john.doe"\n    }\n}\n\n# Send the message - using productId as key for partitioning\nproducer.send(\n    topic, \n    key=inventory_event[\'payload\'][\'productId\'].encode(\'utf-8\'),\n    value=inventory_event\n)\nproducer.flush()\n\nprint(f"Inventory event sent to topic {topic}")\n\n```\n\n### Subscription example\n\n```python\nfrom kafka import KafkaConsumer\nimport json\nfrom datetime import datetime\n\nclass InventoryEventConsumer:\n    def __init__(self):\n        # Kafka configuration\n        self.topic = f\'inventory.{env}.events\'\n        self.consumer = KafkaConsumer(\n            self.topic,\n            bootstrap_servers=[\'localhost:9092\'],\n            group_id=\'inventory-processor-group\',\n            auto_offset_reset=\'earliest\',\n            enable_auto_commit=False,\n            value_deserializer=lambda x: json.loads(x.decode(\'utf-8\')),\n            key_deserializer=lambda x: x.decode(\'utf-8\') if x else None\n        )\n\n    def process_event(self, event):\n        """Process individual inventory events based on type"""\n        event_type = event.get(\'eventType\')\n        \n        if event_type == \'STOCK_LEVEL_CHANGED\':\n            self.handle_stock_level_change(event)\n        elif event_type == \'LOW_STOCK_ALERT\':\n            self.handle_low_stock_alert(event)\n        # Add more event type handlers as needed\n\n    def handle_stock_level_change(self, event):\n        """Handle stock level change events"""\n        payload = event[\'payload\']\n        print(f"Stock level change detected for product {payload[\'productId\']}")\n        print(f"New quantity: {payload[\'newQuantity\']}")\n        # Add your business logic here\n\n    def handle_low_stock_alert(self, event):\n        """Handle low stock alert events"""\n        payload = event[\'payload\']\n        print(f"Low stock alert for product {payload[\'productId\']}")\n        print(f"Current quantity: {payload[\'currentQuantity\']}")\n        # Add your business logic here\n\n    def start_consuming(self):\n        """Start consuming messages from the topic"""\n        try:\n            print(f"Starting consumption from topic: {self.topic}")\n            for message in self.consumer:\n                try:\n                    # Process the message\n                    event = message.value\n                    print(f"Received event: {event[\'eventType\']} for product: {event[\'payload\'][\'productId\']}")\n                    \n                    # Process the event\n                    self.process_event(event)\n                    \n                    # Commit the offset after successful processing\n                    self.consumer.commit()\n                    \n                except Exception as e:\n                    print(f"Error processing message: {str(e)}")\n                    # Implement your error handling logic here\n                    # You might want to send to a DLQ (Dead Letter Queue)\n        \n        except Exception as e:\n            print(f"Consumer error: {str(e)}")\n        finally:\n            # Clean up\n            self.consumer.close()\n\nif __name__ == "__main__":\n    # Create and start the consumer\n    consumer = InventoryEventConsumer()\n    consumer.start_consuming()\n  ```',
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
          source: {
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
          target: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        position: {
          x: 1605,
          y: 1875,
        },
        type: 'channels',
      },
      {
        id: 'OutOfStock-0.0.4',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        type: 'events',
        position: {
          x: 4155,
          y: 600,
        },
      },
      {
        sourcePosition: 'right',
        targetPosition: 'left',
        id: 'InventoryService-0.0.2-inventory.{env}.events-1.0.0-OutOfStock-0.0.4',
        data: {
          title: 'inventory.{env}.events',
          mode: 'full',
          channel: {
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
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Inventory Events channel is the central stream for all inventory-related events across the system. This includes stock level changes, inventory allocations, adjustments, and stocktake events. Events for a specific SKU are guaranteed to be processed in sequence when using productId as the partition key.\n\n<ChannelInformation />\n\n### Publishing and Subscribing to Events\n\n#### Publishing Example\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'inventory.{env}.events\'\n\n# Create a Kafka producer\nproducer = KafkaProducer(\n    bootstrap_servers=bootstrap_servers,\n    value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example inventory update event\ninventory_event = {\n    "eventType": "STOCK_LEVEL_CHANGED",\n    "timestamp": datetime.utcnow().isoformat(),\n    "version": "1.0",\n    "payload": {\n        "productId": "PROD-456",\n        "locationId": "WH-123",\n        "previousQuantity": 100,\n        "newQuantity": 95,\n        "changeReason": "ORDER_FULFILLED",\n        "unitOfMeasure": "EACH",\n        "batchInfo": {\n            "batchId": "BATCH-789",\n            "expiryDate": "2025-12-31"\n        }\n    },\n    "metadata": {\n        "source": "warehouse_system",\n        "correlationId": "inv-xyz-123",\n        "userId": "john.doe"\n    }\n}\n\n# Send the message - using productId as key for partitioning\nproducer.send(\n    topic, \n    key=inventory_event[\'payload\'][\'productId\'].encode(\'utf-8\'),\n    value=inventory_event\n)\nproducer.flush()\n\nprint(f"Inventory event sent to topic {topic}")\n\n```\n\n### Subscription example\n\n```python\nfrom kafka import KafkaConsumer\nimport json\nfrom datetime import datetime\n\nclass InventoryEventConsumer:\n    def __init__(self):\n        # Kafka configuration\n        self.topic = f\'inventory.{env}.events\'\n        self.consumer = KafkaConsumer(\n            self.topic,\n            bootstrap_servers=[\'localhost:9092\'],\n            group_id=\'inventory-processor-group\',\n            auto_offset_reset=\'earliest\',\n            enable_auto_commit=False,\n            value_deserializer=lambda x: json.loads(x.decode(\'utf-8\')),\n            key_deserializer=lambda x: x.decode(\'utf-8\') if x else None\n        )\n\n    def process_event(self, event):\n        """Process individual inventory events based on type"""\n        event_type = event.get(\'eventType\')\n        \n        if event_type == \'STOCK_LEVEL_CHANGED\':\n            self.handle_stock_level_change(event)\n        elif event_type == \'LOW_STOCK_ALERT\':\n            self.handle_low_stock_alert(event)\n        # Add more event type handlers as needed\n\n    def handle_stock_level_change(self, event):\n        """Handle stock level change events"""\n        payload = event[\'payload\']\n        print(f"Stock level change detected for product {payload[\'productId\']}")\n        print(f"New quantity: {payload[\'newQuantity\']}")\n        # Add your business logic here\n\n    def handle_low_stock_alert(self, event):\n        """Handle low stock alert events"""\n        payload = event[\'payload\']\n        print(f"Low stock alert for product {payload[\'productId\']}")\n        print(f"Current quantity: {payload[\'currentQuantity\']}")\n        # Add your business logic here\n\n    def start_consuming(self):\n        """Start consuming messages from the topic"""\n        try:\n            print(f"Starting consumption from topic: {self.topic}")\n            for message in self.consumer:\n                try:\n                    # Process the message\n                    event = message.value\n                    print(f"Received event: {event[\'eventType\']} for product: {event[\'payload\'][\'productId\']}")\n                    \n                    # Process the event\n                    self.process_event(event)\n                    \n                    # Commit the offset after successful processing\n                    self.consumer.commit()\n                    \n                except Exception as e:\n                    print(f"Error processing message: {str(e)}")\n                    # Implement your error handling logic here\n                    # You might want to send to a DLQ (Dead Letter Queue)\n        \n        except Exception as e:\n            print(f"Consumer error: {str(e)}")\n        finally:\n            # Clean up\n            self.consumer.close()\n\nif __name__ == "__main__":\n    # Create and start the consumer\n    consumer = InventoryEventConsumer()\n    consumer.start_consuming()\n  ```',
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
          source: {
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
          target: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        position: {
          x: 3645,
          y: 675,
        },
        type: 'channels',
      },
      {
        id: 'GetOrder-0.0.1',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
            id: 'GetOrder-0.0.1',
            data: {
              id: 'GetOrder',
              name: 'Get order details',
              summary:
                'GET request that will return detailed information about a specific order, identified by its orderId.\n',
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
            body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe `GetOrder` message is a query used to retrieve detailed information about a specific order, identified by its `orderId`. It provides information such as the order status (e.g., pending, completed, shipped), the items within the order, billing and shipping details, payment information, and the order\'s total amount. This query is commonly used by systems managing order processing, customer service, or order tracking functionalities.\n\nThis query can be applied in e-commerce systems, marketplaces, or any platform where users and systems need real-time order data for tracking, auditing, or managing customer purchases.\n\n<NodeGraph />\n\n<SchemaViewer file="schema.json" title="JSON Schema" maxHeight="500" />',
            filePath:
              '../examples/default/domains/E-Commerce/subdomains/Orders/services/OrdersService/queries/GetOrder/index.mdx',
            digest: '71f186bfcba04dad',
            deferredRender: true,
            collection: 'queries',
          },
          group: {
            type: 'Domain',
            value: 'Payment',
            id: 'Payment',
          },
        },
        type: 'queries',
        position: {
          x: 3645,
          y: 2825,
        },
      },
      {
        id: 'PlaceOrder-0.0.1',
        type: 'commands',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        position: {
          x: 4665,
          y: 2725,
        },
      },
      {
        id: 'UserSubscriptionCancelled-0.0.1',
        type: 'events',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
          group: {
            type: 'Domain',
            value: 'Subscription',
            id: 'Subscription',
          },
        },
        position: {
          x: 4665,
          y: 2575,
        },
      },
      {
        id: 'OrdersService-0.0.3',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          service: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        type: 'services',
        position: {
          x: 5175,
          y: 2750,
        },
      },
      {
        sourcePosition: 'right',
        targetPosition: 'left',
        id: 'OrdersService-0.0.3-orders.{env}.events-1.0.1-OrderAmended-0.0.1',
        data: {
          title: 'orders.{env}.events',
          mode: 'full',
          channel: {
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
              summary: 'Central event stream for all order-related events in the order processing lifecycle\n',
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
            body: '### Overview\nThe Orders Events channel is the central stream for all order-related events across the order processing lifecycle. This includes order creation, updates, payment status, fulfillment status, and customer communications. All events related to a specific order are guaranteed to be processed in sequence when using orderId as the partition key.\n\n<ChannelInformation />\n\n### Publishing a message using Azure Service Bus\n\nHere is an example of how to publish an order event using Azure Service Bus:\n\n```python\nimport json\nfrom datetime import datetime\nfrom azure.servicebus import ServiceBusClient, ServiceBusMessage\n\n# --- Azure Service Bus Configuration ---\n# Replace with your actual connection string and queue/topic name\nCONNECTION_STR = "YOUR_AZURE_SERVICE_BUS_CONNECTION_STRING"\nQUEUE_NAME = "orders"  # Or your specific queue/topic name e.g., f"orders.{env}.events"\n\n# --- Example Order Event Data ---\n# This is the same event structure as before\norder_event_data = {\n    "eventType": "ORDER_CREATED",\n    "timestamp": datetime.utcnow().isoformat() + "Z", # ISO 8601 format with Z for UTC\n    "version": "1.0",\n    "payload": {\n        "orderId": "12345",\n        "customerId": "CUST-789",\n        "items": [\n            {\n                "productId": "PROD-456",\n                "quantity": 2,\n                "price": 29.99\n            }\n        ],\n        "totalAmount": 59.98,\n        "shippingAddress": {\n            "street": "123 Main St",\n            "city": "Springfield",\n            "country": "US"\n        }\n    },\n    "metadata": {\n        "source": "web_checkout",\n        "correlationId": "abc-xyz-123"\n        # Potentially add a message ID if not automatically handled or for specific tracking\n        # "messageId": str(uuid.uuid4()) # Requires import uuid\n    }\n}\n\ndef send_order_event_to_service_bus(connection_string, queue_name, event_data):\n    # Create a ServiceBusClient object\n    with ServiceBusClient.from_connection_string(conn_str=connection_string) as servicebus_client:\n        # Create a sender for the queue\n        # For a topic, use: servicebus_client.get_topic_sender(topic_name=queue_name)\n        sender = servicebus_client.get_queue_sender(queue_name=queue_name)\n        with sender:\n            # Serialize the event data to a JSON string\n            event_json = json.dumps(event_data)\n            # Create a ServiceBusMessage object\n            message = ServiceBusMessage(event_json)\n            \n            # Set properties if needed, e.g., message_id or correlation_id\n            # message.message_id = event_data["metadata"].get("messageId")\n            message.correlation_id = event_data["metadata"]["correlationId"]\n            \n            # Send the message\n            sender.send_messages(message)\n            print(f"Sent order event (ID: {event_data[\'payload\'][\'orderId\']}) to Azure Service Bus queue: {queue_name}")\n\nif __name__ == "__main__":\n    # Example of how to call the function\n    # Ensure azure-servicebus package is installed: pip install azure-servicebus\n    \n    # Basic error handling for placeholders\n    if CONNECTION_STR == "YOUR_AZURE_SERVICE_BUS_CONNECTION_STRING" or QUEUE_NAME == "YOUR_QUEUE_NAME":\n        print("Please update CONNECTION_STR and QUEUE_NAME with your actual Azure Service Bus details.")\n    else:\n        try:\n            send_order_event_to_service_bus(CONNECTION_STR, QUEUE_NAME, order_event_data)\n        except Exception as e:\n            print(f"An error occurred: {e}")\n            print("Ensure your Azure Service Bus connection string and queue name are correct,")\n            print("and the \'azure-servicebus\' package is installed (\'pip install azure-servicebus\').")',
            filePath: '../examples/default/channels/orders.{env}.events/index.mdx',
            digest: 'c2c6119dcd57051c',
            deferredRender: true,
            collection: 'channels',
          },
          source: {
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
          target: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        position: {
          x: 5685,
          y: 1400,
        },
        type: 'channels',
      },
      {
        id: 'OrderCancelled-0.0.1',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        type: 'events',
        position: {
          x: 6195,
          y: 2825,
        },
      },
      {
        sourcePosition: 'right',
        targetPosition: 'left',
        id: 'OrdersService-0.0.3-orders.{env}.events-1.0.1-OrderCancelled-0.0.1',
        data: {
          title: 'orders.{env}.events',
          mode: 'full',
          channel: {
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
              summary: 'Central event stream for all order-related events in the order processing lifecycle\n',
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
            body: '### Overview\nThe Orders Events channel is the central stream for all order-related events across the order processing lifecycle. This includes order creation, updates, payment status, fulfillment status, and customer communications. All events related to a specific order are guaranteed to be processed in sequence when using orderId as the partition key.\n\n<ChannelInformation />\n\n### Publishing a message using Azure Service Bus\n\nHere is an example of how to publish an order event using Azure Service Bus:\n\n```python\nimport json\nfrom datetime import datetime\nfrom azure.servicebus import ServiceBusClient, ServiceBusMessage\n\n# --- Azure Service Bus Configuration ---\n# Replace with your actual connection string and queue/topic name\nCONNECTION_STR = "YOUR_AZURE_SERVICE_BUS_CONNECTION_STRING"\nQUEUE_NAME = "orders"  # Or your specific queue/topic name e.g., f"orders.{env}.events"\n\n# --- Example Order Event Data ---\n# This is the same event structure as before\norder_event_data = {\n    "eventType": "ORDER_CREATED",\n    "timestamp": datetime.utcnow().isoformat() + "Z", # ISO 8601 format with Z for UTC\n    "version": "1.0",\n    "payload": {\n        "orderId": "12345",\n        "customerId": "CUST-789",\n        "items": [\n            {\n                "productId": "PROD-456",\n                "quantity": 2,\n                "price": 29.99\n            }\n        ],\n        "totalAmount": 59.98,\n        "shippingAddress": {\n            "street": "123 Main St",\n            "city": "Springfield",\n            "country": "US"\n        }\n    },\n    "metadata": {\n        "source": "web_checkout",\n        "correlationId": "abc-xyz-123"\n        # Potentially add a message ID if not automatically handled or for specific tracking\n        # "messageId": str(uuid.uuid4()) # Requires import uuid\n    }\n}\n\ndef send_order_event_to_service_bus(connection_string, queue_name, event_data):\n    # Create a ServiceBusClient object\n    with ServiceBusClient.from_connection_string(conn_str=connection_string) as servicebus_client:\n        # Create a sender for the queue\n        # For a topic, use: servicebus_client.get_topic_sender(topic_name=queue_name)\n        sender = servicebus_client.get_queue_sender(queue_name=queue_name)\n        with sender:\n            # Serialize the event data to a JSON string\n            event_json = json.dumps(event_data)\n            # Create a ServiceBusMessage object\n            message = ServiceBusMessage(event_json)\n            \n            # Set properties if needed, e.g., message_id or correlation_id\n            # message.message_id = event_data["metadata"].get("messageId")\n            message.correlation_id = event_data["metadata"]["correlationId"]\n            \n            # Send the message\n            sender.send_messages(message)\n            print(f"Sent order event (ID: {event_data[\'payload\'][\'orderId\']}) to Azure Service Bus queue: {queue_name}")\n\nif __name__ == "__main__":\n    # Example of how to call the function\n    # Ensure azure-servicebus package is installed: pip install azure-servicebus\n    \n    # Basic error handling for placeholders\n    if CONNECTION_STR == "YOUR_AZURE_SERVICE_BUS_CONNECTION_STRING" or QUEUE_NAME == "YOUR_QUEUE_NAME":\n        print("Please update CONNECTION_STR and QUEUE_NAME with your actual Azure Service Bus details.")\n    else:\n        try:\n            send_order_event_to_service_bus(CONNECTION_STR, QUEUE_NAME, order_event_data)\n        except Exception as e:\n            print(f"An error occurred: {e}")\n            print("Ensure your Azure Service Bus connection string and queue name are correct,")\n            print("and the \'azure-servicebus\' package is installed (\'pip install azure-servicebus\').")',
            filePath: '../examples/default/channels/orders.{env}.events/index.mdx',
            digest: 'c2c6119dcd57051c',
            deferredRender: true,
            collection: 'channels',
          },
          source: {
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
          target: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        position: {
          x: 5685,
          y: 2825,
        },
        type: 'channels',
      },
      {
        sourcePosition: 'right',
        targetPosition: 'left',
        id: 'OrdersService-0.0.3-orders.{env}.events-1.0.1-OrderConfirmed-0.0.1',
        data: {
          title: 'orders.{env}.events',
          mode: 'full',
          channel: {
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
              summary: 'Central event stream for all order-related events in the order processing lifecycle\n',
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
            body: '### Overview\nThe Orders Events channel is the central stream for all order-related events across the order processing lifecycle. This includes order creation, updates, payment status, fulfillment status, and customer communications. All events related to a specific order are guaranteed to be processed in sequence when using orderId as the partition key.\n\n<ChannelInformation />\n\n### Publishing a message using Azure Service Bus\n\nHere is an example of how to publish an order event using Azure Service Bus:\n\n```python\nimport json\nfrom datetime import datetime\nfrom azure.servicebus import ServiceBusClient, ServiceBusMessage\n\n# --- Azure Service Bus Configuration ---\n# Replace with your actual connection string and queue/topic name\nCONNECTION_STR = "YOUR_AZURE_SERVICE_BUS_CONNECTION_STRING"\nQUEUE_NAME = "orders"  # Or your specific queue/topic name e.g., f"orders.{env}.events"\n\n# --- Example Order Event Data ---\n# This is the same event structure as before\norder_event_data = {\n    "eventType": "ORDER_CREATED",\n    "timestamp": datetime.utcnow().isoformat() + "Z", # ISO 8601 format with Z for UTC\n    "version": "1.0",\n    "payload": {\n        "orderId": "12345",\n        "customerId": "CUST-789",\n        "items": [\n            {\n                "productId": "PROD-456",\n                "quantity": 2,\n                "price": 29.99\n            }\n        ],\n        "totalAmount": 59.98,\n        "shippingAddress": {\n            "street": "123 Main St",\n            "city": "Springfield",\n            "country": "US"\n        }\n    },\n    "metadata": {\n        "source": "web_checkout",\n        "correlationId": "abc-xyz-123"\n        # Potentially add a message ID if not automatically handled or for specific tracking\n        # "messageId": str(uuid.uuid4()) # Requires import uuid\n    }\n}\n\ndef send_order_event_to_service_bus(connection_string, queue_name, event_data):\n    # Create a ServiceBusClient object\n    with ServiceBusClient.from_connection_string(conn_str=connection_string) as servicebus_client:\n        # Create a sender for the queue\n        # For a topic, use: servicebus_client.get_topic_sender(topic_name=queue_name)\n        sender = servicebus_client.get_queue_sender(queue_name=queue_name)\n        with sender:\n            # Serialize the event data to a JSON string\n            event_json = json.dumps(event_data)\n            # Create a ServiceBusMessage object\n            message = ServiceBusMessage(event_json)\n            \n            # Set properties if needed, e.g., message_id or correlation_id\n            # message.message_id = event_data["metadata"].get("messageId")\n            message.correlation_id = event_data["metadata"]["correlationId"]\n            \n            # Send the message\n            sender.send_messages(message)\n            print(f"Sent order event (ID: {event_data[\'payload\'][\'orderId\']}) to Azure Service Bus queue: {queue_name}")\n\nif __name__ == "__main__":\n    # Example of how to call the function\n    # Ensure azure-servicebus package is installed: pip install azure-servicebus\n    \n    # Basic error handling for placeholders\n    if CONNECTION_STR == "YOUR_AZURE_SERVICE_BUS_CONNECTION_STRING" or QUEUE_NAME == "YOUR_QUEUE_NAME":\n        print("Please update CONNECTION_STR and QUEUE_NAME with your actual Azure Service Bus details.")\n    else:\n        try:\n            send_order_event_to_service_bus(CONNECTION_STR, QUEUE_NAME, order_event_data)\n        except Exception as e:\n            print(f"An error occurred: {e}")\n            print("Ensure your Azure Service Bus connection string and queue name are correct,")\n            print("and the \'azure-servicebus\' package is installed (\'pip install azure-servicebus\').")',
            filePath: '../examples/default/channels/orders.{env}.events/index.mdx',
            digest: 'c2c6119dcd57051c',
            deferredRender: true,
            collection: 'channels',
          },
          source: {
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
          target: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        position: {
          x: 5685,
          y: 2075,
        },
        type: 'channels',
      },
      {
        sourcePosition: 'right',
        targetPosition: 'left',
        id: 'OrdersService-0.0.3-inventory.{env}.events-1.0.0-AddInventory-0.0.3',
        data: {
          title: 'inventory.{env}.events',
          mode: 'full',
          channel: {
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
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Inventory Events channel is the central stream for all inventory-related events across the system. This includes stock level changes, inventory allocations, adjustments, and stocktake events. Events for a specific SKU are guaranteed to be processed in sequence when using productId as the partition key.\n\n<ChannelInformation />\n\n### Publishing and Subscribing to Events\n\n#### Publishing Example\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'inventory.{env}.events\'\n\n# Create a Kafka producer\nproducer = KafkaProducer(\n    bootstrap_servers=bootstrap_servers,\n    value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example inventory update event\ninventory_event = {\n    "eventType": "STOCK_LEVEL_CHANGED",\n    "timestamp": datetime.utcnow().isoformat(),\n    "version": "1.0",\n    "payload": {\n        "productId": "PROD-456",\n        "locationId": "WH-123",\n        "previousQuantity": 100,\n        "newQuantity": 95,\n        "changeReason": "ORDER_FULFILLED",\n        "unitOfMeasure": "EACH",\n        "batchInfo": {\n            "batchId": "BATCH-789",\n            "expiryDate": "2025-12-31"\n        }\n    },\n    "metadata": {\n        "source": "warehouse_system",\n        "correlationId": "inv-xyz-123",\n        "userId": "john.doe"\n    }\n}\n\n# Send the message - using productId as key for partitioning\nproducer.send(\n    topic, \n    key=inventory_event[\'payload\'][\'productId\'].encode(\'utf-8\'),\n    value=inventory_event\n)\nproducer.flush()\n\nprint(f"Inventory event sent to topic {topic}")\n\n```\n\n### Subscription example\n\n```python\nfrom kafka import KafkaConsumer\nimport json\nfrom datetime import datetime\n\nclass InventoryEventConsumer:\n    def __init__(self):\n        # Kafka configuration\n        self.topic = f\'inventory.{env}.events\'\n        self.consumer = KafkaConsumer(\n            self.topic,\n            bootstrap_servers=[\'localhost:9092\'],\n            group_id=\'inventory-processor-group\',\n            auto_offset_reset=\'earliest\',\n            enable_auto_commit=False,\n            value_deserializer=lambda x: json.loads(x.decode(\'utf-8\')),\n            key_deserializer=lambda x: x.decode(\'utf-8\') if x else None\n        )\n\n    def process_event(self, event):\n        """Process individual inventory events based on type"""\n        event_type = event.get(\'eventType\')\n        \n        if event_type == \'STOCK_LEVEL_CHANGED\':\n            self.handle_stock_level_change(event)\n        elif event_type == \'LOW_STOCK_ALERT\':\n            self.handle_low_stock_alert(event)\n        # Add more event type handlers as needed\n\n    def handle_stock_level_change(self, event):\n        """Handle stock level change events"""\n        payload = event[\'payload\']\n        print(f"Stock level change detected for product {payload[\'productId\']}")\n        print(f"New quantity: {payload[\'newQuantity\']}")\n        # Add your business logic here\n\n    def handle_low_stock_alert(self, event):\n        """Handle low stock alert events"""\n        payload = event[\'payload\']\n        print(f"Low stock alert for product {payload[\'productId\']}")\n        print(f"Current quantity: {payload[\'currentQuantity\']}")\n        # Add your business logic here\n\n    def start_consuming(self):\n        """Start consuming messages from the topic"""\n        try:\n            print(f"Starting consumption from topic: {self.topic}")\n            for message in self.consumer:\n                try:\n                    # Process the message\n                    event = message.value\n                    print(f"Received event: {event[\'eventType\']} for product: {event[\'payload\'][\'productId\']}")\n                    \n                    # Process the event\n                    self.process_event(event)\n                    \n                    # Commit the offset after successful processing\n                    self.consumer.commit()\n                    \n                except Exception as e:\n                    print(f"Error processing message: {str(e)}")\n                    # Implement your error handling logic here\n                    # You might want to send to a DLQ (Dead Letter Queue)\n        \n        except Exception as e:\n            print(f"Consumer error: {str(e)}")\n        finally:\n            # Clean up\n            self.consumer.close()\n\nif __name__ == "__main__":\n    # Create and start the consumer\n    consumer = InventoryEventConsumer()\n    consumer.start_consuming()\n  ```',
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
          source: {
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
          target: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        position: {
          x: 5685,
          y: 3025,
        },
        type: 'channels',
      },
      {
        sourcePosition: 'right',
        targetPosition: 'left',
        id: 'InventoryAdjusted-1.0.1-inventory.{env}.events-1.0.0-NotificationService-0.0.2',
        data: {
          title: 'inventory.{env}.events',
          mode: 'full',
          channel: {
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
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Inventory Events channel is the central stream for all inventory-related events across the system. This includes stock level changes, inventory allocations, adjustments, and stocktake events. Events for a specific SKU are guaranteed to be processed in sequence when using productId as the partition key.\n\n<ChannelInformation />\n\n### Publishing and Subscribing to Events\n\n#### Publishing Example\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'inventory.{env}.events\'\n\n# Create a Kafka producer\nproducer = KafkaProducer(\n    bootstrap_servers=bootstrap_servers,\n    value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example inventory update event\ninventory_event = {\n    "eventType": "STOCK_LEVEL_CHANGED",\n    "timestamp": datetime.utcnow().isoformat(),\n    "version": "1.0",\n    "payload": {\n        "productId": "PROD-456",\n        "locationId": "WH-123",\n        "previousQuantity": 100,\n        "newQuantity": 95,\n        "changeReason": "ORDER_FULFILLED",\n        "unitOfMeasure": "EACH",\n        "batchInfo": {\n            "batchId": "BATCH-789",\n            "expiryDate": "2025-12-31"\n        }\n    },\n    "metadata": {\n        "source": "warehouse_system",\n        "correlationId": "inv-xyz-123",\n        "userId": "john.doe"\n    }\n}\n\n# Send the message - using productId as key for partitioning\nproducer.send(\n    topic, \n    key=inventory_event[\'payload\'][\'productId\'].encode(\'utf-8\'),\n    value=inventory_event\n)\nproducer.flush()\n\nprint(f"Inventory event sent to topic {topic}")\n\n```\n\n### Subscription example\n\n```python\nfrom kafka import KafkaConsumer\nimport json\nfrom datetime import datetime\n\nclass InventoryEventConsumer:\n    def __init__(self):\n        # Kafka configuration\n        self.topic = f\'inventory.{env}.events\'\n        self.consumer = KafkaConsumer(\n            self.topic,\n            bootstrap_servers=[\'localhost:9092\'],\n            group_id=\'inventory-processor-group\',\n            auto_offset_reset=\'earliest\',\n            enable_auto_commit=False,\n            value_deserializer=lambda x: json.loads(x.decode(\'utf-8\')),\n            key_deserializer=lambda x: x.decode(\'utf-8\') if x else None\n        )\n\n    def process_event(self, event):\n        """Process individual inventory events based on type"""\n        event_type = event.get(\'eventType\')\n        \n        if event_type == \'STOCK_LEVEL_CHANGED\':\n            self.handle_stock_level_change(event)\n        elif event_type == \'LOW_STOCK_ALERT\':\n            self.handle_low_stock_alert(event)\n        # Add more event type handlers as needed\n\n    def handle_stock_level_change(self, event):\n        """Handle stock level change events"""\n        payload = event[\'payload\']\n        print(f"Stock level change detected for product {payload[\'productId\']}")\n        print(f"New quantity: {payload[\'newQuantity\']}")\n        # Add your business logic here\n\n    def handle_low_stock_alert(self, event):\n        """Handle low stock alert events"""\n        payload = event[\'payload\']\n        print(f"Low stock alert for product {payload[\'productId\']}")\n        print(f"Current quantity: {payload[\'currentQuantity\']}")\n        # Add your business logic here\n\n    def start_consuming(self):\n        """Start consuming messages from the topic"""\n        try:\n            print(f"Starting consumption from topic: {self.topic}")\n            for message in self.consumer:\n                try:\n                    # Process the message\n                    event = message.value\n                    print(f"Received event: {event[\'eventType\']} for product: {event[\'payload\'][\'productId\']}")\n                    \n                    # Process the event\n                    self.process_event(event)\n                    \n                    # Commit the offset after successful processing\n                    self.consumer.commit()\n                    \n                except Exception as e:\n                    print(f"Error processing message: {str(e)}")\n                    # Implement your error handling logic here\n                    # You might want to send to a DLQ (Dead Letter Queue)\n        \n        except Exception as e:\n            print(f"Consumer error: {str(e)}")\n        finally:\n            # Clean up\n            self.consumer.close()\n\nif __name__ == "__main__":\n    # Create and start the consumer\n    consumer = InventoryEventConsumer()\n    consumer.start_consuming()\n  ```',
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
          source: {
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
          target: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        position: {
          x: 2625,
          y: 575,
        },
        type: 'channels',
      },
      {
        id: 'PaymentProcessed-1.0.0',
        type: 'events',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        position: {
          x: 2115,
          y: 775,
        },
      },
      {
        sourcePosition: 'right',
        targetPosition: 'left',
        id: 'PaymentProcessed-1.0.0-payments.{env}.events-1.0.0-NotificationService-0.0.2',
        data: {
          title: 'payments.{env}.events',
          mode: 'full',
          channel: {
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
              summary: 'All events contain payment ID for traceability and ordered processing.\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Payments Events channel is the central stream for all payment lifecycle events. This includes payment initiation, authorization, capture, completion and failure scenarios. Events for a specific payment are guaranteed to be processed in sequence when using paymentId as the partition key.\n\n<ChannelInformation />\n\n### Publishing Events Using Kafka\n\nHere\'s an example of publishing a payment event:\n\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'payments.{env}.events\'\n\n# Create Kafka producer\nproducer = KafkaProducer(\n   bootstrap_servers=bootstrap_servers,\n   value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example payment processed event\npayment_event = {\n   "eventType": "PAYMENT_PROCESSED",\n   "timestamp": datetime.utcnow().isoformat(),\n   "version": "1.0",\n   "payload": {\n       "paymentId": "PAY-123-456", \n       "orderId": "ORD-789",\n       "amount": {\n           "value": 99.99,\n           "currency": "USD"\n       },\n       "status": "SUCCESS",\n       "paymentMethod": {\n           "type": "CREDIT_CARD",\n           "last4": "4242",\n           "expiryMonth": "12",\n           "expiryYear": "2025",\n           "network": "VISA"\n       },\n       "transactionDetails": {\n           "processorId": "stripe_123xyz",\n           "authorizationCode": "AUTH123",\n           "captureId": "CAP456"\n       }\n   },\n   "metadata": {\n       "correlationId": "corr-123-abc",\n       "merchantId": "MERCH-456", \n       "source": "payment_service",\n       "environment": "prod",\n       "idempotencyKey": "PAY-123-456-2024-11-11-99.99"\n   }\n}\n\n# Send message - using paymentId as key for partitioning\nproducer.send(\n   topic,\n   key=payment_event[\'payload\'][\'paymentId\'].encode(\'utf-8\'),\n   value=payment_event\n)\nproducer.flush()\n```',
            filePath: '../examples/default/channels/payment.{env}.events/index.mdx',
            digest: '261c4005551cac3f',
            deferredRender: true,
            collection: 'channels',
          },
          source: {
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
          target: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        position: {
          x: 2625,
          y: 425,
        },
        type: 'channels',
      },
      {
        id: 'GetUserNotifications-0.0.1',
        type: 'queries',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
            id: 'GetUserNotifications-0.0.1',
            data: {
              id: 'GetUserNotifications',
              name: 'Get user notifications',
              summary:
                'GET request that will return a list of notifications for a specific user, with options to filter by status (unread or all).\n',
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
            filePath:
              '../examples/default/domains/E-Commerce/subdomains/Orders/services/NotificationService/queries/GetUserNotifications/index.mdx',
            digest: '4b02e9790b934892',
            deferredRender: true,
            collection: 'queries',
          },
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        position: {
          x: 2625,
          y: 275,
        },
      },
      {
        id: 'GetNotificationDetails-0.0.1',
        type: 'queries',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
            id: 'GetNotificationDetails-0.0.1',
            data: {
              id: 'GetNotificationDetails',
              name: 'Get notification details',
              summary:
                'GET request that will return detailed information about a specific notification, identified by its notificationId.\n',
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
            filePath:
              '../examples/default/domains/E-Commerce/subdomains/Orders/services/NotificationService/queries/GetNotificationDetails/index.mdx',
            digest: '5825f3b294eb2545',
            deferredRender: true,
            collection: 'queries',
          },
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        position: {
          x: 2625,
          y: 125,
        },
      },
      {
        id: 'NotificationService-0.0.2',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          service: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        type: 'services',
        position: {
          x: 3135,
          y: 325,
        },
      },
      {
        sourcePosition: 'right',
        targetPosition: 'left',
        id: 'NotificationService-0.0.2-inventory.{env}.events-1.0.0-OutOfStock-0.0.4',
        data: {
          title: 'inventory.{env}.events',
          mode: 'full',
          channel: {
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
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Inventory Events channel is the central stream for all inventory-related events across the system. This includes stock level changes, inventory allocations, adjustments, and stocktake events. Events for a specific SKU are guaranteed to be processed in sequence when using productId as the partition key.\n\n<ChannelInformation />\n\n### Publishing and Subscribing to Events\n\n#### Publishing Example\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'inventory.{env}.events\'\n\n# Create a Kafka producer\nproducer = KafkaProducer(\n    bootstrap_servers=bootstrap_servers,\n    value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example inventory update event\ninventory_event = {\n    "eventType": "STOCK_LEVEL_CHANGED",\n    "timestamp": datetime.utcnow().isoformat(),\n    "version": "1.0",\n    "payload": {\n        "productId": "PROD-456",\n        "locationId": "WH-123",\n        "previousQuantity": 100,\n        "newQuantity": 95,\n        "changeReason": "ORDER_FULFILLED",\n        "unitOfMeasure": "EACH",\n        "batchInfo": {\n            "batchId": "BATCH-789",\n            "expiryDate": "2025-12-31"\n        }\n    },\n    "metadata": {\n        "source": "warehouse_system",\n        "correlationId": "inv-xyz-123",\n        "userId": "john.doe"\n    }\n}\n\n# Send the message - using productId as key for partitioning\nproducer.send(\n    topic, \n    key=inventory_event[\'payload\'][\'productId\'].encode(\'utf-8\'),\n    value=inventory_event\n)\nproducer.flush()\n\nprint(f"Inventory event sent to topic {topic}")\n\n```\n\n### Subscription example\n\n```python\nfrom kafka import KafkaConsumer\nimport json\nfrom datetime import datetime\n\nclass InventoryEventConsumer:\n    def __init__(self):\n        # Kafka configuration\n        self.topic = f\'inventory.{env}.events\'\n        self.consumer = KafkaConsumer(\n            self.topic,\n            bootstrap_servers=[\'localhost:9092\'],\n            group_id=\'inventory-processor-group\',\n            auto_offset_reset=\'earliest\',\n            enable_auto_commit=False,\n            value_deserializer=lambda x: json.loads(x.decode(\'utf-8\')),\n            key_deserializer=lambda x: x.decode(\'utf-8\') if x else None\n        )\n\n    def process_event(self, event):\n        """Process individual inventory events based on type"""\n        event_type = event.get(\'eventType\')\n        \n        if event_type == \'STOCK_LEVEL_CHANGED\':\n            self.handle_stock_level_change(event)\n        elif event_type == \'LOW_STOCK_ALERT\':\n            self.handle_low_stock_alert(event)\n        # Add more event type handlers as needed\n\n    def handle_stock_level_change(self, event):\n        """Handle stock level change events"""\n        payload = event[\'payload\']\n        print(f"Stock level change detected for product {payload[\'productId\']}")\n        print(f"New quantity: {payload[\'newQuantity\']}")\n        # Add your business logic here\n\n    def handle_low_stock_alert(self, event):\n        """Handle low stock alert events"""\n        payload = event[\'payload\']\n        print(f"Low stock alert for product {payload[\'productId\']}")\n        print(f"Current quantity: {payload[\'currentQuantity\']}")\n        # Add your business logic here\n\n    def start_consuming(self):\n        """Start consuming messages from the topic"""\n        try:\n            print(f"Starting consumption from topic: {self.topic}")\n            for message in self.consumer:\n                try:\n                    # Process the message\n                    event = message.value\n                    print(f"Received event: {event[\'eventType\']} for product: {event[\'payload\'][\'productId\']}")\n                    \n                    # Process the event\n                    self.process_event(event)\n                    \n                    # Commit the offset after successful processing\n                    self.consumer.commit()\n                    \n                except Exception as e:\n                    print(f"Error processing message: {str(e)}")\n                    # Implement your error handling logic here\n                    # You might want to send to a DLQ (Dead Letter Queue)\n        \n        except Exception as e:\n            print(f"Consumer error: {str(e)}")\n        finally:\n            # Clean up\n            self.consumer.close()\n\nif __name__ == "__main__":\n    # Create and start the consumer\n    consumer = InventoryEventConsumer()\n    consumer.start_consuming()\n  ```',
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
          source: {
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
          target: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        position: {
          x: 3645,
          y: 475,
        },
        type: 'channels',
      },
      {
        id: 'CancelShipment-0.0.1',
        type: 'commands',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        position: {
          x: 2625,
          y: 1950,
        },
      },
      {
        id: 'CreateReturnLabel-0.0.1',
        type: 'commands',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        position: {
          x: 2625,
          y: 1800,
        },
      },
      {
        id: 'CreateShipment-0.0.1',
        type: 'commands',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        position: {
          x: 2625,
          y: 1550,
        },
      },
      {
        id: 'UpdateShipmentStatus-0.0.1',
        type: 'commands',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        position: {
          x: 2625,
          y: 1200,
        },
      },
      {
        sourcePosition: 'right',
        targetPosition: 'left',
        id: 'PaymentProcessed-1.0.0-payments.{env}.events-1.0.0-ShippingService-0.0.1',
        data: {
          title: 'payments.{env}.events',
          mode: 'full',
          channel: {
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
              summary: 'All events contain payment ID for traceability and ordered processing.\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Payments Events channel is the central stream for all payment lifecycle events. This includes payment initiation, authorization, capture, completion and failure scenarios. Events for a specific payment are guaranteed to be processed in sequence when using paymentId as the partition key.\n\n<ChannelInformation />\n\n### Publishing Events Using Kafka\n\nHere\'s an example of publishing a payment event:\n\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'payments.{env}.events\'\n\n# Create Kafka producer\nproducer = KafkaProducer(\n   bootstrap_servers=bootstrap_servers,\n   value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example payment processed event\npayment_event = {\n   "eventType": "PAYMENT_PROCESSED",\n   "timestamp": datetime.utcnow().isoformat(),\n   "version": "1.0",\n   "payload": {\n       "paymentId": "PAY-123-456", \n       "orderId": "ORD-789",\n       "amount": {\n           "value": 99.99,\n           "currency": "USD"\n       },\n       "status": "SUCCESS",\n       "paymentMethod": {\n           "type": "CREDIT_CARD",\n           "last4": "4242",\n           "expiryMonth": "12",\n           "expiryYear": "2025",\n           "network": "VISA"\n       },\n       "transactionDetails": {\n           "processorId": "stripe_123xyz",\n           "authorizationCode": "AUTH123",\n           "captureId": "CAP456"\n       }\n   },\n   "metadata": {\n       "correlationId": "corr-123-abc",\n       "merchantId": "MERCH-456", \n       "source": "payment_service",\n       "environment": "prod",\n       "idempotencyKey": "PAY-123-456-2024-11-11-99.99"\n   }\n}\n\n# Send message - using paymentId as key for partitioning\nproducer.send(\n   topic,\n   key=payment_event[\'payload\'][\'paymentId\'].encode(\'utf-8\'),\n   value=payment_event\n)\nproducer.flush()\n```',
            filePath: '../examples/default/channels/payment.{env}.events/index.mdx',
            digest: '261c4005551cac3f',
            deferredRender: true,
            collection: 'channels',
          },
          source: {
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
          target: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        position: {
          x: 2625,
          y: 1050,
        },
        type: 'channels',
      },
      {
        id: 'ShippingService-0.0.1',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          service: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        type: 'services',
        position: {
          x: 3135,
          y: 1400,
        },
      },
      {
        id: 'ShipmentCreated-0.0.1',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        type: 'events',
        position: {
          x: 3645,
          y: 975,
        },
      },
      {
        id: 'ReturnInitiated-0.0.1',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        type: 'events',
        position: {
          x: 3645,
          y: 1125,
        },
      },
      {
        id: 'ShipmentDispatched-0.0.1',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        type: 'events',
        position: {
          x: 3645,
          y: 1275,
        },
      },
      {
        id: 'ShipmentInTransit-0.0.1',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        type: 'events',
        position: {
          x: 3645,
          y: 1500,
        },
      },
      {
        id: 'ShipmentDelivered-0.0.1',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        type: 'events',
        position: {
          x: 3645,
          y: 1650,
        },
      },
      {
        id: 'DeliveryFailed-0.0.1',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
          group: {
            type: 'Domain',
            value: 'Orders',
            id: 'Orders',
          },
        },
        type: 'events',
        position: {
          x: 3645,
          y: 1800,
        },
      },
      {
        id: 'PaymentInitiated-0.0.1',
        type: 'events',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
          group: {
            type: 'Domain',
            value: 'Payment',
            id: 'Payment',
          },
        },
        position: {
          x: 2115,
          y: 2625,
        },
      },
      {
        sourcePosition: 'right',
        targetPosition: 'left',
        id: 'PaymentInitiated-0.0.1-payments.{env}.events-1.0.0-PaymentService-0.0.1',
        data: {
          title: 'payments.{env}.events',
          mode: 'full',
          channel: {
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
              summary: 'All events contain payment ID for traceability and ordered processing.\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Payments Events channel is the central stream for all payment lifecycle events. This includes payment initiation, authorization, capture, completion and failure scenarios. Events for a specific payment are guaranteed to be processed in sequence when using paymentId as the partition key.\n\n<ChannelInformation />\n\n### Publishing Events Using Kafka\n\nHere\'s an example of publishing a payment event:\n\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'payments.{env}.events\'\n\n# Create Kafka producer\nproducer = KafkaProducer(\n   bootstrap_servers=bootstrap_servers,\n   value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example payment processed event\npayment_event = {\n   "eventType": "PAYMENT_PROCESSED",\n   "timestamp": datetime.utcnow().isoformat(),\n   "version": "1.0",\n   "payload": {\n       "paymentId": "PAY-123-456", \n       "orderId": "ORD-789",\n       "amount": {\n           "value": 99.99,\n           "currency": "USD"\n       },\n       "status": "SUCCESS",\n       "paymentMethod": {\n           "type": "CREDIT_CARD",\n           "last4": "4242",\n           "expiryMonth": "12",\n           "expiryYear": "2025",\n           "network": "VISA"\n       },\n       "transactionDetails": {\n           "processorId": "stripe_123xyz",\n           "authorizationCode": "AUTH123",\n           "captureId": "CAP456"\n       }\n   },\n   "metadata": {\n       "correlationId": "corr-123-abc",\n       "merchantId": "MERCH-456", \n       "source": "payment_service",\n       "environment": "prod",\n       "idempotencyKey": "PAY-123-456-2024-11-11-99.99"\n   }\n}\n\n# Send message - using paymentId as key for partitioning\nproducer.send(\n   topic,\n   key=payment_event[\'payload\'][\'paymentId\'].encode(\'utf-8\'),\n   value=payment_event\n)\nproducer.flush()\n```',
            filePath: '../examples/default/channels/payment.{env}.events/index.mdx',
            digest: '261c4005551cac3f',
            deferredRender: true,
            collection: 'channels',
          },
          source: {
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
          target: {
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
          group: {
            type: 'Domain',
            value: 'Payment',
            id: 'Payment',
          },
        },
        position: {
          x: 2625,
          y: 2625,
        },
        type: 'channels',
      },
      {
        id: 'GetPaymentStatus-0.0.1',
        type: 'queries',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
            id: 'GetPaymentStatus-0.0.1',
            data: {
              id: 'GetPaymentStatus',
              name: 'Get payment status',
              summary:
                'GET request that will return the payment status for a specific order, identified by its orderId.\n',
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
            body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe `GetPaymentStatus` message is a query used to retrieve the payment status for a specific order, identified by its `orderId`. This query returns the current status of the payment, such as whether it is pending, completed, failed, or refunded. It is used by systems that need to track the lifecycle of payments associated with orders, ensuring that the payment has been successfully processed or identifying if any issues occurred during the transaction.\n\nThis query is useful in scenarios such as order management, refund processing, or payment auditing, ensuring that users or systems have real-time visibility into the payment status for a given order.\n\n<NodeGraph />\n\n<SchemaViewer file="schema.json" title="JSON Schema" maxHeight="500" />',
            filePath:
              '../examples/default/domains/E-Commerce/subdomains/Payment/services/PaymentService/queries/GetPaymentStatus/index.mdx',
            digest: '85185bb48c156df5',
            deferredRender: true,
            collection: 'queries',
          },
          group: {
            type: 'Domain',
            value: 'Payment',
            id: 'Payment',
          },
        },
        position: {
          x: 2625,
          y: 2450,
        },
      },
      {
        id: 'UserSubscriptionStarted-0.0.1',
        type: 'events',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
          group: {
            type: 'Domain',
            value: 'Subscription',
            id: 'Subscription',
          },
        },
        position: {
          x: 4665,
          y: 2150,
        },
      },
      {
        sourcePosition: 'right',
        targetPosition: 'left',
        id: 'InventoryAdjusted-1.0.1-inventory.{env}.events-1.0.0-PaymentService-0.0.1',
        data: {
          title: 'inventory.{env}.events',
          mode: 'full',
          channel: {
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
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Inventory Events channel is the central stream for all inventory-related events across the system. This includes stock level changes, inventory allocations, adjustments, and stocktake events. Events for a specific SKU are guaranteed to be processed in sequence when using productId as the partition key.\n\n<ChannelInformation />\n\n### Publishing and Subscribing to Events\n\n#### Publishing Example\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'inventory.{env}.events\'\n\n# Create a Kafka producer\nproducer = KafkaProducer(\n    bootstrap_servers=bootstrap_servers,\n    value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example inventory update event\ninventory_event = {\n    "eventType": "STOCK_LEVEL_CHANGED",\n    "timestamp": datetime.utcnow().isoformat(),\n    "version": "1.0",\n    "payload": {\n        "productId": "PROD-456",\n        "locationId": "WH-123",\n        "previousQuantity": 100,\n        "newQuantity": 95,\n        "changeReason": "ORDER_FULFILLED",\n        "unitOfMeasure": "EACH",\n        "batchInfo": {\n            "batchId": "BATCH-789",\n            "expiryDate": "2025-12-31"\n        }\n    },\n    "metadata": {\n        "source": "warehouse_system",\n        "correlationId": "inv-xyz-123",\n        "userId": "john.doe"\n    }\n}\n\n# Send the message - using productId as key for partitioning\nproducer.send(\n    topic, \n    key=inventory_event[\'payload\'][\'productId\'].encode(\'utf-8\'),\n    value=inventory_event\n)\nproducer.flush()\n\nprint(f"Inventory event sent to topic {topic}")\n\n```\n\n### Subscription example\n\n```python\nfrom kafka import KafkaConsumer\nimport json\nfrom datetime import datetime\n\nclass InventoryEventConsumer:\n    def __init__(self):\n        # Kafka configuration\n        self.topic = f\'inventory.{env}.events\'\n        self.consumer = KafkaConsumer(\n            self.topic,\n            bootstrap_servers=[\'localhost:9092\'],\n            group_id=\'inventory-processor-group\',\n            auto_offset_reset=\'earliest\',\n            enable_auto_commit=False,\n            value_deserializer=lambda x: json.loads(x.decode(\'utf-8\')),\n            key_deserializer=lambda x: x.decode(\'utf-8\') if x else None\n        )\n\n    def process_event(self, event):\n        """Process individual inventory events based on type"""\n        event_type = event.get(\'eventType\')\n        \n        if event_type == \'STOCK_LEVEL_CHANGED\':\n            self.handle_stock_level_change(event)\n        elif event_type == \'LOW_STOCK_ALERT\':\n            self.handle_low_stock_alert(event)\n        # Add more event type handlers as needed\n\n    def handle_stock_level_change(self, event):\n        """Handle stock level change events"""\n        payload = event[\'payload\']\n        print(f"Stock level change detected for product {payload[\'productId\']}")\n        print(f"New quantity: {payload[\'newQuantity\']}")\n        # Add your business logic here\n\n    def handle_low_stock_alert(self, event):\n        """Handle low stock alert events"""\n        payload = event[\'payload\']\n        print(f"Low stock alert for product {payload[\'productId\']}")\n        print(f"Current quantity: {payload[\'currentQuantity\']}")\n        # Add your business logic here\n\n    def start_consuming(self):\n        """Start consuming messages from the topic"""\n        try:\n            print(f"Starting consumption from topic: {self.topic}")\n            for message in self.consumer:\n                try:\n                    # Process the message\n                    event = message.value\n                    print(f"Received event: {event[\'eventType\']} for product: {event[\'payload\'][\'productId\']}")\n                    \n                    # Process the event\n                    self.process_event(event)\n                    \n                    # Commit the offset after successful processing\n                    self.consumer.commit()\n                    \n                except Exception as e:\n                    print(f"Error processing message: {str(e)}")\n                    # Implement your error handling logic here\n                    # You might want to send to a DLQ (Dead Letter Queue)\n        \n        except Exception as e:\n            print(f"Consumer error: {str(e)}")\n        finally:\n            # Clean up\n            self.consumer.close()\n\nif __name__ == "__main__":\n    # Create and start the consumer\n    consumer = InventoryEventConsumer()\n    consumer.start_consuming()\n  ```',
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
          source: {
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
          target: {
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
          group: {
            type: 'Domain',
            value: 'Payment',
            id: 'Payment',
          },
        },
        position: {
          x: 2625,
          y: 2200,
        },
        type: 'channels',
      },
      {
        id: 'PaymentService-0.0.1',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          service: {
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
          group: {
            type: 'Domain',
            value: 'Payment',
            id: 'Payment',
          },
        },
        type: 'services',
        position: {
          x: 3135,
          y: 2275,
        },
      },
      {
        id: 'PaymentProcessed-0.0.1',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
          group: {
            type: 'Domain',
            value: 'Subscription',
            id: 'Subscription',
          },
        },
        type: 'events',
        position: {
          x: 3645,
          y: 2225,
        },
      },
      {
        id: 'SubscribeUser-0.0.1',
        type: 'commands',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
          group: {
            type: 'Domain',
            value: 'Subscription',
            id: 'Subscription',
          },
        },
        position: {
          x: 3645,
          y: 2675,
        },
      },
      {
        id: 'CancelSubscription-0.0.1',
        type: 'commands',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
          group: {
            type: 'Domain',
            value: 'Subscription',
            id: 'Subscription',
          },
        },
        position: {
          x: 3645,
          y: 2525,
        },
      },
      {
        id: 'GetSubscriptionStatus-0.0.2',
        type: 'queries',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
            id: 'GetSubscriptionStatus-0.0.2',
            data: {
              id: 'GetSubscriptionStatus',
              name: 'Get subscription status',
              summary:
                'GET request that will return the current subscription status for a specific user, identified by their userId.\n',
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
            body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe `GetSubscriptionStatus` message is a query used to retrieve the current subscription status for a specific user, identified by their `userId`. This query returns detailed information about the user\'s subscription, such as its current status (active, canceled, expired), the subscription tier or plan, and the next billing date. It is typically used by systems that manage user subscriptions, billing, and renewal processes to ensure that users are aware of their subscription details and any upcoming renewals.\n\nThis query is particularly useful in managing subscriptions for SaaS products, media services, or any recurring payment-based services where users need to manage and view their subscription information.\n\n<NodeGraph />\n\n<SchemaViewer file="schema.json" title="JSON Schema" maxHeight="500" />',
            filePath:
              '../examples/default/domains/E-Commerce/subdomains/Subscriptions/services/SubscriptionService/queries/GetSubscriptionStatus/index.mdx',
            digest: 'c8a50e0186a41b74',
            deferredRender: true,
            collection: 'queries',
          },
          group: {
            type: 'Domain',
            value: 'Subscription',
            id: 'Subscription',
          },
        },
        position: {
          x: 3645,
          y: 2375,
        },
      },
      {
        id: 'SubscriptionService-0.0.1',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          service: {
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
          group: {
            type: 'Domain',
            value: 'Subscription',
            id: 'Subscription',
          },
        },
        type: 'services',
        position: {
          x: 4155,
          y: 2550,
        },
      },
    ],
    edges: [
      {
        label: '',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'OrderConfirmed-0.0.1-orders.{env}.events-1.0.1-InventoryService-0.0.2',
        source: 'OrderConfirmed-0.0.1',
        target: 'OrderConfirmed-0.0.1-orders.{env}.events-1.0.1-InventoryService-0.0.2',
        data: {
          message: {
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
          source: {
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
          channel: {
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
              summary: 'Central event stream for all order-related events in the order processing lifecycle\n',
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
            body: '### Overview\nThe Orders Events channel is the central stream for all order-related events across the order processing lifecycle. This includes order creation, updates, payment status, fulfillment status, and customer communications. All events related to a specific order are guaranteed to be processed in sequence when using orderId as the partition key.\n\n<ChannelInformation />\n\n### Publishing a message using Azure Service Bus\n\nHere is an example of how to publish an order event using Azure Service Bus:\n\n```python\nimport json\nfrom datetime import datetime\nfrom azure.servicebus import ServiceBusClient, ServiceBusMessage\n\n# --- Azure Service Bus Configuration ---\n# Replace with your actual connection string and queue/topic name\nCONNECTION_STR = "YOUR_AZURE_SERVICE_BUS_CONNECTION_STRING"\nQUEUE_NAME = "orders"  # Or your specific queue/topic name e.g., f"orders.{env}.events"\n\n# --- Example Order Event Data ---\n# This is the same event structure as before\norder_event_data = {\n    "eventType": "ORDER_CREATED",\n    "timestamp": datetime.utcnow().isoformat() + "Z", # ISO 8601 format with Z for UTC\n    "version": "1.0",\n    "payload": {\n        "orderId": "12345",\n        "customerId": "CUST-789",\n        "items": [\n            {\n                "productId": "PROD-456",\n                "quantity": 2,\n                "price": 29.99\n            }\n        ],\n        "totalAmount": 59.98,\n        "shippingAddress": {\n            "street": "123 Main St",\n            "city": "Springfield",\n            "country": "US"\n        }\n    },\n    "metadata": {\n        "source": "web_checkout",\n        "correlationId": "abc-xyz-123"\n        # Potentially add a message ID if not automatically handled or for specific tracking\n        # "messageId": str(uuid.uuid4()) # Requires import uuid\n    }\n}\n\ndef send_order_event_to_service_bus(connection_string, queue_name, event_data):\n    # Create a ServiceBusClient object\n    with ServiceBusClient.from_connection_string(conn_str=connection_string) as servicebus_client:\n        # Create a sender for the queue\n        # For a topic, use: servicebus_client.get_topic_sender(topic_name=queue_name)\n        sender = servicebus_client.get_queue_sender(queue_name=queue_name)\n        with sender:\n            # Serialize the event data to a JSON string\n            event_json = json.dumps(event_data)\n            # Create a ServiceBusMessage object\n            message = ServiceBusMessage(event_json)\n            \n            # Set properties if needed, e.g., message_id or correlation_id\n            # message.message_id = event_data["metadata"].get("messageId")\n            message.correlation_id = event_data["metadata"]["correlationId"]\n            \n            # Send the message\n            sender.send_messages(message)\n            print(f"Sent order event (ID: {event_data[\'payload\'][\'orderId\']}) to Azure Service Bus queue: {queue_name}")\n\nif __name__ == "__main__":\n    # Example of how to call the function\n    # Ensure azure-servicebus package is installed: pip install azure-servicebus\n    \n    # Basic error handling for placeholders\n    if CONNECTION_STR == "YOUR_AZURE_SERVICE_BUS_CONNECTION_STRING" or QUEUE_NAME == "YOUR_QUEUE_NAME":\n        print("Please update CONNECTION_STR and QUEUE_NAME with your actual Azure Service Bus details.")\n    else:\n        try:\n            send_order_event_to_service_bus(CONNECTION_STR, QUEUE_NAME, order_event_data)\n        except Exception as e:\n            print(f"An error occurred: {e}")\n            print("Ensure your Azure Service Bus connection string and queue name are correct,")\n            print("and the \'azure-servicebus\' package is installed (\'pip install azure-servicebus\').")',
            filePath: '../examples/default/channels/orders.{env}.events/index.mdx',
            digest: 'c2c6119dcd57051c',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: 'receives event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'orders.{env}.events-1.0.1-InventoryService-0.0.2-OrderConfirmed-0.0.1',
        source: 'OrderConfirmed-0.0.1-orders.{env}.events-1.0.1-InventoryService-0.0.2',
        target: 'InventoryService-0.0.2',
        data: {
          message: {
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
          source: {
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
          channel: {
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
              summary: 'Central event stream for all order-related events in the order processing lifecycle\n',
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
            body: '### Overview\nThe Orders Events channel is the central stream for all order-related events across the order processing lifecycle. This includes order creation, updates, payment status, fulfillment status, and customer communications. All events related to a specific order are guaranteed to be processed in sequence when using orderId as the partition key.\n\n<ChannelInformation />\n\n### Publishing a message using Azure Service Bus\n\nHere is an example of how to publish an order event using Azure Service Bus:\n\n```python\nimport json\nfrom datetime import datetime\nfrom azure.servicebus import ServiceBusClient, ServiceBusMessage\n\n# --- Azure Service Bus Configuration ---\n# Replace with your actual connection string and queue/topic name\nCONNECTION_STR = "YOUR_AZURE_SERVICE_BUS_CONNECTION_STRING"\nQUEUE_NAME = "orders"  # Or your specific queue/topic name e.g., f"orders.{env}.events"\n\n# --- Example Order Event Data ---\n# This is the same event structure as before\norder_event_data = {\n    "eventType": "ORDER_CREATED",\n    "timestamp": datetime.utcnow().isoformat() + "Z", # ISO 8601 format with Z for UTC\n    "version": "1.0",\n    "payload": {\n        "orderId": "12345",\n        "customerId": "CUST-789",\n        "items": [\n            {\n                "productId": "PROD-456",\n                "quantity": 2,\n                "price": 29.99\n            }\n        ],\n        "totalAmount": 59.98,\n        "shippingAddress": {\n            "street": "123 Main St",\n            "city": "Springfield",\n            "country": "US"\n        }\n    },\n    "metadata": {\n        "source": "web_checkout",\n        "correlationId": "abc-xyz-123"\n        # Potentially add a message ID if not automatically handled or for specific tracking\n        # "messageId": str(uuid.uuid4()) # Requires import uuid\n    }\n}\n\ndef send_order_event_to_service_bus(connection_string, queue_name, event_data):\n    # Create a ServiceBusClient object\n    with ServiceBusClient.from_connection_string(conn_str=connection_string) as servicebus_client:\n        # Create a sender for the queue\n        # For a topic, use: servicebus_client.get_topic_sender(topic_name=queue_name)\n        sender = servicebus_client.get_queue_sender(queue_name=queue_name)\n        with sender:\n            # Serialize the event data to a JSON string\n            event_json = json.dumps(event_data)\n            # Create a ServiceBusMessage object\n            message = ServiceBusMessage(event_json)\n            \n            # Set properties if needed, e.g., message_id or correlation_id\n            # message.message_id = event_data["metadata"].get("messageId")\n            message.correlation_id = event_data["metadata"]["correlationId"]\n            \n            # Send the message\n            sender.send_messages(message)\n            print(f"Sent order event (ID: {event_data[\'payload\'][\'orderId\']}) to Azure Service Bus queue: {queue_name}")\n\nif __name__ == "__main__":\n    # Example of how to call the function\n    # Ensure azure-servicebus package is installed: pip install azure-servicebus\n    \n    # Basic error handling for placeholders\n    if CONNECTION_STR == "YOUR_AZURE_SERVICE_BUS_CONNECTION_STRING" or QUEUE_NAME == "YOUR_QUEUE_NAME":\n        print("Please update CONNECTION_STR and QUEUE_NAME with your actual Azure Service Bus details.")\n    else:\n        try:\n            send_order_event_to_service_bus(CONNECTION_STR, QUEUE_NAME, order_event_data)\n        except Exception as e:\n            print(f"An error occurred: {e}")\n            print("Ensure your Azure Service Bus connection string and queue name are correct,")\n            print("and the \'azure-servicebus\' package is installed (\'pip install azure-servicebus\').")',
            filePath: '../examples/default/channels/orders.{env}.events/index.mdx',
            digest: 'c2c6119dcd57051c',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: 'accepts',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'GetInventoryList-0.0.1-InventoryService-0.0.2',
        source: 'GetInventoryList-0.0.1',
        target: 'InventoryService-0.0.2',
        data: {
          message: {
            id: 'GetInventoryList-0.0.1',
            data: {
              id: 'GetInventoryList',
              name: 'List inventory list',
              summary: 'GET request that will return inventory list\n',
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
            body: "import Footer from '@catalog/components/footer.astro';\n\n## Overview\n\nThe GetInventoryList message is a query used to retrieve a comprehensive list of all available inventory items within a system. It is designed to return detailed information about each item, such as product names, quantities, availability status, and potentially additional metadata like categories or locations. This query is typically utilized by systems or services that require a real-time view of current stock, ensuring that downstream applications or users have accurate and up-to-date information for decision-making or operational purposes. The GetInventoryList is ideal for use cases such as order processing, stock management, or reporting, providing visibility into the full range of inventory data.\n\n<NodeGraph />",
            filePath:
              '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/queries/GetInventoryList/index.mdx',
            digest: '4517b5ebf16ef267',
            deferredRender: true,
            collection: 'queries',
          },
        },
      },
      {
        label: '',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'OrderAmended-0.0.1-orders.{env}.events-1.0.1-InventoryService-0.0.2',
        source: 'OrderAmended-0.0.1',
        target: 'OrderAmended-0.0.1-orders.{env}.events-1.0.1-InventoryService-0.0.2',
        data: {
          message: {
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
          source: {
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
          channel: {
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
              summary: 'Central event stream for all order-related events in the order processing lifecycle\n',
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
            body: '### Overview\nThe Orders Events channel is the central stream for all order-related events across the order processing lifecycle. This includes order creation, updates, payment status, fulfillment status, and customer communications. All events related to a specific order are guaranteed to be processed in sequence when using orderId as the partition key.\n\n<ChannelInformation />\n\n### Publishing a message using Azure Service Bus\n\nHere is an example of how to publish an order event using Azure Service Bus:\n\n```python\nimport json\nfrom datetime import datetime\nfrom azure.servicebus import ServiceBusClient, ServiceBusMessage\n\n# --- Azure Service Bus Configuration ---\n# Replace with your actual connection string and queue/topic name\nCONNECTION_STR = "YOUR_AZURE_SERVICE_BUS_CONNECTION_STRING"\nQUEUE_NAME = "orders"  # Or your specific queue/topic name e.g., f"orders.{env}.events"\n\n# --- Example Order Event Data ---\n# This is the same event structure as before\norder_event_data = {\n    "eventType": "ORDER_CREATED",\n    "timestamp": datetime.utcnow().isoformat() + "Z", # ISO 8601 format with Z for UTC\n    "version": "1.0",\n    "payload": {\n        "orderId": "12345",\n        "customerId": "CUST-789",\n        "items": [\n            {\n                "productId": "PROD-456",\n                "quantity": 2,\n                "price": 29.99\n            }\n        ],\n        "totalAmount": 59.98,\n        "shippingAddress": {\n            "street": "123 Main St",\n            "city": "Springfield",\n            "country": "US"\n        }\n    },\n    "metadata": {\n        "source": "web_checkout",\n        "correlationId": "abc-xyz-123"\n        # Potentially add a message ID if not automatically handled or for specific tracking\n        # "messageId": str(uuid.uuid4()) # Requires import uuid\n    }\n}\n\ndef send_order_event_to_service_bus(connection_string, queue_name, event_data):\n    # Create a ServiceBusClient object\n    with ServiceBusClient.from_connection_string(conn_str=connection_string) as servicebus_client:\n        # Create a sender for the queue\n        # For a topic, use: servicebus_client.get_topic_sender(topic_name=queue_name)\n        sender = servicebus_client.get_queue_sender(queue_name=queue_name)\n        with sender:\n            # Serialize the event data to a JSON string\n            event_json = json.dumps(event_data)\n            # Create a ServiceBusMessage object\n            message = ServiceBusMessage(event_json)\n            \n            # Set properties if needed, e.g., message_id or correlation_id\n            # message.message_id = event_data["metadata"].get("messageId")\n            message.correlation_id = event_data["metadata"]["correlationId"]\n            \n            # Send the message\n            sender.send_messages(message)\n            print(f"Sent order event (ID: {event_data[\'payload\'][\'orderId\']}) to Azure Service Bus queue: {queue_name}")\n\nif __name__ == "__main__":\n    # Example of how to call the function\n    # Ensure azure-servicebus package is installed: pip install azure-servicebus\n    \n    # Basic error handling for placeholders\n    if CONNECTION_STR == "YOUR_AZURE_SERVICE_BUS_CONNECTION_STRING" or QUEUE_NAME == "YOUR_QUEUE_NAME":\n        print("Please update CONNECTION_STR and QUEUE_NAME with your actual Azure Service Bus details.")\n    else:\n        try:\n            send_order_event_to_service_bus(CONNECTION_STR, QUEUE_NAME, order_event_data)\n        except Exception as e:\n            print(f"An error occurred: {e}")\n            print("Ensure your Azure Service Bus connection string and queue name are correct,")\n            print("and the \'azure-servicebus\' package is installed (\'pip install azure-servicebus\').")',
            filePath: '../examples/default/channels/orders.{env}.events/index.mdx',
            digest: 'c2c6119dcd57051c',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: 'receives event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'orders.{env}.events-1.0.1-InventoryService-0.0.2-OrderAmended-0.0.1',
        source: 'OrderAmended-0.0.1-orders.{env}.events-1.0.1-InventoryService-0.0.2',
        target: 'InventoryService-0.0.2',
        data: {
          message: {
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
          source: {
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
          channel: {
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
              summary: 'Central event stream for all order-related events in the order processing lifecycle\n',
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
            body: '### Overview\nThe Orders Events channel is the central stream for all order-related events across the order processing lifecycle. This includes order creation, updates, payment status, fulfillment status, and customer communications. All events related to a specific order are guaranteed to be processed in sequence when using orderId as the partition key.\n\n<ChannelInformation />\n\n### Publishing a message using Azure Service Bus\n\nHere is an example of how to publish an order event using Azure Service Bus:\n\n```python\nimport json\nfrom datetime import datetime\nfrom azure.servicebus import ServiceBusClient, ServiceBusMessage\n\n# --- Azure Service Bus Configuration ---\n# Replace with your actual connection string and queue/topic name\nCONNECTION_STR = "YOUR_AZURE_SERVICE_BUS_CONNECTION_STRING"\nQUEUE_NAME = "orders"  # Or your specific queue/topic name e.g., f"orders.{env}.events"\n\n# --- Example Order Event Data ---\n# This is the same event structure as before\norder_event_data = {\n    "eventType": "ORDER_CREATED",\n    "timestamp": datetime.utcnow().isoformat() + "Z", # ISO 8601 format with Z for UTC\n    "version": "1.0",\n    "payload": {\n        "orderId": "12345",\n        "customerId": "CUST-789",\n        "items": [\n            {\n                "productId": "PROD-456",\n                "quantity": 2,\n                "price": 29.99\n            }\n        ],\n        "totalAmount": 59.98,\n        "shippingAddress": {\n            "street": "123 Main St",\n            "city": "Springfield",\n            "country": "US"\n        }\n    },\n    "metadata": {\n        "source": "web_checkout",\n        "correlationId": "abc-xyz-123"\n        # Potentially add a message ID if not automatically handled or for specific tracking\n        # "messageId": str(uuid.uuid4()) # Requires import uuid\n    }\n}\n\ndef send_order_event_to_service_bus(connection_string, queue_name, event_data):\n    # Create a ServiceBusClient object\n    with ServiceBusClient.from_connection_string(conn_str=connection_string) as servicebus_client:\n        # Create a sender for the queue\n        # For a topic, use: servicebus_client.get_topic_sender(topic_name=queue_name)\n        sender = servicebus_client.get_queue_sender(queue_name=queue_name)\n        with sender:\n            # Serialize the event data to a JSON string\n            event_json = json.dumps(event_data)\n            # Create a ServiceBusMessage object\n            message = ServiceBusMessage(event_json)\n            \n            # Set properties if needed, e.g., message_id or correlation_id\n            # message.message_id = event_data["metadata"].get("messageId")\n            message.correlation_id = event_data["metadata"]["correlationId"]\n            \n            # Send the message\n            sender.send_messages(message)\n            print(f"Sent order event (ID: {event_data[\'payload\'][\'orderId\']}) to Azure Service Bus queue: {queue_name}")\n\nif __name__ == "__main__":\n    # Example of how to call the function\n    # Ensure azure-servicebus package is installed: pip install azure-servicebus\n    \n    # Basic error handling for placeholders\n    if CONNECTION_STR == "YOUR_AZURE_SERVICE_BUS_CONNECTION_STRING" or QUEUE_NAME == "YOUR_QUEUE_NAME":\n        print("Please update CONNECTION_STR and QUEUE_NAME with your actual Azure Service Bus details.")\n    else:\n        try:\n            send_order_event_to_service_bus(CONNECTION_STR, QUEUE_NAME, order_event_data)\n        except Exception as e:\n            print(f"An error occurred: {e}")\n            print("Ensure your Azure Service Bus connection string and queue name are correct,")\n            print("and the \'azure-servicebus\' package is installed (\'pip install azure-servicebus\').")',
            filePath: '../examples/default/channels/orders.{env}.events/index.mdx',
            digest: 'c2c6119dcd57051c',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: '',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'UpdateInventory-0.0.3-inventory.{env}.events-1.0.0-InventoryService-0.0.2',
        source: 'UpdateInventory-0.0.3',
        target: 'UpdateInventory-0.0.3-inventory.{env}.events-1.0.0-InventoryService-0.0.2',
        data: {
          message: {
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
          source: {
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
          channel: {
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
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Inventory Events channel is the central stream for all inventory-related events across the system. This includes stock level changes, inventory allocations, adjustments, and stocktake events. Events for a specific SKU are guaranteed to be processed in sequence when using productId as the partition key.\n\n<ChannelInformation />\n\n### Publishing and Subscribing to Events\n\n#### Publishing Example\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'inventory.{env}.events\'\n\n# Create a Kafka producer\nproducer = KafkaProducer(\n    bootstrap_servers=bootstrap_servers,\n    value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example inventory update event\ninventory_event = {\n    "eventType": "STOCK_LEVEL_CHANGED",\n    "timestamp": datetime.utcnow().isoformat(),\n    "version": "1.0",\n    "payload": {\n        "productId": "PROD-456",\n        "locationId": "WH-123",\n        "previousQuantity": 100,\n        "newQuantity": 95,\n        "changeReason": "ORDER_FULFILLED",\n        "unitOfMeasure": "EACH",\n        "batchInfo": {\n            "batchId": "BATCH-789",\n            "expiryDate": "2025-12-31"\n        }\n    },\n    "metadata": {\n        "source": "warehouse_system",\n        "correlationId": "inv-xyz-123",\n        "userId": "john.doe"\n    }\n}\n\n# Send the message - using productId as key for partitioning\nproducer.send(\n    topic, \n    key=inventory_event[\'payload\'][\'productId\'].encode(\'utf-8\'),\n    value=inventory_event\n)\nproducer.flush()\n\nprint(f"Inventory event sent to topic {topic}")\n\n```\n\n### Subscription example\n\n```python\nfrom kafka import KafkaConsumer\nimport json\nfrom datetime import datetime\n\nclass InventoryEventConsumer:\n    def __init__(self):\n        # Kafka configuration\n        self.topic = f\'inventory.{env}.events\'\n        self.consumer = KafkaConsumer(\n            self.topic,\n            bootstrap_servers=[\'localhost:9092\'],\n            group_id=\'inventory-processor-group\',\n            auto_offset_reset=\'earliest\',\n            enable_auto_commit=False,\n            value_deserializer=lambda x: json.loads(x.decode(\'utf-8\')),\n            key_deserializer=lambda x: x.decode(\'utf-8\') if x else None\n        )\n\n    def process_event(self, event):\n        """Process individual inventory events based on type"""\n        event_type = event.get(\'eventType\')\n        \n        if event_type == \'STOCK_LEVEL_CHANGED\':\n            self.handle_stock_level_change(event)\n        elif event_type == \'LOW_STOCK_ALERT\':\n            self.handle_low_stock_alert(event)\n        # Add more event type handlers as needed\n\n    def handle_stock_level_change(self, event):\n        """Handle stock level change events"""\n        payload = event[\'payload\']\n        print(f"Stock level change detected for product {payload[\'productId\']}")\n        print(f"New quantity: {payload[\'newQuantity\']}")\n        # Add your business logic here\n\n    def handle_low_stock_alert(self, event):\n        """Handle low stock alert events"""\n        payload = event[\'payload\']\n        print(f"Low stock alert for product {payload[\'productId\']}")\n        print(f"Current quantity: {payload[\'currentQuantity\']}")\n        # Add your business logic here\n\n    def start_consuming(self):\n        """Start consuming messages from the topic"""\n        try:\n            print(f"Starting consumption from topic: {self.topic}")\n            for message in self.consumer:\n                try:\n                    # Process the message\n                    event = message.value\n                    print(f"Received event: {event[\'eventType\']} for product: {event[\'payload\'][\'productId\']}")\n                    \n                    # Process the event\n                    self.process_event(event)\n                    \n                    # Commit the offset after successful processing\n                    self.consumer.commit()\n                    \n                except Exception as e:\n                    print(f"Error processing message: {str(e)}")\n                    # Implement your error handling logic here\n                    # You might want to send to a DLQ (Dead Letter Queue)\n        \n        except Exception as e:\n            print(f"Consumer error: {str(e)}")\n        finally:\n            # Clean up\n            self.consumer.close()\n\nif __name__ == "__main__":\n    # Create and start the consumer\n    consumer = InventoryEventConsumer()\n    consumer.start_consuming()\n  ```',
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: 'accepts',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'inventory.{env}.events-1.0.0-InventoryService-0.0.2-UpdateInventory-0.0.3',
        source: 'UpdateInventory-0.0.3-inventory.{env}.events-1.0.0-InventoryService-0.0.2',
        target: 'InventoryService-0.0.2',
        data: {
          message: {
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
          source: {
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
          channel: {
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
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Inventory Events channel is the central stream for all inventory-related events across the system. This includes stock level changes, inventory allocations, adjustments, and stocktake events. Events for a specific SKU are guaranteed to be processed in sequence when using productId as the partition key.\n\n<ChannelInformation />\n\n### Publishing and Subscribing to Events\n\n#### Publishing Example\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'inventory.{env}.events\'\n\n# Create a Kafka producer\nproducer = KafkaProducer(\n    bootstrap_servers=bootstrap_servers,\n    value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example inventory update event\ninventory_event = {\n    "eventType": "STOCK_LEVEL_CHANGED",\n    "timestamp": datetime.utcnow().isoformat(),\n    "version": "1.0",\n    "payload": {\n        "productId": "PROD-456",\n        "locationId": "WH-123",\n        "previousQuantity": 100,\n        "newQuantity": 95,\n        "changeReason": "ORDER_FULFILLED",\n        "unitOfMeasure": "EACH",\n        "batchInfo": {\n            "batchId": "BATCH-789",\n            "expiryDate": "2025-12-31"\n        }\n    },\n    "metadata": {\n        "source": "warehouse_system",\n        "correlationId": "inv-xyz-123",\n        "userId": "john.doe"\n    }\n}\n\n# Send the message - using productId as key for partitioning\nproducer.send(\n    topic, \n    key=inventory_event[\'payload\'][\'productId\'].encode(\'utf-8\'),\n    value=inventory_event\n)\nproducer.flush()\n\nprint(f"Inventory event sent to topic {topic}")\n\n```\n\n### Subscription example\n\n```python\nfrom kafka import KafkaConsumer\nimport json\nfrom datetime import datetime\n\nclass InventoryEventConsumer:\n    def __init__(self):\n        # Kafka configuration\n        self.topic = f\'inventory.{env}.events\'\n        self.consumer = KafkaConsumer(\n            self.topic,\n            bootstrap_servers=[\'localhost:9092\'],\n            group_id=\'inventory-processor-group\',\n            auto_offset_reset=\'earliest\',\n            enable_auto_commit=False,\n            value_deserializer=lambda x: json.loads(x.decode(\'utf-8\')),\n            key_deserializer=lambda x: x.decode(\'utf-8\') if x else None\n        )\n\n    def process_event(self, event):\n        """Process individual inventory events based on type"""\n        event_type = event.get(\'eventType\')\n        \n        if event_type == \'STOCK_LEVEL_CHANGED\':\n            self.handle_stock_level_change(event)\n        elif event_type == \'LOW_STOCK_ALERT\':\n            self.handle_low_stock_alert(event)\n        # Add more event type handlers as needed\n\n    def handle_stock_level_change(self, event):\n        """Handle stock level change events"""\n        payload = event[\'payload\']\n        print(f"Stock level change detected for product {payload[\'productId\']}")\n        print(f"New quantity: {payload[\'newQuantity\']}")\n        # Add your business logic here\n\n    def handle_low_stock_alert(self, event):\n        """Handle low stock alert events"""\n        payload = event[\'payload\']\n        print(f"Low stock alert for product {payload[\'productId\']}")\n        print(f"Current quantity: {payload[\'currentQuantity\']}")\n        # Add your business logic here\n\n    def start_consuming(self):\n        """Start consuming messages from the topic"""\n        try:\n            print(f"Starting consumption from topic: {self.topic}")\n            for message in self.consumer:\n                try:\n                    # Process the message\n                    event = message.value\n                    print(f"Received event: {event[\'eventType\']} for product: {event[\'payload\'][\'productId\']}")\n                    \n                    # Process the event\n                    self.process_event(event)\n                    \n                    # Commit the offset after successful processing\n                    self.consumer.commit()\n                    \n                except Exception as e:\n                    print(f"Error processing message: {str(e)}")\n                    # Implement your error handling logic here\n                    # You might want to send to a DLQ (Dead Letter Queue)\n        \n        except Exception as e:\n            print(f"Consumer error: {str(e)}")\n        finally:\n            # Clean up\n            self.consumer.close()\n\nif __name__ == "__main__":\n    # Create and start the consumer\n    consumer = InventoryEventConsumer()\n    consumer.start_consuming()\n  ```',
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: '',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'AddInventory-0.0.3-inventory.{env}.events-1.0.0-InventoryService-0.0.2',
        source: 'AddInventory-0.0.3',
        target: 'AddInventory-0.0.3-inventory.{env}.events-1.0.0-InventoryService-0.0.2',
        data: {
          message: {
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
          source: {
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
          channel: {
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
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Inventory Events channel is the central stream for all inventory-related events across the system. This includes stock level changes, inventory allocations, adjustments, and stocktake events. Events for a specific SKU are guaranteed to be processed in sequence when using productId as the partition key.\n\n<ChannelInformation />\n\n### Publishing and Subscribing to Events\n\n#### Publishing Example\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'inventory.{env}.events\'\n\n# Create a Kafka producer\nproducer = KafkaProducer(\n    bootstrap_servers=bootstrap_servers,\n    value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example inventory update event\ninventory_event = {\n    "eventType": "STOCK_LEVEL_CHANGED",\n    "timestamp": datetime.utcnow().isoformat(),\n    "version": "1.0",\n    "payload": {\n        "productId": "PROD-456",\n        "locationId": "WH-123",\n        "previousQuantity": 100,\n        "newQuantity": 95,\n        "changeReason": "ORDER_FULFILLED",\n        "unitOfMeasure": "EACH",\n        "batchInfo": {\n            "batchId": "BATCH-789",\n            "expiryDate": "2025-12-31"\n        }\n    },\n    "metadata": {\n        "source": "warehouse_system",\n        "correlationId": "inv-xyz-123",\n        "userId": "john.doe"\n    }\n}\n\n# Send the message - using productId as key for partitioning\nproducer.send(\n    topic, \n    key=inventory_event[\'payload\'][\'productId\'].encode(\'utf-8\'),\n    value=inventory_event\n)\nproducer.flush()\n\nprint(f"Inventory event sent to topic {topic}")\n\n```\n\n### Subscription example\n\n```python\nfrom kafka import KafkaConsumer\nimport json\nfrom datetime import datetime\n\nclass InventoryEventConsumer:\n    def __init__(self):\n        # Kafka configuration\n        self.topic = f\'inventory.{env}.events\'\n        self.consumer = KafkaConsumer(\n            self.topic,\n            bootstrap_servers=[\'localhost:9092\'],\n            group_id=\'inventory-processor-group\',\n            auto_offset_reset=\'earliest\',\n            enable_auto_commit=False,\n            value_deserializer=lambda x: json.loads(x.decode(\'utf-8\')),\n            key_deserializer=lambda x: x.decode(\'utf-8\') if x else None\n        )\n\n    def process_event(self, event):\n        """Process individual inventory events based on type"""\n        event_type = event.get(\'eventType\')\n        \n        if event_type == \'STOCK_LEVEL_CHANGED\':\n            self.handle_stock_level_change(event)\n        elif event_type == \'LOW_STOCK_ALERT\':\n            self.handle_low_stock_alert(event)\n        # Add more event type handlers as needed\n\n    def handle_stock_level_change(self, event):\n        """Handle stock level change events"""\n        payload = event[\'payload\']\n        print(f"Stock level change detected for product {payload[\'productId\']}")\n        print(f"New quantity: {payload[\'newQuantity\']}")\n        # Add your business logic here\n\n    def handle_low_stock_alert(self, event):\n        """Handle low stock alert events"""\n        payload = event[\'payload\']\n        print(f"Low stock alert for product {payload[\'productId\']}")\n        print(f"Current quantity: {payload[\'currentQuantity\']}")\n        # Add your business logic here\n\n    def start_consuming(self):\n        """Start consuming messages from the topic"""\n        try:\n            print(f"Starting consumption from topic: {self.topic}")\n            for message in self.consumer:\n                try:\n                    # Process the message\n                    event = message.value\n                    print(f"Received event: {event[\'eventType\']} for product: {event[\'payload\'][\'productId\']}")\n                    \n                    # Process the event\n                    self.process_event(event)\n                    \n                    # Commit the offset after successful processing\n                    self.consumer.commit()\n                    \n                except Exception as e:\n                    print(f"Error processing message: {str(e)}")\n                    # Implement your error handling logic here\n                    # You might want to send to a DLQ (Dead Letter Queue)\n        \n        except Exception as e:\n            print(f"Consumer error: {str(e)}")\n        finally:\n            # Clean up\n            self.consumer.close()\n\nif __name__ == "__main__":\n    # Create and start the consumer\n    consumer = InventoryEventConsumer()\n    consumer.start_consuming()\n  ```',
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: 'accepts',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'inventory.{env}.events-1.0.0-InventoryService-0.0.2-AddInventory-0.0.3',
        source: 'AddInventory-0.0.3-inventory.{env}.events-1.0.0-InventoryService-0.0.2',
        target: 'InventoryService-0.0.2',
        data: {
          message: {
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
          source: {
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
          channel: {
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
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Inventory Events channel is the central stream for all inventory-related events across the system. This includes stock level changes, inventory allocations, adjustments, and stocktake events. Events for a specific SKU are guaranteed to be processed in sequence when using productId as the partition key.\n\n<ChannelInformation />\n\n### Publishing and Subscribing to Events\n\n#### Publishing Example\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'inventory.{env}.events\'\n\n# Create a Kafka producer\nproducer = KafkaProducer(\n    bootstrap_servers=bootstrap_servers,\n    value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example inventory update event\ninventory_event = {\n    "eventType": "STOCK_LEVEL_CHANGED",\n    "timestamp": datetime.utcnow().isoformat(),\n    "version": "1.0",\n    "payload": {\n        "productId": "PROD-456",\n        "locationId": "WH-123",\n        "previousQuantity": 100,\n        "newQuantity": 95,\n        "changeReason": "ORDER_FULFILLED",\n        "unitOfMeasure": "EACH",\n        "batchInfo": {\n            "batchId": "BATCH-789",\n            "expiryDate": "2025-12-31"\n        }\n    },\n    "metadata": {\n        "source": "warehouse_system",\n        "correlationId": "inv-xyz-123",\n        "userId": "john.doe"\n    }\n}\n\n# Send the message - using productId as key for partitioning\nproducer.send(\n    topic, \n    key=inventory_event[\'payload\'][\'productId\'].encode(\'utf-8\'),\n    value=inventory_event\n)\nproducer.flush()\n\nprint(f"Inventory event sent to topic {topic}")\n\n```\n\n### Subscription example\n\n```python\nfrom kafka import KafkaConsumer\nimport json\nfrom datetime import datetime\n\nclass InventoryEventConsumer:\n    def __init__(self):\n        # Kafka configuration\n        self.topic = f\'inventory.{env}.events\'\n        self.consumer = KafkaConsumer(\n            self.topic,\n            bootstrap_servers=[\'localhost:9092\'],\n            group_id=\'inventory-processor-group\',\n            auto_offset_reset=\'earliest\',\n            enable_auto_commit=False,\n            value_deserializer=lambda x: json.loads(x.decode(\'utf-8\')),\n            key_deserializer=lambda x: x.decode(\'utf-8\') if x else None\n        )\n\n    def process_event(self, event):\n        """Process individual inventory events based on type"""\n        event_type = event.get(\'eventType\')\n        \n        if event_type == \'STOCK_LEVEL_CHANGED\':\n            self.handle_stock_level_change(event)\n        elif event_type == \'LOW_STOCK_ALERT\':\n            self.handle_low_stock_alert(event)\n        # Add more event type handlers as needed\n\n    def handle_stock_level_change(self, event):\n        """Handle stock level change events"""\n        payload = event[\'payload\']\n        print(f"Stock level change detected for product {payload[\'productId\']}")\n        print(f"New quantity: {payload[\'newQuantity\']}")\n        # Add your business logic here\n\n    def handle_low_stock_alert(self, event):\n        """Handle low stock alert events"""\n        payload = event[\'payload\']\n        print(f"Low stock alert for product {payload[\'productId\']}")\n        print(f"Current quantity: {payload[\'currentQuantity\']}")\n        # Add your business logic here\n\n    def start_consuming(self):\n        """Start consuming messages from the topic"""\n        try:\n            print(f"Starting consumption from topic: {self.topic}")\n            for message in self.consumer:\n                try:\n                    # Process the message\n                    event = message.value\n                    print(f"Received event: {event[\'eventType\']} for product: {event[\'payload\'][\'productId\']}")\n                    \n                    # Process the event\n                    self.process_event(event)\n                    \n                    # Commit the offset after successful processing\n                    self.consumer.commit()\n                    \n                except Exception as e:\n                    print(f"Error processing message: {str(e)}")\n                    # Implement your error handling logic here\n                    # You might want to send to a DLQ (Dead Letter Queue)\n        \n        except Exception as e:\n            print(f"Consumer error: {str(e)}")\n        finally:\n            # Clean up\n            self.consumer.close()\n\nif __name__ == "__main__":\n    # Create and start the consumer\n    consumer = InventoryEventConsumer()\n    consumer.start_consuming()\n  ```',
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: 'accepts',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'GetInventoryStatus-0.0.1-InventoryService-0.0.2',
        source: 'GetInventoryStatus-0.0.1',
        target: 'InventoryService-0.0.2',
        data: {
          message: {
            id: 'GetInventoryStatus-0.0.1',
            data: {
              id: 'GetInventoryStatus',
              name: 'Get inventory status',
              summary: 'GET request that will return the current stock status for a specific product.\n',
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
            body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe GetInventoryStatus message is a query designed to retrieve the current stock status for a specific product. \n\nThis query provides detailed information about the available quantity, reserved quantity, and the warehouse location where the product is stored. It is typically used by systems or services that need to determine the real-time availability of a product, enabling efficient stock management, order fulfillment, and inventory tracking processes. \n\nThis query is essential for ensuring accurate stock levels are reported to downstream systems, including e-commerce platforms, warehouse management systems, and sales channels.\n\n<NodeGraph />\n\n<SchemaViewer file="schema.json" title="JSON Schema" maxHeight="500" />\n\n\n### Query using CURL\n\nUse this snippet to query the inventory status\n\n```sh title="Example CURL command"\ncurl -X GET "https://api.yourdomain.com/inventory/status" \\\n-H "Content-Type: application/json" \\\n-d \'{\n  "productId": "12345"\n}\'\n```',
            filePath:
              '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/queries/GetInventoryStatus/index.mdx',
            digest: '00eb1684c4519d03',
            deferredRender: true,
            collection: 'queries',
          },
        },
      },
      {
        label: '',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'DeleteInventory-0.0.3-inventory.{env}.events-1.0.0-InventoryService-0.0.2',
        source: 'DeleteInventory-0.0.3',
        target: 'DeleteInventory-0.0.3-inventory.{env}.events-1.0.0-InventoryService-0.0.2',
        data: {
          message: {
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
          source: {
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
          channel: {
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
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Inventory Events channel is the central stream for all inventory-related events across the system. This includes stock level changes, inventory allocations, adjustments, and stocktake events. Events for a specific SKU are guaranteed to be processed in sequence when using productId as the partition key.\n\n<ChannelInformation />\n\n### Publishing and Subscribing to Events\n\n#### Publishing Example\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'inventory.{env}.events\'\n\n# Create a Kafka producer\nproducer = KafkaProducer(\n    bootstrap_servers=bootstrap_servers,\n    value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example inventory update event\ninventory_event = {\n    "eventType": "STOCK_LEVEL_CHANGED",\n    "timestamp": datetime.utcnow().isoformat(),\n    "version": "1.0",\n    "payload": {\n        "productId": "PROD-456",\n        "locationId": "WH-123",\n        "previousQuantity": 100,\n        "newQuantity": 95,\n        "changeReason": "ORDER_FULFILLED",\n        "unitOfMeasure": "EACH",\n        "batchInfo": {\n            "batchId": "BATCH-789",\n            "expiryDate": "2025-12-31"\n        }\n    },\n    "metadata": {\n        "source": "warehouse_system",\n        "correlationId": "inv-xyz-123",\n        "userId": "john.doe"\n    }\n}\n\n# Send the message - using productId as key for partitioning\nproducer.send(\n    topic, \n    key=inventory_event[\'payload\'][\'productId\'].encode(\'utf-8\'),\n    value=inventory_event\n)\nproducer.flush()\n\nprint(f"Inventory event sent to topic {topic}")\n\n```\n\n### Subscription example\n\n```python\nfrom kafka import KafkaConsumer\nimport json\nfrom datetime import datetime\n\nclass InventoryEventConsumer:\n    def __init__(self):\n        # Kafka configuration\n        self.topic = f\'inventory.{env}.events\'\n        self.consumer = KafkaConsumer(\n            self.topic,\n            bootstrap_servers=[\'localhost:9092\'],\n            group_id=\'inventory-processor-group\',\n            auto_offset_reset=\'earliest\',\n            enable_auto_commit=False,\n            value_deserializer=lambda x: json.loads(x.decode(\'utf-8\')),\n            key_deserializer=lambda x: x.decode(\'utf-8\') if x else None\n        )\n\n    def process_event(self, event):\n        """Process individual inventory events based on type"""\n        event_type = event.get(\'eventType\')\n        \n        if event_type == \'STOCK_LEVEL_CHANGED\':\n            self.handle_stock_level_change(event)\n        elif event_type == \'LOW_STOCK_ALERT\':\n            self.handle_low_stock_alert(event)\n        # Add more event type handlers as needed\n\n    def handle_stock_level_change(self, event):\n        """Handle stock level change events"""\n        payload = event[\'payload\']\n        print(f"Stock level change detected for product {payload[\'productId\']}")\n        print(f"New quantity: {payload[\'newQuantity\']}")\n        # Add your business logic here\n\n    def handle_low_stock_alert(self, event):\n        """Handle low stock alert events"""\n        payload = event[\'payload\']\n        print(f"Low stock alert for product {payload[\'productId\']}")\n        print(f"Current quantity: {payload[\'currentQuantity\']}")\n        # Add your business logic here\n\n    def start_consuming(self):\n        """Start consuming messages from the topic"""\n        try:\n            print(f"Starting consumption from topic: {self.topic}")\n            for message in self.consumer:\n                try:\n                    # Process the message\n                    event = message.value\n                    print(f"Received event: {event[\'eventType\']} for product: {event[\'payload\'][\'productId\']}")\n                    \n                    # Process the event\n                    self.process_event(event)\n                    \n                    # Commit the offset after successful processing\n                    self.consumer.commit()\n                    \n                except Exception as e:\n                    print(f"Error processing message: {str(e)}")\n                    # Implement your error handling logic here\n                    # You might want to send to a DLQ (Dead Letter Queue)\n        \n        except Exception as e:\n            print(f"Consumer error: {str(e)}")\n        finally:\n            # Clean up\n            self.consumer.close()\n\nif __name__ == "__main__":\n    # Create and start the consumer\n    consumer = InventoryEventConsumer()\n    consumer.start_consuming()\n  ```',
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: 'accepts',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'inventory.{env}.events-1.0.0-InventoryService-0.0.2-DeleteInventory-0.0.3',
        source: 'DeleteInventory-0.0.3-inventory.{env}.events-1.0.0-InventoryService-0.0.2',
        target: 'InventoryService-0.0.2',
        data: {
          message: {
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
          source: {
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
          channel: {
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
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Inventory Events channel is the central stream for all inventory-related events across the system. This includes stock level changes, inventory allocations, adjustments, and stocktake events. Events for a specific SKU are guaranteed to be processed in sequence when using productId as the partition key.\n\n<ChannelInformation />\n\n### Publishing and Subscribing to Events\n\n#### Publishing Example\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'inventory.{env}.events\'\n\n# Create a Kafka producer\nproducer = KafkaProducer(\n    bootstrap_servers=bootstrap_servers,\n    value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example inventory update event\ninventory_event = {\n    "eventType": "STOCK_LEVEL_CHANGED",\n    "timestamp": datetime.utcnow().isoformat(),\n    "version": "1.0",\n    "payload": {\n        "productId": "PROD-456",\n        "locationId": "WH-123",\n        "previousQuantity": 100,\n        "newQuantity": 95,\n        "changeReason": "ORDER_FULFILLED",\n        "unitOfMeasure": "EACH",\n        "batchInfo": {\n            "batchId": "BATCH-789",\n            "expiryDate": "2025-12-31"\n        }\n    },\n    "metadata": {\n        "source": "warehouse_system",\n        "correlationId": "inv-xyz-123",\n        "userId": "john.doe"\n    }\n}\n\n# Send the message - using productId as key for partitioning\nproducer.send(\n    topic, \n    key=inventory_event[\'payload\'][\'productId\'].encode(\'utf-8\'),\n    value=inventory_event\n)\nproducer.flush()\n\nprint(f"Inventory event sent to topic {topic}")\n\n```\n\n### Subscription example\n\n```python\nfrom kafka import KafkaConsumer\nimport json\nfrom datetime import datetime\n\nclass InventoryEventConsumer:\n    def __init__(self):\n        # Kafka configuration\n        self.topic = f\'inventory.{env}.events\'\n        self.consumer = KafkaConsumer(\n            self.topic,\n            bootstrap_servers=[\'localhost:9092\'],\n            group_id=\'inventory-processor-group\',\n            auto_offset_reset=\'earliest\',\n            enable_auto_commit=False,\n            value_deserializer=lambda x: json.loads(x.decode(\'utf-8\')),\n            key_deserializer=lambda x: x.decode(\'utf-8\') if x else None\n        )\n\n    def process_event(self, event):\n        """Process individual inventory events based on type"""\n        event_type = event.get(\'eventType\')\n        \n        if event_type == \'STOCK_LEVEL_CHANGED\':\n            self.handle_stock_level_change(event)\n        elif event_type == \'LOW_STOCK_ALERT\':\n            self.handle_low_stock_alert(event)\n        # Add more event type handlers as needed\n\n    def handle_stock_level_change(self, event):\n        """Handle stock level change events"""\n        payload = event[\'payload\']\n        print(f"Stock level change detected for product {payload[\'productId\']}")\n        print(f"New quantity: {payload[\'newQuantity\']}")\n        # Add your business logic here\n\n    def handle_low_stock_alert(self, event):\n        """Handle low stock alert events"""\n        payload = event[\'payload\']\n        print(f"Low stock alert for product {payload[\'productId\']}")\n        print(f"Current quantity: {payload[\'currentQuantity\']}")\n        # Add your business logic here\n\n    def start_consuming(self):\n        """Start consuming messages from the topic"""\n        try:\n            print(f"Starting consumption from topic: {self.topic}")\n            for message in self.consumer:\n                try:\n                    # Process the message\n                    event = message.value\n                    print(f"Received event: {event[\'eventType\']} for product: {event[\'payload\'][\'productId\']}")\n                    \n                    # Process the event\n                    self.process_event(event)\n                    \n                    # Commit the offset after successful processing\n                    self.consumer.commit()\n                    \n                except Exception as e:\n                    print(f"Error processing message: {str(e)}")\n                    # Implement your error handling logic here\n                    # You might want to send to a DLQ (Dead Letter Queue)\n        \n        except Exception as e:\n            print(f"Consumer error: {str(e)}")\n        finally:\n            # Clean up\n            self.consumer.close()\n\nif __name__ == "__main__":\n    # Create and start the consumer\n    consumer = InventoryEventConsumer()\n    consumer.start_consuming()\n  ```',
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: '',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'InventoryService-0.0.2-inventory.{env}.events-1.0.0-InventoryAdjusted-1.0.1',
        source: 'InventoryService-0.0.2',
        target: 'InventoryService-0.0.2-inventory.{env}.events-1.0.0-InventoryAdjusted-1.0.1',
        data: {
          message: {
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
          source: {
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
          channel: {
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
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Inventory Events channel is the central stream for all inventory-related events across the system. This includes stock level changes, inventory allocations, adjustments, and stocktake events. Events for a specific SKU are guaranteed to be processed in sequence when using productId as the partition key.\n\n<ChannelInformation />\n\n### Publishing and Subscribing to Events\n\n#### Publishing Example\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'inventory.{env}.events\'\n\n# Create a Kafka producer\nproducer = KafkaProducer(\n    bootstrap_servers=bootstrap_servers,\n    value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example inventory update event\ninventory_event = {\n    "eventType": "STOCK_LEVEL_CHANGED",\n    "timestamp": datetime.utcnow().isoformat(),\n    "version": "1.0",\n    "payload": {\n        "productId": "PROD-456",\n        "locationId": "WH-123",\n        "previousQuantity": 100,\n        "newQuantity": 95,\n        "changeReason": "ORDER_FULFILLED",\n        "unitOfMeasure": "EACH",\n        "batchInfo": {\n            "batchId": "BATCH-789",\n            "expiryDate": "2025-12-31"\n        }\n    },\n    "metadata": {\n        "source": "warehouse_system",\n        "correlationId": "inv-xyz-123",\n        "userId": "john.doe"\n    }\n}\n\n# Send the message - using productId as key for partitioning\nproducer.send(\n    topic, \n    key=inventory_event[\'payload\'][\'productId\'].encode(\'utf-8\'),\n    value=inventory_event\n)\nproducer.flush()\n\nprint(f"Inventory event sent to topic {topic}")\n\n```\n\n### Subscription example\n\n```python\nfrom kafka import KafkaConsumer\nimport json\nfrom datetime import datetime\n\nclass InventoryEventConsumer:\n    def __init__(self):\n        # Kafka configuration\n        self.topic = f\'inventory.{env}.events\'\n        self.consumer = KafkaConsumer(\n            self.topic,\n            bootstrap_servers=[\'localhost:9092\'],\n            group_id=\'inventory-processor-group\',\n            auto_offset_reset=\'earliest\',\n            enable_auto_commit=False,\n            value_deserializer=lambda x: json.loads(x.decode(\'utf-8\')),\n            key_deserializer=lambda x: x.decode(\'utf-8\') if x else None\n        )\n\n    def process_event(self, event):\n        """Process individual inventory events based on type"""\n        event_type = event.get(\'eventType\')\n        \n        if event_type == \'STOCK_LEVEL_CHANGED\':\n            self.handle_stock_level_change(event)\n        elif event_type == \'LOW_STOCK_ALERT\':\n            self.handle_low_stock_alert(event)\n        # Add more event type handlers as needed\n\n    def handle_stock_level_change(self, event):\n        """Handle stock level change events"""\n        payload = event[\'payload\']\n        print(f"Stock level change detected for product {payload[\'productId\']}")\n        print(f"New quantity: {payload[\'newQuantity\']}")\n        # Add your business logic here\n\n    def handle_low_stock_alert(self, event):\n        """Handle low stock alert events"""\n        payload = event[\'payload\']\n        print(f"Low stock alert for product {payload[\'productId\']}")\n        print(f"Current quantity: {payload[\'currentQuantity\']}")\n        # Add your business logic here\n\n    def start_consuming(self):\n        """Start consuming messages from the topic"""\n        try:\n            print(f"Starting consumption from topic: {self.topic}")\n            for message in self.consumer:\n                try:\n                    # Process the message\n                    event = message.value\n                    print(f"Received event: {event[\'eventType\']} for product: {event[\'payload\'][\'productId\']}")\n                    \n                    # Process the event\n                    self.process_event(event)\n                    \n                    # Commit the offset after successful processing\n                    self.consumer.commit()\n                    \n                except Exception as e:\n                    print(f"Error processing message: {str(e)}")\n                    # Implement your error handling logic here\n                    # You might want to send to a DLQ (Dead Letter Queue)\n        \n        except Exception as e:\n            print(f"Consumer error: {str(e)}")\n        finally:\n            # Clean up\n            self.consumer.close()\n\nif __name__ == "__main__":\n    # Create and start the consumer\n    consumer = InventoryEventConsumer()\n    consumer.start_consuming()\n  ```',
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: 'publishes event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'inventory.{env}.events-1.0.0-InventoryAdjusted-1.0.1-InventoryService-0.0.2',
        source: 'InventoryService-0.0.2-inventory.{env}.events-1.0.0-InventoryAdjusted-1.0.1',
        target: 'InventoryAdjusted-1.0.1',
        data: {
          message: {
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
          source: {
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
          channel: {
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
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Inventory Events channel is the central stream for all inventory-related events across the system. This includes stock level changes, inventory allocations, adjustments, and stocktake events. Events for a specific SKU are guaranteed to be processed in sequence when using productId as the partition key.\n\n<ChannelInformation />\n\n### Publishing and Subscribing to Events\n\n#### Publishing Example\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'inventory.{env}.events\'\n\n# Create a Kafka producer\nproducer = KafkaProducer(\n    bootstrap_servers=bootstrap_servers,\n    value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example inventory update event\ninventory_event = {\n    "eventType": "STOCK_LEVEL_CHANGED",\n    "timestamp": datetime.utcnow().isoformat(),\n    "version": "1.0",\n    "payload": {\n        "productId": "PROD-456",\n        "locationId": "WH-123",\n        "previousQuantity": 100,\n        "newQuantity": 95,\n        "changeReason": "ORDER_FULFILLED",\n        "unitOfMeasure": "EACH",\n        "batchInfo": {\n            "batchId": "BATCH-789",\n            "expiryDate": "2025-12-31"\n        }\n    },\n    "metadata": {\n        "source": "warehouse_system",\n        "correlationId": "inv-xyz-123",\n        "userId": "john.doe"\n    }\n}\n\n# Send the message - using productId as key for partitioning\nproducer.send(\n    topic, \n    key=inventory_event[\'payload\'][\'productId\'].encode(\'utf-8\'),\n    value=inventory_event\n)\nproducer.flush()\n\nprint(f"Inventory event sent to topic {topic}")\n\n```\n\n### Subscription example\n\n```python\nfrom kafka import KafkaConsumer\nimport json\nfrom datetime import datetime\n\nclass InventoryEventConsumer:\n    def __init__(self):\n        # Kafka configuration\n        self.topic = f\'inventory.{env}.events\'\n        self.consumer = KafkaConsumer(\n            self.topic,\n            bootstrap_servers=[\'localhost:9092\'],\n            group_id=\'inventory-processor-group\',\n            auto_offset_reset=\'earliest\',\n            enable_auto_commit=False,\n            value_deserializer=lambda x: json.loads(x.decode(\'utf-8\')),\n            key_deserializer=lambda x: x.decode(\'utf-8\') if x else None\n        )\n\n    def process_event(self, event):\n        """Process individual inventory events based on type"""\n        event_type = event.get(\'eventType\')\n        \n        if event_type == \'STOCK_LEVEL_CHANGED\':\n            self.handle_stock_level_change(event)\n        elif event_type == \'LOW_STOCK_ALERT\':\n            self.handle_low_stock_alert(event)\n        # Add more event type handlers as needed\n\n    def handle_stock_level_change(self, event):\n        """Handle stock level change events"""\n        payload = event[\'payload\']\n        print(f"Stock level change detected for product {payload[\'productId\']}")\n        print(f"New quantity: {payload[\'newQuantity\']}")\n        # Add your business logic here\n\n    def handle_low_stock_alert(self, event):\n        """Handle low stock alert events"""\n        payload = event[\'payload\']\n        print(f"Low stock alert for product {payload[\'productId\']}")\n        print(f"Current quantity: {payload[\'currentQuantity\']}")\n        # Add your business logic here\n\n    def start_consuming(self):\n        """Start consuming messages from the topic"""\n        try:\n            print(f"Starting consumption from topic: {self.topic}")\n            for message in self.consumer:\n                try:\n                    # Process the message\n                    event = message.value\n                    print(f"Received event: {event[\'eventType\']} for product: {event[\'payload\'][\'productId\']}")\n                    \n                    # Process the event\n                    self.process_event(event)\n                    \n                    # Commit the offset after successful processing\n                    self.consumer.commit()\n                    \n                except Exception as e:\n                    print(f"Error processing message: {str(e)}")\n                    # Implement your error handling logic here\n                    # You might want to send to a DLQ (Dead Letter Queue)\n        \n        except Exception as e:\n            print(f"Consumer error: {str(e)}")\n        finally:\n            # Clean up\n            self.consumer.close()\n\nif __name__ == "__main__":\n    # Create and start the consumer\n    consumer = InventoryEventConsumer()\n    consumer.start_consuming()\n  ```',
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: '',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'InventoryService-0.0.2-inventory.{env}.events-1.0.0-OutOfStock-0.0.4',
        source: 'InventoryService-0.0.2',
        target: 'InventoryService-0.0.2-inventory.{env}.events-1.0.0-OutOfStock-0.0.4',
        data: {
          message: {
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
          source: {
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
          channel: {
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
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Inventory Events channel is the central stream for all inventory-related events across the system. This includes stock level changes, inventory allocations, adjustments, and stocktake events. Events for a specific SKU are guaranteed to be processed in sequence when using productId as the partition key.\n\n<ChannelInformation />\n\n### Publishing and Subscribing to Events\n\n#### Publishing Example\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'inventory.{env}.events\'\n\n# Create a Kafka producer\nproducer = KafkaProducer(\n    bootstrap_servers=bootstrap_servers,\n    value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example inventory update event\ninventory_event = {\n    "eventType": "STOCK_LEVEL_CHANGED",\n    "timestamp": datetime.utcnow().isoformat(),\n    "version": "1.0",\n    "payload": {\n        "productId": "PROD-456",\n        "locationId": "WH-123",\n        "previousQuantity": 100,\n        "newQuantity": 95,\n        "changeReason": "ORDER_FULFILLED",\n        "unitOfMeasure": "EACH",\n        "batchInfo": {\n            "batchId": "BATCH-789",\n            "expiryDate": "2025-12-31"\n        }\n    },\n    "metadata": {\n        "source": "warehouse_system",\n        "correlationId": "inv-xyz-123",\n        "userId": "john.doe"\n    }\n}\n\n# Send the message - using productId as key for partitioning\nproducer.send(\n    topic, \n    key=inventory_event[\'payload\'][\'productId\'].encode(\'utf-8\'),\n    value=inventory_event\n)\nproducer.flush()\n\nprint(f"Inventory event sent to topic {topic}")\n\n```\n\n### Subscription example\n\n```python\nfrom kafka import KafkaConsumer\nimport json\nfrom datetime import datetime\n\nclass InventoryEventConsumer:\n    def __init__(self):\n        # Kafka configuration\n        self.topic = f\'inventory.{env}.events\'\n        self.consumer = KafkaConsumer(\n            self.topic,\n            bootstrap_servers=[\'localhost:9092\'],\n            group_id=\'inventory-processor-group\',\n            auto_offset_reset=\'earliest\',\n            enable_auto_commit=False,\n            value_deserializer=lambda x: json.loads(x.decode(\'utf-8\')),\n            key_deserializer=lambda x: x.decode(\'utf-8\') if x else None\n        )\n\n    def process_event(self, event):\n        """Process individual inventory events based on type"""\n        event_type = event.get(\'eventType\')\n        \n        if event_type == \'STOCK_LEVEL_CHANGED\':\n            self.handle_stock_level_change(event)\n        elif event_type == \'LOW_STOCK_ALERT\':\n            self.handle_low_stock_alert(event)\n        # Add more event type handlers as needed\n\n    def handle_stock_level_change(self, event):\n        """Handle stock level change events"""\n        payload = event[\'payload\']\n        print(f"Stock level change detected for product {payload[\'productId\']}")\n        print(f"New quantity: {payload[\'newQuantity\']}")\n        # Add your business logic here\n\n    def handle_low_stock_alert(self, event):\n        """Handle low stock alert events"""\n        payload = event[\'payload\']\n        print(f"Low stock alert for product {payload[\'productId\']}")\n        print(f"Current quantity: {payload[\'currentQuantity\']}")\n        # Add your business logic here\n\n    def start_consuming(self):\n        """Start consuming messages from the topic"""\n        try:\n            print(f"Starting consumption from topic: {self.topic}")\n            for message in self.consumer:\n                try:\n                    # Process the message\n                    event = message.value\n                    print(f"Received event: {event[\'eventType\']} for product: {event[\'payload\'][\'productId\']}")\n                    \n                    # Process the event\n                    self.process_event(event)\n                    \n                    # Commit the offset after successful processing\n                    self.consumer.commit()\n                    \n                except Exception as e:\n                    print(f"Error processing message: {str(e)}")\n                    # Implement your error handling logic here\n                    # You might want to send to a DLQ (Dead Letter Queue)\n        \n        except Exception as e:\n            print(f"Consumer error: {str(e)}")\n        finally:\n            # Clean up\n            self.consumer.close()\n\nif __name__ == "__main__":\n    # Create and start the consumer\n    consumer = InventoryEventConsumer()\n    consumer.start_consuming()\n  ```',
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: 'publishes event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'inventory.{env}.events-1.0.0-OutOfStock-0.0.4-InventoryService-0.0.2',
        source: 'InventoryService-0.0.2-inventory.{env}.events-1.0.0-OutOfStock-0.0.4',
        target: 'OutOfStock-0.0.4',
        data: {
          message: {
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
          source: {
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
          channel: {
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
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Inventory Events channel is the central stream for all inventory-related events across the system. This includes stock level changes, inventory allocations, adjustments, and stocktake events. Events for a specific SKU are guaranteed to be processed in sequence when using productId as the partition key.\n\n<ChannelInformation />\n\n### Publishing and Subscribing to Events\n\n#### Publishing Example\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'inventory.{env}.events\'\n\n# Create a Kafka producer\nproducer = KafkaProducer(\n    bootstrap_servers=bootstrap_servers,\n    value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example inventory update event\ninventory_event = {\n    "eventType": "STOCK_LEVEL_CHANGED",\n    "timestamp": datetime.utcnow().isoformat(),\n    "version": "1.0",\n    "payload": {\n        "productId": "PROD-456",\n        "locationId": "WH-123",\n        "previousQuantity": 100,\n        "newQuantity": 95,\n        "changeReason": "ORDER_FULFILLED",\n        "unitOfMeasure": "EACH",\n        "batchInfo": {\n            "batchId": "BATCH-789",\n            "expiryDate": "2025-12-31"\n        }\n    },\n    "metadata": {\n        "source": "warehouse_system",\n        "correlationId": "inv-xyz-123",\n        "userId": "john.doe"\n    }\n}\n\n# Send the message - using productId as key for partitioning\nproducer.send(\n    topic, \n    key=inventory_event[\'payload\'][\'productId\'].encode(\'utf-8\'),\n    value=inventory_event\n)\nproducer.flush()\n\nprint(f"Inventory event sent to topic {topic}")\n\n```\n\n### Subscription example\n\n```python\nfrom kafka import KafkaConsumer\nimport json\nfrom datetime import datetime\n\nclass InventoryEventConsumer:\n    def __init__(self):\n        # Kafka configuration\n        self.topic = f\'inventory.{env}.events\'\n        self.consumer = KafkaConsumer(\n            self.topic,\n            bootstrap_servers=[\'localhost:9092\'],\n            group_id=\'inventory-processor-group\',\n            auto_offset_reset=\'earliest\',\n            enable_auto_commit=False,\n            value_deserializer=lambda x: json.loads(x.decode(\'utf-8\')),\n            key_deserializer=lambda x: x.decode(\'utf-8\') if x else None\n        )\n\n    def process_event(self, event):\n        """Process individual inventory events based on type"""\n        event_type = event.get(\'eventType\')\n        \n        if event_type == \'STOCK_LEVEL_CHANGED\':\n            self.handle_stock_level_change(event)\n        elif event_type == \'LOW_STOCK_ALERT\':\n            self.handle_low_stock_alert(event)\n        # Add more event type handlers as needed\n\n    def handle_stock_level_change(self, event):\n        """Handle stock level change events"""\n        payload = event[\'payload\']\n        print(f"Stock level change detected for product {payload[\'productId\']}")\n        print(f"New quantity: {payload[\'newQuantity\']}")\n        # Add your business logic here\n\n    def handle_low_stock_alert(self, event):\n        """Handle low stock alert events"""\n        payload = event[\'payload\']\n        print(f"Low stock alert for product {payload[\'productId\']}")\n        print(f"Current quantity: {payload[\'currentQuantity\']}")\n        # Add your business logic here\n\n    def start_consuming(self):\n        """Start consuming messages from the topic"""\n        try:\n            print(f"Starting consumption from topic: {self.topic}")\n            for message in self.consumer:\n                try:\n                    # Process the message\n                    event = message.value\n                    print(f"Received event: {event[\'eventType\']} for product: {event[\'payload\'][\'productId\']}")\n                    \n                    # Process the event\n                    self.process_event(event)\n                    \n                    # Commit the offset after successful processing\n                    self.consumer.commit()\n                    \n                except Exception as e:\n                    print(f"Error processing message: {str(e)}")\n                    # Implement your error handling logic here\n                    # You might want to send to a DLQ (Dead Letter Queue)\n        \n        except Exception as e:\n            print(f"Consumer error: {str(e)}")\n        finally:\n            # Clean up\n            self.consumer.close()\n\nif __name__ == "__main__":\n    # Create and start the consumer\n    consumer = InventoryEventConsumer()\n    consumer.start_consuming()\n  ```',
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: 'requests',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'InventoryService-0.0.2-GetOrder-0.0.1',
        source: 'InventoryService-0.0.2',
        target: 'GetOrder-0.0.1',
        data: {
          message: {
            id: 'GetOrder-0.0.1',
            data: {
              id: 'GetOrder',
              name: 'Get order details',
              summary:
                'GET request that will return detailed information about a specific order, identified by its orderId.\n',
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
            body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe `GetOrder` message is a query used to retrieve detailed information about a specific order, identified by its `orderId`. It provides information such as the order status (e.g., pending, completed, shipped), the items within the order, billing and shipping details, payment information, and the order\'s total amount. This query is commonly used by systems managing order processing, customer service, or order tracking functionalities.\n\nThis query can be applied in e-commerce systems, marketplaces, or any platform where users and systems need real-time order data for tracking, auditing, or managing customer purchases.\n\n<NodeGraph />\n\n<SchemaViewer file="schema.json" title="JSON Schema" maxHeight="500" />',
            filePath:
              '../examples/default/domains/E-Commerce/subdomains/Orders/services/OrdersService/queries/GetOrder/index.mdx',
            digest: '71f186bfcba04dad',
            deferredRender: true,
            collection: 'queries',
          },
        },
      },
      {
        label: 'accepts',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'GetOrder-0.0.1-OrdersService-0.0.3',
        source: 'GetOrder-0.0.1',
        target: 'OrdersService-0.0.3',
        data: {
          message: {
            id: 'GetOrder-0.0.1',
            data: {
              id: 'GetOrder',
              name: 'Get order details',
              summary:
                'GET request that will return detailed information about a specific order, identified by its orderId.\n',
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
            body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe `GetOrder` message is a query used to retrieve detailed information about a specific order, identified by its `orderId`. It provides information such as the order status (e.g., pending, completed, shipped), the items within the order, billing and shipping details, payment information, and the order\'s total amount. This query is commonly used by systems managing order processing, customer service, or order tracking functionalities.\n\nThis query can be applied in e-commerce systems, marketplaces, or any platform where users and systems need real-time order data for tracking, auditing, or managing customer purchases.\n\n<NodeGraph />\n\n<SchemaViewer file="schema.json" title="JSON Schema" maxHeight="500" />',
            filePath:
              '../examples/default/domains/E-Commerce/subdomains/Orders/services/OrdersService/queries/GetOrder/index.mdx',
            digest: '71f186bfcba04dad',
            deferredRender: true,
            collection: 'queries',
          },
        },
      },
      {
        label: 'accepts',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'PlaceOrder-0.0.1-OrdersService-0.0.3',
        source: 'PlaceOrder-0.0.1',
        target: 'OrdersService-0.0.3',
        data: {
          message: {
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
        },
      },
      {
        label: 'receives event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'UserSubscriptionCancelled-0.0.1-OrdersService-0.0.3',
        source: 'UserSubscriptionCancelled-0.0.1',
        target: 'OrdersService-0.0.3',
        data: {
          message: {
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
        },
      },
      {
        label: '',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'OrdersService-0.0.3-orders.{env}.events-1.0.1-OrderAmended-0.0.1',
        source: 'OrdersService-0.0.3',
        target: 'OrdersService-0.0.3-orders.{env}.events-1.0.1-OrderAmended-0.0.1',
        data: {
          message: {
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
          source: {
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
          channel: {
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
              summary: 'Central event stream for all order-related events in the order processing lifecycle\n',
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
            body: '### Overview\nThe Orders Events channel is the central stream for all order-related events across the order processing lifecycle. This includes order creation, updates, payment status, fulfillment status, and customer communications. All events related to a specific order are guaranteed to be processed in sequence when using orderId as the partition key.\n\n<ChannelInformation />\n\n### Publishing a message using Azure Service Bus\n\nHere is an example of how to publish an order event using Azure Service Bus:\n\n```python\nimport json\nfrom datetime import datetime\nfrom azure.servicebus import ServiceBusClient, ServiceBusMessage\n\n# --- Azure Service Bus Configuration ---\n# Replace with your actual connection string and queue/topic name\nCONNECTION_STR = "YOUR_AZURE_SERVICE_BUS_CONNECTION_STRING"\nQUEUE_NAME = "orders"  # Or your specific queue/topic name e.g., f"orders.{env}.events"\n\n# --- Example Order Event Data ---\n# This is the same event structure as before\norder_event_data = {\n    "eventType": "ORDER_CREATED",\n    "timestamp": datetime.utcnow().isoformat() + "Z", # ISO 8601 format with Z for UTC\n    "version": "1.0",\n    "payload": {\n        "orderId": "12345",\n        "customerId": "CUST-789",\n        "items": [\n            {\n                "productId": "PROD-456",\n                "quantity": 2,\n                "price": 29.99\n            }\n        ],\n        "totalAmount": 59.98,\n        "shippingAddress": {\n            "street": "123 Main St",\n            "city": "Springfield",\n            "country": "US"\n        }\n    },\n    "metadata": {\n        "source": "web_checkout",\n        "correlationId": "abc-xyz-123"\n        # Potentially add a message ID if not automatically handled or for specific tracking\n        # "messageId": str(uuid.uuid4()) # Requires import uuid\n    }\n}\n\ndef send_order_event_to_service_bus(connection_string, queue_name, event_data):\n    # Create a ServiceBusClient object\n    with ServiceBusClient.from_connection_string(conn_str=connection_string) as servicebus_client:\n        # Create a sender for the queue\n        # For a topic, use: servicebus_client.get_topic_sender(topic_name=queue_name)\n        sender = servicebus_client.get_queue_sender(queue_name=queue_name)\n        with sender:\n            # Serialize the event data to a JSON string\n            event_json = json.dumps(event_data)\n            # Create a ServiceBusMessage object\n            message = ServiceBusMessage(event_json)\n            \n            # Set properties if needed, e.g., message_id or correlation_id\n            # message.message_id = event_data["metadata"].get("messageId")\n            message.correlation_id = event_data["metadata"]["correlationId"]\n            \n            # Send the message\n            sender.send_messages(message)\n            print(f"Sent order event (ID: {event_data[\'payload\'][\'orderId\']}) to Azure Service Bus queue: {queue_name}")\n\nif __name__ == "__main__":\n    # Example of how to call the function\n    # Ensure azure-servicebus package is installed: pip install azure-servicebus\n    \n    # Basic error handling for placeholders\n    if CONNECTION_STR == "YOUR_AZURE_SERVICE_BUS_CONNECTION_STRING" or QUEUE_NAME == "YOUR_QUEUE_NAME":\n        print("Please update CONNECTION_STR and QUEUE_NAME with your actual Azure Service Bus details.")\n    else:\n        try:\n            send_order_event_to_service_bus(CONNECTION_STR, QUEUE_NAME, order_event_data)\n        except Exception as e:\n            print(f"An error occurred: {e}")\n            print("Ensure your Azure Service Bus connection string and queue name are correct,")\n            print("and the \'azure-servicebus\' package is installed (\'pip install azure-servicebus\').")',
            filePath: '../examples/default/channels/orders.{env}.events/index.mdx',
            digest: 'c2c6119dcd57051c',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: 'publishes event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'orders.{env}.events-1.0.1-OrderAmended-0.0.1-OrdersService-0.0.3',
        source: 'OrdersService-0.0.3-orders.{env}.events-1.0.1-OrderAmended-0.0.1',
        target: 'OrderAmended-0.0.1',
        data: {
          message: {
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
          source: {
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
          channel: {
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
              summary: 'Central event stream for all order-related events in the order processing lifecycle\n',
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
            body: '### Overview\nThe Orders Events channel is the central stream for all order-related events across the order processing lifecycle. This includes order creation, updates, payment status, fulfillment status, and customer communications. All events related to a specific order are guaranteed to be processed in sequence when using orderId as the partition key.\n\n<ChannelInformation />\n\n### Publishing a message using Azure Service Bus\n\nHere is an example of how to publish an order event using Azure Service Bus:\n\n```python\nimport json\nfrom datetime import datetime\nfrom azure.servicebus import ServiceBusClient, ServiceBusMessage\n\n# --- Azure Service Bus Configuration ---\n# Replace with your actual connection string and queue/topic name\nCONNECTION_STR = "YOUR_AZURE_SERVICE_BUS_CONNECTION_STRING"\nQUEUE_NAME = "orders"  # Or your specific queue/topic name e.g., f"orders.{env}.events"\n\n# --- Example Order Event Data ---\n# This is the same event structure as before\norder_event_data = {\n    "eventType": "ORDER_CREATED",\n    "timestamp": datetime.utcnow().isoformat() + "Z", # ISO 8601 format with Z for UTC\n    "version": "1.0",\n    "payload": {\n        "orderId": "12345",\n        "customerId": "CUST-789",\n        "items": [\n            {\n                "productId": "PROD-456",\n                "quantity": 2,\n                "price": 29.99\n            }\n        ],\n        "totalAmount": 59.98,\n        "shippingAddress": {\n            "street": "123 Main St",\n            "city": "Springfield",\n            "country": "US"\n        }\n    },\n    "metadata": {\n        "source": "web_checkout",\n        "correlationId": "abc-xyz-123"\n        # Potentially add a message ID if not automatically handled or for specific tracking\n        # "messageId": str(uuid.uuid4()) # Requires import uuid\n    }\n}\n\ndef send_order_event_to_service_bus(connection_string, queue_name, event_data):\n    # Create a ServiceBusClient object\n    with ServiceBusClient.from_connection_string(conn_str=connection_string) as servicebus_client:\n        # Create a sender for the queue\n        # For a topic, use: servicebus_client.get_topic_sender(topic_name=queue_name)\n        sender = servicebus_client.get_queue_sender(queue_name=queue_name)\n        with sender:\n            # Serialize the event data to a JSON string\n            event_json = json.dumps(event_data)\n            # Create a ServiceBusMessage object\n            message = ServiceBusMessage(event_json)\n            \n            # Set properties if needed, e.g., message_id or correlation_id\n            # message.message_id = event_data["metadata"].get("messageId")\n            message.correlation_id = event_data["metadata"]["correlationId"]\n            \n            # Send the message\n            sender.send_messages(message)\n            print(f"Sent order event (ID: {event_data[\'payload\'][\'orderId\']}) to Azure Service Bus queue: {queue_name}")\n\nif __name__ == "__main__":\n    # Example of how to call the function\n    # Ensure azure-servicebus package is installed: pip install azure-servicebus\n    \n    # Basic error handling for placeholders\n    if CONNECTION_STR == "YOUR_AZURE_SERVICE_BUS_CONNECTION_STRING" or QUEUE_NAME == "YOUR_QUEUE_NAME":\n        print("Please update CONNECTION_STR and QUEUE_NAME with your actual Azure Service Bus details.")\n    else:\n        try:\n            send_order_event_to_service_bus(CONNECTION_STR, QUEUE_NAME, order_event_data)\n        except Exception as e:\n            print(f"An error occurred: {e}")\n            print("Ensure your Azure Service Bus connection string and queue name are correct,")\n            print("and the \'azure-servicebus\' package is installed (\'pip install azure-servicebus\').")',
            filePath: '../examples/default/channels/orders.{env}.events/index.mdx',
            digest: 'c2c6119dcd57051c',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: '',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'OrdersService-0.0.3-orders.{env}.events-1.0.1-OrderCancelled-0.0.1',
        source: 'OrdersService-0.0.3',
        target: 'OrdersService-0.0.3-orders.{env}.events-1.0.1-OrderCancelled-0.0.1',
        data: {
          message: {
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
          source: {
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
          channel: {
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
              summary: 'Central event stream for all order-related events in the order processing lifecycle\n',
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
            body: '### Overview\nThe Orders Events channel is the central stream for all order-related events across the order processing lifecycle. This includes order creation, updates, payment status, fulfillment status, and customer communications. All events related to a specific order are guaranteed to be processed in sequence when using orderId as the partition key.\n\n<ChannelInformation />\n\n### Publishing a message using Azure Service Bus\n\nHere is an example of how to publish an order event using Azure Service Bus:\n\n```python\nimport json\nfrom datetime import datetime\nfrom azure.servicebus import ServiceBusClient, ServiceBusMessage\n\n# --- Azure Service Bus Configuration ---\n# Replace with your actual connection string and queue/topic name\nCONNECTION_STR = "YOUR_AZURE_SERVICE_BUS_CONNECTION_STRING"\nQUEUE_NAME = "orders"  # Or your specific queue/topic name e.g., f"orders.{env}.events"\n\n# --- Example Order Event Data ---\n# This is the same event structure as before\norder_event_data = {\n    "eventType": "ORDER_CREATED",\n    "timestamp": datetime.utcnow().isoformat() + "Z", # ISO 8601 format with Z for UTC\n    "version": "1.0",\n    "payload": {\n        "orderId": "12345",\n        "customerId": "CUST-789",\n        "items": [\n            {\n                "productId": "PROD-456",\n                "quantity": 2,\n                "price": 29.99\n            }\n        ],\n        "totalAmount": 59.98,\n        "shippingAddress": {\n            "street": "123 Main St",\n            "city": "Springfield",\n            "country": "US"\n        }\n    },\n    "metadata": {\n        "source": "web_checkout",\n        "correlationId": "abc-xyz-123"\n        # Potentially add a message ID if not automatically handled or for specific tracking\n        # "messageId": str(uuid.uuid4()) # Requires import uuid\n    }\n}\n\ndef send_order_event_to_service_bus(connection_string, queue_name, event_data):\n    # Create a ServiceBusClient object\n    with ServiceBusClient.from_connection_string(conn_str=connection_string) as servicebus_client:\n        # Create a sender for the queue\n        # For a topic, use: servicebus_client.get_topic_sender(topic_name=queue_name)\n        sender = servicebus_client.get_queue_sender(queue_name=queue_name)\n        with sender:\n            # Serialize the event data to a JSON string\n            event_json = json.dumps(event_data)\n            # Create a ServiceBusMessage object\n            message = ServiceBusMessage(event_json)\n            \n            # Set properties if needed, e.g., message_id or correlation_id\n            # message.message_id = event_data["metadata"].get("messageId")\n            message.correlation_id = event_data["metadata"]["correlationId"]\n            \n            # Send the message\n            sender.send_messages(message)\n            print(f"Sent order event (ID: {event_data[\'payload\'][\'orderId\']}) to Azure Service Bus queue: {queue_name}")\n\nif __name__ == "__main__":\n    # Example of how to call the function\n    # Ensure azure-servicebus package is installed: pip install azure-servicebus\n    \n    # Basic error handling for placeholders\n    if CONNECTION_STR == "YOUR_AZURE_SERVICE_BUS_CONNECTION_STRING" or QUEUE_NAME == "YOUR_QUEUE_NAME":\n        print("Please update CONNECTION_STR and QUEUE_NAME with your actual Azure Service Bus details.")\n    else:\n        try:\n            send_order_event_to_service_bus(CONNECTION_STR, QUEUE_NAME, order_event_data)\n        except Exception as e:\n            print(f"An error occurred: {e}")\n            print("Ensure your Azure Service Bus connection string and queue name are correct,")\n            print("and the \'azure-servicebus\' package is installed (\'pip install azure-servicebus\').")',
            filePath: '../examples/default/channels/orders.{env}.events/index.mdx',
            digest: 'c2c6119dcd57051c',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: 'publishes event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'orders.{env}.events-1.0.1-OrderCancelled-0.0.1-OrdersService-0.0.3',
        source: 'OrdersService-0.0.3-orders.{env}.events-1.0.1-OrderCancelled-0.0.1',
        target: 'OrderCancelled-0.0.1',
        data: {
          message: {
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
          source: {
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
          channel: {
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
              summary: 'Central event stream for all order-related events in the order processing lifecycle\n',
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
            body: '### Overview\nThe Orders Events channel is the central stream for all order-related events across the order processing lifecycle. This includes order creation, updates, payment status, fulfillment status, and customer communications. All events related to a specific order are guaranteed to be processed in sequence when using orderId as the partition key.\n\n<ChannelInformation />\n\n### Publishing a message using Azure Service Bus\n\nHere is an example of how to publish an order event using Azure Service Bus:\n\n```python\nimport json\nfrom datetime import datetime\nfrom azure.servicebus import ServiceBusClient, ServiceBusMessage\n\n# --- Azure Service Bus Configuration ---\n# Replace with your actual connection string and queue/topic name\nCONNECTION_STR = "YOUR_AZURE_SERVICE_BUS_CONNECTION_STRING"\nQUEUE_NAME = "orders"  # Or your specific queue/topic name e.g., f"orders.{env}.events"\n\n# --- Example Order Event Data ---\n# This is the same event structure as before\norder_event_data = {\n    "eventType": "ORDER_CREATED",\n    "timestamp": datetime.utcnow().isoformat() + "Z", # ISO 8601 format with Z for UTC\n    "version": "1.0",\n    "payload": {\n        "orderId": "12345",\n        "customerId": "CUST-789",\n        "items": [\n            {\n                "productId": "PROD-456",\n                "quantity": 2,\n                "price": 29.99\n            }\n        ],\n        "totalAmount": 59.98,\n        "shippingAddress": {\n            "street": "123 Main St",\n            "city": "Springfield",\n            "country": "US"\n        }\n    },\n    "metadata": {\n        "source": "web_checkout",\n        "correlationId": "abc-xyz-123"\n        # Potentially add a message ID if not automatically handled or for specific tracking\n        # "messageId": str(uuid.uuid4()) # Requires import uuid\n    }\n}\n\ndef send_order_event_to_service_bus(connection_string, queue_name, event_data):\n    # Create a ServiceBusClient object\n    with ServiceBusClient.from_connection_string(conn_str=connection_string) as servicebus_client:\n        # Create a sender for the queue\n        # For a topic, use: servicebus_client.get_topic_sender(topic_name=queue_name)\n        sender = servicebus_client.get_queue_sender(queue_name=queue_name)\n        with sender:\n            # Serialize the event data to a JSON string\n            event_json = json.dumps(event_data)\n            # Create a ServiceBusMessage object\n            message = ServiceBusMessage(event_json)\n            \n            # Set properties if needed, e.g., message_id or correlation_id\n            # message.message_id = event_data["metadata"].get("messageId")\n            message.correlation_id = event_data["metadata"]["correlationId"]\n            \n            # Send the message\n            sender.send_messages(message)\n            print(f"Sent order event (ID: {event_data[\'payload\'][\'orderId\']}) to Azure Service Bus queue: {queue_name}")\n\nif __name__ == "__main__":\n    # Example of how to call the function\n    # Ensure azure-servicebus package is installed: pip install azure-servicebus\n    \n    # Basic error handling for placeholders\n    if CONNECTION_STR == "YOUR_AZURE_SERVICE_BUS_CONNECTION_STRING" or QUEUE_NAME == "YOUR_QUEUE_NAME":\n        print("Please update CONNECTION_STR and QUEUE_NAME with your actual Azure Service Bus details.")\n    else:\n        try:\n            send_order_event_to_service_bus(CONNECTION_STR, QUEUE_NAME, order_event_data)\n        except Exception as e:\n            print(f"An error occurred: {e}")\n            print("Ensure your Azure Service Bus connection string and queue name are correct,")\n            print("and the \'azure-servicebus\' package is installed (\'pip install azure-servicebus\').")',
            filePath: '../examples/default/channels/orders.{env}.events/index.mdx',
            digest: 'c2c6119dcd57051c',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: '',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'OrdersService-0.0.3-orders.{env}.events-1.0.1-OrderConfirmed-0.0.1',
        source: 'OrdersService-0.0.3',
        target: 'OrdersService-0.0.3-orders.{env}.events-1.0.1-OrderConfirmed-0.0.1',
        data: {
          message: {
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
          source: {
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
          channel: {
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
              summary: 'Central event stream for all order-related events in the order processing lifecycle\n',
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
            body: '### Overview\nThe Orders Events channel is the central stream for all order-related events across the order processing lifecycle. This includes order creation, updates, payment status, fulfillment status, and customer communications. All events related to a specific order are guaranteed to be processed in sequence when using orderId as the partition key.\n\n<ChannelInformation />\n\n### Publishing a message using Azure Service Bus\n\nHere is an example of how to publish an order event using Azure Service Bus:\n\n```python\nimport json\nfrom datetime import datetime\nfrom azure.servicebus import ServiceBusClient, ServiceBusMessage\n\n# --- Azure Service Bus Configuration ---\n# Replace with your actual connection string and queue/topic name\nCONNECTION_STR = "YOUR_AZURE_SERVICE_BUS_CONNECTION_STRING"\nQUEUE_NAME = "orders"  # Or your specific queue/topic name e.g., f"orders.{env}.events"\n\n# --- Example Order Event Data ---\n# This is the same event structure as before\norder_event_data = {\n    "eventType": "ORDER_CREATED",\n    "timestamp": datetime.utcnow().isoformat() + "Z", # ISO 8601 format with Z for UTC\n    "version": "1.0",\n    "payload": {\n        "orderId": "12345",\n        "customerId": "CUST-789",\n        "items": [\n            {\n                "productId": "PROD-456",\n                "quantity": 2,\n                "price": 29.99\n            }\n        ],\n        "totalAmount": 59.98,\n        "shippingAddress": {\n            "street": "123 Main St",\n            "city": "Springfield",\n            "country": "US"\n        }\n    },\n    "metadata": {\n        "source": "web_checkout",\n        "correlationId": "abc-xyz-123"\n        # Potentially add a message ID if not automatically handled or for specific tracking\n        # "messageId": str(uuid.uuid4()) # Requires import uuid\n    }\n}\n\ndef send_order_event_to_service_bus(connection_string, queue_name, event_data):\n    # Create a ServiceBusClient object\n    with ServiceBusClient.from_connection_string(conn_str=connection_string) as servicebus_client:\n        # Create a sender for the queue\n        # For a topic, use: servicebus_client.get_topic_sender(topic_name=queue_name)\n        sender = servicebus_client.get_queue_sender(queue_name=queue_name)\n        with sender:\n            # Serialize the event data to a JSON string\n            event_json = json.dumps(event_data)\n            # Create a ServiceBusMessage object\n            message = ServiceBusMessage(event_json)\n            \n            # Set properties if needed, e.g., message_id or correlation_id\n            # message.message_id = event_data["metadata"].get("messageId")\n            message.correlation_id = event_data["metadata"]["correlationId"]\n            \n            # Send the message\n            sender.send_messages(message)\n            print(f"Sent order event (ID: {event_data[\'payload\'][\'orderId\']}) to Azure Service Bus queue: {queue_name}")\n\nif __name__ == "__main__":\n    # Example of how to call the function\n    # Ensure azure-servicebus package is installed: pip install azure-servicebus\n    \n    # Basic error handling for placeholders\n    if CONNECTION_STR == "YOUR_AZURE_SERVICE_BUS_CONNECTION_STRING" or QUEUE_NAME == "YOUR_QUEUE_NAME":\n        print("Please update CONNECTION_STR and QUEUE_NAME with your actual Azure Service Bus details.")\n    else:\n        try:\n            send_order_event_to_service_bus(CONNECTION_STR, QUEUE_NAME, order_event_data)\n        except Exception as e:\n            print(f"An error occurred: {e}")\n            print("Ensure your Azure Service Bus connection string and queue name are correct,")\n            print("and the \'azure-servicebus\' package is installed (\'pip install azure-servicebus\').")',
            filePath: '../examples/default/channels/orders.{env}.events/index.mdx',
            digest: 'c2c6119dcd57051c',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: 'publishes event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'orders.{env}.events-1.0.1-OrderConfirmed-0.0.1-OrdersService-0.0.3',
        source: 'OrdersService-0.0.3-orders.{env}.events-1.0.1-OrderConfirmed-0.0.1',
        target: 'OrderConfirmed-0.0.1',
        data: {
          message: {
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
          source: {
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
          channel: {
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
              summary: 'Central event stream for all order-related events in the order processing lifecycle\n',
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
            body: '### Overview\nThe Orders Events channel is the central stream for all order-related events across the order processing lifecycle. This includes order creation, updates, payment status, fulfillment status, and customer communications. All events related to a specific order are guaranteed to be processed in sequence when using orderId as the partition key.\n\n<ChannelInformation />\n\n### Publishing a message using Azure Service Bus\n\nHere is an example of how to publish an order event using Azure Service Bus:\n\n```python\nimport json\nfrom datetime import datetime\nfrom azure.servicebus import ServiceBusClient, ServiceBusMessage\n\n# --- Azure Service Bus Configuration ---\n# Replace with your actual connection string and queue/topic name\nCONNECTION_STR = "YOUR_AZURE_SERVICE_BUS_CONNECTION_STRING"\nQUEUE_NAME = "orders"  # Or your specific queue/topic name e.g., f"orders.{env}.events"\n\n# --- Example Order Event Data ---\n# This is the same event structure as before\norder_event_data = {\n    "eventType": "ORDER_CREATED",\n    "timestamp": datetime.utcnow().isoformat() + "Z", # ISO 8601 format with Z for UTC\n    "version": "1.0",\n    "payload": {\n        "orderId": "12345",\n        "customerId": "CUST-789",\n        "items": [\n            {\n                "productId": "PROD-456",\n                "quantity": 2,\n                "price": 29.99\n            }\n        ],\n        "totalAmount": 59.98,\n        "shippingAddress": {\n            "street": "123 Main St",\n            "city": "Springfield",\n            "country": "US"\n        }\n    },\n    "metadata": {\n        "source": "web_checkout",\n        "correlationId": "abc-xyz-123"\n        # Potentially add a message ID if not automatically handled or for specific tracking\n        # "messageId": str(uuid.uuid4()) # Requires import uuid\n    }\n}\n\ndef send_order_event_to_service_bus(connection_string, queue_name, event_data):\n    # Create a ServiceBusClient object\n    with ServiceBusClient.from_connection_string(conn_str=connection_string) as servicebus_client:\n        # Create a sender for the queue\n        # For a topic, use: servicebus_client.get_topic_sender(topic_name=queue_name)\n        sender = servicebus_client.get_queue_sender(queue_name=queue_name)\n        with sender:\n            # Serialize the event data to a JSON string\n            event_json = json.dumps(event_data)\n            # Create a ServiceBusMessage object\n            message = ServiceBusMessage(event_json)\n            \n            # Set properties if needed, e.g., message_id or correlation_id\n            # message.message_id = event_data["metadata"].get("messageId")\n            message.correlation_id = event_data["metadata"]["correlationId"]\n            \n            # Send the message\n            sender.send_messages(message)\n            print(f"Sent order event (ID: {event_data[\'payload\'][\'orderId\']}) to Azure Service Bus queue: {queue_name}")\n\nif __name__ == "__main__":\n    # Example of how to call the function\n    # Ensure azure-servicebus package is installed: pip install azure-servicebus\n    \n    # Basic error handling for placeholders\n    if CONNECTION_STR == "YOUR_AZURE_SERVICE_BUS_CONNECTION_STRING" or QUEUE_NAME == "YOUR_QUEUE_NAME":\n        print("Please update CONNECTION_STR and QUEUE_NAME with your actual Azure Service Bus details.")\n    else:\n        try:\n            send_order_event_to_service_bus(CONNECTION_STR, QUEUE_NAME, order_event_data)\n        except Exception as e:\n            print(f"An error occurred: {e}")\n            print("Ensure your Azure Service Bus connection string and queue name are correct,")\n            print("and the \'azure-servicebus\' package is installed (\'pip install azure-servicebus\').")',
            filePath: '../examples/default/channels/orders.{env}.events/index.mdx',
            digest: 'c2c6119dcd57051c',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: '',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'OrdersService-0.0.3-inventory.{env}.events-1.0.0-AddInventory-0.0.3',
        source: 'OrdersService-0.0.3',
        target: 'OrdersService-0.0.3-inventory.{env}.events-1.0.0-AddInventory-0.0.3',
        data: {
          message: {
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
          source: {
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
          channel: {
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
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Inventory Events channel is the central stream for all inventory-related events across the system. This includes stock level changes, inventory allocations, adjustments, and stocktake events. Events for a specific SKU are guaranteed to be processed in sequence when using productId as the partition key.\n\n<ChannelInformation />\n\n### Publishing and Subscribing to Events\n\n#### Publishing Example\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'inventory.{env}.events\'\n\n# Create a Kafka producer\nproducer = KafkaProducer(\n    bootstrap_servers=bootstrap_servers,\n    value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example inventory update event\ninventory_event = {\n    "eventType": "STOCK_LEVEL_CHANGED",\n    "timestamp": datetime.utcnow().isoformat(),\n    "version": "1.0",\n    "payload": {\n        "productId": "PROD-456",\n        "locationId": "WH-123",\n        "previousQuantity": 100,\n        "newQuantity": 95,\n        "changeReason": "ORDER_FULFILLED",\n        "unitOfMeasure": "EACH",\n        "batchInfo": {\n            "batchId": "BATCH-789",\n            "expiryDate": "2025-12-31"\n        }\n    },\n    "metadata": {\n        "source": "warehouse_system",\n        "correlationId": "inv-xyz-123",\n        "userId": "john.doe"\n    }\n}\n\n# Send the message - using productId as key for partitioning\nproducer.send(\n    topic, \n    key=inventory_event[\'payload\'][\'productId\'].encode(\'utf-8\'),\n    value=inventory_event\n)\nproducer.flush()\n\nprint(f"Inventory event sent to topic {topic}")\n\n```\n\n### Subscription example\n\n```python\nfrom kafka import KafkaConsumer\nimport json\nfrom datetime import datetime\n\nclass InventoryEventConsumer:\n    def __init__(self):\n        # Kafka configuration\n        self.topic = f\'inventory.{env}.events\'\n        self.consumer = KafkaConsumer(\n            self.topic,\n            bootstrap_servers=[\'localhost:9092\'],\n            group_id=\'inventory-processor-group\',\n            auto_offset_reset=\'earliest\',\n            enable_auto_commit=False,\n            value_deserializer=lambda x: json.loads(x.decode(\'utf-8\')),\n            key_deserializer=lambda x: x.decode(\'utf-8\') if x else None\n        )\n\n    def process_event(self, event):\n        """Process individual inventory events based on type"""\n        event_type = event.get(\'eventType\')\n        \n        if event_type == \'STOCK_LEVEL_CHANGED\':\n            self.handle_stock_level_change(event)\n        elif event_type == \'LOW_STOCK_ALERT\':\n            self.handle_low_stock_alert(event)\n        # Add more event type handlers as needed\n\n    def handle_stock_level_change(self, event):\n        """Handle stock level change events"""\n        payload = event[\'payload\']\n        print(f"Stock level change detected for product {payload[\'productId\']}")\n        print(f"New quantity: {payload[\'newQuantity\']}")\n        # Add your business logic here\n\n    def handle_low_stock_alert(self, event):\n        """Handle low stock alert events"""\n        payload = event[\'payload\']\n        print(f"Low stock alert for product {payload[\'productId\']}")\n        print(f"Current quantity: {payload[\'currentQuantity\']}")\n        # Add your business logic here\n\n    def start_consuming(self):\n        """Start consuming messages from the topic"""\n        try:\n            print(f"Starting consumption from topic: {self.topic}")\n            for message in self.consumer:\n                try:\n                    # Process the message\n                    event = message.value\n                    print(f"Received event: {event[\'eventType\']} for product: {event[\'payload\'][\'productId\']}")\n                    \n                    # Process the event\n                    self.process_event(event)\n                    \n                    # Commit the offset after successful processing\n                    self.consumer.commit()\n                    \n                except Exception as e:\n                    print(f"Error processing message: {str(e)}")\n                    # Implement your error handling logic here\n                    # You might want to send to a DLQ (Dead Letter Queue)\n        \n        except Exception as e:\n            print(f"Consumer error: {str(e)}")\n        finally:\n            # Clean up\n            self.consumer.close()\n\nif __name__ == "__main__":\n    # Create and start the consumer\n    consumer = InventoryEventConsumer()\n    consumer.start_consuming()\n  ```',
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: 'invokes command',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'inventory.{env}.events-1.0.0-AddInventory-0.0.3-OrdersService-0.0.3',
        source: 'OrdersService-0.0.3-inventory.{env}.events-1.0.0-AddInventory-0.0.3',
        target: 'AddInventory-0.0.3',
        data: {
          message: {
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
          source: {
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
          channel: {
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
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Inventory Events channel is the central stream for all inventory-related events across the system. This includes stock level changes, inventory allocations, adjustments, and stocktake events. Events for a specific SKU are guaranteed to be processed in sequence when using productId as the partition key.\n\n<ChannelInformation />\n\n### Publishing and Subscribing to Events\n\n#### Publishing Example\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'inventory.{env}.events\'\n\n# Create a Kafka producer\nproducer = KafkaProducer(\n    bootstrap_servers=bootstrap_servers,\n    value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example inventory update event\ninventory_event = {\n    "eventType": "STOCK_LEVEL_CHANGED",\n    "timestamp": datetime.utcnow().isoformat(),\n    "version": "1.0",\n    "payload": {\n        "productId": "PROD-456",\n        "locationId": "WH-123",\n        "previousQuantity": 100,\n        "newQuantity": 95,\n        "changeReason": "ORDER_FULFILLED",\n        "unitOfMeasure": "EACH",\n        "batchInfo": {\n            "batchId": "BATCH-789",\n            "expiryDate": "2025-12-31"\n        }\n    },\n    "metadata": {\n        "source": "warehouse_system",\n        "correlationId": "inv-xyz-123",\n        "userId": "john.doe"\n    }\n}\n\n# Send the message - using productId as key for partitioning\nproducer.send(\n    topic, \n    key=inventory_event[\'payload\'][\'productId\'].encode(\'utf-8\'),\n    value=inventory_event\n)\nproducer.flush()\n\nprint(f"Inventory event sent to topic {topic}")\n\n```\n\n### Subscription example\n\n```python\nfrom kafka import KafkaConsumer\nimport json\nfrom datetime import datetime\n\nclass InventoryEventConsumer:\n    def __init__(self):\n        # Kafka configuration\n        self.topic = f\'inventory.{env}.events\'\n        self.consumer = KafkaConsumer(\n            self.topic,\n            bootstrap_servers=[\'localhost:9092\'],\n            group_id=\'inventory-processor-group\',\n            auto_offset_reset=\'earliest\',\n            enable_auto_commit=False,\n            value_deserializer=lambda x: json.loads(x.decode(\'utf-8\')),\n            key_deserializer=lambda x: x.decode(\'utf-8\') if x else None\n        )\n\n    def process_event(self, event):\n        """Process individual inventory events based on type"""\n        event_type = event.get(\'eventType\')\n        \n        if event_type == \'STOCK_LEVEL_CHANGED\':\n            self.handle_stock_level_change(event)\n        elif event_type == \'LOW_STOCK_ALERT\':\n            self.handle_low_stock_alert(event)\n        # Add more event type handlers as needed\n\n    def handle_stock_level_change(self, event):\n        """Handle stock level change events"""\n        payload = event[\'payload\']\n        print(f"Stock level change detected for product {payload[\'productId\']}")\n        print(f"New quantity: {payload[\'newQuantity\']}")\n        # Add your business logic here\n\n    def handle_low_stock_alert(self, event):\n        """Handle low stock alert events"""\n        payload = event[\'payload\']\n        print(f"Low stock alert for product {payload[\'productId\']}")\n        print(f"Current quantity: {payload[\'currentQuantity\']}")\n        # Add your business logic here\n\n    def start_consuming(self):\n        """Start consuming messages from the topic"""\n        try:\n            print(f"Starting consumption from topic: {self.topic}")\n            for message in self.consumer:\n                try:\n                    # Process the message\n                    event = message.value\n                    print(f"Received event: {event[\'eventType\']} for product: {event[\'payload\'][\'productId\']}")\n                    \n                    # Process the event\n                    self.process_event(event)\n                    \n                    # Commit the offset after successful processing\n                    self.consumer.commit()\n                    \n                except Exception as e:\n                    print(f"Error processing message: {str(e)}")\n                    # Implement your error handling logic here\n                    # You might want to send to a DLQ (Dead Letter Queue)\n        \n        except Exception as e:\n            print(f"Consumer error: {str(e)}")\n        finally:\n            # Clean up\n            self.consumer.close()\n\nif __name__ == "__main__":\n    # Create and start the consumer\n    consumer = InventoryEventConsumer()\n    consumer.start_consuming()\n  ```',
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: '',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'InventoryAdjusted-1.0.1-inventory.{env}.events-1.0.0-NotificationService-0.0.2',
        source: 'InventoryAdjusted-1.0.1',
        target: 'InventoryAdjusted-1.0.1-inventory.{env}.events-1.0.0-NotificationService-0.0.2',
        data: {
          message: {
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
          source: {
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
          channel: {
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
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Inventory Events channel is the central stream for all inventory-related events across the system. This includes stock level changes, inventory allocations, adjustments, and stocktake events. Events for a specific SKU are guaranteed to be processed in sequence when using productId as the partition key.\n\n<ChannelInformation />\n\n### Publishing and Subscribing to Events\n\n#### Publishing Example\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'inventory.{env}.events\'\n\n# Create a Kafka producer\nproducer = KafkaProducer(\n    bootstrap_servers=bootstrap_servers,\n    value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example inventory update event\ninventory_event = {\n    "eventType": "STOCK_LEVEL_CHANGED",\n    "timestamp": datetime.utcnow().isoformat(),\n    "version": "1.0",\n    "payload": {\n        "productId": "PROD-456",\n        "locationId": "WH-123",\n        "previousQuantity": 100,\n        "newQuantity": 95,\n        "changeReason": "ORDER_FULFILLED",\n        "unitOfMeasure": "EACH",\n        "batchInfo": {\n            "batchId": "BATCH-789",\n            "expiryDate": "2025-12-31"\n        }\n    },\n    "metadata": {\n        "source": "warehouse_system",\n        "correlationId": "inv-xyz-123",\n        "userId": "john.doe"\n    }\n}\n\n# Send the message - using productId as key for partitioning\nproducer.send(\n    topic, \n    key=inventory_event[\'payload\'][\'productId\'].encode(\'utf-8\'),\n    value=inventory_event\n)\nproducer.flush()\n\nprint(f"Inventory event sent to topic {topic}")\n\n```\n\n### Subscription example\n\n```python\nfrom kafka import KafkaConsumer\nimport json\nfrom datetime import datetime\n\nclass InventoryEventConsumer:\n    def __init__(self):\n        # Kafka configuration\n        self.topic = f\'inventory.{env}.events\'\n        self.consumer = KafkaConsumer(\n            self.topic,\n            bootstrap_servers=[\'localhost:9092\'],\n            group_id=\'inventory-processor-group\',\n            auto_offset_reset=\'earliest\',\n            enable_auto_commit=False,\n            value_deserializer=lambda x: json.loads(x.decode(\'utf-8\')),\n            key_deserializer=lambda x: x.decode(\'utf-8\') if x else None\n        )\n\n    def process_event(self, event):\n        """Process individual inventory events based on type"""\n        event_type = event.get(\'eventType\')\n        \n        if event_type == \'STOCK_LEVEL_CHANGED\':\n            self.handle_stock_level_change(event)\n        elif event_type == \'LOW_STOCK_ALERT\':\n            self.handle_low_stock_alert(event)\n        # Add more event type handlers as needed\n\n    def handle_stock_level_change(self, event):\n        """Handle stock level change events"""\n        payload = event[\'payload\']\n        print(f"Stock level change detected for product {payload[\'productId\']}")\n        print(f"New quantity: {payload[\'newQuantity\']}")\n        # Add your business logic here\n\n    def handle_low_stock_alert(self, event):\n        """Handle low stock alert events"""\n        payload = event[\'payload\']\n        print(f"Low stock alert for product {payload[\'productId\']}")\n        print(f"Current quantity: {payload[\'currentQuantity\']}")\n        # Add your business logic here\n\n    def start_consuming(self):\n        """Start consuming messages from the topic"""\n        try:\n            print(f"Starting consumption from topic: {self.topic}")\n            for message in self.consumer:\n                try:\n                    # Process the message\n                    event = message.value\n                    print(f"Received event: {event[\'eventType\']} for product: {event[\'payload\'][\'productId\']}")\n                    \n                    # Process the event\n                    self.process_event(event)\n                    \n                    # Commit the offset after successful processing\n                    self.consumer.commit()\n                    \n                except Exception as e:\n                    print(f"Error processing message: {str(e)}")\n                    # Implement your error handling logic here\n                    # You might want to send to a DLQ (Dead Letter Queue)\n        \n        except Exception as e:\n            print(f"Consumer error: {str(e)}")\n        finally:\n            # Clean up\n            self.consumer.close()\n\nif __name__ == "__main__":\n    # Create and start the consumer\n    consumer = InventoryEventConsumer()\n    consumer.start_consuming()\n  ```',
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: 'receives event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'inventory.{env}.events-1.0.0-NotificationService-0.0.2-InventoryAdjusted-1.0.1',
        source: 'InventoryAdjusted-1.0.1-inventory.{env}.events-1.0.0-NotificationService-0.0.2',
        target: 'NotificationService-0.0.2',
        data: {
          message: {
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
          source: {
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
          channel: {
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
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Inventory Events channel is the central stream for all inventory-related events across the system. This includes stock level changes, inventory allocations, adjustments, and stocktake events. Events for a specific SKU are guaranteed to be processed in sequence when using productId as the partition key.\n\n<ChannelInformation />\n\n### Publishing and Subscribing to Events\n\n#### Publishing Example\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'inventory.{env}.events\'\n\n# Create a Kafka producer\nproducer = KafkaProducer(\n    bootstrap_servers=bootstrap_servers,\n    value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example inventory update event\ninventory_event = {\n    "eventType": "STOCK_LEVEL_CHANGED",\n    "timestamp": datetime.utcnow().isoformat(),\n    "version": "1.0",\n    "payload": {\n        "productId": "PROD-456",\n        "locationId": "WH-123",\n        "previousQuantity": 100,\n        "newQuantity": 95,\n        "changeReason": "ORDER_FULFILLED",\n        "unitOfMeasure": "EACH",\n        "batchInfo": {\n            "batchId": "BATCH-789",\n            "expiryDate": "2025-12-31"\n        }\n    },\n    "metadata": {\n        "source": "warehouse_system",\n        "correlationId": "inv-xyz-123",\n        "userId": "john.doe"\n    }\n}\n\n# Send the message - using productId as key for partitioning\nproducer.send(\n    topic, \n    key=inventory_event[\'payload\'][\'productId\'].encode(\'utf-8\'),\n    value=inventory_event\n)\nproducer.flush()\n\nprint(f"Inventory event sent to topic {topic}")\n\n```\n\n### Subscription example\n\n```python\nfrom kafka import KafkaConsumer\nimport json\nfrom datetime import datetime\n\nclass InventoryEventConsumer:\n    def __init__(self):\n        # Kafka configuration\n        self.topic = f\'inventory.{env}.events\'\n        self.consumer = KafkaConsumer(\n            self.topic,\n            bootstrap_servers=[\'localhost:9092\'],\n            group_id=\'inventory-processor-group\',\n            auto_offset_reset=\'earliest\',\n            enable_auto_commit=False,\n            value_deserializer=lambda x: json.loads(x.decode(\'utf-8\')),\n            key_deserializer=lambda x: x.decode(\'utf-8\') if x else None\n        )\n\n    def process_event(self, event):\n        """Process individual inventory events based on type"""\n        event_type = event.get(\'eventType\')\n        \n        if event_type == \'STOCK_LEVEL_CHANGED\':\n            self.handle_stock_level_change(event)\n        elif event_type == \'LOW_STOCK_ALERT\':\n            self.handle_low_stock_alert(event)\n        # Add more event type handlers as needed\n\n    def handle_stock_level_change(self, event):\n        """Handle stock level change events"""\n        payload = event[\'payload\']\n        print(f"Stock level change detected for product {payload[\'productId\']}")\n        print(f"New quantity: {payload[\'newQuantity\']}")\n        # Add your business logic here\n\n    def handle_low_stock_alert(self, event):\n        """Handle low stock alert events"""\n        payload = event[\'payload\']\n        print(f"Low stock alert for product {payload[\'productId\']}")\n        print(f"Current quantity: {payload[\'currentQuantity\']}")\n        # Add your business logic here\n\n    def start_consuming(self):\n        """Start consuming messages from the topic"""\n        try:\n            print(f"Starting consumption from topic: {self.topic}")\n            for message in self.consumer:\n                try:\n                    # Process the message\n                    event = message.value\n                    print(f"Received event: {event[\'eventType\']} for product: {event[\'payload\'][\'productId\']}")\n                    \n                    # Process the event\n                    self.process_event(event)\n                    \n                    # Commit the offset after successful processing\n                    self.consumer.commit()\n                    \n                except Exception as e:\n                    print(f"Error processing message: {str(e)}")\n                    # Implement your error handling logic here\n                    # You might want to send to a DLQ (Dead Letter Queue)\n        \n        except Exception as e:\n            print(f"Consumer error: {str(e)}")\n        finally:\n            # Clean up\n            self.consumer.close()\n\nif __name__ == "__main__":\n    # Create and start the consumer\n    consumer = InventoryEventConsumer()\n    consumer.start_consuming()\n  ```',
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: '',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'PaymentProcessed-1.0.0-payments.{env}.events-1.0.0-NotificationService-0.0.2',
        source: 'PaymentProcessed-1.0.0',
        target: 'PaymentProcessed-1.0.0-payments.{env}.events-1.0.0-NotificationService-0.0.2',
        data: {
          message: {
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
          source: {
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
          channel: {
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
              summary: 'All events contain payment ID for traceability and ordered processing.\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Payments Events channel is the central stream for all payment lifecycle events. This includes payment initiation, authorization, capture, completion and failure scenarios. Events for a specific payment are guaranteed to be processed in sequence when using paymentId as the partition key.\n\n<ChannelInformation />\n\n### Publishing Events Using Kafka\n\nHere\'s an example of publishing a payment event:\n\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'payments.{env}.events\'\n\n# Create Kafka producer\nproducer = KafkaProducer(\n   bootstrap_servers=bootstrap_servers,\n   value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example payment processed event\npayment_event = {\n   "eventType": "PAYMENT_PROCESSED",\n   "timestamp": datetime.utcnow().isoformat(),\n   "version": "1.0",\n   "payload": {\n       "paymentId": "PAY-123-456", \n       "orderId": "ORD-789",\n       "amount": {\n           "value": 99.99,\n           "currency": "USD"\n       },\n       "status": "SUCCESS",\n       "paymentMethod": {\n           "type": "CREDIT_CARD",\n           "last4": "4242",\n           "expiryMonth": "12",\n           "expiryYear": "2025",\n           "network": "VISA"\n       },\n       "transactionDetails": {\n           "processorId": "stripe_123xyz",\n           "authorizationCode": "AUTH123",\n           "captureId": "CAP456"\n       }\n   },\n   "metadata": {\n       "correlationId": "corr-123-abc",\n       "merchantId": "MERCH-456", \n       "source": "payment_service",\n       "environment": "prod",\n       "idempotencyKey": "PAY-123-456-2024-11-11-99.99"\n   }\n}\n\n# Send message - using paymentId as key for partitioning\nproducer.send(\n   topic,\n   key=payment_event[\'payload\'][\'paymentId\'].encode(\'utf-8\'),\n   value=payment_event\n)\nproducer.flush()\n```',
            filePath: '../examples/default/channels/payment.{env}.events/index.mdx',
            digest: '261c4005551cac3f',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: 'receives event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'payments.{env}.events-1.0.0-NotificationService-0.0.2-PaymentProcessed-1.0.0',
        source: 'PaymentProcessed-1.0.0-payments.{env}.events-1.0.0-NotificationService-0.0.2',
        target: 'NotificationService-0.0.2',
        data: {
          message: {
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
          source: {
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
          channel: {
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
              summary: 'All events contain payment ID for traceability and ordered processing.\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Payments Events channel is the central stream for all payment lifecycle events. This includes payment initiation, authorization, capture, completion and failure scenarios. Events for a specific payment are guaranteed to be processed in sequence when using paymentId as the partition key.\n\n<ChannelInformation />\n\n### Publishing Events Using Kafka\n\nHere\'s an example of publishing a payment event:\n\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'payments.{env}.events\'\n\n# Create Kafka producer\nproducer = KafkaProducer(\n   bootstrap_servers=bootstrap_servers,\n   value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example payment processed event\npayment_event = {\n   "eventType": "PAYMENT_PROCESSED",\n   "timestamp": datetime.utcnow().isoformat(),\n   "version": "1.0",\n   "payload": {\n       "paymentId": "PAY-123-456", \n       "orderId": "ORD-789",\n       "amount": {\n           "value": 99.99,\n           "currency": "USD"\n       },\n       "status": "SUCCESS",\n       "paymentMethod": {\n           "type": "CREDIT_CARD",\n           "last4": "4242",\n           "expiryMonth": "12",\n           "expiryYear": "2025",\n           "network": "VISA"\n       },\n       "transactionDetails": {\n           "processorId": "stripe_123xyz",\n           "authorizationCode": "AUTH123",\n           "captureId": "CAP456"\n       }\n   },\n   "metadata": {\n       "correlationId": "corr-123-abc",\n       "merchantId": "MERCH-456", \n       "source": "payment_service",\n       "environment": "prod",\n       "idempotencyKey": "PAY-123-456-2024-11-11-99.99"\n   }\n}\n\n# Send message - using paymentId as key for partitioning\nproducer.send(\n   topic,\n   key=payment_event[\'payload\'][\'paymentId\'].encode(\'utf-8\'),\n   value=payment_event\n)\nproducer.flush()\n```',
            filePath: '../examples/default/channels/payment.{env}.events/index.mdx',
            digest: '261c4005551cac3f',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: 'accepts',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'GetUserNotifications-0.0.1-NotificationService-0.0.2',
        source: 'GetUserNotifications-0.0.1',
        target: 'NotificationService-0.0.2',
        data: {
          message: {
            id: 'GetUserNotifications-0.0.1',
            data: {
              id: 'GetUserNotifications',
              name: 'Get user notifications',
              summary:
                'GET request that will return a list of notifications for a specific user, with options to filter by status (unread or all).\n',
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
            body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe `GetUserNotifications` message is a query used to retrieve a list of notifications for a specific user. It allows filtering by notification status, such as unread or all notifications. This query is typically utilized by notification services to display user-specific messages, such as order updates, promotional offers, or system notifications. It supports pagination through `limit` and `offset` parameters, ensuring that only a manageable number of notifications are retrieved at once. This query helps users stay informed about important events or updates related to their account, orders, or the platform.\n\nUse cases include delivering notifications for order updates, promotional campaigns, or general system messages to keep the user informed.\n\n<NodeGraph />\n\n<SchemaViewer file="schema.json" title="JSON Schema" maxHeight="500" />',
            filePath:
              '../examples/default/domains/E-Commerce/subdomains/Orders/services/NotificationService/queries/GetUserNotifications/index.mdx',
            digest: '4b02e9790b934892',
            deferredRender: true,
            collection: 'queries',
          },
        },
      },
      {
        label: 'accepts',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'GetNotificationDetails-0.0.1-NotificationService-0.0.2',
        source: 'GetNotificationDetails-0.0.1',
        target: 'NotificationService-0.0.2',
        data: {
          message: {
            id: 'GetNotificationDetails-0.0.1',
            data: {
              id: 'GetNotificationDetails',
              name: 'Get notification details',
              summary:
                'GET request that will return detailed information about a specific notification, identified by its notificationId.\n',
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
            body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe `GetNotificationDetails` message is a query used to retrieve detailed information about a specific notification identified by its `notificationId`. It provides a comprehensive overview of the notification, including the title, message content, status (read/unread), the date it was created, and any additional metadata related to the notification, such as associated orders or system events. This query is helpful in scenarios where users or systems need detailed insights into a particular notification, such as retrieving full messages or auditing notifications sent to users.\n\nUse cases include viewing detailed information about order updates, system notifications, or promotional messages, allowing users to view their full notification history and details.\n\n<NodeGraph />\n\n<SchemaViewer file="schema.json" title="JSON Schema" maxHeight="500" />',
            filePath:
              '../examples/default/domains/E-Commerce/subdomains/Orders/services/NotificationService/queries/GetNotificationDetails/index.mdx',
            digest: '5825f3b294eb2545',
            deferredRender: true,
            collection: 'queries',
          },
        },
      },
      {
        label: '',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'NotificationService-0.0.2-inventory.{env}.events-1.0.0-OutOfStock-0.0.4',
        source: 'NotificationService-0.0.2',
        target: 'NotificationService-0.0.2-inventory.{env}.events-1.0.0-OutOfStock-0.0.4',
        data: {
          message: {
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
          source: {
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
          channel: {
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
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Inventory Events channel is the central stream for all inventory-related events across the system. This includes stock level changes, inventory allocations, adjustments, and stocktake events. Events for a specific SKU are guaranteed to be processed in sequence when using productId as the partition key.\n\n<ChannelInformation />\n\n### Publishing and Subscribing to Events\n\n#### Publishing Example\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'inventory.{env}.events\'\n\n# Create a Kafka producer\nproducer = KafkaProducer(\n    bootstrap_servers=bootstrap_servers,\n    value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example inventory update event\ninventory_event = {\n    "eventType": "STOCK_LEVEL_CHANGED",\n    "timestamp": datetime.utcnow().isoformat(),\n    "version": "1.0",\n    "payload": {\n        "productId": "PROD-456",\n        "locationId": "WH-123",\n        "previousQuantity": 100,\n        "newQuantity": 95,\n        "changeReason": "ORDER_FULFILLED",\n        "unitOfMeasure": "EACH",\n        "batchInfo": {\n            "batchId": "BATCH-789",\n            "expiryDate": "2025-12-31"\n        }\n    },\n    "metadata": {\n        "source": "warehouse_system",\n        "correlationId": "inv-xyz-123",\n        "userId": "john.doe"\n    }\n}\n\n# Send the message - using productId as key for partitioning\nproducer.send(\n    topic, \n    key=inventory_event[\'payload\'][\'productId\'].encode(\'utf-8\'),\n    value=inventory_event\n)\nproducer.flush()\n\nprint(f"Inventory event sent to topic {topic}")\n\n```\n\n### Subscription example\n\n```python\nfrom kafka import KafkaConsumer\nimport json\nfrom datetime import datetime\n\nclass InventoryEventConsumer:\n    def __init__(self):\n        # Kafka configuration\n        self.topic = f\'inventory.{env}.events\'\n        self.consumer = KafkaConsumer(\n            self.topic,\n            bootstrap_servers=[\'localhost:9092\'],\n            group_id=\'inventory-processor-group\',\n            auto_offset_reset=\'earliest\',\n            enable_auto_commit=False,\n            value_deserializer=lambda x: json.loads(x.decode(\'utf-8\')),\n            key_deserializer=lambda x: x.decode(\'utf-8\') if x else None\n        )\n\n    def process_event(self, event):\n        """Process individual inventory events based on type"""\n        event_type = event.get(\'eventType\')\n        \n        if event_type == \'STOCK_LEVEL_CHANGED\':\n            self.handle_stock_level_change(event)\n        elif event_type == \'LOW_STOCK_ALERT\':\n            self.handle_low_stock_alert(event)\n        # Add more event type handlers as needed\n\n    def handle_stock_level_change(self, event):\n        """Handle stock level change events"""\n        payload = event[\'payload\']\n        print(f"Stock level change detected for product {payload[\'productId\']}")\n        print(f"New quantity: {payload[\'newQuantity\']}")\n        # Add your business logic here\n\n    def handle_low_stock_alert(self, event):\n        """Handle low stock alert events"""\n        payload = event[\'payload\']\n        print(f"Low stock alert for product {payload[\'productId\']}")\n        print(f"Current quantity: {payload[\'currentQuantity\']}")\n        # Add your business logic here\n\n    def start_consuming(self):\n        """Start consuming messages from the topic"""\n        try:\n            print(f"Starting consumption from topic: {self.topic}")\n            for message in self.consumer:\n                try:\n                    # Process the message\n                    event = message.value\n                    print(f"Received event: {event[\'eventType\']} for product: {event[\'payload\'][\'productId\']}")\n                    \n                    # Process the event\n                    self.process_event(event)\n                    \n                    # Commit the offset after successful processing\n                    self.consumer.commit()\n                    \n                except Exception as e:\n                    print(f"Error processing message: {str(e)}")\n                    # Implement your error handling logic here\n                    # You might want to send to a DLQ (Dead Letter Queue)\n        \n        except Exception as e:\n            print(f"Consumer error: {str(e)}")\n        finally:\n            # Clean up\n            self.consumer.close()\n\nif __name__ == "__main__":\n    # Create and start the consumer\n    consumer = InventoryEventConsumer()\n    consumer.start_consuming()\n  ```',
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: 'publishes event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'inventory.{env}.events-1.0.0-OutOfStock-0.0.4-NotificationService-0.0.2',
        source: 'NotificationService-0.0.2-inventory.{env}.events-1.0.0-OutOfStock-0.0.4',
        target: 'OutOfStock-0.0.4',
        data: {
          message: {
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
          source: {
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
          channel: {
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
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Inventory Events channel is the central stream for all inventory-related events across the system. This includes stock level changes, inventory allocations, adjustments, and stocktake events. Events for a specific SKU are guaranteed to be processed in sequence when using productId as the partition key.\n\n<ChannelInformation />\n\n### Publishing and Subscribing to Events\n\n#### Publishing Example\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'inventory.{env}.events\'\n\n# Create a Kafka producer\nproducer = KafkaProducer(\n    bootstrap_servers=bootstrap_servers,\n    value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example inventory update event\ninventory_event = {\n    "eventType": "STOCK_LEVEL_CHANGED",\n    "timestamp": datetime.utcnow().isoformat(),\n    "version": "1.0",\n    "payload": {\n        "productId": "PROD-456",\n        "locationId": "WH-123",\n        "previousQuantity": 100,\n        "newQuantity": 95,\n        "changeReason": "ORDER_FULFILLED",\n        "unitOfMeasure": "EACH",\n        "batchInfo": {\n            "batchId": "BATCH-789",\n            "expiryDate": "2025-12-31"\n        }\n    },\n    "metadata": {\n        "source": "warehouse_system",\n        "correlationId": "inv-xyz-123",\n        "userId": "john.doe"\n    }\n}\n\n# Send the message - using productId as key for partitioning\nproducer.send(\n    topic, \n    key=inventory_event[\'payload\'][\'productId\'].encode(\'utf-8\'),\n    value=inventory_event\n)\nproducer.flush()\n\nprint(f"Inventory event sent to topic {topic}")\n\n```\n\n### Subscription example\n\n```python\nfrom kafka import KafkaConsumer\nimport json\nfrom datetime import datetime\n\nclass InventoryEventConsumer:\n    def __init__(self):\n        # Kafka configuration\n        self.topic = f\'inventory.{env}.events\'\n        self.consumer = KafkaConsumer(\n            self.topic,\n            bootstrap_servers=[\'localhost:9092\'],\n            group_id=\'inventory-processor-group\',\n            auto_offset_reset=\'earliest\',\n            enable_auto_commit=False,\n            value_deserializer=lambda x: json.loads(x.decode(\'utf-8\')),\n            key_deserializer=lambda x: x.decode(\'utf-8\') if x else None\n        )\n\n    def process_event(self, event):\n        """Process individual inventory events based on type"""\n        event_type = event.get(\'eventType\')\n        \n        if event_type == \'STOCK_LEVEL_CHANGED\':\n            self.handle_stock_level_change(event)\n        elif event_type == \'LOW_STOCK_ALERT\':\n            self.handle_low_stock_alert(event)\n        # Add more event type handlers as needed\n\n    def handle_stock_level_change(self, event):\n        """Handle stock level change events"""\n        payload = event[\'payload\']\n        print(f"Stock level change detected for product {payload[\'productId\']}")\n        print(f"New quantity: {payload[\'newQuantity\']}")\n        # Add your business logic here\n\n    def handle_low_stock_alert(self, event):\n        """Handle low stock alert events"""\n        payload = event[\'payload\']\n        print(f"Low stock alert for product {payload[\'productId\']}")\n        print(f"Current quantity: {payload[\'currentQuantity\']}")\n        # Add your business logic here\n\n    def start_consuming(self):\n        """Start consuming messages from the topic"""\n        try:\n            print(f"Starting consumption from topic: {self.topic}")\n            for message in self.consumer:\n                try:\n                    # Process the message\n                    event = message.value\n                    print(f"Received event: {event[\'eventType\']} for product: {event[\'payload\'][\'productId\']}")\n                    \n                    # Process the event\n                    self.process_event(event)\n                    \n                    # Commit the offset after successful processing\n                    self.consumer.commit()\n                    \n                except Exception as e:\n                    print(f"Error processing message: {str(e)}")\n                    # Implement your error handling logic here\n                    # You might want to send to a DLQ (Dead Letter Queue)\n        \n        except Exception as e:\n            print(f"Consumer error: {str(e)}")\n        finally:\n            # Clean up\n            self.consumer.close()\n\nif __name__ == "__main__":\n    # Create and start the consumer\n    consumer = InventoryEventConsumer()\n    consumer.start_consuming()\n  ```',
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: 'requests',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'NotificationService-0.0.2-GetInventoryList-0.0.1',
        source: 'NotificationService-0.0.2',
        target: 'GetInventoryList-0.0.1',
        data: {
          message: {
            id: 'GetInventoryList-0.0.1',
            data: {
              id: 'GetInventoryList',
              name: 'List inventory list',
              summary: 'GET request that will return inventory list\n',
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
            body: "import Footer from '@catalog/components/footer.astro';\n\n## Overview\n\nThe GetInventoryList message is a query used to retrieve a comprehensive list of all available inventory items within a system. It is designed to return detailed information about each item, such as product names, quantities, availability status, and potentially additional metadata like categories or locations. This query is typically utilized by systems or services that require a real-time view of current stock, ensuring that downstream applications or users have accurate and up-to-date information for decision-making or operational purposes. The GetInventoryList is ideal for use cases such as order processing, stock management, or reporting, providing visibility into the full range of inventory data.\n\n<NodeGraph />",
            filePath:
              '../examples/default/domains/E-Commerce/subdomains/Orders/services/InventoryService/queries/GetInventoryList/index.mdx',
            digest: '4517b5ebf16ef267',
            deferredRender: true,
            collection: 'queries',
          },
        },
      },
      {
        label: 'accepts',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'CancelShipment-0.0.1-ShippingService-0.0.1',
        source: 'CancelShipment-0.0.1',
        target: 'ShippingService-0.0.1',
        data: {
          message: {
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
        },
      },
      {
        label: 'accepts',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'CreateReturnLabel-0.0.1-ShippingService-0.0.1',
        source: 'CreateReturnLabel-0.0.1',
        target: 'ShippingService-0.0.1',
        data: {
          message: {
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
        },
      },
      {
        label: 'accepts',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'CreateShipment-0.0.1-ShippingService-0.0.1',
        source: 'CreateShipment-0.0.1',
        target: 'ShippingService-0.0.1',
        data: {
          message: {
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
        },
      },
      {
        label: 'accepts',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'UpdateShipmentStatus-0.0.1-ShippingService-0.0.1',
        source: 'UpdateShipmentStatus-0.0.1',
        target: 'ShippingService-0.0.1',
        data: {
          message: {
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
        },
      },
      {
        label: '',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'PaymentProcessed-1.0.0-payments.{env}.events-1.0.0-ShippingService-0.0.1',
        source: 'PaymentProcessed-1.0.0',
        target: 'PaymentProcessed-1.0.0-payments.{env}.events-1.0.0-ShippingService-0.0.1',
        data: {
          message: {
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
          source: {
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
          channel: {
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
              summary: 'All events contain payment ID for traceability and ordered processing.\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Payments Events channel is the central stream for all payment lifecycle events. This includes payment initiation, authorization, capture, completion and failure scenarios. Events for a specific payment are guaranteed to be processed in sequence when using paymentId as the partition key.\n\n<ChannelInformation />\n\n### Publishing Events Using Kafka\n\nHere\'s an example of publishing a payment event:\n\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'payments.{env}.events\'\n\n# Create Kafka producer\nproducer = KafkaProducer(\n   bootstrap_servers=bootstrap_servers,\n   value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example payment processed event\npayment_event = {\n   "eventType": "PAYMENT_PROCESSED",\n   "timestamp": datetime.utcnow().isoformat(),\n   "version": "1.0",\n   "payload": {\n       "paymentId": "PAY-123-456", \n       "orderId": "ORD-789",\n       "amount": {\n           "value": 99.99,\n           "currency": "USD"\n       },\n       "status": "SUCCESS",\n       "paymentMethod": {\n           "type": "CREDIT_CARD",\n           "last4": "4242",\n           "expiryMonth": "12",\n           "expiryYear": "2025",\n           "network": "VISA"\n       },\n       "transactionDetails": {\n           "processorId": "stripe_123xyz",\n           "authorizationCode": "AUTH123",\n           "captureId": "CAP456"\n       }\n   },\n   "metadata": {\n       "correlationId": "corr-123-abc",\n       "merchantId": "MERCH-456", \n       "source": "payment_service",\n       "environment": "prod",\n       "idempotencyKey": "PAY-123-456-2024-11-11-99.99"\n   }\n}\n\n# Send message - using paymentId as key for partitioning\nproducer.send(\n   topic,\n   key=payment_event[\'payload\'][\'paymentId\'].encode(\'utf-8\'),\n   value=payment_event\n)\nproducer.flush()\n```',
            filePath: '../examples/default/channels/payment.{env}.events/index.mdx',
            digest: '261c4005551cac3f',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: 'receives event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'payments.{env}.events-1.0.0-ShippingService-0.0.1-PaymentProcessed-1.0.0',
        source: 'PaymentProcessed-1.0.0-payments.{env}.events-1.0.0-ShippingService-0.0.1',
        target: 'ShippingService-0.0.1',
        data: {
          message: {
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
          source: {
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
          channel: {
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
              summary: 'All events contain payment ID for traceability and ordered processing.\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Payments Events channel is the central stream for all payment lifecycle events. This includes payment initiation, authorization, capture, completion and failure scenarios. Events for a specific payment are guaranteed to be processed in sequence when using paymentId as the partition key.\n\n<ChannelInformation />\n\n### Publishing Events Using Kafka\n\nHere\'s an example of publishing a payment event:\n\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'payments.{env}.events\'\n\n# Create Kafka producer\nproducer = KafkaProducer(\n   bootstrap_servers=bootstrap_servers,\n   value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example payment processed event\npayment_event = {\n   "eventType": "PAYMENT_PROCESSED",\n   "timestamp": datetime.utcnow().isoformat(),\n   "version": "1.0",\n   "payload": {\n       "paymentId": "PAY-123-456", \n       "orderId": "ORD-789",\n       "amount": {\n           "value": 99.99,\n           "currency": "USD"\n       },\n       "status": "SUCCESS",\n       "paymentMethod": {\n           "type": "CREDIT_CARD",\n           "last4": "4242",\n           "expiryMonth": "12",\n           "expiryYear": "2025",\n           "network": "VISA"\n       },\n       "transactionDetails": {\n           "processorId": "stripe_123xyz",\n           "authorizationCode": "AUTH123",\n           "captureId": "CAP456"\n       }\n   },\n   "metadata": {\n       "correlationId": "corr-123-abc",\n       "merchantId": "MERCH-456", \n       "source": "payment_service",\n       "environment": "prod",\n       "idempotencyKey": "PAY-123-456-2024-11-11-99.99"\n   }\n}\n\n# Send message - using paymentId as key for partitioning\nproducer.send(\n   topic,\n   key=payment_event[\'payload\'][\'paymentId\'].encode(\'utf-8\'),\n   value=payment_event\n)\nproducer.flush()\n```',
            filePath: '../examples/default/channels/payment.{env}.events/index.mdx',
            digest: '261c4005551cac3f',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: 'publishes event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'ShippingService-0.0.1-ShipmentCreated-0.0.1',
        source: 'ShippingService-0.0.1',
        target: 'ShipmentCreated-0.0.1',
        data: {
          message: {
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
        },
      },
      {
        label: 'publishes event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'ShippingService-0.0.1-ReturnInitiated-0.0.1',
        source: 'ShippingService-0.0.1',
        target: 'ReturnInitiated-0.0.1',
        data: {
          message: {
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
        },
      },
      {
        label: 'publishes event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'ShippingService-0.0.1-ShipmentDispatched-0.0.1',
        source: 'ShippingService-0.0.1',
        target: 'ShipmentDispatched-0.0.1',
        data: {
          message: {
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
        },
      },
      {
        label: 'publishes event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'ShippingService-0.0.1-ShipmentInTransit-0.0.1',
        source: 'ShippingService-0.0.1',
        target: 'ShipmentInTransit-0.0.1',
        data: {
          message: {
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
        },
      },
      {
        label: 'publishes event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'ShippingService-0.0.1-ShipmentDelivered-0.0.1',
        source: 'ShippingService-0.0.1',
        target: 'ShipmentDelivered-0.0.1',
        data: {
          message: {
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
        },
      },
      {
        label: 'publishes event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'ShippingService-0.0.1-DeliveryFailed-0.0.1',
        source: 'ShippingService-0.0.1',
        target: 'DeliveryFailed-0.0.1',
        data: {
          message: {
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
        },
      },
      {
        label: '',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'PaymentInitiated-0.0.1-payments.{env}.events-1.0.0-PaymentService-0.0.1',
        source: 'PaymentInitiated-0.0.1',
        target: 'PaymentInitiated-0.0.1-payments.{env}.events-1.0.0-PaymentService-0.0.1',
        data: {
          message: {
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
          source: {
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
          channel: {
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
              summary: 'All events contain payment ID for traceability and ordered processing.\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Payments Events channel is the central stream for all payment lifecycle events. This includes payment initiation, authorization, capture, completion and failure scenarios. Events for a specific payment are guaranteed to be processed in sequence when using paymentId as the partition key.\n\n<ChannelInformation />\n\n### Publishing Events Using Kafka\n\nHere\'s an example of publishing a payment event:\n\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'payments.{env}.events\'\n\n# Create Kafka producer\nproducer = KafkaProducer(\n   bootstrap_servers=bootstrap_servers,\n   value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example payment processed event\npayment_event = {\n   "eventType": "PAYMENT_PROCESSED",\n   "timestamp": datetime.utcnow().isoformat(),\n   "version": "1.0",\n   "payload": {\n       "paymentId": "PAY-123-456", \n       "orderId": "ORD-789",\n       "amount": {\n           "value": 99.99,\n           "currency": "USD"\n       },\n       "status": "SUCCESS",\n       "paymentMethod": {\n           "type": "CREDIT_CARD",\n           "last4": "4242",\n           "expiryMonth": "12",\n           "expiryYear": "2025",\n           "network": "VISA"\n       },\n       "transactionDetails": {\n           "processorId": "stripe_123xyz",\n           "authorizationCode": "AUTH123",\n           "captureId": "CAP456"\n       }\n   },\n   "metadata": {\n       "correlationId": "corr-123-abc",\n       "merchantId": "MERCH-456", \n       "source": "payment_service",\n       "environment": "prod",\n       "idempotencyKey": "PAY-123-456-2024-11-11-99.99"\n   }\n}\n\n# Send message - using paymentId as key for partitioning\nproducer.send(\n   topic,\n   key=payment_event[\'payload\'][\'paymentId\'].encode(\'utf-8\'),\n   value=payment_event\n)\nproducer.flush()\n```',
            filePath: '../examples/default/channels/payment.{env}.events/index.mdx',
            digest: '261c4005551cac3f',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: 'receives event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'payments.{env}.events-1.0.0-PaymentService-0.0.1-PaymentInitiated-0.0.1',
        source: 'PaymentInitiated-0.0.1-payments.{env}.events-1.0.0-PaymentService-0.0.1',
        target: 'PaymentService-0.0.1',
        data: {
          message: {
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
          source: {
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
          channel: {
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
              summary: 'All events contain payment ID for traceability and ordered processing.\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Payments Events channel is the central stream for all payment lifecycle events. This includes payment initiation, authorization, capture, completion and failure scenarios. Events for a specific payment are guaranteed to be processed in sequence when using paymentId as the partition key.\n\n<ChannelInformation />\n\n### Publishing Events Using Kafka\n\nHere\'s an example of publishing a payment event:\n\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'payments.{env}.events\'\n\n# Create Kafka producer\nproducer = KafkaProducer(\n   bootstrap_servers=bootstrap_servers,\n   value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example payment processed event\npayment_event = {\n   "eventType": "PAYMENT_PROCESSED",\n   "timestamp": datetime.utcnow().isoformat(),\n   "version": "1.0",\n   "payload": {\n       "paymentId": "PAY-123-456", \n       "orderId": "ORD-789",\n       "amount": {\n           "value": 99.99,\n           "currency": "USD"\n       },\n       "status": "SUCCESS",\n       "paymentMethod": {\n           "type": "CREDIT_CARD",\n           "last4": "4242",\n           "expiryMonth": "12",\n           "expiryYear": "2025",\n           "network": "VISA"\n       },\n       "transactionDetails": {\n           "processorId": "stripe_123xyz",\n           "authorizationCode": "AUTH123",\n           "captureId": "CAP456"\n       }\n   },\n   "metadata": {\n       "correlationId": "corr-123-abc",\n       "merchantId": "MERCH-456", \n       "source": "payment_service",\n       "environment": "prod",\n       "idempotencyKey": "PAY-123-456-2024-11-11-99.99"\n   }\n}\n\n# Send message - using paymentId as key for partitioning\nproducer.send(\n   topic,\n   key=payment_event[\'payload\'][\'paymentId\'].encode(\'utf-8\'),\n   value=payment_event\n)\nproducer.flush()\n```',
            filePath: '../examples/default/channels/payment.{env}.events/index.mdx',
            digest: '261c4005551cac3f',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: 'accepts',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'GetPaymentStatus-0.0.1-PaymentService-0.0.1',
        source: 'GetPaymentStatus-0.0.1',
        target: 'PaymentService-0.0.1',
        data: {
          message: {
            id: 'GetPaymentStatus-0.0.1',
            data: {
              id: 'GetPaymentStatus',
              name: 'Get payment status',
              summary:
                'GET request that will return the payment status for a specific order, identified by its orderId.\n',
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
            body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe `GetPaymentStatus` message is a query used to retrieve the payment status for a specific order, identified by its `orderId`. This query returns the current status of the payment, such as whether it is pending, completed, failed, or refunded. It is used by systems that need to track the lifecycle of payments associated with orders, ensuring that the payment has been successfully processed or identifying if any issues occurred during the transaction.\n\nThis query is useful in scenarios such as order management, refund processing, or payment auditing, ensuring that users or systems have real-time visibility into the payment status for a given order.\n\n<NodeGraph />\n\n<SchemaViewer file="schema.json" title="JSON Schema" maxHeight="500" />',
            filePath:
              '../examples/default/domains/E-Commerce/subdomains/Payment/services/PaymentService/queries/GetPaymentStatus/index.mdx',
            digest: '85185bb48c156df5',
            deferredRender: true,
            collection: 'queries',
          },
        },
      },
      {
        label: 'receives event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'UserSubscriptionStarted-0.0.1-PaymentService-0.0.1',
        source: 'UserSubscriptionStarted-0.0.1',
        target: 'PaymentService-0.0.1',
        data: {
          message: {
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
        },
      },
      {
        label: '',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'InventoryAdjusted-1.0.1-inventory.{env}.events-1.0.0-PaymentService-0.0.1',
        source: 'InventoryAdjusted-1.0.1',
        target: 'InventoryAdjusted-1.0.1-inventory.{env}.events-1.0.0-PaymentService-0.0.1',
        data: {
          message: {
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
          source: {
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
          channel: {
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
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Inventory Events channel is the central stream for all inventory-related events across the system. This includes stock level changes, inventory allocations, adjustments, and stocktake events. Events for a specific SKU are guaranteed to be processed in sequence when using productId as the partition key.\n\n<ChannelInformation />\n\n### Publishing and Subscribing to Events\n\n#### Publishing Example\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'inventory.{env}.events\'\n\n# Create a Kafka producer\nproducer = KafkaProducer(\n    bootstrap_servers=bootstrap_servers,\n    value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example inventory update event\ninventory_event = {\n    "eventType": "STOCK_LEVEL_CHANGED",\n    "timestamp": datetime.utcnow().isoformat(),\n    "version": "1.0",\n    "payload": {\n        "productId": "PROD-456",\n        "locationId": "WH-123",\n        "previousQuantity": 100,\n        "newQuantity": 95,\n        "changeReason": "ORDER_FULFILLED",\n        "unitOfMeasure": "EACH",\n        "batchInfo": {\n            "batchId": "BATCH-789",\n            "expiryDate": "2025-12-31"\n        }\n    },\n    "metadata": {\n        "source": "warehouse_system",\n        "correlationId": "inv-xyz-123",\n        "userId": "john.doe"\n    }\n}\n\n# Send the message - using productId as key for partitioning\nproducer.send(\n    topic, \n    key=inventory_event[\'payload\'][\'productId\'].encode(\'utf-8\'),\n    value=inventory_event\n)\nproducer.flush()\n\nprint(f"Inventory event sent to topic {topic}")\n\n```\n\n### Subscription example\n\n```python\nfrom kafka import KafkaConsumer\nimport json\nfrom datetime import datetime\n\nclass InventoryEventConsumer:\n    def __init__(self):\n        # Kafka configuration\n        self.topic = f\'inventory.{env}.events\'\n        self.consumer = KafkaConsumer(\n            self.topic,\n            bootstrap_servers=[\'localhost:9092\'],\n            group_id=\'inventory-processor-group\',\n            auto_offset_reset=\'earliest\',\n            enable_auto_commit=False,\n            value_deserializer=lambda x: json.loads(x.decode(\'utf-8\')),\n            key_deserializer=lambda x: x.decode(\'utf-8\') if x else None\n        )\n\n    def process_event(self, event):\n        """Process individual inventory events based on type"""\n        event_type = event.get(\'eventType\')\n        \n        if event_type == \'STOCK_LEVEL_CHANGED\':\n            self.handle_stock_level_change(event)\n        elif event_type == \'LOW_STOCK_ALERT\':\n            self.handle_low_stock_alert(event)\n        # Add more event type handlers as needed\n\n    def handle_stock_level_change(self, event):\n        """Handle stock level change events"""\n        payload = event[\'payload\']\n        print(f"Stock level change detected for product {payload[\'productId\']}")\n        print(f"New quantity: {payload[\'newQuantity\']}")\n        # Add your business logic here\n\n    def handle_low_stock_alert(self, event):\n        """Handle low stock alert events"""\n        payload = event[\'payload\']\n        print(f"Low stock alert for product {payload[\'productId\']}")\n        print(f"Current quantity: {payload[\'currentQuantity\']}")\n        # Add your business logic here\n\n    def start_consuming(self):\n        """Start consuming messages from the topic"""\n        try:\n            print(f"Starting consumption from topic: {self.topic}")\n            for message in self.consumer:\n                try:\n                    # Process the message\n                    event = message.value\n                    print(f"Received event: {event[\'eventType\']} for product: {event[\'payload\'][\'productId\']}")\n                    \n                    # Process the event\n                    self.process_event(event)\n                    \n                    # Commit the offset after successful processing\n                    self.consumer.commit()\n                    \n                except Exception as e:\n                    print(f"Error processing message: {str(e)}")\n                    # Implement your error handling logic here\n                    # You might want to send to a DLQ (Dead Letter Queue)\n        \n        except Exception as e:\n            print(f"Consumer error: {str(e)}")\n        finally:\n            # Clean up\n            self.consumer.close()\n\nif __name__ == "__main__":\n    # Create and start the consumer\n    consumer = InventoryEventConsumer()\n    consumer.start_consuming()\n  ```',
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: 'receives event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'inventory.{env}.events-1.0.0-PaymentService-0.0.1-InventoryAdjusted-1.0.1',
        source: 'InventoryAdjusted-1.0.1-inventory.{env}.events-1.0.0-PaymentService-0.0.1',
        target: 'PaymentService-0.0.1',
        data: {
          message: {
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
          source: {
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
          channel: {
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
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Inventory Events channel is the central stream for all inventory-related events across the system. This includes stock level changes, inventory allocations, adjustments, and stocktake events. Events for a specific SKU are guaranteed to be processed in sequence when using productId as the partition key.\n\n<ChannelInformation />\n\n### Publishing and Subscribing to Events\n\n#### Publishing Example\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'inventory.{env}.events\'\n\n# Create a Kafka producer\nproducer = KafkaProducer(\n    bootstrap_servers=bootstrap_servers,\n    value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example inventory update event\ninventory_event = {\n    "eventType": "STOCK_LEVEL_CHANGED",\n    "timestamp": datetime.utcnow().isoformat(),\n    "version": "1.0",\n    "payload": {\n        "productId": "PROD-456",\n        "locationId": "WH-123",\n        "previousQuantity": 100,\n        "newQuantity": 95,\n        "changeReason": "ORDER_FULFILLED",\n        "unitOfMeasure": "EACH",\n        "batchInfo": {\n            "batchId": "BATCH-789",\n            "expiryDate": "2025-12-31"\n        }\n    },\n    "metadata": {\n        "source": "warehouse_system",\n        "correlationId": "inv-xyz-123",\n        "userId": "john.doe"\n    }\n}\n\n# Send the message - using productId as key for partitioning\nproducer.send(\n    topic, \n    key=inventory_event[\'payload\'][\'productId\'].encode(\'utf-8\'),\n    value=inventory_event\n)\nproducer.flush()\n\nprint(f"Inventory event sent to topic {topic}")\n\n```\n\n### Subscription example\n\n```python\nfrom kafka import KafkaConsumer\nimport json\nfrom datetime import datetime\n\nclass InventoryEventConsumer:\n    def __init__(self):\n        # Kafka configuration\n        self.topic = f\'inventory.{env}.events\'\n        self.consumer = KafkaConsumer(\n            self.topic,\n            bootstrap_servers=[\'localhost:9092\'],\n            group_id=\'inventory-processor-group\',\n            auto_offset_reset=\'earliest\',\n            enable_auto_commit=False,\n            value_deserializer=lambda x: json.loads(x.decode(\'utf-8\')),\n            key_deserializer=lambda x: x.decode(\'utf-8\') if x else None\n        )\n\n    def process_event(self, event):\n        """Process individual inventory events based on type"""\n        event_type = event.get(\'eventType\')\n        \n        if event_type == \'STOCK_LEVEL_CHANGED\':\n            self.handle_stock_level_change(event)\n        elif event_type == \'LOW_STOCK_ALERT\':\n            self.handle_low_stock_alert(event)\n        # Add more event type handlers as needed\n\n    def handle_stock_level_change(self, event):\n        """Handle stock level change events"""\n        payload = event[\'payload\']\n        print(f"Stock level change detected for product {payload[\'productId\']}")\n        print(f"New quantity: {payload[\'newQuantity\']}")\n        # Add your business logic here\n\n    def handle_low_stock_alert(self, event):\n        """Handle low stock alert events"""\n        payload = event[\'payload\']\n        print(f"Low stock alert for product {payload[\'productId\']}")\n        print(f"Current quantity: {payload[\'currentQuantity\']}")\n        # Add your business logic here\n\n    def start_consuming(self):\n        """Start consuming messages from the topic"""\n        try:\n            print(f"Starting consumption from topic: {self.topic}")\n            for message in self.consumer:\n                try:\n                    # Process the message\n                    event = message.value\n                    print(f"Received event: {event[\'eventType\']} for product: {event[\'payload\'][\'productId\']}")\n                    \n                    # Process the event\n                    self.process_event(event)\n                    \n                    # Commit the offset after successful processing\n                    self.consumer.commit()\n                    \n                except Exception as e:\n                    print(f"Error processing message: {str(e)}")\n                    # Implement your error handling logic here\n                    # You might want to send to a DLQ (Dead Letter Queue)\n        \n        except Exception as e:\n            print(f"Consumer error: {str(e)}")\n        finally:\n            # Clean up\n            self.consumer.close()\n\nif __name__ == "__main__":\n    # Create and start the consumer\n    consumer = InventoryEventConsumer()\n    consumer.start_consuming()\n  ```',
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: 'publishes event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'PaymentService-0.0.1-PaymentProcessed-0.0.1',
        source: 'PaymentService-0.0.1',
        target: 'PaymentProcessed-0.0.1',
        data: {
          message: {
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
        },
      },
      {
        label: 'requests',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'PaymentService-0.0.1-GetOrder-0.0.1',
        source: 'PaymentService-0.0.1',
        target: 'GetOrder-0.0.1',
        data: {
          message: {
            id: 'GetOrder-0.0.1',
            data: {
              id: 'GetOrder',
              name: 'Get order details',
              summary:
                'GET request that will return detailed information about a specific order, identified by its orderId.\n',
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
            body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe `GetOrder` message is a query used to retrieve detailed information about a specific order, identified by its `orderId`. It provides information such as the order status (e.g., pending, completed, shipped), the items within the order, billing and shipping details, payment information, and the order\'s total amount. This query is commonly used by systems managing order processing, customer service, or order tracking functionalities.\n\nThis query can be applied in e-commerce systems, marketplaces, or any platform where users and systems need real-time order data for tracking, auditing, or managing customer purchases.\n\n<NodeGraph />\n\n<SchemaViewer file="schema.json" title="JSON Schema" maxHeight="500" />',
            filePath:
              '../examples/default/domains/E-Commerce/subdomains/Orders/services/OrdersService/queries/GetOrder/index.mdx',
            digest: '71f186bfcba04dad',
            deferredRender: true,
            collection: 'queries',
          },
        },
      },
      {
        label: 'accepts',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'SubscribeUser-0.0.1-SubscriptionService-0.0.1',
        source: 'SubscribeUser-0.0.1',
        target: 'SubscriptionService-0.0.1',
        data: {
          message: {
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
        },
      },
      {
        label: 'accepts',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'CancelSubscription-0.0.1-SubscriptionService-0.0.1',
        source: 'CancelSubscription-0.0.1',
        target: 'SubscriptionService-0.0.1',
        data: {
          message: {
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
        },
      },
      {
        label: 'accepts',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'GetSubscriptionStatus-0.0.2-SubscriptionService-0.0.1',
        source: 'GetSubscriptionStatus-0.0.2',
        target: 'SubscriptionService-0.0.1',
        data: {
          message: {
            id: 'GetSubscriptionStatus-0.0.2',
            data: {
              id: 'GetSubscriptionStatus',
              name: 'Get subscription status',
              summary:
                'GET request that will return the current subscription status for a specific user, identified by their userId.\n',
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
            body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe `GetSubscriptionStatus` message is a query used to retrieve the current subscription status for a specific user, identified by their `userId`. This query returns detailed information about the user\'s subscription, such as its current status (active, canceled, expired), the subscription tier or plan, and the next billing date. It is typically used by systems that manage user subscriptions, billing, and renewal processes to ensure that users are aware of their subscription details and any upcoming renewals.\n\nThis query is particularly useful in managing subscriptions for SaaS products, media services, or any recurring payment-based services where users need to manage and view their subscription information.\n\n<NodeGraph />\n\n<SchemaViewer file="schema.json" title="JSON Schema" maxHeight="500" />',
            filePath:
              '../examples/default/domains/E-Commerce/subdomains/Subscriptions/services/SubscriptionService/queries/GetSubscriptionStatus/index.mdx',
            digest: 'c8a50e0186a41b74',
            deferredRender: true,
            collection: 'queries',
          },
        },
      },
      {
        label: 'receives event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'PaymentProcessed-0.0.1-SubscriptionService-0.0.1',
        source: 'PaymentProcessed-0.0.1',
        target: 'SubscriptionService-0.0.1',
        data: {
          message: {
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
        },
      },
      {
        label: 'publishes event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'SubscriptionService-0.0.1-UserSubscriptionStarted-0.0.1',
        source: 'SubscriptionService-0.0.1',
        target: 'UserSubscriptionStarted-0.0.1',
        data: {
          message: {
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
        },
      },
      {
        label: 'publishes event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'SubscriptionService-0.0.1-UserSubscriptionCancelled-0.0.1',
        source: 'SubscriptionService-0.0.1',
        target: 'UserSubscriptionCancelled-0.0.1',
        data: {
          message: {
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
        },
      },
    ],
    title: 'E-Commerce (v1.0.0)',
    linkTo: 'visualiser',
    includeKey: true,
    linksToVisualiser: false,
    links: [],
    showFooter: true,
    elem: {
      _reactListenings4ct1zz20te: true,
    },
  },

  'domains.subscription': {
    id: 'Subscription',
    hrefLabel: 'Open documentation for Subscription v0.0.1',
    nodes: [
      {
        id: 'SubscribeUser-0.0.1',
        type: 'commands',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
        },
        position: {
          x: 75,
          y: 50,
        },
      },
      {
        id: 'CancelSubscription-0.0.1',
        type: 'commands',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
        },
        position: {
          x: 75,
          y: 200,
        },
      },
      {
        id: 'GetSubscriptionStatus-0.0.2',
        type: 'queries',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
            id: 'GetSubscriptionStatus-0.0.2',
            data: {
              id: 'GetSubscriptionStatus',
              name: 'Get subscription status',
              summary:
                'GET request that will return the current subscription status for a specific user, identified by their userId.\n',
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
            body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe `GetSubscriptionStatus` message is a query used to retrieve the current subscription status for a specific user, identified by their `userId`. This query returns detailed information about the user\'s subscription, such as its current status (active, canceled, expired), the subscription tier or plan, and the next billing date. It is typically used by systems that manage user subscriptions, billing, and renewal processes to ensure that users are aware of their subscription details and any upcoming renewals.\n\nThis query is particularly useful in managing subscriptions for SaaS products, media services, or any recurring payment-based services where users need to manage and view their subscription information.\n\n<NodeGraph />\n\n<SchemaViewer file="schema.json" title="JSON Schema" maxHeight="500" />',
            filePath:
              '../examples/default/domains/E-Commerce/subdomains/Subscriptions/services/SubscriptionService/queries/GetSubscriptionStatus/index.mdx',
            digest: 'c8a50e0186a41b74',
            deferredRender: true,
            collection: 'queries',
          },
        },
        position: {
          x: 75,
          y: 350,
        },
      },
      {
        id: 'PaymentProcessed-0.0.1',
        type: 'events',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
        },
        position: {
          x: 75,
          y: 500,
        },
      },
      {
        id: 'SubscriptionService-0.0.1',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          service: {
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
        },
        type: 'services',
        position: {
          x: 585,
          y: 275,
        },
      },
      {
        id: 'UserSubscriptionStarted-0.0.1',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
        },
        type: 'events',
        position: {
          x: 1095,
          y: 200,
        },
      },
      {
        id: 'UserSubscriptionCancelled-0.0.1',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
        },
        type: 'events',
        position: {
          x: 1095,
          y: 350,
        },
      },
    ],
    edges: [
      {
        label: 'accepts',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'SubscribeUser-0.0.1-SubscriptionService-0.0.1',
        source: 'SubscribeUser-0.0.1',
        target: 'SubscriptionService-0.0.1',
        data: {
          message: {
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
        },
      },
      {
        label: 'accepts',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'CancelSubscription-0.0.1-SubscriptionService-0.0.1',
        source: 'CancelSubscription-0.0.1',
        target: 'SubscriptionService-0.0.1',
        data: {
          message: {
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
        },
      },
      {
        label: 'accepts',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'GetSubscriptionStatus-0.0.2-SubscriptionService-0.0.1',
        source: 'GetSubscriptionStatus-0.0.2',
        target: 'SubscriptionService-0.0.1',
        data: {
          message: {
            id: 'GetSubscriptionStatus-0.0.2',
            data: {
              id: 'GetSubscriptionStatus',
              name: 'Get subscription status',
              summary:
                'GET request that will return the current subscription status for a specific user, identified by their userId.\n',
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
            body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe `GetSubscriptionStatus` message is a query used to retrieve the current subscription status for a specific user, identified by their `userId`. This query returns detailed information about the user\'s subscription, such as its current status (active, canceled, expired), the subscription tier or plan, and the next billing date. It is typically used by systems that manage user subscriptions, billing, and renewal processes to ensure that users are aware of their subscription details and any upcoming renewals.\n\nThis query is particularly useful in managing subscriptions for SaaS products, media services, or any recurring payment-based services where users need to manage and view their subscription information.\n\n<NodeGraph />\n\n<SchemaViewer file="schema.json" title="JSON Schema" maxHeight="500" />',
            filePath:
              '../examples/default/domains/E-Commerce/subdomains/Subscriptions/services/SubscriptionService/queries/GetSubscriptionStatus/index.mdx',
            digest: 'c8a50e0186a41b74',
            deferredRender: true,
            collection: 'queries',
          },
        },
      },
      {
        label: 'receives event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'PaymentProcessed-0.0.1-SubscriptionService-0.0.1',
        source: 'PaymentProcessed-0.0.1',
        target: 'SubscriptionService-0.0.1',
        data: {
          message: {
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
        },
      },
      {
        label: 'publishes event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'SubscriptionService-0.0.1-UserSubscriptionStarted-0.0.1',
        source: 'SubscriptionService-0.0.1',
        target: 'UserSubscriptionStarted-0.0.1',
        data: {
          message: {
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
        },
      },
      {
        label: 'publishes event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'SubscriptionService-0.0.1-UserSubscriptionCancelled-0.0.1',
        source: 'SubscriptionService-0.0.1',
        target: 'UserSubscriptionCancelled-0.0.1',
        data: {
          message: {
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
        },
      },
    ],
    title: 'Subscription (v0.0.1)',
    linkTo: 'visualiser',
    includeKey: true,
    linksToVisualiser: false,
    links: [],
    showFooter: true,
    elem: {
      _reactListenings4ct1zz20te: true,
    },
  },
  'domains.payment': {
    id: 'Payment',
    hrefLabel: 'Open documentation for Payment v0.0.1',
    nodes: [
      {
        id: 'PaymentInitiated-0.0.1',
        type: 'events',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
        },
        position: {
          x: 75,
          y: 50,
        },
      },
      {
        sourcePosition: 'right',
        targetPosition: 'left',
        id: 'PaymentInitiated-0.0.1-payments.{env}.events-1.0.0-PaymentService-0.0.1',
        data: {
          title: 'payments.{env}.events',
          mode: 'full',
          channel: {
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
              summary: 'All events contain payment ID for traceability and ordered processing.\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Payments Events channel is the central stream for all payment lifecycle events. This includes payment initiation, authorization, capture, completion and failure scenarios. Events for a specific payment are guaranteed to be processed in sequence when using paymentId as the partition key.\n\n<ChannelInformation />\n\n### Publishing Events Using Kafka\n\nHere\'s an example of publishing a payment event:\n\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'payments.{env}.events\'\n\n# Create Kafka producer\nproducer = KafkaProducer(\n   bootstrap_servers=bootstrap_servers,\n   value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example payment processed event\npayment_event = {\n   "eventType": "PAYMENT_PROCESSED",\n   "timestamp": datetime.utcnow().isoformat(),\n   "version": "1.0",\n   "payload": {\n       "paymentId": "PAY-123-456", \n       "orderId": "ORD-789",\n       "amount": {\n           "value": 99.99,\n           "currency": "USD"\n       },\n       "status": "SUCCESS",\n       "paymentMethod": {\n           "type": "CREDIT_CARD",\n           "last4": "4242",\n           "expiryMonth": "12",\n           "expiryYear": "2025",\n           "network": "VISA"\n       },\n       "transactionDetails": {\n           "processorId": "stripe_123xyz",\n           "authorizationCode": "AUTH123",\n           "captureId": "CAP456"\n       }\n   },\n   "metadata": {\n       "correlationId": "corr-123-abc",\n       "merchantId": "MERCH-456", \n       "source": "payment_service",\n       "environment": "prod",\n       "idempotencyKey": "PAY-123-456-2024-11-11-99.99"\n   }\n}\n\n# Send message - using paymentId as key for partitioning\nproducer.send(\n   topic,\n   key=payment_event[\'payload\'][\'paymentId\'].encode(\'utf-8\'),\n   value=payment_event\n)\nproducer.flush()\n```',
            filePath: '../examples/default/channels/payment.{env}.events/index.mdx',
            digest: '261c4005551cac3f',
            deferredRender: true,
            collection: 'channels',
          },
          source: {
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
          target: {
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
        },
        position: {
          x: 585,
          y: 50,
        },
        type: 'channels',
      },
      {
        id: 'GetPaymentStatus-0.0.1',
        type: 'queries',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
            id: 'GetPaymentStatus-0.0.1',
            data: {
              id: 'GetPaymentStatus',
              name: 'Get payment status',
              summary:
                'GET request that will return the payment status for a specific order, identified by its orderId.\n',
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
            body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe `GetPaymentStatus` message is a query used to retrieve the payment status for a specific order, identified by its `orderId`. This query returns the current status of the payment, such as whether it is pending, completed, failed, or refunded. It is used by systems that need to track the lifecycle of payments associated with orders, ensuring that the payment has been successfully processed or identifying if any issues occurred during the transaction.\n\nThis query is useful in scenarios such as order management, refund processing, or payment auditing, ensuring that users or systems have real-time visibility into the payment status for a given order.\n\n<NodeGraph />\n\n<SchemaViewer file="schema.json" title="JSON Schema" maxHeight="500" />',
            filePath:
              '../examples/default/domains/E-Commerce/subdomains/Payment/services/PaymentService/queries/GetPaymentStatus/index.mdx',
            digest: '85185bb48c156df5',
            deferredRender: true,
            collection: 'queries',
          },
        },
        position: {
          x: 585,
          y: 200,
        },
      },
      {
        id: 'UserSubscriptionStarted-0.0.1',
        type: 'events',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
        },
        position: {
          x: 585,
          y: 350,
        },
      },
      {
        id: 'InventoryAdjusted-1.0.1',
        type: 'events',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
        },
        position: {
          x: 75,
          y: 500,
        },
      },
      {
        sourcePosition: 'right',
        targetPosition: 'left',
        id: 'InventoryAdjusted-1.0.1-inventory.{env}.events-1.0.0-PaymentService-0.0.1',
        data: {
          title: 'inventory.{env}.events',
          mode: 'full',
          channel: {
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
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments\n',
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
          source: {
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
          target: {
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
        },
        position: {
          x: 585,
          y: 500,
        },
        type: 'channels',
      },
      {
        id: 'PaymentService-0.0.1',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          service: {
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
        },
        type: 'services',
        position: {
          x: 1095,
          y: 275,
        },
      },
      {
        id: 'PaymentProcessed-0.0.1',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
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
        },
        type: 'events',
        position: {
          x: 1605,
          y: 200,
        },
      },
      {
        id: 'GetOrder-0.0.1',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
          mode: 'full',
          message: {
            id: 'GetOrder-0.0.1',
            data: {
              id: 'GetOrder',
              name: 'Get order details',
              summary:
                'GET request that will return detailed information about a specific order, identified by its orderId.\n',
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
            body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe `GetOrder` message is a query used to retrieve detailed information about a specific order, identified by its `orderId`. It provides information such as the order status (e.g., pending, completed, shipped), the items within the order, billing and shipping details, payment information, and the order\'s total amount. This query is commonly used by systems managing order processing, customer service, or order tracking functionalities.\n\nThis query can be applied in e-commerce systems, marketplaces, or any platform where users and systems need real-time order data for tracking, auditing, or managing customer purchases.\n\n<NodeGraph />\n\n<SchemaViewer file="schema.json" title="JSON Schema" maxHeight="500" />',
            filePath:
              '../examples/default/domains/E-Commerce/subdomains/Orders/services/OrdersService/queries/GetOrder/index.mdx',
            digest: '71f186bfcba04dad',
            deferredRender: true,
            collection: 'queries',
          },
        },
        type: 'queries',
        position: {
          x: 1605,
          y: 350,
        },
      },
    ],
    edges: [
      {
        label: '',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'PaymentInitiated-0.0.1-payments.{env}.events-1.0.0-PaymentService-0.0.1',
        source: 'PaymentInitiated-0.0.1',
        target: 'PaymentInitiated-0.0.1-payments.{env}.events-1.0.0-PaymentService-0.0.1',
        data: {
          message: {
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
          source: {
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
          channel: {
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
              summary: 'All events contain payment ID for traceability and ordered processing.\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Payments Events channel is the central stream for all payment lifecycle events. This includes payment initiation, authorization, capture, completion and failure scenarios. Events for a specific payment are guaranteed to be processed in sequence when using paymentId as the partition key.\n\n<ChannelInformation />\n\n### Publishing Events Using Kafka\n\nHere\'s an example of publishing a payment event:\n\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'payments.{env}.events\'\n\n# Create Kafka producer\nproducer = KafkaProducer(\n   bootstrap_servers=bootstrap_servers,\n   value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example payment processed event\npayment_event = {\n   "eventType": "PAYMENT_PROCESSED",\n   "timestamp": datetime.utcnow().isoformat(),\n   "version": "1.0",\n   "payload": {\n       "paymentId": "PAY-123-456", \n       "orderId": "ORD-789",\n       "amount": {\n           "value": 99.99,\n           "currency": "USD"\n       },\n       "status": "SUCCESS",\n       "paymentMethod": {\n           "type": "CREDIT_CARD",\n           "last4": "4242",\n           "expiryMonth": "12",\n           "expiryYear": "2025",\n           "network": "VISA"\n       },\n       "transactionDetails": {\n           "processorId": "stripe_123xyz",\n           "authorizationCode": "AUTH123",\n           "captureId": "CAP456"\n       }\n   },\n   "metadata": {\n       "correlationId": "corr-123-abc",\n       "merchantId": "MERCH-456", \n       "source": "payment_service",\n       "environment": "prod",\n       "idempotencyKey": "PAY-123-456-2024-11-11-99.99"\n   }\n}\n\n# Send message - using paymentId as key for partitioning\nproducer.send(\n   topic,\n   key=payment_event[\'payload\'][\'paymentId\'].encode(\'utf-8\'),\n   value=payment_event\n)\nproducer.flush()\n```',
            filePath: '../examples/default/channels/payment.{env}.events/index.mdx',
            digest: '261c4005551cac3f',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: 'receives event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'payments.{env}.events-1.0.0-PaymentService-0.0.1-PaymentInitiated-0.0.1',
        source: 'PaymentInitiated-0.0.1-payments.{env}.events-1.0.0-PaymentService-0.0.1',
        target: 'PaymentService-0.0.1',
        data: {
          message: {
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
          source: {
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
          channel: {
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
              summary: 'All events contain payment ID for traceability and ordered processing.\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Payments Events channel is the central stream for all payment lifecycle events. This includes payment initiation, authorization, capture, completion and failure scenarios. Events for a specific payment are guaranteed to be processed in sequence when using paymentId as the partition key.\n\n<ChannelInformation />\n\n### Publishing Events Using Kafka\n\nHere\'s an example of publishing a payment event:\n\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'payments.{env}.events\'\n\n# Create Kafka producer\nproducer = KafkaProducer(\n   bootstrap_servers=bootstrap_servers,\n   value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example payment processed event\npayment_event = {\n   "eventType": "PAYMENT_PROCESSED",\n   "timestamp": datetime.utcnow().isoformat(),\n   "version": "1.0",\n   "payload": {\n       "paymentId": "PAY-123-456", \n       "orderId": "ORD-789",\n       "amount": {\n           "value": 99.99,\n           "currency": "USD"\n       },\n       "status": "SUCCESS",\n       "paymentMethod": {\n           "type": "CREDIT_CARD",\n           "last4": "4242",\n           "expiryMonth": "12",\n           "expiryYear": "2025",\n           "network": "VISA"\n       },\n       "transactionDetails": {\n           "processorId": "stripe_123xyz",\n           "authorizationCode": "AUTH123",\n           "captureId": "CAP456"\n       }\n   },\n   "metadata": {\n       "correlationId": "corr-123-abc",\n       "merchantId": "MERCH-456", \n       "source": "payment_service",\n       "environment": "prod",\n       "idempotencyKey": "PAY-123-456-2024-11-11-99.99"\n   }\n}\n\n# Send message - using paymentId as key for partitioning\nproducer.send(\n   topic,\n   key=payment_event[\'payload\'][\'paymentId\'].encode(\'utf-8\'),\n   value=payment_event\n)\nproducer.flush()\n```',
            filePath: '../examples/default/channels/payment.{env}.events/index.mdx',
            digest: '261c4005551cac3f',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: 'accepts',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'GetPaymentStatus-0.0.1-PaymentService-0.0.1',
        source: 'GetPaymentStatus-0.0.1',
        target: 'PaymentService-0.0.1',
        data: {
          message: {
            id: 'GetPaymentStatus-0.0.1',
            data: {
              id: 'GetPaymentStatus',
              name: 'Get payment status',
              summary:
                'GET request that will return the payment status for a specific order, identified by its orderId.\n',
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
            body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe `GetPaymentStatus` message is a query used to retrieve the payment status for a specific order, identified by its `orderId`. This query returns the current status of the payment, such as whether it is pending, completed, failed, or refunded. It is used by systems that need to track the lifecycle of payments associated with orders, ensuring that the payment has been successfully processed or identifying if any issues occurred during the transaction.\n\nThis query is useful in scenarios such as order management, refund processing, or payment auditing, ensuring that users or systems have real-time visibility into the payment status for a given order.\n\n<NodeGraph />\n\n<SchemaViewer file="schema.json" title="JSON Schema" maxHeight="500" />',
            filePath:
              '../examples/default/domains/E-Commerce/subdomains/Payment/services/PaymentService/queries/GetPaymentStatus/index.mdx',
            digest: '85185bb48c156df5',
            deferredRender: true,
            collection: 'queries',
          },
        },
      },
      {
        label: 'receives event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'UserSubscriptionStarted-0.0.1-PaymentService-0.0.1',
        source: 'UserSubscriptionStarted-0.0.1',
        target: 'PaymentService-0.0.1',
        data: {
          message: {
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
        },
      },
      {
        label: '',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'InventoryAdjusted-1.0.1-inventory.{env}.events-1.0.0-PaymentService-0.0.1',
        source: 'InventoryAdjusted-1.0.1',
        target: 'InventoryAdjusted-1.0.1-inventory.{env}.events-1.0.0-PaymentService-0.0.1',
        data: {
          message: {
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
          source: {
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
          channel: {
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
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments\n',
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
          target: {
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
        },
      },
      {
        label: 'receives event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'inventory.{env}.events-1.0.0-PaymentService-0.0.1-InventoryAdjusted-1.0.1',
        source: 'InventoryAdjusted-1.0.1-inventory.{env}.events-1.0.0-PaymentService-0.0.1',
        target: 'PaymentService-0.0.1',
        data: {
          message: {
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
          source: {
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
          channel: {
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
                'Central event stream for all inventory-related events including stock updates, allocations, and adjustments\n',
              version: '1.0.0',
              owners: [
                {
                  id: 'dboyne',
                },
              ],
            },
            body: '### Overview\nThe Inventory Events channel is the central stream for all inventory-related events across the system. This includes stock level changes, inventory allocations, adjustments, and stocktake events. Events for a specific SKU are guaranteed to be processed in sequence when using productId as the partition key.\n\n<ChannelInformation />\n\n### Publishing and Subscribing to Events\n\n#### Publishing Example\n```python\nfrom kafka import KafkaProducer\nimport json\nfrom datetime import datetime\n\n# Kafka configuration\nbootstrap_servers = [\'localhost:9092\']\ntopic = f\'inventory.{env}.events\'\n\n# Create a Kafka producer\nproducer = KafkaProducer(\n    bootstrap_servers=bootstrap_servers,\n    value_serializer=lambda v: json.dumps(v).encode(\'utf-8\')\n)\n\n# Example inventory update event\ninventory_event = {\n    "eventType": "STOCK_LEVEL_CHANGED",\n    "timestamp": datetime.utcnow().isoformat(),\n    "version": "1.0",\n    "payload": {\n        "productId": "PROD-456",\n        "locationId": "WH-123",\n        "previousQuantity": 100,\n        "newQuantity": 95,\n        "changeReason": "ORDER_FULFILLED",\n        "unitOfMeasure": "EACH",\n        "batchInfo": {\n            "batchId": "BATCH-789",\n            "expiryDate": "2025-12-31"\n        }\n    },\n    "metadata": {\n        "source": "warehouse_system",\n        "correlationId": "inv-xyz-123",\n        "userId": "john.doe"\n    }\n}\n\n# Send the message - using productId as key for partitioning\nproducer.send(\n    topic, \n    key=inventory_event[\'payload\'][\'productId\'].encode(\'utf-8\'),\n    value=inventory_event\n)\nproducer.flush()\n\nprint(f"Inventory event sent to topic {topic}")\n\n```\n\n### Subscription example\n\n```python\nfrom kafka import KafkaConsumer\nimport json\nfrom datetime import datetime\n\nclass InventoryEventConsumer:\n    def __init__(self):\n        # Kafka configuration\n        self.topic = f\'inventory.{env}.events\'\n        self.consumer = KafkaConsumer(\n            self.topic,\n            bootstrap_servers=[\'localhost:9092\'],\n            group_id=\'inventory-processor-group\',\n            auto_offset_reset=\'earliest\',\n            enable_auto_commit=False,\n            value_deserializer=lambda x: json.loads(x.decode(\'utf-8\')),\n            key_deserializer=lambda x: x.decode(\'utf-8\') if x else None\n        )\n\n    def process_event(self, event):\n        """Process individual inventory events based on type"""\n        event_type = event.get(\'eventType\')\n        \n        if event_type == \'STOCK_LEVEL_CHANGED\':\n            self.handle_stock_level_change(event)\n        elif event_type == \'LOW_STOCK_ALERT\':\n            self.handle_low_stock_alert(event)\n        # Add more event type handlers as needed\n\n    def handle_stock_level_change(self, event):\n        """Handle stock level change events"""\n        payload = event[\'payload\']\n        print(f"Stock level change detected for product {payload[\'productId\']}")\n        print(f"New quantity: {payload[\'newQuantity\']}")\n        # Add your business logic here\n\n    def handle_low_stock_alert(self, event):\n        """Handle low stock alert events"""\n        payload = event[\'payload\']\n        print(f"Low stock alert for product {payload[\'productId\']}")\n        print(f"Current quantity: {payload[\'currentQuantity\']}")\n        # Add your business logic here\n\n    def start_consuming(self):\n        """Start consuming messages from the topic"""\n        try:\n            print(f"Starting consumption from topic: {self.topic}")\n            for message in self.consumer:\n                try:\n                    # Process the message\n                    event = message.value\n                    print(f"Received event: {event[\'eventType\']} for product: {event[\'payload\'][\'productId\']}")\n                    \n                    # Process the event\n                    self.process_event(event)\n                    \n                    # Commit the offset after successful processing\n                    self.consumer.commit()\n                    \n                except Exception as e:\n                    print(f"Error processing message: {str(e)}")\n                    # Implement your error handling logic here\n                    # You might want to send to a DLQ (Dead Letter Queue)\n        \n        except Exception as e:\n            print(f"Consumer error: {str(e)}")\n        finally:\n            # Clean up\n            self.consumer.close()\n\nif __name__ == "__main__":\n    # Create and start the consumer\n    consumer = InventoryEventConsumer()\n    consumer.start_consuming()\n  ```',
            filePath: '../examples/default/channels/inventory.{env}.events/index.mdx',
            digest: '4b30c49f113c69e3',
            deferredRender: true,
            collection: 'channels',
          },
          target: {
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
        },
      },
      {
        label: 'publishes event',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'PaymentService-0.0.1-PaymentProcessed-0.0.1',
        source: 'PaymentService-0.0.1',
        target: 'PaymentProcessed-0.0.1',
        data: {
          message: {
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
        },
      },
      {
        label: 'requests',
        animated: false,
        markerEnd: {
          type: 'arrowclosed',
          width: 40,
          height: 40,
        },
        style: {
          strokeWidth: 1,
        },
        id: 'PaymentService-0.0.1-GetOrder-0.0.1',
        source: 'PaymentService-0.0.1',
        target: 'GetOrder-0.0.1',
        data: {
          message: {
            id: 'GetOrder-0.0.1',
            data: {
              id: 'GetOrder',
              name: 'Get order details',
              summary:
                'GET request that will return detailed information about a specific order, identified by its orderId.\n',
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
            body: 'import Footer from \'@catalog/components/footer.astro\';\n\n## Overview\n\nThe `GetOrder` message is a query used to retrieve detailed information about a specific order, identified by its `orderId`. It provides information such as the order status (e.g., pending, completed, shipped), the items within the order, billing and shipping details, payment information, and the order\'s total amount. This query is commonly used by systems managing order processing, customer service, or order tracking functionalities.\n\nThis query can be applied in e-commerce systems, marketplaces, or any platform where users and systems need real-time order data for tracking, auditing, or managing customer purchases.\n\n<NodeGraph />\n\n<SchemaViewer file="schema.json" title="JSON Schema" maxHeight="500" />',
            filePath:
              '../examples/default/domains/E-Commerce/subdomains/Orders/services/OrdersService/queries/GetOrder/index.mdx',
            digest: '71f186bfcba04dad',
            deferredRender: true,
            collection: 'queries',
          },
        },
      },
    ],
    title: 'Payment (v0.0.1)',
    linkTo: 'visualiser',
    includeKey: true,
    linksToVisualiser: false,
    links: [],
    showFooter: true,
    elem: {
      _reactListenings4ct1zz20te: true,
    },
  },


};
