const cleanUpCallbacks: (() => void)[] = [];

export const cleanUp = () => cleanUpCallbacks.forEach(callback => callback());
export const registerCallback = (callback: () => void) => cleanUpCallbacks.push(callback);
