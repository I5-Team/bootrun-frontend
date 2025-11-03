import styled, { css } from "styled-components";

type ButtonVariant = 'dark' | 'light' | 'discord';

type ButtonProps = {
    children: React.ReactNode;
    ariaLabel: string;
    variant?: ButtonVariant;
    hasAlert?: boolean;
    onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
};

const StyledButtonIcon = styled.button<{
    $variant?: ButtonVariant;
    $hasAlert: boolean;
}>`
    width: auto;
    border-radius: ${({ theme }) => theme.radius.md};
    padding: 0.7rem;
    aspect-ratio: 1 / 1;
    position: relative;

    svg {
            width: 2.4rem;
            height: 2.4rem;
            vertical-align: bottom;
            transition: fill 0.1s;
        }

    &:hover {
        cursor: pointer;
        
        ${(p) => 
            p.$variant !== "discord" &&
            css`
                background-color: ${({ theme }) => theme.colors.primary100};
                svg path {
                    fill: ${({ theme }) => theme.colors.primary300}
                }
            `
        }
    }

    ${(p) => 
        p.$variant === "dark" &&
        css`
            svg path {
                fill: ${({ theme }) => theme.colors.gray400};
            }
        `
    }

    ${(p) => 
        p.$variant === "light" &&
        css`
            svg path {
                fill: ${({ theme }) => theme.colors.gray300};
            }
        `
    }

    ${(p) => 
        p.$variant === "discord" &&
        css`
            position: relative;
            background-color: ${({ theme }) => theme.colors.gray400};
            svg path {
                fill: ${({ theme }) => theme.colors.white};
            }

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
                content: "디스코드 참여하기";
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

const ButtonIcon:React.FC<ButtonProps> = ({
    children,
    ariaLabel,
    variant = "dark",
    hasAlert = false,
    onClick,
}: ButtonProps) =>  {
    return (
        <StyledButtonIcon
            $variant={variant}            
            $hasAlert={hasAlert}
            aria-label={ariaLabel}     
            onClick={onClick}
        >
            {children}
            {hasAlert && <StyledAlertDot/>}
        </StyledButtonIcon>
    );
}

export default ButtonIcon;