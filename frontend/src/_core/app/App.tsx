import React, { useEffect, useState, lazy } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { Box, styled } from '@mui/material';
import Layout from "../../_common/component/Layout";
import Footer from "../../_common/component/Footer";
import Profile from '../../business/pages/profile';
import Articles from '../../business/pages/articles/Articles';
import EditProfile from "../../business/pages/editProfile";
import HomeAdmin from '../../business/pages/adminSettings';
import { getCrypto } from "../_store/services/crypto/slice";
import { useAppDispatch, useAppSelector } from "../_store/store";


const Home = lazy(() => import('../../business/pages/home'));

function App() {
    const location = useLocation();
    const appDispatch = useAppDispatch();
    const { cryptoData } = useAppSelector((state) => state.crypto);
    const { userInfo } = useAppSelector((state) => state.user);
    const [data, setData] = useState([]);

    useEffect(() => {
        appDispatch(getCrypto());
    }, []);

    useEffect(() => {
        if (cryptoData) {
            setData(cryptoData);
        }
    });

    return (
        <BoxStyled>
            <Layout>
                <Routes>
                    <Route path={ '/' } element={
                        // @ts-ignore
                        userInfo && userInfo.roles[1] === 'admin'
                            ? <HomeAdmin />
                            : <Home data={ data } />
                    } />
                    <Route path={ '/profile' } element={ <Profile /> } />
                    <Route path={ '/edit-profile' } element={ <EditProfile /> } />
                    <Route path={ '/articles' } element={ <Articles /> } />
                </Routes>
            </Layout>
            { location.pathname === '/' ? <Footer /> : null }
        </BoxStyled>
    );
}

const BoxStyled = styled(Box)(() => ({
    background: 'linear-gradient(rgb(243 248 255) 0%, rgba(248, 250, 253, 0) 413px)',
}));

export default App;
