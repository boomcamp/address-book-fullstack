import styled from "styled-components";

export const Div = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 206px;
  @media screen and (max-width: 600px) {
    padding: 15px;
  }
`;

export const RegisterCont = styled.div`
  width: 405px;
  background: white;
  display: flex;
  flex-direction: column;
  text-align: center;
  border-radius: 8px;
  padding: 45px 30px 50px 30px;
  border: 1px solid #dadce0;
  @media screen and (max-width: 600px) {
    border: none;
    width: 100%;
    padding: 0;
  }
`;

export const Title = styled.div`
  font-size: 20px;
  text-align: left;
  padding: 0 0 15px 0;
`;

export const Name = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
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
  :disabled {
    background: gray;
    color: whitesmoke;
  }
`;

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
