---
title: Search and Filtering
description:  Queries generated for a GraphQL type allow you to generate a single list of objects for a type. You can also query a list of objects using GraphQL.
sidebar_position: 2
---

Queries generated for a GraphQL type allow you to generate a single list of
objects for a type.

### Get a single object

Fetch the `title`, `text` and `datePublished` for a post with id `0x1`.

```graphql
query 
  }
}
```

Fetching nested linked objects, while using `get` queries is also easy. For
example, this is how you would fetch the authors for a post and their friends.

```graphql
query 
      }
    }
  }
}
```

While fetching nested linked objects, you can also apply a filter on them.

For example, the following query fetches the author with the `id` 0x1 and their
posts about `GraphQL`.

```graphql
query 
      }
    }) 
    }
  }
}
```

If your type has a field with the `@id` directive applied to it, you can also fetch objects using that.

For example, given the following schema, the query below fetches a user's `name` and `age` by `userID` (which has the `@id` directive):

**Schema**:

```graphql
type User 
}
```

**Query**:

```graphql
query 
  }
}
```


The `get` API on interfaces containing fields with the `@id` directive is being deprecated and will be removed in v21.11.
Users are advised to use the `query` API instead.


### Query a list of objects

You can query a list of objects using GraphQL. For example, the following query fetches the `title`, `text` and and `datePublished` for all posts:

```graphql
query 
  }
}
```

The following example query fetches a list of posts by their post `id`:

```graphql
query 
  }) 
  }
}
```

### Query that filters objects by predicate

Before filtering an object by a predicate, you need to add a `@search` directive to the field that will be used to filter the results.

For example, if you wanted to query events between two dates, or events that fall within a certain radius of a point, you could have an `Event` schema, as follows:

```
type Event 
}
```

The search directive would let you filter events that fall within a date range, as follows:

```
query 
  queryEvent (filter: { date: { between: { min: "2020-01-01", max: "2020-02-01" } } }) 
  }
}
```

You can also filter events that have a location near a certain point with the following query:

```
query 
  queryEvent (filter: { location: { near: { coordinate: { latitude: 37.771935, longitude: -122.469829 }, distance: 1000 } } }) 
  }
}
```


You can also use connectors such as the `and` keyword to show results with multiple filters applied. In the query below, we fetch posts that have `GraphQL` in their title and have a `score > 100`.

This example assumes that the `Post` type has a `@search` directive applied to the `title` field and the `score` field.



```graphql
query 
    },
    and: 
      }
    }
  }) 
  }
}
```

### Filter a query for a list of objects

You can also filter nested objects while querying for a list of objects.

For example, the following query fetches all of the authors whose name contains
`Lee` and with their `completed` posts that have a score greater than `10`:

```graphql
query 
    }
  }) 
      },
      and: 
      }
    }) 
    }
  }
}
```

### Filter a query for a range of objects with `between`

You can filter query results within an inclusive range of indexed and typed
scalar values using the `between` keyword.

This keyword is also supported for DQL; to learn more, see
[DQL Functions: `between`](/docs/query-language/functions/#between).


For example, you might start with the following example schema used to track
students at a school:

**Schema**:

```graphql
type Student
}
```
Using the `between` filter, you could fetch records for students who are between
10 and 20 years of age:

**Query**:

```graphql
queryStudent(filter: {age: between: {min: 10, max: 20}})
}
```

You could also use this filter to fetch records for students whose names fall
alphabetically between `ba` and `hz`:

**Query**:

```graphql
queryStudent(filter: {name: between: {min: "ba", max: "hz"}})
}
```

### Filter to match specified field values with `in`

You can filter query results to find objects with one or more specified values using the
`in` keyword. This keyword can find matches for fields with the `@id` directive
applied. The `in` filter is supported for all data types such as `string`, `enum`, `Int`, `Int64`, `Float`, and `DateTime`.

For example, let's say that your schema defines a `State` type that has the
`@id` directive applied to the `code` field:

```graphql
type State 
}
```

Using the `in` keyword, you can query for a list of states that have the postal
code **WA** or **VA** using the following query:

```graphql
query 
      queryState(filter: {code: {in : ["WA", "VA"]}})
      }
    }
```

### Filter for objects with specified non-null fields using `has`

You can filter queries to find objects with a non-null value in a specified
field using the `has` keyword. The `has` keyword can only check whether a field
returns a non-null value, not for specific field values.

For example, your schema might define a `Student` type that has basic
information about each student; such as their ID number, age, name, and email address:

```graphql
type Student 
}
```

To find those students who have a non-null `name`, run the following query:

```graphql
queryStudent(filter: { has : name } )
}
```
You can also specify a list of fields, like the following:

```graphql
queryStudent(filter: { has : [name, email] } )
}
```

This would return `Student` objects where both `name` and `email` fields are non-null.
