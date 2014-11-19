var fs = require('fs');
var http = require('http');

http.createServer(function (req, res) {
    var logMessage = "Nov 19 11:07:58 box Google Chrome Helper[6857]: CoreText CopyFontsForRequest received mig IPC error (FFFFFECC) from font server";
    fs.appendFile("/tmp/test", logMessage, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    }); 
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(1337, '0.0.0.0');

console.log('Server running at http://0.0.0.0:1337/');

