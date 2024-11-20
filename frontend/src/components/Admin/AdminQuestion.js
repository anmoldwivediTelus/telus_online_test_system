import React, { useState } from 'react'
import './AdminQuestions.css'



function AdminQuestion() {
  const [data,setData] = useState();


  return (
  
      <div>
        <form className="addquestion">
      <label>Select Course:</label>
      <select>
                <option value="course">Course</option>
                <option value="react">React</option>
                <option value="javascript">Javascript</option>
                <option value="nodejs">Nodejs</option>
      </select><br/><br/>
     

      
                <label>Question:</label>
                <input type="text" name = 'question' placeholder='Please add your question here' />

                <label>Marks:</label>
                <input type="number" name='marks' placeholder='Please give marks for the question' />
                
                <label>Option 1</label>
                <input type="text" name='option-1' placeholder='Give your options here'/>

                <label>Option 2</label>
                <input type="text" name='option-2' placeholder='Give your options here' />

                <label>Option 3</label>
                <input type="text" name='option-3' placeholder='Give your options here' />

                <label>Option 4</label>
                <input type="text" name='option-4' placeholder='Give your options here' />

                <label>Answer</label>
                <input type="text" name='answer' placeholder='Please add your answer here for the question'/>

               <div className='row quesbtn'>
               <button className='btn quesbtn'>Add Question</button>

               </div>
                </form>

   </div>
  )
}

export default AdminQuestion