---
title: Lambda Fields
description: Start with lambda resolvers by defining it in your GraphQL schema. Then define your JavaScript mutation function and add it as a resolver in your JS source code.
sidebar_position: 2
---

### Schema

To set up a lambda function, first you need to define it on your GraphQL schema by using the `@lambda` directive.

For example, to define a lambda function for the `rank` and `bio` fields in `Author`: 

```graphql
type Author 
}
```

You can also define `@lambda` fields on interfaces, as follows:

```graphql
interface Character 
}

type Human implements Character 
}

type Droid implements Character 
}
```

### Resolvers

After the schema is ready, you can define your JavaScript mutation function and add it as a resolver in your JS source code. 
To add the resolver you can use either the `addGraphQLResolvers` or `addMultiParentGraphQLResolvers` methods.


A Lambda Field resolver can use a combination of `parents`, `parent`, `dql`, or `graphql` inside the function.



This example uses `parent` for the resolver function. You can find additional resolver examples using `dql` in the [Lambda queries article](/docs/query), and using `graphql` in the [Lambda mutations article](/docs/mutation).


For example, to define JavaScript lambda functions for... 
- `Author`, 
- `Character`, 
- `Human`, and 
- `Droid`

...and add them as resolvers, do the following:

```javascript
const authorBio = ({parent: {name, dob}}) => `My name is ${name} and I was born on ${dob}.`
const characterBio = ({parent: {name}}) => `My name is ${name}.`
const humanBio = ({parent: {name, totalCredits}}) => `My name is ${name}. I have ${totalCredits} credits.`
const droidBio = ({parent: {name, primaryFunction}}) => `My name is ${name}. My primary function is ${primaryFunction}.`

self.addGraphQLResolvers(
})
```

For example, you can add a resolver for `rank` using a `graphql` call, as follows:

```javascript
async function rank({parents}) 
    return {id: parent.id, rep: parent.reputation}
  });
  const idRepMap = {};
  idRepList.sort((a, b) => a.rep > b.rep ? -1 : 1)
    .forEach((a, i) => idRepMap[a.id] = i + 1)
  return parents.map(p => idRepMap[p.id])
}

self.addMultiParentGraphQLResolvers(
})
```

The following example demonstrates using the client-provided JWT to return `true` if the custom claim
for `USER` from the JWT matches the `id` of the `Author`.

```javascript
async function isMe({ parent, authHeader }) 
}

self.addGraphQLResolvers(
});
```

### Example

For example, if you execute the following GraphQL query:

```graphql
query 
  }
}
```

...you should see a response such as the following:

```json

    }
  ]
}
```

In the same way, if you execute the following GraphQL query on the `Character` interface:

```graphql
query 
  }
}
```

...you should see a response such as the following:

```json

    },
    
    }
  ]
}
```


The `Human` and `Droid` types will inherit the `bio` lambda field from the `Character` interface. 


For example, if you execute a `queryHuman` query with a selection set containing `bio`, then the lambda function registered for `Human.bio` is executed, as follows:

```graphql
query 
  }
}
```

This query generates the following response:

```json

    }
  ]
}
```
