"use client";
import type { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import classNames from "classnames";

type UserInfoProps = {
  session: Session;
};

function UserActionsMenu({ session }: UserInfoProps) {
  if (session) {
    return (
      <>
        <Menu as="div" className="relative ml-3">
          <div>
            <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              <Image
                className="h-8 w-8 rounded-full"
                width={60}
                height={60}
                src={session.user.image ?? ""}
                alt=""
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }: { active: boolean }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700",
                    )}
                  >
                    Your Profile
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }: { active: boolean }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700",
                    )}
                  >
                    Settings
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }: { active: boolean }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700",
                    )}
                    onClick={() => signOut()}
                  >
                    Sign out
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </>
    );
  }

  if (!session) {
    return (
      <span
        className="mx-2 cursor-pointer rounded-md bg-blue-500 px-2 py-1 text-sm font-bold text-white"
        onClick={() => signIn()}
      >
        Sign In
      </span>
    );
  }
}

export default UserActionsMenu;
