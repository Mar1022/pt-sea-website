# GitHub Pages 部署指南

> 星铂再生官网 - 从零到上线

---

## 第一步：创建 GitHub 仓库

### 1.1 注册/登录 GitHub

1. 打开 https://github.com
2. 已有账号直接登录
3. 没有账号点击 **Sign up** 注册（用邮箱即可）

### 1.2 创建新仓库

1. 点击右上角 **+** → **New repository**
2. 填写信息：
   - **Repository name**: `pt-sea-website`（仓库名）
   - **Description**: `乐清市星铂再生资源有限公司官网`
   - **Public** ✅（必须选这个，Private不支持Pages）
   - **勾选** Add a README file
3. 点击 **Create repository**

---

## 第二步：上传网站文件

### 方法一：网页上传（简单）

1. 进入刚创建的仓库
2. 点击 **Add file** → **Upload files**
3. 把 `pt-sea-website` 文件夹里的**所有文件**拖进去
4. 文件列表：
   ```
   index.html
   styles.css
   script.js
   data.json
   logo.png
   catalyst-recycling.jpg
   ceramic-powder.jpg
   ```
5. 拉到页面底部，点击 **Commit changes**

### 方法二：命令行上传

如果你会使用 Git：

```bash
# 1. 进入网站文件夹
cd pt-sea-website

# 2. 初始化Git仓库
git init

# 3. 添加所有文件
git add .

# 4. 提交
git commit -m "星铂再生官网"

# 5. 关联远程仓库（把下面的URL换成你的仓库地址）
git remote add origin https://github.com/你的用户名/pt-sea-website.git

# 6. 上传
git push -u origin main
```

---

## 第三步：启用 GitHub Pages

1. 进入仓库页面
2. 点击 **Settings**（设置）
3. 左侧菜单找到 **Pages**
4. 设置如下：
   - **Source**: Deploy from a branch
   - **Branch**: main / (root)
   - 点击 **Save**
5. 等待1-2分钟，页面会刷新
6. 看到绿色的 **Your site is published** 就成功了！

### 获取临时网址

启用后，你会有一个临时网址：
```
https://你的用户名.github.io/pt-sea-website/
```

---

## 第四步：绑定你的域名

### 4.1 在 GitHub 设置

1. 继续在 **Settings → Pages** 页面
2. 找到 **Custom domain**
3. 输入你的域名，如：`www.pt-sea.com` 或 `pt-sea.com`
4. 点击 **Save**
5. **勾选** Enforce HTTPS（开启HTTPS）

### 4.2 在域名服务商设置

登录你的域名管理后台（阿里云/腾讯云/etc.），添加 DNS 解析：

| 记录类型 | 主机记录 | 记录值 |
|---------|---------|--------|
| CNAME | www | 你的用户名.github.io |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

> 注意：把 `你的用户名` 换成你的GitHub用户名

### 4.3 等待生效

DNS 解析生效需要 **10分钟到48小时**，耐心等待。

---

## 第五步：验证网站上线

1. 打开你的域名，如 `www.pt-sea.com`
2. 如果看到网站，说明部署成功！🎉
3. 尝试点击环保公示分类，看看JSON数据是否正常加载

---

## 后续维护

### 更新内容

1. 修改 `data.json` 文件
2. 上传到 GitHub 同一位置（覆盖）
3. 网站自动更新（可能需要等1分钟）

### 更新图片

1. 准备好新图片
2. 命名为相同文件名
3. 上传覆盖

---

## 常见问题

### Q: GitHub打不开？
A: 国内需要修改hosts文件（之前你用过这个方法）

### Q: 域名解析不生效？
A: 等待最多48小时，或联系域名服务商

### Q: HTTPS证书问题？
A: GitHub会自动申请，勾选Enforce HTTPS后等几分钟

### Q: 图片不显示？
A: 检查文件名是否完全一致（包括大小写）

---

## 你的域名是什么？

请告诉我你的域名，我可以帮你检查DNS配置是否正确。
