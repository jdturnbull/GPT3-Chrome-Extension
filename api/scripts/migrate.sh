#!/usr/bin/env bash

if ! [ $2 == '--env' ]
then
  echo 'Missing environment path'
else
  export $(cat $3 | xargs) > /dev/null
  node_modules/knex/bin/cli.js migrate:$1
fi
