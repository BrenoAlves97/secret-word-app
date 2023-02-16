import "./GameOverStage.css";

const GameOverStage = ({ retry, score }) => {
    return (
        <div>
            <h1>Fim de Jogo!</h1>
            <h2 className="scoreMessage">
                Pontuação final: <span> {score} </span>
            </h2>
            <button onClick={retry}>Resetar Jogo</button>
        </div>
    );
};

export default GameOverStage;
