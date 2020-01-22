import React,{ useState,useEffect } from 'react';
import MaterialTable from 'material-table';
import { useSelector, useDispatch } from "react-redux";
import CircularLoading from "../components/CircularLoading";

import {
    sendNotification,
    editNotifications
  }  from "../actions/notificationactions";

export default function Notifications() {
    const columns =  [
        {
          title: 'Device Type',
          field: 'devicetype',
          lookup: { All: 'All', ANDROID: 'Android', IOS: 'iOS' },
        },
        {
          title: 'User Type',
          field: 'usertype',
          lookup: { All: 'All', rider: 'Rider', driver:'Driver' },
        },
        { title: 'Title',field: 'title'},
        { title: 'Body', field: 'body' },
    ];

  const [data, setData] = useState([]);
  const notificationdata = useSelector(state => state.notificationdata);
  const dispatch = useDispatch();

  useEffect(()=>{
        if(notificationdata.notifications){
            setData(notificationdata.notifications);
        }
  },[notificationdata.notifications]);

  return (
    notificationdata.loading? <CircularLoading/>:
    <MaterialTable
      title="Push Notifications"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const tblData = data;
              tblData.push(newData);
              dispatch(sendNotification(newData));
              dispatch(editNotifications(tblData,"Add"));
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const tblData = data;
              tblData.splice(tblData.indexOf(oldData), 1);
              dispatch(editNotifications(tblData,"Delete"));
            }, 600);
          }),
      }}
    />
  );
}
