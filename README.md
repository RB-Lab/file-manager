
# File Manager

## Installation

```bash
$ git clone git@github.com:RB-Lab/file-manager.git
$ npm i
```

## Running the project

### Running the mock API

```bash
$ npm run mock-api
```

### Running project in development mode

```bash
$ npm start
```

### Running tests

```bash
$ npm test
```
Be patient Jest is **extremely slow** especially when start up for the first time. 

### Building project
If you prefer to just build without the live reload and build-on-each-change watcher, run:

```bash
$ npm run build
```

## Capabilities 

- sorting
- filtering
- retrieving folders from server (you can move up and down through the folder structure)
- notifiyng the HTTP errors
