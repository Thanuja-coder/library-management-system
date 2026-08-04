# library-management-system

This is a libraryy management API Backend for the management of users and the books 

## Routes and Endpoints 

## /user
GET: Get all the list of user in the system 
POST: Creat/Reggister a new user 

## /users{id}
GET  :Get a user by their ID 
PUT:Updating a user by their ID 
DELETE: Delete a use by their ID

## /users/subscription-details/{id}
GET:Get a user subscription details by their ID 
>>date of subscription 
>> valid till ?
>> Fine any ??

## /books
GET: get all teh books in teh system 
POST: Add a new book to the system 
 
## /books/{id}
GET:Get a book by its ID
PUT: Updat ethe book details 
DELETE: Delet a book by its iD 

## /book/issued
GET: get all the issued books 

## /books/issued/withFine
GET:Get all issued books with their fine amount 

## Subscription Types 
>> Basic ( 3 months)
>> Standard (6 months)
>> Premium (12 months)

>> If the user missed the renewal date, the user should be collected with Rs100
>>If the user missed the subscription date, the user should be collected with Rs100
>>If the user missed the renewal and subscription date, the user should be collected with Rs200


## Commands:
npm init
npm i express
npm i nodemon --save-dev
npm run dev
