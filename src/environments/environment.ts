// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  fbConfig: {
    apiKey: "AIzaSyB9ktho_UFehN1qxwEQnAz1GtJLlr5jZsY",
    authDomain: "bar-tap-dee55.firebaseapp.com",
    databaseURL: "https://bar-tap-dee55.firebaseio.com",
    projectId: "bar-tap-dee55",
    storageBucket: "bar-tap-dee55.appspot.com",
    messagingSenderId: "257126503998"
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
