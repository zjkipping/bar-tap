export const environment = {
  production: true,
  // TODO: make a production version of the firebase
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
