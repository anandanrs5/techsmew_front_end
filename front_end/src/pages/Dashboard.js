import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { viewStudent, deleteStudent } from '../redux/slices/studentSlice';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [deleteStudentData, setDeleteStudentData] = useState("");
    const students = useSelector((state) => state.student.student);

    useEffect(() => {
        dispatch(viewStudent());
    }, [dispatch, deleteStudentData]);

    const handleDelete = (id) => {
        setDeleteStudentData(id)
        dispatch(deleteStudent(id));
    }
    const handleEdit = (id) => {
        navigate(`/editstudent/${id}`);
    }
    const moveToAddStudent = () => {
        navigate("/addstudent");
    }
    const logout = () => {
        navigate("/");
    }
    return (
        <div className="container mx-auto w-full">
            <button onClick={moveToAddStudent}
                className="bg-blue-500 relative top-12 hover:bg-blue-700 text-white text-xl font-bold py-3 px-5 rounded ">Add Student</button>
            {!students ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <div className='text-3xl text-center m-5 font-bold'>Student Data Management</div>
                    <table className="table-auto w-full">
                        <thead>
                            <tr className='bg-gray-400 text-2xl'>
                                <th className="px-4 py-5">S.No</th>
                                <th className="px-4 py-5">Student Name</th>
                                <th className="px-4 py-5">Department</th>
                                <th className="px-4 py-5">Location</th>
                                <th className="px-4 py-5">Mark</th>
                                <th className="px-4 py-5">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(students) && students.map((student, index) => (
                                <tr key={index} className='bg-gray-100 text-xl'>
                                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border px-4 py-2 text-center">{student.fullname}</td>
                                    <td className="border px-4 py-2 text-center">{student.department}</td>
                                    <td className="border px-4 py-2 text-center">{student.location}</td>
                                    <td className="border px-4 py-2 text-center">{student.mark}</td>
                                    <td className="border px-4 py-2 text-center">
                                        <button onClick={() => handleEdit(students[index]._id)}
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-1/3">Edit</button>
                                        <button onClick={() => handleDelete(students[index]._id)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2 w-1/3">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button onClick={logout} className="bg-red-500 hover:bg-red-700 mt-10 text-2xl text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Logout</button>

                </div>
            )}
        </div>
    );
}

export default Dashboard;

