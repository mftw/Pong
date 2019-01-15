
function Input(el){
    var parent = el,
        map = {},
        intervals = {};

    function ev_kdown(ev)
    {
        map[ev.key] = true;
        ev.preventDefault();
        return;
    }

    function ev_kup(ev)
    {
        map[ev.key] = false;
        ev.preventDefault();
        return;
    }

    function key_down(key)
    {
        return map[key];
    }

    function keys_down_array(array)
    {
        for(var i = 0; i < array.length; i++)
            if(!key_down(array[i]))
                return false;

        return true;
    }

    function keys_down_arguments()
    {
        return keys_down_array(Array.from(arguments));
    }

    function clear()
    {
        map = {};
    }

    function watch_loop(keylist, callback)
    {
        return function(){
            if(keys_down_array(keylist))
                callback();
        }
    }

    function watch(name, callback)
    {
        var keylist = Array.from(arguments).splice(2);

        // intervals[name] = setInterval(watch_loop(keylist, callback), 1000/24);
        intervals[name] = setInterval(watch_loop(keylist, callback), 60);
    }

    function unwatch(name)
    {
        clearInterval(intervals[name]);
        delete intervals[name];
    }

    function detach()
    {
        parent.removeEventListener("keydown", ev_kdown);
        parent.removeEventListener("keyup", ev_kup);
    }

    function attach()
    {
        parent.addEventListener("keydown", ev_kdown);
        parent.addEventListener("keyup", ev_kup);
    }

    function Input()
    {
        attach();

        return {
            key_down: key_down,
            keys_down: keys_down_arguments,
            watch: watch,
            unwatch: unwatch,
            clear: clear,
            detach: detach
        };
    }

    return Input();
}

var input_area = Input(document.getElementById("game-area"));
var i = 0;


input_area.watch("secret", function(){
    // txt.value += "FIVE ";
    // console.log('hey!!! ' + i)
    // i++;
    window.location = 'https://www.google.com';
}, "Control", "5");

input_area.watch("w", function(){
    // txt.value += "FIVE ";
    console.log('w ' + i)
    i++;
}, 'w');

input_area.watch("s", function(){
    // txt.value += "FIVE ";
    console.log('s ' + i)
    i++;
}, 's');

ArrowUp = input_area.watch("ArrowUp", function(){
    // txt.value += "FIVE ";
    console.log('ArrowUp ' + i)
    i++;
}, 'ArrowUp');

ArrowDown = input_area.watch("ArrowDown", function(){
    // txt.value += "FIVE ";
    console.log('ArrowDown ' + i)
    i++;
}, 'ArrowDown');

// input_area.watch("dump", function(){
//     console.dir(w);
//     console.dir(s);
//     console.dir(ArrowUp);
//     console.dir(ArrowDown);

// }, "Control", "d");

// setInterval(() => {
//     console.log(w);
//     console.log(s);
//     console.log(ArrowUp);
//     console.log(ArrowDown);
// }, 1000);

document.addEventListener('keypress', e => console.log(e));
// getComputedStyle

// var map = {}; // You could also use an array
// onkeydown = onkeyup = function(e){
//     e = e || event; // to deal with IE
//     map[e.keyCode] = e.type == 'keydown';
//     /* insert conditional here */
// }

