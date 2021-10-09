const express = require('express');
const router = express.Router();
const users = require('../db/Connect');
const User = require("../model/Users");
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId


router.get('/', (req, res) => {
    res.send(`Hello world from the server router js`);
});


// Asyns-await
router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, } = req.body;

    if (!name || !email || !phone || !work || !password) {
        return res.status(422).json({ error: "Plz field the properly" });
    }

    try {
        const userExist = await User.findOne({ email: email })

        if (userExist) {
            return res.status(400).json({ error: "Email already Exist" })
        }

        const user = new User({ name, email, phone, work, password, });

        await user.save();

        res.status(201).json({ message: "User registered successfuly" });

    } catch (err) {
        console.log(err);
    }
});

router.get('/getusers', async (req, res) => {
    const blogs = await User.find();
    res.json(blogs);
});


//Updating Data

router.put('/update', async (req, res) => {
    const result = await User.updateOne({ _id: Object(req.body.id) }, {
        $set: {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            work: req.body.work,
        }
    });
    res.status(200).json({
        message: "Updated Successfully :)"
    })
})

// *Delete Blog by Id

router.post('/delete', async (req, res) => {
    const result = await User.deleteOne({ _id: ObjectId(req.body.id) });
    res.status(201).json({
        message: "Deleted!"
    })
})

router.get('/getuser/:id', async (req, res) => {
    const user = await User.find({ _id: ObjectId(req.params.id) });
    res.json(user);
})


module.exports = router;