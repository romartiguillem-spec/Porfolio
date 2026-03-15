// import './Header.css'

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

// ***************. codigo JS o TS

//una constante llamada navigation de tipo Array [] de objetos {}, Java/Type-script
const opciones = [
  //es un objeto
  { //parejas de atributo/campo: valor
    title: 'Quien Soy', 
    href: '#qsomos', 
    current: true
  },
  { title: 'Formacion', href: '#formacion', current: false },
  { title: 'Trabajos', href: '#trabajos', current: false },
  { title: 'Contacto', href: '#contacto', current: false },
  { title: 'Follow', href: '#follow', current: false },
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

// EL COMPONENTE (funcion) .tsx = TS + html
function Header(){
  // *******.  codigo JS o TS
  return(
    
<Disclosure as="nav" className="fixed w-full z-50 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      {/* el disclosure ha sido modificado con estos parametros: sticky top-0: Mantiene la cabecera arriba aunque hagas scroll   z-50 esto le da una mayor prioridad visual que a cualquier fondo dejando que resalte más el header 
      <Disclosure as="nav" className="flex-wrap fixed w-full top-0 bg-gradient-to-r from-blue-600 to-purple-600 w-full sticky top-0 z-50 "> He encontrado un error donde el header se queda fijo incluso cuadno tocamos la foto de perfil
      w-full sticky top-0 z-50 Todo esto hay que cambiaro 
      1º Manteneomso el z-50 (Garantiza que el header y sus menus esten flotando todo el rato)
      2º Quitamos el flex-wrap no quiero que salten a una segunda linea
      */}
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="absolute -inset-0.5" /> 
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://cdn-icons-png.flaticon.com/512/6839/6839318.png"
                className="h-10 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <nav id="ppal" className="ppal flex space-x-4">
                {/* { CODIGO JS o TS } */}
                {opciones.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full p-1 text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img
                  alt=""
                  src="https://img.freepik.com/vector-gratis/hacker-que-opera-ilustracion-icono-historieta-ordenador-portatil-concepto-icono-tecnologia-aislado-estilo-dibujos-animados-plana_138676-2387.jpg?semt=ais_hybrid&w=740&q=80"
                  className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {opciones.map((item) => (
            <DisclosureButton
              key={item.title}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.title}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  
  )

}



export default Header