const config = require('./config/config');

module.exports = {
    client: 'mysql2',
    connection: {
        host: config.mysql.host,
        port: config.mysql.port,
        user: config.mysql.name,
        password: config.mysql.password,
        database: config.mysql.database
    }
};