'use client';
import { createContext, ReactNode, useState, useContext } from 'react';

export interface DistanceContextInterface {
    distance: any,
    setDistance: (distance: any) => any
}

export const DistanceContext = createContext({} as DistanceContextInterface);

type Props = {
    children: ReactNode
};

export default function CollapseProvider({ children }: Props) {
    const [distance, setDistance] = useState<any>(null);

    return (
        <DistanceContext.Provider
            value={{
                distance, setDistance,
            }}
        >
            {children}
        </DistanceContext.Provider>
    );
}

export function useDistanceContext() {
    return useContext(DistanceContext)
}  