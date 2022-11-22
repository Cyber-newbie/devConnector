const Profile = require('../models/Profile')

const getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        })
        if (profile) {
            res.status(200).json({
                msg: profile
            })
        } else {
            res.status(404).json({
                msg: 'profile not found'
            })
        }
    } catch (error) {
        res.json({
            error
        })
    }


}

const userProfile = async (req, res) => {
    try {
        req.body.id = req.user.id
        const profile = await Profile.findOne({
            user: req.body.id
        })
        if (profile) {
            const uptProfile = await Profile.findOneAndUpdate({
                user: req.body.id
            }, {
                $set: req.body
            }, {
                new: true
            })

            res.status(201).json({
                msg: 'profile updated',
                uptProfile
            })
        }

        //create profile
        const newProfile = new Profile(req.body)
        const createdProfile = await newProfile.save()
        res.status(201).json({
            createdProfile
        })
    } catch (error) {
        if (error.name === "ValidationError") {
            let errors = {};

            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            if (errors.skills) errors.skills = 'please enter your skills'
            return res.status(400).json(errors);
        }
        res.status(500).json({
            msg: "Something went wrong"
        });
    }
}

module.exports = {
    getProfile,
    userProfile
}