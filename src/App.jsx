import { useState, useEffect } from 'react';
import { LuListTodo } from "react-icons/lu";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdDataSaverOn, MdModeEdit, MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  
  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
        const todos = JSON.parse(todoString);
        settodos(todos);
    }
  }, []);

  const local = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const handleSave = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
    setTimeout(() => {
      local()
    }, 0);
  };

  const handleEdit = (e) => {
    let id = e.currentTarget.name;
    let t = todos.filter(i=>i.id === id) 
    settodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    settodos(newTodos) 
    local();
  };

  const handleDelete = (e) => {
    let id = e.currentTarget.name;

    let newtodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newtodos)
    setTimeout(() => {
      local()
    }, 0);
  };

  const handleChange = (e) => {
    settodo(e.currentTarget.value)
    setTimeout(() => {
      local()
    }, 0);
  };

  const handleTodoToggle = (e) => {
    let id = e.currentTarget.name;
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted
    settodos(newtodos)
    setTimeout(() => {
      local()
    }, 0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-emerald-600 text-white font-bold">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <LuListTodo className="text-2xl" />
            <h1 className="text-xl font-bold">MyTodo</h1>
          </div>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/onkar_gakhar_____/#" target="_blank" className="flex items-center gap-1 hover:text-emerald-200 "> <FaInstagram className="text-xl" /> <span className="hidden sm:inline">Instagram</span> </a>
            <a href="https://www.linkedin.com/in/onkar-gakhar-328a0031b/overlay/about-this-profile/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3Bxm3f2FNAR7KPpHvG96BGyg%3D%3D" target="_blank" className="flex items-center gap-1 hover:text-emerald-200"> <FaLinkedin className="text-xl" /> <span className="hidden sm:inline">LinkedIn</span> </a>
          </div>
        </div>
      </header>
      <main className="flex-grow container px-4 py-8 max-w-none h-auto">
        <div className="max-w-2xl mx-auto bg-white rounded-xl overflow-hidden">
          <div className="p-6 bg-emerald-500 text-white">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"> <LuListTodo /> <span>Plan.Prioritize.Progress🔥</span> </h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <input type="text" value={todo} onChange={handleChange} placeholder="Enter your task here..." className="flex-grow px-4 py-2 rounded-full border-2   text-gray-800" />
              <button disabled={todo.length<1} onClick={handleSave} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 rounded-full font-medium flex items-center justify-center gap-2 " > <MdDataSaverOn /> <span>Save</span> </button>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Your Todos</h3>
            

            {todos.length === 0 && <div className="text-center py-8 text-gray-500">
                <p className="text-xl">🥰 No todos yet 🥰</p>
                <p className="mt-2">Add your first task above!</p>
              </div>}
              <ul>
                {todos.map(item => (
                  <li 
                    key={item.id} 
                    className={`p-3 rounded-[20px] flex items-center my-3 justify-between ${item.isCompleted ? 'bg-gray-300' : 'bg-gray-50 border'}`}
                  >
                    <div className="flex items-center gap-3 flex-grow">
                      <input type="checkbox" name={item.id} checked={item.isCompleted} onChange={handleTodoToggle} className="h-5 w-5 accent-emerald-500" />
                      <span className={`flex-grow ${item.isCompleted ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                        {item.todo}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button name={item.id} onClick={handleEdit} className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-100 " > <MdModeEdit /> </button>
                      <button name={item.id} onClick={handleDelete} className="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-100 " > <MdDelete /> </button>
                    </div>
                  </li>
                ))}
              </ul>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          &copy; MyTodo App - All Rights Reserved
        </div>
      </footer>
    </div>
  );
}

export default App;