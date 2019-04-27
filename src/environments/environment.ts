// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  fbConfig: {
    apiKey: 'AIzaSyAGwBG-kRJ-nkGXvfsS0-XHm1Cu_hNHfpE',
    authDomain: 'bar-tap-e2e.firebaseapp.com',
    databaseURL: 'https://bar-tap-e2e.firebaseio.com',
    projectId: 'bar-tap-e2e',
    storageBucket: 'bar-tap-e2e.appspot.com',
    messagingSenderId: '994566998482'
  }
};

export { BarTapApiModule } from '../common/bar-tap-api/normal/bar-tap-api.module';

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
