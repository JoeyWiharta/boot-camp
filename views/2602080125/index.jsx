"use client"
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
        // Note: Tailwind CSS is not used because it is not configured in this project.
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f5f5f5",
                padding: "48px 24px",
                boxSizing: "border-box",
            }}
        >
            <div
                style={{
                    maxWidth: "700px",
                    margin: "0 auto",
                    backgroundColor: "#ffffff",
                    padding: "32px",
                    borderRadius: "16px",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
                }}
            >
                <h1
                    style={{
                        margin: "0",
                        fontSize: "30px",
                        fontWeight: "700",
                        color: "#222222",
                    }}
                >
                    Joey Liauw Wiharta - 2602080125
                </h1>

                <p
                    style={{
                        marginTop: "16px",
                        lineHeight: "1.7",
                        color: "#555555",
                    }}
                >
                    I am a Computer Science student with a strong interest in frontend
                    development. I have experience building web applications with React and
                    TypeScript, including reusable components, responsive interfaces, and
                    microfrontend applications using modern tools such as Vite and Tailwind
                    CSS.
                </p>

                <hr
                    style={{
                        margin: "32px 0",
                        border: "none",
                        borderTop: "1px solid #e5e5e5",
                    }}
                />

                <h2
                    style={{
                        margin: "0",
                        fontSize: "22px",
                        fontWeight: "600",
                        color: "#222222",
                    }}
                >
                    React Hooks Demo
                </h2>

                <p
                    style={{
                        marginTop: "12px",
                        color: "#555555",
                    }}
                >
                    {message}
                </p>

                <button
                    onClick={() => setCount((count) => count + 1)}
                    style={{
                        marginTop: "8px",
                        padding: "10px 18px",
                        border: "none",
                        borderRadius: "8px",
                        backgroundColor: "#16a34a",
                        color: "#ffffff",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                    }}
                >
                    Click Me
                </button>

                <div
                    style={{
                        display: "flex",
                        gap: "12px",
                        marginTop: "24px",
                    }}
                >
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="useRef example"
                        style={{
                            flex: "1",
                            padding: "10px 14px",
                            border: "1px solid #d1d5db",
                            borderRadius: "8px",
                            outline: "none",
                            fontSize: "14px",
                            boxSizing: "border-box",
                        }}
                    />

                    <button
                        onClick={handleFocus}
                        style={{
                            padding: "10px 18px",
                            border: "1px solid #16a34a",
                            borderRadius: "8px",
                            backgroundColor: "#ffffff",
                            color: "#16a34a",
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: "pointer",
                        }}
                    >
                        Focus Input
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MyPage