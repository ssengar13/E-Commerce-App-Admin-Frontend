import React from 'react'
import { Modal } from 'antd';


const CustomModal = (props) => {
    const { open, hideModal, performAction, title } = props;
    return (
        <Modal
            title="Delete Brand?"
            open={open}
            onOk={performAction}
            onCancel={hideModal}
            okText="Delete"
            cancelText="Cancle"
        >
            <p>{title}</p>
        </Modal>
    )
}

export default CustomModal