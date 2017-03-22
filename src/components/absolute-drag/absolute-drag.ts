import { Directive, Input, ElementRef, Renderer } from '@angular/core';
import { DomController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Database } from '../../database';
 
@Directive({
  selector: '[absolute-drag]',
  host: { 
    // '(panstart)': 'panstart($event)',
    '(panmove)': 'handlePan($event)',
    // '(panend)': 'panend($event)',
    '(touchstart)': 'touchstart($event)',
    '(touchend)': 'touchend($event)',
    // '(pinch)': 'handlePinch($event)',
    // '(press)': 'press($event)',
    // '(pressup)': 'pressup($event)'
  }
})
export class AbsoluteDrag {

    @Input('startLeft') startLeft: any;
    @Input('startTop') startTop: any;

    offsetY: number = 0;
    movestartX: number;
    movestartY: number;
    itemX: number;
    itemY: number;
    A: any;

    // pressTimer: number = 0;
    // deltaTime: number = 0;

    // isDeleteIcon: boolean = true;

    constructor (
        public element: ElementRef, 
        public db: Database, 
        public domCtrl: DomController, 
        public renderer: Renderer, 
        public storage: Storage
    ) {}
 
    ngAfterViewInit() {
 
        // this.storage.set('offsetY', 0 );

        this.renderer.setElementStyle(this.element.nativeElement, 'position', 'absolute');
        this.renderer.setElementStyle(this.element.nativeElement, 'left', this.startLeft + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'top', this.startTop + 'px');
 
        let hammer = new window['Hammer'](this.element.nativeElement);
        hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_ALL });
        // hammer.get('pinch').set({ enable: true });

        // hammer.on('touchstart', (ev) => {
        //   this.touchstart(ev);
        // });
        // hammer.on('touchend', (ev) => {
        //   this.touchend(ev);
        // });
        hammer.on('panmove', (ev) => {
          this.handlePan(ev);
        });
        // hammer.on('press', (ev) => {
        //   this.press(ev);
        // });
        // hammer.on('panmove', (ev) => {
        //   this.handlePanmove(ev);
        // });
        // hammer.on('panend', (ev) => {
        //   this.handlePanend(ev);
        // });
        // hammer.on('pinch', (ev) => {
        //   this.handlePinch(ev);
        // });
 
    }

    touchstart(ev) {

        if (ev.target.className !== "background") {
            
            let which = ev.target;
            let touch = ev.changedTouches[0];

            this.movestartX = touch.pageX;
            this.movestartY = touch.pageY ;

            this.storage.get('offsetY').then( data => {
                data ? this.offsetY = data : 0 ;

                console.log("touchend. GET offsetY  ", this.offsetY);

                this.itemX = this.movestartX - which.x; // item position X center
                this.itemY = this.movestartY - which.y + this.offsetY; // item position Y center    
                // console.log(this.movestartY, which.y, this.offsetY);
            });
        }

        console.log("touchstart: ", ev);
    }

    touchend(ev) {

        if (ev.target.className == "background") {

            if (ev.target.y === 0) {

                this.storage.set('offsetY', ev.target.y + 1);
            
            } else {

                this.storage.set('offsetY', ev.target.y); 
            }

            // console.log("touchend. SET offsetY  ", ev.target.y, typeof(ev.target.y));
        }
    }


    handlePan(ev){

        if (ev.target.className !== "background") {

            let newLeft = this.movestartX + ev.deltaX - this.itemX;
            let newTop = this.movestartY + ev.deltaY - this.itemY;
            // console.log("handle pan movestartX", this.movestartX, this.movestartY);

            this.domCtrl.write(() => {
                this.renderer.setElementStyle(this.element.nativeElement, 'left', newLeft + 'px');
                this.renderer.setElementStyle(this.element.nativeElement, 'top', newTop + 'px');
            });

        } else {

            this.domCtrl.write(() => {
                this.renderer.setElementStyle(this.element.nativeElement, 'touchAction', 'inherit');
            });

        }
 
    }


    public AA() {
        console.log("AAA");
        return "B";
    }
    // press(ev) {
        
    //     this.deltaTime = ev.timeStamp;
    //     this.pressTimer = setTimeout(() => {
    //         console.log("press ");
    //         this.isDeleteIcon = false;
    //     }, 2000);
    // }

    // pressup(ev) {
    //     console.log("pressup");

    //     // clear timer if pressed not long enough
    //     if (ev.timeStamp - this.deltaTime < 1500) { // 1500 - time in ms
    //         clearTimeout(this.pressTimer);
    //     }

    // }
    // handlePanmove(ev) {
    //     console.log("handlePanmove ",ev);
    // }
    // handlePanend(ev) {
    //     console.log("handlePanend ",ev);
    // }




    handlePinch(ev) {
        console.log("PINCH ",ev);
         
        // console.log("SCALE ",ev.scale);

        // let scale = ev.scale;

        // let oldHeight = ev.target.height;
        // let oldWidth = ev.target.width;

        // let newHeight = oldHeight * scale;
        // let newWidth = oldWidth * scale;

        // let translateX = (scale * (newWidth - oldWidth)) / newWidth;

        // console.log(translateX, oldHeight, scale, newWidth);


        // ev.target.height *= ev.scale;
        // ev.target.width *= ev.scale;


        // this.domCtrl.write(() => {
        //     // console.log(ev);
        //     // this.renderer.setElementStyle(this.element.nativeElement, 'overflowY', 'scroll');
        //     this.renderer.setElementStyle(this.element.nativeElement, 'transformOrigin', 'left, top');
        //     // this.renderer.setElementStyle(this.element.nativeElement, 'transform', 'translateX('+translateX+'px)');
        // });


        // translateX = (scalePointX * (newWidth - oldWidth)) / newWidth;
    }
 
}