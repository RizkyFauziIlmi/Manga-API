# Komiindo-manga-api

this api use database monggoDB, i use my [own data mining tool]() for the source

## API Reference

### Visit this [endpoint](https://komikindo-api.vercel.app/komik-detail/tokyo-ghoul) to test the api

* Get Komik List

```http
  GET /komik-list?Parameter1=value&parameter2=value...
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `q`       | `string` | `title (any string)`       |
| `type`    | `string` | `Manga, Manhwa, Manhua, or Top`|
| `warna`   | `string` | `true or false (but string)`|
| `sort`    | `string` | `score`                    |
| `alphabet`| `string` | `az or za`                 |
| `limit`   | `integer`| `(any number)`             |

#### response:
```json
[{
    _id: String,
    title: String,
    thumb: String,
    score: Number,
    warna: Boolean,
    type: String,
    endpoint: String
}]
```

* Get Komik Detail

```http
  GET /komik-detail/${endpoint}
```
or
```http
  GET /komik-detail?Parameter1=value&parameter2=value...
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `endpoint`| `string` | endpoint e.g: `tokyo-ghoul`       |

or

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `q`       | `string` | `title (any string)`       |
| `type`    | `string` | `Manga, Manhwa, Manhua, or Top`|
| `genre`   | `string` | if genre more than one use `,` as a spliter eg: `Romance,Drama`|
| `sort`    | `string` | `score`                    |
| `alphabet`| `string` | `az or za`                 |
| `limit`   | `integer`| `(any number)`             |

#### response:
```json
[{
  _id: String,
  title: String,
  endpoint: String,
  thumb: String,
  score: String,
  scoredBy: String,
  relative: [{ title_ref: String, link_ref: String }],
  info: [{ 
    Status:  String, 
    Pengarang:  String, 
    Ilustrator:  String, 
    Grafis:  String, 
    Tema:  String, 
    Konten: String, 
    Official: String, 
    Jenis Komik:  String, 
    Retail:  String, 
    Informasi:  String 
    }],
  genre: [{ genre_title: String, genre_ref: String }],
  teaser: [{ teaser_image: String }],
  similar: [{ 
    similar_image: String, 
    similar_title: String, 
    similar_endpoint: String, 
    similar_desc: String 
    }]
}]
```
