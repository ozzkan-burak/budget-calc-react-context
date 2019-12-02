import React, {useState, useEffect} from 'react';
import './App.css';

import uuid from 'uuid/v4';

//custom components
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';

// const initialExpenses = [
//   { id: uuid(), charge: "kira", amount: 1600 },
//   { id: uuid(), charge: "araç ödemesi", amount: 400 },
//   { id: uuid(), charge: "kredi kartı ödemsi", amount: 1200 }
// ];
const initialExpenses = localStorage.getItem("expenses") 
? JSON.parse(localStorage.getItem("expenses"))
: [];


function App() {
  // state values
  // all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses);
  // single expense
  const [charge, setCharge] = useState('');
  // single amount
  const [amount, setAmount] = useState('');
  // alert
  const [alert, setAlert] = useState({show:false});
  // edit
  const [edit, setEdit] = useState(false);
  // edit item
  const [id, setId] = useState(0);
  // useEffect ***********************
  useEffect(()=> {
    console.log("use effect çalıştı");
    localStorage.setItem("expenses", JSON.stringify(expenses));
  
  }, [expenses])
  // functions ***********************
  // handle charge
  const handleCharge = e => {
    setCharge(e.target.value);
  };
  // handle amount
  const handleAmount = e => {
    setAmount(e.target.value)
  };
  // handle alert
  const handleAlert = ({type, text}) =>{
    setAlert({show:true, type, text});
    setTimeout(()=>{
      setAlert({show: false});
    }, 3000)
  }

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if(charge !=='' && amount > 0){

      if(edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id ? {...item, charge, amount} : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({type: "success", text: "Bütçe kalemi güncellendi"})
      }
      else {
        const singleExpense = {id:uuid(), charge, amount}
        setExpenses([...expenses, singleExpense]);
        handleAlert({type:'success',text: 'listeye eklendi'});
      }
        setCharge('');
        setAmount('');
    }
    else {
      // handle alert called
        handleAlert({
          type: "danger",
          text: `Boş değer eklenemez`
        })
    }
  }
  
  // clear all items

  const clearItems = () => {
    setExpenses([]);
    handleAlert({type: "danger", text: " tüm bütçe kalemleri silindi"});
  }

 // handle delete
 const handleDelete = (id,charge) => {
    let tempExpenses = expenses.filter(item => item.id !== id);
    setExpenses(tempExpenses);
    console.log(tempExpenses);
    handleAlert({type: "danger", text: `bütçe kalemi silindi`});
 }

 // handle edit
 const handleEdit = (id) => {
   let expense = expenses.find(item => item.id === id);
   let {charge, amount} = expense
  setCharge(charge);
  setAmount(amount);
  setId(id);
  setEdit(true);
}
  return (
    <>
    {alert.show && <Alert type={alert.type} text={alert.text} />}
     <Alert />
     <h1>Bütçe Hesapla</h1>
     <main className="App">
      <ExpenseForm 
        charge={charge} 
        amount={amount}
        handleAmount={handleAmount}
        handleCharge={handleCharge}
        handleSubmit={handleSubmit}
        edit={edit}
        />
      <ExpenseList 
        expenses={expenses} 
        handleDelete={handleDelete} 
        handleEdit={handleEdit} 
        clearItems={clearItems}
        />
     </main>
     <h1>Toplam harcama: 
       <span className="total">{expenses.reduce((acc, curr)=>{
         return (acc += parseInt(curr.amount));
       },0)} TL</span>
       </h1>
    </>
  );
}

export default App;
