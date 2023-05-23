import { hot } from "react-hot-loader/root";
import React, { useState } from "react";
import './main.global.css'
import { Layout } from "./shared/Layout";
import { Header } from "./shared/Header";
import { Content } from "./shared/Content";
import { Workplace } from "./shared/Workplace";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { Statistics } from "./shared/Statistics";
import redusers from "./storeRedux/redusers";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const store = configureStore({
    reducer: redusers,
})

function AppComponent() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Layout>
                    <Header />
                    <Content>
                        <Routes>
                            <Route path="/" element={<Workplace />} />
                            <Route path="/statistics" element={<Statistics />} />
                        </Routes>
                    </Content>
                </Layout>
            </BrowserRouter>
        </Provider>
    );
}

export const App = hot(AppComponent);
