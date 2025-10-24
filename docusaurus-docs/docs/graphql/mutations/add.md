---
title: Add Mutations
description: Add mutations allows you to add new objects of a particular type. Dgraph automatically generates input and return types in the schema for the add mutation
sidebar_position: 2
---

Add mutations allow you to add new objects of a particular type.

We use the following schema to demonstrate some examples.

**Schema**:
```graphql
type Author 
}

type Post 
}
```

Dgraph automatically generates input and return types in the schema for the `add` mutation, 
as shown below:
```graphql
addPost(input: [AddPostInput!]!): AddPostPayload

input AddPostInput 
}

type AddPostPayload 
}
```

**Example**: Add mutation on single type with embedded value
```graphql
mutation 
  addAuthor(input: [{ name: "A.N. Author", posts: []}]) 
    }
  }
}
```

**Example**: Add mutation on single type using variables
```graphql
mutation addAuthor($author: [AddAuthorInput!]!) 
    }
  }
}
```
Variables:
```json

  }
}
```


You can convert an `add` mutation to an `upsert` mutation by setting the value of the input variable `upsert` to `true`. For more information, see [Upsert Mutations](/graphql/mutations/upsert).


## Examples

You can refer to the following [link](https://github.com/dgraph-io/dgraph/blob/main/graphql/resolve/add_mutation_test.yaml) for more examples.
