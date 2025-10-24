---
title: Introduction
description: Dgraph Learn - Build a Message Board App in React. Deploy a backend for each app you build with Dgraph Cloud.
sidebar_position: 2
---

In Dgraph Cloud, an app is served by a GraphQL backend powered by Dgraph
database. You should deploy a backend for each app you build, and potentially
backends for test and development environments as well.

For this tutorial, you will just deploy one backend for development.

- Follow the instructions to provision a backend



The URL listed in "GraphQL Endpoint" is the URL at which Dgraph Cloud will serve data to your app.  You'll need that for later, so note it down --- though you'll always be able to access it from the dashboard.  There's nothing at that URL yet, first you need to design the GraphQL schema for the app.

## Move on to schema design

Let's now move on to the design process - it's graph-first, in fact, it's
GraphQL-first. You'll design the GraphQL types that your app is based around,
learn about how graphs work and then look at some example queries and mutations.
