import { useState, useEffect, useMemo, useRef } from "react"

const MyPage = () => {
    const [count, setCount] = useState(0)
    const inputRef = useRef(null)

    useEffect(() => {
        document.title = "Joey Liauw Wiharta"
    }, [])

    const message = useMemo(() => {
        if (count === 0) {
            return "Button hasn't been clicked yet."
        }
        return `Button clicked ${count} ${count === 1 ? "time" : "times"}.`
    }, [count])

    const handleFocus = () => {
        inputRef.current.focus()
    }

    return (
        <div>
            <h1>Joey Liauw Wiharta - 2602080125</h1>
            <p>
                I am a Computer Science student with a strong interest in frontend
                development. I have experience building web applications with React and
                TypeScript, including reusable components, responsive interfaces, and
                microfrontend applications using modern tools such as Vite and Tailwind
                CSS.
            </p>
            <hr />
            <h2>React Hooks Demo</h2>
            <p>{message}</p>
            <button onClick={() => setCount((count) => count + 1)}>
                Click Me
            </button>
            <br />
            <br />
            <input
                ref={inputRef}
                type="text"
                placeholder="useRef example"
            />
            <button onClick={handleFocus}>
                Focus Input
            </button>
        </div>
    )
}
export default MyPage