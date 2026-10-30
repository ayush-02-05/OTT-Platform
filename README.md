# OTT Platform

A full-stack OTT web application built using **Java, Spring Boot, and MySQL**, featuring movie and series browsing, user authentication, personal watchlists, and content management.

## Features

- **User Authentication** — User registration, login, and profile management.
- **Movie Browsing** — Explore movies and view movie details.
- **TV Series Management** — Browse series, seasons, and episodes.
- **My List** — Add and manage movies and series in a personal watchlist.
- **Search** — Search for available content.
- **Admin Dashboard** — Manage movies, series, episodes, and users.

## Tech Stack

| Technology | Purpose |
|---|---|
| Java 21 | Backend development |
| Spring Boot | Application framework |
| Spring Security | Authentication and access control |
| Spring Data JPA & Hibernate | Database operations and ORM |
| MySQL | Relational database |
| HTML, CSS & JavaScript | Frontend development |
| Maven | Dependency management and build |

## Architecture

The application follows a layered architecture:

`Controller → Service → Repository → MySQL`

- **Controller:** Handles incoming requests.
- **Service:** Contains business logic and validation.
- **Repository:** Performs database operations using Spring Data JPA.
- **Model:** Represents application entities stored in the database.
- **Security Configuration:** Defines authentication and access-control rules.

## Getting Started

### Prerequisites

- Java 21
- MySQL
- Maven

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/ayush-02-05/OTT-Platform.git
cd OTT-Platform
```

**2. Create a MySQL database**

```sql
CREATE DATABASE ott_platform;
```

**3. Configure the database**

Update the database connection settings in the appropriate application profile configuration file under:

`src/main/resources/`

Use your own MySQL username, password, and database name. Keep credentials out of version control.

**4. Run the application**

```bash
mvn spring-boot:run
```

Open the local URL configured for the application in your browser.

## What I Learned

- Building a Java web application using Spring Boot.
- Implementing a layered Controller–Service–Repository architecture.
- Working with relational databases using JPA and Hibernate.
- Configuring application security with Spring Security.
- Designing and managing relationships between movies, series, seasons, and episodes.

## Author

**Ayush Singh**

- GitHub: [ayush-02-05](https://github.com/ayush-02-05)
- Project Repository: [OTT Platform](https://github.com/ayush-02-05/OTT-Platform)
