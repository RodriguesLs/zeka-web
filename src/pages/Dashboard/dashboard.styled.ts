import styled from 'styled-components';

export const StyledH1 = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

export const StyledDiv = styled.div`
  padding: 25px;
  background-color: white;
  margin-bottom: 1em;
  border-radius: 10px;
  width: 100%;
  display: flex;
  justify-content: space-beetwen;
  height: 20vh;
  h1 {
    font-size: 24px;
  }

  h2 {
    font-size: 16px;
  }
`;

export const StyledTitle = styled.div`
  display: flex;
  justify-content: space-between;
  b {
    font-size: 16px;
  }
`;

export const SummaryDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 100%;
  margin: 10px;
  font-size: 1em;
  font-weight: bold;
  background-color: #9FC5E8;
  color: #000;
  padding: 10px;
  text-align: center;
  p {
    font-size: 40px;
  }
`;

export const MainDiv = styled.div`
  width: 80vw;
`;

export const StyledTableGrid = styled.div`
  margin-top: 2em;

  h1 {
    font-size: 1.2em;
    font-weight: bold;
    padding: 1em 0;
  }
`;
