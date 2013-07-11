var Hapi = require('hapi'),
    options = { };
var masterConfig = require('./config/config');

var serverConfig = masterConfig.config;

if (serverConfig.tls) {
	console.log('Loading tls');
	options.tls = tlsConfig;
}

var server = new Hapi.Server(serverConfig.hostname, serverConfig.port, options);

server.auth('session', {
    scheme: 'cookie',
    password: 'asFEdh3d92898e4eIUr', //TODO: refactor this out to gitignored auth config file
    cookie: 'amalgamancer-control-center-cookie',  //?TODO: refactor this out to gitignored auth config file
    redirectTo: '/',
	isSecure: serverConfig.tls,
	ttl: 1800000,
	clearInvalid: true
});

server.views({
    engines: {
        html: 'handlebars'            
    },
    path: './lib/views',
	partialsPath: './lib/views/partials'
});

server.route([
  //All static content
  { method: '*', 	path: '/{path*}', handler: { directory: { path: './static/', listing: false, redirectToSlash: true } } }
]);

server.start();
console.log('Server up at ' + server.info.uri + ' !');