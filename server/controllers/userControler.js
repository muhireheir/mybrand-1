import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
export default class usersController {
    static async createUser(req, res) {
            try {
                const userExists = await User.findOne({ email: req.body.email });
                if (userExists) {
                    res.status(409).json({ error: "Email used" });
                } else {
                    const hash = await bcrypt.hash(req.body.password, 10);
                    if (hash) {
                        const NewUser = new User({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            password: hash,
                        });
                        const resp = await NewUser.save();
                        const token = jwt.sign({
                                email: resp.email,
                                adminRole: resp.adminRole,
                                _id: resp._id,
                            },
                            process.env.JWT_KEY, { expiresIn: "1h" }
                        );
                        res.status(201).json({ message: "registered!", token: token });
                    }
                }
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
        // login
    static async login(req, res) {
        try {
            const user = await User.findOne({ email: req.body.email }).exec()
            if (user) {
                const result = await bcrypt.compare(req.body.password, user.password)
                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        adminRole: user.adminRole,
                        _id: user._id
                    }, process.env.JWT_KEY, { expiresIn: "1h" })
                    res.status(200).json({ message: "loggedIn!", adminRole: user.adminRole, token: token })
                    console.log(result)
                } else {
                    res.status(401).json({ error: 'Invalid cridential' })
                }

            } else {
                res.status(401).json({ error: 'Invalid cridential' })
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }

    }
}