Eze Backend
Eze Backend is the server-side component for the Eze application.

Getting Started
To get started with the project, follow these steps:

Clone the project repository.
Run npm install to install dependencies.
Create a .env file from env.example.
Add your MongoDB URI to the .env file. If you don't have one, you can request it by emailing gaurav.mantan1999@gmail.com.
After configuring the .env file, run npm run dev to start the development server.
API Endpoints
Fetch Products
Use this endpoint to fetch products based on certain criteria.

bash
Copy code
curl --location 'http://localhost:8080/fetch/products' \
--header 'Content-Type: application/json' \
--data '{
    "reqType": "sell", // "buy"
    "pageNumber": 3,
    "pageSize": 2
}'
Sync Products
This endpoint is used to sync products. Read products from excel to database

bash
Copy code
curl --location 'http://localhost:8080/sync/products'
Delete Synced Products
In case of multiple sync operations, use this endpoint to remove duplicate data.

bash
Copy code
curl --location --request DELETE 'http://localhost:8080/sync/products/delete'
