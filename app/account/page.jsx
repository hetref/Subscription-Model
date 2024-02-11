"use client";

import React, { useEffect, useState } from "react";
import { initFirebase } from "@/firebase";
import { getAuth } from "firebase/auth";
import { getCheckoutUrl, getPortalUrl } from "@/stripe";
import { getPremiumStatus } from "./getPremiumStatus";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

const Account = () => {
  const app = initFirebase();
  const auth = getAuth(app);

  const userName = auth.currentUser?.displayName;
  const email = auth.currentUser?.email;
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const checkPremium = async () => {
      const newPremiumStatus = auth.currentUser
        ? await getPremiumStatus(app)
        : false;
      setIsPremium(newPremiumStatus);
    };

    console.log(user, loading);

    checkPremium();
  }, [app, auth.currentUser?.uid, auth.currentUser, loading, user]);

  const upgradeToPremium = async () => {
    const priceId = "price_1OiO4ISFqS2vwTXYPZjTmYqO";
    const checkoutUrl = await getCheckoutUrl(app, priceId);
    router.push(checkoutUrl);
    console.log("Upgrade to Premium");
  };

  const manageSubscription = async () => {
    const portalUrl = await getPortalUrl(app);
    router.push(portalUrl);
    console.log("Manage Subscription");
  };

  const signOut = () => {
    auth.signOut();
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center h-[100dvh]">
      {!loading && (
        <div className="flex flex-col items-center">
          <span className="mb-2">
            Signed in as {userName} ({email})
          </span>
          {isPremium ? (
            <p className="mb-6 text-emerald-900 text-2xl">
              You are a <b>premium user</b>
            </p>
          ) : (
            <p className="mb-6 text-red-900">
              You are a <b>free user</b>
            </p>
          )}
          {isPremium ? (
            <button
              onClick={manageSubscription}
              className="bg-black text-white px-[16px] py-[8px] rounded"
            >
              Manage Subscription
            </button>
          ) : (
            <button
              onClick={upgradeToPremium}
              className="bg-black text-white px-[16px] py-[8px] rounded"
            >
              Upgrade to Premium
            </button>
          )}
          <button
            onClick={signOut}
            className="bg-red-500/90 mt-6 text-white px-[16px] py-[8px] rounded"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Account;
