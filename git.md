# 基础用法
* 配置名称
> git config --global user.name "Your Name"
* 修改邮箱
> git config --global user.email "email@example.com"
* 克隆远程代码
> git clone URL
* 查看本地分支
> git branch
* 查看远程分支
> git branch -a
* 切换分支
> git checkout name
* 拉取远程分支
> git pull
* 提交代码(分三步)
1. git add file-path/.
2. git commit -m'注释'
3. git push

# 管理分支
* 新建分支
> git branch name
* 新建分支推送远程
> git push origin name
* 合并代码（合并指定分支到当前分支）—————— 这一步易冲突
> git merge name
* 删除分支
> git branch -d name
* 删除远程分支
> git push origin --delete name

# 管理版本用法
* 查看自己当前分支状态（会告诉你当前需要commit还是push等）
> git status
* 查看文件哪里发生了变化
> git diff
* 查看提交记录（可以根据注释或者时间查看别人提交情况）
> git log
* 版本回退
> git reset --hard HEAD^   ——————  上一个版本就是HEAD^，上上一个版本就是HEAD^^，100个写成HEAD~100

> git reset --hard commitID ——————  回到回退之前的版本
* 放弃修改
> git checkout -- file

# *
* 查看远程仓库信息
> git remote -v
* 本地分支和远程关联
> git branch --set-upstream-to=origin/远程分支名字 本地名字
1. 提交代码先pull，可以避免冲突
2. 新建分支是本地环境，远程并没有这个分支，建完要推送到远程
3. 代码冲突上边是最新代码，下边是旧代码，对比删掉不用的之后执行提交代码流程就可以了
