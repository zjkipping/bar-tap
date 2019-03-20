import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as Stripe from 'stripe';
import * as moment from 'moment';

import { StripePaymentData, EmployeeCheckInOutData } from './types';

const NEW_ORDER_TYPE = 'new';

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();

export const stripePayment = functions.https.onCall(async (data: StripePaymentData) => {
  if (data.barId && data.token && data.price && data.drinks) {
    try {
      const result = await firestore.doc(`stripe_secrets/${data.barId}`).get();
      const doc = result.data();
      if (doc) {
        const stripe = new Stripe(doc.secret);
        try {
          const charge = await stripe.charges.create({ amount: data.price * 100, currency: 'usd', source: data.token },
            { idempotency_key: firestore.collection('_').doc().id });
          const now = moment().unix;
          if (data.userId) {
            await firestore.collection(`users/${data.userId}/history`).add({
              barId: data.barId,
              date: now,
              total: data.price
            });
          }
          await firestore.collection(`bars/${data.barId}/orders`).add({
            status: NEW_ORDER_TYPE,
            created: now,
            drinks: data.drinks,
            userId: data.userId ? data.userId : undefined,
            employeeId: undefined
          });
          return charge;
        } catch (error) {
          throw new functions.https.HttpsError('unknown', error.message, error);
        }
      } else {
        throw new functions.https.HttpsError(
          'invalid-argument',
          'There is no existing Bar document for the barID provided');
      }
    } catch (error) {
      throw new functions.https.HttpsError('unknown', error.message, error);
    }
  } else {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with at least 4 arguments: userID (optional), barID, drinks, token, and price');
  }
});

export const employeeCheckIn = functions.https.onCall(async (data: EmployeeCheckInOutData) => {
  if (data.id && data.pin && data.barId) {
    try {
      const result = await firestore.collection(`users`).where('barId', '==', data.barId).limit(1).get();
      if (result.size > 0) {
        const accountId = result.docs[0].id;
        const result2 = await firestore.collection(`bars/${data.barId}/employees`).where('id', '==', data.id).limit(1).get();
        if (result2.size > 0) {
          const employee = result2.docs[0].data();
          const employeeId = result2.docs[0].id;
          const result3 = await firestore.collection(`users/${accountId}/clockedIn`).where('employeeUID', '==', employeeId).limit(1).get();
          if (result3.size === 0) {
            if (employee.pin === data.pin) {
              return await firestore.collection(`users/${accountId}/clockedIn`).add({ employeeUID: employeeId });
            } else {
              throw new functions.https.HttpsError(
                'invalid-argument',
                'The pin provided does not match the Employee\'s pin');
            }
          } else {
            throw new functions.https.HttpsError(
              'invalid-argument',
              'That employee is already Clocked In');
          }
        } else {
          throw new functions.https.HttpsError(
            'invalid-argument',
            'There is no existing Employee for the ID provided');
        }
      } else {
        throw new functions.https.HttpsError(
          'invalid-argument',
          'There is no employees account associated with the Bar ID provided');
      }
    } catch (error) {
      throw new functions.https.HttpsError('unknown', error.message, error);
    }
  } else {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with 2 arguments: barID, id, and pin');
  }
});

export const employeeCheckOut = functions.https.onCall(async (data: EmployeeCheckInOutData) => {
  if (data.id && data.pin && data.barId) {
    try {
      const result = await firestore.collection(`users`).where('barId', '==', data.barId).limit(1).get();
      if (result.size > 0) {
        const accountId = result.docs[0].id;
        const result2 = await firestore.collection(`bars/${data.barId}/employees`).where('id', '==', data.id).limit(1).get();
        if (result2.size > 0) {
          const employee = result2.docs[0].data();
          const employeeId = result2.docs[0].id;
          const result3 = await firestore.collection(`users/${accountId}/clockedIn`).where('employeeUID', '==', employeeId).limit(1).get();
          if (result3.size > 0) {
            const clockedInId = result3.docs[0].id;
            if (employee.pin === data.pin) {
              return await firestore.doc(`users/${accountId}/clockedIn/${clockedInId}`).delete();
            } else {
              throw new functions.https.HttpsError(
                'invalid-argument',
                'The pin provided does not match the Employee\'s pin');
            }
          } else {
            throw new functions.https.HttpsError(
              'invalid-argument',
              'That employee is not currently Clocked In');
          }
        } else {
          throw new functions.https.HttpsError(
            'invalid-argument',
            'There is no existing Employee for the ID provided');
        }
      } else {
        throw new functions.https.HttpsError(
          'invalid-argument',
          'There is no employees account associated with the Bar ID provided');
      }
    } catch (error) {
      throw new functions.https.HttpsError('unknown', error.message, error);
    }
  } else {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with 2 arguments: barID, id, and pin');
  }
});