import React,{useState,useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useUser } from "../hooks/UserContext"
import axios from 'axios'

const columns = [
  { field: 'requestId', headerName: 'Request ID', width: 150 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'contact', headerName: 'Contact', width: 150 },
  { field: 'location', headerName: 'Location', width: 150 },
];

const TakenRequestsTable = () => {
  const { user } = useUser();
  const userId = user.userId;
  const [data, setData] = useState([]);

  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response = await axios.get(`http://localhost:3000/api/profile/${userId}`);
        setData(response.data.result);
      }catch(error){
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  },[userId])

  const rows = [
    { id:1, requestId: "1" , name:'Fatima Zehra',contact:'12345678901',location:'location'},
    { id:2,requestId: "2", name:'Fatima Zehra',contact:'12345678901',location:'location'},
    { id:3,requestId: "3", name:'Fatima Zehra',contact:'12345678901',location:'location'},
    { id:4,requestId:" 4", name:'Fatima Zehra',contact:'12345678901',location:'location'},
  ];

  return (
    <div className="w-[30%] md:w-[40%] lg:w-[50%]  m-4  bg-green/10 border border-black/25 ml-28">
      <DataGrid rows={rows} columns={columns} />
    </div>
  )
}

export default TakenRequestsTable
