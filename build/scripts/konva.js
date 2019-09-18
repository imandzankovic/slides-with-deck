document.getElementById("addTitle").addEventListener('click', addText);

function addText() {

  var elId = ''
  elId = NewGuid();
  window.elId1 = elId;

  var nameOfClass = NewGuid();



  var form = document.getElementById("container123");
  var section = document.createElement("section");
  section.classList.add("slide");
  var input = document.createElement("h2");

  input.id = nameOfClass

  input.innerHTML = "Description";
  section.appendChild(input)
  var br = document.createElement("br");
  form.appendChild(section)
  //form.appendChild(input);
  form.appendChild(br);
  showTab(input);

  // $('#' + nameOfClass).attr('contenteditable','true');

  $('#' + nameOfClass).on('click', newPerson)
  // input.style.left = '100px';
  input.style.fontFamily = 'Nunito';
  input.style.color = 'black';

  window.id = nameOfClass;
  console.log(window.id)

}

// // function setActive(i) {
// //   $('#'+i).addClass("active");
// // }
function showTab(input) {

  var form = document.getElementById("tab-2");


  var tabContent2 = document.getElementById("tab2");
  tabContent2.classList.add("active")
  document.getElementById("tab1").classList.remove("active")
  form.innerHTML = '<h2>' + Sanja + '</h2>';


  //tabContent2.appendChild(input)
  console.log(input)

}
// document.getElementById("tab1").addEventListener('click',showTab1)

// function showTab1(){

//  var form1 = document.getElementById("tab1");
//  form1.classList.add("active")
//  document.getElementById("tab-1");

//  var form = document.getElementById("tab2"); 
//  if(form.classList.contains("active")){
//    form.classList.remove("active")
//  }

//   // var section = document.createElement("section");
//   // section.classList.add("slide");
//   // var input =document.createElement("h2");
//   // input.id = 'fsfsdfsdfs'

//   // input.innerHTML = "tab2";
//   // section.appendChild(input)
//   // var br = document.createElement("br");
//   // form.appendChild(section)
//   // //form.appendChild(input);
//   // form.appendChild(br);

// }

function newPerson() {
  var text = $('#' + window.id).text();
  // if (text == 'Des'){
  //     $('#toptitle').text('New Word');
  // }
  console.log(text)
}
