import { buttons } from '../../const/index.js';

class Panel {
    #list;

    constructor() {
        this.#list = buttons;
    }

    getNextFloor(currentFloor, direction) {
        const list = this.#list;

        if (direction === 'up') {
            return list.find((floor) => currentFloor.getFloor() + 1 === floor.getFloor());
        } else if (direction === 'down') {
            return list.find((floor) => currentFloor.getFloor() - 1 === floor.getFloor());
        }
    }

    getFloorInfo(id) {
        const list = this.#list;

        return list.find((floor) => floor.getId() === id);
    }

    getAll() {
        return this.#list;
    }
}

export default Panel;
