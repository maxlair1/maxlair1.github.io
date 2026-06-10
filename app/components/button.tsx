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
        <button>
            {React.isValidElement(leading) ? leading : leading && <Before />}
            {children}
            {React.isValidElement(trailing) ? trailing : trailing && <After />}
        </button>
    )
}