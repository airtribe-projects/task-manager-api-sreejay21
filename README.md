# Task Manager API

## Overview
The Task Manager API is a RESTful service built with Node.js and Express.js. It allows users to manage tasks with capabilities for creating, retrieving, updating, and deleting tasks. The API includes features such as input validation, error handling, filtering, sorting, and task prioritization.

### Installation
Install Dependencies:
npm install
Run the Server:
node app.js
The server should be running on http://localhost:3000.
API Endpoints
1. GET /tasks
Description: Retrieve all tasks with optional filtering and sorting.
Query Parameters: completed (boolean), sortBy (string: createdAt)
Response: Array of task objects.
2. POST /tasks
Description: Create a new task.
Body:
{
  "title": "Task Title",
  "description": "Task Description",
  "completed": false,
  "priority": "medium"
}
Response: The created task object.
3. GET /tasks/:id
Description: Retrieve a specific task by its ID.
Response: Task object.
4. PUT /tasks/:id
Description: Update an existing task.
Body:
{
  "title": "Updated Title",
  "description": "Updated Description",
  "completed": true,
  "priority": "high"
}
Response: Updated task object.
5. DELETE /tasks/:id
Description: Delete a task by its ID.
Response: Deleted task object.
6. GET /tasks/priority/:level
Description: Retrieve tasks by priority level (low, medium, high).
Response: Array of task objects with the specified priority.
Testing the API
Use Postman or curl to interact with the API.
Examples of requests can be found in the body of this document, which you can use directly in Postman.
