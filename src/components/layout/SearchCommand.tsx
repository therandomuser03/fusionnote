'use client'

import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command"
import { useEffect } from "react"

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function SearchCommand({ open, setOpen }: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen(!open)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [setOpen])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandItem>Home</CommandItem>
        <CommandItem>Docs</CommandItem>
        <CommandItem>Contact</CommandItem>
      </CommandList>
    </CommandDialog>
  )
}
