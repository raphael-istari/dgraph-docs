---
title: JSON Mutation Format

sidebar_position: 4
---

Dgraph supports [Mutations](/docs/dql/dql-schema.mdex-mutation) in JSON or [RDF](/docs/dql/dql-schema.mdex-rdf) format.
When using JSON format Dgraph creates nodes and relationships from the JSON structure and assigns UIDs to nodes.

## Specifying node UIDs

For example, if you run this mutation:

```dql
 
     }
   ]
 }  
```
You will see that Dgraph responds with


    }
  }


Meaning that Dgraph has created one node from the JSON. It has used the identifier `dg.3162278161.22055` during the transaction. And the final UID value for this node is `0xfffd8d72745f0650`.

You can control the identifier name by specifying a `uid` field in your JSON data and using the notation:
``` "uid" : "_:<your-identifier>" ```


In this mutation, there are two JSON objects and because they are referring to the same identifier, Dgraph creates only one node:

```dql
   
     },
     
     }
   ]
 }  
```

When you run this mutation, you can see that Dgraph returns the UID of the node that was created with the `diggy` identifier:



    }


Note that the `specie` field is added to the node already created with `name` and `dgraph.type` information.

### Referencing existing nodes

You can use the `"uid"` field to reference an existing node. To do so, you must specify the UID value of the node.


For example:
```dql
   
     }
   ]
 }  
```

Adds the `specie` information to the node that was created earlier.


## Language support

To set a string value for a specific lnguage, append the language tag to the field name.
In case, `specie` predicate has the @lang directive, the JSON mutation
```dql
   
     }
   ]
 }  
```
Dgraph sets the `specie` string predicate in English and in French.


## Geolocation support

Geo-location data must be specified using keys `type` and `coordinates` in the JSON document.
The supported types are `Point`, `Polygon`, or `MultiPolygon` .

```dql
 
       }
     }
   ]
 }    
```





## Relationships

Relationships are simply created from the nested structure of JSON.

For example:
```dql
 
        },
        
        }]
     }
   ]
 }

```

This result in the creation of three nodes and the `food` predicate as a relationship.



    }
    ...




You can use references to existing nodes at any level of your nested JSON.


## Deleting literal values

To delete node predicates, specify the UID of the node you are changing and set  
the predicates to delete to the JSON value `null`.

For example, to remove the predicate `name` from node  `0xfffd8d72745f0691` :
```dql

     }
   ]
}
```

## Deleting relationship

A relationship can be defined with a cardinality of 1 or many (list).
Setting a relationship to `null` removes all the relationships.

```JSON

}
```


To delete a single relationship in a list, you must specify the target node of the relationship.

```dql

        }
      }
   ]
}

```

deletes only one `food` relationship.


To delete all predicates of a given node:
- make sure the node has a `dgraph.type` predicate
- the type is defined in the [Dgraph types schema](/docs/dql/dql-schema)
- run a delete mutation specifying only the uid field


```JSON

      }
   ]
}
```
## Handling arrays

To create a predicate as a list of string:

```JSON

    }
   ]
}
```

For example, if  `0x06` is the UID of the node created.

To remove one value from the list:

```JSON

  }
}
```

To remove multiple multiple values:
```JSON

  }
}
```

To add a value:

```JSON

}
```

## Adding Facets

Facets can be created by using the `|` character to separate the predicate
and facet key in a JSON object field name. This is the same encoding schema
used to show facets in query results. E.g.
```JSON

  }
}
```

Facets do not contain type information but Dgraph will try to guess a type from
the input. If the value of a facet can be parsed to a number, it will be
converted to either a float or an int. If it can be parsed as a Boolean, it will
be stored as a Boolean. If the value is a string, it will be stored as a
datetime if the string matches one of the time formats that Dgraph recognizes
(YYYY, MM-YYYY, DD-MM-YYYY, RFC339, etc.) and as a double-quoted string
otherwise. If you do not want to risk the chance of your facet data being
misinterpreted as a time value, it is best to store numeric data as either an
int or a float.

## Deleting Facets

To delete a `Facet`, overwrite it. When you run a mutation for the same entity without a `Facet`, the existing `Facet` is deleted automatically.


## Facets in List
Schema:
```sh
&lt;name&gt;: string @index(exact).
<nickname>: [string] .
```
To create a List-type predicate you need to specify all value in a single list. Facets for all
predicate values should be specified together. It is done in map format with index of predicate
values inside list being map key and their respective facets value as map values. Predicate values
which does not have facets values will be missing from facets map. E.g.
```JSON

      }
    }
  ]
}
```
Above you see that we have three values ​​to enter the list with their respective facets.
You can run this query to check the list with facets:
```graphql

   }
}
```
Later, if you want to add more values ​​with facets, just do the same procedure, but this time instead of using Blank-node you must use the actual node's UID.
```JSON

    }
  ]
}
```
And the final result is:
```JSON

        },
        "nickname": [
          "Jay-Jay",
          "@JJ",
          "Jules",
          "JB"
        ]
      }
    ]
  }
}
```

## Reserved values

The string values `uid(...)`, `val(...)` are not accepted.   
