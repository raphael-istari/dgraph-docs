---
title: "\"@dgraph\""

sidebar_position: 3
---

The `@dgraph` directive customizes the name of the types and predicates generated in Dgraph when deploying a GraphQL Schema.

* `type <type> @dgraph(type: "TypeNameToUseInDgraph")` controls what Dgraph type is used for a GraphQL type.
* `field: SomeType @dgraph(pred: "DgraphPredicate")` controls what Dgraph predicate is mapped to a GraphQL field.

For example, if you have existing types that don't match GraphQL requirements, you can create a schema like the following.

```graphql
type Person @dgraph(type: "Human-Person") 
}

type Movie @dgraph(type: "film") 
}
```

Which maps to the Dgraph schema:

```graphql
type Human-Person 
}

type film 
}

name string @index(hash) .
Person.age: int .
film.name string @index(term) .
```

You might also have the situation where you have used `name` for both movie names and people's names.  In this case you can map fields in two different GraphQL types to the one Dgraph predicate.

```graphql
type Person 
}

type Movie 
}
```


In Dgraph's current GraphQL implementation, if two fields are mapped to the same Dgraph predicate, both should have the same `@search` directive.
