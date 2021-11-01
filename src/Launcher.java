

import javax.swing.JFrame;

public class Launcher {

	public static void main(String[] args) {
		Game game = new Game();
		JFrame frame = new JFrame();

		frame.add(game);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setResizable(false);
		frame.addKeyListener(game);
		frame.setVisible(true);
		frame.pack();
		frame.setLocationRelativeTo(null);

		game.start();
	}

}
