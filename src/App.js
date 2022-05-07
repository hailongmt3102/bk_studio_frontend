import "../src/style.scss";
import "@fontsource/mulish";
import "@fontsource/roboto";
import "../src/App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import DataSources from "./pages/DataSources/DataSources";
import People from "pages/People/People";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail"
import ProjectList from "./pages/ProjectList/ProjectList"
import ChangePassword from "pages/ChangePassword/ChangePassword";
import ImportData from "./pages/ImportData/ImportData";
import Templates from "./pages/Templates/Templates";
import CreateReport from "./pages/CreateReport/CreateReport";
import Gallery from "./pages/Gallery/Gallery";
import Profile from "./pages/Profile/Profile";
import Setting from "./pages/Setting/Setting";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import Drawer from "./pages/Drawer/Drawer";
import Header from "pages/Header";
import DataSourceContent from "pages/DatasourceContent/DataSourceContent"
import UpdatePassword from "pages/UpdatePassword/UpdatePassword";
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import LocalizedStrings from 'react-localization';
import { data } from './utils/localizationData'
import AdjustingReport from "pages/AdjustingReport/AdjustingReport";
import ML from "pages/MachineLearning/ML";

import CreateANewModel from "pages/MachineLearning/CreateANewModel/CreateANewModel";
import ModelDetail from "pages/MachineLearning/ModelDetail/ModelDetail";
import TestModel from "pages/MachineLearning/TestModel/TestModel";
import PredictData from "pages/MachineLearning/PredictData/PredictData";
import ReviewTestData from "pages/MachineLearning/ReviewTestData";
const translations = new LocalizedStrings(data);
const localizationContext = React.createContext(translations);

function App() {
    const [drawerState, setDrawerState] = useState("workspace");

    const languageSaved = localStorage.getItem('language') ?? 'English'
    const [language, setLanguage] = useState(languageSaved)
    translations.setLanguage(language);

    const languageHandler = (value) => {
        if (['English', 'Vietnamese'].includes(value)) {
            translations.setLanguage(language);
            setLanguage(value)
            localStorage.setItem('language', value)
        }
    }

    return (
        <localizationContext.Provider value={translations}>
            <Router>
                <ReactNotifications />
                <Drawer state={drawerState} setDrawerState={setDrawerState} />
                <div className="bg-light">
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
                        <Route path="/machinelearning/modelDetail" element={<ModelDetail />} />
                        <Route path="/machinelearning/testModel" element={<TestModel />} />
                        <Route path="/machinelearning/predict" element={<PredictData />} />
                        <Route path="/machinelearning/reviewTestData" element={<ReviewTestData />} />
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
                        <Route path="/personal/setting" element={<Setting setLanguage={languageHandler} />} />

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
            </Router>
        </localizationContext.Provider>
    );
}

export default App;

export {
    localizationContext
}
