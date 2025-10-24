---
title: Learning Environment

sidebar_position: 2
---

To learn about Dgraph and the components, you can install and run Dgraph cluster on a single host using Docker, Docker Compose, or Dgraph command line.

 

Dgraph cluster can be setup running as containers on a single host.

To evaluate Dgraph on Windows and macOS use the standalone Docker image.


#### Before you begin

Ensure that you have installed:
 * Docker [Desktop](https://docs.docker.com/desktop/) (required for windows or mac)
 * Docker [Engine](https://docs.docker.com/engine/install/)


#### Launch a Dgraph standalone cluster using Docker
1.  Select a name `<CONTAINER_NAME>` for you Docker container and create a directory `<GRAPH_DATA_PATH>` that will hold the Dgraph data on your local file system.
1.  Run a container with the dgraph/standalone image:
    ```sh
       docker run --name <CONTAINER_NAME> -d -p "8080:8080" -p "9080:9080" -v <DGRAPH_DATA_PATH>:/dgraph dgraph/standalone:latest
    ```
1. Optionally launch [Ratel UI](/docs/ratel/overview) using the dgraph/ratel docker image :
    ``` sh
    docker run --name ratel  -d -p "8000:8000"  dgraph/ratel:latest
    ```
You can now use Ratel UI on your browser at localhost:8000 and connect to you Dgraph cluster at localhost:8080
#### Setup a Dgraph cluster on a single host using Docker

1. Get the `<IP_ADDRESS>` of the host using:
   ```sh
      ip addr  # On Arch Linux
      ifconfig # On Ubuntu/Mac
   ```
1. Pull the latest Dgraph image using docker:
   ```sh
      docker pull dgraph/dgraph:latest
   ```
1. Verify that the image is downloaded:

   ```sh
      docker images
    ```   
1. Create a `<DGRAPH_NETWORK>` using:
    ```sh
       docker network create <DGRAPH_NETWORK>
    ```
1.  Create a directory `<ZERO_DATA>`to store data for <abbr title="Zero nodes control the Dgraph cluster. It assigns Alpha nodes to groups, re-balances data between groups, handles transaction timestamp and UID assignment.">Dgraph Zero</abbr> and run the container:
    ```sh
       mkdir ~/<ZERO> # Or any other directory where data should be stored.

       docker run -it -p 5080:5080 --network <DGRAPH_NETWORK> -p 6080:6080 -v ~/<ZERO_DATA>:/dgraph dgraph/dgraph:latest dgraph zero --my=<IP_ADDRESS>:5080
    ```
1.  Create a directory `<ALPHA_DATA_1>` to store for <abbr title="Alpha nodes host predicates and indexes. You can scale Dgraph horizontally by adding more Alphas.">Dgraph Alpha
</abbr> and run the container:
    ```sh
     mkdir ~/<ALPHA_DATA_1> # Or any other directory where data should be stored.

     docker run -it -p 7080:7080 --network <DGRAPH_NETWORK> -p 8080:8080 -p 9080:9080 -v ~/<ALPHA_DATA_1>:/dgraph dgraph/dgraph:latest dgraph alpha --zero=<IP_ADDRESS>:5080 --my=<IP_ADDRESS>:7080
    ```
1.  Create a directory `<ALPHA_DATA_2>` to store for the second <abbr title="Alpha nodes host predicates and indexes. You can scale Dgraph horizontally by adding more Alphas.">Dgraph Alpha
</abbr> and run the container:
    ```sh
       mkdir ~/<ALPHA_DATA_2> # Or any other directory where data should be stored.

       docker run -it -p 7081:7081 --network <DGRAPH_NETWORK> -p 8081:8081 -p 9081:9081 -v ~/<ALPHA_DATA_2>:/dgraph dgraph/dgraph: dgraph alpha --zero=<IP_ADDRESS>:5080 --my=<IP_ADDRESS>:7081  -o=1
    ```
    To override the default ports for the second Alpha use `-o`.    
1.   Connect the Dgraph cluster that are running using https://play.dgraph.io/. For information about connecting, see [Ratel UI](/docs/ratel/connection).     




You can run Dgraph directly on a single Linux host.

#### Before you begin

Ensure that you have:
* Installed [Dgraph](/docs/deploy/installation/download) on the Linux host.
* Made a note of the `<IP_ADDRESS>` of the host.

#### Using Dgraph Command Line
You can start Dgraph on a single host using the dgraph command line.

1. Run Dgraph zero
   ```sh
      dgraph zero --my=<IP_ADDRESS>:5080
   ```
   The `--my` flag is the connection that Dgraph alphas dial to talk to zero. So, the port `5080` and the IP address must be visible to all the Dgraph alphas. For all other various flags, run `dgraph zero --help`.

1. Run two Dgraph alpha nodea:
   ```sh
      dgraph alpha --my=<IP_ADDRESS>:7080 --zero=localhost:5080
      dgraph alpha --my=<IP_ADDRESS>:7081 --zero=localhost:5080 -o=1
   ```
   Dgraph alpha nodes use two directories to persist data and [WAL logs](/docs/design-concepts/consistency-model), and these directories must be different for each alpha if they are running on the same host. You can use `-p` and `-w` to change the location of the data and WAL directories.To learn more about other flags, run `dgraph alpha --help`.

1. Connect the Dgraph cluster that are running using https://play.dgraph.io/. For information about connecting, see [Ratel UI](/docs/ratel/connection).

