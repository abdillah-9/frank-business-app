"use client";
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useUser from './hooks/useUser';
import LoadingSpinner from '@app/reusables/UI_components/LoadingSpinner';

export default function UserAuth() {
  const router = useRouter();
  const pathname = usePathname();

  const { isLoading: userLoading, user: userData, isAuthenticated } = useUser();

  // Redirect unauthenticated users to sign-in page
  useEffect(() => {
    if (!userLoading && !isAuthenticated && pathname !== "/authentication/signIn") {
      router.push("/authentication/signIn");
    }
  }, [pathname, router]);

  // Redirect authenticated users away from auth pages or homepage
  useEffect(() => {
    const isRestricted = pathname === "/" || pathname.startsWith("/authentication");

    if (!userLoading && isAuthenticated && isRestricted) {
      router.push("/dashboard");
    }
  }, [pathname, router]);

  // Show loading spinner while checking auth
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
