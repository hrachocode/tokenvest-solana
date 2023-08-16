'use strict';

/**
 * lastchange service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::lastchange.lastchange');
