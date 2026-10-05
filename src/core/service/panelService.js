import { FLOORS } from '../../const/index.js';
import Floor from '../models/floorModel.js';

class Panel {
    #list;

    constructor() {
        this.#list = this.#__init__(FLOORS);
    }

    #__init__(floors) {
        return floors.map((floor) => new Floor(floor));
    }

    getNearestFloor(currentFloor, direction) {
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
}

export default Panel;
