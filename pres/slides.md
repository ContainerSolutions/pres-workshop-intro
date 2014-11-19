# Docker workshop

Quinten Krijger

Jaroslav Holub

[Container Solutions]

---

## Before we start with Docker

- Checkout https://github.com/ContainerSolutions/pres-workshop-intro.git
- Setup VM to use at least 2 GB
- Group up: javascript (nodejs), linux, common sense

---

## Docker

### Real Devops, deliver deployables
### Resource optimization
### Isolation (microservice mindset)
### NO multi-server orchestration etc.

---

# Basic commands (Ex. 0)

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

- diff
- commit
- push
- pull

-

## Using a Dockerfile

<pre><code># compile time
FROM ubuntu / ubuntu:14.04
MAINTAINER Quinten Krijger
RUN apt-get update && apt-get install -y curl
ADD src dst

# run time (meta data)
EXPOSE 8080
CMD /bin/start.sh
</code></pre>

<br/>

Demo

-

## Exercise 1
<br/>

- Create a containerized nodejs hello world application
- Use a Dockerfile
- Use downloaded docker image "node"
- Start (with --name) and visit it in your browser

<br/>

### Resources

- see nodejs.org for an hello world example
- you will not be able to connect to localhost in the container from the host, so listen on 0.0.0.0

---

## Linking containers

-

<pre><code>docker run --name my_name -d image_1 command
docker run --link my_name:expected_name -d image_2 command</code></pre>

## Exercise 2.alpha

- Run dockerfile/elasticsearch
- Run a container that links to it with /bin/bash and check output of "env"
- Create an important person (ES has startup time)
- Query for important persons
- Query for important persons from the 2nd container, using the dns entry

<pre><code>curl -XPUT 'http://localhost:9200/crm/people/1' -d '{
    "name" : "claudius",
    "importance" : "high"
}'</code></pre>

<pre><code>curl -XGET 'http://localhost:9200/crm/people/_search?q=importance:high'</code></pre>

-

## Exercise 2

- Update your node image to retrieve data from elasticsearch
- Use that in the page

Resource

- http://nodejs.org/api/http.html#http_http_request_options_callback

---

## Volumes

### data containers

-

Exercise 3

- Create a named data container for some directory and run it.
- Update your node to log a syslog-like statement each request to a file in that directory.
- Run node with --volumes-from the data container
- Verify the logfile is updated on requests

Resource

- http://nodejs.org/api/fs.html#fs_fs_appendfilesync_filename_data_options

---

Exercise 4

- Start ELK container
- Find the IP address of the ELK container
- Visit Kibana dashboard (ELK:80)
- Create a container that can read logfiles and push it to Logstash (ELK:5000)

Resources

- do NOT use linking
- docker run -e "key=value" image
- nc IP:PORT data
- tail -f dir/*.log

---

## Do not be a stranger

- Twitter: @qkrijger, @containersoluti
- LinkedIn
- Blogs at containersol.com
