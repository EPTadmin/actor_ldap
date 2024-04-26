import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import {Link, useLocation} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { IconButton } from '@mui/material';
// import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
// import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BarChartIcon from '@mui/icons-material/BarChart';
import WindPowerIcon from '@mui/icons-material/WindPower';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import WavesIcon from '@mui/icons-material/Waves';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SpeedIcon from '@mui/icons-material/Speed';
import ScoreIcon from '@mui/icons-material/Score';

export default function Navbar(props) {

  const {drawerWidth,content} = props

  const location = useLocation()
  const path = location.pathname

  const[open, setOpen] = React.useState(false);
  const changeOpenStatus = () =>{
    setOpen(!open)
  }

  const myDrawer =(
    <div>
      <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <br></br>
          <a>Database</a>
              <ListItem  disablePadding>
                <ListItemButton component ={Link} to ="" selected={"/" === path}>
                  <ListItemIcon>
                    <ListAltIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"Courses"} />
                </ListItemButton>
              </ListItem>
              <ListItem  disablePadding>
                <ListItemButton component ={Link} to ="/person" selected={"/person" === path}>
                  <ListItemIcon>
                    <RecentActorsIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"Persons"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding >
                <ListItemButton component ={Link} to ="/person_course" selected={"/person_course" === path}>
                  <ListItemIcon>
                    <AssignmentIndIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"Teaching Load"} />
                </ListItemButton>
              </ListItem>
              
              <ListItem disablePadding >
                <ListItemButton component ={Link} to ="/person_activity" selected={"/person_activity" === path}>
                  <ListItemIcon>
                    <ManageAccountsIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"Position Load"} />
                </ListItemButton>
              </ListItem>
              <br></br>

            {/* <a>Create new entries</a>
            <ListItem disablePadding>
                <ListItemButton component ={Link} to ="/create" selected={"/create" === path}>
                  <ListItemIcon>
                    <PlaylistAddIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"Create a new course"} />
                </ListItemButton>
              </ListItem> */}
              
              {/* <ListItem disablePadding>
                <ListItemButton component ={Link} to ="/create_person" selected={"/create_person" === path}>
                  <ListItemIcon>
                    <PersonAddAlt1Icon/>
                  </ListItemIcon>
                  <ListItemText primary={"Create a new person"} />
                </ListItemButton>
              </ListItem> */}


                            <br></br>

            <a>Graphs</a>
              <ListItem disablePadding >
                <ListItemButton component ={Link} to ="/chart_test" selected={"/chart_test" === path}>
                  <ListItemIcon>
                    <BarChartIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"Number of Students per course"} />
                </ListItemButton>
              </ListItem>



              <ListItem disablePadding>
                <ListItemButton component ={Link} to ="/chart_courses_i" selected={"/chart_courses_i" === path}>
                  <ListItemIcon>
                    <EnergySavingsLeafIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"IndEcol's Courses"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component ={Link} to ="/chart_courses_p" selected={"/chart_courses_p" === path}>
                  <ListItemIcon>
                    <WindPowerIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"Process and Power's Courses"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component ={Link} to ="/chart_courses_s" selected={"/chart_courses_s" === path}>
                  <ListItemIcon>
                    <BatteryChargingFullIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"Sustainable Energy Systems' Courses"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component ={Link} to ="/chart_courses_t" selected={"/chart_courses_t" === path}>
                  <ListItemIcon>
                    <WavesIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"Thermo-Fluid's Courses"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component ={Link} to ="/chart_load" selected={"/chart_load" === path}>
                  <ListItemIcon>
                    <SpeedIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"Full Overview"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component ={Link} to ="/chart_sp" selected={"/chart_sp" === path}>
                  <ListItemIcon>
                    <ScoreIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"SP"} />
                </ListItemButton>
              </ListItem>
<br></br>
              <ListItem disablePadding >
                <ListItemButton component ={Link} to ="/about" selected={"/about" === path}>
                  <ListItemIcon>
                    <InfoIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"About"} />
                </ListItemButton>
              </ListItem>
          </List>
        </Box>



    </div>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>

          <IconButton 
            color = "inheret"
            onClick={changeOpenStatus}
            sx={{mr:2,display:{sm:"none"}}}
            >
            <MenuIcon/>
          </IconButton>

          <Typography variant="h5" noWrap component="div">
            ACTOR
           </Typography>
        </Toolbar>
      </AppBar>



      <Drawer
        variant="permanent"
        sx={{
          display:{xs:"none",sm:"block"},
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
      {myDrawer}


      </Drawer>

      <Drawer
        variant="temporary"
        open ={open}
        onClose = {changeOpenStatus}
        sx={{
          display:{xs:"block",sm:"none"},
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
      {myDrawer}


      </Drawer>


      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
          {content}
      </Box>
    </Box>
  );
}
