"use client";

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useUser from './hooks/useUser';
import LoadingSpinner from '@app/reusables/UI_components/LoadingSpinner';

export default function UserAuth({ setActiveLink, isActiveLink }) {
  const router = useRouter();
  const pathname = usePathname();

  const { isLoading: userLoading, isAuthenticated } = useUser();

  const hasRedirected = useRef(false); // avoid multiple redirects

  useEffect(() => {
    if (userLoading || hasRedirected.current) return;

    const isAuthPage = pathname.startsWith("/authentication");
    const isHomePage = pathname === "/";
    const isDashboard = pathname.startsWith("/dashboard");

    // Not authenticated → send to sign-in
    if (!isAuthenticated && !isAuthPage) {
      hasRedirected.current = true;
      router.push("/authentication/signIn");
    }

    // Authenticated → redirect away from auth pages or home
    if (isAuthenticated && (isAuthPage || isHomePage)) {
      hasRedirected.current = true;
      router.push("/dashboard");
    }

    //redirect user t dashboard when refreshing the browser (coz when browser refreshed that var always == dashboard)
    if(isActiveLink == "dashboard"){
      hasRedirected.current = true;
      router.push("/"+isActiveLink);
    }
  }, [userLoading, isAuthenticated, pathname, router]);

  // Optional loading state during user check
  if (userLoading) {
    return (
      <div style={spinnerFullScreen}>
        <LoadingSpinner />
      </div>
    );
  }

  return null;
}

const spinnerFullScreen = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  position: "fixed",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "white",
  zIndex: 3,
};
