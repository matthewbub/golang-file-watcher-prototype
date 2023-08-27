import Navigation from "../components/navigation";
import Wrapper from "../components/wrapper";

export default function Page() {
  return (
    <Wrapper>
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
          <h2>Not Bold</h2>
          <p>About</p>
          <Navigation />
        </div>
      </div>
    </Wrapper>
  )
}