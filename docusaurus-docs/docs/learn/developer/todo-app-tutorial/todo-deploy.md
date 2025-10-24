---
title: Deploying on Dgraph Cloud
description: "In just two steps on Dgraph Cloud (deployment & schema), you get a GraphQL API that you can easily use in any application."
sidebar_position: 7
---

Let's now deploy our fully functional app on Dgraph Cloud [cloud.dgraph.io](https://cloud.dgraph.io).

### Create a deployment

After successfully logging into the site for the first time, your dashboard should look something like this.

![Dgraph Cloud: Get Started](/images/graphql/tutorial/todo/cloud-1.png)

Let's go ahead and launch a new deployment.

![Dgraph Cloud: Create deployment](/images/graphql/tutorial/todo/cloud-2.png)

We named our deployment `todo-app-deployment` and set the optional subdomain as
`todo-app`, using which the deployment will be accessible. We can choose any
subdomain here as long as it is available.

Let's set it up in AWS, in the US region, and click on the *Launch* button.

![Dgraph Cloud: Deployment created](/images/graphql/tutorial/todo/cloud-3.png)

Now the backend is ready.

Once the deployment is ready, let's add our schema there (insert your public key) by going to the schema tab.

```graphql
type Task @auth(
    query: 
                user(filter: { username: { eq: $USER } }) 
                }
            }
        }"""}), 
}
type User 
}
# Dgraph.Authorization {"VerificationKey":"<AUTH0-APP-PUBLIC-KEY>","Header":"X-Auth-Token","Namespace":"https://dgraph.io/jwt/claims","Algo":"RS256","Audience":["<AUTH0-APP-CLIENT-ID>"]}
```

Once the schema is submitted successfully, we can use the GraphQL API endpoint.

Let's update our frontend to use this URL instead of localhost. Open `src/config.json` and update the `graphqlUrl` field with your GraphQL API endpoint.

```json

}
```

That's it! Just in two steps on Dgraph Cloud (deployment & schema), we got a GraphQL API that we can now easily use in any application!
