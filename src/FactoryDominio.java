
public interface FactoryDominio {

	public Entidad crearJugador(int fila,int columna,NivelState nivel);
	public Entidad crearPacDot(int fila,int columna,NivelState nivel);
	public Entidad PowerPellet(int fila,int columna,NivelState nivel);
}
