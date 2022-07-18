import jwt from 'jsonwebtoken';

const authorization = async (req, res, next) => {
    const token = req.body.token;
    if (token){
        jwt.verify(token, process.env.KEY, (err, decoded) => {
            if(err){
                res.status(401).send()
            } else {
                console.log(decoded)
                next();
            }
        })
    } else res.status(401).send()
};

export default authorization