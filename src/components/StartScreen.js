import "./StartScreen.css";

const StartScreen = ({ handleStartGame }) => {
    return (
        <div className="startScreen">
            <h1>Secret Word!</h1>
            <p>Clique no botão abaixo para começar a jogar...</p>
            <button onClick={handleStartGame}>Começar o jogo</button>
        </div>
    );
};

export default StartScreen;
