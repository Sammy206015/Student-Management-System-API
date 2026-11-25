# Student Management API

A RESTful Student Management API built with **Node.js, Express.js, MongoDB, and Mongoose**. The application provides endpoints for managing students, departments, lecturers, courses, and student course registrations.

## Features

- **Student Management**

  - Create, retrieve, update, and delete student records.
  - Store student information, including names, email, matriculation number, phone number, gender, level, and department.
  - Hash student passwords using bcrypt.

- **Department Management**

  - Create and manage academic departments.
  - Retrieve individual departments and all available departments.
  - Update and delete department records.

- **Lecturer Management**

  - Manage lecturer records.
  - Associate lecturers with departments and courses.

- **Course Management**

  - Create, retrieve, update, and delete courses.
  - Associate courses with departments and lecturers.
  - Manage course information and relationships.

- **Course Registration**

  - Register students for available courses.
  - Associate students with their registered courses.
  - Store academic year and semester information.
  - Prevent invalid student or course references.

- **Database Relationships**

  - Use MongoDB ObjectId references to establish relationships between collections.
  - Use Mongoose `populate()` to retrieve related document information.

- **Error Handling**

  - Handle missing records and invalid IDs.
  - Handle duplicate records.
  - Return appropriate HTTP status codes and error messages.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- dotenv

## Project Structure

```text
student-management-api/
|── db.js
│
├── controllers/
│   ├── studentController.js
│   ├── departmentController.js
│   ├── lecturerController.js
│   ├── courseController.js
│   └── registrationController.js
│
├── models/
│   ├── studentModel.js
│   ├── departmentModel.js
│   ├── lecturerModel.js
│   ├── courseModel.js
│   └── registrationModel.js
│
├── routes/
│   ├── studentRoutes.js
│   ├── departmentRoutes.js
│   ├── lecturerRoutes.js
│   ├── courseRoutes.js
│   └── registrationRoutes.js
│
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
```



## Installation and Setup

### 1. Clone the Repository

```bash
git clone 
```

### 2. Navigate into the Project Directory

```bash
cd student-management-api
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add:

&#x20;MONGO_URL=your_mongodb_connection_string

Replace `your_mongodb_connection_string` with your actual MongoDB connection string.

### 5. Start the Application

For normal execution:

```bash
npm start
```

If you have configured Nodemon:

```bash
npm run dev
```

The server should start on the port specified in your `.env` file.

Example:

```text
Server is running on PORT 3000
MongoDB connected successfully
```

## API Endpoints

The following endpoints assume that your routes are mounted under `/`

### Students

| Method | Endpoint       | Description           |
| ------ | -------------- | --------------------- |
| POST   | /students      | Create a student      |
| GET    | /students      | Retrieve all students |
| GET    | /students/\:id | Retrieve a student    |
| PUT    | /students/\:id | Update a student      |
| DELETE | /students/\:id | Delete a student      |



### Departments

| Method | Endpoint          | Description              |
| ------ | ----------------- | ------------------------ |
| POST   | /departments      | Create a department      |
| GET    | /departments      | Retrieve all departments |
| GET    | /departments/\:id | Retrieve a department    |
| PUT    | /departments/\:id | Update a department      |
| DELETE | /departments/\:id | Delete a department      |



### Lecturers

| Method | Endpoint        | Description            |
| ------ | --------------- | ---------------------- |
| POST   | /lecturers      | Create a lecturer      |
| GET    | /lecturers      | Retrieve all lecturers |
| GET    | /lecturers/\:id | Retrieve a lecturer    |
| PUT    | /lecturers/\:id | Update a lecturer      |
| DELETE | /lecturers/\:id | Delete a lecturer      |



### Courses

| Method | Endpoint      | Description          |
| ------ | ------------- | -------------------- |
| POST   | /courses      | Create a course      |
| GET    | /courses      | Retrieve all courses |
| GET    | /courses/\:id | Retrieve a course    |
| PUT    | /courses/\:id | Update a course      |
| DELETE | /courses/\:id | Delete a course      |



### Course Registrations

| Method | Endpoint            | Description                     |
| ------ | ------------------- | ------------------------------- |
| POST   | /registrations      | Register a student for a course |
| GET    | /registrations      | Retrieve all registrations      |
| GET    | /registrations/\:id | Retrieve a registration         |
| PUT    | /registrations/\:id | Update a registration           |
| DELETE | /registrations/\:id | Delete a registration           |



## Sample API Requests

### Create a Department

**POST** `/departments`

```json
{
  "departmentName": "Computer Science",
  "departmentCode": "CSC",
  "departmentDescription": "Department of Computer Science"
}


```

### Create a Student

**POST** `/students`

```json
{
  "firstName": "Samuel",
  "lastName": "Odeleye",
  "email": "samuel@example.com",
  "matricNumber": "BU/2026/001",
  "phoneNumber": "08012345678",
  "gender": "Male",
  "level": "200",
  "department": "DEPARTMENT_OBJECT_ID",
  "password": "Samuel123"
}
```

### Register a Student for a Course

**POST** `/registrations`

```json
{
  "student": "STUDENT_OBJECT_ID",
  "course": "COURSE_OBJECT_ID",
  "academicYear": "2026/2027",
  "semester": "First"
}
```

Replace the placeholder IDs with actual MongoDB ObjectIds returned from previously created records.

## Testing

The API can be tested using **Postman**.

1. Start the application.
2. Ensure MongoDB is connected.
3. Open Postman.
4. Select the appropriate HTTP method.
5. Enter the endpoint URL.
6. For POST and PUT requests, select **Body → raw → JSON**.
7. Send the request and inspect the response.

### Important Testing Notes

- Create a department before creating a student because students reference departments.
- Create the necessary lecturer and department records before creating courses if your course model requires them.
- Create a student and a course before registering the student.
- Use valid MongoDB ObjectIds when referencing related records.
- Check that the referenced records exist before submitting registration requests.

## HTTP Status Codes

| Status Code | Description                         |
| ----------- | ----------------------------------- |
| 200         | Request successful                  |
| 201         | Resource created successfully       |
| 400         | Invalid request or validation error |
| 404         | Resource not found                  |
| 409         | Conflict, such as duplicate records |
| 500         | Internal server error               |

## Security

- Environment variables are used to protect sensitive configuration.
- Student passwords are hashed using bcrypt before storage.
- Password fields are excluded from normal query results using Mongoose's `select: false` option.
- `.env` should never be committed to a public GitHub repository.

## Future Improvements

- Implement authentication and authorization using JWT.
- Add role-based access control for administrators, lecturers, and students.
- Add pagination and search functionality.
- Implement student result and score management.
- Add comprehensive API documentation using Swagger.
- Improve validation and centralized error handling.

## License

This project is licensed under the MIT License.