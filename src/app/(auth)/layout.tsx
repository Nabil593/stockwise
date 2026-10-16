import React from 'react';

const AuthLayout = ({ children}: LayoutProps<"/">) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default AuthLayout;