---
title: Math on Value Variables

sidebar_position: 12
---

Value variables can be combined using mathematical functions.  For example, this could be used to associate a score which is then used to order or perform other operations, such as might be used in building news feeds, simple recommendation systems, and so on.

Math statements must be enclosed within `math( <exp> )` and must be stored to a value variable.

The supported operators are as follows:

| Operators                       | Types accepted                                 | What it does                                                   |
| :------------:                  | :--------------:                               | :------------------------:                                     |
| `+` `-` `*` `/` `%`             | `int`, `float`                                     | performs the corresponding operation                           |
| `min` `max`                     | All types except `geo`, `bool`  (binary functions) | selects the min/max value among the two                        |
| `<` `>` `<=` `>=` `==` `!=`     | All types except `geo`, `bool`                     | Returns true or false based on the values                      |
| `floor` `ceil` `ln` `exp` `sqrt` | `int`, `float` (unary function)                    | performs the corresponding operation                           |
| `since`                         | `dateTime`                                 | Returns the number of seconds in float from the time specified |
| `pow(a, b)`                     | `int`, `float`                                     | Returns `a to the power b`                                     |
| `logbase(a,b)`                  | `int`, `float`                                     | Returns `log(a)` to the base `b`                               |
| `cond(a, b, c)`                 | first operand must be a Boolean                | selects `b` if `a` is true else `c`                            |



If an integer overflow occurs, or an operand is passed to a math operation (such as `ln`, `logbase`, `sqrt`, `pow`)
which results in an illegal operation, Dgraph will return an error.


Query Example:  Form a score for each of Steven Spielberg's movies as the sum of number of actors, number of genres and number of countries.  List the top five such movies in order of decreasing score.



		}
	}

	TopMovies(func: uid(films), orderdesc: val(score), first: 5)
	}
}


Value variables and aggregations of them can be used in filters.

Query Example: Calculate a score for each Steven Spielberg movie with a condition on release date to penalize movies that are more than 20 years old, filtering on the resulting score.



    }
  }

  TopMovies(func: uid(films), orderdesc: val(score)) @filter(gt(val(score), 2))
  }
}



Values calculated with math operations are stored to value variables and so can be aggregated.

Query Example: Compute a score for each Steven Spielberg movie and then aggregate the score.



		}
		directorScore as sum(val(score))
	}

	score(func: uid(steven))
	}
}

