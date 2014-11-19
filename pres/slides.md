# Basic docker commands

-

## Images

### Pull an image from the repository
<pre><code>docker pull dockerfile/elasticsearch
docker pull node
docker pull ubuntu
docker pull quintenk/small
docker pull smatochkin/elk
</code></pre>

### Check out the images present on the host
<pre><code>docker images</code></pre>

### Removing
<pre><code>docker rmi quintenk/small</code></pre>

### Check out intermediate file layers
<pre><code>docker images -a</code></pre>

-

## Containers
### A container with a finishing command
<pre><code>docker run ubuntu echo "hello world"
docker ps
docker ps -a
docker rm CONTAINER_HASH</code></pre>

### A better way for that
<pre><code>docker run --rm ubuntu echo "hello world"</code></pre>

### Interactive containers
<pre><code>docker run -it ubuntu /bin/bash
docker ps
root@1234abcd: exit
docker start
docker attach</code></pre>

### Daemon container
<pre><code>docker run -d dockerfile/elasticsearch
docker exec CONTAINER ls
docker stop</code></pre>

-

## The pid namespace
<br/>
### Start another container
<pre><code>docker run --rm -it ubuntu /bin/bash</code></pre>

### View processes in container
<pre><code>root@abcd1234: ps -ef</code></pre>

### View processes on host
<pre><code>ps -ef | grep /bin/bash</code></pre>

### ... using the docker cli
<pre><code>docker top</code></pre>
<br/>

### No user namespace yet

---

# Creating and extending images

-

## Using commit, demo
<br/>

- commit
- push
- pull

-

## Using a Dockerfile

<pre><code>FROM ubuntu / ubuntu:14.04
MAINTAINER Quinten Krijger
</code></pre>

-

## Exercise 1
<br/>
Create a containerized nodejs hello world application and visit it in your browser.

<br/>

- see nodejs.org
- use the downloaded base image "node"
- use a Dockerfile and name your image

<br/>

p.s. you will not be able to connect to localhost in the container, so listen on 0.0.0.0


-

<pre><code>docker run --name es -d dockerfile/elasticsearch
docker inspect
</code></pre>

http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/search-search.html

docker run --rm -it --link es:es ubuntu /bin/bash

env

curl -XPUT 'http://localhost:9200/twitter/tweet/1' -d '{
    "name" : "claudius",
    "post_date" : "2014-11-15T14:12:12",
    "message" : "boo!"
}'

curl -XPUT 'http://172.17.0.114:9200/twitter/tweet/1' -d '{
    "name" : "claudius",
    "post_date" : "2014-11-15T14:12:12",
    "message" : "boo!"
}'

apt-get update && apt-get install curl
curl -XPUT 'http://es:9200/twitter/tweet/1' -d '{
    "name" : "container_writer_bot",
    "post_date" : "2014-11-15T14:12:12",
    "message" : "message"
}'

---

## More resources
- Docker weekly
- 
