class Floor {
    #id;
    #floor;
    #inQueue;

    constructor({ id, floor, inQueue }) {
        this.#id = id;
        this.#floor = floor;
        this.#inQueue = inQueue;
    }

    getId() {
        return this.#id;
    }

    getFloor() {
        return this.#floor;
    }

    setInQueue(bool) {
        this.#inQueue = bool;
    }

    getInQueue() {
        return this.#inQueue;
    }
}

export default Floor;