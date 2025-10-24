---
title: Administrative API
description: This documentation presents the Admin API and explains how to run a Dgraph database with GraphQL.
sidebar_position: 10
---

This article presents the Admin API and explains how to run a Dgraph database with GraphQL.

## Running Dgraph with GraphQL

The simplest way to start with Dgraph GraphQL is to run the all-in-one Docker image.

```
docker run -it -p 8080:8080 dgraph/standalone:%VERSION_HERE
```

That brings up GraphQL at `localhost:8080/graphql` and `localhost:8080/admin`, but is intended for quickstart and doesn't persist data.

## Advanced options

Once you've tried out Dgraph GraphQL, you'll need to move past the `dgraph/standalone` and run and deploy Dgraph instances.

Dgraph is a distributed graph database.  It can scale to huge data and shard that data across a cluster of Dgraph instances.  GraphQL is built into Dgraph in its Alpha nodes. To learn how to manage and deploy a Dgraph cluster, check our [deployment guide](https://dgraph.io/docs/deploy/).

GraphQL schema introspection is enabled by default, but you can disable it by
setting the `--graphql` superflag's `introspection` option to false (`--graphql introspection=false`) when
starting the Dgraph Alpha nodes in your cluster.

## Dgraph's schema

Dgraph's GraphQL runs in Dgraph and presents a GraphQL schema where the queries and mutations are executed in the Dgraph cluster.  So the GraphQL schema is backed by Dgraph's schema.


this means that if you have a Dgraph instance and change its GraphQL schema, the schema of the underlying Dgraph will also be changed!


## Endpoints

When you start Dgraph with GraphQL, two GraphQL endpoints are served.

### /graphql

At `/graphql` you'll find the GraphQL API for the types you've added.  That's what your app would access and is the GraphQL entry point to Dgraph.  If you need to know more about this, see the [quick start](https://dgraph.io/docs/graphql/quick-start/) and [schema docs](https://dgraph.io/docs/graphql/schema/).

### /admin

At `/admin` you'll find an admin API for administering your GraphQL instance.  The admin API is a GraphQL API that serves POST and GET as well as compressed data, much like the `/graphql` endpoint.

Here are the important types, queries, and mutations from the `admin` schema.

```graphql
	"""
	The Int64 scalar type represents a signed 64‐bit numeric non‐fractional value.
	Int64 can represent values in range [-(2^63),(2^63 - 1)].
	"""
	scalar Int64

	"""
	The UInt64 scalar type represents an unsigned 64‐bit numeric non‐fractional value.
	UInt64 can represent values in range [0,(2^64 - 1)].
	"""
	scalar UInt64

	"""
	The DateTime scalar type represents date and time as a string in RFC3339 format.
	For example: "1985-04-12T23:20:50.52Z" represents 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC.
	"""
	scalar DateTime

	"""
	Data about the GraphQL schema being served by Dgraph.
	"""
	type GQLSchema @dgraph(type: "dgraph.graphql") 
	}

	type Cors @dgraph(type: "dgraph.cors")
	}

	"""
	A NodeState is the state of an individual node in the Dgraph cluster.
	"""
	type NodeState 
	}

	type MembershipState 
	}

	type ClusterGroup 
	}

	type Member 
	}

	type Tablet 
	}

	type License 
	}

	directive @dgraph(type: String, pred: String) on OBJECT | INTERFACE | FIELD_DEFINITION
	directive @id on FIELD_DEFINITION
	directive @secret(field: String!, pred: String) on OBJECT | INTERFACE

	type UpdateGQLSchemaPayload 
	}

	input UpdateGQLSchemaInput 
	}

	input GQLSchemaPatch 
	}

	input ExportInput 
	}

	input TaskInput 
	}
	type Response 
	}

	type ExportPayload 
	}

	type DrainingPayload 
	}

	type ShutdownPayload 
	}

	type TaskPayload 
	}
	enum TaskStatus 
	}
	enum TaskKind 
	}
	input ConfigInput 
	}

	type ConfigPayload 
	}

	type Config 
	}
	input RemoveNodeInput 
	}
	type RemoveNodePayload 
	}
	input MoveTabletInput 
	}
	type MoveTabletPayload 
	}
	enum AssignKind 
	}
	input AssignInput 
	}
	type AssignedIds 
	}
	type AssignPayload 
	}

	input BackupInput 
	}
	type BackupPayload 
	}
	input RestoreInput 
	}
	type RestorePayload 
	}
	input ListBackupsInput 
	}
	type BackupGroup 
	}
	type Manifest 
	}
	type LoginResponse 
	}
	type LoginPayload 
	}
	type User @dgraph(type: "dgraph.type.User") @secret(field: "password", pred: "dgraph.password") 
	}
	type Group @dgraph(type: "dgraph.type.Group") 
	}
	type Rule @dgraph(type: "dgraph.type.Rule") 
	}
	input StringHashFilter 
	}
	enum UserOrderable 
	}
	enum GroupOrderable 
	}
	input AddUserInput 
	}
	input AddGroupInput 
	}
	input UserRef 
	}
	input GroupRef 
	}
	input RuleRef 
	}
	input UserFilter 
	}
	input UserOrder 
	}
	input GroupOrder 
	}
	input UserPatch 
	}
	input UpdateUserInput 
	}
	input GroupFilter 
	}
	input SetGroupPatch 
	}
	input RemoveGroupPatch 
	}
	input UpdateGroupInput 
	}
	type AddUserPayload 
	}
	type AddGroupPayload 
	}
	type DeleteUserPayload 
	}
	type DeleteGroupPayload 
	}
	input AddNamespaceInput 
	}
	input DeleteNamespaceInput 
	}
	type NamespacePayload 
	}
	input ResetPasswordInput 
	}
	type ResetPasswordPayload 
	}
	input EnterpriseLicenseInput 
	}
	type EnterpriseLicensePayload 
	}

	type Query 
	}
	type Mutation 
	}
```

You'll notice that the `/admin` schema is very much the same as the schemas generated by Dgraph GraphQL.

* The `health` query lets you know if everything is connected and if there's a schema currently being served at `/graphql`.
* The `state`  query returns the current state of the cluster and group membership information. For more information about `state` see [here](/docs/deploy/dgraph-zero.md#more-about-the-state-endpoint).
* The `config` query returns the configuration options of the cluster set at the time of starting it.
* The `getGQLSchema` query gets the current GraphQL schema served at `/graphql`, or returns null if there's no such schema.
* The `updateGQLSchema` mutation allows you to change the schema currently served at `/graphql`.

## Enterprise features

Enterprise Features like ACL, Backups and Restore are also available using the GraphQL API at `/admin` endpoint.

* [ACL](/docs/enterprise-features/access-control-lists.md#accessing-secured-dgraph)
* [Backups](/docs/enterprise-features/binary-backups.md#create-a-backup)
* [Restore](/docs/enterprise-features/binary-backups.md#online-restore)

## First start

On first starting with a blank database:

* There's no schema served at `/graphql`.
* Querying the `/admin` endpoint for `getGQLSchema` returns `"getGQLSchema": null`.
* Querying the `/admin` endpoint for `health` lets you know that no schema has been added.

## Validating a schema

You can validate a GraphQL schema before adding it to your database by sending
your schema definition in an HTTP POST request to the to the
`/admin/schema/validate` endpoint, as shown in the following example:

Request header:

```ssh
path: /admin/schema/validate
method: POST
```

Request body:

```graphql
type Person 
}
```

This endpoint returns a JSON response that indicates if the schema is valid or
not, and provides an error if isn't valid. In this case, the schema is valid,
so the JSON response includes the following message: `Schema is valid`.

## Modifying a schema

There are two ways you can modify a GraphQL schema:
- Using `/admin/schema`
- Using the `updateGQLSchema` mutation on `/admin`


While modifying the GraphQL schema, if you get errors like `errIndexingInProgress`, `another operation is already running` or `server is not ready`, please wait a moment and then retry the schema update.


### Using `/admin/schema`

The `/admin/schema` endpoint provides a simplified method to add and update schemas.

To create a schema you only need to call the `/admin/schema` endpoint with the required schema definition. For example:

```graphql
type Person 
}
```

If you have the schema definition stored in a `schema.graphql` file, you can use `curl` like this:
```
curl -X POST localhost:8080/admin/schema --data-binary '@schema.graphql'
```

On successful execution, the `/admin/schema` endpoint will give you a JSON response with a success code.

### Using `updateGQLSchema` to add or modify a schema

Another option to add or modify a GraphQL schema is the `updateGQLSchema` mutation.

For example, to create a schema using `updateGQLSchema`, run this mutation on the `/admin` endpoint:

```graphql
mutation 
    input: { set: { schema: "type Person { name: String }"}})
  
    }
  }
}
```

## Initial schema

Regardless of the method used to upload the GraphQL schema, on a black database, adding this schema

```graphql
type Person 
}
```

would cause the following:

* The `/graphql` endpoint would refresh and serve the GraphQL schema generated from type `type Person { name: String }`.
* The schema of the underlying Dgraph instance would be altered to allow for the new `Person` type and `name` predicate.
* The `/admin` endpoint for `health` would return that a schema is being served.
* The mutation would return `"schema": "type Person { name: String }"` and the generated GraphQL schema for `generatedSchema` (this is the schema served at `/graphql`).
* Querying the `/admin` endpoint for `getGQLSchema` would return the new schema.

## Migrating a schema

Given an instance serving the GraphQL schema from the previous section, updating the schema to the following

```graphql
type Person 
}
```

would change the GraphQL definition of `Person` and result in the following:

* The `/graphql` endpoint would refresh and serve the GraphQL schema generated from the new type.
* The schema of the underlying Dgraph instance would be altered to allow for `dob` (predicate `Person.dob: datetime .` is added, and `Person.name` becomes `Person.name: string @index(regexp).`) and indexes are rebuilt to allow the regexp search.
* The `health` is unchanged.
* Querying the `/admin` endpoint for `getGQLSchema` would return the updated schema.

## Removing indexes from a schema

Adding a schema through GraphQL doesn't remove existing data (it only removes indexes).

For example, starting from the schema in the previous section and modifying it with the initial schema

```graphql
type Person 
}
```

would have the following effects:

* The `/graphql` endpoint would refresh to serve the schema built from this type.
* Thus, field `dob` would no longer be accessible, and there would be no search available on `name`.
* The search index on `name` in Dgraph would be removed.
* The predicate `dob` in Dgraph would be left untouched (the predicate remains and no data is deleted).
