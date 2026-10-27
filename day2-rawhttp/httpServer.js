
import { createServer } from "node:http";
import { readFile, writeFile } from "node:fs/promises";

//m2: Store request counts
const requestCounts = {};
const requestLimit = 5;
const timeWindow = 60 * 1000; // 1 minute

const server = createServer(async (req, res) => {
    
// m2: Request logger
console.log(req.method, req.url);

// m2: Rate limiter
const ip = req.socket.remoteAddress;

if (!requestCounts[ip]) {
  requestCounts[ip] = {
    count: 0,
    startTime: Date.now()
  };
}

if (Date.now() - requestCounts[ip].startTime >= timeWindow) {
  requestCounts[ip].count = 0;
  requestCounts[ip].startTime = Date.now();
}

requestCounts[ip].count++;

if (requestCounts[ip].count > requestLimit) {
  res.writeHead(429, {
    "Content-Type": "text/plain"
  });

  return res.end("Too many requests. Try again later.");
}

  // GET all notes
  if (req.url === "/" && req.method === "GET") {
    try {
      const filePath = new URL("./notes.json", import.meta.url);
      const contents = await readFile(filePath, "utf8");

      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      res.end(contents);
    } catch (err) {
      res.writeHead(500);
      res.end("Internal Server Error");
    }
  }

  // GET one note by ID
  if (req.method === "GET" && req.url.startsWith("/notes/")) {
    try {
      const id = Number(req.url.split("/")[2]);
      const filePath = new URL("./notes.json", import.meta.url);
      const contents = await readFile(filePath, "utf8");
      const notes = JSON.parse(contents);

      const note = notes.find((item) => item.id === id);

      if (note) {
        res.writeHead(200, {
          "Content-Type": "application/json"
        });
        res.end(JSON.stringify(note));
      } else {
        res.writeHead(404);
        res.end("Note not found");
      }
    } catch (err) {
      res.writeHead(500);
      res.end("Internal Server Error");
    }
  }

  // POST a new note
  if (req.method === "POST" && req.url === "/notes") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const newNote = JSON.parse(body);
        const filePath = new URL("./notes.json", import.meta.url);
        const contents = await readFile(filePath, "utf8");
        const notes = JSON.parse(contents);

        notes.push(newNote);

        await writeFile(filePath, JSON.stringify(notes, null, 2));

        res.writeHead(201, {
          "Content-Type": "application/json"
        });
        res.end(JSON.stringify(newNote));
      } 
      catch (err) {
  console.log("Error:", err.message);

  if (!res.headersSent) {
    res.writeHead(400, {
      "Content-Type": "text/plain"
    });
  }

  res.end(err.message);
}
    //   catch (err) {
    //     res.writeHead(400, {
    //       "Content-Type": "text/plain"
    //     });
    //     // res.end("Invalid request data");
    //     res.end("The message is :", err.message);
    //   }
    });
  }

 
// PUT 
if (req.method === "PUT" && req.url.startsWith("/notes/")) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", async () => {
    try {
      const id = Number(req.url.split("/")[2]);
      const updatedNote = JSON.parse(body);
      const filePath = new URL("./notes.json", import.meta.url);
      const contents = await readFile(filePath, "utf8");
      const notes = JSON.parse(contents);

      const index = notes.findIndex((note) => note.id === id);

      if (index === -1) {
        res.writeHead(404);
        return res.end("Note not found");
      }

      notes[index] = { ...notes[index], ...updatedNote };

      await writeFile(filePath, JSON.stringify(notes, null, 2));

      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify(notes[index]));
    } catch (err) {
      res.writeHead(400);
      res.end("Invalid request data");
    }
  });
}

// DELETE

if (req.method === "DELETE" && req.url.startsWith("/notes/")) {
  try {
    const id = Number(req.url.split("/")[2]);
    const filePath = new URL("./notes.json", import.meta.url);
    const contents = await readFile(filePath, "utf8");
    const notes = JSON.parse(contents);

    const index = notes.findIndex((note) => note.id === id);

    if (index === -1) {
      res.writeHead(404);
      return res.end("Note not found");
    }

    notes.splice(index, 1);

    await writeFile(filePath, JSON.stringify(notes, null, 2));

    res.writeHead(200, {
      "Content-Type": "text/plain"
    });
    res.end("Note deleted successfully");
  } catch (err) {
    res.writeHead(500);
    res.end("Internal Server Error");
  }
}

});



server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});






