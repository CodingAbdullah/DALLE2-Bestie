const UserPicture = require("../model/UserPicture");

exports.fetchMyPictures = (req, res) => {
    const { email } = JSON.parse(req.body.body);

    UserPicture.find( { email }, (err, docs) => {
        if (err) {
            res.status(400).json({
                message: "No User affilated searches found"
            });
        }
        else {
            res.status(200).json({
                message: "Pictures pertaining to the User found",
                docs
            });
        }
    });
}

exports.insertPicture = (req, res) => {
    const { email, search } = JSON.parse(req.body.body);
    let newUserPicture = new UserPicture({ email: email, search: search});

    newUserPicture.save()
    .then(() => {
        res.status(201).json({
            message: "Picture saved to database"
        });
    })
    .catch(() => {
        res.status(400).json({
            message: "Picture could not be saved to database"
        });
    })
}