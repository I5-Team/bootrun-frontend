import styled, { css } from "styled-components";

type Variant = "study" | "lecture";

type ProgressBarProps = {
    value: number; 
    max?: number; 
    variant?: Variant; 
};

const ProgressWrapper = styled.div<{ $variant: Variant }>`

    ${({ theme, $variant }) => css`
        ${$variant === "study" &&
        css`
            width: 100%;
            height: 1rem;
            background-color: ${theme.colors.gray100};
            border-radius: 0.2rem;
        `}
        ${$variant === "lecture" &&
        css`
            width: 100vw;
            height: 0.4rem;
            background-color: ${theme.colors.gray200};
            border-radius: 0;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
        `}
    `}
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $value: number; $max: number; $variant: Variant }>`
    width: ${({ $value, $max }) =>
    `${Math.min(100, Math.max(0, ($value / $max) * 100))}%`};
    height: 100%;
    background-color: ${({ theme }) => theme.colors.primary300};
    transition: width 0.3s;
`;

const ProgressBar: React.FC<ProgressBarProps> = ({
    value,
    max = 100,
    variant = "study",
}) => {
  return (
    <ProgressWrapper $variant={variant}>
        <ProgressFill $value={value} $max={max} $variant={variant} />
    </ProgressWrapper>
  );
};

export default ProgressBar;