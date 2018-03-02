Instapooper
=============

Only tested on OS X with an Alcatel A392CC. It will:

1. Download an article from the internet
2. Convert it into a clean [readable](https://github.com/luin/readability) format and save it as an HTML file
3. Attempt to send that file to your phone using Bluetooth File Exchange dialog
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
$ instapooper url [-v] [--save-dir=./]
```

 - `url` (required) url to download
 - `--save-dir` set the directory to save file to (defaults to current directory)
 - `-v` enable verbose mode
