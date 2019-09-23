
document.getElementById("addTitle").addEventListener('click', addText);
document.getElementById("addGraph").addEventListener('click', addGraph);

function isEmpty(value) {
  return (value == null || value == undefined);
}

function setElementId(element) {

  element.id = NewGuid();
  return element.id;

}
function getElementById(id) {
  return document.getElementById(id);
}

function createElement(element) {
  return document.createElement(element);
}

function createInput() {

  var input = document.createElement("input");
  input.type = 'text'
  input.id = setElementId(input);
  input.style.fontFamily = 'Nunito';
  input.style.color = 'black';
  input.value = 'your title';

  return input;
}

function addClass(element, clas) {
  element.classList.add(clas);
}

function setColumnText(h2, input) {
  h2.innerHTML = input.value;
}

function addText() {

  //get container where content will be displayed
  var form = getElementById("container123");

  //create section - slide, for presentation 
  var section = createElement("section");
  addClass(section, "slide");

  //title to be displayed
  var h2 = createElement("h2");
  addClass(h2, "title");


  section.appendChild(h2);
  form.appendChild(section);

  //get tab2, where input will be created
  var tab2 = getElementById("tab2");

  //create input for tab2
  var input = createInput();
  setColumnText(h2, input);

  tab2.appendChild(input)
  $('a[href="#tabs-2"]').click();


  input.onkeyup = function () {
    setColumnText(h2, input);
  }

}


function renderChart(list) {

console.log('uslo u chart')
  $.each(list, function (index, element) {
    console.log(element)
  });
  

  var chart = new CanvasJS.Chart("chartContainer",
    {
      title: {
        text: "Adding dataPoints Dynamically"
      },
      data: [
        {
          type: "column",
          dataPoints: list
        }
      ]
    });

  chart.render();

}

function makeSection() {

  var buttonDiv = createElement("div");
  var bDiv = setElementId(buttonDiv);

  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = 'x';
  deleteButton.id = setElementId(deleteButton);
  var input = createInput();

  deleteButton.addEventListener('click', function () {
    console.log(input.id)
    removeInput(input.id, deleteButton.id)

    var list=removeFromList(input.id);
 
    renderChart(list);

  })

  buttonDiv.appendChild(input);
  buttonDiv.appendChild(deleteButton);
  getElementById('tab2').appendChild(buttonDiv);


  return input;
}

// function makeSection() {

//   var h2 = createElement('h2');
//  // h2.style.hidden="true"

//  var input = createInput();

//  getElementById('tab2').appendChild(input);
//  getElementById('container123').appendChild(h2);
//  setColumnText(h2, input);

//  return { h2, input };
// }

function renderByList(value) {


  var listOfShapes = new Array();

  if (window.listOfShapes != undefined) {
    listOfShapes = window.listOfShapes;
  }
  console.log(value)

  var i = { id: value.selector, y: 0, label: isEmpty(value) ? "Option 1" : value.val() };
  var index = listOfShapes.findIndex(fruit => fruit.id === i.id)
  if (index == -1) {
    listOfShapes.push(i);
  } else {
    listOfShapes[index] = i;
  }
  $.each(listOfShapes, function (index, element) {
    console.log(element)
  });
  window.listOfShapes = listOfShapes;
  return window.listOfShapes;
}

function removeFromList(id){
  console.log(id)
  $.each(window.listOfShapes, function (index, element) {
    console.log(element)

   
     var index = window.listOfShapes.findIndex(x => x.id === '#' + id)
     console.log(index)
     if(index!= -1)
     window.listOfShapes.splice(index, 1);
    
  });
  return window.listOfShapes;
}

function removeInput(id, deleteId) {

  var elem = getElementById(id)
  var deleteButton = getElementById(deleteId)

  elem.parentElement.removeChild(elem);
  deleteButton.parentElement.removeChild(deleteButton);

  return false;
}

function addGraph() {


  var butNew = document.createElement("button");
  butNew.innerHTML = 'Add New Column';


  var tab2 = document.getElementById("tab2");
  tab2.appendChild(butNew);


  butNew.addEventListener('click', function () {
    let input = makeSection();

    input.onkeyup = function () {
      update(input);
    }
  });

  $('a[href="#tabs-2"]').click();
}


function update(input) {

  var val = $("#" + input.id).get().map(function (i) {
    return $(i).val();

  })
  var list = renderByList($("#" + input.id).val(val));
  renderChart(list);

}