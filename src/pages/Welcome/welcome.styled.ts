import styled from 'styled-components';
import img from '../../assets/img/ameba_turqueza.png';

export const StyledDiv = styled.div`
  padding: 25px;
  background-image: url(${img});
  background-repeat: repeat;
  background-size: contain;
  margin-bottom: 1em;
  width: 100%;
  height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // border: 1px solid red;

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

export const StyledP = styled.p`
  color: black;
  font-size: 1em;
  font-weight: 500;
  border: 1px solid blue;
  margin-top: 5em;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 10px;
  width: 35%;
  border-radius: 10px;
`;