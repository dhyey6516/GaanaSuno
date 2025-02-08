function f(userId, playlistId, options, callback) {
    var request = WebApiRequest.builder()
      .withPath('/v1/users/' + encodeURI(userId) + '/playlists/' + playlistId)
      .build();

    _addAccessToken(request, this.getAccessToken());
    _addQueryParameters(request, options);

    var promise = _performRequest(HttpManager.get, request);

    if (callback) {
      promise.then(function(data) {
        callback(null, data);
      }, function(err) {
        callback(err);
      });
    } else {
      return promise;
    }
  };