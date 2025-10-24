---
title: Query Dgraph types

sidebar_position: 14
---

You can retrieve the Dgraph schema containing the list of predicates types and node types by:
- issuing a query on /query endpoint using the HTTP Client
- issuing a query using any DQL client library
- using Ratel UI
- using the Cloud console through the [DQL Schema](https://cloud.dgraph.io/_/schema?tab=dqlschema) tab of the Schema section.


When using a query, the request body is 
```
schema {}
```

 Unlike regular queries, the schema query is not surrounded
by curly braces. Also, schema queries and regular queries cannot be combined.


You can query for particular schema fields in the query body.

```
schema 
}
```

You can also query for particular predicates:

```
schema(pred: [name, friend]) 
}
```

 If ACL is enabled, then the schema query returns only the
predicates for which the logged-in ACL user has read access. 

Types can also be queried. Below are some example queries.

```
schema(type: Movie) {}
schema(type: [Person, Animal]) {}
```

Note that type queries do not contain anything between the curly braces. The
output will be the entire definition of the requested types.
