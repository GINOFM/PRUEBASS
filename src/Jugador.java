import java.awt.Color;
import java.awt.Graphics;

import javax.swing.ImageIcon;

public class Jugador extends Entidad{

	private int velocidad=2;
	private boolean moviendose=false;
	private int contadorPasos=0;
	private String direccion="";
	
	public Jugador(int x, int y, NivelState nivelJugable) {
		super(x,y);
		this.nivelactual=nivelJugable;
		ImageIcon ii=new ImageIcon(this.getClass().getResource("recursos/pj1.png"));
		imagenactual=ii.getImage();
		
		System.out.println("PlayX"+x+"yy"+y);
	}

	public void renderizar(Graphics g) {
		g.drawImage(imagenactual,(int) x,(int) y,null);
	}

	public void actualizar() {
		if(moviendose==true) {
			
			if(contadorPasos<32) {
				switch(direccion) {
				case "arriba":
					y-=velocidad;
					;break;
				case "abajo":
					y+=velocidad;
					;break;
				case "derecha":
					x+=velocidad;
					;break;
				case "izquierda":
					x-=velocidad;
					;break;
				}
				contadorPasos+=velocidad;
			}
			else
			{
				contadorPasos=0;
				moviendose=false;
			}
		}
	}

	public void mover(String dir) {
		if(contadorPasos==0 && moviendose==false)
			{
			switch(dir) {
			case "arriba":
				if(nivelactual.posValida(x, y-32)==true) {
					direccion="arriba";
					moviendose=true;
				}
				break;
			case "abajo":
				if(nivelactual.posValida(x, y+32)==true) {
					direccion="abajo";
					moviendose=true;
				}
				break;
			case "derecha":
				if(nivelactual.posValida(x+32, y)==true) {
					direccion="derecha";
					moviendose=true;
				}
				break;
			case "izquierda":
				if(nivelactual.posValida(x-32, y)==true) {
					direccion="izquierda";
					moviendose=true;
				}
				break;
			}
			
		}
		
	}

}
