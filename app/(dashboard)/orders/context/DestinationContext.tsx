'use client';
import { createContext, ReactNode, useState, useContext } from 'react';

export interface DestinationContextInterface {
    destination: any,
    setDestination: (destination: any) => any
}

export const DestinationContext = createContext({} as DestinationContextInterface);

type Props = {
    children: ReactNode
};

export default function CollapseProvider({ children }: Props) {
    const [destination, setDestination] = useState<any>(null);

    return (
        <DestinationContext.Provider
            value={{
                destination, setDestination,
            }}
        >
            {children}
        </DestinationContext.Provider>
    );
}

export function useDestinationContext() {
    return useContext(DestinationContext)
}  