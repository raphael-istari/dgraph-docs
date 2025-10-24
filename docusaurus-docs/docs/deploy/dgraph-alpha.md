---
title: More about Dgraph Alpha

sidebar_position: 5
---

Dgraph Alpha provides several HTTP endpoints for administrators, as follows:

* `/health?all` returns information about the health of all the servers in the cluster.
* `/admin/shutdown` initiates a proper [shutdown](/docs/deploy/admin/dgraph-administration#shutting-down-database) of the Alpha.

By default the Alpha listens on `localhost` for admin actions (the loopback address only accessible from the same machine). The `--bindall=true` option binds to `0.0.0.0` and thus allows external connections.

Set max file descriptors to a high value like 10000 if you are going to load a lot of data.

## Querying Health

You can query the `/admin` graphql endpoint with a query like the one below to get a JSON consisting of basic information about health of all the servers in the cluster.

```graphql
query 
  }
}
```

Here’s an example of JSON returned from the above query:

```json

      },
      
      }
    ]
  }
}
```

- `instance`: Name of the instance. Either `alpha` or `zero`.
- `status`: Health status of the instance. Either `healthy` or `unhealthy`.
- `version`: Version of Dgraph running the Alpha or Zero server.
- `uptime`: Time in nanoseconds since the Alpha or Zero server is up and running.
- `address`: IP_ADDRESS:PORT of the instance.
- `group`: Group assigned based on the replication factor. Read more [here](/docs/deploy/cluster-setup).
- `lastEcho`: Last time, in Unix epoch, when the instance was contacted by another Alpha or Zero server.
- `ongoing`: List of ongoing operations in the background.
- `indexing`: List of predicates for which indexes are built in the background. Read more [here](/docs/dql/dql-schema#indexes-in-background).

The same information (except `ongoing` and `indexing`) is available from the `/health` and `/health?all` endpoints of Alpha server.
