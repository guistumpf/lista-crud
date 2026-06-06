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
  <DropdownMenu>
  <DropdownMenuTrigger asChild className="fixed top-4 right-4 z-50">
    <Button variant="outline" className="rounded-sm">
<FaUser/>
    <h1 className="font-bold">User Anônimo</h1>  
</Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent align="end" className="rounded">
  
    <DropdownMenuItem
      onSelect={(e) => {
        e.preventDefault();
        setOpen(true);
      }}
      className="cursor-pointer"
    >
      <Info />
      <span>Info</span>
    </DropdownMenuItem>
<DropdownMenuItem onClick={clear} className="cursor-pointer">
      <TriangleAlert className="text-amber-500 dark:text-yellow-400"/> <h1 className="text-yellow-500">Limpar</h1>
   </DropdownMenuItem>
  
    <DropdownMenuSeparator />
  
  <DropdownMenuItem>
    <FaArrowUpRightFromSquare />
<span> <a href="https://lista-sql-pu4h.vercel.app">
  Vá para o site com Login
  </a>
  </span>
</DropdownMenuItem>


</DropdownMenuContent>
</DropdownMenu>

<Dialog open={infoOpen} onOpenChange={setOpen}>
  <DialogContent className=" rounded-sm"  onClick={(e) => {
        e.preventDefault();}}> 
    <DialogHeader>
      <DialogTitle>CRUD?!</DialogTitle>
           <DialogDescription>
                <p className="">Você logou anonimamente, então esse projeto não é fullstack :( </p>
<p className="mt-2 text-xs">De qualquer maneira, a proposta continua sendo a mesma, tentei fazer ficar o mais parecido possível com a versão de login. Aproveite! :)</p>
<h1 className="mt-1"></h1>
<h1 className="mt-1 mb-1 text-[10px]">*Toda a UI do projeto foi feita com Shadcn, Tailwind, React Icons e Lucide</h1>
              <div className="flex gap-2">
<div className="flex items-center gap-1">
  <h1>Principal: </h1>
                <a href="https://github.com/guistumpf/lista-sql" className="w-fit block">
                  <TbSourceCode className="text-lg mt-2 mb-2 cursor-pointer" title="Código Fonte do projeto principal " />
                </a>
  </div>
<div className="flex items-center gap-1">
  <h1>Sem Login: </h1>
                <a href="https://github.com/guistumpf/lista-sql" className="w-fit block">
                  <TbSourceCode className="text-lg mt-2 mb-2 cursor-pointer" title="Código Fonte do projeto sem login (você está aqui!) " />
                </a>
  </div>
              </div>
                <p className="mb-2 mt-2 font-bold">Tecnologias Utilizadas:</p>
                <div className="flex justify-center gap-3">
                  <FaGithub className="text-2xl" title="Github / Github Desktop" />
                  <SiNextdotjs className="text-2xl" title="Next.Js" />
                  <SiShadcnui className="text-2xl" title="Shadcn/ui" />
                  <IoLogoVercel className="text-2xl" title="Vercel" />
                  <SiLucide className="text-2xl" title="Lucide Icons"/> 
                  <SiTailwindcss className="text-2xl" title="Tailwind Css"/>
                  </div>
              </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

     <div className="flex flex-col items-center justify-start min-h-screen w-full gap-6">
      <div className="text-center">
        <h1 className="text-2xl mt-1">Lista de Tarefas</h1>
        <h2 className="text-xs text center">Olá! 👋 </h2>
      </div>

      {/* Input */}
      <div className="flex gap-2 w-full max-w-80">
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

<div className="fixed bottom-4 right-4 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="icon" className="rounded-sm">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
           </DropdownMenuContent>
        </DropdownMenu>
</div>


      {/* Tasks */}
      <ul className="space-y-3">
        {tarefas.map((tarefa, index) => (
          <li
          key={index}
          className="flex items-center gap-3 bg-card border border-border hover:bg-accent rounded-lg px-4 py-2.5 w-full transition-all duration-150"
          >
            {index === editindex ? (
              <div className="flex items-center gap-2 max-w-sm mt-2">
                <input
                  type="text"
                  value={inputedit}
                  onChange={(e) => setedit(e.target.value)}
                  className="flex-1 border rounded px-2 py-1"
                  />
                <Button
                  size="icon"
                  className="bg-[#F87171] hover:bg-[#8b0000] rounded-sm"
                  title="Descartar alteração"
                  onClick={cancel}
                  >
                  <Undo color="#ffff" />
                </Button>
                <Button
                  onClick={() => confirmedit()}
                  className="rounded-sm bg-[#267D39] hover:bg-[#30543D]"
                  title="Confirme a alteração"
                  >
                  <Check color="#ffff" />
                </Button>
              </div>
            ) : (
              <>
                <span title={tarefa} className="flex-1 min-w-0 text-sm truncate text-foreground">
                  {tarefa}
                  </span>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <Button
                    onClick={() => edit(index)}
                    className="bg-[#2A2C31] hover:bg-[#34363C] rounded-sm mr-1"
                    title="Faça alterações nessa tarefa"
                    variant="secondary"
                    size="icon"
                    >
                    <Pencil color="#ffffff" />
                  </Button>

                  <Button
                    onClick={() =>
                      settarefas(tarefas.filter((a, i) => i !== index))
                    }
                    className="bg-[#F87171] hover:bg-[#3A1F1F] rounded-sm"
                    title="Excluir tarefa"
                    >
                    <Trash2 color="#ffffff" />
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
