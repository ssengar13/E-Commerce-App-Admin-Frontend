import React from 'react'
import CustomInput from '../components/CustomInput'

const AddColor = () => {
    return (
        <div>
            <h3 className='mb-4 title'>Add Colors</h3>
            <div className=''>
                <form action="">
                    <CustomInput type='color' label='Select Color' />
                    <button className='btn btn-success mt-3 border-0 rounded-3' type='submit'>Add Color</button>
                </form>
            </div>
        </div>
    )
}

export default AddColor