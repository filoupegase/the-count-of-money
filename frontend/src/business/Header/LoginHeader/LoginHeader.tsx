import React, { useState } from 'react';
import { Box, DialogContent, Divider, Tabs, Tab, Typography, styled, Alert } from "@mui/material";
import Button from "../../../_common/component/Button";
import DialogLayout from "../../../_common/component/Dialog/DialogLayout";
import DialogActions from "../../../_common/component/Dialog/DialogActions";
import LoginForm from "../../Dialog/LogInForm";
import { useAppSelector } from "../../../_core/_store/store";
import AvatarProfile from "../../../_common/component/AvatarProfile";
import ButtonLogInExtern from "../../../_common/component/Button/ButtonLogInExtern";
import Snackbar from '@mui/material/Snackbar';


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={ value !== index }
            id={ `simple-tabpanel-${ index }` }
            aria-labelledby={ `simple-tab-${ index }` }
            { ...other }
        >
            { value === index && (
                <Box sx={ { pt: 3, pb: 3 } }>
                    { children }
                </Box>
            ) }
        </div>
    );
}

const LoginHeader = () => {
    const { userToken, success } = useAppSelector((state) => state.auth);
    const [open, setOpen] = useState<boolean>(true);
    const [value, setValue] = React.useState<number>(0);
    const [openSnackBar, set0penSnackBar] = useState<boolean>(true);

    const handleClickLogin = () => {
        setOpen(!open);
        setValue(0);
    };

    const handleClickSignUp = () => {
        setOpen(!open);
        setValue(1);
    };

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        set0penSnackBar(false);
    };


    return (
        <>
            <Box>
            </Box>
            <Box sx={ { display: 'flex', alignItems: 'center', '& hr': { mr: 1.5, ml: 1.5 } } }>
                <img height={ 20 } width={ 20 } alt='diamond logo'
                     src={ 'https://s2.coinmarketcap.com/static/cloud/img/loyalty-program/diamond-icon.svg' } />
                <Divider orientation="vertical" variant="middle" flexItem />
                { !userToken &&
                    <>
                        <Box sx={ { mr: 1 } }>
                            <Button type='button' onClick={ handleClickLogin } label='log in' variant='outlined' />
                        </Box>
                        <Box>
                            <Button type='button' onClick={ handleClickSignUp } label='sign up' variant='contained' />
                        </Box>
                    </>
                }
                { userToken &&
                    <>
                        <AvatarProfile />
                        { openSnackBar && success &&
                            <Snackbar open={ openSnackBar } autoHideDuration={ 3000 } onClose={ handleClose }>
                                <Alert severity="success" sx={ { width: '100%' } }>
                                    This is a success message!
                                </Alert>
                            </Snackbar>
                        }
                    </>
                }
            </Box>
            {
                open && !userToken &&
                <DialogLayout open={ open } onClose={ handleClickLogin }>
                    <DialogContent>
                        <Tabs value={ value } onChange={ handleChangeTab } centered>
                            <StyledTab label="Log In" />
                            <StyledTab label="Sign Up" />
                        </Tabs>
                        <TabPanel value={ value } index={ 0 }>
                            <LoginForm />
                        </TabPanel>
                        <TabPanel value={ value } index={ 1 }>
                            <Typography>Sign Up</Typography>
                        </TabPanel>
                        <Divider>OR</Divider>
                        <Box sx={ { pt: 3 } }>
                            <ButtonLogInExtern />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                    </DialogActions>
                </DialogLayout>
            }
        </>
    )
};

const StyledTab = styled(Tab)(() => ({
    textTransform: 'none',
    fontSize: 20,
    fontWeight: 600
}));

export default LoginHeader;