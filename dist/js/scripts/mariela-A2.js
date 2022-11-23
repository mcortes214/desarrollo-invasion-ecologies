import videoPlayer from './video-player.js';
import audioPlayer from './audio-player.js';
import expandableBoxes from './expandableBoxes.js';

const afterInsert = () => {
    return new Promise((resolve) => {
        videoPlayer.afterInsert();
        audioPlayer.afterInsert();
        expandableBoxes.afterInsert();
        resolve();
    });
}
const beforeRemove = () => {
    return new Promise((resolve) => {
        resolve();
    });
}

export default { afterInsert, beforeRemove };