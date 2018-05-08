// 蛇的方法：渲染、移动
function Snake(options) {
    options = options || {};
    this.width = options.width || 50;
    this.height = options.height || 50;
    this.headColor = options.headColor || "lime";
    this.bodyColor = options.bodyColor || "pink";
    this.direction = "right";
    this.body = [
        {x:2, y:0},
        {x:1, y:0},
        {x:0, y:0},
    ]
}
Snake.prototype.render = function (target) {
    for (var i = 0; i < this.body.length; i++) {
        var span = document.createElement("span");
        span.style.width = this.width + "px";
        span.style.height = this.height + "px";
        span.style.backgroundColor = i === 0? this.headColor : this.bodyColor;
        span.style.position = "absolute";
        span.style.left = this.body[i].x * this.width + "px";
        span.style.top = this.body[i].y * this.width + "px";
        target.appendChild(span);
    }
}

Snake.prototype.move = function (target, food) {
    var newNode = {
        x: this.body[0].x,
        y: this.body[0].y,
    }
    switch (this.direction) {
        case "left":
        newNode.x--;
        break;
        case "right":
        newNode.x++;
        break;
        case "up":
        newNode.y--;
        break;
        case "down":
        newNode.y++;
        break;
    }
    this.body.unshift(newNode);
    if (newNode.x === food.x && newNode.y === food.y) {
        var div = target.querySelector("div");
        target.removeChild(div);
        food.render(target);
    } else {
        this.body.pop();
    }
    var spans = target.querySelectorAll("span");
    for (var i = 0; i < spans.length; i++) {
      target.removeChild(spans[i]);
    }
    this.render(target);
}