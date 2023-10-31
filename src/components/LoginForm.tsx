import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../thunks/userThunks';
import { AppDispatch } from '../store';
import { RootState } from '../reducers';

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch: AppDispatch = useDispatch();

    // Extract relevant data from Redux store
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const error = useSelector((state: RootState) => state.user.error);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginUser(username, password));
    };

    return (
        <div>
            {isLoggedIn ? (
                <p>Welcome! You are logged in.</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            )}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default LoginForm;
