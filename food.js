function Food(options) {
    options = options || {};
    this.width = options.width || 50;
    this.height = options.height || 50;
    this.bgColor = options.bgColor || "blue";
    this.x = options.x || 0;
    this.y = options.y || 0;
}
Food.prototype.render = function (target) {
    var div = document.createElement("div");
    div.style.width = this.width + "px";
    div.style.height = this.height + "px";
    div.style.backgroundColor = this.bgColor;
    var m = target.offsetWidth/this.width;
    var n = target.offsetHeight/this.height;
    this.x = parseInt(Math.random() * m);
    this.y = parseInt(Math.random() * n);    
    div.style.position = "absolute";
    div.style.left = this.x * this.width + "px";
    div.style.top = this.y * this.height + "px";
    target.appendChild(div);
}