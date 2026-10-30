# OTT Streaming Platform

A backend-focused OTT web application developed using **Java, Spring Boot, Spring Security, Hibernate, and MySQL**. The project focuses on managing movies, web series, episodes, user accounts, and administrative operations through a structured backend architecture.

## About the Project

The OTT Streaming Platform is designed to demonstrate the core backend functionality of a content-based streaming application. It provides functionality for managing movie and series information, organizing episodic content, handling user accounts, and controlling access to administrative operations.

The application uses Spring Boot to handle HTTP requests and business operations, Spring Security for authentication and authorization, and MySQL for persistent data storage.

## Key Features

- **Movie Management:** Create, retrieve, update, and delete movie records.
- **Series Management:** Manage web series and their associated content.
- **Episode Management:** Organize episodes under their respective series and seasons.
- **User Management:** Handle user-related operations and account information.
- **Authentication & Authorization:** Secure protected functionality using Spring Security.
- **REST APIs:** Expose backend operations through HTTP endpoints.
- **Database Integration:** Persist application data using Spring Data JPA, Hibernate, and MySQL.

## Technology Stack

| Technology | Usage |
|---|---|
| Java 21 | Backend development |
| Spring Boot | Application framework |
| Spring MVC | Request handling |
| Spring Security | Authentication and authorization |
| Spring Data JPA | Data access |
| Hibernate | Object-relational mapping |
| MySQL | Database |
| HTML, CSS, JavaScript | Frontend technologies |
| Maven | Build and dependency management |

## Backend Architecture

The application follows a layered architecture that separates request handling, business logic, and database operations.

```text
Client
  |
  v
Controller Layer
  |
  v
Service Layer
  |
  v
Repository Layer
  |
  v
MySQL Database
```

**Controller Layer:** Receives HTTP requests and coordinates application operations.

**Service Layer:** Contains business logic and manages the application's operations.

**Repository Layer:** Interacts with the database using Spring Data JPA.

**Model Layer:** Represents application entities and their relationships.

**Security Layer:** Applies authentication and authorization rules to protected resources.

This architecture improves separation of concerns and makes the application easier to maintain and extend.

## How It Works

For example, when an administrator adds a movie, the request is handled by the appropriate controller. The service layer processes the operation, and the repository saves the movie information to MySQL through JPA/Hibernate.

Similarly, movie and series information can be retrieved through the relevant endpoints. Security rules restrict access to protected operations based on the application's authentication and authorization configuration.

## Database Design

MySQL is used to store application data, while JPA/Hibernate maps Java entities to relational database tables.

The core data model includes:

- **User:** Represents application users.
- **Movie:** Stores movie-related information.
- **Series:** Represents web series.
- **Episode:** Stores episodic content associated with series and seasons.
- **Watchlist:** Represents users' saved content, where implemented.

Entity relationships help organize content and maintain consistency across related records.

## Project Structure

```text
com.OTT_Platform/
├── Config/       # Application and security configuration
├── Controller/   # Request handling and API endpoints
├── DTO/          # Data transfer objects
├── Model/        # Entity classes
├── Repository/   # Database access layer
└── Service/      # Business logic
```

## Key Learnings

- Designing a layered backend architecture using Spring Boot.
- Developing REST APIs using Spring MVC.
- Implementing authentication and authorization using Spring Security.
- Integrating MySQL with Spring Data JPA and Hibernate.
- Managing related entities and relational data.
- Separating business logic from request handling and database operations.

## Author

**Ayush Singh**

[GitHub Profile](https://github.com/ayush-02-05) · [Project Repository](https://github.com/ayush-02-05/OTT-Platform)
