import { Styled } from './index.styles';
import { QrCodeScanner } from '@mui/icons-material';

const Logo = () => {
    return (
        <Styled>
            <div className="logo">
                ADMIN
                <small>
                    <QrCodeScanner /> QR MENU
                </small>
            </div>
        </Styled>
    );
};

export default Logo;
