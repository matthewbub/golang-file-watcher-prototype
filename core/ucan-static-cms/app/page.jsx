import fs from 'fs'

export default function Page() {
  async function create(formData) {
    'use server'
 
    // console.log(formData)

    const data = formData.get('title')


    // console.log(data, __dirname)
    const stream = fs.createWriteStream(__dirname + '/data.txt', {flags:'a'})

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