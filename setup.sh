#! /bin/bash
npm install
touch auth.json
printf "{\n \"username\": \"user here\",\n\"passwd\": \"pass here\"\n}" >> auth.json
