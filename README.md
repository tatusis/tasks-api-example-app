# Tasks API

Tasks API (REST) developed on node.js, express, typeorm and sqlite.

## Requirements

Sqlite3 must be in the system path

## How to use

### Step 0 - Clone the repository

```
git clone https://github.com/tatusis/tasks-api-example-app.git
```

### Step 1 - Go to the folder

```
cd tasks-api-example-app 
```

### Step 2 - Install the dependencies

```
npm install
```

### Step 3 - Build

```
npm run build
```

### Step 4 - Start

```
npm start
```

## REST API

### Return all tasks

```
GET localhost:3000/tasks
```

### Create a new task - You need to pass a json as the request body

* Request example

```
POST localhost:3000/tasks
```

* Request body example

```json
{
    "name": "task name",
    "description": "task description",
    "isDone": false
}
```

### Return a task by ID - You need to pass an ID as a request parameter

* Request example

```
GET localhost:3000/tasks/1
```

### Update a task - You need to pass an ID as a request parameter and a json as the request body

* Request example

```
PUT localhost:3000/tasks/1
```

* Request body example

```json
{
    "isDone": true
}
```

### Remove task

* Request example

```
DELETE localhost:3000/tasks/1
```
