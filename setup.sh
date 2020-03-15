#! /bin/bash
npm install -g node-modules
npm install express
npm install body-parser
npm install mysql
npm install mongoose
touch auth.json
printf "{\n \"user\": \"user here\",\n\"pass\": \"pass here\"\n}" >> auth.json
