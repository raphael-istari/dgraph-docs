---
title: Shortest Path Queries

sidebar_position: 23
---

The shortest path between a source (`from`) node and destination (`to`) node can be found using the keyword `shortest` for the query block name. It requires the source node UID, destination node UID and the predicates (at least one) that have to be considered for traversal. A `shortest` query block returns the shortest path under `_path_` in the query response. The path can also be stored in a variable which is used in other query blocks.

## K-Shortest Path queries

By default the shortest path is returned. With `numpaths: k`, and `k > 1`, the k-shortest paths are returned. Cyclical paths are pruned out from the result of k-shortest path query. With `depth: n`, the paths up to `n` depth away are returned.


- If no predicates are specified in the `shortest` block, no path can be fetched as no edge is traversed.
- If you're seeing queries take a long time, you can set a [gRPC deadline](https://grpc.io/blog/deadlines) to stop the query after a certain amount of time.


For example:

```sh
curl localhost:8080/alter -XPOST -d $'
    name: string @index(exact) .
' | python -m json.tool | less
```

```graphql

  }
}
```

The shortest path between Alice and Mallory (assuming UIDs `0x2` and `0x5` respectively) can be found with this query:

```graphql

 }
 path(func: uid(path)) 
 }
}
```

Which returns the following results. 


without considering the `weight` facet, each edges' weight is considered as `1`


```

      },
      
      }
    ],
    "_path_": [
      
          }
        ]
      }
    ]
  }
}
```

We can return more paths by specifying `numpaths`. Setting `numpaths: 2` returns the shortest two paths:

```graphql

 }
 path(func: uid(path)) 
 }
}
```

In the query above, instead of using UID literals, we query both people using var blocks and the `uid()` function. You can also combine it with [GraphQL Variables](/docs/query-language/graphql-variables).

## Edge weight

The shortest path implementation in Dgraph relies on facets to provide weights. Using `facets` on the edges let you define the edges' weight as follows:

Only one facet per predicate is allowed in the shortest query block.

```graphql

 }

 path(func: uid(path)) 
 }
}
```

```

      },
      
      },
      
      },
      
      }
    ],
    "_path_": [
      
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

### Traverse example

Here is a graph traversal example that allows you to find the shortest path between friends using a `Car` or a `Bus`. 


Car and Bus movement for each relation is modeled as facets and specified in the shortest query


```graphql

  }
}
```

Query to find the shortest path relying on `Car` and `Bus`:

```graphql

 }

 sPathCar as shortest(from: uid(A), to: uid(M)) 
 }  
  
 pathBus(func: uid(sPathBus)) 
 }
  
 pathCar(func: uid(sPathCar)) 
 }
}
```

The response contains the following paths conforming to the specified weights:

```
    "pathBus": [
      
      },
      
      }
    ],
    "pathCar": [
      
      },
      
      },
      
      },
      
      }
    ]
```

## Constraints

Constraints can be applied to the intermediate nodes as follows.

```graphql

  }

  relationship(func: uid(path)) 
  }
}
```

The k-shortest path algorithm (used when `numpaths` > 1) also accepts the arguments `minweight` and `maxweight`, which take a float as their value. When they are passed, only paths within the weight range `[minweight, maxweight]` will be considered as valid paths. This can be used, for example, to query the shortest paths that traverse between 2 and 4 nodes.

```graphql

 }
 path(func: uid(path)) 
 }
}
```

## Notes

Some points to keep in mind for shortest path queries:

- Weights must be non-negative. Dijkstra's algorithm is used to calculate the shortest paths.
- Only one facet per predicate in the shortest query block is allowed.
- Only one `shortest` path block is allowed per query. Only one `_path_` is returned in the result. For queries with `numpaths` > 1, `_path_` contains all the paths.
- Cyclical paths are not included in the result of k-shortest path query.
- For k-shortest paths (when `numpaths` > 1), the result of the shortest path query variable will only return a single path which will be the shortest path among the k paths. All k paths are returned in `_path_`.
