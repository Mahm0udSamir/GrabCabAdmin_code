import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

import { FirebaseConfig } from "./keys";
firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
export const authRef = firebase.auth();

export const FIREBASE_AUTH_PERSIST = firebase.auth.Auth.Persistence.LOCAL;

export const bookingRef = databaseRef.child("bookings");
export const carTypesRef = databaseRef.child("rates/car_type");
export const promoRef = databaseRef.child("offers");
export const userRef = databaseRef.child("users");
export const notifyRef = databaseRef.child("notifications");
export const referralRef = databaseRef.child("referral/bonus/amount");
export const singleUserRef = (uid) => databaseRef.child("users/" + uid);

