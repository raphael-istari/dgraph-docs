---
title: Update Mutations
description: Update mutations let you to update existing objects of a particular type. With update mutations, you can filter nodes and set and remove any field belonging to a type.
sidebar_position: 3
---

Update mutations let you update existing objects of a particular type. With update mutations, you can filter nodes and set or remove any field belonging to a type.

We use the following schema to demonstrate some examples.

**Schema**:
```graphql
type Author 
}

type Post 
}
```

Dgraph automatically generates input and return types in the schema for the `update` mutation. Update mutations take `filter` as an input to select specific objects. You can specify `set` and `remove` operations on fields belonging to the filtered objects. It returns the state of the objects after updating.


Executing an empty `remove {}` or an empty `set{}` doesn't have any effect on the update mutation.


```graphql
updatePost(input: UpdatePostInput!): UpdatePostPayload

input UpdatePostInput 
}

type UpdatePostPayload 
}
```

### Set

For example, an update `set` mutation using variables:

```graphql
mutation updatePost($patch: UpdatePostInput!) 
    }
  }
}
```
Variables:
```json

    },
    "set": 
    }
  }
}
```

### Remove

For example an update `remove` mutation using variables:

```graphql
mutation updatePost($patch: UpdatePostInput!) 
    }
  }
}
```
Variables:
```json

    },
    "remove": 
    }
  }
}
```

### Examples

You can refer to the following [link](https://github.com/dgraph-io/dgraph/blob/main/graphql/resolve/update_mutation_test.yaml) for more examples.
