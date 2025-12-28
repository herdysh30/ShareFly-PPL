import React, { createContext, useContext } from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/AppLayout";

// Context untuk Home
interface Props {
  canLogin: boolean;
  canRegister: boolean;
}

export const HomeContext = createContext<Props>({ canLogin: false, canRegister: false });

// Komponen Card untuk buku
const BookCard = ({
  title,
  author,
  image,
}: {
  title: string;
  author: string;
  image: string;
}) => (
  <div className="p-4 text-center bg-black border border-gray-800 rounded-lg">
    <img
      className="object-cover w-full h-48 mb-4 rounded-lg"
      src={image}
      alt={title}
    />
    <h3 className="text-lg font-bold text-white">{title}</h3>
    <p className="mb-4 text-sm text-gray-400">{author}</p>
    <div className="flex justify-center gap-2">
      <button className="flex items-center justify-center gap-2 px-4 py-2 text-black bg-yellow-400 rounded hover:bg-yellow-500">
        <img src="/icons/add-icon.svg" alt="Add" className="w-5 h-5" />
        Add Book
      </button>
      <button className="px-4 py-2 text-white bg-gray-800 rounded">Read Book</button>
      <button className="px-4 py-2 text-white bg-gray-800 rounded">To Wishlist</button>
    </div>
  </div>
);

// Komponen Utama
export default function Home({ canLogin, canRegister }: Props) {
  return (
    <HomeContext.Provider value={{ canLogin, canRegister }}>
      <Head title="Home" />
      <AppLayout>
        <div className="container px-4 py-6 mx-auto space-y-12">
          {/* Bagian New Release */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Olive Kitteridge</h2>
            </div>
            <div className="grid items-center grid-cols-1 gap-6 md:grid-cols-2">
              <img
                className="w-full rounded-lg"
                src="/new-release-cover.jpg"
                alt="New Release"
              />
              <div>
                <h3 className="mb-4 text-lg font-bold text-yellow-400">Elizabeth Strout</h3>
                <p className="mb-4 text-gray-400">
                  An extraordinarily rich and detailed portrait of both a marriage and a community.
                </p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-black bg-yellow-400 rounded">Add Book</button>
                  <button className="px-4 py-2 text-white bg-gray-800 rounded">Read Book</button>
                  <button className="px-4 py-2 text-white bg-gray-800 rounded">To Wishlist</button>
                </div>
              </div>
            </div>
          </section>

          {/* Bagian About */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white">About</h2>
            <p className="text-gray-400">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </section>
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white">You May Also Like</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
              <BookCard
                title="Thinking Fast and Slow"
                author="Bill Bryson"
                image="/book9.jpg"
              />
              <BookCard
                title="Hooked"
                author="Nir Eyal"
                image="/book10.jpg"
              />
              <BookCard
                title="Summary of High Output Management"
                author="Andy Grove"
                image="/book11.jpg"
              />
            </div>
          </section>
        </div>
      </AppLayout>
    </HomeContext.Provider>
  );
}

export const useHomeContext = () => useContext(HomeContext);
