'use client';
import { createContext, ReactNode, useState, useContext } from 'react';

export interface CollapseContextInterface {
    isCollapsed: boolean,
    setIsCollapsed: (isCollapsed: boolean) => any
}

export const CollapseContext = createContext({} as CollapseContextInterface);

type Props = {
    children: ReactNode
};

export default function CollapseProvider({ children }: Props) {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

    return (
        <CollapseContext.Provider
            value={{
                isCollapsed, setIsCollapsed,
            }}
        >
            {children}
        </CollapseContext.Provider>
    );
}

export function useCollapseContext() {
    return useContext(CollapseContext)
}  