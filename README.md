# Pet Shop API

A RESTful API for managing a pet shop — built with **Node.js**, **Express**,
**TypeScript**, and **MongoDB (Mongoose)**. Deployed on **Vercel**.

---

## Tech Stack

- **Runtime:** Node.js (ESM)
- **Framework:** Express 5
- **Language:** TypeScript (strict mode)
- **Database:** MongoDB via Mongoose
- **Validation:** Zod v4
- **Password Hashing:** bcryptjs
- **Deployment:** Vercel

---

## Project Structure

```text
src/
├── config/         # Environment config & DB connection
├── controllers/    # Route handler logic
├── middlewares/    # Validation & global error handler
├── models/         # Mongoose schemas (Pet, User)
├── routes/         # Express routers
├── types/          # Shared TypeScript types
├── utils/          # Custom error classes
└── validators/     # Zod schemas
```

---

## Getting Started

### Prerequisites

- Node.js >= 22
- MongoDB instance (local or Atlas)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
PORT=8000
DB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net
DB_NAME=pet-shop
CLIENT_URL=http://localhost:3000
SALT_ROUND=10
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

---

## API Reference

Base URL: `/api/v1`

### Health Check

| Method | Endpoint | Description      |
| ------ | -------- | ---------------- |
| GET    | `/`      | API health check |

---

### Pets — `/api/v1/pets`

| Method | Endpoint | Description      |
| ------ | -------- | ---------------- |
| GET    | `/`      | Get all pets     |
| GET    | `/:id`   | Get a single pet |
| POST   | `/`      | Create a new pet |

#### POST `/api/v1/pets` — Request Body

```json
{
  "name": "Buddy",
  "species": "Dog",
  "breed": "Labrador",
  "age": 3,
  "adopted": false,
  "intakeDate": "2024-01-15",
  "adoptionDate": "2024-06-01",
  "photo": "https://example.com/buddy.jpg",
  "medicalRecord": {
    "vaccinations": ["Rabies", "Parvovirus"],
    "weightKg": 5,
    "microchipId": "ABC123"
  }
}
```

---

### Users — `/api/v1/users`

| Method | Endpoint | Description     |
| ------ | -------- | --------------- |
| POST   | `/`      | Register a user |

#### POST `/api/v1/users` — Request Body

```json
{
  "name": "[name]",
  "email": "[email]",
  "password": "[password]",
  "phoneNumber": 1234567890,
  "address": "[address]",
  "role": "user"
}
```

> Passwords are hashed automatically via bcryptjs before being stored. The
> `password` field is excluded from all query responses (`select: false`).

---

## Error Handling

All errors are caught by the global error handler and return a consistent shape:

```json
{
  "success": false,
  "message": "Descriptive error message"
}
```

Handled error types:

- `ZodError` — validation failures → `400`
- MongoDB duplicate key (`code 11000`) → `400`
- `mongoose.Error.ValidationError` → `400`
- `NotFoundError` → `404`
- Unhandled errors → `500`

---

## Response Format

All successful responses follow this structure:

```json
{
  "success": true,
  "message": "...",
  "data": {}
}
```

---

## Deployment

The project is configured for Vercel via `vercel.json`. The build output from
`dist/index.js` is served using `@vercel/node`.

```bash
npm run build
vercel --prod
```
