import { ReactNode } from 'react';
import { AuthLayoutStyled } from './index.styles';

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <AuthLayoutStyled>
            <div className="page">{children}</div>
        </AuthLayoutStyled>
    );
};

export default AuthLayout;
