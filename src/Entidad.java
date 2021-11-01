import java.awt.Graphics;
import java.awt.Image;

public abstract class Entidad {

	protected int x;
	protected int y;
	protected int ancho;
	protected int largo;
	protected Image imagenactual;
	protected NivelState nivelactual;
	
	public Entidad(int x,int y) {
		this.x=x;
		this.y=y;
	}
	
	public abstract void actualizar();
	
	public abstract void renderizar(Graphics g);
	
	public Image getImagenActual() {
		return imagenactual;
	}

}
