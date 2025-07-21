"use client";
import Search from '@/components/Search'
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect } from 'react'

function page() {

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User is signed in:", user);
            } else {
                console.log("No user is signed in.");
                window.location.href = "/login";
            }
        });

        return () => unsubscribe();
    }, []);

  return (
    <div>
      <Search />
    </div>
  )
}

export default page
