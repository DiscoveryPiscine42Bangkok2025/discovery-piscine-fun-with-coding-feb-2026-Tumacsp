#!/bin/bash

if [ $# -eq 0 ]; then
    echo "No arguments provided."
    exit 0
fi

echo "Displaying up to the first 3 arguments:"

for i in {1..3}; do
    arg=${!i}
    
    if [ -n "$arg" ]; then
        echo "Argument $i: $arg"
    fi
done
