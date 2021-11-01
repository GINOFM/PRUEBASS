
public class Nivel1 extends NivelJugable{

	private int[][] grilla  = { 
			{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0}, 
			{0,1,1,9,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0}, 
			{0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0}, 
			{0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0}, 
			{0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0}, 
			{0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0}, 
			{0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0}, 
			{0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0}, 
			{0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0}, 
			{0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0}, 
			{0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0}, 
			{0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0}, 
			{0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0}, 
			{0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0}, 
			{0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0}, 
			{0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0}, 
			{0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0}, 
			{0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0}, 
			{0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0}, 
			{0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0},
			{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0}
	};
	private int indice;
	private FactoryDominio factory=new FactoryDominio1();
	
	public Nivel1(GameController gamecontroller) {
		super(gamecontroller);
		
		System.out.println((64/32));
	}

	@Override
	public void iniciar() {
		for(int xx=0;xx<20;xx++) {
			for(int yy=0;yy<20;yy++) {
				crearObjeto(xx,yy);
			}
		}
	}
	
	private void crearObjeto(int xx,int yy) {
		indice=grilla[xx][yy];
		int separacion=32;
		Entidad entidad;
		switch(indice) {
		case 0:break;
		case 1:
			listaEntidades.add(factory.crearPacDot(xx*separacion,yy*separacion,this));
			break;
		case 2:break;
		case 9:
			jugador=(Jugador) factory.crearJugador(xx*separacion,yy*separacion,this);
			listaEntidades.add(jugador);
			grilla[1][3]=1;
			break;
		}
		
	}
	
	public boolean posValida(int xx,int yy) {

		boolean toReturn=false;
		int valorXX=(xx/32);
		int valorYY =(yy/32);
		if(valorXX>-1 && valorYY>-1)
			if(grilla[valorXX][valorYY]!=0)
				toReturn=true;

		
		return toReturn;
	}
	
}
