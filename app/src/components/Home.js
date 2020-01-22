import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Username from './Login/Username';
import Password from './Login/Password';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
    const [data, setData] = useState({
        username: '',
        password: ''
    });

    const [warn, setWarn] = useState({
        username: false,
        password: false,
    });

    const [help, setHelp] = useState({
        username: '',
        password: ''
    });

    const [step, setStep] = useState(1)

    const nextStep = () => {
        setStep(step + 1);
    }

    const prevStep = () => {
        setStep(step - 1);
    }

    const handleChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });

        if (e.target.value.length > 0) {
            setWarn({
                ...warn,
                [e.target.name]: ""
            });
            setHelp({
                ...help,
                [e.target.name]: ""
            });
        } else {
            setWarn({
                ...warn,
                [e.target.name]: true
            });
            setHelp({
                ...help,
                [e.target.name]: `${e.target.name.charAt(0).toUpperCase() +
                    e.target.name.slice(1)} field is required`
            });
        }
    };


    useEffect(() => {
        if (localStorage.getItem('token')) {
            window.location.href = "#/addressbook"
        }
    });

    const handleLogin = (e) => {
        e.preventDefault();
        axios({
            method: "post",
            url: `http://localhost:3001/api/login`,
            data: data
        })
            .then(e => {
                localStorage.setItem('token', e.data.token);
            })
            .then(() => {
                toast.success("Succesfully Logged In", {
                    position: 'top-right',
                    hideProgressBar: true,
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            })
            .then(() => window.location.href = "#/addressbook")
            .catch(() => {
                toast.error("Invalid Account!", {
                    position: 'top-right',
                    hideProgressBar: true,
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            })
    }

    const warningUpdate = e => {
        if (e.target.value.length === 0) {
            setWarn({
                ...warn,
                [e.target.name]: true
            });
            setHelp({
                ...help,
                [e.target.name]: `${e.target.name.charAt(0).toUpperCase() +
                    e.target.name.slice(1)} field is required`
            });
        } else {
            setHelp({
                ...help,
                [e.target.name]: ""
            });
        }
    };


    switch (step) {
        case 1:
            return (
                <Username
                    nextStep={nextStep}
                    handleChange={handleChange}
                    warn={warn.username}
                    help={help.user}
                    warningUpdate={warningUpdate}
                    ToastContainer={ToastContainer}
                />
            )
        case 2:
            return (
                <Password
                    nextStep={nextStep}
                    prevStep={prevStep}
                    handleChange={handleChange}
                    handleLogin={handleLogin}
                    warn={warn.password}
                    help={help.pass}
                    warningUpdate={warningUpdate}
                    ToastContainer={ToastContainer}
                />
            )
        default:
            break;
    }
}