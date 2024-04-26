import React from "react"
import {Chart as ChartJS, Legend,Title, BarElement, CategoryScale, LinearScale, LineElement} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import AxiosInstance from "./Axios"
import { useState,useEffect } from 'react';
import { json } from "react-router-dom";






function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

// function onlyUnique(value, index, array_thermo) {
//   return array_thermo.indexOf(value) === index;
// }

// function onlyUnique(value, index, array_sustain) {
//   return array_sustain.indexOf(value) === index;
// }

// function onlyUnique(value, index, array_process) {
//   return array_process.indexOf(value) === index;
// }


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Title,
  )
  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



const BarChart_load =() => {
  const[course, setCourse]=useState([])
  const[person, setPerson]=useState([])
  const[person_course, setPersonCourse]=useState([])
  const[person_activity, setPersonActivity]=useState([])
  const[loading,setLoading] = useState(true)
  const[position_activity,setActivity]=useState([])


  useEffect(() => { 

    AxiosInstance
    .get(`course/`)
      .then((res) => {

      setCourse(res.data) 
        
     setLoading(false)

    });

    AxiosInstance
    .get(`person/`)
      .then((res) => {

      setPerson(res.data) 

     setLoading(false)

    });

    AxiosInstance
    .get(`person_course/`)
      .then((res) => {

      setPersonCourse(res.data) 

     setLoading(false)

    });

    AxiosInstance
    .get(`person_activity/`)
      .then((res) => {

      setPersonActivity(res.data) 

     setLoading(false)

    });

    AxiosInstance
    .get(`position_activity/`)
      .then((res) => {

      setActivity(res.data) 

     setLoading(false)

    });


  },[])



    var color=[]
          color.push("#9ad0f5","#3d85c6","#ffb0c1","#e06666","#f7be85","#ffe6aa","#a4dfdf","#ccb2ff","#6a7e69","#825acf","#f1c232")


if (Array.isArray(course)&&Array.isArray(person)&&Array.isArray(person_course)){



var course_indecol = course.filter(x => x.group ==="i")
var course_indecol_id = course_indecol.map(x => x.id)

var course_thermo = course.filter(x => x.group ==="t")
var course_thermo_id = course_thermo.map(x => x.id)

var course_process = course.filter(x => x.group ==="p")
var course_process_id = course_process.map(x => x.id)

var course_sustain = course.filter(x => x.group ==="s")
var course_sustain_id = course_sustain.map(x => x.id)


var array_indecol =[]
var array_process =[]
var array_thermo =[]
var array_sustain =[]

// console.log('position_activity',position_activity)
// console.log('perspm_activity',person_activity)

var lecturer = person_course.map(x => x.person)

let unique_lecturer = lecturer.filter(function(value, index, array_indecol) {
  return array_indecol.indexOf(value) === index;
}); 



var unique_lecturer_name = []
for (let a = 0;a<unique_lecturer.length;a++){
    unique_lecturer_name.push(person.filter(x=>x.id === unique_lecturer[a]).map(x=> x.first_name + ' '+ x.last_name))
}


var lineChartData_indecol = {
  labels: person.filter(x=>x.groupe === 'i'),

    datasets: []
}
var lineChartData_process = {
  labels: person.filter(x=>x.groupe === 'p'),

    datasets: []
}

var lineChartData_sustain = {
  labels: person.filter(x=>x.groupe === 's'),

    datasets: []
}

var lineChartData_thermo = {
  labels: person.filter(x=>x.groupe === 't'),

    datasets: []
}



let text = "["
let text2 = "]"
var array_indecol_new_O1=[]
var array_indecol_new_O2=[]
var array_indecol_new_FE=[]
var array_indecol_new_FP=[]
var array_indecol_new_MS=[]
var array_indecol_new_PH=[]
var array_indecol_new_position=[]
var array_indecol_new_project=[]


var array_indecol_new_total =[]
var p=0

var array_process_new_O1=[]
var array_process_new_O2=[]
var array_process_new_FE=[]
var array_process_new_FP=[]
var array_process_new_MS=[]
var array_process_new_PH=[]
var array_process_new_position=[]
var array_process_new_project=[]


var array_process_new_total =[]

var array_thermo_new_O1=[]
var array_thermo_new_O2=[]
var array_thermo_new_FE=[]
var array_thermo_new_FP=[]
var array_thermo_new_MS=[]
var array_thermo_new_PH=[]
var array_thermo_new_position=[]
var array_thermo_new_project=[]


var array_thermo_new_total =[]

var array_sustain_new_O1=[]
var array_sustain_new_O2=[]
var array_sustain_new_FE=[]
var array_sustain_new_FP=[]
var array_sustain_new_MS=[]
var array_sustain_new_PH=[]
var array_sustain_new_position=[]
var array_sustain_new_project=[]


var array_sustain_new_total =[]





var type_course =course.filter((x)=>x.type != '-').map((x)=>x.type).filter(onlyUnique)
// console.log(unique_type)
type_course.push('position','project')


for (let a=0; a<person_course.length;a++){
  if (lineChartData_indecol.labels.map(x=>x.id).includes(person_course[a].person)){
    array_indecol.push({Teaching : person_course[a].course,Lecturer : person_course[a].person,Amount : person_course[a].amount})
  }
}

for (let a=0; a<person_course.length;a++){
  if (lineChartData_process.labels.map(x=>x.id).includes(person_course[a].person)){
    array_process.push({Teaching : person_course[a].course,Lecturer : person_course[a].person,Amount : person_course[a].amount})
  }
}

for (let a=0; a<person_course.length;a++){
  if (lineChartData_thermo.labels.map(x=>x.id).includes(person_course[a].person)){
    array_thermo.push({Teaching : person_course[a].course,Lecturer : person_course[a].person,Amount : person_course[a].amount})
  }
}

for (let a=0; a<person_course.length;a++){
  if (lineChartData_sustain.labels.map(x=>x.id).includes(person_course[a].person)){
    array_sustain.push({Teaching : person_course[a].course,Lecturer : person_course[a].person,Amount : person_course[a].amount})
  }
}


var Teaching  = person_course.map((x)=>x.course).filter(onlyUnique)
var Teaching_O1  = course.filter((x) => (x.type === 'O1' )).map(x=>x.id).filter(onlyUnique)
var Teaching_O2  = course.filter((x) => (x.type === 'O2' )).map(x=>x.id).filter(onlyUnique)
var Teaching_FE  = course.filter((x) => (x.type === 'FE' )).map(x=>x.id).filter(onlyUnique)
var Teaching_FP  = course.filter((x) => (x.type === 'FP' )).map(x=>x.id).filter(onlyUnique)
var Teaching_MS  = course.filter((x) => (x.type === 'MS' )).map(x=>x.id).filter(onlyUnique)
var Teaching_PH  = course.filter((x) => (x.type === 'PH' )).map(x=>x.id).filter(onlyUnique)
var Project  = position_activity.filter((x) => (x.emne === 'P' )).map((x)=>x.type).filter(onlyUnique)
var Position  = position_activity.filter((x) => (x.emne === 'L' )).map((x)=>x.type).filter(onlyUnique)


var lecturer_i = person.filter(x => x.groupe === 'i').map(x=> x.id)
var lecturer_i_name = person.filter(x => x.groupe === 'i').map(x=> x.first_name + ' ' + x.last_name)
var lecturer_s = person.filter(x => x.groupe === 's').map(x=> x.id)
var lecturer_s_name = person.filter(x => x.groupe === 's').map(x=> x.first_name + ' ' + x.last_name)

var lecturer_p = person.filter(x => x.groupe === 'p').map(x=> x.id)
var lecturer_p_name = person.filter(x => x.groupe === 'p').map(x=> x.first_name + ' ' + x.last_name)

var lecturer_t = person.filter(x => x.groupe === 't').map(x=> x.id)
var lecturer_t_name = person.filter(x => x.groupe === 't').map(x=> x.first_name + ' ' + x.last_name)

for (let k =0;k<lecturer_i.length;k++){
  var amount_01 = 0
  var amount_02 = 0
  var amount_FE = 0
  var amount_MS = 0
  var amount_PH = 0
  var amount_FP = 0
  var amount_position = 0
  var amount_project = 0
  var amount =0
 for (let i=0;i<Teaching.length;i++){
  for (let j=0;j<array_indecol.map(x=>x.Teaching).length;j++){
      if (((lecturer_i[k] != array_indecol[j].Lecturer) && (Teaching[i] != array_indecol[j].Teaching)) || ((lecturer_i[k] === array_indecol[j].Lecturer) && (Teaching[i] != array_indecol[j].Teaching)) || ((lecturer_i[k] != array_indecol[j].Lecturer) && (Teaching[i] === array_indecol[j].Teaching))) {
        p=0
      }
      if ((lecturer_i[k] === array_indecol[j].Lecturer) && (Teaching[i] === array_indecol[j].Teaching)){

        if (Teaching_O1.includes( Teaching[i])){
          p = array_indecol[j].Amount
          amount_01 = amount_01 +  (array_indecol[j].Amount)/100*280 

        }
        else if (Teaching_O2.includes( Teaching[i])){
          p = array_indecol[j].Amount
          amount_02 = amount_02 +  (array_indecol[j].Amount)/100*252 
        }
        else if (Teaching_FE.includes( Teaching[i])){
          p=array_indecol[j].Amount 
          
          var poeng = course.filter((x) => (x.id) == Teaching[i]).map((x)=>x.studiepoeng)
          poeng = poeng.toString().replace(',','.') 
          amount_FE = amount_FE + ((array_indecol[j].Amount*poeng)/(100*3.75)*125)
        }
          else if (Teaching_FP.includes( Teaching[i])){
 
          p=array_indecol[j].Amount 
          var poeng = course.filter((x) => (x.id) == Teaching[i]).map((x)=>x.studiepoeng)
          poeng = poeng.toString().replace(',','.') 
          if (poeng==7.5){
            amount_FP = amount_FP +  (array_indecol[j].Amount )*30 
          }else if (poeng==15){
            // console.log('avt poeng',lecturer_i[k],poeng,p,array_process[j].Amount)
            amount_FP = amount_FP + (array_indecol[j].Amount )*40 
            // console.log('2',amount_FP)
          }else if (poeng==20){
            amount_FP = amount_FP + (array_indecol[j].Amount )*50 

          }
          // console.log('amount fp',amount_FP)
        }
        else if (Teaching_MS.includes( Teaching[i])){
 
          p=array_indecol[j].Amount 
          var poeng = course.filter((x) => (x.id) == Teaching[i]).map((x)=>x.studiepoeng)
          poeng = poeng.toString().replace(',','.') 
          amount_MS = amount_MS + ((array_indecol[j].Amount*poeng)/30*30)
          // console.log('amount fp',amount_FP)
        }

        else if (Teaching_PH.includes( Teaching[i])){
          var poeng = course.filter((x) => (x.id) == Teaching[i]).map((x)=>x.studiepoeng)
          if  (poeng){
            amount_PH += 250
          }
        }


      }
  }
 }

 if ((person_activity.map((x)=>x.person)).includes(lecturer_i[k]) ){
  // console.log(lecturer_i_name[k],person_activity.filter(x=>x.person === lecturer_i[k]).map(x=>x.activity).length,person_activity.filter(x=>x.person === lecturer_i[k]).map(x=>x.activity))
  for(let a = 0;a<person_activity.filter(x=>x.person === lecturer_i[k]).map(x=>x.activity).length;a++){
    var activity_num = person_activity.filter(x=>x.person === lecturer_i[k]).map(x=>x.activity)[a]

    if (position_activity.map(x=>x.emne)[activity_num-1] === 'L'){
      poeng= (position_activity.map(x=>x.arsverk)[person_activity.filter(x=>x.person === lecturer_i[k]).map(x=>x.activity)[a]-1])
      amount = person_activity.filter(x=>x.person === lecturer_i[k]).filter(x=>x.activity===activity_num).map(x=>x.amount)
      var amount_position = amount_position + 1750*poeng*amount/100
  }
  if (position_activity.map(x=>x.emne)[activity_num-1] === 'P'){
    console.log('prject')
    console.log(lecturer_i_name[k],person_activity.filter(x=>x.person === lecturer_i[k]).map(x=>x.activity)[a])
    poeng= (position_activity.map(x=>x.antall_time)[person_activity.filter(x=>x.person === lecturer_i[k]).map(x=>x.activity)[a]-1])
    console.log('P','poeng',poeng)
    amount = person_activity.filter(x=>x.person === lecturer_i[k]).filter(x=>x.activity===activity_num).map(x=>x.amount)
    // console.log(amount_position)
    var amount_project = amount_project + poeng*amount
}
  }

 }



array_indecol_new_O1.push(amount_01) 
array_indecol_new_O2.push(amount_02) 
array_indecol_new_FE.push(amount_FE) 
array_indecol_new_FP.push(amount_FP) 
array_indecol_new_MS.push(amount_MS) 
array_indecol_new_PH.push(amount_PH) 
array_indecol_new_position.push(amount_position) 
array_indecol_new_project.push(amount_project) 

console.log(lecturer_i_name[k],amount_MS)

}

array_indecol_new_total.push(text.concat([array_indecol_new_O1]).concat(text2)) 
array_indecol_new_total.push(text.concat([array_indecol_new_O2]).concat(text2)) 
array_indecol_new_total.push(text.concat([array_indecol_new_FE]).concat(text2)) 
array_indecol_new_total.push(text.concat([array_indecol_new_FP]).concat(text2)) 
array_indecol_new_total.push(text.concat([array_indecol_new_MS]).concat(text2)) 
array_indecol_new_total.push(text.concat([array_indecol_new_PH]).concat(text2)) 
array_indecol_new_total.push(text.concat([array_indecol_new_position]).concat(text2)) 
array_indecol_new_total.push(text.concat([array_indecol_new_project]).concat(text2)) 




var lineChartData_indecol = {
  labels: lecturer_i_name,

    datasets: []
}
array_indecol_new_total.forEach(function (a, i) {
        lineChartData_indecol.datasets.push({
          label:   lecturer_i_name[i],
          fillColor: 'rgba(220,220,220,0.2)',
          strokeColor: 'rgba(220,220,220,1)',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke:
              'rgba(220,220,220,1)',
          data: JSON.parse(a)
          
       });
      

  }
);

var data_set_indecol=[]
for (let a=0; a<lineChartData_indecol.datasets.map(x=>x.label).length;a++){
    data_set_indecol.push({label : type_course[a],data : lineChartData_indecol.datasets.map(x=>x.data)[a],backgroundColor : color[a]})
  }










































































  for (let k =0;k<lecturer_t.length;k++){
    var amount_01 = 0
    var amount_02 = 0
    var amount_FE = 0
    var amount_MS = 0
    var amount_PH = 0
    var amount_FP = 0
    var amount_position = 0
    var amount_project = 0
   for (let i=0;i<Teaching.length;i++){
    for (let j=0;j<array_thermo.map(x=>x.Teaching).length;j++){
        if (((lecturer_t[k] != array_thermo[j].Lecturer) && (Teaching[i] != array_thermo[j].Teaching)) || ((lecturer_t[k] === array_thermo[j].Lecturer) && (Teaching[i] != array_thermo[j].Teaching)) || ((lecturer_t[k] != array_thermo[j].Lecturer) && (Teaching[i] === array_thermo[j].Teaching))) {
          p=0
        }
        if ((lecturer_t[k] === array_thermo[j].Lecturer) && (Teaching[i] === array_thermo[j].Teaching)){
  
          if (Teaching_O1.includes( Teaching[i])){
            p = array_thermo[j].Amount
            amount_01 = amount_01 +  (array_thermo[j].Amount)/100*280 
  
          }
          else if (Teaching_O2.includes( Teaching[i])){
            p = array_thermo[j].Amount
            amount_02 = amount_02 +  (array_thermo[j].Amount)/100*252 
          }
          else if (Teaching_FE.includes( Teaching[i])){
            p=array_thermo[j].Amount 
            
            var poeng = course.filter((x) => (x.id) == Teaching[i]).map((x)=>x.studiepoeng)
            poeng = poeng.toString().replace(',','.') 
            amount_FE = amount_FE + ((array_thermo[j].Amount*poeng)/(100*3.75)*125)
          }
            else if (Teaching_FP.includes( Teaching[i])){
   
            p=array_thermo[j].Amount 
            var poeng = course.filter((x) => (x.id) == Teaching[i]).map((x)=>x.studiepoeng)
            poeng = poeng.toString().replace(',','.') 
            if (poeng==7.5){
              amount_FP = amount_FP +  (array_thermo[j].Amount )*30 
            }else if (poeng==15){
              // console.log('avt poeng',lecturer_t[k],poeng,p,array_process[j].Amount)
              amount_FP = amount_FP + (array_thermo[j].Amount )*40 
              // console.log('2',amount_FP)
            }else if (poeng==20){
              amount_FP = amount_FP + (array_thermo[j].Amount )*50 
  
            }
            // console.log('amount fp',amount_FP)
          }
          else if (Teaching_MS.includes( Teaching[i])){
   
            p=array_thermo[j].Amount 
            var poeng = course.filter((x) => (x.id) == Teaching[i]).map((x)=>x.studiepoeng)
            poeng = poeng.toString().replace(',','.') 
            amount_MS = amount_MS + ((array_thermo[j].Amount*poeng)/30*30)
            // console.log('amount fp',amount_FP)
          }
  
          else if (Teaching_PH.includes( Teaching[i])){
            var poeng = course.filter((x) => (x.id) == Teaching[i]).map((x)=>x.studiepoeng)
            if  (poeng){
              amount_PH += 250
            }
          }
  
  
        }
    }
   }
  
   if ((person_activity.map((x)=>x.person)).includes(lecturer_t[k]) ){
    // console.log(lecturer_t_name[k],person_activity.filter(x=>x.person === lecturer_t[k]).map(x=>x.activity).length,person_activity.filter(x=>x.person === lecturer_t[k]).map(x=>x.activity))
    for(let a = 0;a<person_activity.filter(x=>x.person === lecturer_t[k]).map(x=>x.activity).length;a++){
      var activity_num = person_activity.filter(x=>x.person === lecturer_t[k]).map(x=>x.activity)[a]
  
      if (position_activity.map(x=>x.emne)[activity_num-1] === 'L'){
  
        // console.log(lecturer_t_name[k],person_activity.filter(x=>x.person === lecturer_t[k]).map(x=>x.activity)[a])
        poeng= (position_activity.map(x=>x.arsverk)[person_activity.filter(x=>x.person === lecturer_t[k]).map(x=>x.activity)[a]-1])
        // console.log('poeng',poeng)
        var amount = person_activity.filter(x=>x.person === lecturer_t[k]).filter(x=>x.activity===activity_num).map(x=>x.amount)
        // console.log(amount_position)
        var amount_position = amount_position + 1750*poeng*amount/100
    }
    if (position_activity.map(x=>x.emne)[activity_num-1] === 'P'){
      console.log('prject')
      console.log(lecturer_t_name[k],person_activity.filter(x=>x.person === lecturer_t[k]).map(x=>x.activity)[a])
      poeng= (position_activity.map(x=>x.antall_time)[person_activity.filter(x=>x.person === lecturer_t[k]).map(x=>x.activity)[a]-1])
      console.log('P','poeng',poeng)
      var amount = person_activity.filter(x=>x.person === lecturer_t[k]).filter(x=>x.activity===activity_num).map(x=>x.amount)
      // console.log(amount_position)
      var amount_project = amount_project + poeng*amount
  }
    }
  
   }
  
  
  
  array_thermo_new_O1.push(amount_01) 
  array_thermo_new_O2.push(amount_02) 
  array_thermo_new_FE.push(amount_FE) 
  array_thermo_new_FP.push(amount_FP) 
  array_thermo_new_MS.push(amount_MS) 
  array_thermo_new_PH.push(amount_PH) 
  array_thermo_new_position.push(amount_position) 
  array_thermo_new_project.push(amount_project) 
  
  
  }
  
  
  array_thermo_new_total.push(text.concat([array_thermo_new_O1]).concat(text2)) 
  array_thermo_new_total.push(text.concat([array_thermo_new_O2]).concat(text2)) 
  array_thermo_new_total.push(text.concat([array_thermo_new_FE]).concat(text2)) 
  array_thermo_new_total.push(text.concat([array_thermo_new_FP]).concat(text2)) 
  array_thermo_new_total.push(text.concat([array_thermo_new_MS]).concat(text2)) 
  array_thermo_new_total.push(text.concat([array_thermo_new_PH]).concat(text2)) 
  array_thermo_new_total.push(text.concat([array_thermo_new_position]).concat(text2)) 
  array_thermo_new_total.push(text.concat([array_thermo_new_project]).concat(text2)) 
  
  
  
  
  var lineChartData_thermo = {
    labels: lecturer_t_name,
  
      datasets: []
  }
  array_thermo_new_total.forEach(function (a, i) {
          lineChartData_thermo.datasets.push({
            label:   lecturer_t_name[i],
            fillColor: 'rgba(220,220,220,0.2)',
            strokeColor: 'rgba(220,220,220,1)',
            pointColor: 'rgba(220,220,220,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke:
                'rgba(220,220,220,1)',
            data: JSON.parse(a)
            
         });
        
  
    }
  );
  
  var data_set_thermo=[]
  for (let a=0; a<lineChartData_thermo.datasets.map(x=>x.label).length;a++){
      data_set_thermo.push({label : type_course[a],data : lineChartData_thermo.datasets.map(x=>x.data)[a],backgroundColor : color[a]})
    }
  
  



















































    for (let k =0;k<lecturer_s.length;k++){
      var amount_01 = 0
      var amount_02 = 0
      var amount_FE = 0
      var amount_MS = 0
      var amount_PH = 0
      var amount_FP = 0
      var amount_position = 0
      var amount_project = 0
     for (let i=0;i<Teaching.length;i++){
      for (let j=0;j<array_sustain.map(x=>x.Teaching).length;j++){
          if (((lecturer_s[k] != array_sustain[j].Lecturer) && (Teaching[i] != array_sustain[j].Teaching)) || ((lecturer_s[k] === array_sustain[j].Lecturer) && (Teaching[i] != array_sustain[j].Teaching)) || ((lecturer_s[k] != array_sustain[j].Lecturer) && (Teaching[i] === array_sustain[j].Teaching))) {
            p=0
          }
          if ((lecturer_s[k] === array_sustain[j].Lecturer) && (Teaching[i] === array_sustain[j].Teaching)){
    
            if (Teaching_O1.includes( Teaching[i])){
              p = array_sustain[j].Amount
              amount_01 = amount_01 +  (array_sustain[j].Amount)/100*280 
    
            }
            else if (Teaching_O2.includes( Teaching[i])){
              p = array_sustain[j].Amount
              amount_02 = amount_02 +  (array_sustain[j].Amount)/100*252 
            }
            else if (Teaching_FE.includes( Teaching[i])){
              p=array_sustain[j].Amount 
              
              var poeng = course.filter((x) => (x.id) == Teaching[i]).map((x)=>x.studiepoeng)
              poeng = poeng.toString().replace(',','.') 
              amount_FE = amount_FE + ((array_sustain[j].Amount*poeng)/(100*3.75)*125)
            }
              else if (Teaching_FP.includes( Teaching[i])){
     
              p=array_sustain[j].Amount 
              var poeng = course.filter((x) => (x.id) == Teaching[i]).map((x)=>x.studiepoeng)
              poeng = poeng.toString().replace(',','.') 
              if (poeng==7.5){
                amount_FP = amount_FP +  (array_sustain[j].Amount )*30 
              }else if (poeng==15){
                // console.log('avt poeng',lecturer_s[k],poeng,p,array_process[j].Amount)
                amount_FP = amount_FP + (array_sustain[j].Amount )*40 
                // console.log('2',amount_FP)
              }else if (poeng==20){
                amount_FP = amount_FP + (array_sustain[j].Amount )*50 
    
              }
              // console.log('amount fp',amount_FP)
            }
            else if (Teaching_MS.includes( Teaching[i])){
     
              p=array_sustain[j].Amount 
              var poeng = course.filter((x) => (x.id) == Teaching[i]).map((x)=>x.studiepoeng)
              poeng = poeng.toString().replace(',','.') 
              amount_MS = amount_MS + ((array_sustain[j].Amount*poeng)/30*30)
              // console.log('amount fp',amount_FP)
            }
    
            else if (Teaching_PH.includes( Teaching[i])){
              var poeng = course.filter((x) => (x.id) == Teaching[i]).map((x)=>x.studiepoeng)
              if  (poeng){
                amount_PH += 250
              }
            }
    
    
          }
      }
     }
    
     if ((person_activity.map((x)=>x.person)).includes(lecturer_s[k]) ){
      // console.log(lecturer_s_name[k],person_activity.filter(x=>x.person === lecturer_s[k]).map(x=>x.activity).length,person_activity.filter(x=>x.person === lecturer_s[k]).map(x=>x.activity))
      for(let a = 0;a<person_activity.filter(x=>x.person === lecturer_s[k]).map(x=>x.activity).length;a++){
        var activity_num = person_activity.filter(x=>x.person === lecturer_s[k]).map(x=>x.activity)[a]
    
        if (position_activity.map(x=>x.emne)[activity_num-1] === 'L'){
    
          // console.log(lecturer_s_name[k],person_activity.filter(x=>x.person === lecturer_s[k]).map(x=>x.activity)[a])
          poeng= (position_activity.map(x=>x.arsverk)[person_activity.filter(x=>x.person === lecturer_s[k]).map(x=>x.activity)[a]-1])
          // console.log('poeng',poeng)
          var amount = person_activity.filter(x=>x.person === lecturer_s[k]).filter(x=>x.activity===activity_num).map(x=>x.amount)
          // console.log(amount_position)
          var amount_position = amount_position + 1750*poeng*amount/100
      }
      if (position_activity.map(x=>x.emne)[activity_num-1] === 'P'){
        console.log('prject')
        console.log(lecturer_s_name[k],person_activity.filter(x=>x.person === lecturer_s[k]).map(x=>x.activity)[a])
        poeng= (position_activity.map(x=>x.antall_time)[person_activity.filter(x=>x.person === lecturer_s[k]).map(x=>x.activity)[a]-1])
        console.log('P','poeng',poeng)
        var amount = person_activity.filter(x=>x.person === lecturer_s[k]).filter(x=>x.activity===activity_num).map(x=>x.amount)
        // console.log(amount_position)
        var amount_project = amount_project + poeng*amount
    }
      }
    
     }
    
    
    
    array_sustain_new_O1.push(amount_01) 
    array_sustain_new_O2.push(amount_02) 
    array_sustain_new_FE.push(amount_FE) 
    array_sustain_new_FP.push(amount_FP) 
    array_sustain_new_MS.push(amount_MS) 
    array_sustain_new_PH.push(amount_PH) 
    array_sustain_new_position.push(amount_position) 
    array_sustain_new_project.push(amount_project) 
    
    
    }
    
    
    array_sustain_new_total.push(text.concat([array_sustain_new_O1]).concat(text2)) 
    array_sustain_new_total.push(text.concat([array_sustain_new_O2]).concat(text2)) 
    array_sustain_new_total.push(text.concat([array_sustain_new_FE]).concat(text2)) 
    array_sustain_new_total.push(text.concat([array_sustain_new_FP]).concat(text2)) 
    array_sustain_new_total.push(text.concat([array_sustain_new_MS]).concat(text2)) 
    array_sustain_new_total.push(text.concat([array_sustain_new_PH]).concat(text2)) 
    array_sustain_new_total.push(text.concat([array_sustain_new_position]).concat(text2)) 
    array_sustain_new_total.push(text.concat([array_sustain_new_project]).concat(text2)) 
    
    
    
    
    var lineChartData_sustain = {
      labels: lecturer_s_name,
    
        datasets: []
    }
    array_sustain_new_total.forEach(function (a, i) {
      lineChartData_sustain.datasets.push({
              label:   lecturer_s_name[i],
              fillColor: 'rgba(220,220,220,0.2)',
              strokeColor: 'rgba(220,220,220,1)',
              pointColor: 'rgba(220,220,220,1)',
              pointStrokeColor: '#fff',
              pointHighlightFill: '#fff',
              pointHighlightStroke:
                  'rgba(220,220,220,1)',
              data: JSON.parse(a)
              
           });
          
    
      }
    );
    
    var data_set_sustain=[]
    for (let a=0; a<lineChartData_sustain.datasets.map(x=>x.label).length;a++){
        data_set_sustain.push({label : type_course[a],data : lineChartData_sustain.datasets.map(x=>x.data)[a],backgroundColor : color[a]})
      }


































    for (let k =0;k<lecturer_p.length;k++){
      var amount_01 = 0
      var amount_02 = 0
      var amount_FE = 0
      var amount_MS = 0
      var amount_PH = 0
      var amount_FP = 0
      var amount_position = 0
      var amount_project = 0
     for (let i=0;i<Teaching.length;i++){
      for (let j=0;j<array_process.map(x=>x.Teaching).length;j++){
          if (((lecturer_p[k] != array_process[j].Lecturer) && (Teaching[i] != array_process[j].Teaching)) || ((lecturer_p[k] === array_process[j].Lecturer) && (Teaching[i] != array_process[j].Teaching)) || ((lecturer_p[k] != array_process[j].Lecturer) && (Teaching[i] === array_process[j].Teaching))) {
            p=0
          }
          if ((lecturer_p[k] === array_process[j].Lecturer) && (Teaching[i] === array_process[j].Teaching)){
    
            if (Teaching_O1.includes( Teaching[i])){
              p = array_process[j].Amount
              amount_01 = amount_01 +  (array_process[j].Amount)/100*280 
    
            }
            else if (Teaching_O2.includes( Teaching[i])){
              p = array_process[j].Amount
              amount_02 = amount_02 +  (array_process[j].Amount)/100*252 
            }
            else if (Teaching_FE.includes( Teaching[i])){
              p=array_process[j].Amount 
              
              var poeng = course.filter((x) => (x.id) == Teaching[i]).map((x)=>x.studiepoeng)
              poeng = poeng.toString().replace(',','.') 
              amount_FE = amount_FE + ((array_process[j].Amount*poeng)/(100*3.75)*125)
            }
              else if (Teaching_FP.includes( Teaching[i])){
     
              p=array_process[j].Amount 
              var poeng = course.filter((x) => (x.id) == Teaching[i]).map((x)=>x.studiepoeng)
              poeng = poeng.toString().replace(',','.') 
              if (poeng==7.5){
                amount_FP = amount_FP +  (array_process[j].Amount )*30 
              }else if (poeng==15){
                // console.log('avt poeng',lecturer_p[k],poeng,p,array_process[j].Amount)
                amount_FP = amount_FP + (array_process[j].Amount )*40 
                // console.log('2',amount_FP)
              }else if (poeng==20){
                amount_FP = amount_FP + (array_process[j].Amount )*50 
    
              }
              // console.log('amount fp',amount_FP)
            }
            else if (Teaching_MS.includes( Teaching[i])){
     
              p=array_process[j].Amount 
              var poeng = course.filter((x) => (x.id) == Teaching[i]).map((x)=>x.studiepoeng)
              poeng = poeng.toString().replace(',','.') 
              amount_MS = amount_MS + ((array_process[j].Amount*poeng)/30*30)
              // console.log('amount fp',amount_FP)
            }
    
            else if (Teaching_PH.includes( Teaching[i])){
              var poeng = course.filter((x) => (x.id) == Teaching[i]).map((x)=>x.studiepoeng)
              if  (poeng){
                amount_PH += 250
              }
            }
    
    
          }
      }
     }
    
     if ((person_activity.map((x)=>x.person)).includes(lecturer_p[k]) ){
      // console.log(lecturer_p_name[k],person_activity.filter(x=>x.person === lecturer_p[k]).map(x=>x.activity).length,person_activity.filter(x=>x.person === lecturer_p[k]).map(x=>x.activity))
      for(let a = 0;a<person_activity.filter(x=>x.person === lecturer_p[k]).map(x=>x.activity).length;a++){
        var activity_num = person_activity.filter(x=>x.person === lecturer_p[k]).map(x=>x.activity)[a]
    
        if (position_activity.map(x=>x.emne)[activity_num-1] === 'L'){
    
          // console.log(lecturer_p_name[k],person_activity.filter(x=>x.person === lecturer_p[k]).map(x=>x.activity)[a])
          poeng= (position_activity.map(x=>x.arsverk)[person_activity.filter(x=>x.person === lecturer_p[k]).map(x=>x.activity)[a]-1])
          // console.log('poeng',poeng)
          var amount = person_activity.filter(x=>x.person === lecturer_p[k]).filter(x=>x.activity===activity_num).map(x=>x.amount)
          // console.log(amount_position)
          var amount_position = amount_position + 1750*poeng*amount/100
      }
      if (position_activity.map(x=>x.emne)[activity_num-1] === 'P'){
        console.log('prject')
        console.log(lecturer_p_name[k],person_activity.filter(x=>x.person === lecturer_p[k]).map(x=>x.activity)[a])
        poeng= (position_activity.map(x=>x.antall_time)[person_activity.filter(x=>x.person === lecturer_p[k]).map(x=>x.activity)[a]-1])
        console.log('P','poeng',poeng)
        var amount = person_activity.filter(x=>x.person === lecturer_p[k]).filter(x=>x.activity===activity_num).map(x=>x.amount)
        // console.log(amount_position)
        var amount_project = amount_project + poeng*amount
    }
      }
    
     }
    
    
    
    array_process_new_O1.push(amount_01) 
    array_process_new_O2.push(amount_02) 
    array_process_new_FE.push(amount_FE) 
    array_process_new_FP.push(amount_FP) 
    array_process_new_MS.push(amount_MS) 
    array_process_new_PH.push(amount_PH) 
    array_process_new_position.push(amount_position) 
    array_process_new_project.push(amount_project) 
    
    
    }
    
    
    array_process_new_total.push(text.concat([array_process_new_O1]).concat(text2)) 
    array_process_new_total.push(text.concat([array_process_new_O2]).concat(text2)) 
    array_process_new_total.push(text.concat([array_process_new_FE]).concat(text2)) 
    array_process_new_total.push(text.concat([array_process_new_FP]).concat(text2)) 
    array_process_new_total.push(text.concat([array_process_new_MS]).concat(text2)) 
    array_process_new_total.push(text.concat([array_process_new_PH]).concat(text2)) 
    array_process_new_total.push(text.concat([array_process_new_position]).concat(text2)) 
    array_process_new_total.push(text.concat([array_process_new_project]).concat(text2)) 
    
    
    
    
    var lineChartData_process = {
      labels: lecturer_p_name,
    
        datasets: []
    }
    array_process_new_total.forEach(function (a, i) {
      lineChartData_process.datasets.push({
              label:   lecturer_p_name[i],
              fillColor: 'rgba(220,220,220,0.2)',
              strokeColor: 'rgba(220,220,220,1)',
              pointColor: 'rgba(220,220,220,1)',
              pointStrokeColor: '#fff',
              pointHighlightFill: '#fff',
              pointHighlightStroke:
                  'rgba(220,220,220,1)',
              data: JSON.parse(a)
              
           });
          
    
      }
    );
    
    var data_set_process=[]
    for (let a=0; a<lineChartData_process.datasets.map(x=>x.label).length;a++){
        data_set_process.push({label : type_course[a],data : lineChartData_process.datasets.map(x=>x.data)[a],backgroundColor : color[a]})
      }
  
      





























































    
var data_indecol ={
      //  labels: lineChartData_thermo.labels.map(x=>x.course_id + ' ' + x.name),
       labels: lecturer_i_name,

        datasets:data_set_indecol

      }
      // }
    var options = {
      tooltips: {
        mode: 'index'
      },
      legend: {
        display: true,
     },

      // indexAxis: 'y',
      responsive: false,

      maintainAspectRatio:false,
      scales: {
        x: {title: {
          display: true,
          text: 'Person',
          color: '#000',
          font: {
            family: 'Comic Sans MS',
            size: 15,
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
            text: 'Hours',
            color: '#000',
            font: {
              family: 'Comic Sans MS',
              size: 15,
              weight: 'bold',
              lineHeight: 1.2,
            },
            padding: {top: 20, left: 0, right: 0, bottom: 0}
          },
            stacked: true
        }
    } 
  }

  var data_thermo ={
    //  labels: lineChartData_thermo.labels.map(x=>x.course_id + ' ' + x.name),
     labels: lecturer_t_name,

      datasets:data_set_thermo

    }
    // }
  var options = {
    tooltips: {
      mode: 'index'
    },
    legend: {
      display: true,
   },

    // indexAxis: 'y',
    responsive: false,

    maintainAspectRatio:false,
    scales: {
      x: {title: {
        display: true,
        text: 'Person',
        color: '#000',
        font: {
          family: 'Comic Sans MS',
          size: 15,
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
          text: 'Hours',
          color: '#000',
          font: {
            family: 'Comic Sans MS',
            size: 15,
            weight: 'bold',
            lineHeight: 1.2,
          },
          padding: {top: 20, left: 0, right: 0, bottom: 0}
        },
          stacked: true
      }
  } 
}



var data_process ={
  //  labels: lineChartData_thermo.labels.map(x=>x.course_id + ' ' + x.name),
   labels: lecturer_p_name,

    datasets:data_set_process

  }
  // }
var options = {
  tooltips: {
    mode: 'index'
  },
  legend: {
    display: true,
 },

  // indexAxis: 'y',
  responsive: false,

  maintainAspectRatio:false,
  scales: {
    x: {title: {
      display: true,
      text: 'Person',
      color: '#000',
      font: {
        family: 'Comic Sans MS',
        size: 15,
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
        text: 'Hours',
        color: '#000',
        font: {
          family: 'Comic Sans MS',
          size: 15,
          weight: 'bold',
          lineHeight: 1.2,
        },
        padding: {top: 20, left: 0, right: 0, bottom: 0}
      },
        stacked: true
    }
} 
}


var data_sustain ={
  //  labels: lineChartData_thermo.labels.map(x=>x.course_id + ' ' + x.name),
   labels: lecturer_s_name,

    datasets:data_set_sustain

  }
  // }
var options = {
  pluggins:{
    title: {
      display: true,
      text: 'Custom Chart Title'
    }
  },
  tooltips: {
    mode: 'index'
  },
  legend: {
    display: true,
 },

  // indexAxis: 'y',
  responsive: false,

  maintainAspectRatio:false,
  scales: {
    x: {title: {
      display: true,
      text: 'Person',
      color: '#000',
      font: {
        family: 'Comic Sans MS',
        size: 15,
        weight: 'bold',
        lineHeight: 1.2,
      },
      padding: {top: 20, left: 0, right: 0, bottom: 0}
    },
        stacked: true
    },
    y: {
      max: 2500,
      title: {
        display: true,
        text: 'Hours',
        color: '#000',
        font: {
          family: 'Comic Sans MS',
          size: 15,
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

{/* <script src= 
"https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"> 
    </script> 
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script> */}

    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.js"></script>
    
    <center>
      
      <div id="Graphs" style={{float:'left',width :"50%" }} >
            <p><b>Indecol Teaching load</b></p>
            <Bar 
            
            data = {data_indecol}
            options={options}
            // display={flex}
            height ={600}
            width ={800}

            />
      </div>     
      <div id="Graphs" style={{float:'right',width :"50%"}} >

            <p><b>Thermo-Fluid Teaching load</b></p>

            <Bar
            
            data = {data_thermo}
            options={options}
            height ={600}
            width ={800}


            />
        </div>
        <div id="Graphs" style={{float:'left',width :"50%"}} >       
        <p><b>Process and Power Teaching load</b></p>

            <Bar 
            
            data = {data_process}
            options={options}
            height ={600}
            width ={800}

            />
          </div>
          <div id="Graphs" style={{float:'right',width :"50%"}} >
            <p><b>Sustainable Energy Systems Teaching load</b></p>

          <Bar
            
            data = {data_sustain}
            options={options}
            height ={600}
            width ={800}


            />


            </div>
    </center>


             
        </div>

)
    
}

}

export default BarChart_load
