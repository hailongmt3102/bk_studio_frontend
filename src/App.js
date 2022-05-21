import "@fontsource/mulish";
import "@fontsource/roboto";
import AdjustingReport from "pages/AdjustingReport/AdjustingReport";
import ChangePassword from "pages/ChangePassword/ChangePassword";
import DataSourceContent from "pages/DatasourceContent/DataSourceContent";
import Header from "pages/Header";
import ML from "pages/MachineLearning/ML";
import People from "pages/People/People";
import UpdatePassword from "pages/UpdatePassword/UpdatePassword";
import React, { useEffect, useState } from "react";
import LocalizedStrings from 'react-localization';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../src/App.css";
import "../src/style.scss";
import CreateReport from "./pages/CreateReport/CreateReport";
import Dashboard from "./pages/Dashboard/Dashboard";
import DataSources from "./pages/DataSources/DataSources";
import Drawer from "./pages/Drawer/Drawer";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import Gallery from "./pages/Gallery/Gallery";
import ImportData from "./pages/ImportData/ImportData";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail";
import ProjectList from "./pages/ProjectList/ProjectList";
import Register from "./pages/Register/Register";
import Setting from "./pages/Setting/Setting";
import Templates from "./pages/Templates/Templates";
import Admin from './pages/Admin/Admin'

import { data } from './utils/localizationData';

import CreateANewModel from "pages/MachineLearning/CreateANewModel/CreateANewModel";
import ModelDetail from "pages/MachineLearning/ModelDetail/ModelDetail";
import PredictData from "pages/MachineLearning/PredictData/PredictData";
import TestModel from "pages/MachineLearning/TestModel/TestModel";
import Loading from "components/Loading/Loading";
import EditModel from "pages/MachineLearning/EditModel/EditModel";
import socketIOClient from "socket.io-client";
const translations = new LocalizedStrings(data);
const localizationContext = React.createContext(translations);
const loadingContext = React.createContext();
const themeContext = React.createContext(false);
const socketContext = React.createContext(null);

function App() {
    const [drawerState, setDrawerState] = useState("workspace");

    const languageSaved = localStorage.getItem('language') || 'English'
    const [language, setLanguage] = useState(languageSaved)
    translations.setLanguage(language);

    const languageHandler = (value) => {
        if (['English', 'Vietnamese'].includes(value)) {
            translations.setLanguage(language);
            setLanguage(value)
            localStorage.setItem('language', value)
        }
    }

    const [isLoading, setIsLoading] = useState(false)
    // localStorage.setItem('lightTheme', false)
    // const themeSaved = localStorage.getItem('lightTheme') || true
    const [lightMode, setLightMode] = useState(localStorage.getItem('lightTheme') === "true" ? true : false)

    // const [lightMode, setLightMode] =  useState(false)

    // init socket client
    const [socket, setSocket] = useState(null)

    // online status
    const [onlineStatus, setOnlineStatus] = useState({})

    useEffect(() => {
        const socket = socketIOClient.connect(process.env.REACT_APP_BASE_URL || "http://localhost:3000")
        setSocket(socket)
    }, [])

    useEffect(() => {
        if (socket) {
            socket.emit("verify", localStorage.getItem("email"))
            socket.on("status", (data) => {
                setOnlineStatus({ ...onlineStatus, [data.Email]: { Status: data.Status, Time: data.Time } })
                console.log(data)
            })
            socket.on("statusAll", (users) => {
                let newUsers = {}
                for (let i = 0; i < users.length; i++) {
                    newUsers[users[i].Email] = {Status : users[i].Status, Time:  users[i].Time}
                }
                setOnlineStatus({...onlineStatus, ...newUsers})
            })
        }
    }, [localStorage.getItem("email"), socket])

    return (
        <localizationContext.Provider value={translations}>
            <loadingContext.Provider value={setIsLoading}>
                <themeContext.Provider value={lightMode}>
                    <socketContext.Provider value={{ socket: socket, onlineStatus: onlineStatus }}>
                        <Router>
                            <div className={lightMode ? "full-height" : "full-height darkmode"}>
                                {isLoading && <Loading />}
                                <ReactNotifications />
                                <Drawer state={drawerState} setDrawerState={setDrawerState} />
                                <div className="custombackground">
                                    <Header />
                                    <Routes>
                                        <Route path="/" exact element={<Dashboard />} >
                                        </Route>
                                        <Route path="/pList" element={<ProjectList />} />
                                        <Route path="/pDetail/:id" element={<ProjectDetail />} />

                                        <Route path="/datasources"
                                            element={<DataSources />} />
                                        <Route
                                            path="/datasources/:id"
                                            element={<DataSourceContent />}
                                        />

                                        <Route path="/people" element={<People />} />
                                        <Route path="/account/login" element={<Login />} />

                                        <Route path="/account/forgetPassword" element={<ForgetPassword />} />
                                        <Route path="/account/register" element={<Register />} />
                                        <Route path="/account/changePassword" element={<ChangePassword />} />
                                        <Route path="/account/updatePassword" element={<UpdatePassword />} />

                                        <Route
                                            path="/project/create"
                                            element={<CreateReport />}
                                        />
                                        <Route path="/project/import" element={<ImportData />} />
                                        <Route
                                            path="/project/gallery"
                                            exact
                                            element={<Gallery />}
                                        />
                                        <Route path="/templates" element={<Templates />} />
                                        <Route path="/machinelearning" element={<ML />} />
                                        <Route path="/machinelearning/createModel" element={<CreateANewModel />} />
                                        <Route path="/machinelearning/modelDetail/:id" element={<ModelDetail />} />
                                        <Route path="/machinelearning/modelDetail/:id/edit" element={<EditModel />} />
                                        <Route path="/machinelearning/testModel" element={<TestModel />} />
                                        <Route path="/machinelearning/predict" element={<PredictData />} />
                                        <Route
                                            path="/project/gallery/:id/edit"
                                            exact
                                            element={<AdjustingReport />}
                                        />
                                        <Route
                                            path="/project/gallery/:id/view"
                                            exact
                                            element={<AdjustingReport />}
                                        />

                                        <Route path="/personal/profile" element={<Profile />} />
                                        <Route path="/personal/setting" element={<Setting setLanguage={languageHandler} setLightMode={setLightMode} lightMode={lightMode} />} />

                                        <Route
                                            path="/admin"
                                            element={<Admin/>}
                                        />
                                        <Route
                                            path="*"
                                            element={
                                                <div className="m-4">
                                                    <h1>404 not found</h1>
                                                    <p>Please check the correct link when browsing</p>
                                                </div>
                                            }
                                        />

                                     
                                    </Routes>
                                </div>
                            </div>
                        </Router>
                    </socketContext.Provider>
                </themeContext.Provider>
            </loadingContext.Provider>
        </localizationContext.Provider>
    );
}

export default App;

export {
    localizationContext,
    loadingContext,
    socketContext
};

