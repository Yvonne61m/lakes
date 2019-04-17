class Lake {
    surface: number
    volume: number
    constructor(surface: number, volume: number) {
        this.surface = surface
        this.volume = volume
    }
}

export function countLakes(input: number[], board: string[][]): Array<Lake> {
    let lakes: Array<Lake> = []
    let tempIndex: number = 0
    let tempHeight: number = input[0]
    let tempSurface: number = 0
    let tempVolume: number = 0

    // find the max height and its index in the input array
    let maxHeight: number = 0
    let maxIndex: number = 0
    for (let i = 0; i < input.length; i++) {
        if (input[i] > maxHeight) {
            maxHeight = input[i]
            maxIndex = i
        }
    }

    //find lakes in the left part
    for (let i = 1; i <= maxIndex; i++) {
        if (input[i] < tempHeight) {
            tempVolume += tempHeight - input[i]
            tempSurface = i - tempIndex
        } else {
            tempIndex = i
            let helper = tempHeight
            tempHeight = input[i]
            if (tempSurface > 0) {
                let currentLake: Lake = new Lake(tempSurface, tempVolume)
                lakes.push(currentLake)
                for (let row = maxHeight - helper; row < maxHeight; row++) {
                    for (let col = i - 1; col > i - 1 - tempSurface; col--) {
                        if (board[row][col] != '|') {
                            board[row][col] = 'x'
                        }
                    }
                }
                tempVolume = 0
                tempSurface = 0
            }
        }
    }

    // find lakes in the right part
    for (let i = input.length - 1, tempHeight = input[i], tempIndex = i, tempSurface = 0, tempVolume = 0; i >= maxIndex; i--) {
        if (input[i] < tempHeight) {
            tempVolume += tempHeight - input[i]
            tempSurface = tempIndex - i
        } else {
            tempIndex = i
            let helper:number = tempHeight
            tempHeight = input[i]
            if (tempSurface > 0) {
                let currentLake: Lake = new Lake(tempSurface, tempVolume)
                lakes.push(currentLake)
                for (let row = maxHeight - helper; row < maxHeight; row++) {
                    for (let col = i + 1; col < i + 1 + tempSurface; col++) {
                        if (board[row][col] != '|') {
                            board[row][col] = 'x'
                        }
                    }
                }
                tempVolume = 0
                tempSurface = 0
            }
        }
    }
    return lakes
}     

//convert the input to a board
export function drawBoard(input: number[]): string[][] {
    let max: number = input[0]
    let maxIndex: number = 0
    for (let i = 0; i < input.length; i++) {
        if (input[i] > max) {
            max = input[i]
            maxIndex = i
        }
    }
    let board: string[][] = []
    for (let i = 0; i < max; i++) {
        board[i] = [] 
        for (let j = 0; j < input.length; j++) {
             if (input[j] + i >= max) {
                 board[i][j] = "|"
             } else {
                 board[i][j] = " "
             }
        }
    }
    return board
}

function printBoard(board: string[][]) {
    if (board.length < 1 || board[0].length < 1) {
        return
    }
    let m = board.length
    let n = board[0].length
    for (let i = 0; i < m; i++) {
        let s: string = ""
        for (let j = 0; j < n; j++) {
            s += board[i][j]
        }
        console.log(s)
    }
}

function printLakes(lakes: Array<Lake>) {
    if (lakes.length == 0) {
        console.log("No lakes here.")
    }
    if (lakes.length == 1) {
        console.log(`There is a single lake here:`)
    } 
    if (lakes.length > 1) {
        console.log(`There are ${lakes.length} lakes here:`)
    }
    for (let i = 0; i < lakes.length; i++) {
        console.log(`Lake ${i + 1}: `)
        console.log(`Its surface is ${lakes[i].surface} unit` + isPlural(lakes[i].surface))
        console.log(`Its volume is ${lakes[i].volume} unit` + isPlural(lakes[i].volume))
    }
}

function isPlural(num: number): string {
    let result: string = ""
    if (num > 1) {
        result = "s"
    }
    return result
}

function printResults (input: number[]) {
    console.log(`Given Input: [${input.toString()}]`)
    let board = drawBoard(input)
    let lakes = countLakes(input, board)
    printLakes(lakes)
    console.log(`A representation is: `)
    printBoard(board)
    console.log("")
}

printResults([1, 1, 4, 2, 1, 3])
printResults([2, 0, 0 ,1])
printResults([1, 0,0, 2])
printResults([1, 0, 0, 1])
printResults([3, 0, 0, 2, 0, 4])
printResults([1,4,2,5,0,6,2,3,4])
printResults([0,0,0,0])
printResults([1,1,1,1])