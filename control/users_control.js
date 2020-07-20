const User_model = require("../model/users_model");


module.exports = {

    get_all: async (req, res, next) => {
        
        
        User_model
            .find()
            .then(x => {res.json(x);console.log("get all",x);})
            .catch(r => res.send(r.message))

    },

    get_one_by_id: async (req, res, next) => {
        User_model
            .findById({
                _id: req.params.id
            })
            .then(x => res.send(x))
            .catch(r => res.send(r.message))

    },

    post_one: async (req, res, next) => {
        
        new User_model({
            userName: req.body.userName,
            userMail: req.body.userMail,
            passWord: req.body.passWord,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userPhone: req.body.userPhone,
            userPost: req.body.userPost
        })
            .save()
            .then(x => res.send(x))
            .catch(r => res.send(r.message))



    },

    put_one_by_id: async (req, res, next) => {
        User_model.update(
            {
                _id: req.params.id
            },
            {
                $set:
                {
                    userName: req.body.userName,
                    userMail: req.body.userMail,
                    passWord: req.body.passWord,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    userPhone: req.body.userPhone,
                    userPost: req.body.userPost
                }
            })
            .exec()
            .then(x => res.send(x))
            .catch(r => res.send(r.message))


    },

    delete_one_by_id: async (req, res, next) => {
        User_model.findOneAndRemove(
            {
                _id: req.params.id
            })
            .exec()
            .then(x => res.send(x))
            .catch(r => res.send(r.message))


    }
}