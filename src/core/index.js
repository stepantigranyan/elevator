import Floor from './models/floorModel.js';
import Memory from './service/memoryService.js';
import Panel from './service/panelService.js';

class Elevator {
    #memory;
    #panel;
    #direction;

    #currentFloor;
    #nextFloor;
    #finalFloor;

    #isWorking;

    constructor() {
        this.#memory = new Memory();
        this.#panel = new Panel();
        this.#direction = 'up';

        this.#currentFloor = this.#__initCurrentFloor__();
        this.#nextFloor = undefined;
        this.#finalFloor = undefined;

        this.#isWorking = false;

    }

    #__initCurrentFloor__() {
        return new Floor({ id: 'floor-1', floor: 1 });
    }

    openDoors() {
        const direction = this.#direction;
        const currentFloor = this.#currentFloor;

        this.#isWorking = false;
        this.#nextFloor = this.#panel.getNearestFloor(currentFloor, direction);
        
    }

    closeDoors() {
        this.#isWorking = true;
    }


}
