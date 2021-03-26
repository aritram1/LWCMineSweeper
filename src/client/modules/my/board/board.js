/* eslint-disable no-empty */
/* eslint-disable no-alert */
/* eslint-disable radix */
/* eslint-disable for-direction */
import { LightningElement, track, api } from 'lwc';
const LIMIT = 3;

export default class Board extends LightningElement {

    @track board = [];
    @track timerValue = 0;
    @track timerId;
    @track running = false;
    @track size = 10;
    @track score = 0;
    @track openedMines=0;

    get buttonName(){
        return this.running ? 'Stop' : 'Start';
    }

    constructor(){
        super();
        this.running = true;
        this.board = this.generateBoard();
    }

    handleBoxClick(e){
        let boxId = e.target.getAttribute('data-bid');
        console.log('boxId is-> ' + boxId);
        //let boxInDOM = this.template.querySelector(`[data-bid="${boxId}"]`);
        let box = this.board[parseInt(boxId)];
        box.hidden = false;
        this.score = this.score + 1;
        if(box.hasMine){
            this.openedMines = this.openedMines + 1;
            console.log('this.openedMines-->' + this.openedMines);
            if(this.openedMines === LIMIT){
                this.reset();
            }
            //else{}
        }
        else{
            
        }
        //let box =  this.template.querySelector(`[data-bid="${boxId}"]`);
    }
    reset(){
        clearInterval(this.timerId);
        this.running = false;
        alert(`You hit ${this.openedMines} mine!`);
    }
    timerFunction(){
        console.log('-->' + this.timerValue);
        this.timerValue = this.timerValue + 1000;
    }

    handleStartStop(e){
        if(this.running){
            this.running = false;
            //this.timerValue = 0;
            console.log('The timer is getting to stop')
            clearInterval(this.timerId);
        }
        else{
            console.log('The timer is getting to start')
            this.timerValue = 0;
            this.running = true;
            this.timerId = setInterval(this.timerFunction,1000);
        }
    }

    handleMatrixSizeChange(e){
        console.log('Size received as => ' + e.target.value);
        this.size = e.target.value;
    }
    generateBoard(){
        let board = [];
        console.log('hi');
        for(let i=0; i<this.size; i++){
            for(let j=0; j<this.size; j++){
                board.push({
                    id: '' + i + j,
                    hasMine: Math.random(1) > 0.5,
                    hidden: true
                });
            }
        }
        this.board = board;
        this.score = 0;
        console.log('reached end of generateboard');
    }
    

    // connectedCallback(){
    //     if(!this.board){
    //         this.board = this.generateBoard();
    //     }
    //     console.log(JSON.stringify(this.board));
    // }


    // generateChessBoard(){
    //     let board = [];
    //     console.log('hi');
    //     for(let i=8; i>=1; i--){
    //         for(let j=65; j<=72; j++){
    //             board.push({
    //                 id: String.fromCharCode(j) + '' + i
    //             });
    //         }
    //     }
    //     console.log('reached end of generateboard');
    //     return board;
    // }

}