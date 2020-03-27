# Parsify Plugin Timezone

[![Build Status](https://travis-ci.com/parsify-dev/timezone.svg?branch=master)](https://travis-ci.com/parsify-dev/timezone) 
[![Coverage Status](https://coveralls.io/repos/github/parsify-dev/timezone/badge.svg?branch=master)](https://coveralls.io/github/parsify-dev/timezone?branch=master)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

## About

This plugin handles time zone conversion, as well as obtaining current time. Examples:

```
time
PST time
New York time
Time in Warsaw
```

## Install

```
$ npm install @parsify/core @parsify/timezone
```

## Usage

```js
import Parsify from '@parsify/core';
import parsifyPluginHelloWorld from '@parsify/timezone';

const parsify = new Parsify([
    parsifyPluginTimezone(key);
]);
```

## API

#### parsifyPluginTimezone(key)

##### key

Type: `string`

API key for [timezonedb](https://timezonedb.com/).

## License

MIT
