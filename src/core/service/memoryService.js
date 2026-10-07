import Floor from "../models/floorModel.js";

class Memory {
    #floorsQueue;
    #direction;
    #currentFloor;

    constructor() {
        this.#floorsQueue = [];
        this.#direction = 'up';
        this.#currentFloor = this.#__initCurrentFloor__();
    }

    #__initCurrentFloor__() {
        return new Floor({ id: 'floor-1', floor: 1, inQueue: false });
    }

    getCurrentFloor() {
        return this.#currentFloor;
    }

    setCurrentFloor(floor) {
        this.#currentFloor = floor;
    }

    setDirection(finalFloor) {
        if (finalFloor === undefined) {
            return;
        }

        if (finalFloor.getFloor() > this.#currentFloor.getFloor()) {
            this.#direction = 'up';
        } else if (finalFloor.getFloor() < this.#currentFloor.getFloor()) {
            this.#direction = 'down';
        }
    }

    getDirection() {
        return this.#direction;
    }

    addOrRemoveFloor(floor) {
        const floorInQueue = this.#floorsQueue.find(oldFloor => oldFloor.getFloor() === floor.getFloor());
        if (floorInQueue === undefined) {
            this.#floorsQueue.push(floor);
            floor.setInQueue(true);
        } else {
            this.#floorsQueue = this.#floorsQueue.filter(oldFloor => oldFloor.getFloor() !== floorInQueue.getFloor());
            floor.setInQueue(false);
        }

        this.#sortQueue();
    }

    getListLength() {
        return this.#floorsQueue.length;
    }

    getFinalFloor() {
        return this.#floorsQueue[0];
    }

    #sortQueue() {
        const currentFloor = this.#currentFloor;
        const direction = this.#direction;
        const floorsQueue = this.#floorsQueue;


        const highFloors = [];
        const lowFloors = [];

        const currentFloorNumber = currentFloor.getFloor();

        for (let i = 0; i < floorsQueue.length; i++) {
            const floorInQueue = floorsQueue[i];
            const floorNumber = floorInQueue.getFloor();

            if (currentFloorNumber < floorNumber) {
                highFloors.push(floorInQueue);
            } else if (currentFloorNumber > floorNumber)  {
                lowFloors.push(floorInQueue);
            } else {
                if (direction === 'up') {
                    lowFloors.push(floorInQueue);
                } else {
                    highFloors.push(floorInQueue);
                }
            }
        }

        highFloors.sort((first, second) => first.getFloor() - second.getFloor());
        lowFloors.sort((first, second) => second.getFloor() - first.getFloor());

        if (direction === 'up') {
            this.#floorsQueue = [...highFloors, ...lowFloors];
        } else if (direction === 'down') {
            this.#floorsQueue = [...lowFloors, ...highFloors];
        }

    }
}

export default Memory;