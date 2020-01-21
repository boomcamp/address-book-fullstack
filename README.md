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


1. You should create a responsive UI for three device categories **mobile**,
   **tablet** and **desktop**. There are no exact device requirement, but your
   design should be usable on those three device classes with their respective
   screen sizes.

   > May be a good idea to review responsive design?

2. The look and feel of the application is up to you. Feel free to use existing
   UI libraries, or design your own interface.

   > Working implementations are worth more than a pretty looking interface.

3. Your backend API should require authentication to access the address book
   functionality. You should implement your authorization and sign-in using
   [JSON Web Tokens](https://jwt.io)

## Requirements

### Login / Registration Page:

- When a user first navigates to your application they should be greeted with a
  Login / Registration page.

  - **New Users** - Should have the ability to register to use your Address Book
    application

  - **Existing Users** - Should be able to login to the application with a
    `username` and `password` combination.

  - The login form should have `username` and `password` as required fields.

  - Form field errors should be displayed to the user with a useful message.

  - If login fails, a message notifying the user of the failure should be shown.

- When registered or authenticated the user should then be directed to the main
  Address Book page.

> **Bonus Feature**: See if you can implement auto-login if a user still has a
> valid token from their last login. This would require storage of the token in
> the browser. Research browser local storage if you're implementing this
> feature.

### Address Book Page:

- This is the where a user can complete the various actions required for a
  useful Address Book application.

- **UI Requirements**:
  - **A list of saved user contacts should be displayed**:
    - This list should display a consolidated view of the contact information
      `first_name`, `last_name` and `phonenumber`.
    - The list should be sortable by `last_name`, the sorting should utilize the
      database.
    - The list should be searchable by `first_name` and `last_name`.
    - When a contact is selected from this list a detailed contact view of some
      kind should be shown. The detailed view should show all editable
      information for the selected contact.
  - **A detailed contact view**:
    - Should display all editable information about contact.
    - Have a way to edit and then save selected contact information.
  - **A way to CREATE new contacts and save them to the user's address book.**
    - Form should have appropriate validation and error messages.
  - **A way to DELETE contacts from the address book.**
    - A confirmation should be used before deleting a contact.
  - **A way for a user to logout of the application**
    - A logout should remove their authorization and redirect them to the login
      page.

> **Bonus Feature**: Create a way to add contacts to groups, and then a way to
> toggle the display of contacts in groups or just as a list.

## Database Design

We won't give you too many clues here, as it's part of the exercise but remember
to think about how the various entities relate to one another and how you would
query them. This application will most likely require the following entities.

- User - you decide the columns
- Address Book - you decide the columns
- Contact
  - first_name - \*required
  - last_name
  - home_phone
  - mobile_phone
  - work_phone
  - email
  - city
  - state_or_province
  - postal_code
  - country
- Group - \*only if implementing the bonus feature

# Finished

Submit a link to your fork of this repository to the Google Classroom assignment
related to this project.
