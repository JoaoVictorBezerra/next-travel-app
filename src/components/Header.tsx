"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";

const Header = () => {
  const { status, data } = useSession();

  const handleLoginClick = () => signIn();
  const handleLogoutClick = () => signOut();;

  const [image, setImage] = useState<string>();

  useEffect(() => {
    setImage(data?.user?.image!)
  }, [data?.user?.image])


  return (
    <div className="container mx-auto p-5 py-0 h-[93px] flex justify-between items-center lg:border-b lg:border-customGray-light">
      <Link href="/">
        <div className="relative h-[32px] w-[182px]">
          <Image src="/logo.png" alt="Full Stack Week" fill />
        </div>
      </Link>



      <div className="flex gap-1 items-center rounded-full py-1 px-2 relative">
        <NavigationMenu >
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className=" text-customPurple hover:text-customPurple active:text-customPurple">
                Menu
              </NavigationMenuTrigger>
              <NavigationMenuContent className=" fle text-customPurple">
                {status === "authenticated" && data.user && (
                  <ul className="p-3 flex flex-col text-center gap-3">
                    <Link href="/my-trips" legacyBehavior passHref>
                      <NavigationMenuLink>
                        Viagens
                      </NavigationMenuLink>
                    </Link>
                    <NavigationMenuLink className="cursor-pointer" onClick={handleLogoutClick}>Logout</NavigationMenuLink>
                  </ul>
                )}
                {status === "unauthenticated" && (
                  <ul className="p-3 flex flex-col text-center gap-3">
                    <NavigationMenuLink className="cursor-pointer" onClick={handleLoginClick}>
                      Entrar
                    </NavigationMenuLink>
                  </ul>
                )}

              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {status === "authenticated" && (
                  <Avatar className="w-[1.5rem] h-[1.5rem]">
                    {data.user?.image && <AvatarImage src={image} alt={data.user.name!} />}
                    <AvatarFallback>{data.user?.name?.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                )}

      </div>
    </div>
  );
};

export default Header;
