import { useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";

function LongCanvas({ mode, children }) {
    const canvasRef = useRef()
    const defaultLocation = {
        size: {
            width: 0,
            height: 0
        },
        position: {
            x: 0, y: 0
        }
    }
    const [location, setLocation] = useState(defaultLocation)
    const [isAdding, setIsAdding] = useState(true)

    useEffect(() => {

        const canvas = canvasRef.current
        let position
        const onMouseMove = (e) => {
            const size = {
                width: e.offsetX - position.x,
                height: e.offsetY - position.y,
            }
            setLocation(prev => ({ ...prev, size }))
        }

        canvas.addEventListener("mousedown", (e) => {
            position = {
                x: e.offsetX,
                y: e.offsetY
            }
            setLocation(prev => ({ ...prev, position }))
            if (mode) { setIsAdding(true) }
            canvas.addEventListener("mousemove", onMouseMove)
            canvas.addEventListener("mouseup", () => {
                canvas.removeEventListener("mousemove", onMouseMove)
                setLocation(defaultLocation)
                setIsAdding(false)
            })
        })
    }, [])

    return (
        <div ref={canvasRef} style={{ width: "100%", height: "500px" }}  >
            {children}
            {isAdding && <Rnd size={location.size} position={location.position} className="border" />}
        </div>
    );
}

export default LongCanvas;