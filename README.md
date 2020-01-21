# Project Summary - Fullstack Address Book

The set of technologies you'll be required to use are as follows

- Web application and UI - [React.js](https://reactjs.org/)
- Backend Server / API - [Node.js](https://nodejs.org) using the
  [express](https://expressjs.com/) server framework
- Database - [PostgreSQL](https://www.postgresql.org/)

## Getting Started

start the docker container for postgres database using the following command (or anything as such)

`docker-compose up db`

to run the react app and the backend concurrently use the following command

`npm run dev`

## Walktrough and Implemented Functionalities

### Login / Registration

1. Click sign-up link to register as a user then if succesful the user will be redirected to the login page which will redirect the user to the main page of the app given the proper information is provided.

### Address Book Page

  #### Contacts Table
  - to add user click the `+` icon. a tab will be open, input proper info to continue.
  - to edit, click a given row within the table
  - to delete, interact with the trash icon of a given row

  #### Top Bar  
  - to add or edit a selected user click `Contact Form`
  - click `Contact Groups` to open all active groups

  #### Sort
  - Click the sort select button to sort by `last_name`, either ascending or descending in order

  **Creator/Jeffrey R. Molleno**