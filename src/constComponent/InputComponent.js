import React, {useEffect, useState} from "react";

const InputComponent = (props) =>{
    debugger

    const [state, setState] = useState([{id: props.state, value:"ciao"}])
    const [value, setValue] = useState(null)

    useEffect(()=>{
        setValue(state.find(x=>x.id === props.state).value);
    },[])


    function insertValue(e){
        e.preventDefault()
        setValue(e.target.value);
        console.log(value);
    }

    return(
        <div>
            {props.text}
            <input type="text" id="input" name="input" value={value} onChange={e=> insertValue(e)}/>
        </div>
    )
}
export default InputComponent;
