## 使用百度脑图导出产品服务包结
缘由：产品服务包，由于数据更新需要耗费大量工作，而且操作过程容易出错；特别是涉及到修改变更节点时无论是运营人员还是程序更新操作起来都是噩梦       
解决方案： 百度脑图是一款成熟的网络脑图编辑器操作起来便捷直观，很方便运营人员编辑修改使用，同时结合百度脑图的数据导出，由程序处理产品服务包的数据转换，以达到节省工作成本提高效率减少错误的目的       

## 程序运行（Node环境）
### 将百度脑图导出的数据存放于src/originalData     
```sh
    npm run kmToJSON filename
```
或

```sh
    yarn kmToJSON filename
```
脚本运行后生成服务包数据将存放于exportData文件目录下      

## 数据操作指引
### 1、创建数据规则
导出需要按照特定格式，否则会数据转换失败       
* 第一个节点必须为产品标题，这个节点必须有备注信息（选择节点在菜单栏点击  <img src="https://raw.githubusercontent.com/eightfeet/xmltojson/master/src/assets/beizhu.png" width="40" />  为节点添加备注）在右侧备注栏里填写备注信息：分享标题文案&&分享描述文案&&产品图片链接 (注意必须用&&分割开)。       
* 标题节点后开始第一条答复，数据上确保答复节点后面必须是问题选项节点，问题选项节点后必须是答复节点。       
* 答复节点永远只有一个，如果有多条答复请使用“&&”符号连接起来，问题节点可以是多个，请使用平级节点。   
* 答复与问题的轮回重复起始点插入1的标示位（选择节点在菜单栏点击  <img src="https://raw.githubusercontent.com/eightfeet/xmltojson/master/src/assets/tag.png" width="25" />  为节点添加1的标示位）   
* 数据中表情符号包含如下，产品服务包将会替换成对应图片                     
    > (得意表情)   (咧嘴笑表情)    (认真严肃表情)    (开心表情)    (给力表情)   (勾引表情)   (害羞表情)         
    > (疑问表情)   (偷笑表情)   (鼓掌表情)   (调皮表情)   (奸笑表情)   (流口水表情)    (可怜表情)           

<img src="https://raw.githubusercontent.com/eightfeet/xmltojson/master/src/assets/sjjg.png" width="600" />

### 2、导出方式
第一步      
<img src="https://raw.githubusercontent.com/eightfeet/xmltojson/master/src/assets/step1.png" width="500" />      
第二步      
<img src="https://raw.githubusercontent.com/eightfeet/xmltojson/master/src/assets/step2.png" width="500" />      
第三步      
<img src="https://raw.githubusercontent.com/eightfeet/xmltojson/master/src/assets/step3.png" width="500" />      
