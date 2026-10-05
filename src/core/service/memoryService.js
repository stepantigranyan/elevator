class Memory {
    #floorsQueue;

    constructor(currentFloor) {
        this.#floorsQueue = [];
    }

    addFloor(floor) {
        this.#sortQueue(floor);
    }

    removeFloor(floor) {
        this.#floorsQueue.filter(removedFloor => removedFloor.getId() !== floor.getId())
    }

    refreshQueue() {
        
    }

    #sortQueue(floor, currentFloor, direction) {
        if (floor !== undefined) {
            this.#floorsQueue.push(floor);
        }

        const floorsQueue = this.#floorsQueue;

        const hightFloors = [];
        const lowFloors = [];

        const currentFloorNumber = currentFloor.getFloor();

        for (let i = 0; i < floorsQueue.length; i++) {
            const floor = floorsQueue[i];
            const floorNumber = floor.getFloor();

            if (currentFloorNumber > floorNumber) {
                hightFloors.push(floor);
            } else {
                lowFloors.push(floor);
            }
        }

        hightFloors.sort((first, second) => first.getFloor() - second.getFloor());
        lowFloors.sort((first, second) => second.getFloor() - first.getFloor());

        if (direction === 'up') {
            this.#floorsQueue = [...hightFloors, ...lowFloors];
        } else if (direction === 'down') {
            this.#floorsQueue = [...lowFloors, ...hightFloors];
        }

    }
}

export default Memory;