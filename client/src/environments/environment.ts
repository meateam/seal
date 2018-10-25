// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// import { config } from '../../../src/config';
// import * as dotenv from 'dotenv';
// dotenv.config();
// console.log('hello');
// console.log(process.env.DEV_SERVER_SH);
export const environment = {
  production: false,
  server: 'http://65.52.76.35:9000/',
  api: 'http://65.52.76.35:9000/api'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
