# Small-Project

## Running the Server and App
- To run both concurrently go into the contactManagerServer directory from terminal
- or command prompt use 'npm run dev'
- 
- The server is running on port 5000 and the app is on port 3000
- App: http://localhost:3000
- Server: http://localhost:5000
- 
- If you get an error trying to run the project make sure you have installed all
- of the dependencies. To do this go to the contactManagerServer directory and just
- type 'npm install' in the terminal or command prompt. Do the same in client
- directory, again type 'npm install' in the terminal. Then go back to contactManagerServer
- and try booting it up. If this still doesn't work check your log to see the problem.

## Extra Info
- For now and in the future we are only using the directories "client" and
- "contactManagerServer" to run the project unless we add other stuff.
- So ignore html, util, etc... I don't believe we need the 'package-lock.json' and
- 'package.json' in the main Small-Project directory but I kept them just in case
- they are actually doing something (not sure).
- 
- I don't know if the server is running correctly, when I run it it says it's up
- but get /GET. So maybe I am running it incorrectly through concurrently (Easy fix).

## Whats Left?
- Adding the contact manager page.
- Connecting the app to the server.
- Launching the project to Heroku