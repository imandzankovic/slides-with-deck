
window.onload = function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var stage = new Konva.Stage({
        container: 'container',
        width: 400,
        height: 400              
    });

    var layer = new Konva.Layer();
    window.layer = layer;

    stage.add(layer);
    window.stage = stage;
}

document.getElementById("preview").addEventListener('click', function () {

    window.open('http://localhost:3000/api/slides');
});

function addCircle() {

    var elId = ''
    elId = NewGuid();
    window.elId1 = elId;

    var circle = new Konva.Circle({
        x: 100,
        y: 100,
        radius: 50,
        fill: 'blue',
        id: elId,
        draggable: true

    });

    circle.on('dblclick', () => {

        addTextbox();
    });
    window.circle = circle;

    window.stage.on('click', function (e) {
        //if click on empty area - remove all transformers
        if (e.target === stage) {
            window.stage.find('Transformer').destroy();
            window.layer.draw();
            return;
        }
        // // do nothing if clicked NOT on our rectangles
        if (!e.target === circle) {
            return;
        }

        // remove old transformers
        // TODO: we can skip it if current rect is already selected
        window.stage.find('Transformer').destroy();

        // create new transformer
        var tr = new Konva.Transformer();
        window.layer.add(tr);
        tr.attachTo(e.target);
        window.layer.draw();


    });

    circle.addEventListener('click', function (e) {
        window.addEventListener('keypress', function (e) {

            if (e.key == 'd') {
                circle.remove()
                window.layer.draw();
            }

        });

    });


    var listOfShapes = new Array();
    let j = { id: "", type: "", value: "", x: "", y: "", stage: [] };
    j.id = window.elId1;
    //j.type = 'shape';
    // j.value = circle.attrs.fill;
    // j.x = circle.attrs.x;
    // j.y = circle.attrs.y;

    window.layer.add(window.circle);
    window.stage.add(window.layer);
    window.layer.draw();
    j.stage = window.stage.toJSON();
    listOfShapes.push(j)

    window.listOfShapes = listOfShapes;
    console.log(listOfShapes)

}


function addBox() {

    var elId = ''
    elId = NewGuid();
    window.elId = elId;

    var rect = new Konva.Rect({
        x: 20,
        y: 20,
        width: 100,
        height: 50,
        fill: 'green',
        stroke: 'black',
        strokeWidth: 4,
        draggable: true

    });

    rect.on('dblclick', () => {

        addTextbox();

    });


    window.rect = rect;

    rect.on('mouseover touchstart', function () {
        this.fill('blue');
        window.layer.draw();
    });

    rect.on('mouseout touchend', function () {
        this.fill('red');
        window.layer.draw();
    });
    rect.addEventListener('click', function (e) {
        window.addEventListener('keypress', function (e) {

            if (e.key == 'd') {
                rect.remove()
                window.layer.draw();
            }

        });

    });
    window.stage.on('click', function (e) {
        //if click on empty area - remove all transformers
        if (e.target === stage) {
            window.stage.find('Transformer').destroy();
            window.layer.draw();
            return;
        }
        // // do nothing if clicked NOT on our rectangles
        if (!e.target === rect) {
            return;
        }

        // remove old transformers
        // TODO: we can skip it if current rect is already selected
        window.stage.find('Transformer').destroy();

        // create new transformer
        var tr = new Konva.Transformer();
        window.layer.add(tr);
        tr.attachTo(e.target);
        window.layer.draw();


    });



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

    var textNode = new Konva.Text({
        text: 'Some text here',
        x: 50,
        y: 80,
        fontSize: 20,
        draggable: true,
        width: 200,
        position: 'absolute',
        id: elId
    });

    window.textNode = textNode;
    window.layer.add(window.textNode);
    window.layer.draw();

    window.stage.add(window.layer);
    var tr = new Konva.Transformer({
        node: textNode,
        enabledAnchors: ['middle-left', 'middle-right'],
        // set minimum width of text
        boundBoxFunc: function (oldBox, newBox) {
            newBox.width = Math.max(30, newBox.width);
            return newBox;
        }
    });

    window.textNode.on('transform', function () {
        // reset scale, so only with is changing by transformer
        window.textNode.setAttrs({
            width: window.textNode.width() * textNode.scaleX(),
            scaleX: 1
        });
    });

    window.layer.add(tr);

    window.layer.draw();
    window.stage.add(window.layer);

    window.layer.on('dblclick', () => {
        // hide text node and transformer:
        window.textNode.hide();
        tr.hide();
        window.layer.draw();

        // create textarea over canvas with absolute position
        // first we need to find position for textarea
        // how to find it?

        // at first lets find position of text node relative to the stage:
        var textPosition = window.textNode.absolutePosition();

        // then lets find position of stage container on the page:
        var stageBox = window.stage.container().getBoundingClientRect();

        // so position of textarea will be the sum of positions above:
        var areaPosition = {
            x: stageBox.left + textPosition.x,
            y: stageBox.top + textPosition.y
        };

        // create textarea and style it
        var textarea = document.createElement('textarea');
        document.body.appendChild(textarea);

        // apply many styles to match text on canvas as close as possible
        // remember that text rendering on canvas and on the textarea can be different
        // and sometimes it is hard to make it 100% the same. But we will try...
        textarea.value = textNode.text();
        textarea.style.position = 'absolute';
        textarea.style.top = areaPosition.y + 'px';
        textarea.style.left = areaPosition.x + 'px';
        textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
        textarea.style.height =
            textNode.height() - textNode.padding() * 2 + 5 + 'px';
        textarea.style.fontSize = textNode.fontSize() + 'px';
        textarea.style.border = 'none';
        textarea.style.padding = '0px';
        textarea.style.margin = '0px';
        textarea.style.overflow = 'hidden';
        textarea.style.background = 'none';
        textarea.style.outline = 'none';
        textarea.style.resize = 'none';
        textarea.style.lineHeight = textNode.lineHeight();
        textarea.style.fontFamily = textNode.fontFamily();
        textarea.style.transformOrigin = 'left top';
        textarea.style.textAlign = textNode.align();
        textarea.style.color = textNode.fill();
        rotation = textNode.rotation();
        var transform = '';
        if (rotation) {
            transform += 'rotateZ(' + rotation + 'deg)';
        }

        var px = 0;
        // also we need to slightly move textarea on firefox
        // because it jumps a bit
        var isFirefox =
            navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isFirefox) {
            px += 2 + Math.round(textNode.fontSize() / 20);
        }
        transform += 'translateY(-' + px + 'px)';

        textarea.style.transform = transform;

        // reset height
        textarea.style.height = 'auto';
        // after browsers resized it we can set actual value
        textarea.style.height = textarea.scrollHeight + 3 + 'px';

        textarea.focus();

        function removeTextarea() {
            textarea.parentNode.removeChild(textarea);
            window.removeEventListener('click', handleOutsideClick);
            textNode.show();
            tr.show();
            tr.forceUpdate();
            window.layer.draw();
        }

        function setTextareaWidth(newWidth) {
            if (!newWidth) {
                // set width for placeholder
                newWidth = textNode.placeholder.length * textNode.fontSize();
            }
            // some extra fixes on different browsers
            var isSafari = /^((?!chrome|android).)*safari/i.test(
                navigator.userAgent
            );
            var isFirefox =
                navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            if (isSafari || isFirefox) {
                newWidth = Math.ceil(newWidth);
            }

            var isEdge =
                document.documentMode || /Edge/.test(navigator.userAgent);
            if (isEdge) {
                newWidth += 1;
            }
            textarea.style.width = newWidth + 'px';
        }
        window.textNode.addEventListener('dblclick', function (e) {
            console.log('dddddddddddddddddddd')
            textNode.text(textarea.value);
            console.log(window.textNode.text())
            window.layer.add(textNode)
            console.log(window.layer)
            window.stage.add(window.layer)
            console.log(window.stage)
        });
        textarea.addEventListener('keydown', function (e) {
            // hide on enter
            // but don't hide on shift + enter
            if (e.keyCode === 13 && !e.shiftKey) {
                textNode.text(textarea.value);
                removeTextarea();
            }
            // on esc do not set value back to node
            if (e.keyCode === 27) {
                removeTextarea();
            }
        });



        textarea.addEventListener('keydown', function (e) {
            scale = textNode.getAbsoluteScale().x;
            setTextareaWidth(textNode.width() * scale);
            textarea.style.height = 'auto';
            textarea.style.height =
                textarea.scrollHeight + textNode.fontSize() + 'px';
        });

        function handleOutsideClick(e) {
            if (e.target !== textarea) {
                textNode.text(textarea.value);
                removeTextarea();
            }
        }
        setTimeout(() => {
            window.addEventListener('click', handleOutsideClick);
        });
    });

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




