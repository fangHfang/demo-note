# PHP
#### 特点
* 适合web开发
* 易于上手，没有编程经验也能轻易上手
* 完全开源免费
* 运行于各种平台（window，Linux，Unix，Mac，OSX）兼容所有服务器
* 开发动态网站比较快，实现网站中看到的任何功能
#### 3w1H1P
* what 是什么，学的是什么东西
* why 为什么用
* when 什么时候用
* how 怎么用，灵活运用
* practice 实践，练习
#### 学习建议
* 态度
* 自信
* 不能懒惰
* 坚持
* 想问练
# PHP环境搭建
* LAMP：Linux+Apache+SQL+PHP
* LNMP：Linux+NGINX+SQL+PHP
* LNMPA：Linux+NGINX+SQL+PHP+Apache
* WAMP：window+Apache+SQL+PHP
#### WAMP安装
* 独立安装：Apache+MySQL+PHP
* 集成环境：wampserver+xampp+phpstudy
#### 编辑器
* atom
* sublime
* text3
* phpstorm
# 一、基础语法
* 文件名不使用中文，也不包含特殊字符
* 标准写法：<?php 代码块 ?>  成对出现
# 二、语法规范
* <?php 代码块 ?>  成对出现
* 分号结尾
* 单行注释：//双斜杠
* 多行注释：/*注释*/
* 注释只能在源文件中看到
# 三、工作原理
> 发起请求->服务器响应->可以处理->处理结果返给浏览器
> 发起请求->服务器响应->不可以处理，给PHP引擎处理->处理结果返给浏览器
# 四、PHP变量
## 1. 什么是变量
## 2. 声明变量
* 用$符号声明变量
* 变量名称以字母或下划线开始，后面跟数字、字母下划线、不能包含特殊字符
* 变量名称最好含义明确
* 变量可以重复声明
* 变量可以不声明，直接用，弱类型语言
> $name='ling';
## 3. 使用变量
* 严格区分大小写
* 等量代换
> \$a=\$b=\$c=1;
## 4. 8种主要数据类型
#### 4.1标量类型
1. 整形(int)
* 整数，十进制，二进制，八进制
2. 浮点型
* 带小数点，科学计数法
3. 布尔型
* true，false
4. 字符串
* heredoc：用来写大段HTML代码，以'\<\<\<name'开始，以'name;'结尾，在HTML中会有很多引号，需要很多转义，用这个写法就不用转义,类似于双引号可以解析$name.
````
    $str=<<<"TABLE"
        <h1>hello</h1>
    TABLE;
````
* nowdoc：：用来写大段HTML代码，以'\<\<\<name'开始，以'name;'结尾，在HTML中会有很多引号，需要很多转义，用这个写法就不用转义，类似于单引号不可以解析$name.
* 双引号进行解析，单引号只会当纯字符串不解析
* 字符串会有斜杠转义问题
* 花括号{}：需要在字符串中用变量时，将变量用{$name}括起来
* 字符串下标从零开始
* 替换只能一个对应一个替换
* 中文一个字占三个字节
* 增删改查利用下标来改
````
    $str='abc';
    echo $str{0};   // a
    $str{1}='d';    // adc
````
5. 特点
#### 4.2 复合类型
1. 数组
````
    $arr=array();
    $array=(12,'king',true,123.45);
````
2. 对象
````
    $obj=new stdClass();
````
3. 特殊类型
* 资源
````
   $handle=fopen('./test.html','r');//只读打开一个文件 
````
* null空
> 变量未声明直接使用它的值为null
> 声明一个变量并且赋值null
> 经过unset()注销过的变量为null
````
    var_dump($name);//null
    $name=null;
    var_dump($name);//null
    $name=123;
    unset($name);//null
````

## 5. 数据类型转换
#### 5.1 自动转化
##### 5.1.1 其他类型转数值型
1. true->1
2. false->2
3. null->0
4. 字符串如果以非法数值开始，直接转化0
5. 字符串如果以合法数值开始，一直取到第一个非法数值结束
##### 5.1.2 其他类型转字符串
1. 数值型直接会转数值型
2. true->1
3. false->空字符串
4. null->空字符串
5. 数组->Array
6. 对象不能直接转字符串
7. 资源->数字
##### 5.1.3 其他类型转布尔类型
* 0->false
* 0.0->false
* 空字符串或''或者""或者'0'或者"0"->false
* null->false
* 空数组->false
````
    $var=123;
    $var= -12;
    $var=0;//false
    $var=0.0;//false
    $var=123.4;
    $var='';//false
    $var="";//false
    $var=' ';
    $var='false';
    $var='0';//false
    $var='0.0';
    $var=null;//false
    $var=array();//false
````
#### 5.2 强制转换(显式转换)
##### 5.2.0 临时转换不会改变变量本身
##### 5.2.1 临时转换
1. (变量类型)$变量名称
* 整型——>(int)变量名称
* 浮点型——>(float|double|real)$变量名称
* 字符串——>(string)$变量名称
* 布尔型——>(bool|boolean)$变量名称
* 空——>(unset)$变量名称
* 数组——>(array)$变量名称
* 对象——>(object)$变量名称
````
    $var=true;
    var_dump((int)$var);//1
    var_dump($var);//true
````
2. 通过系统函数实现
* 
##### 5.2.2 永久转换





# 常见用法
* echo 'string'----输出变量
* var_dump($name)----输出数据类型
* fopen('url','r');----打开资源