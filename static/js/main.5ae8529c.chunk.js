(this.webpackJsonppicross_solver=this.webpackJsonppicross_solver||[]).push([[0],{20:function(t,e,s){t.exports=s(49)},25:function(t,e,s){},43:function(t,e,s){},44:function(t,e,s){},45:function(t,e,s){},46:function(t,e,s){},47:function(t,e,s){},48:function(t,e,s){},49:function(t,e,s){"use strict";s.r(e);var a=s(0),n=s.n(a),o=s(17),r=s.n(o),i=(s(25),s(3)),l=s(4),c=s(6),p=s(5),u=s(1),h=s(7),d=s(18),b=s.n(d),m=(s(43),function(t){function e(t){var s;return Object(i.a)(this,e),(s=Object(c.a)(this,Object(p.a)(e).call(this,t))).state={value:""},s.handleChange=s.handleChange.bind(Object(u.a)(s)),s}return Object(h.a)(e,t),Object(l.a)(e,[{key:"handleChange",value:function(t){this.setState({value:t.target.value}),this.props.passValue(this.props.id,+t.target.value)}},{key:"render",value:function(){return n.a.createElement("div",{className:"rowColForm"},n.a.createElement("div",{className:"input-group mb-3",onSubmit:this.handleSubmit},n.a.createElement("span",{className:"input-group-addon",id:"basic-addon3"},this.props.name),n.a.createElement("input",{type:"text",className:"form-control",value:this.state.value,onChange:this.handleChange})))}}]),e}(n.a.Component)),v=s(19),g=(s(44),function(t){function e(t){var s;Object(i.a)(this,e),(s=Object(c.a)(this,Object(p.a)(e).call(this,t))).onKeyDown=function(t){console.log(t.key),"Enter"===t.key&&(t.preventDefault(),t.stopPropagation(),s.handleSubmit(t))};var a=20*(18-s.props.cols-s.props.rowConstraint)-410;return s.state={text:"",value:[],axis:"",valid:!0,buttonText:"Press Enter to Submit",left_offset:a},s.getText=s.getText.bind(Object(u.a)(s)),s.handleChange=s.handleChange.bind(Object(u.a)(s)),s.onKeyDown=s.onKeyDown.bind(Object(u.a)(s)),s.handleSubmit=s.handleSubmit.bind(Object(u.a)(s)),s}return Object(h.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){this.getText(),this.nameInput.focus()}},{key:"getText",value:function(){var t;this.props.row<this.props.rowConstraint?(t="col "+(this.props.col-this.props.colConstraint),this.setState({axis:"cols"})):(t="row "+(this.props.row-this.props.rowConstraint),this.setState({axis:"rows"})),this.setState({text:t})}},{key:"handleChange",value:function(t){var e=t.target.value.split(" ").map((function(t){return+t}));this.setState({value:e})}},{key:"handleSubmit",value:function(t){var e=this.state.value.length-1;this.state.value.forEach((function(t){!Number.isInteger(t)||t<1?e+=25:e+=t}));var s=this.state.axis;e<=this.props[s]?(this.setState({valid:!0,buttonText:"Press Enter to Submit"}),this.props.passVal(this.state.value,this.state.axis)):this.setState({valid:!1,buttonText:"Invalid Entry"}),t.preventDefault()}},{key:"render",value:function(){var t=this;return n.a.createElement("div",{className:"popup",onKeyDown:this.onKeyDown,style:{left:this.state.left_offset}},n.a.createElement("div",{className:"input-group mb-3",onSubmit:this.handleSubmit},n.a.createElement("span",{className:"input-group-addon addon-small"},this.state.text),n.a.createElement("input",{type:"text",className:"form-control",ref:function(e){t.nameInput=e},value:this.props.value,onChange:this.handleChange})),n.a.createElement("input",{type:"submit",value:this.state.buttonText,className:"btn btn-danger btn-small",onClick:this.handleSubmit}))}}]),e}(a.Component)),f=(s(45),function(t){function e(t){var s;return Object(i.a)(this,e),(s=Object(c.a)(this,Object(p.a)(e).call(this,t))).state={value:[],style:[]},s.state.style=s.props.style,s.state.style.color=s.updateColor(),s.updateColor=s.updateColor.bind(Object(u.a)(s)),s.onClick=s.onClick.bind(Object(u.a)(s)),s.getPopupVal=s.getPopupVal.bind(Object(u.a)(s)),s.closePopup=s.closePopup.bind(Object(u.a)(s)),s}return Object(h.a)(e,t),Object(l.a)(e,[{key:"componentDidUpdate",value:function(){this.state.color!==this.updateColor()&&this.setState({color:this.updateColor()})}},{key:"updateColor",value:function(){var t="rgb(155,155,155)";return"X"!==this.props.value&&(t="black"),t}},{key:"onClick",value:function(){this.props.showPopup?this.closePopup():this.props.passPopupIndices([this.props.row,this.props.col])}},{key:"getPopupVal",value:function(t,e){this.setState({value:t}),"rows"!==e?this.props.passPopupVal(t,e,this.props.col):"cols"!==e&&this.props.passPopupVal(t,e,this.props.row),this.closePopup()}},{key:"closePopup",value:function(){this.props.passPopupIndices([-1,-1])}},{key:"render",value:function(){return n.a.createElement("span",{className:"constraintWrapper"},n.a.createElement("div",{className:"gridSquare constraint",onClick:this.onClick,style:this.state.style},this.props.value),n.a.createElement("span",null,this.props.showPopup?n.a.createElement(g,{passVal:this.getPopupVal,rows:this.props.rows,cols:this.props.cols,row:this.props.row,col:this.props.col,rowConstraint:this.props.rowConstraint,colConstraint:this.props.colConstraint}):n.a.createElement("span",null)))}}]),e}(a.Component)),w=(s(46),function(t){function e(t){var s;return Object(i.a)(this,e),(s=Object(c.a)(this,Object(p.a)(e).call(this,t))).state={grid:[],popupIndices:[-1,-1],row_constraint_len:4,col_constraint_len:3,row_constraint:[[3],[5],[3,4],[7],[5],[3],[5],[8,1],[3,3,3],[2,3,7],[2,4,5],[2,8],[10],[3,2],[6]],col_constraint:[[1],[2,4],[4,6],[2,6,2,1],[8,2,1,1],[8,2,3],[4,2,6],[2,2,5],[3,2,1],[6],[5],[4],[5],[4],[3]],solution:null},s.state.grid=s.constructGrid(),s.constructConstraints=s.constructConstraints.bind(Object(u.a)(s)),s.populateGrid=s.populateGrid.bind(Object(u.a)(s)),s.constructGrid=s.constructGrid.bind(Object(u.a)(s)),s.renderGrid=s.renderGrid.bind(Object(u.a)(s)),s.getPopupIndices=s.getPopupIndices.bind(Object(u.a)(s)),s.getPopupVal=s.getPopupVal.bind(Object(u.a)(s)),s.resizeConstraints=s.resizeConstraints.bind(Object(u.a)(s)),s.passState=s.passState.bind(Object(u.a)(s)),s}return Object(h.a)(e,t),Object(l.a)(e,[{key:"componentDidUpdate",value:function(t,e,s){var a=this;if(t.submit!==this.props.submit&&!0===this.props.submit)this.passState();else if(t.popupIndices!==this.props.popupIndices&&this.state.popupIndices!==this.props.popupIndices)this.setState({popupIndices:[-1,-1]});else if(t.rows!==this.props.rows||t.cols!==this.props.cols){var n=this.constructConstraints(),o=Object(v.a)(n,2),r=o[0],i=o[1];this.setState({row_constraint_len:1,col_constraint_len:1,row_constraint:r,col_constraint:i},this.setState({grid:this.constructGrid()}))}else if(e.row_constraint_len!==this.state.row_constraint_len||e.col_constraint_len!==this.state.col_constraint_len){var l=this.constructGrid();this.setState({grid:l})}else if(t.grid!==this.props.grid)if(!1===this.props.animation)this.populateGrid(this.props.grid);else{for(var c=this.props.grid,p=[],u=0;u<this.props.grid.length;u++){var h=c[u];if(1===h[0].length&&(h=[h]),h.length<this.props.rows)for(var d=h.length,b=0;b<this.props.rows-d;b++){var m=Array(this.props.cols);m.fill(0),h.push(m)}0===u?p.push(h):0!==u&&h!==p[u-1]&&p.push(h)}var g=0,f=setInterval((function(){if(g>=p.length)a.populateGrid(p[p.length-1]),clearInterval(f);else{var t=p[g];a.populateGrid(t),g+=3}}),20)}}},{key:"populateGrid",value:function(t){if("No Solution"!==t){for(var e=this.state.grid,s=0;s<this.props.rows;s++)for(var a=0;a<this.props.cols;a++){var n=s+this.state.row_constraint_len,o=a+this.state.col_constraint_len;e[n][o]=t[s][a]}this.setState({grid:e,solution:"Solution Found!",popup:[-1,-1]})}else this.setState({solution:"No Solution Found",grid:this.constructGrid()})}},{key:"constructConstraints",value:function(){for(var t=new Array(this.props.rows),e=0;e<this.props.rows;e++)t[e]=[];for(var s=new Array(this.props.cols),a=0;a<this.props.cols;a++)s[a]=[];return[t,s]}},{key:"constructGrid",value:function(){for(var t=this.props.rows,e=this.props.cols,s=this.state.row_constraint_len,a=this.state.col_constraint_len,n=new Array(this.props.rows+s),o=0;o<this.props.rows+s;o++){for(var r=new Array(this.props.cols+a),i=0;i<this.props.cols+a;i++)r[i]=0;n[o]=r}for(var l=0;l<s;l++){for(var c=new Array(e+a),p=0;p<e+a;p++)c[p]=-1;n[l]=c}for(var u=s;u<s+t;u++){for(var h=new Array(e+a),d=0;d<a;d++)h[d]=-1;for(var b=a;b<e+a;b++)h[b]=0;n[u]=h}return n}},{key:"renderGrid",value:function(){var t=this;return this.state.grid.map((function(e,s){return n.a.createElement("div",{className:"gridRow"},e.map((function(e,a){if(-1===e){var o=!1;s===t.state.popupIndices[0]&&a===t.state.popupIndices[1]&&(o=!0);var r={"border-top":"inherit","border-left":"inherit","border-right":"none","background-color":"inherit","border-radius":"none","border-bottom":"none"};if(0===s&&a>=t.state.col_constraint_len&&(r["border-top"]="2px solid black"),s>=t.state.row_constraint_len&&0===a&&(r["border-left"]="2px solid black"),s===t.state.row_constraint_len&&a<t.state.col_constraint_len&&(r["border-top"]="2px solid black"),s<=t.state.row_constraint_len&&a===t.state.col_constraint_len&&(r["border-left"]="2px solid black"),s>=t.state.row_constraint_len){var i,l=t.state.row_constraint[s-t.state.row_constraint_len];return i=null!=l&&a-t.state.col_constraint_len+l.length>=0?l[a-t.state.col_constraint_len+l.length]:"X",n.a.createElement(f,{passPopupVal:t.getPopupVal,passPopupIndices:t.getPopupIndices,rows:t.props.rows,cols:t.props.cols,row:s,col:a,rowConstraint:t.state.row_constraint_len,colConstraint:t.state.col_constraint_len,showPopup:o,value:i,style:r})}if(a>=t.state.col_constraint_len){var c,p=t.state.col_constraint[a-t.state.col_constraint_len];return c=null!=p&&s-t.state.row_constraint_len+p.length>=0?p[s-t.state.row_constraint_len+p.length]:"X",n.a.createElement(f,{passPopupVal:t.getPopupVal,passPopupIndices:t.getPopupIndices,rows:t.props.rows,cols:t.props.cols,row:s,col:a,rowConstraint:t.state.row_constraint_len,colConstraint:t.state.col_constraint_len,showPopup:o,value:c,style:r})}return n.a.createElement("div",{className:"gridSquare unused",style:r}," ")}var u={"border-top":"1px dashed gray","border-left":"1px dashed gray","border-right":"","border-bottom":"none","background-color":"white"};return(s-t.state.row_constraint_len)%5===0&&(s===t.state.row_constraint_len?u["border-top"]="2px solid black":u["border-top"]="2px solid gray"),(a-t.state.col_constraint_len)%5===0&&(a===t.state.col_constraint_len?u["border-left"]="2px solid black":u["border-left"]="2px solid gray"),0===e?n.a.createElement("div",{className:"gridSquare",style:u}," "):(u["background-color"]="black",u["border-top"]=0,u["border-left"]=0,n.a.createElement("div",{className:"gridSquare",style:u}," "))})))}))}},{key:"getPopupIndices",value:function(t){this.props.passPopupIndices(t),this.setState({popupIndices:t})}},{key:"getPopupVal",value:function(t,e,s){if("rows"===e){var a=this.state.row_constraint;return a[s-this.state.row_constraint_len]=t,this.setState({row_constraint:a}),void this.resizeConstraints(t.length,e)}if("cols"===e){var n=this.state.col_constraint;return n[s-this.state.col_constraint_len]=t,this.setState({col_constraint:n}),void this.resizeConstraints(t.length,e)}}},{key:"resizeConstraints",value:function(t,e){"rows"===e?"cols"===e||t>this.state.col_constraint_len&&this.setState({col_constraint_len:t}):t>this.state.row_constraint_len&&this.setState({row_constraint_len:t})}},{key:"passState",value:function(){this.props.passState(this.state)}},{key:"render",value:function(){return n.a.createElement("div",{className:"gridWrapper"},n.a.createElement("div",{className:"grid"},this.renderGrid()),n.a.createElement("div",null,n.a.createElement("h4",null,this.state.solution)))}}]),e}(a.Component)),_=(s(47),function(t){function e(t){var s;return Object(i.a)(this,e),(s=Object(c.a)(this,Object(p.a)(e).call(this,t))).getFormValue=function(t,e){var a=s.state;Number.isInteger(+e)&&e>0&&e<26&&(a[t]=e,s.setState(a))},s.state={rows:15,cols:15,request_body:null,response:null,submit:!1,popupIndices:[-1,-1],exitPopup:!1,animation:!1},s.getFormValue=s.getFormValue.bind(Object(u.a)(s)),s.getGridState=s.getGridState.bind(Object(u.a)(s)),s.getData=s.getData.bind(Object(u.a)(s)),s.updateGrid=s.updateGrid.bind(Object(u.a)(s)),s.submit=s.submit.bind(Object(u.a)(s)),s.getPopupIndices=s.getPopupIndices.bind(Object(u.a)(s)),s.clickHandler=s.clickHandler.bind(Object(u.a)(s)),s.animationToggle=s.animationToggle.bind(Object(u.a)(s)),s}return Object(h.a)(e,t),Object(l.a)(e,[{key:"getGridState",value:function(t){var e=this,s=t,a={w:this.state.cols,h:this.state.rows,x:s.col_constraint,y:s.row_constraint,animation:this.state.animation};this.setState({request_body:a},(function(){return e.getData()}))}},{key:"getData",value:function(){var t=this,e="http://picross-solver.herokuapp.com";console.log("posting to: "+e),b()({method:"post",url:e,data:this.state.request_body}).then((function(e){t.setState({response:e.data,submit:!1})})).catch((function(t){console.log(t)}))}},{key:"updateGrid",value:function(){return this.state.response}},{key:"submit",value:function(){this.setState({submit:!0})}},{key:"getPopupIndices",value:function(t){this.setState({popupIndices:t,exitPopup:!0})}},{key:"clickHandler",value:function(t){-1!==this.state.popupIndices[0]&&-1!==this.state.popupIndices[1]&&(!1===this.state.exitPopup?this.setState({exitPopup:!0}):this.setState({popupIndices:[-1,-1],exitPopup:!1}))}},{key:"animationToggle",value:function(){this.setState({animation:!this.state.animation})}},{key:"render",value:function(){return n.a.createElement("div",{className:"page",onClick:this.clickHandler},n.a.createElement("h1",{className:"display-4 header"},"Picross Solver"),n.a.createElement("p",{className:"h4"},"Click on the rows and columns to add and remove constraints"),n.a.createElement("div",{className:"contentWrapper"},n.a.createElement("div",{className:"leftSideWrapper"},n.a.createElement("div",{className:"rowColWrapper"},n.a.createElement(m,{name:"Number of Rows (Max 25)",id:"rows",passValue:this.getFormValue}),n.a.createElement(m,{name:"Number of Cols (Max 25)",id:"cols",passValue:this.getFormValue})),n.a.createElement("div",{className:"submissionWrapper"},n.a.createElement("div",{class:"input-group-append"},n.a.createElement("button",{onClick:this.animationToggle,class:"btn btn-outline-secondary",type:"button",id:"button-addon2"},"Animation: ",!0===this.state.animation?"On":"Off")),n.a.createElement("input",{type:"submit",value:"Solve Puzzle!",className:"btn btn-warning",onClick:this.submit}))),n.a.createElement(w,{rows:this.state.rows,cols:this.state.cols,passState:this.getGridState,grid:this.state.response,submit:this.state.submit,popupIndices:this.state.popupIndices,passPopupIndices:this.getPopupIndices,animation:this.state.animation})))}}]),e}(a.Component));s(48);var y=function(){return n.a.createElement("div",{className:"App"},n.a.createElement("link",{rel:"stylesheet",href:"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css",integrity:"sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u",crossorigin:"anonymous"}),n.a.createElement("script",{src:"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js",integrity:"sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa",crossorigin:"anonymous"}),n.a.createElement(_,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(n.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[20,1,2]]]);
//# sourceMappingURL=main.5ae8529c.chunk.js.map