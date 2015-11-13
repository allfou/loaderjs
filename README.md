# LoaderJS

A clean Loader widget entirely written in JavaScript (no JS libraries) that displays loading progress. It extends a basic timer object that counts from 0 to n. It is based on HTML5 (canvas). Web browser compatibility: IE9+, FF, Safari, Chrome.

Options:

- color: white, grey, blue, green, yellow, red, black, orange
- theme: fancy, shadow
- dimension: small, medium, large
- speed: in millisecondes (e.g. 1000)
- interval: number of keyframes (e.g. 8)

Code sample:

    <link type="text/css" href="css/loader-min.css" rel="stylesheet" />
    <script type="text/javascript" src="js/loader-min.js" charset="utf-8"></script> 
    ... 
    
    var loader_1 = new Loader.widget({
    'id': 'loader1', 
    'color': 'black',
    'theme': 'shadow',
    'dimension': 'small',
    'speed': '1000',
    'interval': '8'});
    
    ... 
    
    <div id='loader1'></div>
