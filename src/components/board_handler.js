export async function fetchPokemon(url) {
    let pokemon;

    try {
        pokemon = await fetch(url);
    } 
    catch(error) {
        console.log(error);
        return null;
    }

    let pokeData = await pokemon.json();
    
    return pokeData;
}

export function newBoard(memory, current) {
    const collection = [...memory, ...current];
    const newRandoms = [];

    for(let i = 0; i < 8; i++) {
        let fromCollection;
        do {
            fromCollection =  collection[rangedRandom(collection.length - 1, 100)];
        } while(newRandoms.includes(fromCollection));
        newRandoms.push(fromCollection);
    }

    for(let i = 0; i < 3; i++) {
        let randomed;
        do {
            randomed =  rangedRandom(700, 1000);
        } while(newRandoms.includes(randomed));
        newRandoms[rangedRandom(7, 10)] = randomed;
    }
    
    return newRandoms;
}

export function generateRandoms(size, max) {
    const randoms = [];
    
    for(let i = 0; i < size; i++) {
        let rand;

        do {
            rand = rangedRandom(max, 1000);
        } while(randoms.includes(rand))
        
        randoms.push(rand);
    }

    return randoms;
}

export function rangedRandom(max, range) {
    let random = Math.floor((Math.random() + 1) * range);
    
    if(random > max)
        return random % (max + 1);
    else 
        return random;
}

// babonize(4, 7);

// function babonize(count, max) {
//   for(let i = 0; i < count; i++) {
//     let ah = rangedRandom(max, 10); 
//     console.log(ah); 
//   }
// } 