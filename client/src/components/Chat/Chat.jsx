import { Container } from "@mui/system";
import Sidebar from "../Chat/Sidebar/Sidebar";

export default function Chat({ id, users }) {
  return (
    <Container>
      <Sidebar />
      <p>Host Chat</p>
    </Container>
  );
}

const Container = styled.div``;
