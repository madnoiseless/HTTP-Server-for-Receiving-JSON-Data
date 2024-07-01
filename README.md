**HTTP Server for Receiving JSON Data**

This project implements a simple HTTP server that listens for POST requests containing JSON data. Here's a breakdown of its functionality:

**Features:**

- Accepts POST requests at a specified port number.
- Extracts JSON data from the request body.
- Saves the parsed JSON data to a file named `received_data.json`.
- Provides a success message (`Data received successfully!`) upon successful data reception (even if saving fails).
- Returns appropriate error messages for:
    - Invalid port number specified in the command line argument (exit code 1).
    - Unable to find a suitable local IP address (exit code 1).
    - Invalid JSON data format (status code 400).
    - Internal server error during file saving (status code 500).

**Requirements:**

- Node.js and npm (or yarn) installed on your system.

**Installation:**

1. Clone this repository or download the project files.
2. Navigate to the project directory in your terminal.
3. Run `npm install` (or `yarn install`) to install any required dependencies.

**Usage:**

1. Start the server by running the following command in your terminal, replacing `PORT_NUMBER` with the desired port:

   ```bash
   node server.js PORT_NUMBER
   ```

   **Example:**

   ```bash
   node server.js 8080
   ```

   This will start the server listening on port 8080.

2. Use a tool like Postman or curl to send a POST request with JSON data in the request body to the server address (e.g., `http://localhost:8080/`).

**Expected Behavior:**

- The server should log the receipt of a POST request to the console.
- Upon successful data reception (even if saving fails), the server should respond with a JSON object containing the message `"Data received successfully!"`.
- Errors (invalid port, invalid IP, invalid JSON data, file saving error) will be logged to the console and appropriate error messages will be sent in the response.

**Customization:**

- You can modify the filename for saving the received data by changing the `filename` variable within the `fs.writeFile` function call.

**Additional Notes:**

- This is a basic server implementation and may not be suitable for production environments without additional security measures.
- Consider implementing error handling for potential file system issues.
