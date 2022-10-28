//MAIN.JS

/*
Este archivo existe solamente para tomar los archivos pug/sass del proyecto
y renderizarlos a html/css
*/

const pug = require('pug');
const sass = require('sass');
const files = require('./fileFunctions'); //Funciones para simplificar la creación de archivos

//Renderizar estilos:
let styleRules = sass.compile(__dirname + '/src/sass/main.sass');
files.writeFile(__dirname + '/dist/css/styles.css', styleRules.css);

//Renderizar páginas HTML
const pageSrcPath = __dirname + '/src/pug/pages/';
files.writeFile(__dirname + '/dist/index.html', pug.renderFile(pageSrcPath + 'index.pug'));

//Renderizar modales HTML
const modalSrcPath = __dirname + '/src/pug/modals/';
const outputPath = __dirname + '/dist/contents/';
const modalFilenames = [
    {fileName: 'mariela-A', folder: 'mariela/'},
    {fileName: 'mariela-A1', folder: 'mariela/'},
    {fileName: 'mariela-A2', folder: 'mariela/'},
    {fileName: 'mariela-A3', folder: 'mariela/'},
    {fileName: 'mariela-A4', folder: 'mariela/'},
    {fileName: 'mariela-B', folder: 'mariela/'},
    {fileName: 'mariela-B1', folder: 'mariela/'},
    {fileName: 'mariela-C', folder: 'mariela/'},
    {fileName: 'mariela-C1', folder: 'mariela/'},
    {fileName: 'mariela-C2', folder: 'mariela/'},
    {fileName: 'mariela-D', folder: 'mariela/'},
    {fileName: 'mariela-D1', folder: 'mariela/'},
    {fileName: 'mariela-E', folder: 'mariela/'},
    {fileName: 'mariela-E1', folder: 'mariela/'},
    {fileName: 'mariela-E2', folder: 'mariela/'},
    {fileName: 'ana-01', folder: 'ana/'},
    {fileName: 'ana-01-A', folder: 'ana/'},
    {fileName: 'ana-01-B', folder: 'ana/'},
    {fileName: 'ana-01-C', folder: 'ana/'},
    {fileName: 'ana-01-D', folder: 'ana/'},
    {fileName: 'ana-01-E', folder: 'ana/'},
    {fileName: 'ana-02', folder: 'ana/'},
    {fileName: 'ana-03', folder: 'ana/'},
    {fileName: 'ana-04', folder: 'ana/'},
    {fileName: 'ana-05', folder: 'ana/'},
    {fileName: 'ana-06', folder: 'ana/'},
    {fileName: 'gabriela-01', folder: 'gabriela/'},
    {fileName: 'gabriela-01-A', folder: 'gabriela/'},
    {fileName: 'gabriela-01-B', folder: 'gabriela/'},
    {fileName: 'gabriela-01-C', folder: 'gabriela/'},
    {fileName: 'gabriela-02', folder: 'gabriela/'},
    {fileName: 'gabriela-02-A', folder: 'gabriela/'},
    {fileName: 'gabriela-02-B', folder: 'gabriela/'},
    {fileName: 'gabriela-02-C', folder: 'gabriela/'},
    {fileName: 'gabriela-02-D', folder: 'gabriela/'},
    {fileName: 'gabriela-03', folder: 'gabriela/'},
    {fileName: 'gabriela-03-A', folder: 'gabriela/'},
    {fileName: 'gabriela-03-B', folder: 'gabriela/'},
    {fileName: 'gabriela-03-C', folder: 'gabriela/'},
    {fileName: 'gabriela-03-D', folder: 'gabriela/'},
    {fileName: 'gabriela-04', folder: 'gabriela/'},
    {fileName: 'gabriela-04-A', folder: 'gabriela/'},
    {fileName: 'gabriela-04-B', folder: 'gabriela/'},
    {fileName: 'gabriela-04-C', folder: 'gabriela/'},
    {fileName: 'gabriela-05', folder: 'gabriela/'},
    {fileName: 'gabriela-05-A', folder: 'gabriela/'},
    {fileName: 'gabriela-05-B', folder: 'gabriela/'},
    {fileName: 'gabriela-05-C', folder: 'gabriela/'},
    {fileName: 'presentacion-01', folder: 'presentacion/'},
    {fileName: 'presentacion-02', folder: 'presentacion/'},
    {fileName: 'presentacion-03', folder: 'presentacion/'},
    {fileName: 'presentacion-04', folder: 'presentacion/'},
    {fileName: 'presentacion-05', folder: 'presentacion/'},
    {fileName: 'presentacion-06', folder: 'presentacion/'},
    {fileName: 'presentacion-07', folder: 'presentacion/'},
    {fileName: 'presentacion-08', folder: 'presentacion/'},
    {fileName: 'presentacion-09', folder: 'presentacion/'},
    {fileName: 'presentacion-10', folder: 'presentacion/'},
    {fileName: 'presentacion-11', folder: 'presentacion/'},
    {fileName: 'presentacion-12', folder: 'presentacion/'},
];

for ( let file of modalFilenames ) {
    files.writeFile(outputPath + file.fileName + '.html', pug.renderFile(modalSrcPath + file.folder + file.fileName + '.pug'));
}