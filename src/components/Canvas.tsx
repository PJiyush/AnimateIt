"use client";
import { useLayoutEffect, useRef, useState } from "react";
import {Rectangle} from '@/types/rectangle'

export default function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPos, setStartPos] = useState<{ x: number, y: number } | null>(null);
    const [rect, setRect] = useState<Rectangle | null>(null);
    const [elements, setElements] = useState<Rectangle[]>([]);

    const handleMouseDown = (e: MouseEvent) => {
        const { offsetX, offsetY } = e;
        setIsDrawing(true);
        setStartPos({ x: offsetX, y: offsetY });
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDrawing || !startPos) return;
        const { offsetX, offsetY } = e;
        const width = offsetX - startPos.x;
        const height = offsetY - startPos.y;
        setRect({ x: startPos.x, y: startPos.y, width, height });
    };

    const handleMouseUp = () => {
        if (rect) {
            setElements((prevElements) => [...prevElements, rect]);
            setRect(null);
        }
        setIsDrawing(false);
    };

    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mouseleave', handleMouseUp); 

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('mouseleave', handleMouseUp);
        };
    }, [isDrawing, startPos, rect]);

    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        elements.forEach(({ x, y, width, height }) => {
            ctx.strokeRect(x, y, width, height);
        });

        if (rect) {
            ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
        }
    }, [elements, rect]);

    return (
        <canvas
            className="flex bg-yellow-100 rounded-2xl border-2"
            ref={canvasRef}
            width={1400}
            height={500}
        />
    );
}
