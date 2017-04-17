// Memoization
const mainMemoization = {}

// Utils
const defaultSource = {
    compareMethod : null,
}

// Compare methods
export function shallowEqual(a, b){
    if (!Array.isArray(a) || a !== Object(a) || !Array.isArray(b) || b !== Object(b)) {
        return a === b
    }

    const aKeys = Object.keys(a)
    const bKeys = Object.keys(b)
    if (bKeys.length !== aKeys.length){
        return false
    }
    for (let i = 0, l = bKeys.length; i < l; i++){
        if (a[bKeys[i]] !== b[bKeys[i]]) {
            return false
        }
    }
    return true
}

// Handler
export function shallowComparator(sourceFunc){
    return {
        input : sourceFunc,
        compareMethod : shallowEqual,
    }
}

function createSource(refSource) {
    if (typeof refSource === "function") {
        return {
            ...defaultSource,
            input : refSource,
        }
    }
    return {
        ...defaultSource,
        ...refSource,
    }
}

export function createSelector(sources, outputFunc) {

    if (!Array.isArray(sources)) {
        throw new Error("Expected sources to be an array.")
    }

    if (typeof outputFunc !== "function") {
        throw new Error("Expected the outputFunc to be a function.")
    }

    const finalSources = sources.map((source) => {
        return createSource(source)
    })

    let memoization = null

    return (state, parameters, memoizationKey) => {

        const finalMemoization = memoizationKey ? mainMemoization[memoizationKey] : memoization

        let useMemoizedValue = finalMemoization ? true : false

        // Sources values
        const sourcesValues = finalSources.map((source, index) => {
            // Calc value
            const sourceValue = source.input(state, parameters, memoizationKey)

            // If necessary, check if the source value is different from memoized one
            if (useMemoizedValue){
                if (source.compareMethod) {
                    useMemoizedValue = source.compareMethod(finalMemoization.sourcesValues[index], sourceValue)
                }
                else {
                    useMemoizedValue = (finalMemoization.sourcesValues[index] === sourceValue)
                }
            }

            return sourceValue
        })

        if (useMemoizedValue) {
            return finalMemoization.result
        } else {
            const result = outputFunc(...sourcesValues)
            const memoizedData = {
                sourcesValues,
                result,
            }
            if (memoizationKey) {
                mainMemoization[memoizationKey] = memoizedData
            }
            else {
                memoization = memoizedData
            }
            return result
        }
    }
}
