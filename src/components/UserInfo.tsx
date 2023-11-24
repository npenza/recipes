"use client";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import React from "react";
import { UserAvatar } from "./UserAvatar";

type UserInfoProps = {
  session: Session;
};

function UserInfo({ session }: UserInfoProps) {
  if (session) {
    return (
      <>
        <p>Hi {session.user.name}</p>
        <UserAvatar name={session.user.name!} image={session.user.image!} />
        <span onClick={() => signOut()}>Sign Out</span>
      </>
    );
  }

  if (!session) {
    return <p onClick={() => signIn()}>Sign In</p>;
  }
}

export default UserInfo;
