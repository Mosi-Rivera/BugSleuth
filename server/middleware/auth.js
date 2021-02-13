exports.is_logged_in = function(req,res,next)
{
    if (req.isAuthenticated && req.user)
        return next();
    res.status(401).send('Unauthorized.');
}