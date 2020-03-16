#! /bin/bash
npm install -g node-modules
npm install express
npm install body-parser
npm install mysql
npm install mongoose
npm install express-session
touch auth.json
printf "{\n \"username\": \"user here\",\n\"passwd\": \"pass here\"\n}" >> auth.json
