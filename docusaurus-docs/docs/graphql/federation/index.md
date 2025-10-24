---
title: Apollo Federation
description: Dgraph now supports Apollo federation so that you can create a gateway GraphQL service that includes the Dgraph GraphQL API and other GraphQL services.
sidebar_position: 11
---

Dgraph supports [Apollo federation](https://www.apollographql.com/docs/federation/) starting in release version 21.03. This lets you create a gateway GraphQL service that includes the Dgraph GraphQL API and other GraphQL services.

## Support for Apollo federation directives

The current implementation supports the following five directives: `@key`, `@extends`, `@external`, `@provides`, and `@requires`.

### `@key` directive
This directive takes one field argument inside it: the `@key` field. There are few limitations on how to use `@key` directives:

- Users can define the `@key` directive only once for a type
- Support for multiple key fields is not currently available.
- Since the `@key` field acts as a foreign key to resolve entities from the service where it is extended, the field provided as an argument inside the `@key` directive should be of `ID` type or have the `@id` directive on it.

For example -

```graphql
type User @key(fields: "id") 
}
```

### `@extends` directive
This directive provides support for extended definitions. For example, if the above-defined `User` type is defined in some other service, you can extend it in Dgraph's GraphQL service by using the `@extends` directive, as follows:

```graphql
type User @key(fields: "id") @extends
}
```
You can also achieve this with the `extend` keyword; so you have a choice between two types of syntax to extend a type into your Dgraph GraphQL service: `extend type User ...` or `type User @extends ...`.

### `@external` directive
You use this directive when the given field is not stored in this service. It can only be used on extended type definitions. For example, it is used in the example shown above on the `id` field of the `User` type.

### `@provides` directive
You use this directive on a field that tells the gateway to return a specific fieldset from the base type while fetching the field.

For example -

```graphql
type Review @key(fields: "id") 
}

extend type Product @key(fields: "upc") 
}
```

While fetching `Review.product` from the `review` service, and if the `name` or `price` is also queried, the gateway will fetch these from the `review` service itself. So, the `review` service also resolves these fields, even though both fields are `@external`.

### `@requires` directive
You use this directive on a field to annotate the fieldset of the base type. You can use it to develop a query plan where the required fields may not be needed by the client, but the service may need additional information from other services.

For example -

```graphql
extend type User @key(fields: "id") 
}
```

When the gateway fetches `user.reviews` from the `review` service, the gateway will get `user.email` from the `User` service and provide it as an argument to the `_entities` query.

Using `@requires` alone on a field doesn't make much sense. In cases where you need to use `@requires`, you should also add some custom logic on that field. You can add such logic using the `@lambda` or `@custom(http: {...})` directives.

Here's an example -

1. Schema:
```graphql
extend type User @key(fields: "id") 
}
```
2. Lambda Script:
```js
// returns a list of reviews for a user
async function userReviews({parent, graphql}) 
}
self.addGraphQLResolvers(
})
```

## Generated queries and mutations

In this section, you will see what all queries and mutations will be available to individual service and to the Apollo gateway. 

Let's take the below schema as an example -

```graphql
type Mission @key(fields: "id") 
}

type Astronaut @key(fields: "id") @extends 
}
```

The queries and mutations which are exposed to the gateway are -

```graphql
type Query 
}

type Mutation 
}
```

The queries for `Astronaut` are not exposed to the gateway because they are resolved through the `_entities` resolver. However, these queries are available on the Dgraph GraphQL API endpoint.

## Mutation for `extended` types
If you want to add an object of `Astronaut` type which is extended in this service.
The mutation `addAstronaut` takes `AddAstronautInput`, which is generated as follows:

```graphql
input AddAstronautInput 
}
```

The `id` field is of `ID` type, which is usually generated internally by Dgraph. But, In this case, it's provided as an input. The user should provide the same `id` value that is present in the GraphQL service where the type  `Astronaut` is defined.

For example, let's assume that the type `Astronaut` is defined in some other service, `AstronautService`, as follows:

```graphql
type Astronaut @key(fields: "id") 
}
```

When adding an object of type `Astronaut`, you should first add it to the `AstronautService` service. Then, you can call the `addAstronaut` mutation with the value of `id` provided as an argument that must be equal to the value in `AstronautService` service.
