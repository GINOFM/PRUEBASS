import java.awt.Graphics;

public class GameController {

	private NivelState nivelActual;
	
	public GameController() {
		nivelActual=new Nivel1(this);
		nivelActual.iniciar();
	}
	
	
	public void actualizar() {
		nivelActual.actualizar();
		
	}

	public void renderizar(Graphics g) {
		nivelActual.renderizar(g);
		
	}
	
	public NivelState getNivelActual() {
		return nivelActual;
	}


}
