/**
 * 자료 탭 - 강의 자료 다운로드 페이지 안내
 */
import * as S from './styles/MaterialsTab.styled';

export default function MaterialsTab() {
  const handleNavigateToMaterials = () => {
    console.log('자료 페이지로 이동');
    // TODO: 자료 페이지로 라우팅
  };

  return (
    <S.Container>
      <S.ContentWrapper>
        <S.InfoBanner>
          <S.InfoIcon>📁</S.InfoIcon>
          <S.InfoText>강의 자료를 확인하고 다운로드할 수 있습니다.</S.InfoText>
        </S.InfoBanner>
        <S.Description>
          강의에서 제공하는 PDF, 이미지, 예제 코드 등의 자료를 확인할 수 있습니다.
        </S.Description>
      </S.ContentWrapper>
      <S.NavigateButton onClick={handleNavigateToMaterials} aria-label="자료 페이지로 이동">
        자료 페이지로 이동
        <S.Arrow>→</S.Arrow>
      </S.NavigateButton>
    </S.Container>
  );
}
