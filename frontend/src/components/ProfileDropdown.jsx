import React from 'react';
import { Button } from './ui/button';
import { ChevronDown, Linkedin, Github, Mail } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from './ui/dropdown-menu';
import { contact } from '../data/mock';

function ProfileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="h-auto p-1 hover:bg-[#1A1A1A]/5 dark:hover:bg-white/5 flex items-center gap-2 cursor-pointer select-none rounded-full"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#1A1A1A]/10 dark:border-white/10 flex-shrink-0">
            <img
              className="w-full h-full object-cover"
              src="/images/profile.jpg"
              alt="Profile image"
            />
          </div>
          <ChevronDown size={14} strokeWidth={2} className="opacity-60 text-[#1A1A1A] dark:text-white mr-1" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="pb-2 bg-[#FAF7F0]/95 dark:bg-[#1a1526]/95 backdrop-blur-md border border-[#1A1A1A]/10 dark:border-[#9B8BC4]/30 shadow-lg min-w-[10rem]">
        <DropdownMenuLabel className="font-mono text-[10px] text-[#9B8BC4] dark:text-[#B4A4D6] uppercase tracking-widest px-2.5 py-1.5">
          Let's connect
        </DropdownMenuLabel>
        
        <DropdownMenuItem
          className="cursor-pointer py-2 px-2.5 focus:bg-[#9B8BC4]/10 dark:focus:bg-[#9B8BC4]/20 focus:text-[#1A1A1A] dark:focus:text-white rounded-md transition-colors"
          asChild
        >
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 w-full">
            <Linkedin size={16} strokeWidth={2} className="opacity-60 text-[#1A1A1A] dark:text-white" aria-hidden="true" />
            <span className="font-mono text-xs text-[#1A1A1A] dark:text-white">LinkedIn</span>
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer py-2 px-2.5 focus:bg-[#9B8BC4]/10 dark:focus:bg-[#9B8BC4]/20 focus:text-[#1A1A1A] dark:focus:text-white rounded-md transition-colors"
          asChild
        >
          <a href={contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 w-full">
            <Github size={16} strokeWidth={2} className="opacity-60 text-[#1A1A1A] dark:text-white" aria-hidden="true" />
            <span className="font-mono text-xs text-[#1A1A1A] dark:text-white">GitHub</span>
          </a>
        </DropdownMenuItem>


      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileDropdown;
