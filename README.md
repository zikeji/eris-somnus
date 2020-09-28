# eris-somnus

[![npm](https://img.shields.io/npm/v/eris-somnus)][npm]
[![visit docs](https://img.shields.io/badge/docs-TypeDoc-informational)][docs]
[![Snyk Vulnerabilities for npm package version](https://img.shields.io/snyk/vulnerabilities/npm/eris-somnus)][npm]
[![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/eris-somnus)][npm]
[![GitHub license](https://img.shields.io/github/license/zikeji/eris-somnus)](https://github.com/zikeji/eris-somnus/blob/master/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/zikeji/eris-somnus)][github]
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/zikeji/eris-somnus)][github]
[![GitHub issues](https://img.shields.io/github/issues/zikeji/eris-somnus)](https://github.com/zikeji/eris-somnus/issues)
[![Coveralls github](https://img.shields.io/coveralls/github/zikeji/eris-somnus)][github]
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/zikeji/eris-somnus/Lint,%20Test,%20Build,%20&%20Coverage)][github]

[npm]: https://www.npmjs.com/package/eris-somnus
[github]: https://github.com/zikeji/eris-somnus
[docs]: https://eris-somnus.zikeji.com

> Named after the Roman god of sleep [Somnus](https://mythology.wikia.org/wiki/Somnus), so as not to betray the likely outcome of this package.

### About

Just another Discord bot framework. Being created for personal use based around [eris](https://github.com/abalabahaha/eris) & [eris-fleet](https://github.com/danclay/eris-fleet). The intent is to create a easily typed framework that can be readily extended and made to fit a variety of different purposes.

### ALPHA WARNING

This package is not ready for public consumption.

### [v1.0.0 Milestone](https://github.com/zikeji/eris-somnus/milestone/1)

The [GitHub milestone](https://github.com/zikeji/eris-somnus/milestone/1) will be used to track features related to a potential 1.0.0 release.

### Quick Start

The bare minimum at this time. With default modules loaded.

```typescript
import { SomnusClient } from "eris-somnus";

const client = new SomnusClient("discord-token");
client.connect(() => {
  console.log("connected");
});
```