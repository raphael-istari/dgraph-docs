---
title: "\"@ignorereflex Directive\""

sidebar_position: 18
---

The `@ignorereflex` directive forces the removal of child nodes that are reachable from themselves as a parent, through any path in the query result

Query Example: All the co-actors of Rutger Hauer.  Without `@ignorereflex`, the result would also include Rutger Hauer for every movie.



          }
        }
      }
    }
  }
}
