export default function Page() {
  async function addItem(data: FormData) {
    'use server'
    const email = data.get('email');
    const password = data.get('password');

    console.log(email, password);


  }

  return (
    <div>
      <h1>Login</h1>
      <form action={addItem} method="post" style={{ display: "flex", flexDirection: 'column', width: '250px' }}>
        <label>
          Email
          <input name="email" type="email" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button type="submit">Login</button>
      </form>

    </div>

  )
}