const fs = require('node:fs')
const { appPaths } = require('../appConfig');

module.exports.ejsService = {
  name: 'ejs',
  functions: {
    getComponent(name) {
      let ejsComponent = appPaths.fromUI(`components/${name}.ejs`);
      const data = fs.readFileSync(ejsComponent,
        { encoding: 'utf8', flag: 'r' });
      return data;
    }
  }
};
