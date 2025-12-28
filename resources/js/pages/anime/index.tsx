import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/AppLayout";
import { Head } from "@inertiajs/react";

const Anime = ({ animes }: { animes: IAnime }) => {
  console.log(animes)
  return (
    <AppLayout>
      <Head title='Anime' />
      {
        animes.data && (
          <section className="grid grid-cols-1 gap-6 p-5 lg:grid-cols-5">
            <div className="lg:col-span-4">
              <div className="relative overflow-hidden bg-gray-800 rounded-lg">
                <img
                  src={animes.data[0].images.webp.large_image_url}
                  alt="Featured Anime"
                  className="object-cover w-full h-80"
                />
                <div className="absolute bottom-4 left-4">
                  <h2 className="text-2xl font-bold">{animes.data[0].title}</h2>
                  <p className="text-foreground drop-shadow-lg">{animes.data[0].genres?.map(genre=> genre.name).join(' / ')}</p>
                  <p className="drop-shadow-lg text-foreground">{animes.data[0].producers?.map(producer => producer.name).join(' / ')}</p>
                  <Button className="px-4 py-2 mt-2 font-semibold text-gray-900 bg-yellow-500 rounded-lg">
                    See Detail
                  </Button>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {["Giorno Giovanna", "Edward Elric", "Tengen Uzui", "Izuku Midoriya", "Isaac Netero"].map((tag) => (
                  <Button key={tag} className="px-4 py-2 text-gray-300 bg-gray-700 rounded-full">
                    {tag}
                  </Button>
                ))}
              </div>

              {/* Top Trending Anime */}
              <div className="mt-6">
                <h3 className="mb-4 text-xl font-semibold">Top Trending Anime</h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {[1, 2, 3, 4].map((anime) => (
                    <img
                      key={anime}
                      src={`https://picsum.photos/200/300?random=anime${anime}`}
                      alt={`Anime ${anime}`}
                      width={200}
                      height={300}
                      className="rounded-lg"
                    />
                  ))}
                </div>
              </div>

              {/* All Anime */}
              <div className="mt-6">
                <h3 className="mb-4 text-xl font-semibold">All Anime</h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {[5, 6, 7, 8, 9, 10].map((anime) => (
                    <img
                      key={anime}
                      src={`https://picsum.photos/200/300?random=anime${anime}`}
                      alt={`Anime ${anime}`}
                      width={200}
                      height={300}
                      className="rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <div className="p-4 bg-gray-800 rounded-lg">
                <h3 className="mb-4 text-lg font-semibold">Category</h3>
                <ul className="space-y-2">
                  {["Category a", "Category b", "Category c", "Category d", "Category e"].map((category) => (
                    <li key={category}>
                      <a href="#" className="text-gray-400 hover:text-gray-200">
                        {category}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )
      }
    </AppLayout>
  );
};

export default Anime;
