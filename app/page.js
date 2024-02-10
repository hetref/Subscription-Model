"use client";

import { initFirebase } from "@/firebase";
import { useRouter } from "next/navigation";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const app = initFirebase();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [user, loading] = useAuthState(auth);

  const login = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (user) {
      goToAccount();
    }
  };

  const goToAccount = () => {
    router.push("/account");
  };

  useEffect(() => {
    const redirect = (isLoading, firebaseUser) => {
      if (!isLoading) {
        if (firebaseUser) {
          router.push("/account");
        } else {
          router.push("/");
        }
      }
    };
    redirect(loading, user);
  }, [loading, user, router]);

  return (
    <div className="flex justify-center items-center h-[100dvh]">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-3xl mb-6 font-bold">Home</h1>
          <button
            onClick={login}
            className="bg-black text-white px-[16px] py-[8px] rounded"
          >
            Sign in with Google
          </button>
        </div>
      )}
    </div>
  );
}
