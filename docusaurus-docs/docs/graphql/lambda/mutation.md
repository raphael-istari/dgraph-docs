---
title: Lambda Mutations
description: Ready to use lambdas for mutations? This documentation takes you through the schemas, resolvers, and examples.
sidebar_position: 4
---

### Schema

To set up a lambda mutation, first you need to define it on your GraphQL schema by using the `@lambda` directive.


`add`, `update`, and `delete` are reserved prefixes and they can't be used to define Lambda mutations.


For example, to define a lambda mutation for `Author` that creates a new author with a default `reputation` of `3.0` given just the `name`:

```graphql
type Author 
}

type Mutation 
}
```

### Resolver

Once the schema is ready, you can define your JavaScript mutation function and add it as resolver in your JS source code. 
To add the resolver you can use either the `addGraphQLResolvers` or `addMultiParentGraphQLResolvers` methods.


A Lambda Mutation resolver can use a combination of `parents`, `args`, `dql`, or `graphql` inside the function.



This example uses `graphql` for the resolver function. You can find additional resolver examples using `dql` in the [Lambda queries article](/docs/query), and using `parent` in the [Lambda fields article](/docs/field).


For example, to define the JavaScript `newAuthor()` lambda function and add it as resolver:

```javascript
async function newAuthor({args, graphql}) 
        addAuthor(input: [{name: $name, reputation: 3.0 }]) 
            }
        }
    }`, {"name": args.name})
    return results.data.addAuthor.author[0].id
}

self.addGraphQLResolvers(
})
```

Alternatively, you can use `dql.mutate` to achieve the same results:

```javascript
async function newAuthor({args, dql, graphql}) 
            _:newAuth <Author.name> "${args.name}" .
            _:newAuth <Author.reputation> "3.0" .
            _:newAuth <dgraph.type> "Author" .
        }
    }`);
    return res.data.uids.newAuth
}
```

### Example

Finally, if you execute this lambda mutation a new author `Ken Addams` with `reputation=3.0` should be added to the database:

```graphql
mutation 
}
```

Afterwards, if you query the GraphQL database for `Ken Addams`, you would see:

```json

		}
}
```
