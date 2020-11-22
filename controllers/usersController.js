
// future imports include data from models folder

// @des     Gets the homepage view
// @route   GET /
const getHomepage = (req,res) => {
    res.render('index',{});
    res.end();
}

const getLogin = (req,res) => {
    res.render('login',{});
    res.end();
}

const getRegister = (req,res) => {
    res.render('register',{});
    res.end();
}


module.exports = {
    getHomepage,
    getLogin,
    getRegister
}