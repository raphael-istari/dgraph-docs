---
title: "\"@normalize Directive\""

sidebar_position: 17
---

With the `@normalize` directive, only aliased predicates are returned and the result is flattened to remove nesting.

Query Example: Film name, country and first two actors (by UID order) of every Steven Spielberg movie, without `initial_release_date` because no alias is given and flattened by `@normalize`


        }
        performance.character 
        }
      }
      country 
      }
    }
  }
}


You can also apply `@normalize` on nested query blocks. It will work similarly but only flatten the result of the nested query block where `@normalize` has been applied. `@normalize` will return a list irrespective of the type of attribute on which it is applied.


        }
        performance.character 
        }
      }
      country 
      }
    }
  }
}
