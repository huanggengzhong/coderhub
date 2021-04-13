# 说明文档

# 我的个人网站部署在nginx服务器上,nginx常用命令
```js
查看状态命令:
sudo systemctl status nginx
nginx开启命令:
sudo systemctl start nginx
nginx停止命令:
sudo systemctl stop nginx
```




# 远程 node 启动方法

//进入文件,执行 pull 拉取代码,运行 pm2

```js
cd /mydata/coderhub
git pull
npm i
pm2 start

```
# pm2常用命令
```js
查看
pm2 list
停止
pm2 stop all
删除
pm2 delete all
安装
cnpm i
启动 (在coderhub目录下)
pm2 start pm2.config.js


```

# 数据库创建和设置命令
```js
# 开启MySQL后台服务
systemctl start mysqld
# 查看MySQL服务：active (running)表示启动成功
systemctl status mysql
# 随着系统⼀起启动
systemctl enable mysqld
配置MySQL账号和密码(选2)
mysql_secure_installation
# 登录数据
mysql -u root -p
# 使⽤mysql数据库
use mysql;
# 查看user表中，连接权限，默认看到root是localhost
select host, user from user;
# 修改权限
update user set host = '%' where user = 'root';
# 记得刷新配置才能生效(同时自己服务器开启3306端口安全组)
flush privileges;
ps:导入sql语句前要创建数据库名后再操作

```
