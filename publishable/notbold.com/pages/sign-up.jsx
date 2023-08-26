import { useState } from "react"
import { paths } from "../constants"
import Navigation from "../components/navigation"
import Wrapper from "../components/wrapper";

export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirmPassword] = useState('')

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (password !== confirm) {
      alert('Passwords do not match')
      return
    }

    const res = await fetch(paths['api.auth.signup'], {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, confirm })
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
          <p>Sign up</p>
          
          <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', width: '300px'}}>
            <input 
              type="text" 
              placeholder="Email" 
              onChange={(ev) => setEmail(ev.target.value)} 
              name="email"
            />
            <input 
              type="password" 
              placeholder="Password" 
              onChange={(ev) => setPassword(ev.target.value)} 
              name="password"
            />
            <input 
              type="password" 
              placeholder="Confirm Password" 
              onChange={(ev) => setConfirmPassword(ev.target.value)} 
              name="confirm"
            />
            <button style={{width: 'fit-content'}}>Log in</button>
          </form>
      </div>
    </Wrapper>
  )
}