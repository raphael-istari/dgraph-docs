---
title: Debug

sidebar_position: 19
---

For the purposes of debugging, you can attach a query parameter `debug=true` to a query. Attaching this parameter lets you retrieve the `uid` attribute for all the entities along with the `server_latency` and `start_ts` information under the `extensions` key of the response.

- `parsing_ns`: Latency in nanoseconds to parse the query.
- `processing_ns`: Latency in nanoseconds to process the query.
- `encoding_ns`: Latency in nanoseconds to encode the JSON response.
- `start_ts`: The logical start timestamp of the transaction.

Query with debug as a query parameter
```sh
curl -H "Content-Type: application/dql" http://localhost:8080/query?debug=true -XPOST -d $'
  }
}' | python -m json.tool | less
```

Returns `uid` and `server_latency`
```

      },
      
      },
      
      },
      
      }
    ],
    "extensions": 
      },
      "txn": 
      }
    }
  }
}
```

GraphQL+- has been renamed to Dgraph Query Language (DQL). While `application/dql`
is the preferred value for the `Content-Type` header, we will continue to support
`Content-Type: application/graphql+-` to avoid making breaking changes.

