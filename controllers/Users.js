import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User doesnot exist" })
        }
        const isPassCorrect = await bcrypt.compare(password, user.password);
        if (!isPassCorrect) {
            return res.status(404).json({ error: "Invalid Credentials" })
        }
        const token = jwt.sign({ email: user.email, id: user._id }, 'test');
        res.status(200).json({ token, result: user })
    } catch (error) {
        res.status(404).json({ error })
    }
}


export const signUp = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "User already exists" })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords should match" })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })
        const token = await jwt.sign({ email: result.email, id: result._id }, 'test');
        await res.status(200).json({ token, result })

    } catch (error) {
        res.status(404).json({ error })
    }
}
