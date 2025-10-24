---
title: /graphql endpoint
description: Get the structure for GraphQL requests and responses, how to enable compression for them, and configuration options for extensions.
sidebar_position: 1
---

When you deploy a GraphQL schema, Dgraph serves the corresponding  [spec-compliant GraphQL](https://graphql.github.io/graphql-spec/June2018/) API at the HTTP endpoint `/graphql`. GraphQL requests can be sent via HTTP POST or HTTP GET requests.


### Getting your GraphQL Endpoint

 

- access the [Overview](https://cloud.dgraph.io/_/dashboard) panel of Dgraph Cloud dashboard.
- the ``GraphQL Endpoint`` is displayed at the bottom.
- click on the link button to copy it.



``/graphql`` is served by the Alpha nodes of the Dgraph cluster on the HTTP-external-public port. Refer to [ports usage](/docs/deploy/security/ports-usage).

For a local install the graphql endpoint would be

```
http://localhost:8080/graphql
```
The URL depends on your configuration and specifically 
- the port offest defined by ``--port_offset`` option of the dgraph alpha command.
- the configuration of TLS for https.
- the usage of a load balancer.




### In this section








