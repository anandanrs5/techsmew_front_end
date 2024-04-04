import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from '../authentication/Signup';
import Login from '../authentication/Login';
import Dashboard from '../pages/Dashboard';
import AddStudent from '../component/AddStudent';
import EditStudentData from '../component/EditStudentData';

const Router = () => {
    return (
        <div>
            <Routes>
                <Route path={"/signup"} element={<Signup />} />
                <Route path={"/"} element={<Login />} />
                <Route path={"/dashboard"} element={<Dashboard />} />
                <Route path={"/addstudent"} element={<AddStudent />} />
                <Route path={"/editstudent/:id"} element={<EditStudentData />} />
            </Routes>
        </div>
    )
}

export default Router