import { CircularProgress } from '@mui/material';
import { LoadingStyled } from './index.styles';

import React from 'react';

const WrappedLoading = () => {
    return (
        <LoadingStyled>
            <CircularProgress color="primary" size={50} />
        </LoadingStyled>
    );
};

export const Loading = React.memo(WrappedLoading);
