---
title: Documentation and Comments
description: Dgraph accepts GraphQL documentation comments, which get passed through to the generated API and shown as documentation in GraphQL tools.
sidebar_position: 7
---

## Schema Documentation Processed  by Generated API
Dgraph accepts GraphQL documentation comments (e.g. `""" This is a graphql comment """`), which get passed through to the generated API and thus shown as documentation in GraphQL tools like GraphiQL, GraphQL Playground, Insomnia etc.

## Schema Documentation Ignored by Generated API
You can also add `# ...` comments where ever you like.  These comments are not passed via the generated API and are not visible in the API docs.

## Reserved Namespace in Dgraph
Any comment starting with `# Dgraph.` is **reserved** and **should not be used** to document your input schema.

## An Example
An example that adds comments to a type as well as fields within the type would be as below.

```graphql
"""
Author of questions and answers in a website
"""
type Author {
  name: String
  email: String
}
```

It is also possible to add comments for queries or mutations that have been added via the custom directive.
```graphql
type Query {
  getAuthor(id: ID!): Author
}
```
The screenshots below shows how the documentation appear in a Graphql API explorer.

**Schema Documentation on Types**

**Schema Documentation on Custom directive**

