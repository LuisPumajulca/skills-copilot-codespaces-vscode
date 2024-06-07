// Create web server
// 1. Import http module
// 2. Create server
// 3. Listen to port
// 4. Create a route
// 5. Read file and response
// 6. Return 404 if file not found
// 7. Start server
// 8. Create a route for comments
// 9. Read comments file
// 10. Parse comments file
// 11. Return comments in response
// 12. Add new comment
// 13. Save new comment
// 14. Return comments in response

// 1. Import http module
const http = require('http');
const fs = require('fs');
const path = require('path');

// 2. Create server
const server = http.createServer((req, res) => {
  // 4. Create a route
  if (req.url === '/') {
    // 5. Read file and response
    fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
      if (err) throw err;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    });
  } else if (req.url === '/comments') {
    // 9. Read comments file
    fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, content) => {
      if (err) throw err;
      const comments = JSON.parse(content);
      // 11. Return comments in response
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(comments));
    });
  } else if (req.url === '/add-comment' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      // 13. Save new comment
      fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, content) => {
        if (err) throw err;
        const comments = JSON.parse(content);
        const newComment = JSON.parse(body);
        comments.push(newComment);
        fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments), (err) => {
          if (err) throw err;
        });
      });
    });
  } else {
    //