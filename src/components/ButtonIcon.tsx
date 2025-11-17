import styled, { css } from "styled-components";

type ButtonVariant = 'dark' | 'light' | 'discord';

type ButtonProps = {
    children: React.ReactNode;
    ariaLabel: string;
    variant?: ButtonVariant;
    hasAlert?: boolean;
    active?: boolean;
    onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
    className?: string;
    tooltip?: string;
};

const StyledButtonIcon = styled.button<{
    $variant?: ButtonVariant;
    $hasAlert: boolean;
    $tooltip?: string;
    $active: boolean;
}>`
    width: 4.2rem;
    height: 4.2rem;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    border-radius: ${({ theme }) => theme.radius.md};
    aspect-ratio: 1 / 1;
    position: relative;

    svg {
        width: 2.4rem;
        height: 2.4rem;
        vertical-align: bottom;
        transition: fill 0.1s;
    }

    color: ${({ theme }) => theme.colors.gray400};
    svg path {
        fill: currentColor !important;
    }


    &:hover {
        cursor: pointer;

        ${(p) => 
            p.$variant !== "discord" &&
            css`
                background-color: ${({ theme }) => theme.colors.primary100};
                color: ${({ theme }) => theme.colors.primary300}; 
            `
        }
    }

    ${({ $variant, $active,  theme }) => 
        $variant === "dark" &&
        css`
            color: ${$active ? theme.colors.primary300 : theme.colors.gray400};
        `
    }

    ${({ $variant, $active,  theme }) => 
        $variant === "light" &&
        css`
            color: ${$active ? theme.colors.primary300 : theme.colors.gray300}; 
        `
    }

    ${(p) =>
        p.$variant === "discord" &&
        css`
            background-color: ${({ theme }) => theme.colors.gray400};
            color: ${({ theme }) => theme.colors.white};
            svg path {
                fill: ${({ theme }) => theme.colors.white};
            }
        `
    }

    ${(p) =>
        (p.$tooltip || p.$variant === "discord") &&
        css`
            position: relative;

            &::before,
            &::after {
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.1s;
            }

            &:hover::before,
            &:hover::after {
                opacity: 1;
                visibility: visible;
            }

            &::after {
                content: "${p.$variant === "discord" ? "디스코드 참여하기" : p.$tooltip}";
                position: absolute;
                top: 125%;
                left: 50%;
                transform: translateX(-50%);

                white-space: nowrap;
                padding: 0.8rem 1.2rem;
                border-radius : ${({ theme }) => theme.radius.sm};
                background-color: ${({ theme }) => theme.colors.surface};
                color: ${({ theme }) => theme.colors.white};
                font-size: ${({ theme }) => theme.fontSize.caption};
                box-shadow: ${({ theme }) => theme.colors.shadow};
            }

            &::before {
                content: "";
                color: ${({ theme }) => theme.colors.surface};

                position: absolute;
                top: 115%;
                left: 50%;
                transform: translateX(-50%) rotate(45deg);

                width: 1rem;
                height: 1rem;

                background-color: ${({ theme }) => theme.colors.surface};
                border-radius: 0.25rem;
            }
        `
    }
`;

const StyledAlertDot = styled.span`
    position: absolute;
    top: 74%;
    left: 78%;
    transform: translate(-50%, -50%);

    width: 0.8rem;
    height: 0.8rem;
    background-color: ${({ theme }) => theme.colors.alert};
    border-radius: 50%;
`;

const ButtonIcon = ({
    children,
    ariaLabel,
    variant = "dark",
    hasAlert = false,
    active = false,
    onClick,
    className,
    tooltip,
}: ButtonProps) =>  {
    return (
        <StyledButtonIcon
            $variant={variant}
            $hasAlert={hasAlert}
            $tooltip={tooltip}
            aria-label={ariaLabel}
            $active={active}
            onClick={onClick}
            className={className}
        >
            {children}
            {hasAlert && <StyledAlertDot/>}
        </StyledButtonIcon>
    );
}

export default ButtonIcon;