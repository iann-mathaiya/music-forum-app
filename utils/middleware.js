

//READ ALL ROWS IN THE POSTS TABLE
async function readPosts(){
    let { data: Posts, error } = await supabase
  .from('Posts')
  .select('*')

  console.log(error)
}

export { readPosts }