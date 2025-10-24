---
title: Facets and Edge attributes

sidebar_position: 22
---

Dgraph supports facets --- **key value pairs on edges** --- as an extension to RDF triples. That is, facets add properties to edges, rather than to nodes.
For example, a `friend` edge between two nodes may have a Boolean property of `close` friendship.
Facets can also be used as `weights` for edges.

Though you may find yourself leaning towards facets many times, they should not be misused.  It wouldn't be correct modeling to give the `friend` edge a facet `date_of_birth`. That should be an edge for the friend.  However, a facet like `start_of_friendship` might be appropriate.  Facets are however not first class citizen in Dgraph like predicates.

Facet keys are strings and values can be `string`, `bool`, `int`, `float` and `dateTime`.
For `int` and `float`, only 32-bit signed integers and 64-bit floats are accepted.

The following mutation is used throughout this section on facets.  The mutation adds data for some peoples and, for example, records a `since` facet in `mobile` and `car` to record when Alice bought the car and started using the mobile number.

First we add some schema.
```sh
curl localhost:8080/alter -XPOST -d $'
    name: string @index(exact, term) .
    rated: [uid] @reverse @count .
' | python -m json.tool | less
```

```sh
curl -H "Content-Type: application/rdf" localhost:8080/mutate?commitNow=true -XPOST -d $'

  }
}' | python -m json.tool | less
```

## Facets on scalar predicates


Querying `name`, `mobile` and `car` of Alice gives the same result as without facets.



  }
}



The syntax `@facets(facet-name)` is used to query facet data. For Alice the `since` facet for `mobile` and `car` are queried as follows.



  }
}



Facets are returned at the same level as the corresponding edge and have keys like edge|facet.

All facets on an edge are queried with `@facets`.



  }
}


## Facets i18n

Facets keys and values can use language-specific characters directly when mutating. But facet keys need to be enclosed in angle brackets `<>` when querying. This is similar to predicates. See [Predicates i18n](/docs/dql/dql-schema#predicates-i18n) for more info.

Dgraph supports [Internationalized Resource Identifiers](https://en.wikipedia.org/wiki/Internationalized_Resource_Identifier) (IRIs) for facet keys when querying.

Example:
```

  }
}
```
Query, notice the `<>`'s:
```

  }
}
```

## Alias with facets

Alias can be specified while requesting specific predicates. Syntax is similar to how would request
alias for other predicates. `orderasc` and `orderdesc` are not allowed as alias as they have special
meaning. Apart from that anything else can be set as alias.

Here we set `car_since`, `close_friend` alias for `since`, `close` facets respectively.


     }
   }
}




## Facets on UID predicates

Facets on UID edges work similarly to facets on value edges.

For example, `friend` is an edge with facet `close`.
It was set to true for friendship between Alice and Bob
and false for friendship between Alice and Charlie.

A query for friends of Alice.



    }
  }
}


A query for friends and the facet `close` with `@facets(close)`.



     }
   }
}



For uid edges like `friend`, facets go to the corresponding child under the key edge|facet. In the above
example you can see that the `close` facet on the edge between Alice and Bob appears with the key `friend|close`
along with Bob's results.



    }
  }
}


Bob has a `car` and it has a facet `since`, which, in the results, is part of the same object as Bob
under the key car|since.
Also, the `close` relationship between Bob and Alice is part of Bob's output object.
Charlie does not have `car` edge and thus only UID facets.

## Filtering on facets

Dgraph supports filtering edges based on facets.
Filtering works similarly to how it works on edges without facets and has the same available functions.


Find Alice's close friends


    }
  }
}



To return facets as well as filter, add another `@facets(<facetname>)` to the query.



    }
  }
}



Facet queries can be composed with `AND`, `OR` and `NOT`.



    }
  }
}



## Sorting using facets

Sorting is possible for a facet on a uid edge. Here we sort the movies rated by Alice, Bob and
Charlie by their `rating` which is a facet.



    }
  }
}




## Assigning Facet values to a variable

Facets on UID edges can be stored in [value variables](/docs/query-language/value-variables).  The variable is a map from the edge target to the facet value.

Alice's friends reported by variables for `close` and `relative`.


  }

  friend(func: uid(a)) 
  }

  relative(func: uid(b)) 
  }
}



## Facets and Variable Propagation

Facet values of `int` and `float` can be assigned to variables and thus the [values propagate](/docs/query-language/value-variables#variable-propagation).


Alice, Bob and Charlie each rated every movie.  A value variable on facet `rating` maps movies to ratings.  A query that reaches a movie through multiple paths sums the ratings on each path.  The following sums Alice, Bob and Charlie's ratings for the three movies.



    }
  }
  data(func: uid(total_rating)) 
  }

}




## Facets and Aggregation

Facet values assigned to value variables can be aggregated.



    }
    avg(val(r))
  }
}



Note though that `r` is a map from movies to the sum of ratings on edges in the query reaching the movie.  Hence, the following does not correctly calculate the average ratings for Alice and Bob individually --- it calculates 2 times the average of both Alice and Bob's ratings.




    }
    avg(val(r))
  }
}


Calculating the average ratings of users requires a variable that maps users to the sum of their ratings.




    }
  }

  data(func: uid(avg_rating)) 
  }
}

