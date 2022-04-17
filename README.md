# l'atelier test technique

node.js REST API to consult tennis players data

- get app
- install app
- use app
  - development
  - production
  - test
- endpoints table
- json response exemple

## get app

Clone the repo and install the dependencies.

```bash
git clone https://github.com/avinas-42/latelier.git

```



## install app
```bash
cd latelier
npm install
```

## use app
### development
```bash
npm run dev
```
### production
```bash
npm run start
```
### test
```bash
npm run test
```
## endpoints table

<img src="https://raw.githubusercontent.com/avinas-42/latelier/main/public/endpointsTable.png" alt="endpoints table" />

## json response exemple
get player by id
```json
{
  "id": 52,
  "firstname": "Novak",
  "lastname": "Djokovic",
  "shortname": "N.DJO",
  "sex": "M",
  "country": {
    "picture": "https://data.latelier.co/training/tennis_stats/resources/Serbie.png",
    "code": "SRB"
  },
  "picture": "https://data.latelier.co/training/tennis_stats/resources/Djokovic.png",
  "data": {
    "rank": 2,
    "points": 2542,
    "weight": 80000,
    "height": 188,
    "age": 31,
    "last": [
      1,
      1,
      1,
      1,
      1
    ]
  }
}
```
get all player sort by rank
```json
"players": [
    {
    "id": 52,
    "firstname": "Novak",
    ...
    },
    {
    "id": 95,
    "firstname": "Venus",
    ...
    },
    {
    "id": 65,
    "firstname": "Stan",
    ...
    }
]
```
get stats
```json
{
  "bestCountry": {
    "code": "SRB",
    "ratio": 1
  },
  "bmiMean": 23.357838995505837,
  "medianHeight": 185
}
```