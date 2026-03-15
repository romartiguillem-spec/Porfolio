
import follow from "../../model/data/Follow.json"

export default function Follow() {
  return (
    <div id="follow" className="bg-slate-950 py-24 sm:py-32 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg/8 font-semibold text-white mb-10">Sígueme a traves de estas redes</h2>
        <nav className="mx-auto grid max-w-lg grid-cols-2 gap-8 items-center sm:max-w-xl sm:grid-cols-4 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {/*Para que funcione en mobiles he cambiado las columnas del gird de 4 a 2 para que en mobil se vea como dos columnas y en escritorio como 5*/}
          {follow.map((social) => (
          <a href={social.url}>
          <img
            alt={social.nombre}
            src={social.imagenurl}
            width={158}
            height={48}
            className= {social.estilos}
          />
          </a>
          ))}
        </nav>
      </div>
    </div>
  )
}