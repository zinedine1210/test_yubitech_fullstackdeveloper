import { useState } from 'react';
import { createContext } from 'react';

export const MyContext = createContext();

export function MyProvider({children}) {
    const [data, setData] = useState({
        "dataContacts":null,
        "auth":null
    })

    return (
        <MyContext.Provider value={{ 
            ...data,
            setData
        }}>
            {children}
        </MyContext.Provider>
    );
}