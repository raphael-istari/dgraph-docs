---
title: A Simple Login System

sidebar_position: 7
---


This example is based on part of the [transactions in
v0.9](https://blog.dgraph.io/post/v0.9/) blogpost. Error checking has been
omitted for brevity.


Schema is assumed to be:
```
// @upsert directive is important to detect conflicts.
email: string @index(exact) @upsert . # @index(hash) would also work
pass: password .
```

```
// Create a new transaction. The deferred call to Discard
// ensures that server-side resources are cleaned up.
txn := client.NewTxn()
defer txn.Discard(ctx)

// Create and execute a query to looks up an email and checks if the password
// matches.
q := fmt.Sprintf(`
    
        }
    }
`, email, pass)
resp, err := txn.Query(ctx, q)

// Unmarshal the response into a struct. It will be empty if the email couldn't
// be found. Otherwise it will contain a bool to indicate if the password matched.
var login struct 
    } `json:"login_attempt"`
}
err = json.Unmarshal(resp.GetJson(), &login); err != nil 
        SetJson: []byte(fmt.Sprintf(`{ "email": %q, "pass": %q }`, email, pass)),
    }
    _, err = txn.Mutate(ctx, mu)
    // Commit the mutation, making it visible outside of the transaction.
    err = txn.Commit(ctx)
} else if login.Account[0].CheckPwd 
} else 
}
```
