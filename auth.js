export function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error.msg', 'Please log in to view this resource')
    res.redirect('/users/login')
}