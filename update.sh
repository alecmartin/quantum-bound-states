#!/bin/bash

for DIR in $(find . -maxdepth 1 -type d | grep -v -e "griddle\|^\.$" ); do
    echo $DIR
    cd $DIR
    git pull
    npm install
    cd ..
done
