import styled from 'styled-components';

export const Styled = styled.div`
    .group-title {
        text-align: left;
        font-weight: 600;
        font-size: 20px;
        color: var(--mui-palette-secondary-main);
        margin-top: 30px;
    }
    .list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 30px;
        .card {
            position: relative;
            text-align: left;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            gap: 15px;
            padding: 15px;
            padding-bottom: 30px;
            border-radius: 12px;
            aspect-ratio: 4/2;
            box-shadow:
                rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
                rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;

            .left {
                width: 30%;
                img {
                    width: 100%;
                    aspect-ratio: 1/1;
                    overflow: hidden;
                    object-fit: contain;
                }
            }
            .right {
                flex: 1;
            }
            .title {
                font-weight: 600;
                font-size: 18px;
                color: #331111;
                margin-bottom: 5px;
            }
            .desc {
                font-weight: 400;
                font-size: 12px;
                color: #545454;
            }
            .price {
                position: absolute;
                bottom: 0;
                right: 0;
                font-weight: 600;
                font-size: 14px;
                padding: 4px 7px;
                border-radius: 12px 0 12px 0;
                color: #fff;
                background-color: var(--mui-palette-secondary-main);
            }
        }
    }

    @media only screen and (max-width: 1200px) {
        .list {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    @media only screen and (max-width: 740px) {
        .list {
            grid-template-columns: repeat(1, 1fr);
            .card {
                aspect-ratio: inherit;
            }
        }
    }
`;
