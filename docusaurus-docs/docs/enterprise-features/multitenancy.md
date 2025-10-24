---
title: Multi-Tenancy

sidebar_position: 9
---

Multi-tenancy is an enterprise-only feature that allows various tenants to co-exist in the same Dgraph
Cluster using `uint64` namespaces. With multi-tenancy, each tenant can only log into their own
namespace and operate in their own namespace.


Multi-tenancy is an enterprise feature and needs [Access Control Lists](/docs/access-control-lists) (ACL) enabled to work.


## Overview

Multi-tenancy is built upon [Access Control Lists](/docs/access-control-lists) (ACL),
and enables multiple tenants to share a Dgraph Cluster using unique namespaces.
The tenants are logically separated, and their data lies in the same `p` directory.
Each namespace has a group guardian, which has root access to that namespace.

The default namespace is called a `galaxy`. [Guardians of the Galaxy](#guardians-of-the-galaxy) get
special access to create or delete namespaces and change passwords of
users of other namespaces.


Dgraph provides a timeout limit per query that's configurable using the `--limit` superflag's `query-limit` option.
There's no time limit for queries by default, but you can override it when running Dgraph Alpha.
For multi-tenant environments a suggested `query-limit` value is 500ms.


## FAQ

- How access controls and policies are handled among different tenants?

    In previous versions of Dgraph, the [Access Control Lists](/docs/access-control-lists) (ACL) feature
    offered a unified control solution across the entire database.
    With the new multi-tenancy feature, the ACL policies are now scoped down to individual tenants in the database.


Only super-admins ([Guardians of the galaxy](#guardians-of-the-galaxy)) have access across tenants.
The super admin is used only for database administration operations, such as exporting data of all tenants. _Guardian_ of the _Galaxy_ group cannot read across tenants.


- What's the ACL granularity in a multi-tenancy environment? Is it per tenant?

    The access controls are applied per tenant to either specific predicates or all predicates that exist for the tenant.
    For example, the user `John Smith` belonging to the group `Data Approvers` for a tenant `Accounting` may only have read-only access over predicates while user `Jane Doe`, belonging to the group `Data Editors` within that same tenant, may have access to modify those predicates.
    All the ACL rules need to be defined for each tenant in your backend. The level of granularity available allows for defining rules over specific predicates or all predicates belonging to that tenant.

- Are tenants a physical separation or a logical one?

    Tenants are a logical separation. In this example, data needs to be written twice for 2 different tenants.
    Each client must authenticate within a tenant, and can only modify data within the tenant as allowed by the configured ACLs.

- Can data be copied from one tenant to the other?

    Yes, but not by breaking any ACL or tenancy constraints.
    This can be done by exporting data from one tenant and importing data to another.

## Namespace

A multi-tenancy Namespace acts as a logical silo, so data stored in one namespace is not accessible from another namespace.
Each namespace has a group guardian (with root access to that namespace), and a unique `uint64` identifier.
Users are members of a single namespace, and cross-namespace queries are not allowed.


If a user wants to access multiple namespaces, the user needs to be created separately for each namespace.


The default namespace (`0x00`) is called a `galaxy`. A [Guardian of the Galaxy](#guardians-of-the-galaxy) has
special access to create or delete namespaces and change passwords of
users of other namespaces.

## Access Control Lists

Multi-tenancy defines certain ACL roles for the shared Cluster:

- [Guardians of the Galaxy](#guardians-of-the-galaxy) (Super Admins)
- Guardians of the namespace can perform the following operations:
  - create users and groups within the namespace
  - assign users to groups within the namespace
  - assign predicates to groups within the namespace
  - add users to groups within the namespace
  - export namespace
  - drop data within the namespace
  - query and mutate within the namespace

  
 Guardians of the namespace cannot query or mutate across namespaces.


- Normal users can perform the following operations:
  - login into a namespace
  - query within the namespace
  - mutate within the namespace

  
Normal users cannot query or mutate across namespaces.


### Guardians of the Galaxy

A _Guardian of the Galaxy_ is a Super Admin of the default namespace (`0x00`).

As a super-admin, a _Guardian of the Galaxy_ can:
- [Create](#create-a-namespace) and [delete](#delete-a-namespace) namespaces
- Reset the passwords
- Query and mutate the default namespace (`0x00`)
- Trigger Cluster-wide [backups](#backups) (no namespace-specific backup)
- Trigger Cluster-wide or namespace-specific [exports](#exports) (exports contain information about the namespace)

For example, if the user `rocket` is part of the _Guardians of the Galaxy_ group (namespace `0x00`),
he can only read/write on namespace `0x00`.

## Create a Namespace

Only members of the [Guardians of the Galaxy](#guardians-of-the-galaxy) group can create a namespace.
A namespace can be created by calling `/admin` with the `addNamespace` mutation,
and will return the assigned number for the new namespace.


To create a namespace, the _Guardian_ must send the JWT access token in the `X-Dgraph-AccessToken` header.


For example, to create a new namespace:

```graphql
mutation 
 addNamespace(input: {password: "mypass"})
  
  }
}
```

By sending the mutation above, a namespace is created. A _Guardian group_ is also automatically created for that namespace.
A `groot` user with password `mypass` (default is `password`) is created in the guardian group.
You can then use these credentials to login into the namespace and perform operations like [`addUser`](/docs/enterprise-features/access-control-lists#create-a-regular-user).

## List Namespaces

Only members of the [Guardians of the Galaxy](#guardians-of-the-galaxy) group can list active namespaces.
You can check available namespaces using the `/state` endpoint.

For example, if you have a multi-tenant Cluster with multiple namespaces, as a _Guardian of the Galaxy_ you can query `state` from GraphQL:

```graphql
query 
  }
}
```

In the response, namespaces that are available and active are listed.

```json

    }
  }
}
```

## Delete a Namespace

Only members of the [Guardians of the Galaxy](#guardians-of-the-galaxy) group can delete a namespace.
A namespace can be dropped by calling `/admin` with the `deleteNamespace` mutation.


To delete a namespace, the _Guardian_ must send the JWT access token in the `X-Dgraph-AccessToken` header.


For example, to drop the namespace `123`:

```graphql
mutation 
  deleteNamespace(input: {namespaceId: 123})
  
  }
}
```


Members of `namespace-guardians` can't delete namespaces, they can only perform queries and mutations.


## Reset passwords

Only members of the _Guardians of the Galaxy_ can reset passwords across namespaces.
A password can be reset by calling `/admin` with the `resetPassword` mutation.

For example, to reset the password for user `groot` from the namespace `100`:

```graphql
mutation 
  resetPassword(input: {userId: "groot", password:"newpassword", namespace: 100}) 
  }
}
```

## Drop Operations

The `drop all` operations can be triggered only by a [Guardian of the Galaxy](#guardians-of-the-galaxy).
They're executed at Cluster level and delete data across namespaces.
All other `drop` operations run at namespace level and are namespace specific. For information about other drop operations, see [Alter the database](/docs/dql/clients/raw-http#alter-the-database).



`drop all` operation is executed at Cluster level and the operation deletes data and schema across namespaces. Guardian of the namespace can trigger `drop data` operation within the namespace. The `drop data` operation deletes all the data but retains the schema only.


For example:

```
curl 'http://localhost:8080/alter' \
  -H 'X-Dgraph-AccessToken: <your-access-token>' \
  --data-raw '{"drop_op":"DATA"}' \
  --compressed
```

## Backups

Backups are currently Cluster-wide only, but [exports](#exports) can be created by namespace.
Only a [Guardian of the Galaxy](#guardians-of-the-galaxy) can trigger a backup.

### Data import

[Initial import](/docs/howto/importdata/bulk-loader) and [Live import](/docs/howto/importdata/live-loader) tools support multi-tenancy.


## Exports

Exports can be generated Cluster-wide or at namespace level.
These exported sets of `.rdf` or `.json` files and schemas include the multi-tenancy namespace information.

If a _Guardian of the Galaxy_ exports the whole Cluster, a single folder containing the export data of all the namespaces in a single `.rdf` or `.json` file and a single schema will be generated.


Guardians of a Namespace can trigger an Export for their namespace.


A namespace-specific export will contain the namespace value in the generated `.rdf` file:

```rdf
<0x01> "name" "ibrahim" <0x12> .     -> this belongs to namespace 0x12
<0x01> "name" "ibrahim" <0x0> .      -> this belongs to namespace 0x00
```

For example, when the _Guardian of the Galaxy_ user is used to export the namespace `0x1234` to a folder in the export directory (by default this directory is `export`):

```graphql
mutation 
  export(input: {format: "rdf", namespace: 1234}) 
    }
  }
}
```
When using the _Guardian of the Namespace_, there's no need to specify the namespace in the GraphQL mutation, as they can only export within their own namespace:

```graphql
mutation 
    }
  }
}
```

To export all the namespaces: (this is only valid for _Guardians of the Galaxy_)

```graphql
mutation 
  export(input: {format: "rdf", namespace: -1}) 
    }
  }
}
```
