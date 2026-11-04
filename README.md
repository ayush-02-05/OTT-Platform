# CineVAULT - OTT Platform

A full-stack OTT-style web application built with Spring Boot. Users can browse movies and series, search, and save titles to a personal My List. Admins manage movies, series, episodes and users from a separate dashboard.

## Features

**User**
- Register, login and logout
- Home page with hero slider and latest movies and series
- Movies and Series pages with genre filter and sorting
- Series details with season selector and episode list
- Search movies and series by title
- My List: add and remove movies and series
- Profile: update name and email, change password

**Admin**
- Dashboard
- Add, edit and delete movies
- Add, edit and delete series, and manage seasons and episodes
- View, search and delete users

## Tech Stack

- Java 21, Spring Boot 4
- Spring Web MVC, Spring Data JPA (Hibernate), Spring Security, Bean Validation
- MySQL
- HTML, CSS, JavaScript (user side), JSP (admin side)
- Maven

## Security

- Login with BCrypt-hashed passwords
- Role based access (USER and ADMIN)
- CSRF protection

## Exception Handling

Services throw custom exceptions (`ResourceNotFoundException`, `DuplicateResourceException`, `BadRequestException`). A global `@RestControllerAdvice` converts them into JSON responses with the right HTTP status (404, 409, 400, 500).

```json
{
  "status": 404,
  "message": "Series not found",
  "timestamp": "2026-11-04T06:13:35.231"
}
```

## Project Structure

```
src/main/java/com/OTT_Platform
├── Config
├── Controller (Admin, User)
├── DTO
├── Exception
├── Model
├── Repository
└── Service
src/main/resources/static     user pages (HTML, CSS, JavaScript)
src/main/webapp               admin pages (JSP)
```

## How to Run

Requirements: Java 21, MySQL, Maven

1. Clone the repository
   ```
   git clone https://github.com/ayush-02-05/OTT-Platform.git
   ```
2. Create a MySQL database named `OTT_Platform`
3. Set your MySQL URL, username and password in `src/main/resources/application-dev.properties`
4. Run the project
   ```
   ./mvnw spring-boot:run
   ```
5. Open `http://localhost:8080`

Tables are created automatically on the first run.

### Creating an admin

New users get the `USER` role. To make an admin, register normally and then run:

```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

## Screenshots

| Home | Series details |
|---|---|
| ![Home](docs/screenshots/home.png) | ![Series details](docs/screenshots/series-details.png) |

| My List | Admin dashboard |
|---|---|
| ![My List](docs/screenshots/my-list.png) | ![Admin dashboard](docs/screenshots/admin-dashboard.png) |

## Future Improvements

- Pagination for movie and series lists
- Unit and integration tests
- Video playback

## Author

[ayush-02-05](https://github.com/ayush-02-05)
