import { Dispatch, SetStateAction, useContext } from "react"
import parse from 'html-react-parser'
import DOMPurify from 'dompurify';

import { MoveContext } from "../providers/MoveProvider"
import { useApi } from "../hooks/useApi";
import toast from "react-hot-toast";

type SquareProps = {
    name: string
    color: string
    svg: string | Node
    setSquarePieces: Dispatch<SetStateAction<{ [key: string]: string | undefined; }>>
}

export function Square({ name, color, svg, setSquarePieces }: SquareProps) {

    const { firstSelection, setFirstSelection, fromSquare, setFromSquare, toSquare, setToSquare } = useContext(MoveContext)

    const { makeMove } = useApi()

    const handleClick = async () => {
        if (!firstSelection) {
            setFirstSelection(true)
            setFromSquare(name)
        } else {
            setFirstSelection(false)
            setToSquare(name)
            if (toSquare === name && name.length > 0 && name !== fromSquare) {
                const { status, data } = await makeMove(fromSquare + name)
                if (status === 200) {
                    if (!data.error) {
                        setSquarePieces(prev => ({
                            ...prev,
                            [fromSquare]: '',
                            [name]: prev[fromSquare]
                        }))
                    } else {
                        toast.error(data.error)
                    }
                } else {
                    toast.error('An error occurred.')
                }
            }
        }
    }

    return (
        <div
            style={{
                width: '70px',
                height: '70px',
                backgroundColor: firstSelection && fromSquare === name ? '#2DC337' : color,
                border: '1px solid #000',
                position: 'relative'
            }}
            onClick={handleClick}
        >
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 2,
                    fontSize: 10,
                    color: '#000'
                }}
            >
                {name}
            </div>
            {parse(DOMPurify.sanitize(svg))}
        </div>
    )
}
