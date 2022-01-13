import InputText from "../3.features/InputText/InputText";
import Button from "../3.features/Button/Button";
import Checkbox from "../3.features/CheckBox/CheckBox";
import React from "react";
import Spinner from "../3.features/Loading/Spinner";


const TestPage = () => {
    return (
        <>
            <InputText/>
            <br/>
            <InputText password/>
            <br/>
            <Button>Button</Button>
            <br/>
            <Checkbox/>
            <Spinner/>
        </>
    )
}

export default TestPage