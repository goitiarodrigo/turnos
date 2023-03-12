const Information = () => {
  return (
      <div className="iconCardsContainer">
        <div className="iconCard">
          <img src="/assets/icono-telefono.png"alt="..." />
          <h3>Teléfono</h3>
          <h4> +54 9 351 802 2424</h4>
        </div>
        <div className="iconCard">
        <a href='https://www.google.com/maps/place/Av.+Col%C3%B3n+150,+X5000+EPO,+C%C3%B3rdoba/@-31.4129845,-64.1871104,17z/data=!3m1!4b1!4m5!3m4!1s0x9432a28298e9d4c7:0xb601abfe6d32062a!8m2!3d-31.4129845!4d-64.1849217' target='_blank' rel='noreferrer'> <img id="buttonSign" src="/assets/icono-map.png" alt="map"/></a>
          <h3>Av. Colón 150</h3>
          <h4>Córdoba - Capital</h4>
        </div>
        <div className="iconCard">
          <img src="/assets/icono-reloj.png" alt="..."/>
          <h3>Lunes a Viernes</h3>
          <h4>9:00 a 18:00hs.</h4>
        </div>

      </div>
  );
};
export default Information;
