---
title: Lambda Webhooks
description: Ready to use lambdas for webhooks? This documentation takes you through the schemas, resolvers, and examples.
sidebar_position: 5
---

### Schema

To set up a lambda webhook, you need to define it in your GraphQL schema by using the `@lambdaOnMutate` directive along with the mutation events (`add`/`update`/`delete`) you want to listen on.


Lambda webhooks only listen for events from the root mutation. You can create a schema that is capable of creating deeply nested objects, but only the parent level webhooks will be evoked for the mutation.


For example, to define a lambda webhook for all mutation events (`add`/`update`/`delete`) on any `Author` object:

```graphql
type Author @lambdaOnMutate(add: true, update: true, delete: true) 
}
```

### Resolver

Once the schema is ready, you can define your JavaScript functions and add those as resolvers in your JS source code. 
To add the resolvers you should use the `addWebHookResolvers`method.


A Lambda Webhook resolver can use a combination of `event`, `dql`, `graphql` or `authHeader` inside the function.


#### Event object

You also have access to the `event` object within the resolver. Depending on the value of `operation` field, only one of the fields (`add`/`update`/`delete`) will be part of the `event` object. The definition of `event` is as follows:

```
"event": 
    },
    "update": 
    },
    "delete": 
    }
```

#### Resolver examples

For example, to define JavaScript lambda functions for each mutation event for which `@lambdaOnMutate` is enabled and add those as resolvers:

```javascript
async function addAuthorWebhook({event, dql, graphql, authHeader}) 
}

async function updateAuthorWebhook({event, dql, graphql, authHeader}) 
}

async function deleteAuthorWebhook({event, dql, graphql, authHeader}) 
}

self.addWebHookResolvers(
})
```

### Example

Finally, if you execute an `addAuthor` mutation, the `add` operation mapped to the `addAuthorWebhook` resolver will be triggered:

```graphql
mutation 
  addAuthor(input:[{name: "Ken Addams"}]) 
    }
  }
}
```
