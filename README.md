# nooch

A food nutrition app written in [Express.js](https://expressjs.com/).

## Set up

```
$ git clone git@github.com:Timothy-Pulliam/nooch.git
$ cd nooch
$ npm i
```

Edit environment variables, and start the application

```
$ cp .env.template .env
$ npm run dev
```

(optional) build a docker image using docker-compose.

```
$ docker-compose up --build
```

## Nutritionx

https://publicapis.io/nutritionix-api

Documentation
https://docs.google.com/document/d/1_q-K-ObMTZvO0qUEAxROrN3bwMujwAN25sLHwJzliK0/edit

Example Request

```javascript
axios
  .post("https://trackapi.nutritionix.com/v2/natural/nutrients", data)
  .then(function (response) {
    console.log(response.data.foods);
  })
  .catch(function (error) {
    console.log(error);
  });
```

Example Response

```javascript
[
  {
    food_name: 'apple',
    brand_name: null,
    serving_qty: 1,
    serving_unit: 'medium (3" dia)',
    serving_weight_grams: 182,
    nf_calories: 94.64,
    nf_total_fat: 0.31,
    nf_saturated_fat: 0.05,
    nf_cholesterol: 0,
    nf_sodium: 1.82,
    nf_total_carbohydrate: 25.13,
    nf_dietary_fiber: 4.37,
    nf_sugars: 18.91,
    nf_protein: 0.47,
    nf_potassium: 194.74,
    nf_p: 20.02,
    full_nutrients: [
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      ... 2 more items
    ],
    nix_brand_name: null,
    nix_brand_id: null,
    nix_item_name: null,
    nix_item_id: null,
    upc: null,
    consumed_at: '2023-09-24T01:04:45+00:00',
    metadata: { is_raw_food: false },
    source: 1,
    ndb_no: 9003,
    tags: {
      item: 'apple',
      measure: null,
      quantity: '1.0',
      food_group: 3,
      tag_id: 384
    },
    alt_measures: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ],
    lat: null,
    lng: null,
    meal_type: 5,
    photo: {
      thumb: 'https://nix-tag-images.s3.amazonaws.com/384_thumb.jpg',
      highres: 'https://nix-tag-images.s3.amazonaws.com/384_highres.jpg',
      is_user_uploaded: false
    },
    sub_recipe: null,
    class_code: null,
    brick_code: null,
    tag_id: null
  }
]
```
