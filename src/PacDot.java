import java.awt.Graphics;

import javax.swing.ImageIcon;

public class PacDot extends Entidad {

	public PacDot(int x, int y, NivelState nivelJugable) {
		super(x, y);
		this.nivelactual=nivelJugable;
		ImageIcon ii=new ImageIcon(this.getClass().getResource("recursos/pacdot1.png"));
		imagenactual=ii.getImage();
	}

	@Override
	public void actualizar() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void renderizar(Graphics g) {
		g.drawImage(imagenactual,(int) x,(int) y,null);
		
	}

}
