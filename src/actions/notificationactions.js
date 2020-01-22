import { notifyRef } from "../config/firebase";
import {
  FETCH_NOTIFICATIONS,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILED,
  EDIT_NOTIFICATIONS,
  SEND_NOTIFICATION,
  SEND_NOTIFICATION_SUCCESS,
  SEND_NOTIFICATION_FAILED,
} from "./types";

import { store } from "../reducers/store";

export const fetchNotifications = () => dispatch => {
  dispatch({
    type: FETCH_NOTIFICATIONS,
    payload: null
  });
  notifyRef.on("value", snapshot => {
    if (snapshot.val()) {
      const data = snapshot.val();
      dispatch({
        type: FETCH_NOTIFICATIONS_SUCCESS,
        payload: data
      });
    } else {
      dispatch({
        type: FETCH_NOTIFICATIONS_FAILED,
        payload: "No data available."
      });
    }
  });
};

export const editNotifications = (notifications, method) => dispatch => {
  dispatch({
    type: EDIT_NOTIFICATIONS,
    payload: { method, notifications }
  });
  notifyRef.set(notifications);
}

export const sendNotification = (notification) => dispatch => {
  dispatch({
    type: SEND_NOTIFICATION,
    payload: notification
  });

  let users = store.getState().usersdata.users;
  let arr = [];

  for (let i = 0; i < users.length; i++) {
    let usr = users[i];
    let obj = {
      to: null,
      title: notification.title,
      body: notification.body,
      "data": { "msg": notification.body, "title": notification.title },
      priority: "high",
      sound: "default",
      badge: '0'
    };
    if (notification.usertype === 'All' && notification.devicetype === 'All') {
      if (usr.pushToken) {
        obj.to = usr.pushToken;
        arr.push(obj);
      }
    } else if (notification.usertype === 'All' && notification.devicetype !== 'All') {
      if (usr.pushToken && usr.userPlatform === notification.devicetype) {
        obj.to = usr.pushToken;
        arr.push(obj);
      }
    } else if (notification.usertype !== 'All' && notification.devicetype === 'All') {
      if (usr.pushToken && usr.usertype === notification.usertype) {
        obj.to = usr.pushToken;
        arr.push(obj);
      }
    } else {
      if (usr.pushToken && usr.usertype === notification.usertype && usr.userPlatform === notification.devicetype) {
        obj.to = usr.pushToken;
        arr.push(obj);
      }
    }
  }

  if (arr.length > 0) {
    fetch('https://exp.host/--/api/v2/push/send', {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arr),
    }).then((responseJson) => {
      dispatch({
        type: SEND_NOTIFICATION_SUCCESS,
        payload: responseJson
      });
      alert(arr.length + " notifications sent.");
    })
      .catch((error) => {
        dispatch({
          type: SEND_NOTIFICATION_FAILED,
          payload: error,
        });
        alert("Notification sending failed.");
      });
  } else {
    dispatch({
      type: SEND_NOTIFICATION_FAILED,
      payload: "No Users Matched",
    });
    alert("No users found matching your selection.");
  }
}