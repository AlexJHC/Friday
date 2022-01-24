import InputText from "../3.features/InputText/InputText";
import Button from "../3.features/Button/Button";
import Checkbox from "../3.features/CheckBox/CheckBox";
import React, {useState} from "react";
import PopUp from "../3.features/PopUp/PopUp";


const TestPage = () => {

  const [activePopUp, setActivePopUp] = useState<boolean>(true)


  const popUpChildren = <><InputText value={'1234'}/></>

  return (
    <>
      <InputText/>
      <br/>
      <InputText password/>
      <br/>
      <Button>Button</Button>
      <br/>
      <Checkbox/>
      {/*<Spinner/>*/}
      <PopUp name={'test'} popUpStatus={activePopUp} popUpToggle={setActivePopUp}>{popUpChildren}</PopUp>
    </>
  )
}

export default TestPage
