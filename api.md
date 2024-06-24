# ENS-management 接口文档

> 涉及这几个接口，获取所有 ens 记录， 新增一个 ens 记录，更新 ens 记录，删除某个记录。 



## 修改记录

| 编号 | 修改日期 | 修改内容 | 修改人 |
| ---- | ---------- | -------- | ------ |
| 1    | 2024-06-24 | 创建文档 | Neal   |


## 服务地址

测试环境：https://ens-manangement.onrender.com

 ## 接口

 ### 1）获取所有 ens 记录

**接口地址**

- 说明：获取所有 ens 记录数据
- 地址：`/api/all`
- 方法：`GET`

**请求头**

| 序号 | 类型         | 值               | 说明      |
| ---- | ------------ | ---------------- | --------- |
| 1    | Content-Type | application/json | JSON 格式 |


**返回值示例（成功）**

```js
{
    data: [
        {
            "id": 1,
            "node": "ethpaymaster.eth",
            "address": {
                "0": "0x76a91462e907b15cbf27d5425399ebf6f0fb50ebb88f1888ac",
                "60": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
            },
            "text": {
                "email": "admin@ethpaymaster.com"
            },
            "contenthash": "0xe301017012204edd2984eeaf3ddf50bac238ec95c5713fb40b5e428b508fdbe55d3b9f155ffe"
        },
        {
            "id": 2,
            "node": "test.ethpaymaster.eth",
            "address": {
                "0": "0xa914b48297bff5dadecc5f36145cec6a5f20d57c8f9b87",
                "60": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"
            },
            "text": {
                "email": "this_is_a_test@ethpaymaster.com"
            },
            "contenthash": "0xe301017012204edd2984eeaf3ddf50bac238ec95c5713fb40b5e428b508fdbe55d3b9f155ffe"
        }],
    time: 855
}
```


**返回值示例（失败）**

```js
{
   status: 'error', message: 'error message'
}
```

### 2）更新或添加

**接口地址**

- 说明：新增一个 ens 记录，或者更新一个 ens 记录，如果传入的数据有 id 这个字段为更新。

- 地址：`/api/ens`

- 方法：`POST`


> 参数及返回值参考 <添加 ens>

**请求头**

| 序号 | 类型         | 值               | 说明      |
| ---- | ------------ | ---------------- | --------- |
| 1    | Content-Type | application/json | JSON 格式 |

**请求体**

| 序号 | 键值 | 类型  | 说明                                                   |
| ---- | ---- | ----- | ------------------------------------------------------ |
| 1    | node  | string | ens 的二级域名 例如：neal.ethpaymaster.eth |
| 2    | address | Object | key 为链的 coinType（下面有详细关联数据） 值为地址 |
| 3    | text | Object | key 为 'email'、'avatar'、'description'、'display'、'email'、'keywords'、'mail'、'notice'、'location'、'phone'、'url'。 value 为其键名的值 |
| 4    | contenthash | string | ipfs 或者 swap |
| 5    | id  | number | 只有更新才有此字段，为 api/list 返回数据中数据的 id 字段 |

**请求体示例**

```js
{
	node: 'neal.ethpaymaster.eth',
    address: { '60': '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266' },
    text: { email: 'admin@ethpaymaster.com'}
    contenthash: '0xe301017012204edd2984eeaf3ddf50bac238ec95c5713fb40b5e428b508fdbe55d3b9f155ffe',
    id: 1,
}
```

**返回值示例（成功）**

```js
{
    status: "ok"
}
```

**返回值示例（失败）**

```js
{
   status: "error", message: 'error message'
}
```


### 3）删除某一 ens 记录 

**接口地址**

- 说明：新增一个 ens 记录，或者更新一个 ens 记录，如果传入的数据有 id 这个字段为更新。

- 地址：`/api/ens/delete`

- 方法：`POST`


> 参数及返回值参考 <添加 ens>

**请求头**

| 序号 | 类型         | 值               | 说明      |
| ---- | ------------ | ---------------- | --------- |
| 1    | Content-Type | application/json | JSON 格式 |

**请求体**

| 序号 | 键值 | 类型  | 说明                               |
| ---- | ---- | ----- | -------------------------------- |
| 1    | id  | number | 为 api/list 返回数据中数据的 id 字段 |

**请求体示例**

```js
{
    id: 1,
}
```

**返回值示例（成功）**

```js
{
    status: "ok"
}
```

**返回值示例（失败）**

```js
{
   status: "error", message: 'error message'
}
```


### 附表 coinType 的关联关系
```JSon
[
  {
    "chainId": 0,
    "name": "btc",
    "fullName": "Bitcoin",
    "coinType": 0
  },
  {
    "chainId": 1,
    "name": "eth",
    "fullName": "Ethereum",
    "coinType": 60
  },
  {
    "chainId": 10,
    "name": "op",
    "fullName": "Optimism",
    "coinType": 2147483658
  },
  {
    "chainId": 25,
    "name": "cro",
    "fullName": "Cronos",
    "coinType": 2147483673
  },
  {
    "chainId": 56,
    "name": "bsc",
    "fullName": "BNB Smart Chain",
    "coinType": 2147483704
  },
  {
    "chainId": 60,
    "name": "go",
    "fullName": "GoChain",
    "coinType": 2147483708
  },
  {
    "chainId": 61,
    "name": "etc",
    "fullName": "Ethereum Classic ",
    "coinType": 2147483709
  },
  {
    "chainId": 88,
    "name": "tomo",
    "fullName": "TomoChain",
    "coinType": 2147483736
  },
  { "chainId": 99, "name": "poa", "fullName": "POA", "coinType": 2147483747 },
  {
    "chainId": 100,
    "name": "gno",
    "fullName": "Gnosis",
    "coinType": 2147483748
  },
  {
    "chainId": 108,
    "name": "tt",
    "fullName": "ThunderCore",
    "coinType": 2147483756
  },
  {
    "chainId": 137,
    "name": "matic",
    "fullName": "Polygon",
    "coinType": 2147483785
  },
  {
    "chainId": 169,
    "name": "manta",
    "fullName": "Manta Pacific",
    "coinType": 2147483817
  },
  {
    "chainId": 246,
    "name": "ewt",
    "fullName": "Energy Web",
    "coinType": 2147483894
  },
  {
    "chainId": 250,
    "name": "ftm",
    "fullName": "Fantom Opera",
    "coinType": 2147483898
  },
  {
    "chainId": 288,
    "name": "boba",
    "fullName": "Boba",
    "coinType": 2147483936
  },
  {
    "chainId": 324,
    "name": "zksync",
    "fullName": "zkSync",
    "coinType": 2147483972
  },
  {
    "chainId": 361,
    "name": "theta",
    "fullName": "Theta",
    "coinType": 2147484009
  },
  {
    "chainId": 820,
    "name": "clo",
    "fullName": "Callisto",
    "coinType": 2147484468
  },
  {
    "chainId": 1088,
    "name": "metis",
    "fullName": "Metis",
    "coinType": 2147484736
  },
  {
    "chainId": 5000,
    "name": "mantle",
    "fullName": "Mantle",
    "coinType": 2147488648
  },
  {
    "chainId": 8453,
    "name": "base",
    "fullName": "Base",
    "coinType": 2147492101
  },
  {
    "chainId": 39797,
    "name": "nrg",
    "fullName": "Energi",
    "coinType": 2147523445
  },
  {
    "chainId": 42161,
    "name": "arb1",
    "fullName": "Arbitrum One",
    "coinType": 2147525809
  },
  {
    "chainId": 42220,
    "name": "celo",
    "fullName": "Celo",
    "coinType": 2147525868
  },
  {
    "chainId": 43114,
    "name": "avaxc",
    "fullName": "Avalanche C-Chain",
    "coinType": 2147526762
  },
  {
    "chainId": 59144,
    "name": "linea",
    "fullName": "Linea",
    "coinType": 2147542792
  },
  {
    "chainId": 534352,
    "name": "scr",
    "fullName": "Scroll",
    "coinType": 2148018000
  },
  {
    "chainId": 7777777,
    "name": "zora",
    "fullName": "Zora",
    "coinType": 2155261425
  }
]
```
