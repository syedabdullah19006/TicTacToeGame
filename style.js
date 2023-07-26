const boxes = Array.from(document.getElementsByClassName('box'));
const resetbtn = document.getElementById('resetbtn');
resetbtn.addEventListener('click', reset);

const headertext = document.getElementById('header-text');
const areas = [null, null, null, null, null, null, null, null, null];
const o_text = "o";
const x_text = "x";
let currentplayer = o_text;
let winboxesids = [];

function bindClickEvent() {
    boxes.forEach(box => {
        box.addEventListener('click', handleBoxClick);
    });
}

bindClickEvent();

function handleBoxClick(e) {
    if (winboxesids.length > 0) {
        return;
    }
    const id = e.target.id;
    if (!areas[id]) {
        areas[id] = currentplayer;
        e.target.innerHTML = currentplayer;
        if (hasPlayerWon(currentplayer)) {
            headertext.innerHTML = `${currentplayer} has won!!`;
            headertext.style.background = 'light';
            changingWinBoxesBg();
            return;
        } else if (isDraw()) {
            headertext.innerHTML = 'Draw';
            console.log('draw');
            return;
        }

        currentplayer = currentplayer === o_text ? x_text : o_text;
    }
}

function hasPlayerWon(cplayer) {
    if (areas[0] === cplayer) {
        if (areas[1] === cplayer && areas[2] === cplayer) {
            winboxesids = [0, 1, 2];
            return true;
        }
        if (areas[3] === cplayer && areas[6] === cplayer) {
            winboxesids = [0, 3, 6];
            return true;
        }
        if (areas[4] === cplayer && areas[8] === cplayer) {
            winboxesids = [0, 4, 8];
            return true;
        }
    }
    if (areas[4] === cplayer) {
        if (areas[1] === cplayer && areas[7] === cplayer) {
            winboxesids = [4, 1, 7];
            return true;
        }
        if (areas[2] === cplayer && areas[6] === cplayer) {
            winboxesids = [4, 2, 6];
            return true;
        }
        if (areas[3] === cplayer && areas[5] === cplayer) {
            winboxesids = [4, 3, 5];
            return true;
        }
    }
    if (areas[8] === cplayer) {
        if (areas[7] === cplayer && areas[6] === cplayer) {
            winboxesids = [8, 7, 6];
            return true;
        }
        if (areas[5] === cplayer && areas[2] === cplayer) {
            winboxesids = [8, 5, 2];
            return true;
        }
    }
    // Add conditions for winning patterns involving other boxes
    return false;
}

function isDraw() {
    return areas.every(val => val !== null);
}

function changingWinBoxesBg() {
    winboxesids.forEach(id => {
        boxes[id].style.background = 'lightpink';
    });
    boxes.forEach(box => {
        box.style.cursor = 'not-allowed';
    });
}

function reset() {
    winboxesids = [];
    areas.forEach((val,index)=>{
        areas[index] = null;
    })
    boxes.forEach(box=>{
        box.innerHTML = '';
        box.style.background = '';
        box.style.cursor = 'pointer'
    })
}