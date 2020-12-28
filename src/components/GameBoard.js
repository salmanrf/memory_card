import React, { useState, useEffect } from 'react';

const GameBoard = (props) => {
    return (
        <div id="gameboard">
            <div id="scoreboard" className="bold">
                <span>
                    Current Score: {}
                </span>
                <span>
                    Top Score: {}
                </span>
            </div>
        </div>
    )
}

const CardList = (props) => {

}

export default GameBoard;