window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
var fs = null;

// Uncomment to start saving of log to FileSystem
if(window.requestFileSystem){
	//initFs();
}
	
function initFs() {
	window.requestFileSystem(window.TEMPORARY, 1024*1024, function(filesystem) {
		fs = filesystem;
		fs.root.getFile('log.txt', {create: true}, function(fileEntry) {
			console.log('Creating file...');
			appendFirst();
		}, errorHandler);
		console.log('Opened file system: ' + fs.name);
	}, errorHandler);
}

function errorHandler(e) {
  var msg = '';

  switch (e.code) {
	case FileError.QUOTA_EXCEEDED_ERR:
	  msg = 'QUOTA_EXCEEDED_ERR';
	  break;
	case FileError.NOT_FOUND_ERR:
	  msg = 'NOT_FOUND_ERR';
	  break;
	case FileError.SECURITY_ERR:
	  msg = 'SECURITY_ERR';
	  break;
	case FileError.INVALID_MODIFICATION_ERR:
	  msg = 'INVALID_MODIFICATION_ERR';
	  break;
	case FileError.INVALID_STATE_ERR:
	  msg = 'INVALID_STATE_ERR';
	  break;
	default:
	  msg = 'Unknown Error';
	  break;
  };

  console.log('Error: ' + msg);
}

function appendFirst() {
	fs.root.getFile('log.txt', {create: false}, function(fileEntry) {
	// Create a FileWriter object for our FileEntry (log.txt).
	fileEntry.createWriter(function(fileWriter) {
		
		fileWriter.onwriteend = function(e) {
			console.log('Write completed.');
		};

		fileWriter.onerror = function(e) {
			console.log('Write failed: ' + e.toString());
		};
		
		fileWriter.seek(0); // Start write position at start of file.

		// Create a new Blob and write it to log.txt.
		var blob = new Blob(['These are my console logs:\n'], {type: 'text/plain'});

		fileWriter.write(blob);

		}, errorHandler);

	}, errorHandler);

}

function fileAppend(text) {
	fs.root.getFile('log.txt', {create: false}, function(fileEntry) {
	
		// Create a FileWriter object for our FileEntry (log.txt).
		fileEntry.createWriter(function(fileWriter) {
			fileWriter.onerror = function(e) {
				console.log('Write failed: ' + e.toString());
			};
			
			fileWriter.seek(fileWriter.length); // Start write position at EOF.

			// Create a new Blob and write it to log.txt.
			var blob = new Blob([text + '\n'], {type: 'text/plain'});
			
			fileWriter.write(blob);

			}, errorHandler);

		}, errorHandler);

}