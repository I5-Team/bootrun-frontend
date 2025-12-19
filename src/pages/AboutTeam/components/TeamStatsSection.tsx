import S from '../styles/TeamStatsSection.styled';

const stats = [
  { value: '800+', label: '총 커밋 수', delay: 0.1 },
  { value: '2개월', label: '개발 기간', delay: 0.2 },
  { value: '41,000+', label: '서비스 코드 라인 수', delay: 0.3 },
  { value: '1,000번+', label: '칭찬 횟수', delay: 0.4 },
];

export default function TeamStatsSection() {
  return (
    <S.StatsSection>
      <S.StatsContainer>
        <S.SectionTitle>I5 Team 프로젝트 통계</S.SectionTitle>
        <S.StatsGrid>
          {stats.map((stat) => (
            <S.StatCard
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: stat.delay }}
            >
              <S.StatValue>{stat.value}</S.StatValue>
              <S.StatLabel>{stat.label}</S.StatLabel>
            </S.StatCard>
          ))}
        </S.StatsGrid>
      </S.StatsContainer>
    </S.StatsSection>
  );
}
