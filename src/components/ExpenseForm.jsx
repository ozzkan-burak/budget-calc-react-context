import React from 'react'
// icons
import {MdSend} from "react-icons/md";

const ExpenseForm = ({charge, amount, handleCharge, handleAmount, handleSubmit, edit}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">ödenen</label>
          <input
            type="text"
            className="form-control"
            id="charge"
            name="charge"
            placeholder="örn. kira"
            value={charge}
            onChange={handleCharge}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">tutar</label>
          <input
            type="text"
            className="form-control"
            id="amount"
            name="amount"
            placeholder="örn. 100 TL"
            value={amount}
            onChange={handleAmount}
          />
        </div>
      </div>
      <button type="submit" className="btn">
        {edit ? 'güncelle' : 'gönder'}
        <MdSend className="btn-icon" />
      </button>
    </form>
  )
}

export default ExpenseForm;
