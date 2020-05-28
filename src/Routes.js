import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/SignUp";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";

export default function Routes() {
    return (
        <div style={{width: "70vw", height: "94vh", background: "hsl(0, 0%, 97%)"}}>
            <Switch>
                <AuthenticatedRoute exact path="/">
                    <Home />
                </AuthenticatedRoute>
                <UnauthenticatedRoute exact path="/login">
                    <Login />
                </UnauthenticatedRoute>
                <UnauthenticatedRoute exact path="/signup">
                    <Signup />
                </UnauthenticatedRoute>
                <NotFound />
            </Switch>
        </div>

    );
}