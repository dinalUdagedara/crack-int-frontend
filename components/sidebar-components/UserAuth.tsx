"use client";
import * as React from "react";
import { ChevronDown, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { signOut } from "next-auth/react";

export function UserAuth() {
  const { data: session } = useSession();
  console.log({ session });

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="w-full">
            <SidebarMenuButton className="w-full px-1.5 justify-between py-5">
              <div className="flex items-center gap-2">
                <div className="flex size-5 items-center justify-center rounded-md overflow-hidden">
                  <Image
                    alt="user-image"
                    src={session?.user?.image || "/user-default.jpg"}
                    width={20}
                    height={20}
                    className="rounded-md object-cover"
                  />
                </div>
                <span className="truncate font-medium">
                  {session?.user?.name}
                </span>
              </div>

              <ChevronDown className="opacity-50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            {/* <DropdownMenuLabel className="text-muted-foreground text-xs">
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-xs border">
                  <team.logo className="size-4 shrink-0" />
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem className="gap-2 p-2">
              <SidebarMenuButton
                className="w-full"
                onClick={() => {
                  signOut();
                }}
              >
                <LogOut />
                Log Out
              </SidebarMenuButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
