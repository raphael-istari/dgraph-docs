---
title: Schema Design
description: Starting with listing the entities that are involved in a basic to-do app, this step in the GraphQL tutorial walks you through schema design.
sidebar_position: 2
---

Let's start with listing down the entities that are involved in a basic todo app.
- Task
- User

![Todo Graph](/images/graphql/tutorial/todo/todo-graph.png)

Equivalent GraphQL schema for the graph above would be as follow:

```graphql
type Task 
}

type User 
}
```

What are the fields that these two simple entities contain?

We have a title and a status to check if it was completed or not in the `Task` type.
Then the  `User` type has a username (unique identifier), name and the tasks.

So each user can have many tasks.

![Todo Graph complete](/images/graphql/tutorial/todo/todo-graph-2.png)
*Note - ' \* ' signifies one-to-many relationship

Now let's add  `@id` directive to `username ` which makes it the unique key & also add  `@hasInverse` directive to enable the above relationship between tasks and user. 
We represent that in the GraphQL schema shown below:

```graphql
type Task 
}

type User 
}
```

Save the content in a file `schema.graphql`.

## Running

Before we begin, make sure that you have [Docker](https://docs.docker.com/install/)
installed on your machine.

Let's begin by starting Dgraph standalone by running the command below:

```
docker run -it -p 8080:8080 dgraph/standalone:%VERSION_HERE
```

Let's load up the GraphQL schema file to Dgraph:

```
curl -X POST localhost:8080/admin/schema --data-binary '@schema.graphql'
```

You can access that GraphQL endpoint with any of the great GraphQL developer tools.
Good choices include GraphQL Playground, Insomnia, GraphiQL and Altair.

Set up any of them and point it at `http://localhost:8080/graphql`. If you know lots about GraphQL, you might want to explore the schema, queries and mutations that were generated from the schema.

## Mutating Data

Let's add a user and some todos in our Todo App.

```graphql
mutation 
        },
        
        },
        
        },
        
        }
      ]
    }
  ]) 
      }
    }
  }
}
```

## Querying Data

Let's fetch the todos to list in our Todo App:

```graphql
query 
    }
  }
}
```

Running the query above should return JSON response as shown below:

```json

        }
      },
      
        }
      },
      
        }
      },
      
        }
      }
    ]
  }
}
```

## Querying Data with Filters

Before we get into querying data with filters, we will be required
to define search indexes to the specific fields.

Let's say we have to run a query on the _completed_ field, for which
we add `@search` directive to the field, as shown in the schema below:

```graphql
type Task 
}
```

The `@search` directive is added to support the native search indexes of **Dgraph**.

Resubmit the updated schema -
```
curl -X POST localhost:8080/admin/schema --data-binary '@schema.graphql'
```

Now, let's fetch all todos which are completed :

```graphql
query 
  }) 
  }
}
```

Next, let's say we have to run a query on the _title_ field, for which
we add another `@search` directive to the field, as shown in the schema below:

```graphql
type Task 
}
```

The `fulltext` search index provides the advanced search capability to perform equality
comparison as well as matching with language-specific stemming and stopwords.

Resubmit the updated schema -
```
curl -X POST localhost:8080/admin/schema --data-binary '@schema.graphql'
```

Now, let's try to fetch todos whose title has the word _"avoid"_ :

```graphql
query 
    }
  }) 
  }
}
```
