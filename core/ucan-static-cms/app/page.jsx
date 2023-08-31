import fs from 'fs'

export default function Page() {
  async function create(formData) {
    'use server'
 
    // console.log(formData)

    const data = formData.get('title')
    console.log(data, fs)
    // mutate data
    // revalidate cache
  }
  return (
    <div>
      <form action={create}>
        <input type="text" name="title"/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}