import { useEffect, useId, useState } from "react";
import { PhoneFrame } from "./PhoneFrame";
import { AppDemo } from "./AppDemo";
import { Container } from "./Container";
import { Header } from "./Header";
import { Button } from "./Button";
import { BookOpenIcon, RocketLaunchIcon } from "@heroicons/react/24/solid";

export function Hero() {
  const [showInstall, setshowInstall] = useState<boolean>(false);

  useEffect(() => {
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };
    // Detects if device is in standalone mode
    const isInStandaloneMode = () =>
      "standalone" in window.navigator && window.navigator.standalone;

    // Checks if should display install popup notification:
    if (isIos() && !isInStandaloneMode()) {
      setshowInstall(true);
    }
  }, []);

  return (
    <div className="overflow-x-hidden lg:pb-32 xl:pb-36 h-full">
      <Header />
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <h1 className="text-6xl font-medium tracking-tight ">
              Communities for Everyone
            </h1>
            <p className="mt-12 text-3xl text-gray-300">
              nostr.kiwi is a place for you to share notes and curate content in
              communities.
            </p>

            {/* <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
              <AppStoreLink />
              <Button
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                variant="outline"
              >
                <PlayIcon className="h-6 w-6 flex-none" />
                <span className="ml-2.5">Watch the video</span>
              </Button>
            </div> */}

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
              <Button href="/app" variant="solid">
                <RocketLaunchIcon className="h-6 w-6 flex-none" />
                <span className="ml-2.5">Launch App</span>
              </Button>
              <Button
                href="https://github.com/jinglescode/nostr.kiwi"
                variant="outline"
                newWindow={true}
              >
                <BookOpenIcon className="h-6 w-6 flex-none" />
                <span className="ml-2.5">Source</span>
              </Button>
            </div>
          </div>
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6 hidden md:block">
            <BackgroundIllustration className="absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0" />
            <div className="-mx-4 h-[448px] px-9">
              <PhoneFrame className="mx-auto max-w-[366px]" priority>
                <AppDemo />
              </PhoneFrame>
              <div className="h-16"></div>
            </div>
          </div>

          {showInstall && (
            <div className="pointer-events-none absolute left-0 bottom-0 right-0 flex flex-col items-center justify-center gap-y-6 px-6 pb-4 text-center text-black dark:text-white">
              <div className="flex flex-col items-center justify-center gap-y-1 pt-20 pb-2 text-sm !leading-6 xxxs:pb-0">
                <div className="flex items-center justify-center font-title font-bold">
                  <span>Tap the </span>
                  <span className="inline-block px-2">
                    <svg
                      width="31"
                      height="30"
                      viewBox="0 0 31 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.5"
                        width="30"
                        height="30"
                        rx="8"
                        fill="#F2F2F2"
                      ></rect>
                      <path
                        d="M18.5855 11.4102H20.5C21.6046 11.4102 22.5 12.3056 22.5 13.4102V22.4102C22.5 23.5147 21.6046 24.4102 20.5 24.4102H10.5C9.39543 24.4102 8.5 23.5147 8.5 22.4102V13.4102C8.5 12.3056 9.39543 11.4102 10.5 11.4102H12.2303"
                        stroke="#0381FE"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M12.6768 8.41341L15.2507 5.83944C15.3886 5.70161 15.612 5.70161 15.7499 5.83944L18.3238 8.41341M15.5003 16.8251V5.58984"
                        stroke="#0381FE"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </span>{" "}
                  <span>icon button below, </span>
                </div>
                <div className="mt-2 flex items-center justify-center font-title font-bold">
                  then ‘Add to home screen’.
                </div>
              </div>
              <div>
                <svg
                  width="18"
                  height="20"
                  viewBox="0 0 18 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="arrow-down"
                >
                  <path
                    d="M17 17.9999L9.70709 25.2928C9.31657 25.6833 8.6834 25.6833 8.29288 25.2928L0.999972 17.9999M8.99997 0.999999L8.99997 26"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </div>
            </div>
          )}
          {/* <div className="relative -mt-4 lg:col-span-7 lg:mt-0 xl:col-span-6">
            <p className="text-center text-sm font-semibold text-gray-900 lg:text-left">
              As featured in
            </p>
            <ul
              role="list"
              className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-x-10 gap-y-8 lg:mx-0 lg:justify-start"
            >
              {[
                ['Forbes', logoForbes],
                ['TechCrunch', logoTechcrunch],
                ['Wired', logoWired],
                ['CNN', logoCnn, 'hidden xl:block'],
                ['BBC', logoBbc],
                ['CBS', logoCbs],
                ['Fast Company', logoFastCompany],
                ['HuffPost', logoHuffpost, 'hidden xl:block'],
              ].map(([name, logo, className]) => (
                <li key={name} className={clsx('flex', className)}>
                  <Image src={logo} alt={name} className="h-8" unoptimized />
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </Container>
    </div>
  );
}

function BackgroundIllustration({ className }: { className?: string }) {
  let id = useId();

  return (
    <div className={className}>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-spin-slow"
      >
        <path
          d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
          stroke="#D4D4D4"
          strokeOpacity="0.7"
        />
        <path
          d="M513 1025C230.23 1025 1 795.77 1 513"
          stroke={`url(#${id}-gradient-1)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-1`}
            x1="1"
            y1="513"
            x2="1"
            y2="1025"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#06b6d4" />
            <stop offset="1" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-spin-reverse-slower"
      >
        <path
          d="M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z"
          stroke="#D4D4D4"
          strokeOpacity="0.7"
        />
        <path
          d="M913 513c0 220.914-179.086 400-400 400"
          stroke={`url(#${id}-gradient-2)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-2`}
            x1="913"
            y1="513"
            x2="913"
            y2="913"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#06b6d4" />
            <stop offset="1" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
