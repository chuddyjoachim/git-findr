const GET_REPO = ($name)=>{
  return  `
query{
    user(login: "${$name}") {
      avatarUrl
      name
      login
      bio
      repositories(first: 20, privacy: PUBLIC) {
        nodes {
          name
          stargazerCount
          url
          updatedAt
          forkCount
          description
          primaryLanguage {
            color
            name
          }
        }
        totalCount
      }
    }
  }`
};
module.exports = {
    GET_REPO,
}