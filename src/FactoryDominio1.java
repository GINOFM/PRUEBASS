
public class FactoryDominio1 implements FactoryDominio {

	@Override
	public Entidad crearJugador(int fila,int columna,NivelState nivel) {
		Entidad toReturn = new Jugador(fila,columna,nivel);
		return toReturn;
	}

	@Override
	public Entidad crearPacDot(int fila,int columna,NivelState nivel) {
		Entidad toReturn = new PacDot(fila,columna,nivel);
		return toReturn;
	}

	@Override
	public Entidad PowerPellet(int fila,int columna,NivelState nivel) {
		// TODO Auto-generated method stub
		return null;
	}

}
