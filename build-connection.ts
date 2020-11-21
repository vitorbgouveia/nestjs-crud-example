const path = require('path');
const fs = require('fs');

import { connections } from './src/infrastructure/connEnums';
const env = process.env.NODE_ENV || 'development';
const config = connections[env];

let data = JSON.stringify(config);
fs.writeFileSync('ormconfig.json', data);