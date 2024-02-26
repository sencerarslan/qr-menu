import styled from 'styled-components';

export const Styled = styled.div`
    position: sticky;
    top: 0;
    z-index: 10;
    padding: 20px 30px;
    background-color: #060316;
    border-bottom: solid 3px var(--mui-palette-secondary-main);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    .color-mode {
        color: #fff;
        width: 48px;
        height: 48px;
    }
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
