import React from 'react';
import { useEffect } from 'react';
import AxiosInstance from './Axios';
import { useState } from 'react';
import { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box,   useMediaQuery } from '@mui/material';
import { IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {Link} from 'react-router-dom';


const Home = () => {
    const[myData, setMydata]=useState()
    const[loading,setLoading] = useState(true)


     const GetData = () => {
        AxiosInstance.get(`course/`).then((res) => {
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
          {
            accessorKey: 'course_id',
            header: 'ID',
            size: 150,
          },
          {
            accessorKey: 'name',
            header: 'Name',
            size: 150,
          },
          {
            accessorKey: 'type', //normal accessorKey
            
            header: 'Type',
            size: 200,
            
          },
          {
            accessorKey: 'group',
            header: 'Group',
            size: 150,
          },
          {
            accessorKey: 'semester',
            header: 'Semester',
            size: 150,
          },
          {
            accessorKey: 'studiepoeng',
            header: 'Studiepoeng',
            size: 150,
          },
          {
            accessorKey: 'nb_student',
            header: 'Nber of Students',
            size: 150,
          },
          {
            accessorKey: 'nb_vit',
            header: 'Nber of VitAss',
            size: 150,
          },
          {
            accessorKey: 'nb_stud_ass',
            header: 'Nber Stud. Ass',
            size: 150,
          },

        ],
        [],
      );
    

    



    return(
        <div>
            { loading ? <p>Loading data ...</p> :
            <MaterialReactTable 
            // isMultiSortEvent={true} 
            // maxMultiSortColCount={3}
            initialState={{
              
              sorting:
                [{
                  id :'semester',
                  desc : false,
                }],
              
              columnVisibility: { description: false },
              pagination:{
                pageSize:300,
                pageIndex:0, },
              showColumnFilters: true,
              // enablePagination:false,
      
            }}
                enableRowActions
                columns={columns} 
                data={myData}
                enableColumnFilters
                
                renderRowActions={({row}) => (
                    <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>

                    <IconButton color="secondary" component = {Link} to={`edit/${row.original.id}`}>
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



export default Home