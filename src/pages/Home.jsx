import './Home.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Home() {
  return (
    <main className="home">
      <Header />
      <div className="background"></div>

      <h1>Bienvenido a Durnom</h1>
      <p>Noticias del desarrollo aparecerán aquí.</p>

      <section className="noticia">
        <img src="/noticias1.png" alt="Noticia 1" className="noticia-img" />
        <h2>¡Primera imagen del juego!</h2>
        <p>
          Aquí tienes un primer vistazo al mundo de Durnom. Estamos trabajando duro para crear una experiencia
          inmersiva y única. ¡Gracias por acompañarnos en este viaje!
        </p>
      </section>

      <Footer />
    </main>
  );
}

export default Home;
