---
title: Overview

sidebar_position: 1
---

Here is a guide to programmatically administering your Dgraph Cloud backend.

Wherever possible, we have maintained compatibility with the corresponding Dgraph API,
with the additional step of requiring [authentication](/docs/deploy/admin/dgraph-administration) via the `X-Auth-Token` header.


Keep in mind that free Dgraph Cloud backends will be frozen automatically after 4 hours of inactivity.


Please see the following topics:

* [Authentication](/docs/deploy/admin/dgraph-administration) will guide you in creating a API token. Since all admin APIs require an auth token, this is a good place to start.
* [Schema](/docs/graphql/schema) describes how to programmatically query and update your GraphQL schema.
* [Import and Exporting Data](/docs/howto/exportdata/about-export) is a guide for exporting your data from a Dgraph Cloud backend, and how to import it into another cluster
* [Dropping Data](/docs/howto/drop-data) will guide you through dropping all data from your Dgraph Cloud backend.
