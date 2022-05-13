## PERN JWT App
## Prerequisites
[PostGres](https://www.postgresql.org/).
[NodeJS](https://www.nodejs.org/).
[Express](https://www.expressjs.com/).
[React](https://www.reactjs.org/).
[JSON Web Tokens](https://jwt.io/).
[Material-UI](https://material-ui.com/).
[bcrypt](https://www.npmjs.com/package/bcryptjs).

### Getting Started
In the project directory, you can run:
### `npx create-react-app client`

This will create the front end of the application.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

In the client directory, you can run:
### `npm install`

This will install all the packages.

In the server directory, you can run:
### `npm install`

This will install all the packages for the server side.

### App Usage

This app requires you to already have Postgres, NodeJS and Express installed on your computer. If not, please refer to the links above to download whichever is lacking. Once you have everything installed then you can start the Postgres, backend and client servers. Once you have the application open then you can register and login your users. The token will be stored in local storage. The home and dashboard pages do not link to anything and the images are being generated from unsplash.com. The use case for this application is a preliminary exercise into how an application can be made with this stack and how you can create authorization, public and private routes for your app to function the way you would like it to. Further pages and components would need to connect to the context and public and private routes would need to be generated in App.jsx accordingly. 