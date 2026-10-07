export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const debounce = (func1, func2, ms) => {
    let timer;

    return {
        open(...args) {
            clearTimeout(timer);

            timer = setTimeout(() => {
                func1(...args);
                }, ms)
        },

        close(...args) {
            clearTimeout(timer);

            timer = setTimeout(() => {
                func2(...args);
            }, ms);
        }
    }
}