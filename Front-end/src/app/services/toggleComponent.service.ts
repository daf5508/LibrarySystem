import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ToggleComponent {

    emitMinimizeFilterClicked = new EventEmitter<{isFilterMaximized: boolean, isFilterMinimized: boolean}>();
    emitMaximizeFilterClicked = new EventEmitter<{isFilterMaximized: boolean, isFilterMinimized: boolean}>();

    onMinimizeFilterClicked(isFilterMaximized: boolean = false, isFilterMinimized: boolean = true) {
        this.emitMinimizeFilterClicked.emit({isFilterMaximized, isFilterMinimized});
    }

    onMaximizeFilterClicked(isFilterMaximized: boolean = true, isFilterMinimized: boolean = false) {
        this.emitMaximizeFilterClicked.emit({isFilterMaximized, isFilterMinimized});
    }
}