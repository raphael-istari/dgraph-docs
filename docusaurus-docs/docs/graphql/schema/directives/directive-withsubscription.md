---
title: "\"@withSubscription\""

sidebar_position: 7
---

The `@withSubscription` directive enables **subscription** operation on a GraphQL type.

A subscription notifies your client with changes to back-end data using the WebSocket protocol.
Subscriptions are useful to get low-latency, real-time updates. 

To enable subscriptions on any type add the `@withSubscription` directive to the schema as part of the type definition, as in the following example:

```graphql
type Todo @withSubscription 
}
```

Refer to [GraphQL Subscriptions](/docs/graphql/subscriptions) to learn how to use subscriptions in you client application.

