---
title: Delete Mutations

sidebar_position: 4
---

Delete Mutations allow you to delete objects of a particular type.

We use the following schema to demonstrate some examples.

**Schema**:
```graphql
type Author 
}

type Post 
}
```

Dgraph automatically generates input and return types in the schema for the `delete` mutation.
Delete mutations take `filter` as an input to select specific objects and returns the state of the objects before deletion.
```graphql
deleteAuthor(filter: AuthorFilter!): DeleteAuthorPayload

type DeleteAuthorPayload 
}
```

**Example**: Delete mutation using variables
```graphql
mutation deleteAuthor($filter: AuthorFilter!) 
    }
  }
}
```
Variables:
```json

  { "name": { "eq": "A.N. Author" } }
}
```

## Examples

You can refer to the following [link](https://github.com/dgraph-io/dgraph/blob/main/graphql/resolve/delete_mutation_test.yaml) for more examples.
