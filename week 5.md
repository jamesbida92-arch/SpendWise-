# Exercise B: API Reference Entry

**Title:** Create a New Task API

**Estimated Time:** 25 minutes

### 1. API Overview

The Create Task API allows an authenticated user to create a new task within a project management application.

Each task contains a title, an optional description, an assigned user, a due date, and a priority level.

The API uses HTTP requests and JSON for data exchange.

### 2. HTTP Method and Endpoint

**HTTP Method:** POST

**Endpoint Path:**

```http
POST /api/v1/projects/{project_id}/tasks
```

**Example Base URL:**

```text
https://api.example.com
```

**Complete Endpoint:**

```text
https://api.example.com/api/v1/projects/101/tasks
```

The POST method creates a new task inside the specified project.

### 3. Authentication

Authentication is required.

Users must provide a valid bearer access token in the Authorization header.

**Required Request Headers**

| Header | Value | Required |
|---|---|---|
| Authorization | Bearer access_token | Yes |
| Content-Type | application/json | Yes |
| Accept | application/json | Yes |

Example:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
Accept: application/json
```

### 4. Request Parameters

**A. Path Parameters**

| Parameter | Data Type | Required | Description |
|---|---|---|---|
| project_id | Integer | Yes | Unique ID of the project where the task will be created. |

**B. Query Parameters**

This endpoint does not require or support any query parameters.

**C. Request Body Parameters**

| Parameter | Data Type | Required | Description |
|---|---|---|---|
| title | String | Yes | Task title, between 1 and 150 characters. |
| description | String | No | Additional task details, maximum 1,000 characters. |
| assignee_id | Integer | Yes | ID of the user assigned to the task. |
| due_date | String (date) | Yes | Task deadline in YYYY-MM-DD format. |
| priority | String (enum) | Yes | Task priority: low, medium, or high. |

The `assignee_id` must identify a user who belongs to the specified project.

### 5. Example JSON Request Body

```json
{
  "title": "Complete project documentation",
  "description": "Write the user manual and API reference documentation.",
  "assignee_id": 25,
  "due_date": "2026-10-20",
  "priority": "high"
}
```

### 6. Example HTTP Request

```http
POST /api/v1/projects/101/tasks HTTP/1.1
Host: api.example.com
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
Accept: application/json

{
  "title": "Complete project documentation",
  "description": "Write the user manual and API reference documentation.",
  "assignee_id": 25,
  "due_date": "2026-10-20",
  "priority": "high"
}
```

### 7. Successful API Response

**HTTP Status Code: 201 Created**

This response indicates that the task was created successfully.

**Example JSON Response Body:**

```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "task_id": 501,
    "project_id": 101,
    "title": "Complete project documentation",
    "description": "Write the user manual and API reference documentation.",
    "assignee_id": 25,
    "due_date": "2026-10-20",
    "priority": "high",
    "status": "pending",
    "created_at": "2026-10-15T12:00:00Z"
  }
}
```

### 8. HTTP Response Codes

The following are the possible HTTP response codes defined for this endpoint.

| HTTP Code | Meaning | Explanation |
|---|---|---|
| 201 | Created | Task created successfully. |
| 400 | Bad Request | Request contains invalid JSON or malformed syntax. |
| 401 | Unauthorized | Authentication token is missing, invalid, or expired. |
| 403 | Forbidden | User does not have permission to create tasks in the project. |
| 404 | Not Found | Specified project or assignee does not exist. |
| 409 | Conflict | Request conflicts with an existing task creation constraint. |
| 415 | Unsupported Media Type | Request Content-Type is not application/json. |
| 422 | Unprocessable Content | Request contains invalid field values or missing required fields. |
| 429 | Too Many Requests | User has exceeded the API request limit. |
| 500 | Internal Server Error | Unexpected server error occurred. |
| 503 | Service Unavailable | Server is temporarily unavailable. |

### 9. Example Error Response

**HTTP Status Code: 422 Unprocessable Content**

This response occurs when a required field contains an invalid value.

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "priority": "Priority must be low, medium, or high."
  }
}
```

### 10. Validation Rules

- The title must contain between 1 and 150 characters.
- The description is optional and cannot exceed 1,000 characters.
- The assignee ID must be a positive integer corresponding to a user in the project.
- The due date must use the YYYY-MM-DD format.
- The priority must be either low, medium, or high.
- The user must have permission to create tasks in the specified project.

### 11. Conclusion

The Create Task API provides a structured way for authenticated users to create tasks within a project management application.

It uses the POST HTTP method, JSON request and response bodies, bearer token authentication, and standard HTTP status codes.

This documentation helps developers understand how to send requests, validate task information, and handle successful and unsuccessful API responses.