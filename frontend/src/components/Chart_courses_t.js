import React, { useCallback } from "react"
import {Chart as ChartJS, Legend, BarElement, CategoryScale, LinearScale, Tooltip} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import AxiosInstance from "./Axios"
import { useState,useEffect } from 'react';
import { json } from "react-router-dom";


function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Tooltip,
  
  )
  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



const BarChart_i =() => {
  const[course, setCourse]=useState()
  const[person, setPerson]=useState()
  const[person_course, setPersonCourse]=useState()
  const[loading,setLoading] = useState(true)
  const[type,setType]=useState("All")


  useEffect(() => { 

    AxiosInstance
    .get(`course/`)
      .then((res) => {

      // console.log(res.data)
      setCourse(res.data) 
        
     setLoading(false)

    });

    AxiosInstance
    .get(`person/`)
      .then((res) => {

      // console.log(res.data)
      setPerson(res.data) 

     setLoading(false)

    });

    AxiosInstance
    .get(`person_course/`)
      .then((res) => {

      // console.log(res.data)
      setPersonCourse(res.data) 

     setLoading(false)

    });

 
  },[])



    var color=[]
          color.push("#9ad0f5","#3d85c6","#ffb0c1","#e06666","#f7be85","#ffe6aa","#a4dfdf","#ccb2ff","#6a7e69","#825acf","#f1c232")
          // var color=[]
          // color.push("#9ad0f5","#3d85c6","#ffb0c1","#e06666","#f7be85","#ffe6aa","#a4dfdf","#ccb2ff","#6a7e69","#825acf","#f1c232","#93c47d","#a64d79","#cc0000","#783f04","#999999","#f4ff6c","#dd35d6")



if (Array.isArray(course)&&Array.isArray(person)&&Array.isArray(person_course)){
// console.log('course',course)
// console.log('person',person)
//console.log('person_course',person_course)


var course_thermo = course.filter(x => x.group ==="t").filter(x => x.type != 'MS').filter(x => x.type != 'FP')
var course_thermo_id = course_thermo.map(x => x.id)


var array =[]
var lecturer = person_course.map(x => x.person)

let unique_lecturer = lecturer.filter(function(value, index, array) {
  return array.indexOf(value) === index;
}); 
var unique_lecturer_name = []
for (let a = 0;a<unique_lecturer.length;a++){
    unique_lecturer_name.push(person.filter(x=>x.id === unique_lecturer[a]).map(x=> x.first_name + ' '+ x.last_name))
}


let text = "["
let text2 = "]"
var array_new=[]
var array_new2=[]
var array_new_total =[]
var array_new_total2 = []
var p=0
var q =0

for (let a=0; a<person_course.length;a++){
  if (course_thermo_id.includes(person_course[a].course)){
    array.push({Teaching : person_course[a].course,Lecturer : person_course[a].person,Amount : person_course[a].amount,Comment : person_course[a].comment})
  
  }
}


// console.log('unique lecturer',unique_lecturer.length)
// console.log('course ind',course_thermo_id.length,course_thermo_id[7])
for (let k =0;k<unique_lecturer.length;k++){
 for (let i=0;i<course_thermo_id.length;i++){
  for (let j=0;j<array.map(x=>x.Teaching).length;j++){
      // console.log('test', k,i,j)
      // console.log(unique_lecturer[k],array[j].Lecturer)

      if (((unique_lecturer[k] != array[j].Lecturer) && (course_thermo_id[i] != array[j].Teaching)) || ((unique_lecturer[k] == array[j].Lecturer) && (course_thermo_id[i] != array[j].Teaching)) || ((unique_lecturer[k] != array[j].Lecturer) && (course_thermo_id[i] == array[j].Teaching))) {
        p=0
        q=0
      }

      if ((unique_lecturer[k] == array[j].Lecturer) && (course_thermo_id[i] == array[j].Teaching)){
        p=array[j].Amount
        q=1
        // console.log(p,q)
        // if (q!=null){console.log(q,'q non vide')}
        // console.log('q pres modif',q)
        j=array.length
      }
    }
    array_new.push(p)
    array_new2.push((q));
    // console.log('array2', array_new2)


  
  }

  array_new_total.push(text.concat([array_new]).concat(text2))  
  array_new_total2.push(text.concat([array_new2]).concat(text2))

  array_new=[]
  array_new2=[]



}

// console.log('array_new_total',array_new_total)
// console.log('array_new_total2',array_new_total2)


var lineChartData_thermo = {
  labels: course.filter(x => x.group ==="t").filter(x => x.type != 'MS').filter(x => x.type != 'FP'),

    datasets: []
}
// var lineChartData_thermo2 = {
//   labels: course.filter(x => x.group ==="t").filter(x => x.type != 'MS').filter(x => x.type != 'FP'),

//     datasets: []
// }
// console.log('array_new_total2',array_new_total2)




array_new_total.forEach(function (a, i) {
  // console.log('a et i',a,i)
  if (JSON.parse(a).every(item => item === 0))
      {//console.log(a,i)
        // console.log('console')
        //data.splice(i, 1);labels.splice(i, 1);i--;
      }
      // else{array_new_total2.forEach(function (b, j) {  if (JSON.parse(b).every(item => item === 0))
      //   {
      //     // console.log('console')
      //     //data.splice(i, 1);labels.splice(i, 1);i--;
      //   }})
        else{

        // console.log('a',a,i)
        lineChartData_thermo.datasets.push({
          label:   unique_lecturer_name[i],
          fillColor: 'rgba(220,220,220,0.2)',
          strokeColor: 'rgba(220,220,220,1)',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke:
              'rgba(220,220,220,1)',
          data: JSON.parse(a),
          footer: JSON.parse(a)          
          
       })
      };




  }
);




var data_set=[]

for (let a=0; a<lineChartData_thermo.datasets.map(x=>x.label).length;a++){
  data_set.push({label : lineChartData_thermo.datasets.map(x=>x.label)[a],data : lineChartData_thermo.datasets.map(x=>x.data)[a],backgroundColor : color[a],footer : lineChartData_thermo.datasets.map(x=>x.footer)[a]})

  }

// console.log('data_Set',data_set)

var data ={
       labels: lineChartData_thermo.labels.map(x=>x.course_id + ' ' + x.name),
        datasets:data_set

      }
      // console.log('data',data.datasets[0].label)


if (type !== 'All' & type !== 'H' & type !== 'V'){

  var course_thermo = course.filter(x => x.group ==="t").filter(x => x.type === type).filter(x => x.type != 'MS').filter(x => x.type != 'FP')
  var course_thermo_id = course_thermo.map(x => x.id)
  
  
  var array =[]
  var lecturer = person_course.map(x => x.person)
  
  let unique_lecturer = lecturer.filter(function(value, index, array) {
    return array.indexOf(value) === index;
  }); 
  var unique_lecturer_name = []
  for (let a = 0;a<unique_lecturer.length;a++){
      unique_lecturer_name.push(person.filter(x=>x.id === unique_lecturer[a]).map(x=> x.first_name + ' '+ x.last_name))
  }
  
  
  let text = "["
  let text2 = "]"
  var array_new=[]
  var array_new_total =[]
  var p=0
  
  for (let a=0; a<person_course.length;a++){
    if (course_thermo_id.includes(person_course[a].course)){
      array.push({Teaching : person_course[a].course,Lecturer : person_course[a].person,Amount : person_course[a].amount,Comment : person_course[a].comment})
    
    }
  }
  //  console.log('array',array.map(x=>x.Teaching))
  // console.log('unique lecturer',unique_lecturer.length)
  // console.log('course ind',course_thermo_id.length,course_thermo_id[7])
  for (let k =0;k<unique_lecturer.length;k++){
   for (let i=0;i<course_thermo_id.length;i++){
    for (let j=0;j<array.map(x=>x.Teaching).length;j++){
        // console.log('test', k,i,j)
        // console.log(unique_lecturer[k],array[j].Lecturer)
  
        if (((unique_lecturer[k] != array[j].Lecturer) && (course_thermo_id[i] != array[j].Teaching)) || ((unique_lecturer[k] == array[j].Lecturer) && (course_thermo_id[i] != array[j].Teaching)) || ((unique_lecturer[k] != array[j].Lecturer) && (course_thermo_id[i] == array[j].Teaching))) {
          p=0
        }
        if ((unique_lecturer[k] == array[j].Lecturer) && (course_thermo_id[i] == array[j].Teaching)){
          p=array[j].Amount
          j=array.length
        }
      }
      array_new.push(p)
    }
    array_new_total.push(text.concat([array_new]).concat(text2))
    array_new=[]
  }
  
  // console.log('array_new_total',array_new_total)
  
  var lineChartData_thermo = {
    labels: course.filter(x => x.group ==="t").filter(x => x.type === type).filter(x => x.type != 'MS').filter(x => x.type != 'FP'),
  
      datasets: []
  }
  
  
  array_new_total.forEach(function (a, i) {
    // console.log(a,i)
    if (JSON.parse(a).every(item => item === 0))
        {//console.log(a,i)
          // console.log('console')
          //data.splice(i, 1);labels.splice(i, 1);i--;
        }
        else{
          lineChartData_thermo.datasets.push({
            label:   unique_lecturer_name[i],
            fillColor: 'rgba(220,220,220,0.2)',
            strokeColor: 'rgba(220,220,220,1)',
            pointColor: 'rgba(220,220,220,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke:
                'rgba(220,220,220,1)',
            data: JSON.parse(a)
            
            
         })
        };
  
    }
  );
  
  console.log('lineChart',lineChartData_thermo)
  
  
  var data_set=[]
  
  for (let a=0; a<lineChartData_thermo.datasets.map(x=>x.label).length;a++){
      data_set.push({label : lineChartData_thermo.datasets.map(x=>x.label)[a],data : lineChartData_thermo.datasets.map(x=>x.data)[a],backgroundColor : color[a],footer : lineChartData_thermo.datasets.map(x=>x.data)[a]})
    }
  
  // console.log('data_Set',data_set)
  
  var data ={
         labels: lineChartData_thermo.labels.map(x=>x.course_id + ' ' + x.name),
          datasets:data_set
  
        }
  
        // console.log('data',data.datasets[0].label)
      }
      
    else  if (type === 'H' | type === 'V'){

        var course_thermo = course.filter(x => x.group ==="t").filter(x => x.semester === type).filter(x => x.type != 'MS').filter(x => x.type != 'FP')
        var course_thermo_id = course_thermo.map(x => x.id)
        
        
        var array =[]
        var lecturer = person_course.map(x => x.person)
        
        let unique_lecturer = lecturer.filter(function(value, index, array) {
          return array.indexOf(value) === index;
        }); 
        var unique_lecturer_name = []
        for (let a = 0;a<unique_lecturer.length;a++){
            unique_lecturer_name.push(person.filter(x=>x.id === unique_lecturer[a]).map(x=> x.first_name + ' '+ x.last_name))
        }
        
        
        let text = "["
        let text2 = "]"
        var array_new=[]
        var array_new_total =[]
        var p=0
        
        for (let a=0; a<person_course.length;a++){
          if (course_thermo_id.includes(person_course[a].course)){
            array.push({Teaching : person_course[a].course,Lecturer : person_course[a].person,Amount : person_course[a].amount,Comment : person_course[a].comment})
          
          }
        }
        //  console.log('array',array.map(x=>x.Teaching))
        // console.log('unique lecturer',unique_lecturer.length)
        // console.log('course ind',course_thermo_id.length,course_thermo_id[7])
        for (let k =0;k<unique_lecturer.length;k++){
         for (let i=0;i<course_thermo_id.length;i++){
          for (let j=0;j<array.map(x=>x.Teaching).length;j++){
              // console.log('test', k,i,j)
              // console.log(unique_lecturer[k],array[j].Lecturer)
        
              if (((unique_lecturer[k] != array[j].Lecturer) && (course_thermo_id[i] != array[j].Teaching)) || ((unique_lecturer[k] == array[j].Lecturer) && (course_thermo_id[i] != array[j].Teaching)) || ((unique_lecturer[k] != array[j].Lecturer) && (course_thermo_id[i] == array[j].Teaching))) {
                p=0
              }
              if ((unique_lecturer[k] == array[j].Lecturer) && (course_thermo_id[i] == array[j].Teaching)){
                p=array[j].Amount
                j=array.length
              }
            }
            array_new.push(p)
          }
          array_new_total.push(text.concat([array_new]).concat(text2))
          array_new=[]
        }
        
        // console.log('array_new_total',array_new_total)
        
        var lineChartData_thermo = {
          labels: course.filter(x => x.group ==="t").filter(x => x.semester === type).filter(x => x.type != 'MS').filter(x => x.type != 'FP'),
        
            datasets: []
        }
        
        
        array_new_total.forEach(function (a, i) {
          // console.log(a,i)
          if (JSON.parse(a).every(item => item === 0))
              {//console.log(a,i)
                // console.log('console')
                //data.splice(i, 1);labels.splice(i, 1);i--;
              }
              else{
                lineChartData_thermo.datasets.push({
                  label:   unique_lecturer_name[i],
                  fillColor: 'rgba(220,220,220,0.2)',
                  strokeColor: 'rgba(220,220,220,1)',
                  pointColor: 'rgba(220,220,220,1)',
                  pointStrokeColor: '#fff',
                  pointHighlightFill: '#fff',
                  pointHighlightStroke:
                      'rgba(220,220,220,1)',
                  data: JSON.parse(a)
                  
                  
               })
              };
        
          }
        );
        
        console.log('lineChart',lineChartData_thermo)
        
        
        var data_set=[]
        
        for (let a=0; a<lineChartData_thermo.datasets.map(x=>x.label).length;a++){
            data_set.push({label : lineChartData_thermo.datasets.map(x=>x.label)[a],data : lineChartData_thermo.datasets.map(x=>x.data)[a],backgroundColor : color[a],footer : lineChartData_thermo.datasets.map(x=>x.data)[a]})
          }
        
        // console.log('data_Set',data_set)
        
        var data ={
               labels: lineChartData_thermo.labels.map(x=>x.course_id + ' ' + x.name),
                datasets:data_set
        
              }
        
              // console.log('data',data.datasets[0].label)
            }


else if (type == 'All'){
var data ={
       labels: lineChartData_thermo.labels.map(x=>x.course_id + ' ' + x.name),
        datasets:data_set

      }

      }
    var options = {
    
      tooltips: {
        mode: 'index',
      
      },
      plugins : {
        tooltip : {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          callbacks:{
                    labelTextColor:function(context){
                      let label = context.dataset.label || '';
                      if (array.filter(x=>x.Lecturer == person.filter(x=>x.first_name ==context.dataset.label[0].split(" ")[0]).filter(x=>x.last_name == context.dataset.label[0].split(" ")[1]).map(x=>x.id)[0]).filter(x=>x.Teaching == course.filter(x=>x.course_id == context.label.split(" ")[0]).map(x=>x.id)[0] ).map(x=>x.Comment)[0] !== null) {
                        if (array.filter(x=>x.Lecturer == person.filter(x=>x.first_name ==context.dataset.label[0].split(" ")[0]).filter(x=>x.last_name == context.dataset.label[0].split(" ")[1]).map(x=>x.id)[0]).filter(x=>x.Teaching == course.filter(x=>x.course_id == context.label.split(" ")[0]).map(x=>x.id)[0] ).map(x=>x.Comment)[0] !== '') {
                          if (array.filter(x=>x.Lecturer == person.filter(x=>x.first_name ==context.dataset.label[0].split(" ")[0]).filter(x=>x.last_name == context.dataset.label[0].split(" ")[1]).map(x=>x.id)[0]).filter(x=>x.Teaching == course.filter(x=>x.course_id == context.label.split(" ")[0]).map(x=>x.id)[0] ).map(x=>x.Comment)[0] !== ' ') {
                        return 'rgba(0, 225, 0)'
                          }
                        }
                      }
                        return '#FFFFFF'

                      
                    },
                    beforeLabel: function(context){
                      if (array.filter(x=>x.Lecturer == person.filter(x=>x.first_name ==context.dataset.label[0].split(" ")[0]).filter(x=>x.last_name == context.dataset.label[0].split(" ")[1]).map(x=>x.id)[0]).filter(x=>x.Teaching == course.filter(x=>x.course_id == context.label.split(" ")[0]).map(x=>x.id)[0] ).map(x=>x.Comment)[0] !== null) {
                        if (array.filter(x=>x.Lecturer == person.filter(x=>x.first_name ==context.dataset.label[0].split(" ")[0]).filter(x=>x.last_name == context.dataset.label[0].split(" ")[1]).map(x=>x.id)[0]).filter(x=>x.Teaching == course.filter(x=>x.course_id == context.label.split(" ")[0]).map(x=>x.id)[0] ).map(x=>x.Comment)[0] !== '') {
                          if (array.filter(x=>x.Lecturer == person.filter(x=>x.first_name ==context.dataset.label[0].split(" ")[0]).filter(x=>x.last_name == context.dataset.label[0].split(" ")[1]).map(x=>x.id)[0]).filter(x=>x.Teaching == course.filter(x=>x.course_id == context.label.split(" ")[0]).map(x=>x.id)[0] ).map(x=>x.Comment)[0] !== ' ') {

                        return array.filter(x=>x.Lecturer == person.filter(x=>x.first_name ==context.dataset.label[0].split(" ")[0]).filter(x=>x.last_name == context.dataset.label[0].split(" ")[1]).map(x=>x.id)[0]).filter(x=>x.Teaching == course.filter(x=>x.course_id == context.label.split(" ")[0]).map(x=>x.id)[0] ).map(x=>x.Comment)[0].toUpperCase();
                        }
                      }
                    }
                  },

                    // label: function(context) {
                    //     let label = context.dataset.label || '';

                    //     if (label) {
                    //       if (array.filter(x=>x.Lecturer == person.filter(x=>x.first_name ==context.dataset.label[0].split(" ")[0]).filter(x=>x.last_name == context.dataset.label[0].split(" ")[1]).map(x=>x.id)[0]).filter(x=>x.Teaching == course.filter(x=>x.course_id == context.label.split(" ")[0]).map(x=>x.id)[0] ).map(x=>x.Comment)[0] !== null) {

                    //         label += ': ';
                    //       }
                    //     }
                    //     if (array.filter(x=>x.Lecturer == person.filter(x=>x.first_name ==context.dataset.label[0].split(" ")[0]).filter(x=>x.last_name == context.dataset.label[0].split(" ")[1]).map(x=>x.id)[0]).filter(x=>x.Teaching == course.filter(x=>x.course_id == context.label.split(" ")[0]).map(x=>x.id)[0] ).map(x=>x.Comment)[0] !== null) {
                            
                    //         label += array.filter(x=>x.Lecturer == person.filter(x=>x.first_name ==context.dataset.label[0].split(" ")[0]).filter(x=>x.last_name == context.dataset.label[0].split(" ")[1]).map(x=>x.id)[0]).filter(x=>x.Teaching == course.filter(x=>x.course_id == context.label.split(" ")[0]).map(x=>x.id)[0] ).map(x=>x.Comment)[0];
                            
                    //       }
                    //     return label
                        
                    // }          
                  
                  
                  },



        },
      },
      legend: {
        display: true,
     },

      indexAxis: 'y',
      responsive: false,

      maintainAspectRatio:false,
      scales: {
        x: {title: {
          display: true,
          text: 'Covered %',
          color: '#000',
          font: {
            family: 'Comic Sans MS',
            size: 20,
            weight: 'bold',
            lineHeight: 1.2,
          },
          padding: {top: 20, left: 0, right: 0, bottom: 0}
        },
            stacked: true
        },
        y: {
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
          },
            stacked: true
        }
    } 
  }

    return(
      <div>
    <div className="selectBox"><a >Choose a course type</a>
  <select id="typeselect" onChange={(e)=>setType(e.target.value)} >
    <option value = "All" >All</option>
    <option value = "V">All spring courses</option>
    <option value = "H">All fall courses</option>
    <option value = "O1">O1</option>
    <option value = "O2">O2</option>
    <option value = "FE">FE</option>
    {/* <option value = "FP">FP</option>
    <option value = "MS">MS</option> */}
    <option value = "PH">PH</option>

  </select>
</div>

<br></br>
<br></br>
{/* <script src= 
"https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"> 
    </script> 
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script> */}

    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.js"></script>
    <center>
            <Bar
            
            data = {data}
            options={options}
            height ={900}
            width ={1500}

            />
    </center>
             
        </div>

)
    
}

}
export default BarChart_i