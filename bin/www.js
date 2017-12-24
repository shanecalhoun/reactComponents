/**
 * www.js
 * Created by shanecalhoun on 12/23/17
 */

let app = require('../app'),
	//exec = require('child_process').exec,
	server;

app.set('port', process.env.PORT || 3000);

server = app.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + server.address().port);
});


