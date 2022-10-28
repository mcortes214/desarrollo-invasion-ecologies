//Los nombres de las funciones tienen que ser exactamente estos!
//Y siempre tienen que devolver promesas

const afterInsert = () => {
    return new Promise( (resolve) => {
        console.log(messages.afIns);
        resolve();
    } );
}


export default { afterInsert };