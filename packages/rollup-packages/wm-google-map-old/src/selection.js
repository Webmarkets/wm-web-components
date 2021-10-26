export class XSelection {
    constructor(selectCallback) {
        this.multi = false;
        this.selection = [];
        this.selectCallback = selectCallback;
    }
    get() {
        return this.multi ? this.selection.slice() : this.selection[0];
    }
    clear(excludes) {
        this.selection.slice().forEach(item => {
            if (!excludes || excludes.indexOf(item) < 0)
                this.setItemSelected(item, false);
        });
    }
    isSelected(item) {
        return this.selection.indexOf(item) >= 0;
    }
    setItemSelected(item, isSelected) {
        if (item == null || isSelected == this.isSelected(item))
            return;
        if (isSelected) {
            this.selection.push(item);
        }
        else {
            var i = this.selection.indexOf(item);
            if (i >= 0) {
                this.selection.splice(i, 1);
            }
        }
        if (this.selectCallback) {
            this.selectCallback(item, isSelected);
        }
    }
    select(item) {
        if (this.multi) {
            this.toggle(item);
        }
        else if (this.get() !== item) {
            this.setItemSelected(this.get(), false);
            this.setItemSelected(item, true);
        }
    }
    toggle(item) {
        this.setItemSelected(item, !this.isSelected(item));
    }
}
//# sourceMappingURL=selection.js.map