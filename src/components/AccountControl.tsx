import React from "react";
import UserInfo from "./UserInfo";
import { getServerAuthSession } from "~/server/auth";

async function AccounControl() {
  const session = await getServerAuthSession();

  return <UserInfo session={session!} />;
}

AccounControl.propTypes = {};

export default AccounControl;
