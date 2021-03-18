# API that fetch top trending feed from Youtube

## Deployed url 👍

https://blustack-backend.herokuapp.com/

## How to run the application locally

```
1 Clone the repo

2) you need to set the .env file containing :

API_KEY=AIzaSyD567T_jk0PbB9G-i85nhuyVr0x3zXjhog

PORT=5000

DB_PASSWORD=118209@deepak

DB_URI=mongodb+srv://chhandacharan:118209@deepak@cluster0.gdc5c.mongodb.net/youtube-trending?retryWrites=true&w=majority
3) for development:
   ->npm install
   ->npm run dev

```

Endpoints Info

| Endpoints      | Response body                             |
| -------------- | ----------------------------------------- |
| /api/v1/videos | returns the top trending video document   |
| /api/v1/:id    | returns the data related to specific feed |
