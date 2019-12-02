import React from 'react'
// custom component
import Item from './ExpenseItem';
// icons
import {MdDelete} from 'react-icons/md';


const ExpenseList = ({expenses, handleEdit, handleDelete, clearItems}) => {
  return (
    <>
      <ul className="list">
        {expenses.map((expense)=> {
          return <Item 
            key={expense.id} 
            expense={expense} 
            handleEdit={handleEdit} 
            handleDelete={handleDelete} 
            />
        })}
      </ul>
      {expenses.length > 0 && <button className="btn" onClick={clearItems}>Bütçeyi sil <MdDelete className="btn-icon" /></button>}
    </>
  )
}

export default ExpenseList;