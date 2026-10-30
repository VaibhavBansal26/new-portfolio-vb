import styled from 'styled-components';

export const MainLayout = styled.div`
  width: min(100%, 1440px);
  margin: 0 auto;
  padding: 44px 34px 84px;
  @media (max-width: 980px) { padding: 32px 24px 64px; }
  @media (max-width: 680px) { padding-inline: 18px; }
`;

export const InnerLayout = styled.div`padding-top: 36px;`;
export const InnerLayoutSingle = styled.div`padding-top: 36px;`;
