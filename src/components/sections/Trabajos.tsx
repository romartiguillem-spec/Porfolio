

import trabajos from "../../model/data/Trabajos.json"

export default function Trabajos() {
  return (
    <div id="trabajos" className="bg-slate-950">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-white">Trabajos realizados</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 m-40px">
          {trabajos.map((trabajo) => (
            <div key={trabajo.id} className="group relative">
              <img
                alt={trabajo.imageAlt}
                src={trabajo.imageSrc}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-white w-70 flex justify-center">
                    <a href={trabajo.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {trabajo.name}
                    </a>
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}