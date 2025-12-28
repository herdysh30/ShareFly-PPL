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
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) => (
  <div className="p-4 text-center bg-black border border-gray-800 rounded-lg">
    <img
      className="object-cover w-full h-48 mb-4 rounded-lg"
      src={image}
      alt={title}
    />
    <h3 className="text-lg font-bold text-white">{title}</h3>
    <p className="mb-4 text-sm text-gray-400">{description}</p>
    <button className="flex items-center justify-center gap-2 px-4 py-2 text-black bg-yellow-400 rounded hover:bg-yellow-500">
      <img src="/icons/add-icon.svg" alt="Add" className="w-5 h-5" />
      Add Book
    </button>
  </div>
);

export default function BookDetail({ canLogin, canRegister }: Props) {
  return (
    <HomeContext.Provider value={{ canLogin, canRegister }}>
      <Head title="Home" />
      <AppLayout>
        <div className="container px-4 py-6 mx-auto space-y-12">
          {/* Bagian New Release */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">New Release Book</h2>
              <div className="flex items-center gap-2">
                <button className="p-2 text-white bg-gray-800 rounded-full">
                  ←
                </button>
                <button className="p-2 text-white bg-gray-800 rounded-full">
                  →
                </button>
              </div>
            </div>
            <div className="grid items-center grid-cols-1 gap-6 md:grid-cols-2">
              <img
                className="w-full rounded-lg"
                src={`https://picsum.photos/200/200?random=book1`}
                alt="New Release"
              />
              <div>
                <p className="mb-4 text-gray-400">
                  Lorem Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry's standard dummy text
                  ever since the 1500s...
                </p>
                <button className="px-4 py-2 text-black bg-white rounded">
                  See Details
                </button>
              </div>
            </div>
          </section>
{/* bagian recommended */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                Recommended For You
              </h2>
              <div className="relative">
                <select
                  className="px-4 py-2 text-black bg-yellow-400 rounded cursor-pointer"
                >
                  <option value="fiction">Fiksi</option>
                  <option value="non-fiction">Non-Fiksi</option>
                  <option value="mystery">Filsuf</option>
                  <option value="fantasy">Fantasi</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
              <BookCard
                title="The Having"
                description="Lorem Ipsum is simply dummy text..."
                image="https://picsum.photos/200/200?random=book2"
              />
              <BookCard
                title="The Bookish Life"
                description="Lorem Ipsum is simply dummy text..."
                image="https://picsum.photos/200/200?random=book3"
              />
              <BookCard
                title="Factfulness"
                description="Lorem Ipsum is simply dummy text..."
                image="https://picsum.photos/200/200?random=book4"
              />
              <BookCard
                title="Crossing to Safety"
                description="Lorem Ipsum is simply dummy text..."
                image="https://picsum.photos/200/200?random=book5"
              />
            </div>
          </section>

          {/* bagian top sellers */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Top Sellers</h2>
              <div className="flex items-center gap-2">
                <button className="p-2 text-white bg-gray-800 rounded-full">
                  ←
                </button>
                <button className="p-2 text-white bg-gray-800 rounded-full">
                  →
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
              <BookCard
                title="The GoldFinch"
                description="Lorem Ipsum is simply dummy text..."
                image="https://picsum.photos/200/200?random=book6"
              />
              <BookCard
                title="Steal Like An Artist"
                description="Lorem Ipsum is simply dummy text..."
                image="https://picsum.photos/200/200?random=book7"
              />
              <BookCard
                title="Vampire Diaries"
                description="Lorem Ipsum is simply dummy text..."
                image="https://picsum.photos/200/200?random=book8"
              />
              <BookCard
                title="Wager"
                description="Lorem Ipsum is simply dummy text..."
                image="https://picsum.photos/200/200?random=book9"
              />
            </div>
          </section>
        </div>
      </AppLayout>
    </HomeContext.Provider>
  );
}

export const useHomeContext = () => useContext(HomeContext);
