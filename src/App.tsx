import { useRef, useState } from "react";
import "./App.scss";

function App() {
	const left = useRef(null);
	const [isResetScheduled, setIsResetScheduled] =
		useState(false);
	const [ballPosition, setBallPosition] = useState<{
		x: number;
		y: number;
	}>({ x: 0, y: 0 });
	const initialX = window.innerWidth - 200;
	const initialY = window.innerHeight - 200;
	const handleClick = (
		e: React.MouseEvent<HTMLButtonElement>,
	) => {
		const targetX = e.pageX;
		const targetY = e.pageY;

		console.log(e.target);
		const clampedX = Math.max(0, Math.min(initialX, targetX));
		const clampedY = Math.max(0, Math.min(initialY, targetY));

		setBallPosition({ x: clampedX, y: clampedY });

		setIsResetScheduled(true);
		// Schedule the reset after 40 seconds (40,000 milliseconds)
		setTimeout(() => {
			setBallPosition({ x: 0, y: 0 });
			setIsResetScheduled(false);
		}, 10000);
	};

	return (
		<>
			<div className="App">
				<h2>Hello World</h2>

				<div
					className="ball"
					onTransitionEndCapture={() => {
						console.log("onAnimationEnd");
					}}
					style={{
						transform: `translate(${
							ballPosition.x ? ballPosition.x : initialX
						}px, ${ballPosition.y ? ballPosition.y : initialY}px)`,
					}}>
					<h3>ProFile</h3>
				</div>
				<div className="btns">
					<button
						onClick={handleClick}
						ref={left}>
						Left
					</button>
					<button onClick={handleClick}>Right</button>
				</div>
			</div>
		</>
	);
}

export default App;