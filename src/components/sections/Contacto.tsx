import { useState } from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function Contacto() {
  // Estados para gestionar el envío y los mensajes de feedback
  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'>('IDLE');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('SENDING');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mlgpejyo", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('SUCCESS');
        form.reset(); // Limpia los campos del formulario
      } else {
        setStatus('ERROR');
      }
    } catch (error) {
      setStatus('ERROR');
    }
  };

  return (
    <div id='contacto' className="relative isolate bg-slate-950 px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Título Principal */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Contacto</h2>
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2">
          
          {/* Columna izquierda: Información de contacto */}
          <div className="flex flex-col justify-center">
            <h3 className="text-3xl font-bold tracking-tight text-white">Mi Información</h3>
            
            <div className="mt-10 space-y-6 text-base text-gray-300">
              <div className="flex gap-x-4">
                <MapPinIcon className="h-7 w-6 text-indigo-400 flex-none" />
                <h1>Almería, España</h1>
              </div>
              <div className="flex gap-x-4">
                <PhoneIcon className="h-7 w-6 text-indigo-400 flex-none" />
                <a href="tel:+34634415808" className="hover:text-white transition">+34 634 415 808</a>
              </div>
              <div className="flex gap-x-4">
                <EnvelopeIcon className="h-7 w-6 text-indigo-400 flex-none" />
                <a href="mailto:guillem@gespou.es" className="hover:text-white transition">guillem@gespou.es</a>
              </div>
            </div>

            {/* MAPA INTERACTIVO */}
            <div className="mt-12 overflow-hidden rounded-2xl ring-1 ring-white/10 h-64 lg:h-80">
              <iframe
                title="Mapa Mojácar Playa"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12734.789182348504!2d-1.8388484128417967!3d37.13019809999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd62281e4408fd0b%3A0xf43795371330c4c9!2sPlaya%20de%20Moj%C3%A1car!5e0!3m2!1ses!2ses!4v1715000000000!5m2!1ses!2ses"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Formulario conectado con el manejador de React */}
          <form onSubmit={handleSubmit} className="bg-white/5 p-8 rounded-2xl ring-1 ring-white/10">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="first-name" className="block text-sm font-semibold text-white">Nombre</label>
                <input
                  type="text"
                  name="name"
                  id="first-name"
                  required
                  className="mt-2.5 block w-full rounded-md bg-white/5 px-3.5 py-2 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-semibold text-white">Apellido</label>
                <input
                  type="text"
                  name="lastname"
                  id="last-name"
                  className="mt-2.5 block w-full rounded-md bg-white/5 px-3.5 py-2 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-semibold text-white">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="mt-2.5 block w-full rounded-md bg-white/5 px-3.5 py-2 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-semibold text-white">Mensaje</label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  className="mt-2.5 block w-full rounded-md bg-white/5 px-3.5 py-2 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Alertas de Feedback visual */}
            {status === 'SUCCESS' && (
              <p className="mt-4 text-sm font-medium text-emerald-400">
                ¡Mensaje enviado con éxito! Te responderé lo antes posible.
              </p>
            )}
            {status === 'ERROR' && (
              <p className="mt-4 text-sm font-medium text-rose-400">
                Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.
              </p>
            )}

            <div className="mt-8">
              <button
                type="submit"
                disabled={status === 'SENDING'}
                className="w-full rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'SENDING' ? 'Enviando...' : 'Enviar mensaje'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}