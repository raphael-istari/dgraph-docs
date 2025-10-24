---
title: POST Request
description: Get the structure for GraphQL requests and responses, how to enable compression for them, and configuration options for extensions.
sidebar_position: 1
---

<div class="api">

## POST ``/graphql``

### Headers


<div >

| Header | Optionality | Value |
|:------|:------|:------|
| Content-Type | mandatory | `application/graphql` or `application/json` |
| Content-Encoding  | optional | `gzip` to send compressed data |
| Accept-Encoding  |  optional | `gzip` to enabled data compression on response|
| X-Dgraph-AccessToken | if ``ACL`` is enabled | pass the access token you got in the login response to access predicates protected by an ACL|
| X-Auth-Token | if ``anonymous access`` is disabled |Admin Key or Client key|
| header as set in ``Dgraph.Authorization`` | if GraphQL ``Dgraph.Authorization`` is set | valid JWT used by @auth directives |
</div>
<br />


Refer to GraphQL [security](/docs/graphql/security) settings for explanations about ``anonymous access`` and ``Dgraph.Authorization``.



### Payload format
POST requests sent with the Content-Type header `application/graphql` must have a POST body content as a GraphQL query string. For example, the following is a valid POST body for a query:

```graphql
query 
    }
  }
}
```

POST requests sent with the Content-Type header `application/json` must have a POST body in the following JSON format:

```json

  "variables": { "var": "val", ... }
}
```

GraphQL requests can contain one or more operations. Operations include `query`, `mutation`, or `subscription`. If a request only has one operation, then it can be unnamed like the following:

## Single Operation

The most basic request contains a single anonymous (unnamed) operation. Each operation can have one or more queries within in. For example, the following query has `query` operation running the queries "getTask" and "getUser":

```graphql
query 
  }
  getUser(username: "dgraphlabs") 
  }
}
```

Response:

```json

    },
    "getUser": 
    }
  }
}
```

You can optionally name the operation as well, though it's not required if the request only has one operation as it's clear what needs to be executed.

### Query Shorthand

If a request only has a single query operation, then you can use the short-hand form of omitting the "query" keyword:

```graphql

  }
  getUser(username: "dgraphlabs") 
  }
}
```

This simplifies queries when a query doesn't require an operation name or [variables](/graphql/api/variables).

## Multiple Operations

If a request has two or more operations, then each operation must have a name. A request can only execute one operation, so you must also include the operation name to execute in the request (see the "operations" field for [requests](/graphql/api/requests)). Every operation name in a request must be unique.

For example, in the following request has the operation names "getTaskAndUser" and "completedTasks".

```graphql
query getTaskAndUser 
  }
  queryUser(filter: {username: {eq: "dgraphlabs"}}) 
  }
}

query completedTasks 
  queryTask(filter: {completed: true}) 
  }
}
```

When executing the following request (as an HTTP POST request in JSON format), specifying the "getTaskAndUser" operation executes the first query:

```json

  "query": "query getTaskAndUser { getTask(id: \"0x3\") { id title completed } queryUser(filter: {username: {eq: \"dgraphlabs\"}}) { username name }\n}\n\nquery completedTasks { queryTask(filter: {completed: true}) { title completed }}",
  "operationName": "getTaskAndUser"
}
```

```json

    },
    "queryUser": [
      
      }
    ]
  }
}
```

And specifying the "completedTasks" operation executes the second query:

```json

	"query": "query getTaskAndUser { getTask(id: \"0x3\") { id title completed } queryUser(filter: {username: {eq: \"dgraphlabs\"}}) { username name }\n}\n\nquery completedTasks { queryTask(filter: {completed: true}) { title completed }}",
	"operationName": "completedTasks"
}
```

```json

      },
      
      }
    ]
  }
}
```

### multiple queries execution

When an operation contains multiple queries, they are run concurrently and independently in a  Dgraph readonly transaction per query.

When an operation contains multiple mutations, they are run serially, in the order listed in the request, and in a transaction per mutation. If a mutation fails, the following mutations are not executed, and previous mutations are not rolled back.


### Variables

Variables simplify GraphQL queries and mutations by letting you pass data separately. A GraphQL request can be split into two sections: one for the query or mutation, and another for variables.

Variables can be declared after the `query` or `mutation` and are passed like arguments to a function and begin with `$`.

#### Query Example

```graphql
query post($filter: PostFilter) 
		}
	}
}
```

**Variables**

```graphql

		}
	}
}
```


#### Mutation Example

```graphql
mutation addAuthor($author: AddAuthorInput!) 
			}
		}
	}
}
```

**Variables**

```graphql

		}]
	}
}
```


### Fragments
A GraphQL fragment is associated with a type and  is a reusable subset of the fields from this type. 
Here, we declare a `postData` fragment that can be used with any `Post` object:

```graphql
fragment postData on Post 
  }
}
query allPosts 
  queryPost(order: { desc: title }) 
  }
}
mutation addPost($post: AddPostInput!) 
    }
  }
}
```



### Using fragments with interfaces

It is possible to define fragments on interfaces.
Here's an example of a query that includes in-line fragments:

**Schema**

```graphql
interface Employee 
}
interface Character 
}
type Human implements Character & Employee 
}
type Droid implements Character 
}
```

**Query**

```graphql
query allCharacters 
    }
    ... on Droid 
    }
  }
}
```

The `allCharacters` query returns a list of `Character` objects. Since `Human` and `Droid` implements the `Character` interface, the fields in the result would be returned according to the type of object.

**Result**

```graphql

      },
      
      },
      
      },
      
      }
    ]
  }
}
```


</div>




