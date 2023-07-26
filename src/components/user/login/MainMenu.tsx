import {
  KeyIcon,
  ShieldCheckIcon,
  WalletIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { LoginScreen } from "./enumLoginScreen";
import React from "react";

export default function MainMenu({
  showMenu,
  setShowMenu,
}: {
  showMenu: LoginScreen;
  setShowMenu: Function;
}) {
  return (
    <div className={`flex flex-col h-full`}>
      <div className="flex-1 h-full flex justify-center items-center">
        <Image
          src="/images/logo/rounded-512.png"
          width={512}
          height={512}
          alt="logo"
          className="w-32"
        />
      </div>
      <div className="flex-1 h-full flex justify-center items-center">
        <LoginButton
          onclick={() => setShowMenu(LoginScreen.NIP46)}
          icon={
            <ShieldCheckIcon className="mx-auto w-12 h-12 text-primary-600 dark:text-primary-500" />
          }
          label="Login with Nostr Connect (NIP-46)"
        />
      </div>
      <div className="flex-1 h-full flex justify-center items-center">
        <LoginButton
          onclick={() => setShowMenu(LoginScreen.NIP07)}
          icon={
            <WalletIcon className="mx-auto w-12 h-12 text-primary-600 dark:text-primary-500" />
          }
          label="Login with Extensions (NIP-07)"
        />
      </div>
      <div className="flex-1 h-full flex justify-center items-center">
        <LoginButton
          onclick={() => setShowMenu(LoginScreen.SK)}
          icon={
            <KeyIcon className="mx-auto w-12 h-12 text-primary-600 dark:text-primary-500" />
          }
          label="Login with Secret Key"
        />
      </div>
      <div className="flex-1 h-full flex justify-center items-center"></div>
    </div>
  );
}

function LoginButton({
  onclick,
  icon,
  label,
}: {
  onclick: Function;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button onClick={() => onclick()} className="m-4">
      {icon}
      <h3 className="mb-2 text-xl font-bold dark:text-white">{label}</h3>
    </button>
  );
}
