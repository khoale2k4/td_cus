'use client';
import { createContext, ReactNode, useState, useContext } from 'react';

export interface SourceContextInterface {
    source: any,
    setSource: (source: any) => any
}

export const SourceContext = createContext({} as SourceContextInterface);

type Props = {
    children: ReactNode
};

export default function CollapseProvider({ children }: Props) {
    const [source, setSource] = useState<any>(null);

    return (
        <SourceContext.Provider
            value={{
                source, setSource,
            }}
        >
            {children}
        </SourceContext.Provider>
    );
}

export function useSourceContext() {
    return useContext(SourceContext)
}  