# 디자인 시스템 변경 사항 가이드

이 문서는 최근 프로젝트에 적용된 디자인 시스템 변경 사항, 새로운 컴포넌트 사용법, 그리고 리팩토링된 내용을 정리합니다.

## 1. 테마 (Theme) 및 스타일

`src/styles/theme.ts`에 정의된 테마 토큰을 사용하여 일관된 디자인을 유지합니다.

### 주요 변경 사항
- **Colors**: `colors` 객체에 색상 팔레트가 정의되었습니다. (예: `gray[100]`, `primary[500]`)
- **Typography**: `typography` 객체에 폰트 크기(`fontSize`), 굵기(`fontWeight`), 줄 간격(`lineHeight`) 등이 정의되었습니다.
- **Spacing**: `spacing` 객체에 간격 토큰이 정의되었습니다. (예: `spacing[16]` = `1rem`)
- **Breakpoints**: 반응형 디자인을 위한 `breakpoints`가 정의되었습니다.

### 사용 예시
```typescript
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[100]};
  padding: ${({ theme }) => theme.spacing[24]};
  
  ${({ theme }) => theme.media.tablet} {
    padding: ${({ theme }) => theme.spacing[16]};
  }
`;
```

## 2. 기본 컴포넌트 (Primitives)

디자인 시스템의 기초가 되는 컴포넌트들입니다.

### Box (`src/components/Box.tsx`)
레이아웃을 구성하기 위한 범용 컨테이너입니다. 마진, 패딩, 배경색 등을 props로 제어할 수 있습니다.

- **Props**: `m`, `mt`, `mb`, `p`, `pt`, `pb`, `bg`, `display`, `flexDirection`, `alignItems`, `justifyContent` 등
- **사용법**:
  ```tsx
  <Box mt={24} p={16} bg="white">
    Content
  </Box>
  ```

### Typography (`src/components/Typography.tsx`)
텍스트 스타일을 일관되게 적용하기 위한 컴포넌트입니다.

- **Props**: `variant` (h1~h6, body1~body2), `weight` (bold, medium, regular), `color`
- **사용법**:
  ```tsx
  <Typography variant="h2" weight="bold" color="gray.900">
    Title
  </Typography>
  ```

## 3. 컴포넌트 리팩토링

기존 컴포넌트들이 디자인 시스템 토큰과 Primitive 컴포넌트를 사용하도록 리팩토링되었습니다.

### 주요 변경 패턴
1. **하드코딩된 값 제거**: 픽셀 값 대신 `theme.spacing`, `theme.colors` 사용.
2. **Box 컴포넌트 활용**: `div` 대신 `Box`를 사용하여 레이아웃 구성.
3. **Typography 컴포넌트 활용**: `p`, `span`, `h1` 등 대신 `Typography` 사용하여 폰트 스타일 통일.

### 예시: Button 컴포넌트
- `variant` props를 통해 `primary`, `secondary`, `outline` 등 스타일 분기.
- `size` props를 통해 버튼 크기 조절.

## 4. 파일별 수정 사항 요약

각 파일에는 수정된 내용에 대한 한글 주석이 추가되어 있습니다.

- **`src/styles/globalStyle.ts`**: CSS Reset 및 기본 폰트 설정.
- **`src/components/*`**: 각 컴포넌트별 디자인 시스템 적용 내용.
- **`src/pages/*`**: 페이지 레이아웃에 `Box`, `Typography` 적용.
