import Floor from "../core/models/floorModel.js";

const CREATE_BUTTONS = (quantity) => {
    const arr = [];

    for (let i = quantity; i > 0; i--) {
        arr.push(new Floor({ id: `floor-${i}`, floor: i, inQueue: false })) ;
    }

    return arr;
}

const CREATE_CORRIDORS = (quantity) => {
    const container = document.createElement('div');
    container.classList.add('size-full');

    const lastFloor = document.createElement('div');
    lastFloor.setAttribute('id', 'last-floor');
    lastFloor.classList.add('w-full', 'h-200', `bg-[url('/src/images/Corridor3.jpg')]`, 'bg-cover', 'bg-center', 'bg-no-repeat','transition-all', 'ease-linear');
    lastFloor.style.marginTop = -(quantity - 1) * 800 + 'px';
    container.append(lastFloor);

    for (let i = 1; i < quantity; i++) {
        const floor = document.createElement('div');
        floor.classList.add('w-full', 'h-200', `bg-[url('/src/images/Corridor3.jpg')]`, 'bg-cover', 'bg-center', 'bg-no-repeat');
        container.append(floor);
    }

    return container;
}

const CREATE_BUILDING = (quantity) => {
    return {
        buttons: CREATE_BUTTONS(quantity),
        corridors: CREATE_CORRIDORS(quantity),
    }
}

const { buttons, corridors, } = CREATE_BUILDING(10);

export { buttons, corridors };