# About

# Folders
## src/session
Package for handling pseudo authentication, restrict access and maintains list / sate of connected users

## src/schedule
package to provide an easy way to schedule actions (from connectors) throught bot interface :
* dedicated dialog to list / add / remove schedule
* generic functions and interfaces

## src/connectors
custom code to execute dedicated actions (ie call an external service to get weather, image recognition, etc...)

Connectors could be triggered on demand or scheduled

## dist 
compiled (tsc) js from typescript (conveniance for heroku).


# compile
> `npm install`

> `npm run tsc`

# run
> node dist/app.js