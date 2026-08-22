# Tyepescript HTML Template Engine

## Installation
```
npm i minimal-te
```
### import
```
import minimalTE from 'minimal-te'
```
Supports ES Modules.
Exports minimalTE as function.

## Features
-replace <% %> with second parameter
-make table with the data of second parameter
-make list with the data of second parameter

## examples

### simply replacing placeholders 

html
```
<p>Today's chance of rain:  <% possibility %>%</p>
```
code
```
let embedObject: any[] = [];

const possibility = (Math.random() * 100).toFixed(2);
embedObject.push({ possibility: possibility });

const result = minimalTE(html, embedObject);
```
### create the table 

html
```
<table class="table-style">
    <thead>
        <th>Kind</th>
        <th>Receiver</th>
        <th>SendText</th>
    </thead>
    <tbody>
        <%table tableObject %>
    </tbody>
</table>
```
code
```
let embedObject: any[] = [];

embedObject.push({ tableObject: [
  { Kind: 'greeting', Receiver: 'colllegue', SendText: 'Hello' },
  { Kind: 'apologize', Receiver: 'customer', SendText: 'Sorry' }
] });

embedObject.push({ possibility: possibility });

const result = minimalTE(html, embedObject);
```

## Badge

```md
[![NPM](https://nodei.co/npm/minimal-te.svg)](https://nodei.co/npm/minimal-te/)
```