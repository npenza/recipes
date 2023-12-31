"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  BookOpenIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import UserActionsMenu from "./UserActionsMenu";
import type { Session } from "next-auth";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Recipes", href: "/recipes" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type NavbarProps = {
  session: Session | null;
};

export default function NavBar({ session }: NavbarProps) {
  const router = useRouter(); // Use the useRouter hook

  // This function determines if the item's href matches the current pathname
  const isCurrentPage = (href: string) => {
    return router.pathname === href;
  };

  return (
    <Disclosure as="nav" className="bg-white border-b border-gray-200">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  {/* Logo */}
                  <BookOpenIcon className="h-6 w-6 text-green-700" />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          isCurrentPage(item.href) // Use isCurrentPage function here
                            ? "bg-gray-900 text-green-700"
                            : "text-green-700 hover:bg-green-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium",
                        )}
                        aria-current={
                          isCurrentPage(item.href) ? "page" : undefined
                        } // Update aria-current based on the current page
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <UserActionsMenu session={session} />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    isCurrentPage(item.href)
                      ? "bg-gray-900 text-white"
                      : "text-green-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium",
                  )}
                  aria-current={isCurrentPage(item.href) ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
