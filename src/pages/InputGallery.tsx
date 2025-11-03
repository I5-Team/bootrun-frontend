import React, { useState } from 'react';
import styled from 'styled-components';
import { InputLogin } from '../components/InputLogin';
import { InputProfile } from '../components/InputProfile';

const Container = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.surface};
  margin-bottom: 4rem;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.xxl};
  }
`;

const Section = styled.section`
  margin-bottom: 6rem;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.surface};
  margin-bottom: 2.4rem;
  padding-bottom: 1.2rem;
  border-bottom: 0.2rem solid ${({ theme }) => theme.colors.gray200};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.xl};
  }
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.gray400};
  margin-bottom: 2rem;
  line-height: 1.6;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.sm};
  }
`;

const ExampleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 3rem;

  @media ${({ theme }) => theme.devices.mobile} {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ExampleCard = styled.div`
  padding: 2.4rem;
  background-color: ${({ theme }) => theme.colors.white};
  border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.colors.shadow};
`;

const ExampleTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.surface};
  margin-bottom: 1.6rem;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
  }
`;

const ExampleDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.caption};
  color: ${({ theme }) => theme.colors.gray300};
  margin-bottom: 1.2rem;
  line-height: 1.5;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.caption};
  }
`;

const CodeBlock = styled.pre`
  background-color: ${({ theme }) => theme.colors.gray100};
  padding: 1.2rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.surface};
  overflow-x: auto;
  margin-bottom: 1.6rem;
  font-family: 'Monaco', 'Courier New', monospace;

  code {
    font-family: inherit;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const InputGallery: React.FC = () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('example@email.com');
  const [value4, setValue4] = useState('');
  const [value5, setValue5] = useState('');

  // InputProfile 상태
  const [profileName, setProfileName] = useState('');
  const [profileGender, setProfileGender] = useState('');
  const [profileBirthdate, setProfileBirthdate] = useState('');
  const [profileEmail, setProfileEmail] = useState('paul-lab@naver.com');
  const [profileJob, setProfileJob] = useState('');
  const [profileErrorName, setProfileErrorName] = useState('');

  return (
    <Container>
      <Title>Input Components Gallery</Title>

      <Section>
        <SectionTitle>1. 기본 Input 상태</SectionTitle>
        <Description>
          Input 컴포넌트의 기본 상태입니다. 클릭하지 않은 상태에서는 흰색 배경과 회색 하단
          보더(gray200)를 가집니다.
        </Description>
        <ExampleGrid>
          <ExampleCard>
            <ExampleTitle>비어있는 Input (기본 상태)</ExampleTitle>
            <ExampleDescription>
              배경: white (#FFFFFF)
              <br />
              보더: gray200 (#D9DBE0)
            </ExampleDescription>
            <CodeBlock>
              <code>{`<InputLogin
  placeholder="텍스트를 입력하세요"
/>`}</code>
            </CodeBlock>
            <InputContainer>
              <InputLogin placeholder="텍스트를 입력하세요" />
            </InputContainer>
          </ExampleCard>

          <ExampleCard>
            <ExampleTitle>Full Width Input</ExampleTitle>
            <ExampleDescription>부모 요소의 전체 너비를 사용합니다.</ExampleDescription>
            <CodeBlock>
              <code>{`<InputLogin
  placeholder="Full width input"
  fullWidth
/>`}</code>
            </CodeBlock>
            <InputContainer>
              <InputLogin placeholder="Full width input" fullWidth />
            </InputContainer>
          </ExampleCard>
        </ExampleGrid>
      </Section>

      <Section>
        <SectionTitle>2. 포커스 및 입력 상태</SectionTitle>
        <Description>
          Input에 포커스되거나 값이 입력되면 배경색이 gray100으로 변경되고, 포커스 시 하단 보더가
          primary300 (파란색)으로 변경됩니다.
        </Description>
        <ExampleGrid>
          <ExampleCard>
            <ExampleTitle>입력된 값이 있는 Input</ExampleTitle>
            <ExampleDescription>
              배경: gray100 (#F3F5FA)
              <br />
              보더: 포커스 시 primary300 (#2E6FF2), 포커스 해제 시 gray200
            </ExampleDescription>
            <CodeBlock>
              <code>{`<InputLogin
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="값을 입력해보세요"
/>`}</code>
            </CodeBlock>
            <InputContainer>
              <InputLogin
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                placeholder="값을 입력해보세요"
                fullWidth
              />
            </InputContainer>
          </ExampleCard>

          <ExampleCard>
            <ExampleTitle>기본값이 있는 Input</ExampleTitle>
            <ExampleDescription>초기 값이 설정된 상태입니다.</ExampleDescription>
            <CodeBlock>
              <code>{`<InputLogin
  defaultValue="12345"
  placeholder="기본값 예시"
/>`}</code>
            </CodeBlock>
            <InputContainer>
              <InputLogin defaultValue="12345" placeholder="기본값 예시" fullWidth />
            </InputContainer>
          </ExampleCard>
        </ExampleGrid>
      </Section>

      <Section>
        <SectionTitle>3. 다양한 Input 타입</SectionTitle>
        <Description>다양한 type 속성을 사용하여 여러 종류의 입력을 받을 수 있습니다.</Description>
        <ExampleGrid>
          <ExampleCard>
            <ExampleTitle>이메일 Input</ExampleTitle>
            <ExampleDescription>type="email"을 사용한 이메일 입력 필드입니다.</ExampleDescription>
            <CodeBlock>
              <code>{`<InputLogin
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="email@example.com"
/>`}</code>
            </CodeBlock>
            <InputContainer>
              <InputLogin
                type="email"
                value={value3}
                onChange={(e) => setValue3(e.target.value)}
                placeholder="email@example.com"
                fullWidth
              />
            </InputContainer>
          </ExampleCard>

          <ExampleCard>
            <ExampleTitle>비밀번호 Input</ExampleTitle>
            <ExampleDescription>
              type="password"를 사용한 비밀번호 입력 필드입니다.
            </ExampleDescription>
            <CodeBlock>
              <code>{`<InputLogin
  type="password"
  placeholder="비밀번호를 입력하세요"
/>`}</code>
            </CodeBlock>
            <InputContainer>
              <InputLogin type="password" placeholder="비밀번호를 입력하세요" fullWidth />
            </InputContainer>
          </ExampleCard>

          <ExampleCard>
            <ExampleTitle>숫자 Input</ExampleTitle>
            <ExampleDescription>type="number"를 사용한 숫자 입력 필드입니다.</ExampleDescription>
            <CodeBlock>
              <code>{`<InputLogin
  type="number"
  placeholder="숫자를 입력하세요"
/>`}</code>
            </CodeBlock>
            <InputContainer>
              <InputLogin type="number" placeholder="숫자를 입력하세요" fullWidth />
            </InputContainer>
          </ExampleCard>

          <ExampleCard>
            <ExampleTitle>전화번호 Input</ExampleTitle>
            <ExampleDescription>type="tel"을 사용한 전화번호 입력 필드입니다.</ExampleDescription>
            <CodeBlock>
              <code>{`<InputLogin
  type="tel"
  placeholder="010-0000-0000"
/>`}</code>
            </CodeBlock>
            <InputContainer>
              <InputLogin type="tel" placeholder="010-0000-0000" fullWidth />
            </InputContainer>
          </ExampleCard>
        </ExampleGrid>
      </Section>

      <Section>
        <SectionTitle>4. 에러 상태</SectionTitle>
        <Description>
          에러 상태에서는 하단 보더가 alert 컬러(빨간색)로 변경되며, 에러 메시지를 표시할 수
          있습니다.
        </Description>
        <ExampleGrid>
          <ExampleCard>
            <ExampleTitle>에러 상태 (boolean)</ExampleTitle>
            <ExampleDescription>error prop을 true로 설정한 상태입니다.</ExampleDescription>
            <CodeBlock>
              <code>{`<InputLogin
  error={true}
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="이메일을 입력하세요"
/>`}</code>
            </CodeBlock>
            <InputContainer>
              <InputLogin
                error={true}
                value={value4}
                onChange={(e) => setValue4(e.target.value)}
                placeholder="이메일을 입력하세요"
                fullWidth
              />
            </InputContainer>
          </ExampleCard>

          <ExampleCard>
            <ExampleTitle>에러 메시지 포함</ExampleTitle>
            <ExampleDescription>
              error prop에 문자열을 전달하여 에러 메시지를 표시합니다.
            </ExampleDescription>
            <CodeBlock>
              <code>{`<InputLogin
  error="올바른 이메일 형식이 아닙니다"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="이메일을 입력하세요"
/>`}</code>
            </CodeBlock>
            <InputContainer>
              <InputLogin
                error="올바른 이메일 형식이 아닙니다"
                value={value5}
                onChange={(e) => setValue5(e.target.value)}
                placeholder="이메일을 입력하세요"
                fullWidth
              />
            </InputContainer>
          </ExampleCard>
        </ExampleGrid>
      </Section>

      <Section>
        <SectionTitle>5. 비활성화 상태</SectionTitle>
        <Description>
          disabled 상태에서는 배경색이 gray100으로 변경되고, 텍스트 색상이 gray300으로 변경되며,
          사용자 입력이 불가능합니다.
        </Description>
        <ExampleGrid>
          <ExampleCard>
            <ExampleTitle>비활성화된 Input</ExampleTitle>
            <ExampleDescription>
              배경: gray100 (#F3F5FA)
              <br />
              텍스트: gray300 (#8D9299)
              <br />
              커서: not-allowed
            </ExampleDescription>
            <CodeBlock>
              <code>{`<InputLogin
  disabled
  placeholder="비활성화된 Input"
/>`}</code>
            </CodeBlock>
            <InputContainer>
              <InputLogin disabled placeholder="비활성화된 Input" fullWidth />
            </InputContainer>
          </ExampleCard>

          <ExampleCard>
            <ExampleTitle>값이 있는 비활성화 Input</ExampleTitle>
            <ExampleDescription>값이 있는 상태에서 비활성화된 Input입니다.</ExampleDescription>
            <CodeBlock>
              <code>{`<InputLogin
  disabled
  defaultValue="수정할 수 없는 값"
/>`}</code>
            </CodeBlock>
            <InputContainer>
              <InputLogin disabled defaultValue="수정할 수 없는 값" fullWidth />
            </InputContainer>
          </ExampleCard>
        </ExampleGrid>
      </Section>

      <Section>
        <SectionTitle>6. 실제 사용 예시 (InputLogin)</SectionTitle>
        <Description>실제 로그인 폼에서 사용되는 예시입니다.</Description>
        <ExampleGrid>
          <ExampleCard>
            <ExampleTitle>로그인 폼 예시</ExampleTitle>
            <ExampleDescription>
              이메일과 비밀번호 입력 필드를 포함한 로그인 폼입니다.
            </ExampleDescription>
            <CodeBlock>
              <code>{`const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

<InputLogin
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="이메일"
  fullWidth
/>
<InputLogin
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="비밀번호"
  fullWidth
/>`}</code>
            </CodeBlock>
            <InputContainer>
              <InputLogin
                type="email"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                placeholder="이메일"
                fullWidth
              />
              <InputLogin type="password" placeholder="비밀번호" fullWidth />
            </InputContainer>
          </ExampleCard>
        </ExampleGrid>
      </Section>

      <Section>
        <SectionTitle>7. InputProfile - 기본 사용</SectionTitle>
        <Description>
          InputProfile은 프로필 입력 화면을 위한 컴포넌트입니다. 레이블이 포함되어 있으며, 전체
          테두리가 있는 박스형 디자인입니다.
        </Description>
        <ExampleGrid>
          <ExampleCard>
            <ExampleTitle>텍스트 입력 (이름)</ExampleTitle>
            <ExampleDescription>
              type="text"를 사용한 기본 텍스트 입력 필드입니다.
              <br />
              레이블이 포함되어 있습니다.
            </ExampleDescription>
            <CodeBlock>
              <code>{`<InputProfile
  label="이름"
  type="text"
  placeholder="이름을 입력하세요"
  value={name}
  onChange={setName}
/>`}</code>
            </CodeBlock>
            <InputContainer>
              <InputProfile
                label="이름"
                type="text"
                placeholder="이름을 입력하세요"
                value={profileName}
                onChange={setProfileName}
              />
            </InputContainer>
          </ExampleCard>

          <ExampleCard>
            <ExampleTitle>읽기 전용 (이메일)</ExampleTitle>
            <ExampleDescription>
              readOnly prop을 사용하여 수정 불가능한 필드를 만듭니다.
              <br />
              배경: gray100 (#F3F5FA)
            </ExampleDescription>
            <CodeBlock>
              <code>{`<InputProfile
  label="이메일"
  type="text"
  value="paul-lab@naver.com"
  readOnly
/>`}</code>
            </CodeBlock>
            <InputContainer>
              <InputProfile
                label="이메일"
                type="text"
                value={profileEmail}
                onChange={setProfileEmail}
                readOnly
              />
            </InputContainer>
          </ExampleCard>
        </ExampleGrid>
      </Section>

      <Section>
        <SectionTitle>8. InputProfile - 드롭다운 선택</SectionTitle>
        <Description>
          type="select"를 사용하여 드롭다운 메뉴를 만들 수 있습니다. 옵션을 클릭하면 값이
          선택됩니다.
        </Description>
        <ExampleGrid>
          <ExampleCard>
            <ExampleTitle>성별 선택</ExampleTitle>
            <ExampleDescription>
              options prop에 배열을 전달하여 선택 가능한 옵션을 설정합니다.
              <br />
              선택된 항목은 primary100 배경색으로 표시됩니다.
            </ExampleDescription>
            <CodeBlock>
              <code>{`<InputProfile
  label="성별"
  type="select"
  placeholder="선택"
  options={['남성', '여성', '기타']}
  value={gender}
  onChange={setGender}
/>`}</code>
            </CodeBlock>
            <InputContainer>
              <InputProfile
                label="성별"
                type="select"
                placeholder="선택"
                options={['남성', '여성', '기타']}
                value={profileGender}
                onChange={setProfileGender}
              />
            </InputContainer>
          </ExampleCard>

          <ExampleCard>
            <ExampleTitle>직업 선택</ExampleTitle>
            <ExampleDescription>다양한 옵션을 가진 드롭다운 예시입니다.</ExampleDescription>
            <CodeBlock>
              <code>{`<InputProfile
  label="직업"
  type="select"
  placeholder="직업을 선택하세요"
  options={['개발자', '디자이너', '기획자', '마케터', '학생', '기타']}
  value={job}
  onChange={setJob}
/>`}</code>
            </CodeBlock>
            <InputContainer>
              <InputProfile
                label="직업"
                type="select"
                placeholder="직업을 선택하세요"
                options={['개발자', '디자이너', '기획자', '마케터', '학생', '기타']}
                value={profileJob}
                onChange={setProfileJob}
              />
            </InputContainer>
          </ExampleCard>
        </ExampleGrid>
      </Section>

      <Section>
        <SectionTitle>9. InputProfile - 날짜 선택</SectionTitle>
        <Description>type="date"를 사용하여 날짜 입력 필드를 만들 수 있습니다.</Description>
        <ExampleGrid>
          <ExampleCard>
            <ExampleTitle>생년월일 선택</ExampleTitle>
            <ExampleDescription>날짜 선택 필드에는 달력 아이콘이 표시됩니다.</ExampleDescription>
            <CodeBlock>
              <code>{`<InputProfile
  label="생년월일"
  type="date"
  placeholder="----년 --월 --일"
  value={birthdate}
  onChange={setBirthdate}
/>`}</code>
            </CodeBlock>
            <InputContainer>
              <InputProfile
                label="생년월일"
                type="date"
                placeholder="----년 --월 --일"
                value={profileBirthdate}
                onChange={setProfileBirthdate}
              />
            </InputContainer>
          </ExampleCard>
        </ExampleGrid>
      </Section>

      <Section>
        <SectionTitle>10. InputProfile - 에러 상태</SectionTitle>
        <Description>
          InputLogin과 마찬가지로 에러 상태를 표시할 수 있습니다. 테두리가 빨간색으로 변경되고 에러
          메시지를 표시합니다.
        </Description>
        <ExampleGrid>
          <ExampleCard>
            <ExampleTitle>에러 메시지 포함</ExampleTitle>
            <ExampleDescription>
              error prop에 문자열을 전달하여 에러 메시지를 표시합니다.
            </ExampleDescription>
            <CodeBlock>
              <code>{`<InputProfile
  label="이름"
  type="text"
  placeholder="이름을 입력하세요"
  value={name}
  onChange={setName}
  error="이름은 2글자 이상이어야 합니다"
/>`}</code>
            </CodeBlock>
            <InputContainer>
              <InputProfile
                label="이름"
                type="text"
                placeholder="이름을 입력하세요"
                value={profileErrorName}
                onChange={setProfileErrorName}
                error="이름은 2글자 이상이어야 합니다"
              />
            </InputContainer>
          </ExampleCard>

          <ExampleCard>
            <ExampleTitle>비활성화 상태</ExampleTitle>
            <ExampleDescription>
              disabled prop을 사용하여 비활성화 상태를 만듭니다.
            </ExampleDescription>
            <CodeBlock>
              <code>{`<InputProfile
  label="직업"
  type="select"
  placeholder="직업을 선택하세요"
  options={['개발자', '디자이너']}
  disabled
/>`}</code>
            </CodeBlock>
            <InputContainer>
              <InputProfile
                label="직업"
                type="select"
                placeholder="직업을 선택하세요"
                options={['개발자', '디자이너']}
                disabled
              />
            </InputContainer>
          </ExampleCard>
        </ExampleGrid>
      </Section>

      <Section>
        <SectionTitle>11. 실제 사용 예시 (프로필 폼)</SectionTitle>
        <Description>실제 프로필 입력 폼에서 사용되는 예시입니다.</Description>
        <ExampleGrid>
          <ExampleCard>
            <ExampleTitle>프로필 입력 폼</ExampleTitle>
            <ExampleDescription>
              다양한 InputProfile 컴포넌트를 조합한 프로필 입력 폼입니다.
            </ExampleDescription>
            <CodeBlock>
              <code>{`// 읽기 전용 이메일
<InputProfile
  label="이메일"
  type="text"
  value="paul-lab@naver.com"
  readOnly
/>

// 텍스트 입력
<InputProfile
  label="이름"
  type="text"
  placeholder="이름을 입력하세요"
  value={name}
  onChange={setName}
/>

// 날짜 선택
<InputProfile
  label="생년월일"
  type="date"
  placeholder="----년 --월 --일"
  value={birthdate}
  onChange={setBirthdate}
/>

// 드롭다운 선택
<InputProfile
  label="성별"
  type="select"
  placeholder="선택"
  options={['남성', '여성', '기타']}
  value={gender}
  onChange={setGender}
/>`}</code>
            </CodeBlock>
            <InputContainer>
              <InputProfile
                label="이메일"
                type="text"
                value="paul-lab@naver.com"
                readOnly
                fullWidth
              />
              <InputProfile
                label="이름"
                type="text"
                placeholder="이름을 입력하세요"
                value={profileName}
                onChange={setProfileName}
                fullWidth
              />
              <InputProfile
                label="생년월일"
                type="date"
                placeholder="----년 --월 --일"
                value={profileBirthdate}
                onChange={setProfileBirthdate}
                fullWidth
              />
              <InputProfile
                label="성별"
                type="select"
                placeholder="선택"
                options={['남성', '여성', '기타']}
                value={profileGender}
                onChange={setProfileGender}
                fullWidth
              />
            </InputContainer>
          </ExampleCard>
        </ExampleGrid>
      </Section>
    </Container>
  );
};

export default InputGallery;
