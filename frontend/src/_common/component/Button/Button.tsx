import React from 'react';
import { Button as MuiButton, styled } from "@mui/material";


type ButtonProps = {
    onClick?: () => void,
    label: string;
    disabled?: boolean;
    variant: 'contained' | 'outlined';
    type: string;
};

const Button = ({ label, variant, onClick, type }: ButtonProps) => {
    return (
        <CustomButton type={ type } onClick={ onClick } variant={ variant } disableElevation>
            { label }
        </CustomButton>
    )
};

const CustomButton = styled(MuiButton)(() => ({
    width: "100%",
    padding: '5px 20px'
}));

export default Button;