---
title: Get Started with Dgraph - Geolocation

sidebar_position: 8
---

**Welcome to the eight tutorial of getting started with Dgraph.**

In the previous tutorial,
we learned about building a twitter-like user-search feature using
Dgraph's fuzzy search.

In this tutorial, we'll build a graph of tourist locations around San Francisco and
help our Zoologist friend, Mary, and her team in their mission to conserve birds
using Dgraph's geolocation capabilities.

You might have used Google to find the restaurants near you or to find the shopping
centers within a mile of your current location. Applications like these make use of
your geolocation data.

Geolocation has become an integral part of mobile applications, especially with the
advent of smartphones in the last decade, the list of applications which revolves
around users location to power application features has grown beyond imagination.

Let's take Uber, for instance, the location data of the driver and passenger is
pivotal for the functionality of the application. We're gathering more GPS data
than ever before, being able to store and query the location data efficiently can
give you an edge over your competitors.

Real-world data is interconnected; they are not sparse; this is more relevant when it comes
to location data. The natural representation of railway networks, maps, routes are graphs.

The good news is that [Dgraph](https://dgraph.io), the world's most advanced graph database,
comes with functionalities to efficiently store and perform useful queries on graphs containing
location data. If you want to run queries like `find me the hotels near Golden Gate Bridge`,
or find me all the tourist location around `Golden Gate Park`, Dgraph has your back.

First, let's learn how to represent Geolocation data in Dgraph.

## Representing Geolocation data
You can represent location data in Dgraph using two ways:

- **Point location**

Point location contains the geo-coordinate tuple (latitude, longitude) of your location of interest.

The following image has the point location with the latitude and longitude for the Eifel tower in
Paris. Point locations are useful for representing a precise location; for instance, your location
when booking a cab or your delivery address.



- **Polygonal location**

It's not possible to represent geographical entities which are spread across multiple
geo-coordinates just using a point location. To represent geo entities like a city, a
lake, or a national park, you should use a polygonal location.

Here is an example:



The polygonal fence above represents the city of Delhi, India. This polygonal fence
or the geo-fence is formed by connecting multiple straight-line boundaries, and
they are collectively represented using an array of location tuples of format
`[(latitude, longitude), (latitude, longitude), ...]`. Each tuple pair
`(2 tuples and 4 coordinates)` represents a straight line boundary of the geo-fence,
and a polygonal fence can contain any number of lines.

Let's start with building a simple San Francisco tourist graph, here's the graph model.



The above graph has three entities represented by the nodes:

- **City**

A `city node` represents the tourist city.
Our dataset only contains the city of `San Francisco`, and a node in the graph represents it.

- **Location**

A location node, along with the name of the location, it contains the point
or polygonal location of the place of interest.

- **Location Type**

A location type consists of the type of location.
There are four types of location in our dataset: `zoo`, `museum`, `hotel` or a `tourist attraction`.

The `location nodes` with geo-coordinates of a `hotel` also contains their pricing information.

There are different ways to model the same graph.
For instance, the `location type` could just be a property or a predicate of the `location node`,
rather than being a node of its own.

The queries you want to perform or the relationships you like to explore mostly influence
the modeling decisions. The goal of the tutorial is not to arrive at the ideal graph model,
but to use a simple dataset to demonstrate the geolocation capabilities of Dgraph.

For the rest of the tutorial, let's call the node representing a `City` as a `city`
node, and the node representing a `Location` as a `location` node, and the node
representing the `Location Type` as a `location type` node.

Here's the relationship between these nodes:

- Every `city node` is connected to a `location node` via the `has_location ` edge.
- Every `location node` is connected to its node representing a `location type`
via the `has_type` edge.

_Note: Dgraph allows you to associate one or more types for the nodes
using its type system feature, for now, we are using nodes without types,
we'll learn about type system for nodes in a future tutorial. Check
[this page from the documentation site](https://dgraph.io/docs/query-language/#type-system),
if you want to explore type system feature for nodes._

Here is our sample dataset.
Open Ratel, go to the mutate tab, paste the mutation, and click Run.

```json

          },
          "has_type": [
            
            }
          ]
        },
        
          },
          "street": "Ferry Point Road",
          "has_type": [
            
            }
          ]
        },
        
          },
          "street": "California Drive",
          "has_type": [
            
            }
          ]
        },
        
          },
          "street": "7th street",
          "price_per_night": 350.00,
          "has_type": [
            
            }
          ]
        },
        
          },
          "street": "Lombard Street",
          "price_per_night": 400.00,
          "has_type": [
            
            }
          ]
        },
        
          },
          "street": "Van Ness Avenue",
          "price_per_night": 250.00,
          "has_type": [
            
            }
          ]
        },
        
          },
          "street": "Golden Gate Bridge",
          "has_type": [
            
            }
          ]
        },
        
          },
          "street": "7th street",
          "has_type": [
            
            }
          ]
        },
        
          },
          "street": "San Francisco Zoo",
          "has_type": [
            
            }
          ]
        },
        
          },
          "street": "San Francisco Zoo",
          "has_type": [
            
            }
          ]
        },
        
          },
          "street": "Golden Gate Park",
          "has_type": [
            
            }
          ]
        },
        
          },
          "street": "Golden Gate Park",
          "has_type": [
            
            }
          ]
        },
        
          },
          "street": "Golden Gate Park",
          "has_type": [
            
            }
          ]
        }
      ]
    }
  ]
}
```

_Note: If this mutation syntax is new to you, refer to the
first tutorial to learn
the basics of mutations in Dgraph._

Run the query below to fetch the entire graph:

```graphql

      }
    }
  }
}
```

_Note: Check the second tutorial
if you want to learn more about traversal queries like the above one._


Here's our graph!



Our graph has:

- One blue `city node`.
We just have one node which represents the city of `San Francisco`.
- The green ones are the the `location` nodes.
We have a total of 13 locations.
- The pink nodes represent the `location types`.
We have four kinds of locations in our dataset: `museum`, `zoo`, `hotel`, and `tourist attractions`.

You can also see that Dgraph has auto-detected the data types of the predicates from
the schema tab, and the location predicate has been auto-assigned `geo` type.



_Note: Check out the previous tutorial
to know more about data types in Dgraph._

Before we start, please say Hello to `Mary`, a zoologist who has dedicated her
research for the cause of conserving various bird species.

For the rest of the tutorial, let's help Mary and her team of
zoologists in their mission to conserving birds.

## Enter San Francisco: Hotel booking
Several research projects done by Mary suggested that Flamingos thrive better
when there are abundant water bodies for their habitat.

Her team got approval for expanding the water source for the Flamingos in the
San Francisco Zoo, and her team is ready for a trip to San Francisco with Mary
remotely monitoring the progress of the team.

Her teammates wish to stay close to the `Golden Gate Bridge` so that they could
cycle around the Golden gate, enjoy the breeze, and the sunrise every morning.

Let's help them find a hotel which is within a reasonable distance from the
`Golden Gate Bridge`, and we'll do so using Dgraph's geolocation functions.

Dgraph provides a variety of functions to query geolocation data.
To use them, you have to set the `geo` index first.

Go to the Schema tab and set the index on the `location` predicate.



After setting the `geo` index on the `location` predicate, you can use Dgraph's
built-in function `near` to find the hotels near the Golden gate bridge.

Here is the syntax of the `near` function: `near(geo-predicate, [long, lat], distance)`.

The [`near` function](https://dgraph.io/docs/query-language/#near) matches and
returns all the geo-predicates stored in the database which are within `distance meters`
of geojson coordinate `[long, lat]` provided by the user.

Let's search for hotels within 7KM of from a point on the Golden Gate bridge.


Go to the query tab, paste the query below and click Run.

```graphql

    }
  }
}
```



Wait! The search returns not just the hotels, but also all other locations
within 7 Km from the point coordinate on the `Golden Gate Bridge`.

Let's use the `@filter` function to filter for search results containing only the hotels.
You can visit our third tutorial of the series
to refresh our previous discussions around using the `@filter` directive.

```graphql

    }
  }
}
```

Oops, we forgot to add an index while using the `eq` comparator in the filter.



Let's add a `hash` index to the `loc_type` and re-run the query.





_Note: Refer to the third tutorial of
the series to learn more about hash index and comparator functions in Dgraph._

The search result still contains nodes representing locations which are not hotels.
That's because the root query first finds all the location nodes which are within
7KM from the specified point location, and then it applies the filter while
selectively traversing to the `location type nodes`.

Only the predicates in the location nodes can be filtered at the root level, and
you cannot filter the `location types` without traversing to the `location type nodes`.

We have the filter to select only the `hotels` while we traverse the
`location type nodes`. Can we cascade or bubble up the filter to the
root level, so that, we only have `hotels` in the final result?

Yes you can! You can do by using the `@cascade` directive.

The `@cascade` directive helps you `cascade` or `bubble up` the filters
applied to your inner query traversals to the root level nodes, by doing
so, we get only the locations of `hotels` in our result.


```graphql

    }
  }
}
```



Voila! You can see in the result that, after adding the `@cascade` directive
in the query, only the locations with type `hotel` appear in the result.

We have two hotels in the result, and one of them is over their budget of 300$ per night.
Let's add another filter to search for Hotels priced below $300 per night.

The price information of every hotel is stored in the `location nodes` along with
their coordinates, hence the filter on the pricing should be at the root level of
the query, not at the level we traverse the location type nodes.

Before you jump onto run the query, don't forget to add an index on the `price_per_night` predicate.



```graphql

    }
  }
}

```



Now we have a hotel well within the budget, and also close to the Golden Gate Bridge!

## Summary
In this tutorial, we learned about geolocation capabilities in Dgraph,
and helped Mary's team book a hotel near Golden bridge.

In the next tutorial, we'll showcase more geolocation functionalities in
Dgraph and assist Mary's team in their quest for conserving Flamingo's.

See you all in the next tutorial.
Till then, happy Graphing!

Remember to click the "Join our community" button below and subscribe to
our newsletter to get the latest tutorial right into your inbox.

## What's Next?

- Go to [Clients](/docs/dql/clients) to see how to communicate
with Dgraph from your application.
- Take the [Tour](https://dgraph.io/tour/) for a guided tour of how to write queries in Dgraph.
- A wider range of queries can also be found in the [Query Language](/docs/query-language) reference.
- See [Deploy](/docs/deploy) if you wish to run Dgraph
  in a cluster.

## Need Help

* Please use [discuss.dgraph.io](https://discuss.dgraph.io) for questions, feature requests, bugs, and discussions.
