import { Request, Response, RequestHandler } from 'express';
import User from '../models/auth.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Buscar usuario en la base de datos
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Credenciales inválidas" });
      return;
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Credenciales inválidas" });
      return;
    }

    // Generar token JWT
    const token = jwt.sign({ id: user._id, plan: user.plan }, process.env.JWT_SECRET || "41314", { expiresIn: "1h" });

    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, plan: user.plan } });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

export const register: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { name, email, password, plan } = req.body;

    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "El usuario ya existe" });
      return;
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario
    const newUser = new User({ name, email, password: hashedPassword, plan });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id, plan: plan }, process.env.JWT_SECRET || "1231424", { expiresIn: "1h" });

    res.status(201).json({ message: "Usuario registrado con éxito", token: token });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};