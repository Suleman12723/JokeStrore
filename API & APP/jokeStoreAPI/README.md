# JokeStoreAPI

This is a JokeStore API. This API is used to GET and POST Jokes.

## API Reference

#### Get all Jokes

```http
  GET /api/joke
```

| Parameter | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `None`    | `string` | Fetch all the Jokes from the DB |

#### Get jokes of some type

```http
  GET /api/joke?type=TYPE
```

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `TYPE`    | `string` | **office** or **friends** |

#### Post a joke

```http
  Post /api/joke
```

| Body     | Type               | Description                        |
| :------- | :----------------- | :--------------------------------- |
| joke     | `string`           | **Required** any joke              |
| jokeType | `Array of strings` | **optional** some category of joke |

## Installation

Clone this project with from github.
Then install the required packages by typing

```bash
    npm install
```

Install Nodemon if not installed already.

```bash
    npm install -g nodemon
```

Or if you don't want to install nodemon

You can edit the script in **package.json**

```bash
    "start":"node app.js"
```

Then run the project using

```bash
    npm start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URL`

Your local or online DB url.

## Cors

Add your Client **Origin** (http://localhost:3001 or something) to the "whiteList array" in **cors.js** file

`const whiteList = ["http://localhost:3000", "http://localhost:3001"];`
