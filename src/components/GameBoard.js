import React, { useState, useEffect } from 'react';
import uniqid from "uniqid";
import {fetchPokemon, generateRandoms, newBoard} from "./board_handler";

const GameBoard = (props) => {
    const [memory, setMemory] = useState([]);
    const [randomPokes, setRandomPokes] = useState(generateRandoms(8, 700));

    const [currentScore, setCurrentScore] = useState(0);
    const [topScore, setTopScore] = useState(localStorage.getItem("topScore") ? parseInt(localStorage.getItem("topScore")) : 0);
    
    const evaluateClicked = (pokeId) => {
        if(memory.includes(pokeId)) {
            if(currentScore > topScore) {
                localStorage.setItem("topScore", memory.length);
                setTopScore(parseInt(localStorage.getItem("topScore")));
            }
            setCurrentScore(0);
            setRandomPokes(generateRandoms(8, 700));    
        }
        else {
            setMemory([...memory, pokeId]);
            setCurrentScore(currentScore + 1);  
            setRandomPokes(newBoard(memory, randomPokes));
        }
    }

    return (
        <div id="gameboard">
            <div id="scoreboard" className="bold">
                <span>
                    Current Score: {currentScore}
                </span>
                <span>
                    Top Score: {topScore}
                </span>
            </div>
            <CardPicker randomPokes={randomPokes} evaluateClicked={evaluateClicked}/>
        </div>
    )
}

const CardPicker = (props) => {
    const {randomPokes} = props;
    
    return (
        <div id="card-picker">
            {randomPokes.map(pokeId => (
                <PokeCard  pokeId={pokeId} key={uniqid()} evaluateClicked={props.evaluateClicked}/>
            ))}
        </div>
    );
}

const PokeCard = (props) => {
    const [pokemon, setPokemon] = useState(undefined);
    const [picked, setPicked] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const pokeUrl = `https://pokeapi.co/api/v2/pokemon/${props.pokeId}`;

        if(isMounted) {
            (async () => {
                setPokemon(await fetchPokemon(pokeUrl));
            })();
        }

        return () => {
            setIsMounted(false);
        }
    }, [isMounted]);

    const pickCard = () => {
        setPicked(true);
        props.evaluateClicked(props.pokeId);
    }  

    if(picked) {
        return null;
    } else {
        return (
            <div className="card" onClick={pickCard}>
                {pokemon &&
                    <>
                        <CardImage 
                            src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`} 
                            alt={pokemon.name} 
                        />
                        <CardInfo pokeDetail={pokemon}/>
                    </>
                }
            </div>
        );
    }
}

const CardImage = (props) => {
    return (
        <div className="card-image">
            <img src={props.src} alt={props.alt}/>
        </div>
    );
}

const CardInfo = (props) => {
    const {id, name, types} = props.pokeDetail; 

    return (
        <>  
            <div className="card-id-name">
                <div className="card-name">{name.toUpperCase()}</div>
                <div className="card-id">#{id}</div>
            </div>
            <div className="card-types">
                {types.map(e => (
                    <span className={e.type.name} key={uniqid()}>{e.type.name}</span>
                ))}
            </div>
        </>
    );
}

export default GameBoard;