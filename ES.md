ES-->IE10、Google、火狐

# 构造函数
1. 是什么
* 用new关键字来调用的函数，称为构造函数
2. 为什么用构造函数
* 构造函数是为了简化重复代码
```` 
    var p1 = { name: 'zs', age: 6, gender: '男', hobby: 'basketball' };
    var p2 = { name: 'ls', age: 6, gender: '女', hobby: 'dancing' };
    var p3 = { name: 'ww', age: 6, gender: '女', hobby: 'singing' };
    var p4 = { name: 'zl', age: 6, gender: '男', hobby: 'football' };

    // 构造函数
    function Person(name, gender, hobby) {
        this.name = name;
        this.gender = gender;
        this.hobby = hobby;
        this.age = 6;
    }
    
    var p1 = new Person('zs', '男', 'basketball');
    var p2 = new Person('ls', '女', 'dancing');
    var p3 = new Person('ww', '女', 'singing');
    var p4 = new Person('zl', '男', 'football');
````
3. 怎么用
* 当以 new 关键字调用时，会创建一个新的内存空间，标记为 Person 的实例。
* 函数体内部的 this 指向该内存
* 给 this 添加属性，就相当于给实例添加属性
* 默认返回 this
* 返回值会有多种情况，分数据类型


# ES6

## let
* 声明的关键字
* 不能重复声明
* 块级作用域

         <input type="button" value="1">
         <input type="button" value="2">
         <input type="button" value="3">

        window.onload = function() {
            let abt = document.getElementsByTagName('input');
            for (var i = 0; i < abt.length; i++) {
                abt[i].onclick = function() {
                    alert(i);
                }
            }
        }

        // 因为var作用域是函数，所以三个按钮点击弹出都是3 

        window.onload = function() {
            let abt = document.getElementsByTagName('input');
            for (var i = 0; i < abt.length; i++) {
                (function(i) {
                    abt[i].onclick = function() {
                        alert(i);
                    }
                })(i)
            }
        } 

        window.onload = function() {
            let abt = document.getElementsByTagName('input');
            for (let i = 0; i < abt.length; i++) {
                abt[i].onclick = function() {
                    alert(i);
                }
            }
        }

        // let作用域是块，可以避免这个问题

## 箭头函数 ()=>{}
* 一个参数()可以省略：val =>{}
* 只有return，{}可以省略

## 函数的参数
* 参数扩展/展开
* 接收参数，...args必须放在最后;可以用于参数个数不确定

        function show(a,b,...args){
            alert(a)  //12
            alert(b)  //15
            alert(args)  //8,9,10
        }
        show(12,15,8,9,10)
* 展开数组
* ...arr   等同于直接把arr放在这里，也就是所谓的链接

         let arr1 = [1,2,3];
         let arr2 = [4,5,6];
         let arr = [...arr1,...arr2];   //[1,2,3,4,5,6]

## 默认参数
* 没传值的情况下，用自己设置的默认参数

     function show(a,b=10,c=15){
         console.log(a,b,c)
     }
     show(5) //5,10,15
     shpw(1,2,3) //1,2,3

## 解构赋值
* 左右两边结构一模一样
* 右边必须是个合格对象

     let [json,arr,num,str]=[{a:1,b:2},[3,4,5],8,'abc'];
     consle.log(json,arr,num,str)

## 数组
* 映射 map

         obj.map(function(item){
             console.log(item)
         })

* 汇总 reduce
* tem 是指一个中间值，初始为0，item为两个数的和，index为从1开始执行的次数

        let arr = [12,69,180,8763];
        let result=function(tem,item,index){
            return tem+item
         }

* 过滤 filter
* 保留一部分，抛弃一部分

        let arr=[1，2，3，4，5]
        let result=arr.filter(item=>item%3==0)

* 迭代 forEach

     let arr=[12,5,8,9];
     arr.forEach(item=>alert(item))

## 字符串
* startsWith
* endsWith
* 字符串模板：反单引号

         let a='一个';
         let b='好人';
         let str = `我是${a}${b}`;  //我是一个好人

## 面向对象
* class  构造函数
* 继承

## JSON
* JSON.stringify  obj转json
* JSON.parse   json转obj

## promise
* 操作之间没关系，同时进行多个操作
* 消除异步操作，同步一样的方式，写异步
* all会将所有请求异步完成，接受参数是arr，返回的也是arr

        function ajax(url){
            return new promise(function(resolve,reject){
                $.axax({
                    url:url,
                    dataType:'json',
                    success:function(data){
                        resolve()
                    },
                    error:function(err){
                        reject(err)
                    }
                })
            })     
        }
        promise.all([
            ajax(url1),
            ajax(url2)
        ]).then(
            arr => {
                let data = arr[0];
                let result = arr[1];
            },
            err => alert('失败')
        )
* catch  解决一个接口返回作为另一个接口参数的问题

        // 创建一个Promise实例，获取数据。并把数据传递给处理函数resolve和reject。
        // 需要注意的是Promise在声明的时候就执行了。
        var getUserInfo=new Promise(function(resolve,reject){
            $.ajax({
                type:"get",
                url:"index.aspx",
                success:function(data){
                    if(data.Status=="1"){
                        resolve(data.ResultJson)//在异步操作成功时调用
                    }else{
                        reject(data.ErrMsg);//在异步操作失败时调用
                    }
                }
            });
        })

        //另一个ajax Promise对象，
        var getDataList=new Promise(function(resolve,reject){
            $.ajax({
                type:"get",
                url:"index.aspx",
                success:function(data){
                    if(data.Status=="1"){
                        resolve(data.ResultJson)//在异步操作成功时调用
                    }else{
                        reject(data.ErrMsg);//在异步操作失败时调用
                    }
                }
            });
        })

        //Promise的方法then,catch方法
        getUserInfo.then(function(ResultJson){
            //通过拿到的数据渲染页面
        }).catch(function(ErrMsg){
            //获取数据失败时的处理逻辑
        })

        //Promise的all方法，等数组中的所有promise对象都完成执行
        Promise.all([getUserInfo,getDataList]).then(function([ResultJson1,ResultJson2]){
            //这里写等这两个ajax都成功返回数据才执行的业务逻辑
        })

## generator 
* yield配合用
* 控制代码执行程度，走走停停

# ES7

## 数组
* includes 查看arr是否包含值，返回true/false

        [a,b,c,d].includes('b'12)    // true
        [a,b,c,d].includes('b',2)    // false
        [1,NaN,2,3].includes(NaN)    // true
        [1,NaN,2,3].indexOf(NaN)     // -1


* keys/values/entries
> for ... of    循环的是值--key
> for ... in    循环的是下标--index
> enries   所有键值对拿出来 {a:1}   

## 幂运算
> ** = 快捷运算
> Math.pow(3,3) = 27
          
## async
* 用法

        let readData = async () => {
            let data1 = await $.ajax({url,param});
            let data2 = await $.ajax({url,param});
            let data3 = await $.ajax({url,param});
            console.log(data1,data2,data3)
        }
        readData()

