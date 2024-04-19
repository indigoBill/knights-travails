class Node{
    constructor(position){
        this.position = position;
        this.parent = null;
    }
}

function knightMoves(start, end){
    function displayError(){
        console.log('Input valid start or end position. Values must be between 0 - 7, inclusive');
    }

    function coordinatesValid(startPosition, endPosition){
        const arr = startPosition.concat(endPosition);
        let passed = 0;

        arr.forEach((value) => {
            if(value >= 0 && value <= 7) passed++;
        });

        if(passed !== arr.length) return false;
        else return true;
    }

    function createNodeFromCoordinates(xCoor, yCoor, parent){
        if(xCoor >= 0 && xCoor <= 7){
            if(yCoor >= 0 && yCoor <= 7){
                const node = new Node([xCoor, yCoor]);
                node.parent = parent;

                return node;
            }
        }
    }

    function createAdjacencyList(startPosition, parent = null){
        const startNode = new Node(startPosition);
        const possibleMovesArr = [];
        let xCoor;
        let yCoor;

        if(!(coordinatesValid(start, end))) return;

        startNode.parent = parent;

        const POSSIBLE_PLAYS = [[1,2],[-1,2],[-2,1],[2,1],[-1,-2],[1,-2],[-2,-1],[2,-1]];

        function getPossibleMoves(arr){
            xCoor = startPosition[0] + arr[0];
            yCoor = startPosition[1] + arr[1];

            const finalCoor = createNodeFromCoordinates(xCoor, yCoor, startNode);

            if(finalCoor) return finalCoor;
        }

        POSSIBLE_PLAYS.map(getPossibleMoves).forEach((ele) => {
            if(ele) possibleMovesArr.push(ele);
        });

        return possibleMovesArr;
    }

    function breadthFirstSearch(){
        const queue = [];
        const arr = createAdjacencyList(start);
        let endCoor;

        function addToQueue(arr){
            arr.forEach((coor) => {
                const coorNum = Number(coor.position[0].toString() + coor.position[1].toString());
                const endNum = Number(end[0].toString() + end[1].toString());

                if(coorNum !== endNum) queue.push(coor);
                else endCoor = coor;
            });

            if(endCoor) return;

            const currMove = queue.shift();

            addToQueue(createAdjacencyList(currMove.position, currMove.parent));
        }

        if(arr) addToQueue(arr);

        return endCoor;
    }

    function buildShortestPath(endPosition){
        const shortestPath = [];

        function recBuildShortestPath(node){

            if(!node.parent){
                shortestPath.unshift(node.position);
                return;
            }

            shortestPath.unshift(node.position);

            return recBuildShortestPath(node.parent);
        }

        recBuildShortestPath(endPosition);

        return shortestPath;
    }

    const node = breadthFirstSearch();

    if(node){
        const shortestPath = buildShortestPath(node);

        console.log(`YOU MADE IT IN ${shortestPath.length - 1} MOVES! HERE'S YOUR PATH:`);

        shortestPath.forEach((move) => {
            console.log(move);
        });

    }else{
        displayError();
    }
}