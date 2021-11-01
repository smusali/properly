# Sample API Server for Properly

This repository serves the purpose of being a sample API Service for property listing.

## Description

Please, refer to [description.pdf](./docs/description.pdf) for more information.

## Usage

This can be used as an API Server explained below:

### Running the Server
`npm install && npm start` is enough to start the server but the following containerization method provides a clean method of running this server:
```
docker build . -f Dockerfile -t <username>/properly
docker run -p 8000:8000 -d <username>/properly:latest
```

You can observe the live server by using this snippet:
```
docker logs $(docker ps -a | grep "properly:latest" | awk '{ print $1 }')
```

### API Server

This API Server supporting the following routes and methods:
 * `GET /` displays the details about the API
 * `GET /info` displays the details about the API
 * `GET /listings` displays all the listings available
 * `GET /listings/:type` displays the listings of a given type
 * `POST /listings/:type` creates a new listing for a given type
 * `GET /listings/:type/:id` retrieves a specific listing
 * `PUT /listings/:type/:id` updates a specific listing
 * `DELETE /listings/:type/:id` removes a specific listing

### Unit Testing
Currently, the unit testing coverage is `100%`.

For running unit tests, `npm install && npm test` is enough since `npm test` also includes `npm run lint` which takes care of the linting issues.

The following method provides containerization for unit testing as well:
```
docker build . -f Dockerfile -t <username>/unitproperly
docker run -d <username>/unitproperly:latest
```

You can check the results by using this snippet:
```
docker logs $(docker ps -a | grep "unitproperly:latest" | awk '{ print $1 }')
```

## Improvements
Please, refer to [improvements.md](./docs/improvements.md) for the potential, possible, and available improvements.

## License
This package has been published under an MIT license. See the [LICENSE](./LICENSE) file and https://opensource.org/licenses/MIT
