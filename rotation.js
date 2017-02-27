
function extend(o1, o2){
		for(var i in o2){
			if(o1[i] === undefined){
				o1[i] = o2[i];
			}
		}
	}
/*
*moveTime:移动时间
*interval:间隔
*/
function Rotation(moveTime,interval){
	this.moveTime = moveTime;
	this.interval = interval;
	this.oImgBox = document.querySelector('.images');
	this.oImg = this.oImgBox.querySelectorAll('li');
	this.oClick = document.querySelector('.click');
	this.oListbutton = this.oClick.querySelectorAll('li');
	this.btnLeft = document.querySelector('.btnLeft');
	this.btnRight = document.querySelector('.btnRight');
	this.imgWidth= this.oImg[0].offsetWidth;
	this.length = this.oImg.length;
	this.timers=null;
	this.index = 1;

}

extend(Rotation.prototype,{

	active:function(){
		var _this = this;
		this.oImgBox.style.width =  this.imgWidth * this.length + 'px';

		this.btnLeft.onclick = function(){
			if (_this.oImgBox.offsetLeft < 0 ) {
				_this._btnBothSides(_this.index-2);
			}
			
		}
		
		this.btnRight.onclick = function(){
			if (_this.oImgBox.offsetLeft > -(_this.imgWidth*(_this.length-2))) {
				_this._btnBothSides(_this.index);
			}	

		}
		this._rotation();
		this._hover();
	},
	/*定时器*/
	_rotation:function(){
		var _this = this;
		setTimeout(function rotation(){
			var oImgLeft = _this.oImgBox.offsetLeft;
			var oImgStyle = _this.oImgBox.style;
			if (oImgLeft == -(_this.imgWidth*(_this.length-1))) {
				oImgStyle.transitionDuration = '0s';
				oImgStyle.left = 0+'px';
				_this.index = 0;
			}else{
				oImgStyle.transitionDuration = _this.moveTime+'s';
			}

			oImgStyle.left = '-'+ (_this.index * _this.imgWidth)+'px';
			_this.index ++;

			_this._removeblack();

			if(_this.index == _this.length){
				_this.oListbutton[0].classList.add('black');
			}else{
				_this.oListbutton[_this.index - 1].classList.add('black');
			}
			

			if(oImgLeft > -(_this.imgWidth * _this.length)){
				_this.timers = setTimeout(rotation,(_this.interval+_this.moveTime)*1000)
			}

		},(_this.interval+_this.moveTime)*1000)
	},
	/*点击按钮图片滚动*/
	_hover:function(){
		var _this=this;
		for(var i = 0;i < this.oListbutton.length;i++){
			this.oListbutton[i].index = i;
			this.oListbutton[i].onclick =function(){
					_this._removeblack();
					this.classList.add('black');
					var j = this.index;
					_this.oImgBox.style.left = '-' + j* _this.imgWidth + 'px';
					_this.index = this.index;
				
			}
		}
	},
	_btnBothSides:function(num){
			this.oImgBox.style.left = '-' + num* this.imgWidth + 'px';
			this.index = num + 1;
			this._removeblack();
			this.oListbutton[num].classList.add('black');
	},
	_removeblack:function(){
		for(var a=0;a<this.oListbutton.length;a++){
			this.oListbutton[a].classList.remove('black');
		}
	}

})


