const http = require("http");
const fs = require("fs");
const os = require("os"); // Require the os module for network info

function getIpAddress() {
  const networkInterfaces = os.networkInterfaces();
  let localAddress = null;

  // Loop through network interfaces and find a non-loopback IPv4 address
  for (const name of Object.keys(networkInterfaces)) {
    for (const address of networkInterfaces[name]) {
      if (address.family === "IPv4" && !address.internal) {
        localAddress = address.address;
        break;
      }
    }
  }
  return localAddress;
}

const port = process.argv[2]; // Get port number from command line argument

if (!port) {
  console.error("Please specify port number as a command line argument!");
  process.exit(1); // Exit with error code 1
}

const hostname = getIpAddress();

if (!hostname) {
  console.error("Couldn't find a suitable local IP address!");
  process.exit(1); // Exit with error code 1
}

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    console.log("Received POST request");
    let data = "";

    req.on("data", (chunk) => {
      data += chunk.toString();
    });

    req.on("end", () => {
      try {
        const jsonData = JSON.parse(data);
        const filename = "received_data.json"; // Replace with your desired filename

        // Write data to JSON file
        fs.writeFile(filename, JSON.stringify(jsonData), (err) => {
          if (err) {
            console.error("Error writing data to file:", err);
            res.statusCode = 500; // Internal Server Error
            res.setHeader("Content-Type", "text/plain");
            return res.end("Error saving data");
          }
          console.log("Data saved successfully to:", filename);
        });

        // Send successful response even if saving fails
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Data received successfully!" }));
      } catch (error) {
        console.error("Error parsing data:", error);
        res.statusCode = 400;
        res.setHeader("Content-Type", "text/plain");
        res.end("Error: Invalid JSON data");
      }
    });
  } else {
    res.statusCode = 405;
    res.setHeader("Content-Type", "text/plain");
    res.end("Method Not Allowed");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
