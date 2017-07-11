//存取localStorage中的数据
var store = {
    save: function(key,value){//存数据
        localStorage.setItem(key,JSON.stringify(value));
    },
    fetch: function(key){//取数据
        return JSON.parse(localStorage.getItem(key)) || []; //取到localStorage中的数据，当其中没有数据时，则取一个空的数组
    }
};


/*
var list = [
    {
        title: "吃饭吃饭",
        isChecked: false
    },
    {
        title: "睡觉睡觉",
        isChecked: true  //状态为true，画横线
    }
];*/


//取出所有值
var list = store.fetch("text-cck");


//利用vue把数据渲染到页面
var vm = new Vue({
    el: ".main",  //将属性为main的div作为挂载点
    data: {
        list: list,  //参考：https://cn.vuejs.org/v2/guide/list.html
        todo: "",
        edtorTodos: "",  //记录正在编辑的信息
        beforeTitle: "", //记录正在编辑的信息的title
        visibility: "all" //通过这个属性值的变化对数据进行筛选
    },
    watch: {//监控函数，观察Vue实例上的数据变动。对应一个对象，键是观察表达式，值是对应回调
        /*
        浅监控，只能监控到list整体的增删，不能监控list中isChecked的变化
        list: function(){//当list这一键值变动时，则执行function函数
            store.save("text-cck",this.list);
        }
         */
        list: {//深度监控
            handler: function(){
                store.save("text-cck",this.list);
            },
            deep: true
        }

    },
    computed: {
        noCheckedlength: function(){ //没有完成的任务的长度
            return this.list.filter(function(item){
                return !item.isChecked;
            }).length;
        },
        filteredList: function(){
            //过滤三中情况：all finished unfinished
            var filter = {
                all: function(){
                    return list;
                },
                finished: function(){
                    return list.filter(function(item){
                        return item.isChecked;
                    });
                },
                unfinished: function(){
                    return list.filter(function(item){
                        return !item.isChecked;
                    });
                }
            }
            //如果可以根据this.visibility找到过滤函数，则执行之，如果找不到，则返回所有任务
            return filter[this.visibility] ? filter[this.visibility](list) : list;
        }
    },
    methods: {
        addTodo: function(){   //添加任务函数
            //注意：这里事件处理函数中的this指向的时当前new vue的跟实例
            this.list.push({   //按下键盘enter=13时，想list中添加任务
                title: this.todo,
                isChecked: false
            });
            this.todo = '';
        },
        deleteTodo: function(todo){//删除任务函数
            var index = this.list.indexOf(todo);//找到todo所在数组里面的位置
            this.list.splice(index,1);//删除数组，即从index处删除1项数组元素
        },
        edtorTodo: function(todo){//编辑任务
            //编辑任务时，先记录编辑前的title,以方便取消编辑时，还原之前的任务
            this.beforeTitle = todo.title;
            this.edtorTodos = todo;
        },
        edtorTodoed: function(todo){//编辑任务完成时
            this.edtorTodos = "";
        },
        cancelTodo: function(todo){//取消编辑任务（）
            todo.title = this.beforeTitle;
            this.edtorTodos = "";
        }
    },
    directives: {
        "focus": {
            update: function(el,binding){
                console.log(el);
                console.log(binding);

                if(binding.value){
                    el.focus();
                };
            }
        }
    }
});

function watchHashChange(){
    var hash = window.location.hash.slice(1);
    console.log(hash);

    vm.visibility = hash;
};
watchHashChange();//刚打开网页时，执行以下hash

window.addEventListener("hashchange",watchHashChange);//当改变网页时，执行一下hash
