import styled from 'styled-components';

const ProgressBar = ({ progress }) => {
  const ParentDiv = styled.div`
    height: 30px;
    width: 100%;
    background-color: #e5dcdc;
    margin: 5px 0;
    box-sizing: border-box;
  `;

  const Childiv = styled.div`
    height: 100%;
    width: ${progress}%;
    background-color: yellow;
    border-radius: 0 40px 40px 0;
    position: relative;
  `;

  const StyledSpan = styled.span`
    position: absolute;
    padding: 5px;
    color: black;
    font-weight: 900;
    left: ${40}%;
  `;

  return (
    <>
      <ParentDiv>
        <Childiv>
          <StyledSpan>{`${progress}%`}</StyledSpan>
        </Childiv>
      </ParentDiv>
    </>
  );
}

export default ProgressBar;
