import { ReactNode } from 'react';
import { BaseLayoutStyled } from './index.styles';
import Header from 'components/header';

interface BaseLayoutProps {
    children: ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
    return (
        <BaseLayoutStyled>
            <div className="page">
                <Header />
                {children}
            </div>
        </BaseLayoutStyled>
    );
};

export default BaseLayout;
