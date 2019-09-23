

document.getElementById("preview").addEventListener('click', function () {

    window.open('http://localhost:3000/api/slides');
});


function addBox() {

    var listOfShapes = new Array();
    let j = { id: "", type: "", value: "", x: "", y: "", stage: [] };
    j.id = window.elId;
    //j.type = 'shape';
    // j.value = circle.attrs.fill;
    // j.x = circle.attrs.x;
    // j.y = circle.attrs.y;

    window.layer.add(window.rect);
    window.stage.add(window.layer);
    window.layer.draw();

    j.stage = window.stage.toJSON();
    listOfShapes.push(j)

    window.listOfShapes = listOfShapes;
    console.log(listOfShapes)

}


function NewGuid() {
    var sGuid = "";
    for (var i = 0; i < 32; i++) {
        sGuid += Math.floor(Math.random() * 0xF).toString(0xF);
    }

    return sGuid;
}

// document.getElementById("Circle").addEventListener('click', addCircle);
// document.getElementById("Box").addEventListener('click', addBox);
//document.getElementById("addTitle").addEventListener('click', addTextbox);




function addTextbox() {
    var elId = ''
    elId = NewGuid();
    window.elId1 = elId;

    var listOfShapes = new Array();
    let j = { id: "", type: "", value: "", x: "", y: "", stage: [] };
    j.id = window.elId;
    j.type = textNode.text();
    console.log(textNode.text)
    // j.value = circle.attrs.fill;
    // j.x = circle.attrs.x;
    // j.y = circle.attrs.y;

    // window.layer.add(textNode);
    // window.stage.add(window.layer);
    // window.layer.draw();

    j.stage = window.stage.toJSON();
    listOfShapes.push(j)

    window.listOfShapes = listOfShapes;
    console.log(listOfShapes)



    // var nameOfClass = NewGuid();
    // var form = document.getElementById("track");
    // var input = document.createElement("textarea");
    // input.id = nameOfClass
    // input.type = "text";
    // input.value = "This is input box";
    // input.focus();
    // var br = document.createElement("br");
    // form.appendChild(input);
    // form.appendChild(br);

    // $('#' + nameOfClass).resizable({ cancel: null }); //adds a new parent to #class
    // $('#' + nameOfClass).parent().draggable({ cancel: null });  //makes the new parent draggable
    // $('#' + nameOfClass).focus();

    // $('#' + nameOfClass).parent().parent().draggable({ cancel: null });
    // $('#' + nameOfClass).css("display","inline-block");
    // //$('#' + nameOfClass).css("left","10px");

    // //input.style.position = 'absolute';  // position it
    // // input.style.left = '100px';
    // // input.style.top = '100px'; 

    // window.id = nameOfClass;
    // console.log(window.id)

}
Array.prototype.contains = Array.prototype.contains || function (obj) {
    var i, l = this.length;
    for (i = 0; i < l; i++) {
        if (this[i].id == obj.id) return true;
    }
    return false;
};

function getPosition(id) {
    console.log(id)

    var rect = document.getElementById(id)

    position = $(rect).offset();
    var x = position.left;
    var y = position.top;
    console.log('pozicija je ' + x, y)
    return {
        x,
        y
    }

}


document.getElementById("savePresentation").addEventListener('click', postSlide);
var arrayname = new Array();

var clickedOnce = false;
let resPost;
var _id = '';
var y;
function postSlide(e) {


    var x = $("#container :input");

    window.x = x;

    console.log(window.x)

    $(window.x).change(function () {
        console.log('promjeniiiiiiiiiiiiiii')
        y = $("#container :input");
        window.x = y;
        console.log(y)
    });

    var list = window.x

    if (window.listOfShapes != undefined) {
        var list = $.merge(window.x, window.listOfShapes);

    }

    $.each(list, function (index, element) {
        let i = { id: "", type: "", value: "", x: "", y: "" };
        console.log(' | id: ' + element.id);
        console.log(' | type: ' + element.type);
        console.log(' | value: ' + element.value);
        // console.log('x | :' + getPosition(element.id).x);
        // console.log('x | :' + getPosition(element.id).y);


        i.id = element.id;
        i.type = element.type;
        i.value = element.value;
        if (i.type == 'textarea') {
            i.x = getPosition(element.id).x;
            i.y = getPosition(element.id).y;
        }
        else {
            i.x = element.x;
            i.y = element.y;
            i.stage = element.stage;
        }



        if (i.type != 'submit') {
            if (arrayname.contains(i)) {
                var idx = arrayname.indexOf(i);
                console.log(i, index)
                arrayname.splice(idx - 1, 1);
                //arrayname.pop(i)
            }

            console.log(i)
            arrayname.push(i);


            arrayname.concat(arrayname)
        }

    })
    $.each(arrayname, function (index, element) {
        console.log(element)
    })
    if (!clickedOnce) {
        clickedOnce = true;
        axios.post('http://localhost:3000/api/slides', {

            elements: arrayname
        })
            .then((res) => {
                console.log(`statusCode: ${res.statusCode}`)
                console.log(res.data)
                _id = res.data._id
                resPost = res;
            })
            .catch((error) => {
                console.error(error)
            })

    }
    else {

        console.log('iz puta')
        console.log(_id)

        axios.put('http://localhost:3000/api/slides/' + _id, {

            elements: arrayname
        })
            .then((res) => {
                console.log(`statusCode: ${res.statusCode}`)
                console.log(res)
            })
            .catch((error) => {
                console.error(error)
            })
    }
}




