import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addStudent } from "../redux/slices/studentSlice";
import { useNavigate } from "react-router-dom";

const fullnameRegex = /^(?!\s)(?!.*\s$)(?=.*[a-zA-Z])[\w\s]+$/

const addStudentSchema = Yup.object().shape({
    fullname: Yup.string().required("fullname is required")
        .matches(fullnameRegex, `
        Empty space,dot and symbols are not allowed before or after name `),
    department: Yup.string().required("department is required"),
    mark: Yup.string().required("mark is required"),
    location: Yup.string().required("location is required")
});

const AddStudent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const api_errors = useSelector((state) => state.user.error);
    const loading = useSelector((state) => state.user.loading);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(addStudentSchema) });
    const onSubmit = async (data) => {
        const response = await dispatch(addStudent(data));
        if (response) {
            navigate("/dashboard");
        }

    };
    const back = () => {
        navigate("/dashboard");
    }
    return (
        <div>
            <div className="flex justify-center items-center h-screen bg-green-400">
                <form className="bg-white rounded-3xl px-10 pt-6 pb-8 py-10 mb-4" onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="text-4xl font-bold mb-10 text-center"> Add Student</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Student Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                              placeholder:text-gray-300 sm:text-2xl"
                            id="fullname"
                            type="text"
                            {...register("fullname")}
                            placeholder="Enter your name"
                        />
                        {errors.fullname &&
                            <p className="text-xl text-red-400 mt-2">{errors.fullname.message}</p>
                        }
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Department
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3
                             text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                             placeholder:text-gray-300 sm:text-2xl"
                            id="department"
                            placeholder="abc@example.com"
                            type="text"
                            {...register("department")}
                        />
                        {errors.department &&
                            <p className="text-xl text-red-400 mt-2">{errors.department.message}</p>
                        }
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Location
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3
                             text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                             placeholder:text-gray-300 sm:text-2xl"
                            id="location"
                            placeholder="Enter location"
                            type="text"
                            {...register("location")}
                        />
                        {errors.location &&
                            <p className="text-xl text-red-400 mt-2">{errors.location.message}</p>
                        }
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                            Mark
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3
                             text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                             placeholder:text-gray-300 sm:text-2xl"
                            id="location"
                            type="number"
                            {...register("mark")}
                            placeholder="Enter Mark"
                        />

                        {errors.mark &&
                            <p className="text-xl text-red-400 mt-2">{errors.mark.message}</p>
                        }
                    </div>
                    <div className="flex items-center justify-between mt-8">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {loading ? "Submitting..." : "Add"}
                        </button>
                        <a href="#" className="inline-block align-baseline font-bold text-xl text-blue-500 hover:text-blue-800" onClick={back}>
                            back
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStudent;


