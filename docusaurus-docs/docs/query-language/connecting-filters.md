---
title: Connecting Filters

sidebar_position: 3
---

Within `@filter` multiple functions can be used with boolean connectives.

## AND, OR and NOT

Connectives `AND`, `OR` and `NOT` join filters and can be built into arbitrarily complex filters, such as `(NOT A OR B) AND (C AND NOT (D OR E))`.  Note that, `NOT` binds more tightly than `AND` which binds more tightly than `OR`.

Query Example : All Steven Spielberg movies that contain either both "indiana" and "jones" OR both "jurassic" and "park".



    }
  }
}
