import logo from "../../assets/logo.png";
import styled from 'styled-components'

const Span = styled.span`
  position: absolute;
  top: 20px;
  left: 20px;
`;
const Image = styled.img`
  height: 4vh;
`;

export default function Logo() {
  return (
    <Span>
      <Image src={logo}/>
    </Span>
  );
}
