"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


// import Background from "../grid-background/background"
import { Icons } from "./icons"
import { toast } from "@/components/ui/use-toast"


export default function FormContact( ) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [guess, setGuess] = useState("")

  const handleClick = async (e:any) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch("/api/guess", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        phone: phone,
        guess: guess,
      }),
    })
    setLoading(false)
    if (!res.ok) {
      return toast({
        title: "Something went wrong.",
        description: "We can't receive your application. Please try again.",
        variant: "destructive",
      })
    } else {
      return toast({
        title: "Successfully Sent",
        description: `Thanks ${name} for your interest on us. We will reach out and get back to you as soon as possible! `,
        variant: "default",
      })
    }

    // we will be having two calls - 1 for email and 2 for form acceptance or we can merge them together to be deleived as one
  }

  return (
    <div  className="mx-auto flex items-center justify-center">
      {/* <Background />  */}

      <div className="container mx-auto max-w-xl shadow-sm hover:shadow-sm transition-shadow duration-300 rounded overflow-hidden">
        <div className="py-6 p-6">
          {/* <h2 className="font-heading text-4xl leading-[1.1] sm:text-4xl md:text-6xl mb-3">
          Contact{" "}
          <span className="inline bg-gradient-to-tr from-purple-600 to-orange-400 font-bold bg-clip-text text-transparent">
            Us
          </span>
        </h2> */}
          <form className="space-y-6 font-heading2 text-left" onSubmit={handleClick} >
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                className=" bg-gradient-to-tr from-purple-500/5 rounded-lg via-transparent-400/5 to-transparent border-[0.2px] border-zinc-900  dark:border-inherit "
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name..."
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
              
                id="email"
                className=" bg-gradient-to-tr from-purple-500/5 via-purple-400/5 to-transparent border-[0.2px] border-zinc-900  dark:border-inherit"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                placeholder="Your phone number.."
                // type="email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Guess who</Label>
              <Input
              
                id="guess"
                className=" bg-gradient-to-tr from-purple-500/5 via-purple-400/5 to-transparent border-[0.2px] border-zinc-900  dark:border-inherit"
                onChange={(e) => setGuess(e.target.value)}
                value={guess}
                placeholder="Guess ...."
                type="guess"
                required
              />
            </div>
        
            <button
            type="submit"
              className={'font-heading hover:text-opacity-40 px-6 py-3 rounded-xl text-muted-foreground bg-gradient-from-tr from-zinc-600/20 via-black/10 to-black/10 border-[0.5px] border-purple-400/30 dark:text-white/90 transition ease-in-out duration-150  tracking-wide  dark:bg-gradient-to-tr dark:from-transparent dark:via-accent-2/10 dark:to-transparent hover:border-purple-400/20 hover:duration-200  hover:shadow-lg hover:bg-purple-400/5  mx-auto  flex justify-center items-center'}
              disabled={loading}
              // onClick={handleClick}
            >
              {loading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}