import React, { ReactNode } from 'react';

type UserContextProps = {
    user: string;
    setUser: (n: string) => void;
};

export const UserContext = React.createContext<UserContextProps | undefined>(
    undefined,
);

export default function UserContextProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [name, setName] = React.useState('');
    const setNameFunc = (s: string) => {
        setName(s);
    };
    return (
        <UserContext.Provider value={{ user: name, setUser: setNameFunc }}>
            {children}
        </UserContext.Provider>
    );
}
export const useUser = () => React.useContext(UserContext);
