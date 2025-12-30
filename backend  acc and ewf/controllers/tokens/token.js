import jwt from 'jsonwebtoken'


export const createAccessToken =  (user) =>  {
    return jwt.sign(
    {id:user._id},
    process.env.SECRET_ACCESS,
    {expiresIn:'30m'}
   )
};
 
export const createRefreshToken =  (user) =>  {
    return jwt.sign(
    {id:user._id,role:user.role},
    process.env.SECRET_REFRESH,
    {expiresIn:'1d'}
)
} 