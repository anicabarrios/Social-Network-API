# Social Network API

## Description

This project is a backend application for a social networking web platform. The API is built using Express.js and MongoDB, utilizing Mongoose ODM to manage relationships between data. This API allows users to share thoughts, react to friends' thoughts, and manage a friends list, catering to the needs of social media startups requiring scalable solutions for handling large amounts of unstructured data.<br>

## Table of Contents
1. [Description](#description)
2. [Technologies Used](#technologies-used)
3. [Features](#features)
4. [Installation](#installation)
5. [Usage](#usage)
   - [API Endpoints](#api-endpoints)
6. [Video Link](#video-link)
7. [License](#license)
8. [Contact](#contact)

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose ODM

## Features

- Users can share and manage their thoughts.
- Users can react to thoughts posted by others.
- Users can add and remove friends.
- API routes for managing users, thoughts, and reactions.

## Installation

To get started with this project, follow these steps:

1. Clone the repository:
`git clone https://github.com/anicabarrios/Social-Network-API`

2. Navigate to the project directory:
`cd social-network-api`

3. Install dependencies:
`npm install`

4. Ensure that MongoDB is running on your machine. You can start MongoDB with:
`mongod`

## Usage

To seed the database, execute the following command in the terminal:
`npm run seed`

To run the server, execute the following command in the terminal:
`npm start`

This will start the server and connect to the MongoDB database. You can test the API routes using Insomnia or any other API testing tool.

### API Endpoints

- **GET /api/users** - Retrieves all users.
- **POST /api/users** - Creates a new user.
- **PUT /api/users/:userId** - Updates a user's information.
- **DELETE /api/users/:userId** - Deletes a user.

- **GET /api/thoughts** - Retrieves all thoughts.
- **POST /api/thoughts** - Creates a new thought.
- **PUT /api/thoughts/:thoughtId** - Updates a thought.
- **DELETE /api/thoughts/:thoughtId** - Deletes a thought.

- **POST /api/thoughts/:thoughtId/reactions** - Adds a reaction to a thought.
- **DELETE /api/thoughts/:thoughtId/reactions/:reactionId** - Removes a reaction.

- **POST /api/users/:userId/friends/:friendId** - Adds a friend.
- **DELETE /api/users/:userId/friends/:friendId** - Removes a friend.

## Video Link

To view the video demonstration of the application tested in Insomnia simply visit the this link at [Link to Video](https://drive.google.com/file/d/1UjaJSPfj7oNrCKTWCw1D2uLFSW3zHo6q/view)

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

For more information or to reach out for potential opportunities, please contact me through:

- **Email:** [anicabarrios1@gmail.com](mailto:anicabarrios1@gmail.com)
- **LinkedIn:** [Anica Barrios](https://www.linkedin.com/in/anica-barrios-b104062ab/)
- **GitHub:** [Anica Barrios](https://github.com/anicabarrios)

