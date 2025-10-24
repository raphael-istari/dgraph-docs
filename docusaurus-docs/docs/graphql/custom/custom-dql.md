---
title: Custom DQL
description: Dgraph Query Language (DQL) includes support for custom logic. Specify the DQL query you want to execute and the Dgraph GraphQL API will execute it.
sidebar_position: 6
---

Dgraph Query Language (DQL) lets you build custom resolvers logic that goes beyond what is possible with the current GraphQL CRUD API.

To define a DQL custom query, use the notation:
```graphql 
 @custom(dql: """
	...
	""")
```


Since v21.03, you can also [subscribe to custom DQL](/graphql/subscriptions/#subscriptions-to-custom-dql) queries.


For example, lets say you had following schema:
```graphql
type Tweets 
}
type User 
}
```

and you wanted to query tweets containing some particular text sorted by the number of followers their author has. Then,
this is not possible with the automatically generated CRUD API. Similarly, let's say you have a table sort of UI
component in your application which displays only a user's name and the number of tweets done by that user. Doing this
with the auto-generated CRUD API would require you to fetch unnecessary data at client side, and then employ client side
logic to find the count. Instead, all this could simply be achieved by specifying a DQL query for such custom use-cases.

So, you would need to modify your schema like this:
```graphql
type Tweets 
}
type User 
}
type UserTweetCount @remote 
}

type Query 
			}
			authorFollowerCount as sum(val(followers))
		}
		queryTweetsSortedByAuthorFollowers(func: uid(authorFollowerCount), orderdesc: val(authorFollowerCount)) 
			}
			timestamp: Tweets.timestamp
		}
	}
	""")

  queryUserTweetCounts: [UserTweetCount] @custom(dql: """
	query 
		}
	}
	""")
}

```

Now, if you run following query, it would fetch you the tweets containing "GraphQL" in their text, sorted by the number
of followers their author has:
```graphql
query 
    }
}
```

There are following points to note while specifying the DQL query for such custom resolvers:

* The name of the DQL query that you want to map to the GraphQL response, should be same as the name of the GraphQL query.
* You must use proper aliases inside DQL queries to map them to the GraphQL response.
* If you are using variables in DQL queries, their names should be same as the name of the arguments for the GraphQL query.
* For variables, only scalar GraphQL arguments like `Boolean`, `Int`, `Float`, etc are allowed. Lists and Object types are not allowed to be used as variables with DQL queries.
* You would be able to query only those many levels with GraphQL which you have mapped with the DQL query. For instance, in the first custom query above, we haven't mapped an author's tweets to GraphQL alias, so, we won't be able to fetch author's tweets using that query.
* If the custom GraphQL query returns an interface, and you want to use `__typename` in GraphQL query, then you should add `dgraph.type` as a field in DQL query without any alias. This is not required for types, only for interfaces.
* to subscribe to a custom DQL query, use the `@withSubscription` directive. See the [Subscriptions article](/graphql/subscriptions/) for more information.

---
