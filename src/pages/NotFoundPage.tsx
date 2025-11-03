import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Header,
  LogoWrapper,
  LogoImage,
  ContentWrapper,
  ImageWrapper,
  ErrorImage,
  TextAndButtonWrapper,
  TextWrapper,
  Title,
  Description,
  ButtonWrapper,
} from './NotFoundPage.styled';
import Button from '../components/Button';
import logoTypo from '../assets/logos/logo-typo.svg';
import errorImage from '../assets/images/bg-404.png';

export default function NotFoundPage() {
  const navigate = useNavigate();

  // 페이지 진입 시 문서 제목 동기화
  useEffect(() => {
    const previousTitle = document.title;
    document.title = '페이지를 찾을 수 없습니다 - Bootrun';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  //메인으로 이동
  const handleGoHome = () => {
    navigate('/');
  };

  //이전 페이지 이동
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Header>
        <LogoWrapper>
          <Link to="/" aria-label="부트런 홈으로 이동">
            <LogoImage src={logoTypo} alt="bootrun" />
          </Link>
        </LogoWrapper>
      </Header>

      <ContentWrapper role="main" id="main-content" tabIndex={-1} aria-labelledby="not-found-title">
        <ImageWrapper>
          <ErrorImage src={errorImage} alt="" role="presentation" aria-hidden="true" />
        </ImageWrapper>

        <TextAndButtonWrapper>
          <TextWrapper>
            <Title id="not-found-title">페이지를 찾을 수 없습니다.</Title>
            <Description>
              앗, 이 페이지는 없는 것 같아요. 주소를 다시 확인하거나 메인 페이지로 돌아가주세요.
            </Description>
          </TextWrapper>

          <ButtonWrapper>
            <Button variant="primary" size="md" onClick={handleGoHome}>
              메인으로
            </Button>
            <Button variant="outline" size="md" onClick={handleGoBack}>
              이전 페이지
            </Button>
          </ButtonWrapper>
        </TextAndButtonWrapper>
      </ContentWrapper>
    </Container>
  );
}
