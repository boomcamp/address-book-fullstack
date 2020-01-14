import styled from "styled-components";

export const Div = styled.div`
  padding-top: 218px;
  @media screen and (max-width: 600px) {
    padding: 15px;
  }
`;
export const LoginCont = styled.div`
  width: 405px;
  background: white;
  display: flex;
  flex-direction: column;
  text-align: center;
  border-radius: 8px;
  padding: 30px 20px 50px 20px;
  border: 1px solid #dadce0;
  @media screen and (max-width: 600px) {
    border: none;
    width: 100%;
    padding: 0;
  }
`;
export const marginBot = {
  margin: "4px 0 6px 0"
};

export const ContTitle = styled.div`
  font-size: 23px;
  margin: 20px 0 5px 0;
`;
export const Button = styled.button`
  text-align: center;
  border-radius: 4px;
  padding: 10px 30px 10px 30px;
  background: #1a73e8;
  font-size: 15px;
  color: white;
  border: none;
  margin: 5px 0 5px 0;
  font-weight: bold;
  @media screen and (max-width: 600px) {
    padding: 7px 15px 7px 15px;
  }
`;

export const Text = styled.div`
  padding: 5px 0 30px 0;
`;

export const blue = {
  color: "#1a73e8"
};
export const Box = styled.div`
  padding: 15px 3px 0 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 15px;
    font-weight: bold;
  }
`;
export const decoration = {
  textDecoration: "none",
  color: "#1a73e8"
};
