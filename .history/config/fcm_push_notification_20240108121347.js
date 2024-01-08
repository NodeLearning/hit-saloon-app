const FCM = require('fcm-node');
const config = require('../config/config');

const server_key = config.server_key;

const fcm = new FCM(server_key)