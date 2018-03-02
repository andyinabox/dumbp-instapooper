Instapooper
=============

A dumb tool for sending dumb articles to my dumbphone. Only tested on OS X with an Alcatel A392CC. It will:

1. Download an article from the internet
2. Convert it into a clean [readable](https://github.com/luin/readability) format and save it as an HTML file
3. Attempt to send that file to your phone using Bluetooth File Exchange
4. Delete the file when it's done

## Installation

```
git clone https://github.com/andyinabox/dumbp-instapooper.git
cd dumbp-instapooper
npm link
```

## Usage

It's pretty straightforward.

```
$ instapooper [url] [--save-dir=./]
```