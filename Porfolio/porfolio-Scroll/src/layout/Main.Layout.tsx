import Footer from '../componentes/Main/Footer';
import Header from '../componentes/Main/Header1';
import QSomos from '../componentes/sections/QSomos';
import Formacion from '../componentes/sections/Formacion';
import Trabajos from '../componentes/sections/Trabajos';
import Contacto from '../componentes/sections/Contacto';
import Follow  from '../componentes/sections/Follow';


export const MainLayout = () => {
    return (
    <div className="min-h-screen w-full bg-slate-900 text-white">
        <Header />
        <main>
            <QSomos />
            <Formacion />
            <Trabajos />
            <Contacto />
            <Follow />
        </main>
        <Footer />
    </div>
    )
}
// anotacion importante el id es único la classnmae para varios componentes
