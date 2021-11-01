import java.awt.Graphics;
import java.awt.event.KeyEvent;

public abstract class NivelState {

	protected GameController gamecontroller;
	
	public abstract void iniciar();
	
	public abstract void actualizar();
	
	public abstract void renderizar(Graphics g);
	
	public abstract void keyPressed(KeyEvent e);
	
	public abstract void keyReleased(KeyEvent e);
	
	public abstract boolean posValida(int xx,int yy);
}
