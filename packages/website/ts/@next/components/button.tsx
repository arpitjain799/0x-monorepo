import * as React from 'react';
import { Link as ReactRouterLink, NavLink as ReactRouterNavLink } from 'react-router-dom';
import styled from 'styled-components';

import { colors } from 'ts/style/colors';

interface ButtonInterface {
    bgColor?: string;
    color?: string;
    children?: Node | string;
    isTransparent?: boolean;
    isNoBorder?: boolean;
    isNoPadding?: boolean;
    isWithArrow?: boolean;
    isAccentColor?: boolean;
    hasIcon?: boolean | string;
    isInline?: boolean;
    href?: string;
    type?: string;
    to?: string;
    onClick?: () => any;
    theme?: {
        textColor: string;
    };
}

export const Button = (props: ButtonInterface) => {
    const {
        children,
        href,
        isWithArrow,
        to,
    } = props;
    let linkElem;

    if (props.href) { linkElem = 'a'; }
    if (props.to) { linkElem = ReactRouterLink; }

    const Component = linkElem ? ButtonBase.withComponent(linkElem) : ButtonBase;

    return (
        <Component {...props}>
            {props.children}

            { isWithArrow &&
                <svg width="16" height="15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4.484.246l.024 1.411 8.146.053L.817 13.547l.996.996L13.65 2.706l.052 8.146 1.412.024L15.045.315 4.484.246z"
                    />
                </svg>
            }
        </Component>
    );
};

const ButtonBase = styled.button<ButtonInterface>`
    appearance: none;
    border: 1px solid transparent;
    display: inline-block;
    background-color: ${props => props.bgColor || colors.brandLight};
    background-color: ${props => (props.isTransparent || props.isWithArrow) && 'transparent'};
    border-color: ${props => (props.isTransparent && !props.isWithArrow) && 'rgba(255, 255, 255, .4)'};
    color: ${props => props.isAccentColor ? props.theme.linkColor : (props.color || props.theme.textColor)};
    padding: ${props => (!props.isNoPadding && !props.isWithArrow) && '18px 30px'};
    text-align: center;
    font-size: ${props => props.isWithArrow ? '20px' : '18px'};
    text-decoration: none;
    cursor: pointer;
    outline: none;
    transition: background-color 0.35s, border-color 0.35s;

    svg {
        margin-left: 9px;
        transition: transform 0.5s;
        transform: translate3d(-2px, 2px, 0);
    }

    path {
        fill: ${props => props.isAccentColor ? props.theme.linkColor : (props.color || props.theme.textColor)};
    }

    &:hover {
        background-color: ${props => (!props.isTransparent && !props.isWithArrow) && '#04BEA8'};
        border-color: ${props => (props.isTransparent && !props.isNoBorder && !props.isWithArrow) && '#00AE99'};

        svg {
            transform: translate3d(2px, -2px, 0);
        }
    }
`;
