---
title: GraphQL Variables

sidebar_position: 26
---

Syntax Examples (using default values):

* `query title($name: string = "Bauman") { ... }`
* `query title($age: int = "95") { ... }`
* `query title($uids: string = "0x1") { ... }`
* `query title($uids: string = "[0x1, 0x2, 0x3]") { ... }`. The value of the variable is a quoted array.

`Variables` can be defined and used in queries which helps in query reuse and avoids costly string building in clients at runtime by passing a separate variable map. A variable starts with a `$` symbol.
For **HTTP requests** with GraphQL Variables, we must use `Content-Type: application/json` header and pass data with a JSON object containing `query` and `variables`.

```sh
curl -H "Content-Type: application/json" localhost:8080/query -XPOST -d $'
  "query": "query test($a: string) { test(func: eq(name, $a)) { \n uid \n name \n } }",
  "variables": { "$a": "Alice" }
}' | python -m json.tool | less
```


query test($a: int, $b: int, $name: string) 
      }
    }
  }
}


* Variables can have default values. In the example below, `$a` has a default value of `2`. Since the value for `$a` isn't provided in the variable map, `$a` takes on the default value.
* Variables whose type is suffixed with a `!` can't have a default value but must have a value as part of the variables map.
* The value of the variable must be parsable to the given type, if not, an error is thrown.
* The variable types that are supported as of now are: `int`, `float`, `bool` and `string`.
* Any variable that is being used must be declared in the named query clause in the beginning.


query test($a: int = 2, $b: int!, $name: string) 
      }
    }
  }
}


You can also use array with GraphQL Variables.


query test($a: int = 2, $b: int!, $aName: string, $bName: string) 
      }
    }
  }
}


We also support variable substitution in facets.


query test($name: string = "Alice", $IsClose: string = "true") 
    }
      colleague : friend @facets(eq(close, false)) 
    }
  }
}



If you want to input a list of uids as a GraphQL variable value, you can have the variable as string type and
have the value surrounded by square brackets like `["13", "14"]`.
