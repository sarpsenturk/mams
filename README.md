# MAMS

MAMS, or the **Medical Management Administration System**, is designed to help
private medical workers, medical clinics or hospitals manage their data in a
fast and reliable way. It's built on top of [express.js](https://expressjs.com/),
[MySQL](https://www.mysql.com/) and [Angular](https://angular.io/)

## Requirements

- [Node.js LTS](https://nodejs.dev/en/)
- MySQL server instance
- [Angular CLI](https://angular.io/cli)

## Getting started

The frontend and the backend are built as separate project and need to be run separately.

### Setting up the database

The 2 scripts for the database are stored in the **sql** folder.

**setup.sql** is necessary to run as it creates the database and the tables themselves along with an
admin user you might wish to change the credentials of.

**create-data.sql** is there to create some dummy data (staff, patients, appointments) to help make testing easier.

### To start the backend:
First you should see the *.env.example* file in the backend folder.

You need to create your *.env* file in the same format to set up the connection to MySQL and the secret for
jsonwebtoken.

Once you've done that you can run:
```
cd frontend && npm install
npm start
```

This will start the express server and connect to the MySQL server
using the credentials you've set up.

Alternatively you can enable hot reloading for the backend by running:

``npm run dev``

### To start the frontend:
```
cd frontend && npm install
npm start
```

This will start serving the Angular frontend locally at http://localhost:4200.

## Using the frontend
### Logging In
When you first visit the frontend you will be greeted by a login page.
Unless you ran the **create-data.sql** script or perhaps if you ran your own script to set up staff,
the only available user will be the admin user, and you will have to login as admin and create
other staff.

### Frontend Pages
The frontend is composed of 2 main routes:

**/home** and **/auth**

- **/home** is protected, and you can't visit it, or it's child pages until you've logged in.
- **/auth** is for login

Once you've logged in and got to **/home** you will see
a bunch of other links to take you where you wish.
- **/home/admin** is for creating, finding and removing staff accounts
- **/home/appointment** is for creating, finding and removing appointments,
- **/home/patient** is for creating, finding and removing patients
