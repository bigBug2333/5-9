(function (window) {
//游戏对象： 管理了和游戏相关的所有的对象，控制游戏什么时候开始，什么时候暂停，什么时候结束。分数
  /*
   游戏对象：管理了和游戏相关的所有的对象
   //属性：
   蛇   ：自己创建
   食物 : 自己创建
   地图 ：传递
   //方法：
   开始游戏
   */
  function Game(map) {
    this.snake = new Snake();
    this.food = new Food();
    this.map = map;
    this.timeId;
  }

  //渲染
  //extend
  Game.prototype.render = function () {
    this.snake.render(this.map);
    this.food.render(this.map, this.snake);
  }

  //注册keyup事件，控制蛇的移动
  Game.prototype.addEvent = function () {
    var that = this;
    //3. 给document注册keyup事件，要获取到按下的键盘码
    document.addEventListener("keyup", function (e) {
      //根据e.keyCode修改蛇的方向
      switch (e.keyCode) {
        case 37:
          if (that.snake.direction !== "right") {
            that.snake.direction = "left";
          }
          break;
        case 38:
          if (that.snake.direction !== "down") {
            that.snake.direction = "up";
          }

          break;
        case 39:
          if (that.snake.direction !== "left") {
            that.snake.direction = "right";
          }
          break;
        case 40:
          if (that.snake.direction !== "up") {
            that.snake.direction = "down";
          }

          break;
      }
    });
  }

  //开始游戏
  Game.prototype.startGame = function () {
    var that = this;
    this.timeId = setInterval(function () {//里面的this指的是window
      that.snake.move(that.map, that.food);

      //判断撞墙的逻辑，蛇头出去了
      var head = that.snake.body[0];
      if(head.x < 0 || head.y < 0 || head.x > that.map.offsetWidth/that.snake.width -1 || head.y > that.map.offsetHeight/that.snake.height -1){
        alert("游戏结束，再接再厉");
        that.stopGame();
      }

      //判断撞身体的逻辑
      //判断蛇头是否和蛇的身体重合，如果重合了，说明撞身体
      for(var i = 4; i < that.snake.body.length; i++) {
        if(head.x === that.snake.body[i].x && head.y === that.snake.body[i].y) {
          alert("恭喜你，吃到自己了，游戏结束");
          that.stopGame();
        }
      }

    }, 100);
  }

  //停止游戏
  Game.prototype.stopGame = function () {
    clearInterval(this.timeId);
  }

  //游戏对象： g.snake  g.food  g.map
  Game.prototype.start = function () {
    //1. 把蛇和食物渲染出来, 外面的this表示的就是游戏
    this.render();

    //2. 注册事件
    this.addEvent();

    //3. 开始游戏
    this.startGame();

  }


  var num = 456;

  //对外暴漏Game函数
  window.Game = Game;
})(window);