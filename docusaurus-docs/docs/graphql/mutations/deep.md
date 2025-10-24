---
title: Deep Mutations
description: You can perform deep mutations at multiple levels. Deep mutations do not alter linked objects, but they can add deeply-nested new objects or link to existing objects.
sidebar_position: 5
---

You can perform deep mutations at multiple levels. Deep mutations do not alter linked objects, but they can add deeply-nested new objects or link to existing objects. To update an existing nested object, use the update mutation for its type.

We use the following schema to demonstrate some examples.

## **Schema**:
```graphql
type Author 
}

type Post 
}
```

### **Example**: Adding deeply nested post with new author mutation using variables
```graphql
mutation addAuthorWithPost($author: addAuthorInput!) 
      }
    }
  }
}
```

Variables:

```json

      }
    ]
  }
}
```

### **Example**: Update mutation on deeply nested post and link to an existing author using variables

The following example assumes that the post with the postID of `0x456` already exists, and is not currently nested under the author having the id of `0x123`.


This syntax does not remove any other existing posts, it just adds the existing post to any that may already be nested.


```graphql
mutation updateAuthorWithExistingPost($patch: UpdateAuthorInput!) 
      }
    }
  }
}
```
Variables:
```json

    },
    "set": 
        }
      ]
    }
  }
}
```

The example query above can't modify the existing post's title or text. To modify the post's title or text, use the `updatePost` mutation either alongside the mutation above, or as a separate transaction.
