#!/bin/bash

tail -f $LOGDIR/*.log | nc $ELK_IP:5000

