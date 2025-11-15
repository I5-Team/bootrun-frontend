import styled, { css } from "styled-components";

type Variant = "enrollment" | "lecture";

type ProgressBarProps = {
    value: number; 
    max?: number; 
    variant?: Variant; 
};

export const StyledProgressWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    span {
    color: ${({ theme }) => theme.colors.gray400};
    }
`

const ProgressWrapper = styled.div<{ $variant: Variant }>`
    ${({ theme, $variant }) => css`
        ${$variant === "enrollment" &&
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
    $max > 0
        ? `${Math.min(100, Math.max(0, ($value / $max) * 100))}%`
        : '0%'
    };
    
    height: 100%;
    background-color: ${({ theme }) => theme.colors.primary300};
    transition: width 0.3s;
`;

const ProgressBar: React.FC<ProgressBarProps> = ({
    value,
    max = 100,
    variant = "enrollment",
}) => {
    
  const formatPercent = (percent: number) => {
    return Math.round(percent * 100);
  }

  return (
    <StyledProgressWrapper>
        <ProgressWrapper $variant={variant}>
            <ProgressFill $value={value} $max={max} $variant={variant} />
        </ProgressWrapper>

        {variant === 'enrollment' &&
            <span>{value}/{max}강 ({isNaN(value/max) ? 0 : formatPercent(value/max)}%)</span>
        }
    </StyledProgressWrapper>
  );
};

export default ProgressBar;