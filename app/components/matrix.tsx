'use client';

import * as React from 'react';
import clsx from 'clsx';

interface MatrixAnimationProps {
    cols?: number;
    rows?: number;
    gap?: number;
    cell?: number;
    responsive?: boolean;
    speed?: number;
    duration?: number;
}

export default function MatrixAnimation({
    cols: colsProp = 20,
    rows: rowsProp = 10,
    gap = 4,
    cell = 8,
    responsive = true,
    speed = 200,
    duration = 1000,
}: MatrixAnimationProps) {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [dims, setDims] = React.useState({cols: colsProp, rows: rowsProp});

    React.useEffect(() => {
        if (!responsive) return;
        const el = containerRef.current;
        if (!el) return;

        const compute = () => {
            const {width, height} = el.getBoundingClientRect();
            const step = cell + gap;
            const cols = Math.max(1, Math.floor((width + gap) / step));
            const rows = Math.max(1, Math.floor((height + gap) / step));
            setDims({cols, rows});
        };

        compute();
        const observer = new ResizeObserver(compute);
        observer.observe(el);
        return () => observer.disconnect();
    }, [responsive, cell, gap]);

    const {cols, rows} = responsive ? dims : {cols: colsProp, rows: rowsProp};

    const count = rows * cols;
    const [glowing, setGlowing] = React.useState<Set<number>>(new Set());

    React.useEffect(() => {
        if (count === 0) return;
        const timeouts = new Set<ReturnType<typeof setTimeout>>();
        const id = setInterval(() => {
            const toggles = Math.max(1, Math.round(count * 0.02));
            setGlowing(prev => {
                const next = new Set(prev);
                for (let n = 0; n < toggles; n++) {
                    const i = Math.floor(Math.random() * count);
                    next.add(i);
                    const t = setTimeout(() => {
                        timeouts.delete(t);
                        setGlowing(cur => {
                            const after = new Set(cur);
                            after.delete(i);
                            return after;
                        });
                    }, duration);
                    timeouts.add(t);
                }
                return next;
            });
        }, speed);
        return () => {
            clearInterval(id);
            timeouts.forEach(clearTimeout);
        };
    }, [count, speed, duration]);

    const GlowCube = (
        glowing: boolean = false,
        colorRGB: string = '16,256,120'
    ) => {
        return (
            <div
                className={clsx('absolute w-full aspect-square rounded-[2px] z-10 transition-opacity duration-500',
                    glowing ? 'opacity-100' : 'opacity-0'
                )}
                style={{
                    backgroundColor: `rgb(${colorRGB})`,
                    boxShadow: `0px 0px 5px 1px rgba(${colorRGB},0.5)`,
                }}
            >
            </div>
        )
    }

    return (
        <div ref={containerRef} className="w-full h-full pointer-none select-none">
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${cols}, ${cell}px)`,
                    gridTemplateRows: `repeat(${rows}, ${cell}px)`,
                    gap: `${gap}px`,
                }}
            >
                {Array.from({length: rows * cols}, (_, i) => (
                    <div key={i} className="relative" style={{width: cell, height: cell}} aria-hidden>
                        {GlowCube(glowing.has(i))}
                        <div
                            className="w-0.5 h-0.5 rounded-full bg-gray-500/20"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                        ></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
