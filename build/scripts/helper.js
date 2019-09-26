
let resPresentation;
var _pId = '';
document.getElementById("newPresentation").addEventListener('click', function () {

    axios.post('http://localhost:3000/api/presentation', {

        title: 'New Presentation',
        slides: []
    })
        .then((res) => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res.data)
            _pId = res.data._id
            resPresentation = res;
        })
        .catch((error) => {
            console.error(error)
        })


})


document.getElementById("preview").addEventListener('click', function () {

    window.open('http://localhost:3000/api/presentation/' + _pId);
});


function NewGuid() {
    var sGuid = "";
    for (var i = 0; i < 32; i++) {
        sGuid += Math.floor(Math.random() * 0xF).toString(0xF);
    }

    return sGuid;
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
    //console.log('pozicija je ' + x, y)
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



    var x = $('#container123 :header');
    //var y=$('#chartContainer');

    var canvas = $("#chartContainer .canvasjs-chart-canvas").get(0);
    if (canvas != undefined) {
        var dataURL = canvas.toDataURL();
        window.y = dataURL;
        //console.log(dataURL);
    }

    window.x = x;


    // $(window.x).change(function () {
    //     console.log('promjeniiiiiiiiiiiiiii')
    //     y = $("#container :input");
    //     window.x = y;
    //     console.log(y)
    // });

    var list = window.x

    if (window.y != undefined) {
        list.push(window.y)
        //var list = $.merge(window.x, window.y);

    }

    $.each(list, function (index, element) {
        console.log('Element je ' + element)
        let i = { id: "", type: "", value: "", x: "", y: "" };

        i.id = element.id;
        i.type = $("#" + i.id).prop('tagName') == 'H2' ? 'h2' : 'chart'
        console.log(i.type)
        i.value = document.getElementById(i.id) == null ? window.y : document.getElementById(i.id).innerHTML;

        console.log(' | id: ' + i.id);
        console.log(' | type: ' + i.type);
        console.log(' | value: ' + i.value);


        if (i.type == 'h2') {
            i.x = getPosition(element.id).x;
            i.y = getPosition(element.id).y;
        }
        // else {
        // i.x = element.x;
        // i.y = element.y;
        // i.stage = element.stage;
        // }



        if (i.type != 'submit') {
            if (arrayname.contains(i)) {
                var idx = arrayname.indexOf(i);
                console.log(i, index)
                arrayname.splice(idx - 1, 1);
                //arrayname.pop(i)
            }

            console.log(i)
            arrayname.push(i);


            //arrayname.concat(arrayname)
        }

    })
    $.each(arrayname, function (index, element) {
        console.log(element)
    })

    if (!clickedOnce) {
        clickedOnce = true;
        //console.log(e)
        //e = true;
        axios.post('http://localhost:3000/api/slides/', {

            elements: arrayname
        })
            .then((res) => {
                console.log(`statusCode: ${res.statusCode}`)
                console.log(res.data)
                _id = res.data._id
                resPost = res.data;

                axios.put('http://localhost:3000/api/presentation/' + _pId, {
                    slides: res.data
                })
                    .then((pRes) => {
                        console.log(`statusCode: ${pRes.statusCode}`)
                        console.log(pRes.data)
                        _pId = pRes.data._id
                        resPresentation = pRes;
                    })
                    .catch((error) => {
                        console.error(error)
                    })

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
                console.log('ovo je od slides')
                console.log(res.data)
                _id = res.data._id
                putr = res.data;
                console.log('ici u presi ovo' + JSON.stringify(putr));

                axios.get('http://localhost:3000/api/slides/' + _id).then((res) => {
                    console.log('iz geta')
                    console.log(res)
                    show(res.data);
                    axios.put('http://localhost:3000/api/presentation/' + _pId, {
                        slides: res.data
                    })
                        .then((pRes) => {
                            //console.log(`statusCode: ${pRes.statusCode}`)
                            console.log('ovo je od presis')
                            console.log(pRes.data)
                            _pId = pRes.data._id
                            //resPresentation = pRes;
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                })

            })
            .catch((error) => {
                console.error(error)
            })
    }
}

function show(data) {
    $.each(data.elements, function (index, element) {
        console.log('bieber justin')
        console.log(element)
        var slides = document.getElementById("slidesWell");

        var section = document.createElement("section");
        section.classList.add("slide");
        section.style.cssText = `background-color:white`;

        //title to be displayed
        var h2 = createElement("h2");
        h2.classList.add("title");
        h2.id = NewGuid();

        h2.style.cssText = 'font-size:15px';
        $('#' + h2.id).css({ top: element.x + 'px', left: element.y + 'px', position: 'absolute' });
        h2.innerHTML = element.value;

        //create space
        var br = createElement("br");

        section.appendChild(h2);
        slides.appendChild(section);
        slides.appendChild(br);
    });


}


