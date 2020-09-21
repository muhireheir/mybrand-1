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
}