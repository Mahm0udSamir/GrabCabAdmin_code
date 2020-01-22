import React,{ useState,useEffect } from 'react';
import MaterialTable from 'material-table';
import CircularLoading from "../components/CircularLoading";
import { useSelector } from "react-redux";

export default function Bookings() {
    const columns =  [
        { title: 'Booking Date', field: 'tripdate' },
        { title: 'Trip start Time', field: 'trip_start_time' },
        { title: 'Trip End Time', field: 'trip_end_time' },
        { title: 'Customer',field: 'customer_name'},
        { title: 'Car Type', field: 'carType' },
        { title: 'Vehicle Number', field: 'vehicle_number' },  
        { title: 'Pickup Address', field: 'pickupAddress' },
        { title: 'Drop Address', field: 'dropAddress' },
        { title: 'Assign Driver', field: 'driver_name' },
        { title: 'Booking Status', field: 'status' },
        { title: 'Trip cost', field: 'trip_cost' },
        { title: 'Discount Amount', field: 'discount'},
        { title: 'Payment Status', field: 'payment_status'},
        { title: 'Payment Mode', field: 'payment_mode'},
        ];

  const [data, setData] = useState([]);
  const bookingdata = useSelector(state => state.bookingdata);

  useEffect(()=>{
        if(bookingdata.bookings){
            setData(bookingdata.bookings);
        }
  },[bookingdata.bookings]);

  return (
    bookingdata.loading? <CircularLoading/>:
    <MaterialTable
      title="Bookings"
      columns={columns}
      data={data}
      options={{
        exportButton: true
      }}
    />
  );
}
