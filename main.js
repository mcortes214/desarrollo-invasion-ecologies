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
files.writeFile(__dirname + '/dist/home.html', pug.renderFile(pageSrcPath + 'home.pug'));
//Versión del home en inglés:
files.writeFile(__dirname + '/dist/home-en.html', pug.renderFile(pageSrcPath + 'home-en.pug'));

//Renderizar modales HTML
const modalSrcPath = __dirname + '/src/pug/modals/';
const outputPath = __dirname + '/dist/contents/';
const modalFilenames = [

    //Español

    //A1 y A3 son links a modales de presentación
    {fileName: 'mariela-A2', folder: 'mariela/'},
    {fileName: 'mariela-A4', folder: 'mariela/'},
    {fileName: 'mariela-A5', folder: 'mariela/'},
    // B1 es un link a un modal de presentación
    {fileName: 'mariela-B2', folder: 'mariela/'},
    {fileName: 'mariela-C1', folder: 'mariela/'},
    // {fileName: 'mariela-C2', folder: 'mariela/'},
    {fileName: 'mariela-D1', folder: 'mariela/'},
    {fileName: 'mariela-E1', folder: 'mariela/'},
    {fileName: 'mariela-E3', folder: 'mariela/'},
    {fileName: 'ana-01', folder: 'ana/'},
    {fileName: 'ana-02', folder: 'ana/'},
    {fileName: 'ana-03', folder: 'ana/'},
    {fileName: 'ana-04', folder: 'ana/'},
    {fileName: 'ana-05', folder: 'ana/'},
    {fileName: 'ana-06', folder: 'ana/'},
    {fileName: 'gabriela-01-A', folder: 'gabriela/'},
    {fileName: 'gabriela-02-A', folder: 'gabriela/'},
    {fileName: 'gabriela-02-B', folder: 'gabriela/'},
    {fileName: 'gabriela-03-A', folder: 'gabriela/'},
    {fileName: 'gabriela-03-B', folder: 'gabriela/'},
    {fileName: 'gabriela-04-A', folder: 'gabriela/'},
    {fileName: 'gabriela-05-A', folder: 'gabriela/'},
    {fileName: 'gabriela-05-B', folder: 'gabriela/'},
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


    //Inglés

    // //A1 y A3 son links a modales de presentación
    // {fileName: 'mariela-A2-en', folder: 'mariela-en/'},
    // {fileName: 'mariela-A4-en', folder: 'mariela-en/'},
    // {fileName: 'mariela-A5-en', folder: 'mariela-en/'},
    // // B1 es un link a un modal de presentación
    // {fileName: 'mariela-B2-en', folder: 'mariela-en/'},
    // {fileName: 'mariela-C1-en', folder: 'mariela-en/'},
    // // {fileName: 'mariela-C2-en', folder: 'mariela-en/'},
    // {fileName: 'mariela-D1-en', folder: 'mariela-en/'},
    // {fileName: 'mariela-E1-en', folder: 'mariela-en/'},
    // {fileName: 'mariela-E3-en', folder: 'mariela-en/'},
    // {fileName: 'ana-01-en', folder: 'ana-en/'},
    // {fileName: 'ana-02-en', folder: 'ana-en/'},
    // {fileName: 'ana-03-en', folder: 'ana-en/'},
    // {fileName: 'ana-04-en', folder: 'ana-en/'},
    // {fileName: 'ana-05-en', folder: 'ana-en/'},
    // {fileName: 'ana-06-en', folder: 'ana-en/'},
    // {fileName: 'gabriela-01-A-en', folder: 'gabriela-en/'},
    // {fileName: 'gabriela-02-A-en', folder: 'gabriela-en/'},
    // {fileName: 'gabriela-02-B-en', folder: 'gabriela-en/'},
    // {fileName: 'gabriela-03-A-en', folder: 'gabriela-en/'},
    // {fileName: 'gabriela-03-B-en', folder: 'gabriela-en/'},
    // {fileName: 'gabriela-04-A-en', folder: 'gabriela-en/'},
    // {fileName: 'gabriela-05-A-en', folder: 'gabriela-en/'},
    // {fileName: 'gabriela-05-B-en', folder: 'gabriela-en/'},
    {fileName: 'presentacion-01-en', folder: 'presentacion-en/'},
    {fileName: 'presentacion-02-en', folder: 'presentacion-en/'},
    {fileName: 'presentacion-03-en', folder: 'presentacion-en/'},
    {fileName: 'presentacion-04-en', folder: 'presentacion-en/'},
    {fileName: 'presentacion-05-en', folder: 'presentacion-en/'},
    {fileName: 'presentacion-06-en', folder: 'presentacion-en/'},
    {fileName: 'presentacion-07-en', folder: 'presentacion-en/'},
    {fileName: 'presentacion-08-en', folder: 'presentacion-en/'},
    {fileName: 'presentacion-09-en', folder: 'presentacion-en/'},
    {fileName: 'presentacion-10-en', folder: 'presentacion-en/'},
    {fileName: 'presentacion-11-en', folder: 'presentacion-en/'},
    {fileName: 'presentacion-12-en', folder: 'presentacion-en/'},    
];

for ( let file of modalFilenames ) {
    //Archivos de modales en español Y en inglés (todos en la misma lista y en el mismo output folder):
    files.writeFile(outputPath + file.fileName + '.html', pug.renderFile(modalSrcPath + file.folder + file.fileName + '.pug'));
}