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


# 远程数据库启动方法
```js
# 开启MySQL后台服务
systemctl start mysqld
# 查看MySQL服务：active (running)表示启动成功
systemctl status mysql
# 随着系统⼀起启动
systemctl enable mysqld
```

# 远程 node 启动方法

//进入文件,执行 pull 拉取代码,运行 pm2

```js
cd /mydata/coderhub
git pull
pm2 start pm2.config.js

```
