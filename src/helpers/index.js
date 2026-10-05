export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const debounce = (func, ms) => {
    let timer;

    return (...args) => {
        clearTimeout(timer);

        timer = setTimeout(() => {
            func(...args);
        }, ms)
    }
}