# Eze Backend

Eze Backend is the server-side component for the Eze application.

## Getting Started

To get started with the project, follow these steps:

1. Clone the project repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file from `env.example`.
4. Add your MongoDB URI to the `.env` file. If you don't have one, you can request it by emailing [gaurav.mantan1999@gmail.com](mailto:gaurav.mantan1999@gmail.com).
5. After configuring the `.env` file, run `npm run dev` to start the development server.

## API Endpoints

### Fetch Products

Use this endpoint to fetch products based on certain criteria.

#### Request Examples

```bash
# Fetch products for selling
curl --location 'https://eze-backend.onrender.com/fetch/products' \
--header 'Content-Type: application/json' \
--data '{
    "reqType": "sell",
    "pageNumber": 1,
    "pageSize": 2
}'

# Fetch products for buying
curl --location 'https://eze-backend.onrender.com/fetch/products' \
--header 'Content-Type: application/json' \
--data '{
    "reqType": "buy",
    "pageNumber": 1,
    "pageSize": 10
}'

# Sync products from excel
curl --location 'https://eze-backend.onrender.com/sync/products'

# Delete products from table
curl --location --request DELETE 'https://eze-backend.onrender.com/sync/products/delete'

```
