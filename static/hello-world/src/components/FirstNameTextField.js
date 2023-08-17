import GenericTextField from "./generic/GenericTextField";


export default function FirstNameTextField({defaultValue}) {
  console.log(defaultValue)
    const validateName = (value) => {

          if (value) {
            return
          }
          
          return " should'nt be empty"
      }
    
    return (
        <GenericTextField id={"first-name"} name = {"first-name" } label= {"First Name"} placeholder={"Ian"} validate={validateName} defaultValue={defaultValue}/>
    )
}