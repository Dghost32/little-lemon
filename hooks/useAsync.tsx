import { useCallback, useEffect, useState } from "react"

export default function useAsync<T>(callback: () => Promise<T>, dependencies: any[] = []) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<boolean>()
    const [value, setValue] = useState<T>()

    const callbackMemoized = useCallback(() => {
        setLoading(true)
        setError(undefined)
        setValue(undefined)
        callback()
            .then(setValue)
            .catch(setError)
            .finally(() => setLoading(false))

        setLoading(false)
    }, dependencies)

    useEffect(() => {
        callbackMemoized()
    }, [callbackMemoized])

    return { loading, error, value }
}
