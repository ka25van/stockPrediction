import axios from "axios";
import {useState} from "react";

export default function Register(){const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            const response = await axios.post("http://localhost:5000/register", {
                email,
                password,
            });
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}
