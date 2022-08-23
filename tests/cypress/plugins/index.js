'use strict';

const sqlServer = require('cypress-sql-server');

module.exports = (on, config) => {
    if (config.env && config.env.baseUrl) {
        config.baseUrl = config.env.baseUrl;
    }

    return config;
};
