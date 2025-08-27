# Document for Problem 5:
Using ExpressJS and TypeScript to build a CURD APIs for Books resource.
Using MYSQL database to store data, Sequelize as a ORM.


## Folder structure
1. **server.ts**: Entry point of your application
2. **app.ts**: Configure the Express app.
3. **.env**: Stores sensitive configuration
4. **src/resources/**: Domain-specific resources (API features like books or users)
- controller.ts: Handles HTTP requests, calls service, returns response.
- service.ts: Business logic, interacts with database models.
- model.ts: Defines database schema (Sequelize or ORM models).
- routes.ts: Maps endpoints to controller methods.
- types.ts: TypeScript types/interfaces for request/response.
5. **middlewares**: Custom middleware of application, such as api payload validation.
7. **src/util/database.ts**:  Centralized database connection

## How to run the application
1. Run mysql locally via docker: 
    `docker-compose up -d`
2. Install dependencies:
    `npm install`
3. Setup env variables: copy teamplate from `.env.template` to `.env` file and correct with your values
4. Run in dev mode:
    `npm run dev`
5. Compile typescript:
    `npm run build`
6. Run in production mode:
    `npm start`

## How to use API collection

1. Create a new Book:
    ```
    curl --location 'http://localhost:5000/api/books' \
    --data-raw '{
        "title": "Book title 01",
        "author": "Book author 01",
        "publishedYear": 2021,
        "description": "Book description 01"
    }'
    ```
2. Update Book
    ```
    curl --location --request PUT 'http://localhost:5000/api/books/{{bookId}}' \
    --header 'Content-Type: application/json' \
    --data '{
        "title": "Book title update",
        "author": "Book author update",
        "publishedYear": 2022,
        "description": "Book description update"
    }'
    ```

3. Get Book by ID
    ```
    curl --location 'http://localhost:5000/api/books/{{bookId}}'
    ```

4. Get list Books with filter
    ```
    curl --location 'http://localhost:5000/api/books?publishedYear=2020'
    ```

5. Delete a Book
    ```
    curl --location --request DELETE 'http://localhost:5000/api/books/{{bookId}}'
    ```