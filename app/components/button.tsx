import * as React from 'react';
import { type Icon } from "@phosphor-icons/react"

export interface ButtonProps {
    children?: React.ReactElement;
    leading?: React.ReactElement | Icon;
    trailing?: React.ReactElement | Icon
}

export function Button({children, leading, trailing}: ButtonProps) {
    
    const Before = leading as Icon;
    const After = trailing as Icon;
    
    return (
        <button className='flex flex-row justify-center items-center gap-1 hover:bg-accent/50 px-2 py-2 rounded-lg transition-all ease-bounce duration-150'>
            {React.isValidElement(leading) ? leading : leading && <Before />}
            {children}
            {React.isValidElement(trailing) ? trailing : trailing && <After />}
        </button>
    )
}