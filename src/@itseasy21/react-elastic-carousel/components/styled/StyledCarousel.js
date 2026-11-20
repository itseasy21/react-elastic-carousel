import styled from "../../utils/styled";

export default styled.div.attrs(props => ({
  style: {
    height: props.size?.height
  }
}))`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
