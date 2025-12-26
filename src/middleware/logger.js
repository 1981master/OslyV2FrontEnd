// Sanitize function to remove 'token' recursively
const sanitize = (obj) =>
    JSON.parse(
        JSON.stringify(obj, (key, value) =>
            key.toLowerCase() === 'token' ? undefined : value,
        ),
    )

// Logger middleware
const logger = (store) => (next) => (action) => {
    console.log('ACTION:', sanitize(action))
    console.log('BEFORE STATE:', sanitize(store.getState()))

    const result = next(action) // Dispatch action

    console.log('AFTER STATE:', sanitize(store.getState()))

    return result
}

export default logger
