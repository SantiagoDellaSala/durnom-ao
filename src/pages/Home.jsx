import './Home.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Home() {
  return (
    <main className="home">
      <Header />
      <div className="background"></div>
      <section className="noticia">
        <img src="/noticias1.png" alt="Noticia 1" className="noticia-img" />
        <h2>Seguimos en pleno desarrollo</h2>
        <p>
          Aún estamos trabajando en la parte "detrás de escena", eso que ustedes no van a ver en su pantalla, pero que les va a dar
          una jugabilidad, seguridad y diversión asegurada. Queremos ser los mejores, vamos a ser los mejores. Juntos, seremos la mejor 
          comunidad de Argentum Online que haya existido.
        </p>
      </section>

      <Footer />
    </main>
  );
}

export default Home;
