---
title: "\"DQL: Tips and Tricks\""

sidebar_position: 7
---

## Get Sample Data

Use the `has` function to get some sample nodes.



  }
}



## Count number of connecting nodes

Use `expand(_all_)` to expand the nodes' edges, then assign them to a variable.
The variable can now be used to iterate over the unique neighboring nodes.
Then use `count(uid)` to count the number of nodes in a block.



```
expand(_all_) { u as uid }
}
```

  result(func: uid(u)) 
  }
}


## Search on non-indexed predicates

Use the `has` function among the value variables to search on non-indexed predicates.

```graphql
{
  var(func: has(festival.focus)) {
    p as festival.focus
  }
  query(func: eq(val(p), "1961-01-01T00:00:00Z")) {
      festival.focus { name@en }
      festival.individual_festivals { total : count(uid) }
  }
}
```


## Sort edge by nested node values

Dgraph [sorting](/docs/query-language/sorting) is based on a single
level of the subgraph. To sort a level by the values of a deeper level, use
[query variables](/docs/query-language/query-variables) to bring
nested values up to the level of the edge to be sorted.

Example: Get all actors from a Steven Spielberg movie sorted alphabetically.
The actor's name is not accessed from a single traversal from the `starring` edge;
the name is accessible via `performance.actor`.



        }
        # Stars is a uid-to-value map mapping
        # starring edges to performance.actor names
        Stars as min(val(ActorName))
      }
    }
  }

  movies(func: uid(spielbergMovies)) @cascade 
        }
      }
    }
  }
}


## Obtain unique results by using variables

To obtain unique results, assign the node's edge to a variable.
The variable can now be used to iterate over the unique nodes.

Example: Get all unique genres from all of the movies directed by Steven Spielberg.



    }
  }

  q(func: uid(genres)) 
  }
}


## Usage of checkpwd boolean

Store the result of `checkpwd` in a query variable and then match it against `1` (`checkpwd` is `true`) or `0` (`checkpwd` is `false`).



  }
  userMatched(func: eq(val(check), 1)) 
  }
  userIncorrect(func: eq(val(check), 0)) 
  }
}

