import React from 'react';

const boxColor = () => {
    let r = Math.floor(Math.random()*205) + 50;
    let g = Math.floor(Math.random()*205) + 50;
    let b = Math.floor(Math.random()*205) + 50;
    return [r,g,b]
}



const ScoreBoard = ({ scores }) => {

    function compare(a,b) {
        if (a.score < b.score) {
            return 1
        } else if (a.score > b.score) {
            return -1
        }
        return 0
    }

    // sort scores and have them rank from top to bottom
    scores = scores.sort(compare)

    // Display them
    const display = scores.map((e,i) => {
        let [ r, g, b ] = boxColor();
        return (

        <div className='score' key={i}>
            <h3 className='rank'>{i+1}.</h3>
            <h3>{e.name}</h3>
            <h3>{ e.score }</h3>
            <div className='points outer'>
                <div className='inner'
                    style={{
                        width: `${(e.score/scores[0].score) * 100}%`,
                        backgroundColor: `rgb(${r}, ${g}, ${b})`,
                        boxShadow: '1px 1px 10px gray'
                    }}>
                </div>
            </div>
        </div>
    )}
    )
    return (
        <>
            { display }
        </>
    );
};

export default ScoreBoard;
