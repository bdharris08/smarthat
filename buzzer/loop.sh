#!/bin/bash          
for i in {1..32}
do
   node index.js $i 500
   sleep 2
done
