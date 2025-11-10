import * as S from './EmptyState.styled';

export type EmptyStateProps = {
  icon: React.ReactNode;
  title: string;
  description?: string;
  buttons?: React.ReactNode;
  className?: string;
  iconAnimation?: 'success' | 'error' | 'default';
};

export default function EmptyState({
  icon,
  title,
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
          <S.Title>{title}</S.Title>
          {description && <S.Description>{description}</S.Description>}
        </S.TextGroup>

        {buttons && <S.ButtonGroup>{buttons}</S.ButtonGroup>}
      </S.Content>
    </S.Container>
  );
}
