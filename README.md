console-saver
=============

A simple set of functions that save Chrome console output to HTML5 filesystem. Instead calling console.log(), call this function from your JavaScript file:

'''
fileAppend(text);
'''

Example:
'''
fileAppend(JSON.stringify({ elapsed: timer.elapsed(), mtype: cmd, data: obj }));
'''

The logs should save to a file named log.txt, unless you specify otherwise in the initFs(), appendFirst(), and filedAppend() functions. To access the log file I use the [HTML5 FileSystem Explorer](https://chrome.google.com/webstore/detail/html5-filesystem-explorer/nhnjmpbdkieehidddbaeajffijockaea?hl=en-US) Chrome extension.