---
title: Directives

sidebar_position: 4
---

The list of all directives supported by Dgraph.

### @auth

`@auth` allows you to define how to apply authorization rules on the queries/mutation for a type.

Reference: [Auth directive](/docs/auth)

### @cascade

`@cascade` allows you to filter out certain nodes within a query.

Reference: [Cascade](/graphql/queries/cascade)

### @custom

`@custom` directive is used to define custom queries, mutations and fields.

Reference: [Custom directive](/docs/graphql/custom/directive)

### @deprecated

The `@deprecated` directive lets you mark the schema definition of a field or `enum` value as deprecated, and also lets you provide an optional reason for the deprecation.

Reference: [Deprecation](/docs/deprecated)

### @dgraph

`@dgraph` directive tells us how to map fields within a type to existing predicates inside Dgraph.

Reference: [@dgraph directive](/docs/directive-dgraph)

### @embedding

`@embedding` directive designates one or more fields as vector embeddings.

Reference: [@embedding directive](/docs/embedding)

### @generate

The `@generate` directive is used to specify which GraphQL APIs are generated for a type.

Reference: [Generate directive](/docs/generate)

### @hasInverse

`@hasInverse` is used to setup up two way edges such that adding a edge in
one direction automatically adds the one in the inverse direction.

Reference: [Linking nodes in the graph](/docs/graph-links)

### @id

`@id` directive is used to annotate a field which represents a unique identifier coming from outside
 of Dgraph.

Reference: [Identity]((/docs/ids)

### @include

The `@include` directive can be used to include a field based on the value of an `if` argument.

Reference: [Include directive](/docs/skip-include)

### @lambda

The `@lambda` directive allows you to call custom JavaScript resolvers. The `@lambda` queries, mutations, and fields are resolved through the lambda functions implemented on a given lambda server.

Reference: [Lambda directive](/docs/graphql/lambda/lambda-overview-overview)

### @remote

`@remote` directive is used to annotate types for which data is not stored in Dgraph. These types
are typically used with custom queries and mutations.

Reference: [Remote directive](/docs/directive.md#remote-types)

### @remoteResponse

The `@remoteResponse` directive allows you to annotate the fields of a `@remote` type in order to map a custom query's JSON key response to a GraphQL field.

Reference: [Remote directive](/docs/directive.md##remote-response)

### @search

`@search` allows you to perform filtering on a field while querying for nodes.

Reference: [Search](/docs/search)

### @secret

`@secret` directive is used to store secret information, it gets encrypted and then stored in Dgraph.

Reference: [Password Type](/docs/types.md#password-type)

### @skip

The `@skip` directive can be used to fetch a field based on the value of a user-defined GraphQL variable.

Reference: [Skip directive](/docs/skip-include)

### @withSubscription

`@withSubscription` directive when applied on a type, generates subscription queries for it.

Reference: [Subscriptions](/docs/subscriptions)

### @lambdaOnMutate

The `@lambdaOnMutate` directive allows you to listen to mutation events(`add`/`update`/`delete`). Depending on the defined events and the occurrence of a mutation event, `@lambdaOnMutate` triggers the appropriate lambda function implemented on a given lambda server.

Reference: [LambdaOnMutate directive](/docs/webhook)

<style>
  ul.contents 
  }
</style>
