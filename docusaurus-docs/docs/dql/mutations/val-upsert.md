---
title: val function in upsert

sidebar_position: 2
---

The upsert block allows performing queries and mutations in a single request. The upsert
block contains one query block and one or more than one mutation blocks. Variables defined
in the query block can be used in the mutation blocks using the `uid` and `val` function.


The `val` function allows extracting values from value variables. Value variables store
a mapping from UIDs to their corresponding values. Hence, `val(v)` is replaced by the value
stored in the mapping for the UID (Subject) in the N-Quad. If the variable `v` has no value
for a given UID, the mutation is silently ignored. The `val` function can be used with the
result of aggregate variables as well, in which case, all the UIDs in the mutation would
be updated with the aggregate value.


## Example of `val` Function

Let's say we want to migrate the predicate `age` to `other`. We can do this using the
following mutation:

```sh
curl -H "Content-Type: application/rdf" -X POST localhost:8080/mutate?commitNow=true -d $'
upsert 
    }
  }

  mutation 
    }

    # and we delete the old predicate
    delete 
    }
  }
}' | jq
```

Result:

```json

    "uids": {}
  },
  "extensions": {...}
}
```

Here, variable `a` will store a mapping from all the UIDs to their `age`. The mutation
block then stores the corresponding value of `age` for each UID in the `other` predicate
and deletes the `age` predicate.

We can achieve the same result using `json` dataset as follows:

```sh
curl -H "Content-Type: application/json" -X POST localhost:8080/mutate?commitNow=true -d $'
  "query": "{ v as var(func: regexp(email, /.*@company1.io$/)) }",
  "delete": 
  },
  "set": 
  }
}' | jq
```
