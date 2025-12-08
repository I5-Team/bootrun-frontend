import { Heading1 } from '../Typography';
import * as S from './EmptyState.styled';

export type EmptyStateProps = {
  icon: React.ReactNode;
  title?: string;
  subTitle?: string;
  description?: string;
  buttons?: React.ReactNode;
  className?: string;
  iconAnimation?: 'success' | 'error' | 'default';
};

export default function EmptyState({
  icon,
  title,
  subTitle, 
  description,
  buttons,
  className,
  iconAnimation = 'default'
}: EmptyStateProps) {
  return (
    <S.Container className={className}>
      <S.Content role="status">
        <S.IconWrapper $animation={iconAnimation}>{icon}</S.IconWrapper>

        <S.TextGroup>
          {title && <Heading1>{title}</Heading1>}
          {subTitle && <S.SubTitle>{subTitle}</S.SubTitle>}
          {description && <S.Description>{description}</S.Description>}
        </S.TextGroup>

        {buttons && <S.ButtonGroup>{buttons}</S.ButtonGroup>}
      </S.Content>
    </S.Container>
  );
}
