class Floor {
    #id;
    #floor;

    constructor({ id, floor }) {
        this.#id = id;
        this.#floor = floor;
    }

    getId() {
        return this.#id;
    }

    getFloor() {
        return this.#floor;
    }
}

export default Floor;