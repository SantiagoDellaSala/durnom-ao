function Home() {
  const style = {
    position: 'relative',
    padding: '2rem',
    height: '100vh',
    color: 'white',
    backgroundColor: 'black',
    overflow: 'hidden',
  };

  const backgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url(/fondo.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.3, // opacidad para que se vea el negro debajo
    zIndex: -1,
  };

  return (
    <main style={style}>
      <div style={backgroundStyle}></div>
      <h1>Bienvenido a Durnom</h1>
      <p>Noticias del desarrollo aparecerán aquí.</p>
    </main>
  );
}

export default Home;
