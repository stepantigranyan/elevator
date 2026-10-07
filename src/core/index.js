import Memory from './service/memoryService.js';
import Panel from './service/panelService.js';
import { drawElevatorButtons } from "../main.js";

const elevatorLeftDoor = document.getElementById('elevator-left-door');
const elevatorRightDoor = document.getElementById('elevator-right-door');

const floorNumber = document.getElementById('floor-number');
const floorArrow = document.getElementById('floor-arrow');

const elevatorOpenButton = document.getElementById('elevator-open');
const elevatorCloseButton = document.getElementById('elevator-close');

class Elevator {
    #memory;
    #panel;

    #nextFloor;
    #finalFloor;

    #isClosed;
    #isWorking;

    #doorTimer;
    #movingTimer;

    #floorCords;
    #duration;

    #isWaiting;

    constructor() {
        this.#memory = new Memory();
        this.#panel = new Panel();

        this.#nextFloor = undefined;
        this.#finalFloor = undefined;

        this.#isClosed = true;
        this.#isWorking = false;

        this.#doorTimer = undefined;
        this.#movingTimer = undefined;

        this.#isWaiting = true;

        this.#floorCords = (this.getAllFloors().length - 1) * 200;
        this.#duration = undefined;
    }

    openDoors() {
        elevatorOpenButton.disabled = false;

        elevatorLeftDoor.classList.add('-left-1/2');
        elevatorLeftDoor.classList.remove('left-0');
        elevatorRightDoor.classList.add('-right-1/2');
        elevatorRightDoor.classList.remove('right-0');

        this.#isWaiting = true;
        this.#isWorking = false;
        this.#isClosed = false;

        clearTimeout(this.#movingTimer);
        clearTimeout(this.#doorTimer);

        elevatorOpenButton.checked = true;

        this.#doorTimer = setTimeout(() => {
            elevatorCloseButton.checked = true;
            elevatorLeftDoor.classList.add('left-0');
            elevatorLeftDoor.classList.remove('-left-1/2');
            elevatorRightDoor.classList.add('right-0');
            elevatorRightDoor.classList.remove('-right-1/2');

            this.#movingTimer = setTimeout(() => {
                if(this.#memory.getListLength() !== 0) {
                    this.#startMoving();
                }

                this.#isClosed = true;
            }, 2000);
        }, 3000);
    }

    closeDoors() {
        elevatorOpenButton.disabled = false;
        clearTimeout(this.#movingTimer);
        clearTimeout(this.#doorTimer);
        this.#isWaiting = true;

        this.#movingTimer = setTimeout(()=> {
            if(this.#memory.getListLength() !== 0) {
                this.#startMoving();
            }

            this.#isClosed = true;
        }, 2000)
    }

    addOrRemoveFloor(floor) {
        if (this.#memory.getListLength() === 0 && this.#isClosed && this.#isWaiting) {
            this.#memory.addOrRemoveFloor(floor);
            this.#startMoving();
            return;
        }

        this.#memory.addOrRemoveFloor(floor);
        this.#finalFloor = this.#memory.getFinalFloor(floor);
    }

    getFloorById(id) {
        return this.#panel.getFloorInfo(id);
    }

    getAllFloors() {
        return this.#panel.getAll();
    }

    isWaiting() {
        return this.#isWaiting;
    }

    #startMoving() {
        const lastFloor = document.getElementById('last-floor');
        this.#isWaiting = false;
        this.#isWorking = true;
        this.#isClosed = true;
        let currentFloor = this.#memory.getCurrentFloor();
        this.#finalFloor = this.#memory.getFinalFloor();
        let timer;

        elevatorOpenButton.disabled = true;

        this.#memory.setDirection(this.#finalFloor);
        const direction = this.#memory.getDirection();

        floorArrow.innerHTML = direction === 'up' ? '<i class="fa-solid fa-circle-up"></i>' : '<i class="fa-solid fa-circle-down"></i>';

        if (this.#finalFloor === undefined) {
            this.#isWorking = false;
            this.#isClosed = true;
            clearInterval(timer);
            return;
        }

        let nextCords = this.#floorCords - (this.#finalFloor.getFloor() - 1) * 200;
        lastFloor.style.marginTop = -nextCords * 4 + 'px';
        lastFloor.style.transitionDuration = Math.abs(currentFloor.getFloor() - this.#finalFloor.getFloor()) * 2000 + 'ms';

        if (currentFloor.getFloor() === this.#finalFloor.getFloor()) {
            this.#isWorking = false;
            this.#isClosed = false;
            this.openDoors();
            this.#finalFloor.setInQueue(false);
            this.#memory.addOrRemoveFloor(currentFloor);
            this.#memory.setCurrentFloor(currentFloor);
            drawElevatorButtons(this.getAllFloors());
            clearInterval(timer);
            return;
        }

        timer = setInterval(() => {
            currentFloor = this.#panel.getNextFloor(currentFloor, direction);
            floorNumber.innerText = currentFloor.getFloor();
            this.#memory.setCurrentFloor(currentFloor);

            if (this.#finalFloor === undefined) {
                this.#isWorking = false;
                this.#isClosed = false;
                nextCords = this.#floorCords - (currentFloor.getFloor() - 1) * 200;
                lastFloor.style.marginTop = -nextCords * 4 + 'px';
                lastFloor.style.transitionDuration = 1000 + 'ms';
                floorNumber.innerText = currentFloor.getFloor();
                this.#memory.setCurrentFloor(currentFloor);
                this.openDoors();
                clearInterval(timer);
                return;
            }

            if (currentFloor.getFloor() === this.#finalFloor.getFloor()) {
                this.#isWorking = false;
                this.#isClosed = false;
                clearInterval(timer);
                this.openDoors();
                currentFloor.setInQueue(false);
                this.#memory.addOrRemoveFloor(currentFloor);
                this.#memory.setCurrentFloor(currentFloor);
                drawElevatorButtons(this.getAllFloors());
            }

            nextCords = this.#floorCords - (this.#finalFloor.getFloor() - 1) * 200;
            lastFloor.style.transitionDuration = Math.abs(currentFloor.getFloor() - this.#finalFloor.getFloor()) * 2000 + 'ms';
            lastFloor.style.marginTop = -nextCords * 4 + 'px';

            if (direction === 'up' && currentFloor.getFloor() > this.#finalFloor.getFloor() || direction === 'down' && currentFloor.getFloor() < this.#finalFloor.getFloor()) {;
                this.#isWorking = false;
                this.#isClosed = false;
                nextCords = this.#floorCords - (currentFloor.getFloor() - 1) * 200;
                lastFloor.style.marginTop = -nextCords * 4 + 'px';
                lastFloor.style.transitionDuration = 1000 + 'ms';
                floorNumber.innerText = currentFloor.getFloor();
                clearInterval(timer);
                this.openDoors();
                this.#memory.setCurrentFloor(currentFloor);
                drawElevatorButtons(this.getAllFloors());
            }


        }, 2000);
    }
}

export default Elevator;
