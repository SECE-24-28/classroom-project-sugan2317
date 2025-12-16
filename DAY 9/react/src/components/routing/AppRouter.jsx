import {BrowserRouter as Router, Routes, Route,Link} from 'react-router-dom';

import Login from "../login/Login";

import Todo from "../todo/Todo";

import Users from "../users/Users";

export default function AppRouter() {
    return (
        <Router>
            <nav className ="p-4 bg-gray-200 flex gap-6 text-lg font-semibold">
                <Link to="/">Login</Link>
                <Link to="/todo">Todo</Link>
                <Link to="/users">Users</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/todo" element={<Todo/>}/>
                <Route path="/users" element={<Users/>}/>
            </Routes>
        </Router>
    );
}