import java.awt.Canvas;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.image.BufferStrategy;
import java.awt.image.BufferedImage;

public class Game extends Canvas implements Runnable,KeyListener{

	private static final int ANCHO = 672;
	private static final int LARGO = 672;
	private boolean running = false;
	private Thread thread;

	private BufferedImage image = new BufferedImage(WIDTH, HEIGHT, BufferedImage.TYPE_INT_RGB);

	private GameController  gameController;
	
	public Game() {
		setPreferredSize(new Dimension(ANCHO, LARGO));
	}
	
	public void init() {
		System.out.println("Iniciar");
		requestFocus();
		gameController=new GameController();
		addKeyListener(this);
	}
	
	public synchronized void start() {
		if (running)
			return;
		running = true;
		thread = new Thread(this);
		thread.start();
	}

	private synchronized void stop() {
		if (!running)
			return;
		running = false;
		try {
			thread.join();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		System.exit(1);
	}

	public void run() {
		init();
		while (running) {
			actualizar();
			render();
			try {

				Thread.sleep(10);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		stop();
	}

	private void actualizar() {
		gameController.actualizar();
	}

	private void render() {
		BufferStrategy bufferStrategy = getBufferStrategy();
		if(bufferStrategy==null) {
			createBufferStrategy(3);
			return;
		}
		Graphics graphics = bufferStrategy.getDrawGraphics();
		

		graphics.drawImage(image, 0, 0, getWidth(), getHeight(), this);
		gameController.renderizar(graphics);
		bufferStrategy.show();
		graphics.dispose();
	}
	
	public void keyPressed(KeyEvent e) {
		gameController.getNivelActual().keyPressed(e);
		
	}

	public void keyReleased(KeyEvent e) {
		gameController.getNivelActual().keyReleased(e);
	}

	@Override
	public void keyTyped(KeyEvent e) {
		
	}

}
