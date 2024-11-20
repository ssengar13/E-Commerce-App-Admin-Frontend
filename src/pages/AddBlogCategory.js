import React from 'react'
import CustomInput from '../components/CustomInput'

const AddBlogCategory = () => {
    return (
        <div>
            <h3 className='mb-4 title'>Add Blog Category</h3>
            <div className=''>
                <form action="">
                    <CustomInput type='text' label='Enter Blog Category' />
                    <button className='btn btn-success mt-3 border-0 rounded-3' type='submit'>Add Blog Category</button>
                </form>
            </div>
        </div>
    )
}

export default AddBlogCategory