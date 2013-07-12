var forever = require('forever'),
    child = new(forever.Monitor)('index.js', {
        'silent': false,
        'pidFile': 'pids/control_center.pid',
        'watch': true,
        'watchDirectory': '.',      // Top-level directory to watch from.
        'watchIgnoreDotFiles': true, // whether to ignore dot files
        'watchIgnorePatterns': [], // array of glob patterns to ignore, merged with contents of watchDirectory + '/.foreverignore' file
        'logFile': 'logs/server.log', // Path to log output from forever process (when daemonized)
        'outFile': 'logs/server.out', // Path to log output from child stdout
        'errFile': 'logs/server.err'
    });
child.start();
forever.startServer(child);