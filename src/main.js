import { debounce } from './helpers/index.js';

const elevatorOpenButton = document.getElementById('elevator-open');
const elevatorCloseButton = document.getElementById('elevator-close');

const elevatorLeftDoor = document.getElementById('elevator-left-door');
const elevatorRightDoor = document.getElementById('elevator-right-door');

let state = 'open';

const toggleState = (arg) => {
    state = arg;
    console.log(state);
}

const fn = debounce(toggleState, 2000);

const openDoors = () => {
    elevatorLeftDoor.classList.add('-left-1/2');
    elevatorLeftDoor.classList.remove('left-0');
    elevatorRightDoor.classList.add('-rigth-1/2');
    elevatorRightDoor.classList.remove('right-0');

    fn('open');

    console.log('doors open');

};

const closeDoors = () => {
    elevatorLeftDoor.classList.add('left-0');
    elevatorLeftDoor.classList.remove('-left-1/2');
    elevatorRightDoor.classList.add('right-0');
    elevatorRightDoor.classList.remove('-rigth-1/2');

    fn('close');
    
    console.log('doors close');

};

elevatorOpenButton.addEventListener('click', () => {
    openDoors();

});

elevatorCloseButton.addEventListener('click', () => {
    closeDoors();
});
