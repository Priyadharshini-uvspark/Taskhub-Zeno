Day 2 — Node.js Core and HTTP from Scratch 

M1 – Building a CRUD API Using Raw Node.js HTTP 
I created a basic HTTP server using Node.js without using Express. 
I implemented all five CRUD operations: GET all notes, GET a note by ID, POST a new note, PUT to update a note, and DELETE a note. 
I used a JSON file (notes.json) to store the notes and used the file system module to read and update the data. 
I tested all five operations in Postman to check whether they worked correctly. 
What I learned: I understood how Node.js handles HTTP requests and responses, how request methods are used for CRUD operations, and how data can be stored in a JSON file. 

M2 – Building Middleware by Hand 
I added a request logger to display the HTTP method and URL in the terminal whenever a request was received. 
I implemented an in-memory rate limiter to track requests from each client. 
I set a limit of five requests within a one-minute time window. When the limit was exceeded, the server returned a 429 Too Many Requests response. 
I tested the logger and rate limiter in Postman and confirmed that the request limit reset after the time window. 
What I learned: I understood how request logging helps track incoming requests and how rate limiting controls the number of requests a client can make within a given time. 