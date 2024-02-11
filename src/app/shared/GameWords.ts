export class GameWords {
    userinput: string = "";
    isCorrect: boolean = false;
    
    constructor(public origin: string,
                public target: string) {
    }
}