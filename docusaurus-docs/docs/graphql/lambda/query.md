---
title: Lambda Queries
description: "Get started with the @lambda directive for queries. This documentation takes you through the schemas, resolvers, and examples."
sidebar_position: 3
---

### Schema

To set up a lambda query, first you need to define it on your GraphQL schema by using the `@lambda` directive.


`get`, `query`, and `aggregate` are reserved prefixes and they can't be used to define Lambda queries.


For example, to define a lambda query for `Author` that finds out authors given an author's `name`:

```graphql
type Author 
}

type Query 
}
```

### Resolver

Once the schema is ready, you can define your JavaScript query function and add it as resolver in your JS source code. 
To add the resolver you can use either the `addGraphQLResolvers` or `addMultiParentGraphQLResolvers` methods.


A Lambda Query resolver can use a combination of `parents`, `args`, `dql`, or `graphql` inside the function.



This example uses `dql` for the resolver function. You can find additional resolver examples using `parent` in the [Lambda fields article](/docs/query), and using `graphql` in the [Lambda mutations article](/docs/mutation).


For example, to define the JavaScript `authorsByName()` lambda function and add it as resolver:

```javascript
async function authorsByName({args, dql}) 
        }
    }`, {"$name": args.name})
    return results.data.queryAuthor
}

self.addGraphQLResolvers(
})
```

### Example

Finally, if you execute this lambda query

```graphql
query 
	}
}
```

You should see a response such as

```json

		}
	]
}
```
