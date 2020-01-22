import React,{ useState,useEffect } from 'react';
import MaterialTable from 'material-table';
import { useSelector, useDispatch } from "react-redux";
import CircularLoading from "../components/CircularLoading";

import {
    editPromo
  }  from "../actions/promoactions";

export default function Promos() {
    const columns =  [
        { title: 'Promo Name',field: 'promo_name'},
        { title: 'Description', field: 'promo_description' },
        {
            title: 'Promo Type',
            field: 'promo_discount_type',
            lookup: { flat: 'Flat', percentage: 'Percentage' },
        },
        { title: 'Promo Discount value',field: 'promo_discount_value', type: 'numeric'},
        { title: 'Max Limit Value', field: 'max_promo_discount_value', type: 'numeric' },
        { title: 'Minimum Order Count', field: 'min_order' , type: 'numeric'},
        { title: 'Start Date (dd/mm/yyyy)',field: 'promo_start'},
        { title: 'End Date (dd/mm/yyyy)', field: 'promo_validity' },
        { title: 'Promo Usage Limit', field: 'promo_usage_limit', type: 'numeric' },
        { title: 'Promo Used By', field: 'promo_used_by', editable:'never' }
    ];

  const [data, setData] = useState([]);
  const promodata = useSelector(state => state.promodata);
  const dispatch = useDispatch();

  useEffect(()=>{
        if(promodata.promos){
            setData(promodata.promos);
        }
  },[promodata.promos]);

  const removeExtraKeys = (tblData) =>{
    const obj = {};
    for(let i = 0;i<tblData.length;i++){
        if(tblData[i].promo_discount_value) tblData[i].promo_discount_value = parseFloat(tblData[i].promo_discount_value);
        if(tblData[i].max_promo_discount_value) tblData[i].max_promo_discount_value = parseFloat(tblData[i].max_promo_discount_value);
        if(tblData[i].min_order) tblData[i].min_order = parseFloat(tblData[i].min_order);
        if(tblData[i].promo_usage_limit) tblData[i].promo_usage_limit = parseFloat(tblData[i].promo_usage_limit);
        obj[tblData[i].id] = tblData[i];
        delete obj[tblData[i].id].promo_used_by;
        delete obj[tblData[i].id].id;
    }
    return obj;
  }

  return (
    promodata.loading? <CircularLoading/>:
    <MaterialTable
      title="Promo and Offers"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const tblData = data;
              tblData.push(newData);
              dispatch(editPromo(removeExtraKeys(tblData),"Add"));
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const tblData = data;
              tblData[tblData.indexOf(oldData)] = newData;
              dispatch(editPromo(removeExtraKeys(tblData),"Update"));
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const tblData = data;
              tblData.splice(tblData.indexOf(oldData), 1);
              dispatch(editPromo(removeExtraKeys(tblData),"Delete"));
            }, 600);
          }), 
      }} 
    />
  );
}
