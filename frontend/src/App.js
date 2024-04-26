import React from 'react';
import './App.css';
import BarChart from './components/Chart_nb_student';
import {Chart} from 'chart.js';
import {Routes, Route,useLocation} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Create from './components/Create';
import Navbar from './components/NavBar';
import Edit from './components/Edit';
import Delete from './components/Delete';
import Person from './components/Person';
import Create_person from './components/Create_person';
import Edit_person from './components/Edit_person';
import Person_course from './components/Person_course';
import Delete_person from './components/Delete_person';
import Person_activity from './components/Person_activity';
import BarChart_i from './components/Chart_courses_i';
import BarChart_s from './components/Chart_courses_s';
import BarChart_p from './components/Chart_courses_p';
import BarChart_t from './components/Chart_courses_t';
import BarChart_load from './components/Chart_load';
import Edit_teaching from './components/Edit_teaching';
import Test from './components/Chart_test';
import Edit_position from './components/Edit_position';
import SP from './components/Chart_sp';
import Login from './components/Login';
import ProtectedRoutes from './components/ProtectedRoutes';
function App() {
  const location=useLocation()
  const noNavbar = location.pathname === "/"

  const myWidth = 220
  return (
    <div className="App">
      {
      noNavbar ?
      <Routes>
        <Route path ="/" element={<Login/>}/>
      </Routes>
 
      :



      <Navbar drawerWidth={myWidth}
        content ={      
        <Routes>
          <Route element={<ProtectedRoutes/>}>
          <Route path ="/home" element={<Home/>}/>
          <Route path ="/about" element={<About/>}/>
          <Route path ="/create" element={<Create/>}/>
          <Route path ="/edit/:id" element={<Edit/>}/>
          <Route path ="/delete/:id" element={<Delete/>}/>

          <Route path ="/person" element={<Person/>}/>
          <Route path ="/person/edit_person/:id" element={<Edit_person/>}/>
          <Route path ="/person/delete_person/:id" element={<Delete_person/>}/>

          <Route path ="/person_course/" element={<Person_course/>}/>
          <Route path ="/person_course/edit_teaching/:id" element={<Edit_teaching/>}/>

          <Route path ="/person_activity/" element={<Person_activity/>}/>

          <Route path ="/person_activity/edit_position/:id" element={<Edit_position/>}/>
          <Route path ="/create_person" element={<Create_person/>}/>

          <Route path ="/chart_test" element={<Test/>}/>
          <Route path ="/chart_courses_i" element={<BarChart_i/>}/>
          <Route path ="/chart_courses_s" element={<BarChart_s/>}/>
          <Route path ="/chart_courses_p" element={<BarChart_p/>}/>
          <Route path ="/chart_courses_t" element={<BarChart_t/>}/>
          <Route path ="/chart_load" element={<BarChart_load/>}/>
          <Route path ="/chart_sp" element={<SP/>}/>
          </Route>
       </Routes>
      }
      />
    }

         

    </div>
  );
}

export default App;


