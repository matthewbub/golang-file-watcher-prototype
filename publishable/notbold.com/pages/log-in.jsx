import { useState } from "react"
import Navigation from "../components/navigation";
import Wrapper from "../components/wrapper";

export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (res.ok) {
      window.location.href = '/'
    }

    const { error } = await res.json()
    alert(error);
  }

  return (
    <Wrapper>
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
          <h2>Not Bold</h2>
          <Navigation />
        </div>
          <p>Log in</p>
          
          <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', width: '300px'}}>
            <input type="text" placeholder="Email" onChange={(ev) => setEmail(ev.target.value)} />
            <input type="password" placeholder="Password" onChange={(ev) => setPassword(ev.target.value)} />
            <button>Log in</button>
          </form>
      </div>
    </Wrapper>
  )
}