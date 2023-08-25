# Keeper API - Contacts and Users Management

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Keeper API is a RESTful API designed to help you manage contacts while maintaining user authentication. It's perfect for applications that require user registration and login along with the ability to store and manipulate contact information.

## Features

- User Authentication: Register and log in users securely.
- Contacts Management: Create, retrieve, update, and delete contacts.
- Data Validation: Input validation to ensure data integrity.
- API Security: Implementing authentication and authorization to protect data.
- Comprehensive Documentation: Detailed API documentation using Swagger.
- Extendable: Easily add more features based on your application's needs.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/keeper-api.git
   cd keeper-api
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables:
   * create .env file and setup the following parameters
   ```env
   PORT=<Port number>
   ACCESS_TOKEN_SECRET=<SECRET_CODE>
   ```
4. Set up the database
    * set up the MongoDB database
    * update the connection string in .env file

    ```env
   PORT=<Port number>
   ACCESS_TOKEN_SECRET=<SECRET_CODE>
   CONNECTION_STRING:<mongoDB connection string>
   ```

## Usage
Keeper API provides a range of endpoints for user authentication and contact management. Detailed information about these endpoints can be found in the [API Documentation](#api-documentation).

## API Documentation
Comprehensive API documentation is available at http://localhost:5001/api/docs. This interactive documentation provides detailed information about each endpoint, request formats, response structures, and required authentication.

## Authentication
Keeper API uses JSON Web Tokens (JWT) for user authentication. Upon successful registration or login, a JWT token is provided in the response. This token should be included in the Authorization header for authenticated requests prefixed with Bearer.

## Contributing
We welcome contributions from the community! If you'd like to report issues, request features, or contribute code.

## License
This project is licensed under the MIT License.