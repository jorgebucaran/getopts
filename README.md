[![Build Status][travis-badge]][travis-link]
[![Slack Room][slack-badge]][slack-link]

# Fisherman Index

The index file list plugins, each consisting of the following fields:

```
name
url
plugin description
one or more tags
author
```

For example:

```
fishtape
https://github.com/fishery/fishtape
TAP producer and test harness
test tap harness runner
bucaran
```

## Submit

The easiest way to submit new plugins for registration is using the [submit] plugin:

```
fisher i submit
```

For usage see fisher help submit.

You can also submit a new plugin manually and create a pull request in this repository.

```fish
git clone https://github.com/fisherman/fisher-index
cd index
echo "$name\n$url\n$info\n$tags\n$author\n\n" >> index
git push origin master
```

## Disclaimer

All the plugins listed in this index are property of their respective owners. Follow the provided URL and see the bundled LICENSE or COPYING file for copyright information.

<!-- Badges -->

[slack-link]: https://fisherman-wharf.herokuapp.com/
[slack-badge]:  https://img.shields.io/badge/slack-join%20the%20chat-00B9FF.svg?style=flat-square
[travis-link]:  https://travis-ci.org/fisherman/fisher-index
[travis-badge]: https://img.shields.io/travis/fisherman/fisher-index.svg?style=flat-square
[fisherman]: https://github.com/fisherman/fisherman
[submit]: https://github.com/fishery/submit
