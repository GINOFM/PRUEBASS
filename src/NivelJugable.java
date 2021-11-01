import java.awt.Graphics;
import java.awt.event.KeyEvent;
import java.util.LinkedList;

public abstract class NivelJugable extends NivelState{

	protected Jugador jugador;
	protected LinkedList<Entidad> listaEntidades=new LinkedList<Entidad>();
	
	public NivelJugable(GameController gamecontroller) {
		this.gamecontroller=gamecontroller;
	}
	
	public void actualizar() {
		for(Entidad e:listaEntidades) {
			e.actualizar();
		}
	};
	
	public void renderizar(Graphics g) {
		for(Entidad e:listaEntidades) {
			e.renderizar(g);
		}
	};
	
	
	
	public void keyPressed(KeyEvent e) {
		int key = e.getKeyCode();
		if (key == KeyEvent.VK_UP) {
			jugador.mover("arriba");
		} else if (key == KeyEvent.VK_DOWN) {
			jugador.mover("abajo");
		}else if (key == KeyEvent.VK_LEFT) {
			jugador.mover("izquierda");
		}else if (key == KeyEvent.VK_RIGHT) {
			jugador.mover("derecha");
		}
	};
	
	public void keyReleased(KeyEvent e) {};
}
