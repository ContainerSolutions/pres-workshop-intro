var http = require('http');

http.createServer(function (req, result) {

	var options = {
		host: 'es',
		port: 9200,
		path: '/crm/people/_search?q=importance:high',
		method: 'GET'
	};

	http.request(options, function(res) {
		res.setEncoding('utf8');
		var data_string = '';
		res.on('data', function (chunk) {
			console.log('BODY: ' + chunk);
			data_string += chunk;
		});
		res.on('end', function () {
			console.log(data_string);

		        var data = JSON.parse(data_string);

		        console.log(data);

		        result.writeHead(200, {'Content-Type': 'text/plain'});
		        result.write('Hello imporant people\n');
		        var people_hits = data.hits.hits;
		        people_hits.forEach(function(hit) {
                		result.write(hit._source.name + '\n');
			});
		        result.end('\n');
		});

	}).end();

}).listen(1337, '0.0.0.0');

console.log('Server running at http://0.0.0.0:1337/');
