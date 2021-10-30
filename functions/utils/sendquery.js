const { default: axios } = require("axios");
require('dotenv/config')

module.exports = async (query, variables) => {
    const { data:{data, errors} } = await axios({
        url: 'https://api.github.com/graphql',
        responseType: "json",
        method: 'POST',
        headers:{
          // "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GITHUB_AUTH_TOKEN}`
        },
        data:{
            query,
            variables
        }
    })
    if(errors){
        console.log(errors);
        return errors
        // throw new Error('something went wrong')
    }
    return data
}