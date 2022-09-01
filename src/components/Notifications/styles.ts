import styled from 'styled-components';

export const BadgeContainer = styled.button`
  background: none;
  border: none;

  svg {
    width: 24px;
    height: 24px;

    color: #aaa;
  }

  &:hover {
    svg {
      color: #666;
    }
  }
`;
