
import React from 'react'

type Props = {
    children?: React.ReactNode
};

const Main: React.FC<Props> = ({ children }) => {
    return (
        <div className="main">
            {children}
        </div>
    );
}

export default Main;