const log4js = require('log4js');

const LOG_PATH = './src/logs/';

log4js.configure({
    appenders: {
        debug: {
            type: 'dateFile',
            filename: `${LOG_PATH}/Business.log`,
            pattern: '-yyyy-MM-dd',
            maxLogSize: 2097152,
            backups: 3
        },
        access: {
            type: 'dateFile',
            filename: `${LOG_PATH}/BusinessService.log`,
            pattern: '-yyyy-MM-dd',
            maxLogSize: 2097152,
            backups: 3,
        }
    },
    categories: {
        default: {appenders: ['access'], level: 'ALL'},
        access: {appenders: ['access'], level: 'INFO'},
        debug: {appenders: ['debug'], level: 'ALL'},
    },
});

module.exports = {
    log: log4js.getLogger('debug'),
    express: log4js.connectLogger(log4js.getLogger('access'), {level: log4js.levels.INFO}),
};