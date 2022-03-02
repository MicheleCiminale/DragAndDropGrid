import React from "react"
import 'antd/dist/antd.css';
import { Modal} from 'antd';
import InputComponent from "./constComponent/InputComponent";

function BoxSettings(props){

    const approved = {
        state : "approved"
    }

    const refuse = {
        state: "refuse"
    }

    return(
        <div>
            <Modal title="Basic Modal" visible={props.show} onOk={()=>props.handleOk(approved)} onCancel={()=>props.handleCancel(refuse)}>
                <InputComponent/>
            </Modal>
        </div>
    )
}

export default BoxSettings;
