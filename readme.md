#Form Generator

A bunch of stuff to generate our forms for HCI.

##How To Use

Install node and then inside this dir run `npm install` to install dependencies.

Then type `node run.js --all` to run all generators.

or

`node run.js --text` to just run the lorem text input generator

or

`node run.js --checkbox` to just run the lorem checkbox generator

or

`node run.js --training` to just run the training questionnaire generator

##Running response server
Install node and then inside this dir run `npm install` to install dependencies.

Then type `node app.js` to start up the server. Navigate to `localhost:3000` in your browser to view questionnaires.

Responses are recorded in CSV format in the `/out` directory. 

Remove the csv files to reset responses.