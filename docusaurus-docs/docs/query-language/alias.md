---
title: Aliases

sidebar_position: 4
---

Syntax Examples:

* `aliasName : predicate`
* `aliasName : predicate { ... }`
* `aliasName : varName as ...`
* `aliasName : count(predicate)`
* `aliasName : max(val(varName))`

An alias provides an alternate name in results.  Predicates, variables and aggregates can be aliased by prefixing with the alias name and `:`.  Aliases do not have to be different to the original predicate name, but, within a block, an alias must be distinct from predicate names and other aliases returned in the same block.  Aliases can be used to return the same predicate multiple times within a block.

Query Example: Directors with `name` matching term `Steven`, their UID, English name, average number of actors per movie, total number of films, and the name of each film in English and French.


    }
    average as avg(val(num_actors))
  }

  films(func: uid(ID)) 
    }
  }
}

