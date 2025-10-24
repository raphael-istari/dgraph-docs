---
title: DQL mutation

sidebar_position: 2
---

Dgraph Query Language (DQL) is Dgraph's proprietary language to add, modify, delete and fetch data.

Fetching data is done through [DQL Queries](/docs/dql/dql-schema.mdex-query). Adding, modifying or deleting data is done through ***DQL Mutations***.

This overview explains the structure of DQL Mutations and provides links to the appropriate DQL reference documentation.


DQL mutations support JSON or [RDF](/docs/dql/dql-schema.mdex-rdf) format.

## set block
In DQL, you add data using a set mutation, identified by the `set` keyword.
 
```dql
   
       },
       "starring" : [
         
         },
         
         },
         
         }
       ]
     },
     
     }
   ]
 }  
```


```

  }
}
```

triples are in [RDF](/docs/dql/dql-schema.mdex-rdf) format.

###  Node reference
A mutation can include a blank nodes as an identifier for the subject or object, or a known UID.
```

  }
}
```
will add the `release_date` information to the node identified by UID `0x632ea2`.

###  language support
```

  }
}
```





## delete block
A delete mutation, identified by the `delete` keyword, removes
[triples](/docs/dql/dql-schema.mdex-rdf) from the store.

For example, if the store contained the following:
```RDF
<0xf11168064b01135b> &lt;name&gt; "Lewis Carrol"
<0xf11168064b01135b> <died> "1998"
<0xf11168064b01135b> <dgraph.type> "Person" .
```

Then, the following delete mutation deletes the specified erroneous data, and
removes it from any indexes:

```sh

  }
}
```

### Wildcard delete

In many cases you will need to delete multiple types of data for a predicate.
For a particular node `N`, all data for predicate `P` (and all corresponding
indexing) is removed with the pattern `S P *`.

```sh

  }
}
```

The pattern `S * *` deletes all the known edges out of a node, any reverse edges
corresponding to the removed edges, and any indexing for the removed data.

 For mutations that fit the `S * *` pattern, only
predicates that are among the types associated with a given node (using
`dgraph.type`) are deleted. Any predicates that don't match one of the
node's types will remain after an `S * *` delete mutation.

```sh

  }
}
```

If the node `S` in the delete pattern `S * *` has only a few predicates with a
type defined by `dgraph.type`, then only those triples with typed predicates are
deleted. A node that contains untyped predicates will still exist after a
`S * *` delete mutation.

 The patterns `* P O` and `* * O` are not supported because
it's inefficient to store and find all the incoming edges. 

### Deletion of non-list predicates

Deleting the value of a non-list predicate (i.e a 1-to-1 relationship) can be
done in two ways.

* Using the [wildcard delete](#wildcard-delete) (star notation)
 mentioned in the last section.
* Setting the object to a specific value. If the value passed is not the
current value, the mutation will succeed but will have no effect. If the value
passed is the current value, the mutation will succeed and will delete the
non-list predicate.

For language-tagged values, the following special syntax is supported:

```

  }
}
```

In this example, the value of the `name` field that is tagged with the language
tag `es` is deleted. Other tagged values are left untouched.

## upsert block
Upsert is an operation where:

1. A node is searched for, and then
2. Depending on if it is found or not, either:
    - Updating some of its attributes, or
    - Creating a new node with those attributes.

The upsert block allows performing queries and mutations in a single request. The upsert
block contains one query block and mutation blocks.

The structure of the upsert block is as follows:

```
upsert 
}
```

Execution of an upsert block also returns the response of the query executed on the state
of the database *before mutation was executed*.
To get the latest result, you have to execute another query after the transaction is committed.

Variables defined in the query block can be used in the mutation blocks using the [uid](/docs/uid-upsert) and [val](/docs/val-upsert) functions.

## conditional upsert
The upsert block also allows specifying conditional mutation blocks using an `@if`
directive. The mutation is executed only when the specified condition is true. If the
condition is false, the mutation is silently ignored. The general structure of
Conditional Upsert looks like as follows:

```
upsert 
}
```
The `@if` directive accepts a condition on variables defined in the query block and can be
connected using `AND`, `OR` and `NOT`.

## Example of Conditional Upsert

Let's say in our previous example, we know the `company1` has less than 100 employees.
For safety, we want the mutation to execute only when the variable `v` stores less than
100 but greater than 50 UIDs in it. This can be achieved as follows:

```sh
curl -H "Content-Type: application/rdf" -X POST localhost:8080/mutate?commitNow=true -d  $'
upsert 
  }

  mutation @if(lt(len(v), 100) AND gt(len(v), 50)) 
    }
  }
}' | jq
```

We can achieve the same result using `json` dataset as follows:

```sh
curl -H "Content-Type: application/json" -X POST localhost:8080/mutate?commitNow=true -d '
  "query": "{ v as var(func: regexp(email, /.*@company1.io$/)) }",
  "cond": "@if(lt(len(v), 100) AND gt(len(v), 50))",
  "delete": 
  }
}' | jq
```
