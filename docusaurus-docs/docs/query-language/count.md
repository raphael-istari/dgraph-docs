---
title: Count

sidebar_position: 6
---

Syntax Examples:

* `count(predicate)`
* `count(uid)`

The form `count(predicate)` counts how many `predicate` edges lead out of a node.

The form `count(uid)` counts the number of UIDs matched in the enclosing block.

Query Example: The number of films acted in by each actor with `Orlando` in their name.



  }
}


Count can be used at root and [aliased](/docs/query-language/alias).

Query Example: Count of directors who have directed more than five films.  When used at the query root, the [count index](/docs/dql/dql-schema#count-index) is required.



  }
}



Count can be assigned to a value variable.

Query Example: The actors of Ang Lee's "Eat Drink Man Woman" ordered by the number of movies acted in.



      }
    }
  }

  edmw(func: uid(actors), orderdesc: val(totalRoles)) 
  }
}

