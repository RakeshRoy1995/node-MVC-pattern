const info = (
    namespace,
    message,
    object
) => {
    if (object) {
        console.info(
            `[${namespace}] - [INFO] ${message} - [Object] - `,
            object
        );
    } else {
        console.info(`[${namespace}] - [INFO] ${message}`);
    }
};

const warning = (
    namespace,
    message,
    object
) => {
    if (object) {
        console.warn(
            `[${namespace}] - [INFO] ${message} - [Object] - `,
            object
        );
    } else {
        console.warn(`[${namespace}] - [INFO] ${message}`);
    }
};

const error = (
    namespace,
    message,
    object
) => {
    if (object) {
        console.warn(
            `[${namespace}] - [INFO] ${message} - [Object] - `,
            object
        );
    } else {
        console.warn(`[${namespace}] - [INFO] ${message}`);
    }
};

module.exports = {
    info,
    error,
    warning
 }
