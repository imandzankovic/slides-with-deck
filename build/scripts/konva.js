


document.getElementById("addTitle").addEventListener('click', addText);
document.getElementById("addGraph").addEventListener('click', addGraph);

function isEmpty(value){
  return (value == null || value == undefined );
}

function addText() {

  var elId = ''
  elId = NewGuid();
  window.elId1 = elId;

  var nameOfClass = NewGuid();

  
  var form = document.getElementById("container123");
  var section = document.createElement("section");
  var h2 = document.createElement("h2");
  section.classList.add("slide");
  h2.classList.add("title");
  section.appendChild(h2)
  form.appendChild(section)

var tab2 = document.getElementById("tab2");
  var input = document.createElement("input");
  input.type='text'
  input.id = nameOfClass;
  input.style.fontFamily = 'Nunito';
  input.style.color = 'black';
  input.value='your title'
  h2.innerHTML=input.value;
  input.onkeyup=function(){
    h2.innerHTML=input.value;
  }
  //input.innerHTML = "Your text";
  tab2.appendChild(input)
  $('a[href="#tabs-2"]').click();

  window.id = nameOfClass;
  console.log(window.id)
 
  //document.getElementById('tab2').innerHTML = input.innerHTML;
 
  
}
function rednerChart(h2,h2a){

  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    title:{
      text: ""
    },
    axisY: {
      title: ""
    },
    data: [{        
      type: "column",  
      showInLegend: true, 
      legendMarkerColor: "grey",
      legendText: "",
      dataPoints: [      
       
        { y: 0, label: isEmpty( h2) ?  "Option 1" : h2.innerHTML  },
        { y: 0,  label: isEmpty(h2a) ? "Option 2" : h2a.innerHTML  }
       
      ]
      
    }]
  });
  chart.render();
}
function createInput(no){ 
  var elId = ''
  elId = NewGuid();
  window.elId1 = elId;

  var nameOfClass = NewGuid();
  var input = document.createElement("input");
  input.type='text';
  input.id = nameOfClass;
  input.classList.add("input");
  input.style.fontFamily = 'Nunito';
  input.style.color = 'black';
  input.value='Option ' + no;
  return input;
}

function addGraph() {
 
  var form = document.getElementById("chartContainer");
  var section = document.createElement("section");
  var h2 = document.createElement("h2");
  var h2a = document.createElement("h2");
  
  section.classList.add("slide");
 


  var tab2 = document.getElementById("tab2");
  var input=createInput(1);
  var inputA=createInput(2);
  
  form.appendChild(section)
  h2.innerHTML=input.value;
  h2a.innerHTML=inputA.value;

  rednerChart(h2,h2a);
  
    
    // $("#chartContainer").CanvasJSChart(options); 
    $('a[href="#tabs-2"]').click();


  
  input.onkeyup=function(){
    h2.innerHTML=input.value;
    window.i1=h2;
    rednerChart(h2,window.i2);

  }
  inputA.onkeyup=function(){
    h2a.innerHTML=inputA.value;
    window.i2=h2a;
    rednerChart(window.i1,h2a);

  }
  //input.innerHTML = "Your text";
  tab2.appendChild(input)
  tab2.appendChild(inputA)




  
}
