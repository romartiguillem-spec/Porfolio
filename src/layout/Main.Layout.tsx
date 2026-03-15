import Footer from '../components/Main/Footer';
import Header from '../components/Main/Header1';
import QSomos from '../components/sections/QSomos';
import Formacion from '../components/sections/Formacion';
import Trabajos from '../components/sections/Trabajos';
import Contacto from '../components/sections/Contacto';
import Follow  from '../components/sections/Follow';


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
