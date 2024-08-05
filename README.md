# wordrace: A Web Application
## Description
wordrace is a game where you try to match words to their corresponding definitions. Backend supports creation of accounts which will save username, password, and high score. 
## Project Setup
First install node js. Then, to get started with the project, follow
these steps:
1. **Clone the Repository:**
   ```sh
   git clone <repository-url>
   cd wordrace
   ```
2. **Run npm install to install node modules**
  ```sh
  npm install
  ```
3. **cd to the backend folder and start HTTP server.**
  ```sh
  cd src
  cd backend
  node server.js
  ```
4. **Start up frontend in browser.**
  ```sh
  cd ..
  cd ..
  npm start
  ```
## Technology Stack
1. **Javascript**
2. **HTML**
3. **CSS**
4. **events.js for observables**
5. **CouchDB**
6. **LiveServer**
## API Documentation
1. @endpoints /profile/create
 @method POST
 @description Asynchronously creates new profile in database catching an error if unsuccessful.
 @requestBody {
  "username" - "Username for the new profile" (string, required),
  "password" - "Password of the new profile" (string, required)
 }
 @responseBody {
  "createProfile" : {The newly created profile object}
 }
 @statusCodes 
 200 Created: Profile successfully created.
 500 Internal Server Error: Unexpected error occurred on the server.
 @example 
 input: HTTP POST with path /profile/create?username=john&password=pswd 
 possible outputs: 500, "Issue with creating profile" or 200, {_id: "john", password: "pswd", highScore: 0}
 2. @endpoints /profile/read
 @method GET
 @description Asynchronously reads profile in database catching an error if key not found or unsuccessful.
 @requestBody {
  "username" - "Username for the profile" (string, required),
 }
 @responseBody {
  "readProfile" : {The profile object}
 }
 @statusCodes 
 200 Successful: Profile successfully retrieved.
 404 Not Found: Key not found.
 500 Internal Server Error: Unexpected error occurred on the server. 
 @example 
 input: HTTP GET with path /profile/create?username=john 
 possible outputs: 500, "Issue with reading profile" or 200, {_id: "john", password: "pswd", highScore: 0, _rev: "revA"} or 404, "Not found."
3. @endpoints /profile/update
 @method PUT
 @description Asynchronously updates profile in database by changing password catching an error if key not found or unsuccessful.
 @requestBody {
  "username" - "Username for the profile" (string, required),
  "password" - "New password of the profile" (string, required)
 }
 @responseBody {
  "updateProfile" : {The update confirmation object}
 }
 @statusCodes 
 200 Successful: Profile successfully updated.
 404 Not Found: Key not found.
 500 Internal Server Error: Unexpected error occurred on the server. 
 @example 
 input: HTTP PUT with path /profile/update?username=john&password=newPswd 
 possible outputs: 500, "Issue with updating profile" or 200, {id: "john", rev: "revB"} or 404, "Not found."
 4. @endpoints /profile/delete
 @method DELETE
 @description Asynchronously deletes profile in database catching an error if key not found or unsuccessful.
 @requestBody {
  "username" - "Username for the profile" (string, required),
 }
 @responseBody {
  "deleteProfile" : {The delete confirmation object}
 }
 @statusCodes 
 200 Successful: Profile successfully deleted.
 404 Not Found: Key not found.
 500 Internal Server Error: Unexpected error occurred on the server.
 @example 
 input: HTTP DELETE with path /profile/delete?username=john
 possible outputs: 500, "Issue with deleting profile" or 200, {id: "john", rev: "revA"} or 404, "Not found." 

## Contact Information
Name: John Wang
Github Username: j-double-u

