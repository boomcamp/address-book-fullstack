import styled from "styled-components";

export const Div = styled.div({
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  paddingTop: "5%"
});

export const H3 = styled.h3({
  textAlign: "center",
  fontWeight: "700"
});

export const Foot = styled.div({
  paddingTop: "25px"
});

export const TableSize = styled.div({
  width: "75%",
  float: "right",
  marginTop: "25px",
  marginRight: "100px",
  marginLeft: "40px"
});

// export const Cont = styled.div({
//   display: "flex",
//   flexDirection: "row"
// });

export const TitleCont = styled.div({
  display: "flex",
  flexDirection: "row"
});

export const Boxbtn = styled.div({
  marginLeft: "15px",
  marginRight: "15px"
});

export const Box = styled.div`
  display: flex;
  width: 100%;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

export const Item = styled.div({
  padding: "6px"
});
