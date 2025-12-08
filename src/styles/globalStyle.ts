import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

// 전역 스타일 및 CSS Reset 설정
export const GlobalStyle = createGlobalStyle`
  ${reset}

  html {
    font-size: 10px;
  }
  
  body {
    font-size: ${({ theme }) => theme.fontSize.md};
    line-height: ${({ theme }) => theme.lineHeight.normal};
    color: ${({ theme }) => theme.colors.surface};
  }
  

  html, body, #root {
    width: 100%;
    height: 100%;
  }

  button, input, a {
    all: unset;
    box-sizing: border-box;

    &:hover {
      cursor: pointer;
    }
  }

  button, 
  a, 
  input[type="checkbox"],
  input[type="radio"],
  select,
  option {
    &:focus-visible {
      outline-offset: 0.1rem;
      outline: 0.2rem solid ${({ theme }) => theme.colors.focus};
    }
  }

  select {
    &:focus-visible {
      outline: 0.2rem solid ${({ theme }) => theme.colors.primary300};
    }
  }

  body {
    font-family: 'Pretendard', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
    color: ${({ theme }) => theme.colors.surface};
    background: ${({ theme }) => theme.colors.white};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  /*  */
  .sr-only {
    position: absolute;
    overflow: hidden;   
    left: -9999px;
    top: auto;
    width: 1px;
    height: 1px;
  }
`;
