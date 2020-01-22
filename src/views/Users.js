import React,{ useState,useEffect } from 'react';
import MaterialTable from 'material-table';
import { useSelector, useDispatch } from "react-redux";
import CircularLoading from "../components/CircularLoading";

import {
     editUser, deleteUser
  }  from "../actions/usersactions";

export default function Users() {
  const [data, setData] = useState([]);
  const [cars, setCars] = useState({});
  const usersdata = useSelector(state => state.usersdata);
  const cartypes = useSelector(state => state.cartypes);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(usersdata.users){
        setData(usersdata.users);
    }
  },[usersdata.users]);

  useEffect(()=>{
    if(cartypes.cars){
        let obj =  {};
        cartypes.cars.map((car)=> obj[car.name]=car.name)
        setCars(obj);
    }
  },[cartypes.cars]);

  const columns = [
      { title: 'First Name', field: 'firstName'},
      { title: 'Last Name', field: 'lastName'},
      { title: 'User Type', field: 'usertype', lookup: { rider: 'Rider', driver: 'Driver', admin: 'Admin' }, editable:'never'},
      { title: 'Email', field: 'email', editable:'never'},
      { title: 'Mobile', field: 'mobile'},
      { title: 'Profile Image', field: 'profile_image',render: rowData => rowData.profile_image?<img alt='Profile' src={rowData.profile_image} style={{width: 50,borderRadius:'50%'}}/>:null},
      { title: 'Vehicle Model', field: 'vehicleModel'},
      { title: 'Car Type', field: 'carType',lookup: cars},
      { title: 'Account Approved', field: 'approved', type:'boolean'},
      { title: 'Driver Active Status', field: 'driverActiveStatus', type:'boolean'},
      { title: 'License Image', field: 'licenseImage',render: rowData => rowData.licenseImage?<img alt='License' src={rowData.licenseImage} style={{width: 100}}/>:null},
      { title: 'Vehicle Model', field: 'vehicleModel'},
      { title: 'Vehicle Number', field: 'vehicleNumber'},
      { title: 'Wallet Balance', field: 'walletBalance', type:'numeric'},
      { title: 'Signup Via Referral', field: 'signupViaReferral', type:'boolean', editable:'never'},
      { title: 'Refferal Id', field: 'refferalId', editable:'never'}
  ];

  return (
    usersdata.loading? <CircularLoading/>:
    <MaterialTable
      title="All Users"
      columns={columns}
      data={data}
      options={{
        exportButton: true
      }}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              dispatch(editUser(oldData.id,newData));
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              dispatch(deleteUser(oldData.id));
            }, 600);
          }),  
      }}
    />
  );
}
