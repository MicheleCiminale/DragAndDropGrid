import React,{useState,useEffect} from "react";
import 'antd/dist/antd.css';
import { Radio } from 'antd';

function RadioGroupComponent(){
    const [numElement, setNumElement] = useState([])

    useEffect(()=>{

        const array = [];

        for (let i=1; i<6; i++){
            array.push(i);
        }
        setNumElement(array)
    },[])

    return (
        <div>
            {numElement.map((index,value) => <Radio value={index}>{value}</Radio>)}
        </div>
    );
}

export default RadioGroupComponent;
