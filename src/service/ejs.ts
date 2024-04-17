
import * as path from 'node:path'
import * as fs from 'node:fs'
import { appPaths } from '../simAppConfig'

export const ejsService = {
  name: 'ejs',
  functions: {
    getComponent(name): any {
      let ejsComponent = appPaths.pathFromUI(`components/${name}.ejs`);
      const data = fs.readFileSync(ejsComponent,
        { encoding: 'utf8', flag: 'r' });
      return data;
    }
  }
};
