import type { Developer } from '../../../types/AboutTeamType';
import S from '../styles/TeamThumbnailList.styled';

interface TeamThumbnailListProps {
  developers: Developer[];
  currentIndex: number;
  onSelectMember: (index: number) => void;
}

export default function TeamThumbnailList({
  developers,
  currentIndex,
  onSelectMember,
}: TeamThumbnailListProps) {
  return (
    <>
      <S.ScrollHint>스와이프하여 다른 개발자 보기 →</S.ScrollHint>
      <S.ThumbnailList>
        {developers.map((dev, index) => (
          <S.Thumbnail
            key={dev.id}
            $isActive={index === currentIndex}
            onClick={() => onSelectMember(index)}
          >
            <S.ThumbnailInfo>
              <S.ThumbnailName>{dev.name}</S.ThumbnailName>
              <S.ThumbnailRole $isActive={index === currentIndex}>{dev.role}</S.ThumbnailRole>
            </S.ThumbnailInfo>
          </S.Thumbnail>
        ))}
      </S.ThumbnailList>
    </>
  );
}
