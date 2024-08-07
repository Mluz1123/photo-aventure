"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, firestore } from "@/firebase/firebase";
import type { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Gallery from "@/components/Gallery";

const DashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  console.log("userName", userName);

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        console.log("userDoc", userDoc);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log("userData", userData);

          setUserName(`${userData.lastName} ${userData.firstName}`);
        }
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubcribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const handleChangePassword = () => {
    router.push("/passwordChange");
  };

  if (loading) {
    return (
      <div className="loader flex justify-center items-center w-screen flex-col relative"></div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 bg-gradient-to-b from-gray-600 to-black">
      <nav className="bg-gray-800 p-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-white text-xl">
                Foto<span className="font-bold">Aventuras</span>
              </div>
            </div>
            <div className="space-x-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Cerrar sesión
              </button>
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Cambiar contraseña
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex flex-col items-center justify-center flex-grow mt-10">
        {userName && (
          <h1 className="text-4xl font-bold mb-6 ml-10">
            Bienvenid@ a esta aventura tan emocionante 🚀, {userName}!
          </h1>
        )}
        <section>
          <Gallery />
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
