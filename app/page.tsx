"use client";

import { useEffect, useRef, useState } from "react";
import "./globals.css";
import { Check, Info, Moon, Pencil, SquarePlus, Sun, Trash2, TriangleAlert, Undo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TbSourceCode } from "react-icons/tb";
import { FaGithub, FaUser } from "react-icons/fa";
import { IoLogoVercel } from "react-icons/io5";
import { RiSupabaseFill } from "react-icons/ri";
import { SiNextdotjs, SiShadcnui, SiLucide, SiTailwindcss } from "react-icons/si";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

export default function List() {
  const [input, setinput] = useState("");
  const [tarefas, settarefas] = useState<string[]>([]);
  const [inputedit, setedit] = useState<string>("");
  const [editindex, setindex] = useState(null);
  const [infoOpen, setOpen] = useState(false);
 const { setTheme } = useTheme()
const [isLoaded, setIsLoaded] = useState(false);

useEffect(() => {
  const saved = localStorage.getItem("tarefas");
  if (saved) settarefas(JSON.parse(saved));
  setIsLoaded(true); // triggers a re-render
}, []);

useEffect(() => {
  if (!isLoaded) return; // reads the SNAPSHOT — false on first render, always
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}, [tarefas, isLoaded]);


 function add() {
    if (input === "") {
      alert("Digite algo");
      return;
    }

    settarefas([...tarefas, input]);
    setinput("");
  }

  function edit(index: any) {
    setedit(tarefas[index]);
    setindex(index);
  }

  function confirmedit() {
    settarefas(
      tarefas.map((tarefa, i) => {
        return i == editindex ? inputedit : tarefa;
      }),
    );
    setindex(null);
  }

  function clear() {
    const confirmed = confirm("Tem certeza que quer excluir todas as tarefas?");

    if (confirmed) {
      settarefas([]);
    }
  }


  function cancel(){
setindex(null)

  }

  return (
   <>
 {/* MAIN */}
<div className="flex flex-col items-center h-[100dvh] overflow-hidden w-full px-4">

  {/* HEADER — pr-14 guards against fixed user button overlap */}
  <div className="text-center pt-4 pb-2 w-full pr-14">
    <h1 className="text-2xl">Lista de Tarefas</h1>
    <h2 className="text-xs">Olá! 👋</h2>
  </div>

  {/* INPUT */}
  <div className="flex gap-2 w-full max-w-80 mb-4">
    <Input
      value={input}
      onChange={(e) => setinput(e.target.value)}
      className="border-zinc-800"
      placeholder="Add a new task"
    />
    <Button className="rounded-sm" onClick={add}>
      <SquarePlus />
      Add
    </Button>
  </div>

  {/* TASK LIST — pb-16 guards against fixed theme button overlap */}
  <ul className="flex-1 overflow-y-auto w-full max-w-80 space-y-3 pb-16">
    {tarefas.map((tarefa, index) => (
      <li
        key={index}
        className="flex items-center gap-3 bg-card border border-border hover:bg-accent rounded-lg px-4 py-2.5 w-full transition-all duration-150"
      >
        {index === editindex ? (
          <div className="flex items-center gap-2 w-full">
            <input
              type="text"
              value={inputedit}
              onChange={(e) => setedit(e.target.value)}
              className="flex-1 border rounded px-2 py-1"
            />
            <Button
              size="icon"
              className="bg-[#F87171] hover:bg-[#8b0000] rounded-sm"
              onClick={cancel}
            >
              <Undo color="#fff" />
            </Button>
            <Button
              onClick={confirmedit}
              className="rounded-sm bg-[#267D39] hover:bg-[#30543D]"
            >
              <Check color="#fff" />
            </Button>
          </div>
        ) : (
          <>
            <span className="flex-1 min-w-0 text-sm truncate text-foreground">
              {tarefa}
            </span>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Button
                onClick={() => edit(index)}
                className="bg-[#2A2C31] hover:bg-[#34363C] rounded-sm mr-1"
                variant="secondary"
                size="icon"
              >
                <Pencil color="#fff" />
              </Button>
              <Button
                onClick={() => settarefas(tarefas.filter((_, i) => i !== index))}
                className="bg-[#F87171] hover:bg-[#3A1F1F] rounded-sm"
              >
                <Trash2 color="#fff" />
              </Button>
            </div>
          </>
        )}
      </li>
    ))}
  </ul>
</div>
        </>
  );
}
