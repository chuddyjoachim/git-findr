const sendQuery = require('./utils/sendquery')
const {GET_REPO} = require('./utils/query/repoquery')

exports.handler = async (event) => {
    const {loginUser} = JSON.parse(event.body);
    console.log(loginUser);

    try {
        const res = await sendQuery(GET_REPO(loginUser));
        console.log(res);
        if(res.user.name && res.user.login){
            return{
                statusCode: 200,
                body: JSON.stringify({data: res})
            }
        }
        return{
            statusCode: 500,
            body: JSON.stringify({error: "something occured"})
        }
        
    } catch (err) {
        // console.log("err :"+ err);
        return{
            statusCode: 500,
            body: JSON.stringify({error: "something occured"})
        }
    }
}