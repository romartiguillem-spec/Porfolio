
import formacion from "../../model/data/Formacion.json"

export default function Formacion() {
  return (
    <section id="formacion" className="bg-slate-950 min-h-screen flex items-center justify-center">
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">Titulaciones académicas</h2>
          <p className="mt-2 text-lg/8 text-gray-300">Titulos de Formación Profesional</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-700 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {formacion.map((titulo) => (
            <article key={titulo.id} 
            className="flex max-w-xl flex-col items-start justify-between runded-md">
              <div className="flex items-center gap-x-4 text-xs"> {// Parte modificada por el profesor
              }
              </div>
              <div className="group relative grow">
                <h3 className="mt-3 text-lg/6 font-semibold text-white group-hover:text-gray-300">
                  <a href={titulo.href}>
                    <span className="absolute inset-0" />
                    {titulo.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-gray-400">{titulo.description}</p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                <img alt="" src={titulo.author.imageUrl} className="size-10 rounded-full bg-gray-800" />
                <div className="text-sm/6">
                  <p className="font-semibold text-white">
                    <a href={titulo.author.href}>
                      <span className="absolute inset-0" />
                      {titulo.author.name}
                    </a>
                  </p>
                  <p className="text-gray-400">{titulo.author.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
    </section>
  )
}
