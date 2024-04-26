import React from "react"
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale, Legend,Tooltip} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import AxiosInstance from "./Axios"
import { useState,useEffect } from 'react';
import { json } from "react-router-dom";
import ChartDataLabels from 'chartjs-plugin-datalabels';






ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  // ChartDataLabels,
  Tooltip,
  )




const SP =() => {


  const[course, setCourse]=useState()
  const[loading,setLoading] = useState(true)
 const[type,setType]=useState("All")
 const[group,setGroup]=useState("All")

    useEffect(() => { 

      AxiosInstance
      .get(`course/`)
        .then((res) => {

        // console.log(res.data)
        setCourse(res.data) 

       setLoading(false)

      })

   
    },[])




  var color=[]
          color.push("#9ad0f5","#ffb0c1","#f7be85","#ffe6aa","#a4dfdf","#ccb2ff","#6a7e69","#825acf")

var student =[]
var cours_type=[]
if (Array.isArray(course)){
    var data = {
      
        labels: course.filter(x=> x.type !=='PH').filter(x=> x.type !=='MS').map(e=> `${e.course_id} ${e.name}`),
        datasets: [{
          label: 'SP',


          data: course.map(x => x.studiepoeng),
          backgroundColor:color[1],
        }
        
      ],
        
      }
      if (type !== 'All' && group !=='All'){
        data.labels =  course.filter(x=> x.type !=='PH').filter(x=>x.name !='N/A').filter(x => (x.type == type && x.group == group)).map(e=> `${e.course_id} ${e.name}`)
        // if (course.filter(x=> x.type !=='PH').filter(x=>x.name !='N/A').filter(x => (x.type == type && x.group == group)).map(x=>x.studiepoeng)!==20){
        data.datasets[0].data=course.filter(x=> x.type !=='PH').filter(x=>x.name !='N/A').filter(x => (x.type == type && x.group == group)).map(x=>x.studiepoeng)
        student = course.filter(x=> x.type !=='PH').filter(x=>x.name !='N/A').filter(x => (x.type == type && x.group == group)).map(x=>x.nb_student)
        for (var a=0;a<data.datasets[0].data.length;a++){
          data.datasets[0].data[a]=data.datasets[0].data[a].replace(',','.')*student[a]/60
        }
        // }
      }
      else if (type == 'All' && group =='All'){
        data.labels =  course.filter(x=> x.type !=='PH').filter(x=>x.name !='N/A').map(e=> `${e.course_id} ${e.name}`)
        // if (course.filter(x=> x.type !=='PH').filter(x=>x.name !='N/A').map(x => x.studiepoeng)!==20){
        data.datasets[0].data=(course.filter(x=> x.type !=='PH').filter(x=>x.name !='N/A').map(x => x.studiepoeng))
        cours_type=course.filter(x=> x.type)
        student = course.filter(x=> x.type !=='PH').filter(x=>x.name !='N/A').map(x => x.nb_student)
        for (var a=0;a<data.datasets[0].data.length;a++){
          data.datasets[0].data[a]=data.datasets[0].data[a].replace(',','.')*student[a]/60
        }

        // }
      }

      else if (type == 'All'){
        data.labels =  course.filter(x=> x.type !=='PH').filter(x=>x.name !='N/A').filter(x => x.group == group).map(e=> `${e.course_id} ${e.name}`)
        // if(course.filter(x=> x.type !=='PH').filter(x=>x.name !='N/A').filter(x => x.group == group).map(x=>x.studiepoeng)!==20){
        data.datasets[0].data=course.filter(x=> x.type !=='PH').filter(x=>x.name !='N/A').filter(x => x.group == group).map(x=>x.studiepoeng)
        student = course.filter(x=> x.type !=='PH').filter(x=>x.name !='N/A').filter(x => x.group == group).map(x=>x.nb_student)
        for (var a=0;a<data.datasets[0].data.length;a++){
          data.datasets[0].data[a]=data.datasets[0].data[a].replace(',','.')*student[a]/60
        }
        // }
      }

      else{
        data.labels =  course.filter(x => x.type == type).filter(x=>x.name !='N/A').map(e=> `${e.course_id} ${e.name}`)
        // if(course.filter(x => x.type == type).filter(x=>x.name !='N/A').map(x=>x.studiepoeng)!==20){
        data.datasets[0].data=course.filter(x => x.type == type).filter(x=>x.name !='N/A').map(x=>x.studiepoeng)
        student=course.filter(x => x.type == type).filter(x=>x.name !='N/A').map(x=>x.nb_student)
        for (var a=0;a<data.datasets[0].data.length;a++){
          data.datasets[0].data[a]=data.datasets[0].data[a].replace(',','.')*student[a]/60
        }
        // }
      
      }

    var options = {
    //   plugins: {
    //     datalabels: {
    //     // formatter:(value) =>{
    //     //   return value > 0 ?  value.toFixed(2) : '' ;
    //     // },

    //     anchor: "end",
    //     align: "end"
    //   }
    // },
      tooltips: {
        enable:'true',
        mode: 'index'
      },
      interaction: {
        mode: 'index'
    },
      legend: {
        display: true,
     },
     
      indexAxis: 'y',
      responsive: false,

      maintainAspectRatio:false,
      scales: {
        y: {
          // beginAtZero: true
          display: true,
          title: {
            display: true,
            text: 'Course ID',
            color: '#000',
            font: {
              family: 'Comic Sans MS',
              size: 20,
              weight: 'bold',
              lineHeight: 1.2,
            },
            padding: {top: 20, left: 0, right: 0, bottom: 0}
          }
        },
        x: {
          display: true,
          title: {
            display: true,
            text: 'SP',
            color: '#000',
            font: {
              family: 'Comic Sans MS',
              size: 20,
              weight: 'bold',
              lineHeight: 1.2,
            },
            padding: {top: 20, left: 0, right: 0, bottom: 0}
          }

      }
  }
  
}

    return(
        
        <div>
              <div className="selectBox"><a >Choose a group</a>
    <select id="groupselect" onChange={(e)=>setGroup(e.target.value)}>
      <option value = "All">All</option>
      <option value = "s">Sustainable Energy Systems</option>
      <option value = "i">IndEcol</option>
      <option value = "p">Process and Power</option>
      <option value = "t">Thermo-Fluid</option>
    </select>
  </div>

<div className="selectBox"><a >Choose a course type</a>
  <select id="typeselect" onChange={(e)=>setType(e.target.value)} >
    <option value = "All" >All</option>

    <option value = "O1">O1</option>
    <option value = "O2">O2</option>
    <option value = "FE">FE</option>
    <option value = "FP">FP</option>
    {/* <option value = "MS">MS</option> */}
    {/* <option value = "PH">PH</option> */}

  </select>
</div>

<br></br>
<br></br>

{/* <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>  */}
<script src="https://cdn.jsdelivr.net/npm/chart.js@3.0.0/dist/chart.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.8.0/chart.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0"></script>

            <Bar
            
            data = {data}
            options={options}
            height ={900}
            width ={2000}

            />
        </div>
    )
    
}

}


export default SP