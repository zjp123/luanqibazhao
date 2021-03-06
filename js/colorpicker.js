var Class = {
  create: function() {
      return function() {
          this.initialize.apply(this, arguments);
      }
  }
}
var extend = function(destination, source) {
  for (var property in source) {
      destination[property] = source[property];
  }
  return destination;
}
var ColorPicker =  Class.create();//我们的富文本编辑器类
ColorPicker.prototype = {
  initialize:function(options){
      this.setOptions(options);
      this.drawPicker(this.options.textfield_id);
  },
  setOptions:function(options){
      this.options = { //这里集中设置默认属性
          id:'colorpicker'+ new Date().getTime(),
          textfield_id:null//用于textarea的ID,也就是我们的必选项
      }
      extend(this.options, options || {});//这里是用来重写默认属性
  },
  ID:function(id){
      return document.getElementById(id)
  },//getElementById的快捷方式
  CE:function(s){
      return document.createElement(s)
  },//createElement的快捷方式
  hide:function(el){
      el.style.display = 'none';
  },
  show:function(el){
      el.style.display = 'block';
  },
  //用于生成颜色选择器的具体内容
  colorPickerHtml : function(){
      var  _hex = ['FF', 'CC', '99', '66', '33', '00'];
      var builder = [];
      // 呈现一个颜色格
      var _drawCell = function(builder, red, green, blue){
          builder.push('<td bgcolor="');
          builder.push('#' + red + green + blue);
          builder.push('" unselectable="on"></td>');
      };
      // 呈现一行颜色
      var _drawRow = function(builder, red, blue){
          builder.push('<tr>');
          for (var i = 0; i < 6; ++i) {
              _drawCell(builder, red, _hex[i], blue)
          }
          builder.push('</tr>');
      };
      // 呈现六个颜色区之一
      var _drawTable = function(builder, blue){
          builder.push('<table class="cell" unselectable="on">');
          for (var i = 0; i < 6; ++i) {
              _drawRow(builder, _hex[i], blue)
          }
          builder.push('</table>');
      };
      //开始创建
      builder.push('<table><tr>');
      for (var i = 0; i < 3; ++i) {
          builder.push('<td>');
          _drawTable(builder, _hex[i]);
          builder.push('</td>');
      }
      builder.push('</tr><tr>');
      for (var i = 3; i < 6; ++i) {
          builder.push('<td>');
          _drawTable(builder, _hex[i])
          builder.push('</td>');
      }
      builder.push('</tr></table>');
      builder.push('<table id="color_result"><tr><td id="color_view"></td><td id="color_code"></td></tr></table>');
      return builder.join('');
  },
  addEvent:function(el, type, fn ) {
      if(!+"\v1") {// 这是ie
          el['e'+type+fn]=fn;
          el.attachEvent( 'on'+type, function() {
              el['e'+type+fn]();
          } );
      }else{
          el.addEventListener( type, fn, false );
      }
  },
  drawPicker:function(id){
      var $ = this,
      textfield = $.ID(id),
      colorPicker = $.CE("div");
      colorPicker.className = "colorpicker";
      colorPicker.innerHTML = $.colorPickerHtml();
      textfield.parentNode.insertBefore(colorPicker,null);
      $.hide(colorPicker);
      $.addEvent(textfield,'focus',function(){
          textfield.style.position = 'relative';
          $.show(colorPicker);
          var l = textfield.offsetLeft + 'px',
          t = (textfield.clientHeight + textfield.offsetTop)+ 'px';
          if(/msie|MSIE 6/.test(navigator.userAgent)){
              var iframe = $.CE("<iframe id='picker_mask' style='left:"+l
                  +";width:220px;filter:mask();position:absolute;"+";top:"+t
                  +"height:180px;z-index:1;'></iframe>");//z-index不能为负数
              textfield.insertAdjacentElement('afterEnd',iframe);
          }
          colorPicker.style.left =l ;
          colorPicker.style.top = t ;
      })
      $.addEvent(colorPicker,'mouseover',function(){
          var e = arguments[0] || window.event,
          td = e.srcElement ? e.srcElement : e.target,
          nn = td.nodeName.toLowerCase(),
          colorView = $.ID('color_view'),
          colorCode = $.ID('color_code');
          if( 'td' == nn){
              colorView.style.backgroundColor = td.bgColor;
               !+"\v1"? (colorCode.innerText = td.bgColor):(colorCode.innerHTML = td.bgColor);
          }
      });
      $.addEvent(colorPicker,'click',function(){
          var e = arguments[0] || window.event,
          td = e.srcElement ? e.srcElement : e.target,
          nn = td.nodeName.toLowerCase();
          if(nn == 'td'){
              textfield.value = td.bgColor;
              $.hide(colorPicker);
              var iframe =  $.ID("picker_mask");
              iframe && iframe.parentNode.removeChild(iframe);
          }
      });

      addSheet('\
div.colorpicker {display:none;position:absolute;width:216px;border:2px solid #c3c9cf;background:#f8f8f8;}\
div.colorpicker table{border-collapse:collapse;margin:0;padding:0;width:100%;}\
div.colorpicker  table td {padding:0!important;}\
div.colorpicker .cell td{height:12px;width:12px;}\
#color_result{width:216px;}\
#color_view{width:110px;height:25px;}');
  }
}
window.onload = function(){
  new ColorPicker({textfield_id:"color"});
}