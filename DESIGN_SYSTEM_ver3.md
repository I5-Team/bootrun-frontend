# Design System

## 1. 테마 (Theme) 및 스타일

디자인 시스템 테마 가이드입니다.  
아래는 `theme.ts`를 기준으로 한 기본 팔레트, 폰트, 간격, 브레이크포인트 정의입니다.


### Colors

| Name        | Hex       |
|------------|-----------|
| primary100  | #FFEAE6   |
| primary200  | #FFBAA4   |
| primary300  | #FF5B3B   |
| primaryDark | #E94525   |
| sub         | #FF9971   |
| gray100     | #F2F4F9   |
| gray200     | #DCE1E6   |
| gray300     | #7E848C   |
| gray400     | #303546   |
| surface     | #11181C   |
| white       | #FFFFFF   |
| alert       | #FF3440   |
| focus       | #8B38FF   |

---

### Breakpoints

| Device   | Max-width |
|----------|-----------|
| desktop  | 1190px    |
| laptop   | 992px     |
| tablet   | 768px     |
| mobile   | 478px     |

---

### Devices (Media Queries)

| Device   | Query |
|----------|-------|
| desktop  | screen and (max-width: 1190px) |
| laptop   | screen and (max-width: 992px)  |
| tablet   | screen and (max-width: 768px)  |
| mobile   | screen and (max-width: 478px)  |

---

### Border Radius

| Size | Value |
|------|-------|
| xs   | 0.6rem|
| sm   | 0.8rem|
| md   | 1rem  |
| lg   | 1.2rem|
| xl   | 1.6rem|
| xxl  | 2rem  |

---

### Font Sizes

| Name        | Size |
|------------|------|
| headingXl  | 4rem |
| headingLg  | 3.2rem |
| headingMd  | 2.4rem |
| xl         | 2rem |
| lg         | 1.8rem |
| md         | 1.6rem |
| sm         | 1.4rem |
| caption    | 1.2rem |

---

### Line Height

| Name   | Value |
|--------|-------|
| tight  | 1.2   |
| normal | 1.5   |
| loose  | 1.8   |

---

### Font Weight

| Name    | Value |
|---------|-------|
| regular | 400   |
| medium  | 500   |
| bold    | 700   |

---

### Spacing

| Key | Value |
|-----|-------|
| 0   | 0     |
| 2   | 0.2rem|
| 4   | 0.4rem|
| 6   | 0.6rem|
| 8   | 0.8rem|
| 10  | 1.0rem|
| 12  | 1.2rem|
| 14  | 1.4rem|
| 16  | 1.6rem|
| 20  | 2.0rem|
| 24  | 2.4rem|
| 32  | 3.2rem|
| 40  | 4.0rem|
| 48  | 4.8rem|
| 64  | 6.4rem|
| 80  | 8.0rem|
| 96  | 9.6rem|

---

### Z-Index - ver3 수정함, 2025.12.17

| Name            | Value |
|-----------------|-------|
| base            | 0     |
| above           | 10    |
| dropdown        | 50    |
| header          | 100   |
| sticky          | 300   |
| fixed           | 310   |
| sidebar         | 400   |
| tooltip         | 600   |
| toast           | 700   |
| backdrop        | 1000  |
| modal           | 1010  |
| confirmBackdrop | 1100 |
| confirmModal    | 1110 |



---

### Shadows

| Size | CSS |
|------|-----|
| sm   | 0 1px 2px 0 rgba(0, 0, 0, 0.05) |
| md   | 0 4px 20px 0 rgba(0, 0, 0, 0.04) |
| lg   | 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) |
| xl   | 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) |


## 2. 컴포넌트

### Typography
설명

#### Heading1~4 
설명:

props

  | 속성      | 타입 (기본값)      | 설명            |
  |----------|-----------------|----------------|
  | prop1    | 타입             | 설명            |
  | prop2    | 타입             | 설명            |

사용 예시: 


### Button
설명:

props

  | 속성      | 타입 (기본값)      | 설명            |
  |----------|-----------------|----------------|
  | prop1    | 타입             | 설명            |
  | prop2    | 타입             | 설명            |

사용 예시: 

### IconButton
설명:

props

  | 속성      | 타입 (기본값)      | 설명            |
  |----------|-----------------|----------------|
  | prop1    | 타입             | 설명            |
  | prop2    | 타입             | 설명            |

사용 예시: 

### Tag
설명:

props

  | 속성      | 타입 (기본값)      | 설명            |
  |----------|-----------------|----------------|
  | prop1    | 타입             | 설명            |
  | prop2    | 타입             | 설명            |

사용 예시: 

### Profile
설명:

props

  | 속성      | 타입 (기본값)      | 설명            |
  |----------|-----------------|----------------|
  | prop1    | 타입             | 설명            |
  | prop2    | 타입             | 설명            |

사용 예시: 

### ProgressBar
설명:

props

  | 속성      | 타입 (기본값)      | 설명            |
  |----------|-----------------|----------------|
  | prop1    | 타입             | 설명            |
  | prop2    | 타입             | 설명            |

사용 예시: 

### HelperComponents
설명

#### LoadingSpinner
설명:

props

  | 속성      | 타입 (기본값)      | 설명            |
  |----------|-----------------|----------------|
  | prop1    | 타입             | 설명            |
  | prop2    | 타입             | 설명            |

사용 예시: 

#### ErrorMessage
설명:

props

  | 속성      | 타입 (기본값)      | 설명            |
  |----------|-----------------|----------------|
  | prop1    | 타입             | 설명            |
  | prop2    | 타입             | 설명            |

사용 예시: 

### Skeleton
설명:

props

  | 속성      | 타입 (기본값)      | 설명            |
  |----------|-----------------|----------------|
  | prop1    | 타입             | 설명            |
  | prop2    | 타입             | 설명            |

사용 예시: 

### EmptyState
설명:

props

  | 속성      | 타입 (기본값)      | 설명            |
  |----------|-----------------|----------------|
  | prop1    | 타입             | 설명            |
  | prop2    | 타입             | 설명            |

사용 예시: 

### Modal
설명:

props

  | 속성      | 타입 (기본값)      | 설명            |
  |----------|-----------------|----------------|
  | prop1    | 타입             | 설명            |
  | prop2    | 타입             | 설명            |

사용 예시: 

### SearchForm
설명:

props

  | 속성      | 타입 (기본값)      | 설명            |
  |----------|-----------------|----------------|
  | prop1    | 타입             | 설명            |
  | prop2    | 타입             | 설명            |

사용 예시: 

### FilterForm
설명:

props

  | 속성      | 타입 (기본값)      | 설명            |
  |----------|-----------------|----------------|
  | prop1    | 타입             | 설명            |
  | prop2    | 타입             | 설명            |

사용 예시: 


### CourseCard
설명:

props

  | 속성      | 타입 (기본값)      | 설명            |
  |----------|-----------------|----------------|
  | prop1    | 타입             | 설명            |
  | prop2    | 타입             | 설명            |

사용 예시: 

### Pagination


### Input