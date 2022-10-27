import messages from './gabi-script-dep.js';

//Los nombres de las funciones tienen que ser exactamente estos!
//Y siempre tienen que devolver promesas

const beforeInsert = () => {
    return new Promise( (resolve) => {
        console.log(messages.befIns);
        resolve();
    } );
}

const afterInsert = () => {
    return new Promise( (resolve) => {
        console.log(messages.afIns);
        resolve();
    } );
}

// const beforeRemove = () => {
//     return new Promise( (resolve) => {
//         console.log(messages.befRem);
//         resolve();
//     } );
// }

// const afterRemove = () => {
//     return new Promise( (resolve) => {
//         console.log(messages.afRem);
//         resolve();
//     } );
// }

const papa = () => {
    return new Promise((resolve) => {
        console.log(papa);
        resolve();
    });
}

// export default { beforeInsert, afterInsert, beforeRemove, afterRemove };
export default { beforeInsert, afterInsert };