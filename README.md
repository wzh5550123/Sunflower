# Express + Vue + MongoDB 项目结构

```
express+vue+mongodb     # 项目根目录
├─ bin                 # 可执行文件目录
│  └─ www              # 项目启动文件
├─ db                  # 数据库配置目录
│  └─ mongoose.js      # MongoDB 数据库连接配置文件
├─ models              # 数据模型目录
│  ├─ index.js         # 模型入口文件
│  └─ user.js          # 用户模型文件
├─ public              # 静态资源目录
│  ├─ images           # 图片资源目录
│  ├─ javascripts      # JavaScript 文件目录
│  └─ stylesheets      # 样式文件目录
│     └─ style.css     # 主样式文件
├─ routes              # 路由目录
│  ├─ index.js         # 主路由文件
│  └─ users.js         # 用户相关路由文件
├─ services            # 业务服务层目录
│  └─ userService.js   # 用户相关业务逻辑服务
├─ views               # 视图目录
│  ├─ error.html       # 错误页面
│  └─ index.html       # 首页
├─ app.js              # 应用程序主文件
├─ LICENSE.md          # 许可证文件
├─ package.json        # 项目配置和依赖文件
└─ README.md           # 项目说明文档
```


## 目录结构说明

### 根目录文件
| 文件 | 说明 |
|------|------|
| app.js | Express应用程序的主入口文件，包含核心配置和中间件设置 |
| package.json | 项目依赖配置和脚本管理文件 |
| README.md | 项目说明文档 |
| LICENSE.md | 项目许可证文件 |

### bin/
| 文件 | 说明 |
|------|------|
| www | 应用程序启动脚本，HTTP服务器配置 |

### db/
| 文件 | 说明 |
|------|------|
| mongoose.js | MongoDB数据库连接配置文件 |

### models/
| 文件 | 说明 |
|------|------|
| index.js | 模型索引文件，统一导出所有模型 |
| user.js | 用户模型定义文件 |

### public/
| 目录 | 说明 |
|------|------|
| images/ | 图片资源存储目录 |
| javascripts/ | 前端JavaScript文件目录 |
| stylesheets/ | CSS样式文件目录 |
| └─ style.css | 主样式表文件 |

### routes/
| 文件 | 说明 |
|------|------|
| index.js | 主页面路由处理器 |
| users.js | 用户相关路由处理器 |

### services/
| 文件 | 说明 |
|------|------|
| userService.js | 用户相关业务逻辑服务，处理数据库操作 |

### views/
| 文件 | 说明 |
|------|------|
| error.html | 错误页面模板 |
| index.html | 主页面模板 |

## 技术栈占比
| 语言 | 占比 |
|------|------|
| JavaScript | 91.5% |
| HTML | 6.8% |
| CSS | 1.7% |

## 架构说明

### Mongoose 架构

#### 1. 数据库连接层（/db）
- **mongoose.js**
  - 负责与 MongoDB 数据库建立连接
  - 配置数据库连接参数（URL、选项等）
  - 处理连接事件（成功、错误、断开等）
  - 提供连接池管理

#### 2. 数据模型层（/models）
- **index.js**
  - 集中管理所有模型
  - 统一导出接口
  - 处理模型间的依赖关系
- **user.js**
  - 定义用户模型的 Schema
  - 设置字段验证规则
  - 定义模型实例方法
  - 定义模型静态方法
  - 配置中间件钩子（pre/post hooks）

#### 3. 业务服务层（/services）
- **userService.js**
  - 实现业务逻辑
  - 封装数据库操作：
    ```javascript
    - 创建（create）
    - 查询（find/findOne/findById）
    - 更新（update/updateOne）
    - 删除（delete/remove）
    ```
  - 处理数据验证
  - 实现事务管理
  - 处理业务异常

#### 4. 数据流转过程
```
[HTTP请求] → [路由层] → [服务层] → [模型层] → [数据库]
   ↑          routes     services    models      db
   |             ↓          ↓          ↓         ↓
   +──────────────────── 数据响应 ←──────────────┘

1. 路由层：接收请求，解析参数
2. 服务层：处理业务逻辑，调用模型方法
3. 模型层：执行数据验证，处理数据操作
4. 数据库：存储和检索数据
```

#### 5. 错误处理流程
```
try {
    路由层 → 服务层 → 模型层 → 数据库
} catch (error) {
    ↓
    错误中间件
    ↓ 
    统一错误响应
}
```

### 技术特点
- 前端：Vue.js框架
- 后端：Express.js框架
- 数据库：MongoDB
- 模板引擎：HTML + EJS渲染

### 主要功能
- 完整的错误处理机制
- 环境变量配置（.env）
- 集成常用中间件
  - morgan（日志）
  - cookie-parser（Cookie处理）
  - express.json（JSON解析）
  - express.static（静态文件服务）