import "../src/style.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";

import Dashboard from "./pages/Dashboard/Dashboard";
import DataSources from "./pages/DataSources/DataSources";
import People from "pages/People/People";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail"
import ProjectList from "./pages/ProjectList/ProjectList"

import EditReport from "./pages/EditReport/EditReport";
import ImportData from "./pages/ImportData/ImportData";
import Templates from "./pages/Templates/Templates";
import CreateReport from "./pages/CreateReport/CreateReport";
import Gallery from "./pages/Gallery/Gallery";

import Profile from "./pages/Profile/Profile";
import Setting from "./pages/Setting/Setting";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import Drawer from "./pages/Drawer/Drawer";
import Header from "pages/Header";

function App() {
    const [drawerState, setDrawerState] = useState("workspace");
    return (
        <Router>
            <div className="row">
                <Drawer state={drawerState} setDrawerState={setDrawerState} />
                <div className="col bg-light">
                    <Header/>
                    <Routes>
                        <Route path="/" exact element={<Dashboard />} >
                        </Route>
                        <Route path="/pList" element={<ProjectList/>}/>
                        <Route path="/pDetail/:id" element={<ProjectDetail/>}/>

                        <Route path="/datasources" element={<DataSources />} />
                        <Route path="/people" element={<People />} />
                        <Route path="/account/login" element={<Login />} />

                        <Route path="/account/forgetPassword" element={<ForgetPassword />} />
                        <Route path="/account/register" element={<Register />} />

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
                        <Route path="/project/templates" element={<Templates />} />

                        <Route
                            path="/project/gallery/:id"
                            exact
                            element={<EditReport isEdit={false} />}
                        />
                        <Route
                            path="/project/gallery/:id/edit"
                            element={<EditReport isEdit={true} />}
                        />

                        <Route path="/personal/profile" element={<Profile />} />
                        <Route path="/personal/setting" element={<Setting />} />

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
    );
}

export default App;
