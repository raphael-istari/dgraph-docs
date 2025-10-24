---
title: External IDs and Upsert Block

sidebar_position: 4
---

The upsert block makes managing external IDs easy.

Set the schema.
```
xid: string @index(exact) .
<http://schema.org/name>: string @index(exact) .
<http://schema.org/type>: [uid] @reverse .
```

Set the type first of all.
```

  }
}
```

Now you can create a new person and attach its type using the upsert block.
```
   upsert 
        }
        var(func: eq(<http://schema.org/name>, "Robin Wright")) 
        }
      }
      mutation 
          }
      }
    }
```

You can also delete a person and detach the relation between Type and Person Node. It's the same as above, but you use the keyword "delete" instead of "set". "`http://schema.org/Person`" will remain but "`Robin Wright`" will be deleted.

```
   upsert 
        }
        var(func: eq(<http://schema.org/name>, "Robin Wright")) 
        }
      }
      mutation 
          }
      }
    }
```

Query by user.
```

    }
  }
}
```