FROM debian:wheezy

MAINTAINER Container Solutions <info@container-solutions.com>

RUN apt-get update && apt-get -y install netcat

ADD start.sh /usr/bin/start.sh
RUN chmod +x /usr/bin/start.sh
CMD /usr/bin/start.sh

