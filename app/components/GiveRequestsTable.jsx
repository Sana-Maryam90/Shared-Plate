"use client"
import React,{useState,useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';

const rows = [
  { id: 1, name:'Fatima Zehra',givingOrg :'Alkhidmat Welfare Foundation',contact:'12345678901',foodType:'Packaged Food',foodServing:'4',status:'closed',location:'location',landmark:'landmark'},
  { id: 2, name:'Fatima Zehra',givingOrg :'Alkhidmat Welfare Foundation',contact:'12345678901',foodType:'Packaged Food',foodServing:'4',status:'closed',location:'location',landmark:'landmark'},
  { id: 3, name:'Fatima Zehra',givingOrg :'Alkhidmat Welfare Foundation',contact:'12345678901',foodType:'Packaged Food',foodServing:'4',status:'closed',location:'location',landmark:'landmark'},
  { id: 4, name:'Fatima Zehra',givingOrg :'Alkhidmat Welfare Foundation',contact:'12345678901',foodType:'Packaged Food',foodServing:'4',status:'closed',location:'location',landmark:'landmark'},
];

const columns = [
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'givingOrg', headerName: 'Giving Organization', width: 150 },
  { field: 'contact', headerName: 'Contact', width: 150 },
  { field: 'foodType', headerName: 'Food Type', width: 150 },
  { field: 'foodServing', headerName: 'Servings', width: 150 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'location', headerName: 'Location', width: 150 },
  { field: 'landmark', headerName: 'Landmark', width: 150 },
];

const GiveRequestsTable = () => {

  const [data, setData] = useState([]);

  useEffect(()=>{
    const fetchData = async (userId) => {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/profile/${userId}`
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData('65d41c1045d8f532eb66ede3');
  },['65d41c1045d8f532eb66ede3'])

  return (
    <div className="w-[50%] md:w-[60%] lg:w-[60%]  m-4  bg-green/10 border border-black/25 ml-28">
      <DataGrid rows={data} columns={columns} />
    </div>
  )

}
export default GiveRequestsTable
