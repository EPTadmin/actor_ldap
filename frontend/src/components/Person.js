import React from 'react';
import { useEffect } from 'react';
import AxiosInstance from './Axios';
import { useState } from 'react';
import { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import { IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {Link} from 'react-router-dom';


const Person = () => {
    const[myData, setMydata]=useState()
    const[loading,setLoading] = useState(true)


     const GetData = () => {
        AxiosInstance.get(`person/`).then((res) => {
          console.log(res)
          let d = res.data
          console.log('d',d)
          for (let i=0 ; i<d.length ;i++){
            d[i]['courses'] = d[i]['courses'] && d[i]['courses'].map(e=> <>{e.course_id} {e.name}<br/></>)  
            // d[i]['courses'] = [1, 2, 3, 4]
          }
          // d['courses'] = d['courses'] && d['courses'].map(e=> `${e.course_id} ${e.name}`)  
           setMydata(d) 
           console.log(d)
           setLoading(false)
    })


     }
    useEffect(() => { 

        GetData();
   
    },[])




   
      const columns = useMemo(
        () => [
          {
            accessorKey: 'first_name',
            header: 'First Name',
            size: 150,
          },
          {
            accessorKey: 'last_name',
            header: 'Last Name',
            size: 150,
          },
          {
            accessorKey: 'position', //normal accessorKey
            header: 'Position',
            size: 80,
          },
          {
            accessorKey: 'groupe',
            header: 'Group',
            size: 80,
          },



          {
            accessorKey: 'courses',
            header: 'Courses',
            size: 150,
          },
          // {
          //   accessorKey: 'courses_full',
          //   header: 'Courses name',
          //   size: 150,
          // },
          // {
          //   accessorKey: 'activities',
          //   header: 'Activities',
          //   size: 80,
          // },
          
        

        ],
        [],
      );
    

    
      



    return(
        <div>
            { loading ? <p>Loading data ...</p> :
            <MaterialReactTable 
            initialState={{

              columnVisibility: { description: false },
            
              showColumnFilters: true,
      
              sorting: [{ id: 'tableOption', desc: false }],
      
            }}
                columns={columns} 
                data={myData}
                // enableRowActions
      //           renderRowActions={({row}) => (
      //               <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>

      //               {/* <IconButton color="secondary" component = {Link} to={`edit_person/${row.original.id}`}>
      //                   <EditIcon />
      //               </IconButton> */}

      //               {/* <IconButton color="error" component = {Link} to={`delete_person/${row.original.id}`}>
      //                   <DeleteIcon />
      //               </IconButton> */}
      //               </Box>
      // )}

            />
        }
        </div>
        
    )
}



export default Person