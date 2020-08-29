export const padTime = (time) => time.toString().padStart(2, 0);

export const getMinutes = (time) => Math.floor(time / 60);

export const getSeconds = (time) => time % 60;