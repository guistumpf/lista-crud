"use client"

import { useState } from "react"
import "./globals.css"

export default function List() {

  const [input, setinput] = useState("")
  const [tarefas, settarefas] = useState<string[]>([])
  const [inputedit, setedit] = useState<string>("")
  const [editindex, setindex] = useState(null)

  function add() {

    if (input === "") {
      alert("Digite algo")
      return
    }

    settarefas([...tarefas, input])
    setinput("")
  }

  function edit(index: any) {
    setedit(tarefas[index])
    setindex(index)

  }

  function confirmedit() {

    settarefas(tarefas.map((tarefa, i) => {
      return i == editindex ? inputedit : tarefa
    }))
    setindex(null)

  }

  return (
    <div className="min-h-screen bg-white flex justify-center ">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Lista de Tarefas
        </h1>
        {/* Input */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setinput(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 outline-none"
            placeholder="Adicione uma nova tarefa"
          />
          <button
            onClick={add}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
          >
            Add
          </button>
        </div>

        {/* Tasks */}
        <ul className="space-y-3">
          {tarefas.map((tarefa, index) => (
            <li
              key={index}
              className="bg-gray-100 p-3  flex justify-between items-center"
            >
              {index === editindex ? (
                <div className="flex gap-2 w-full">
                  <input
                    type="text"
                    value={inputedit}
                    onChange={(e) => setedit(e.target.value)}
                    className="flex-1 border rounded px-2 py-1"
                  />

                  <button
                    onClick={() => confirmedit()}
                    className="bg-green-500 text-white px-3 rounded cursor-pointer"
                  >
                    Confirm
                  </button>
                </div>
              ) : (
                <>
                  <span>{tarefa}</span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => edit(index)}
                      className="bg-purple-500 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      🖉
                    </button>

                    <button
                      onClick={() =>
                        settarefas(
                          tarefas.filter((a, i) => i !== index)
                        )
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      X
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}