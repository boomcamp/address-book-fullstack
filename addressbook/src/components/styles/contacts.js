import styled from "styled-components";

export const Div = styled.div`
  width: 100%;
`;
export const Box = styled.span`
  display: flex;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;
