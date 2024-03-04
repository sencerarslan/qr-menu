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
`;
