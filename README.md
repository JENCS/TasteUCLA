# TasteUCLA
UCLA CS35L Fall 2023 Group Project

Professor Eggert

Team JENCS
  - Tanisaka, Nanako
  - Deng, Sylvia
  - An, Eunsoo
  - Omomo, Cain
  - Houston, Jarod

TasteUCLA uses a MERN stack, using [MongoDB](https://www.mongodb.com/), [Express](https://expressjs.com/), [React.js](https://react.dev/), and [Node.js](https://nodejs.org/). We also use [MongooseJS](https://mongoosejs.com/), [Vite](https://vitejs.dev), and [TailwindCSS](https://tailwindcss.com).

# Setup

### Download the repository

```bash
$ git clone https://github.com/JENCS/TasteUCLA
```

### Launch the backend and database server:
#### To allow the backend server to connect to MongoDB, we must include a file named: `/TasteUCLA/backend/.env` in the root of the backend server. First, create two access tokens for the access and refresh tokens you will put into your ".env" file to connect to the MongoDB database by running the following command twice in a node environment and saving the two outputs:
```node
> require('crypto').randomBytes(64).toString('hex')
```

Insert into your the ".env" file the database URI of your MongoDB server and the two tokens generated from the previous step:
``` 
DATABASE_URI=<MONGODB URI HERE>
PORT=5555
ACCESS_TOKEN_SECRET=<TOKEN 1 HERE>
REFRESH_TOKEN_SECRET=<TOKEN 2 HERE>
```

### Launch the frontend server:
```bash
$ cd TasteUCLA/frontend
$ npm install
$ npm run preview
```

#### Launch the backend server
```bash
$ cd TasteUCLA/backend
$ npm install
$ npm run start
```
Connect to the frontend server at 
```
http://localhost:4173
```
Connect to the backend server at
```
http://localhost:5555
```

## Contributors

#### [Cain Omomo](https://github.com/cainmo)
#### [Eunsoo An](https://github.com/eunsooan)
#### [Nanako Tanisaka](https://github.com/nt7895)
#### [Sylvia Deng](https://github.com/sylviaden319)
#### [Jarod Houston](https://github.com/jarodhouston)
