import React from "react"
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import AxiosInstance from "../components/Axios"
import { useState,useEffect } from 'react';
import { json } from "react-router-dom";







ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  )
//   function getRandomColor() {
//     var letters = '0123456789ABCDEF'.split('');
//     var color = '#';
//     for (var i = 0; i < 6; i++ ) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }



const BarChart =() => {
  const[course, setCourse]=useState()
  const[loading,setLoading] = useState(true)

     const GetData = () => {
      setTimeout(() => {

        AxiosInstance
          .get(`course/`)
            .then((res) => {

            // console.log(res.data)
            setCourse(res.data) 

           setLoading(false)

          });

        }, 500);


     }
    useEffect(() => { 

        GetData();

   
    },[])
    console.log('array ?',Array.isArray(course))




  var color=[]
          color.push("#9ad0f5","#ffb0c1","#f7be85","#ffe6aa","#a4dfdf","#ccb2ff","#6a7e69","#825acf")


if (Array.isArray(course)){
console.log(course.map(x => x.id))
    var data = {

        labels: course.map(x => x.course_id),
        datasets: [{
          label: '# of Votes',
          data: course.map(x => x.nb_student),
          backgroundColor:color[2],
        }]
      }

    var options = {
      indexAxis: 'y',
      responsive: true,

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
            text: 'Nber of Students',
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
  }}

    return(
        <div>
            <Bar
            data = {data}
            options={options}
            height ={900}
            />
        </div>
    )
}
}
export default BarChart