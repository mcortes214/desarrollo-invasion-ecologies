//PUG Y SASS DESDE JS

//En este proyecto usamos Pug y Sass de forma normal, con archivos .pug y .sass
// compilados desde un script de Node.

const pug = require('pug');
const sass = require('sass');
const files = require('./fileFunctions'); //Funciones para simplificar la creación de archivos

//Renderizar estilos:
let styleRules = sass.compile(__dirname + '/src/sass/main.sass');
files.writeFile(__dirname + '/dist/css/styles.css', styleRules.css);

//Renderizar HTML
const pageSrcPath = __dirname + '/src/pug/pages/';

files.writeFile(__dirname + '/dist/index.html', pug.renderFile(pageSrcPath + 'index.pug'));