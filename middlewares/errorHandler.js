// not Found

export const notFound=(req,res,next)=>{
    const error=new Error(`Not Found: ${req.originalUrl}`)
    res.status(404);
    next(error);
}

export const errorHandler=(req,res,next)=>{
    const statusCode=res.statusCode()==200 ? 500 : res.statusCode;
    res.status(statusCode).json( {
        message:err?.message,
        stack:err?.stack
        })
}
