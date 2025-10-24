---
title: Pagination

sidebar_position: 5
---

Pagination allows returning only a portion, rather than the whole, result set.  This can be useful for top-k style queries as well as to reduce the size of the result set for client side processing or to allow paged access to results.

Pagination is often used with sorting.

Without a sort order specified, the results are sorted by `uid`, which is assigned randomly. So the ordering, while deterministic, might not be what you expected.
## First

Syntax Examples:

* `q(func: ..., first: N)`
* `predicate (first: N) { ... }`
* `predicate @filter(...) (first: N) { ... }`

For positive `N`, `first: N` retrieves the first `N` results, by sorted or UID order.

For negative `N`, `first: N` retrieves the last `N` results, by sorted or UID order.  Currently, negative is only supported when no order is applied.  To achieve the effect of a negative with a sort, reverse the order of the sort and use a positive `N`.


Query Example: Last two films, by UID order, directed by Steven Spielberg and the first three genres of those movies, sorted alphabetically by English name.



      }
    }
  }
}




Query Example: The three directors named Steven who have directed the most actors of all directors named Steven.



    }
    totalActors as sum(val(stars))
  }

  mostStars(func: uid(ID), orderdesc: val(totalActors), first: 3) 
    }
  }
}

## Offset

Syntax Examples:

* `q(func: ..., offset: N)`
* `predicate (offset: N) { ... }`
* `predicate (first: M, offset: N) { ... }`
* `predicate @filter(...) (offset: N) { ... }`

With `offset: N` the first `N` results are not returned.  Used in combination with first, `first: M, offset: N` skips over `N` results and returns the following `M`.

Skipping over `N` results takes time proportional to `N` (complexity `O(N)`). In other words, the larger `N`, the longer it takes to compute the result set. Prefer after over `offset`.

Query Example: Order Hark Tsui's films by English title, skip over the first 4 and return the following 6.



      }
      name@zh
      name@en
      initial_release_date
    }
  }
}

## After

Syntax Examples:

* `q(func: ..., after: UID)`
* `predicate (first: N, after: UID) { ... }`
* `predicate @filter(...) (first: N, after: UID) { ... }`

Another way to get results after skipping over some results is to use the default UID ordering and skip directly past a node specified by UID.  For example, a first query could be of the form `predicate (after: 0x0, first: N)`, or just `predicate (first: N)`, with subsequent queries of the form `predicate(after: <uid of last entity in last result>, first: N)`.

Skipping over results with `after` takes constant time (complexity `O(1)`). In other words, no matter how many results are skipped, no extra time adds to computing the result set. This should be preferred over offset.

Query Example: The first five of Baz Luhrmann's films, sorted by UID order.



    }
  }
}


The fifth movie is the Australian movie classic Strictly Ballroom.  It has UID `0x99e44`.  The results after Strictly Ballroom can now be obtained with `after`.



    }
  }
}

