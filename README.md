
# Docker Setup for Local Development

This guide helps you set up a local development environment using Docker, PostgreSQL, and your project image.

Local Development Environment with Docker, PostgreSQL, and Node.js (TypeScript)
This project sets up a complete local development environment using Docker, PostgreSQL, and a Node.js application written in TypeScript. The goal is to provide an isolated, reproducible, and scalable setup where each component runs in its own container.

⚙️ Architecture Overview
PostgreSQL Database runs inside one Docker container.

Node.js Application runs inside a separate Docker container.

Both containers are connected using a custom Docker network (user_project) to enable communication between them.

📡 Why Use a Docker Network?
By default, Docker containers are isolated from each other. To allow communication:

We create a custom Docker network using docker network create user_project.

Both the Node.js app and PostgreSQL containers are attached to this network.

This allows the Node.js app to connect to the database using the container name (postgres) as the hostname.

---

## 🚀 Prerequisites

- [Docker](https://www.docker.com/) must be installed and running.
- Basic understanding of terminal commands and Docker is helpful.

---

## ⚙️ Docker Installation and Setup

### 1. Install Docker

If you don't have Docker installed, follow the official installation guide:

👉 [Install Docker](https://docs.docker.com/get-docker/)

---

### 2. Create a Custom Docker Network

Docker networks allow containers to communicate with each other by name (hostname).

```bash
docker network create user_project
```

This creates an isolated network named `user_project`.

---

### 3. Start a PostgreSQL Container

This command runs a PostgreSQL instance in a Docker container and connects it to your custom network.

```bash
docker run --network user_project --name postgres \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -d -p 5432:5432 postgres
```

- `--network user_project`: connects it to your network.
- `--name postgres`: gives the container a name.
- `-e POSTGRES_PASSWORD=...`: sets the DB password.
- `-d`: runs in detached mode.
- `-p 5432:5432`: maps the container port to host.

---

### 4. Build Your App Image

Make sure your project has a `Dockerfile` in the root directory.

```bash
docker build --network=host -t user-project .
```

- `--network=host`: useful if your build needs internet access.
- `-t user-project`: tags the image with the name `user-project`.
- `.`: current directory (where the Dockerfile is located).

---

### 5. Run Your App Container

Finally, run your application and link it to the PostgreSQL database.

```bash
docker run \
  -e DATABASE_URL=postgresql://postgres:mysecretpassword@postgres:5432/postgres \
  --network user_project \
  -p 3000:3000 user-project
```

- `DATABASE_URL`: environment variable your app uses to connect to PostgreSQL.
- `--network user_project`: ensures the app can resolve `postgres` as the DB host.
- `-p 3000:3000`: maps port 3000 of the container to your local machine.

---

## ✅ You’re All Set!

Once everything is up:

- Your PostgreSQL DB is running at `localhost:5432`
- Your app is available at [http://localhost:3000](http://localhost:3000)

---

## 🧠 Bonus Tips

- Use `.env` files to avoid hardcoding secrets like passwords.
- For production, consider `docker-compose` for managing multi-container setups.
- You can add Prisma migrations like this (after containers are running):

```bash
npx prisma migrate dev --name init
```

---

## 📁 Project Structure (Example)

```
project-root/
├── Dockerfile
├── prisma/
│   └── schema.prisma
├── node_modules/
├── package.json
└── ...
```

---

## 🐳 Happy Dockering!

Feel free to fork or open issues to improve this guide.

---

## 📘 About This Project

This project provides a clean and simple boilerplate for running a Node.js application with PostgreSQL using Docker. It's great for development and testing environments where containerized databases and services are preferred.

### ✨ Features

- Dockerized PostgreSQL setup
- Custom Docker network support
- Environment variable-based configuration
- Easy setup and teardown

---

## 📦 Suggested GitHub Repository Name

You can name your repository something descriptive and relevant. Here are a few suggestions:

- `docker-node-postgres-starter`
- `dev-env-docker-postgres`
- `containerized-node-app`
- `node-postgres-docker-boilerplate`
- `dockerized-dev-setup`

Choose a name that reflects your project's purpose and is easy to understand for other developers.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the guide or add features.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🧩 Database Connection (Node.js + TypeScript + Docker)

This project demonstrates how to connect a Node.js application (written in TypeScript) to a PostgreSQL database using Docker containers.

### 🛠 Architecture Overview

- **PostgreSQL** runs in one Docker container.
- **Node.js app** runs in a separate Docker container.
- Both containers communicate through a shared Docker network (`user_project`).

### 🔗 Why Use a Docker Network?

When you run services in separate containers, they are isolated by default. Using a Docker network allows the containers to communicate with each other by name. In this case, the Node.js app uses the hostname `postgres` to connect to the PostgreSQL container.

### 📌 Sample PostgreSQL Connection Code (TypeScript)

Make sure to use the correct `DATABASE_URL` environment variable in your app. Example using `pg` library:

```ts
import { Client } from 'pg';

const client = new Client({
  connectionString: process.env.DATABASE_URL, // e.g. 'postgresql://postgres:mysecretpassword@postgres:5432/postgres'
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL successfully!'))
  .catch(err => console.error('Connection error', err.stack));
```

### 🧪 Using with Prisma ORM

If you're using Prisma with TypeScript, your `.env` file should look like:

```env
DATABASE_URL="postgresql://postgres:mysecretpassword@postgres:5432/postgres"
```

Then run:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### ✅ Benefits of This Setup

- Fully isolated environments for services.
- Easy to scale or swap out containers.
- Portable and replicable development environments.

