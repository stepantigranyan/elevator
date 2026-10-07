import Elevator from "./core/index.js";
import { buttons, corridors } from './const/index.js'

const floorPanel = document.getElementById('floor-panel');
const corridorContainer = document.getElementById('corridors');

const elevatorLeftDoor = document.getElementById('elevator-left-door');
const elevatorRightDoor = document.getElementById('elevator-right-door');

const elevatorOpenButton = document.getElementById('elevator-open');
const elevatorCloseButton = document.getElementById('elevator-close');

const elevatorFloorButtons = document.querySelectorAll('.floor-btn');

const elevatorService = new Elevator();

const openDoors = () => {
    if (!elevatorService.isWaiting()) {
        return;
    }

    elevatorLeftDoor.classList.add('-left-1/2');
    elevatorLeftDoor.classList.remove('left-0');
    elevatorRightDoor.classList.add('-right-1/2');
    elevatorRightDoor.classList.remove('right-0');
    elevatorService.openDoors();
}

const closeDoors = () => {
    if (!elevatorService.isWaiting()) {
        return;
    }

    elevatorLeftDoor.classList.add('left-0');
    elevatorLeftDoor.classList.remove('-left-1/2');
    elevatorRightDoor.classList.add('right-0');
    elevatorRightDoor.classList.remove('-right-1/2');
    elevatorService.closeDoors();
}

function createElevatorFloorButton(floor) {
    const id = floor.getId();
    const floorNumber = floor.getFloor();
    const inQueue = floor.getInQueue();

    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.classList.add('cursor-pointer', 'size-7', 'bg-gray-300', 'text-gray-900', 'rounded-full', 'justify-self-center', 'flex', 'justify-center', 'items-center', 'border', 'border-gray-700', 'has-checked:bg-primary-red');

    const span = document.createElement('span');
    span.innerText = `${floorNumber}`;

    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', id);
    input.classList.add('hidden');
    input.checked = inQueue;

    input.addEventListener('click', (e) => {
        const { id } = e.target;
        const floor = elevatorService.getFloorById(id);
        elevatorService.addOrRemoveFloor(floor);
    })

    label.append(span, input);

    return label;
}


export function drawElevatorButtons(floors) {
    floorPanel.innerHTML = '';
    floors.forEach(floor => {
        floorPanel.append(createElevatorFloorButton(floor));
    });
}

function drawCorridors(corridors) {
    corridorContainer.append(corridors)
}


const start = () => {
    drawElevatorButtons(buttons);
    drawCorridors(corridors);

    elevatorOpenButton.addEventListener('click', openDoors);
    elevatorCloseButton.addEventListener('click', closeDoors);

    elevatorFloorButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const { id } = e.target;
            const floor = elevatorService.getFloorById(id);
            elevatorService.addOrRemoveFloor(floor);
        });
    });
}

start();