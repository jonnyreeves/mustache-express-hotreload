import express from 'express';
import mustache from 'mustache';
import livereload from 'livereload';
import livereloadMiddleware from 'connect-livereload';
import fs from 'fs';

// Create a livereload server
const hotServer = livereload.createServer({
  // Reload on changes to these file extensions.
  exts: [ 'json', 'mustache' ],
  // Print debug info
  debug: true
});

// Specify the folder to watch for file-changes.
hotServer.watch(__dirname);

// Create a new express server instance.
const app = express();

// Inject the livereload script tag into pages.
app.use(livereloadMiddleware());

// Handle GET requests to `/hello`.
app.get('/hello', (req, res) => {
  // Read the template and JSON data from the local filesystem.
  const tpl = fs.readFileSync('./hello.mustache', 'utf8');
  const data = JSON.parse(fs.readFileSync('./hello.json'));

  // Serve back the rendered template.
  res.send(mustache.render(tpl, data));
});

console.log(`server started at http://localhost:3000`);
app.listen(3000);
