import styled from "styled-components";

export const Div = styled.div({
  display: "flex",
  msFlexDirection: "row",
  flexWrap: "nowarp",
  justifyContent: "center",
  paddingTop: "5%"
});

export const H3 = styled.h3({
  textAlign: "center",
  fontWeight: "700"
});

export const H4 = styled.h4({
  textAlign: "center"
});

export const Foot = styled.div({
  paddingTop: "25px"
});

export const TableSize = styled.div({
  boxSizing: "border-box",
  width: "75%",
  marginTop: "25px",
  marginRight: "15%",
  marginLeft: "15%"
});

export const TitleCont = styled.div({
  display: "flex",
  flexDirection: "row"
});

export const BtnCont = styled.div({
  display: "flex",
  flexDirection: "row",
  flexWarp: "nowarp",
  justifyContent: "flex-end"
});

export const Box = styled.div`
  display: flex;
  width: 100%;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

export const Item = styled.div`
  padding: 6px;
`;

export const Right = styled.div`
  display: flex;
  flex-warp: nowarp;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

export const List = styled.div({
  paddingLeft: "15px",
  width: "200px"
});
