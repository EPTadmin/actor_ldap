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


const Person_activity = () => {
    const[myData, setMydata]=useState()
    const[loading,setLoading] = useState(true)


     const GetData = () => {
        AxiosInstance.get(`person_activity/`).then((res) => {
           setMydata(res.data) 
           console.log(res.data)
           setLoading(false)
    })


     }
    useEffect(() => { 

        GetData();
   
    },[])

   
      const columns = useMemo(
        () => [
          // {
          //   accessorKey: 'person',
          //   header: 'Person',
          //   size: 150,
          // },
          {
            accessorKey: 'person_full', 
            header: 'Name',
            size: 50,
          },
          // {
          //   accessorKey: 'activity',
          //   header: 'Activity',
          //   size: 150,
          // },
          {
            accessorKey: 'activity_full',
            header: 'Activity',
            size: 150,
          },
          {
            accessorKey: 'amount', //normal accessorKey
            header: 'Amount',
            size: 4,
          },
          
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
                enableRowActions
                renderRowActions={({row}) => (
                    <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>

                    <IconButton color="secondary" component = {Link} to={`edit_position/${row.original.id}`}>
                        <EditIcon />
                    </IconButton>

                    {/* <IconButton color="error" component = {Link} to={`delete/${row.original.id}`}>
                        <DeleteIcon />
                    </IconButton> */}
                    </Box>
      )}

            />
        }
        </div>
        
    )
}



export default Person_activity