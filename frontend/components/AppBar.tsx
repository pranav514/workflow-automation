"use client";
import { useRouter } from "next/navigation";
import { LinkButton } from "./buttons/LinkButton";
import { PrimaryButton } from "./buttons/PrimaryButton";
import { Workflow } from "lucide-react";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { loadComponents } from "next/dist/server/load-components";

export const Appbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  });

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center text-2xl font-extrabold text-blue-500">
              <Workflow className="h-7 w-10" />
              FlowConnect
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <LinkButton onClick={() => {}}>Contact Sales</LinkButton>
            {token ? (
              <>
                <LinkButton onClick={() => router.push("/dashboard")}>
                  Dashboard
                </LinkButton>
                <PrimaryButton onClick={() => {
                    localStorage.removeItem("token");
                    router.push("/");
                }}>
                            logout
                        </PrimaryButton>
              </>
            ) : (
              <PrimaryButton onClick={() => router.push("/login")}>
                Login
              </PrimaryButton   >
            )}

            {/* <PrimaryButton onClick={() => router.push("/signup")}>
                            Signup
                        </PrimaryButton> */}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-500 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="block py-2">
              <LinkButton onClick={() => {}}>Contact Sales</LinkButton>
            </div>
            <div className="block py-2">
              <LinkButton onClick={() => router.push("/login")}>
                Login
              </LinkButton>
            </div>
            <div className="block py-2">
              <PrimaryButton onClick={() => router.push("/signup")}>
                Signup
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
