export const data = {
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
}
