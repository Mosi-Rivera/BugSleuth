const User = require('../models/user_model');

exports.get_by_id = async (req,res) => {
    try
    {
        let id = Number.parseInt(req.params.user_id);
        if (id === NaN)
            throw new Error('Invalid Id.');
        res.status(200).json(User.get_match({id}));
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
}