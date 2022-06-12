const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/dashboard');
        return;
    } else {
        next()
    }
}

module.exports = withAuth