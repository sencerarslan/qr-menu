import styled from 'styled-components';

export const Styled = styled.div`
    .logo {
        font-size: 40px;
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        line-height: 30px;
        font-weight: 900;
        user-select: none;
        small {
            gap: 5px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            margin-top: 5px;
            font-size: 18px;
            line-height: 18px;
            color: var(--mui-palette-secondary-main);
        }
    }
`;
