/**
 * @fileoverview
 * @enhanceable
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.decloak.FetchURL', null, global);
goog.exportSymbol('proto.decloak.ListWebPage', null, global);
goog.exportSymbol('proto.decloak.MlResponse', null, global);
goog.exportSymbol('proto.decloak.MlResponse.ErrorType', null, global);
goog.exportSymbol('proto.decloak.WebPage', null, global);
goog.exportSymbol('proto.decloak.WebPage.KeyVal', null, global);
goog.exportSymbol('proto.decloak.WebPage.RedirectType', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.decloak.FetchURL = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.decloak.FetchURL, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.decloak.FetchURL.displayName = 'proto.decloak.FetchURL';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.decloak.FetchURL.prototype.toObject = function(opt_includeInstance) {
  return proto.decloak.FetchURL.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.decloak.FetchURL} msg The msg instance to transform.
 * @return {!Object}
 */
proto.decloak.FetchURL.toObject = function(includeInstance, msg) {
  var f, obj = {
    url: msg.getUrl()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.decloak.FetchURL}
 */
proto.decloak.FetchURL.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.decloak.FetchURL;
  return proto.decloak.FetchURL.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.decloak.FetchURL} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.decloak.FetchURL}
 */
proto.decloak.FetchURL.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUrl(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.decloak.FetchURL} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.decloak.FetchURL.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.decloak.FetchURL.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.decloak.FetchURL.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getUrl();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.decloak.FetchURL} The clone.
 */
proto.decloak.FetchURL.prototype.cloneMessage = function() {
  return /** @type {!proto.decloak.FetchURL} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string URL = 1;
 * @return {string}
 */
proto.decloak.FetchURL.prototype.getUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.decloak.FetchURL.prototype.setUrl = function(value) {
  jspb.Message.setField(this, 1, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.decloak.WebPage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.decloak.WebPage.repeatedFields_, null);
};
goog.inherits(proto.decloak.WebPage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.decloak.WebPage.displayName = 'proto.decloak.WebPage';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.decloak.WebPage.repeatedFields_ = [6];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.decloak.WebPage.prototype.toObject = function(opt_includeInstance) {
  return proto.decloak.WebPage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.decloak.WebPage} msg The msg instance to transform.
 * @return {!Object}
 */
proto.decloak.WebPage.toObject = function(includeInstance, msg) {
  var f, obj = {
    url: msg.getUrl(),
    status: msg.getStatus(),
    reason: msg.getReason(),
    redirtype: msg.getRedirtype(),
    redirurl: msg.getRedirurl(),
    headersList: jspb.Message.toObjectList(msg.getHeadersList(),
    proto.decloak.WebPage.KeyVal.toObject, includeInstance),
    body: msg.getBody()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.decloak.WebPage}
 */
proto.decloak.WebPage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.decloak.WebPage;
  return proto.decloak.WebPage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.decloak.WebPage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.decloak.WebPage}
 */
proto.decloak.WebPage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUrl(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStatus(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setReason(value);
      break;
    case 4:
      var value = /** @type {!proto.decloak.WebPage.RedirectType} */ (reader.readEnum());
      msg.setRedirtype(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setRedirurl(value);
      break;
    case 6:
      var value = new proto.decloak.WebPage.KeyVal;
      reader.readMessage(value,proto.decloak.WebPage.KeyVal.deserializeBinaryFromReader);
      msg.getHeadersList().push(value);
      msg.setHeadersList(msg.getHeadersList());
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setBody(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.decloak.WebPage} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.decloak.WebPage.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.decloak.WebPage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.decloak.WebPage.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getUrl();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getStatus();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = this.getReason();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = this.getRedirtype();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
  f = this.getRedirurl();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = this.getHeadersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      proto.decloak.WebPage.KeyVal.serializeBinaryToWriter
    );
  }
  f = this.getBody();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.decloak.WebPage} The clone.
 */
proto.decloak.WebPage.prototype.cloneMessage = function() {
  return /** @type {!proto.decloak.WebPage} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string URL = 1;
 * @return {string}
 */
proto.decloak.WebPage.prototype.getUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.decloak.WebPage.prototype.setUrl = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional int32 status = 2;
 * @return {number}
 */
proto.decloak.WebPage.prototype.getStatus = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 2, 0));
};


/** @param {number} value  */
proto.decloak.WebPage.prototype.setStatus = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional string reason = 3;
 * @return {string}
 */
proto.decloak.WebPage.prototype.getReason = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 3, ""));
};


/** @param {string} value  */
proto.decloak.WebPage.prototype.setReason = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional RedirectType redirtype = 4;
 * @return {!proto.decloak.WebPage.RedirectType}
 */
proto.decloak.WebPage.prototype.getRedirtype = function() {
  return /** @type {!proto.decloak.WebPage.RedirectType} */ (jspb.Message.getFieldProto3(this, 4, 0));
};


/** @param {!proto.decloak.WebPage.RedirectType} value  */
proto.decloak.WebPage.prototype.setRedirtype = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * optional string redirURL = 5;
 * @return {string}
 */
proto.decloak.WebPage.prototype.getRedirurl = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 5, ""));
};


/** @param {string} value  */
proto.decloak.WebPage.prototype.setRedirurl = function(value) {
  jspb.Message.setField(this, 5, value);
};


/**
 * repeated KeyVal headers = 6;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.decloak.WebPage.KeyVal>}
 */
proto.decloak.WebPage.prototype.getHeadersList = function() {
  return /** @type{!Array.<!proto.decloak.WebPage.KeyVal>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.decloak.WebPage.KeyVal, 6));
};


/** @param {Array.<!proto.decloak.WebPage.KeyVal>|undefined} value  */
proto.decloak.WebPage.prototype.setHeadersList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 6, value);
};


proto.decloak.WebPage.prototype.clearHeadersList = function() {
  this.setHeadersList([]);
};


/**
 * optional string body = 7;
 * @return {string}
 */
proto.decloak.WebPage.prototype.getBody = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 7, ""));
};


/** @param {string} value  */
proto.decloak.WebPage.prototype.setBody = function(value) {
  jspb.Message.setField(this, 7, value);
};


/**
 * @enum {number}
 */
proto.decloak.WebPage.RedirectType = {
  NONE: 0,
  HTTP: 1,
  BODY: 2
};


/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.decloak.WebPage.KeyVal = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.decloak.WebPage.KeyVal, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.decloak.WebPage.KeyVal.displayName = 'proto.decloak.WebPage.KeyVal';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.decloak.WebPage.KeyVal.prototype.toObject = function(opt_includeInstance) {
  return proto.decloak.WebPage.KeyVal.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.decloak.WebPage.KeyVal} msg The msg instance to transform.
 * @return {!Object}
 */
proto.decloak.WebPage.KeyVal.toObject = function(includeInstance, msg) {
  var f, obj = {
    key: msg.getKey(),
    val: msg.getVal()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.decloak.WebPage.KeyVal}
 */
proto.decloak.WebPage.KeyVal.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.decloak.WebPage.KeyVal;
  return proto.decloak.WebPage.KeyVal.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.decloak.WebPage.KeyVal} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.decloak.WebPage.KeyVal}
 */
proto.decloak.WebPage.KeyVal.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setKey(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setVal(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.decloak.WebPage.KeyVal} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.decloak.WebPage.KeyVal.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.decloak.WebPage.KeyVal.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.decloak.WebPage.KeyVal.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getKey();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getVal();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.decloak.WebPage.KeyVal} The clone.
 */
proto.decloak.WebPage.KeyVal.prototype.cloneMessage = function() {
  return /** @type {!proto.decloak.WebPage.KeyVal} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string key = 1;
 * @return {string}
 */
proto.decloak.WebPage.KeyVal.prototype.getKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.decloak.WebPage.KeyVal.prototype.setKey = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string val = 2;
 * @return {string}
 */
proto.decloak.WebPage.KeyVal.prototype.getVal = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/** @param {string} value  */
proto.decloak.WebPage.KeyVal.prototype.setVal = function(value) {
  jspb.Message.setField(this, 2, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.decloak.MlResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.decloak.MlResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.decloak.MlResponse.displayName = 'proto.decloak.MlResponse';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.decloak.MlResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.decloak.MlResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.decloak.MlResponse} msg The msg instance to transform.
 * @return {!Object}
 */
proto.decloak.MlResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    cloaked: msg.getCloaked(),
    response: msg.getResponse(),
    err: msg.getErr()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.decloak.MlResponse}
 */
proto.decloak.MlResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.decloak.MlResponse;
  return proto.decloak.MlResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.decloak.MlResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.decloak.MlResponse}
 */
proto.decloak.MlResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setCloaked(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setResponse(value);
      break;
    case 3:
      var value = /** @type {!proto.decloak.MlResponse.ErrorType} */ (reader.readEnum());
      msg.setErr(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.decloak.MlResponse} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.decloak.MlResponse.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.decloak.MlResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.decloak.MlResponse.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getCloaked();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = this.getResponse();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = this.getErr();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.decloak.MlResponse} The clone.
 */
proto.decloak.MlResponse.prototype.cloneMessage = function() {
  return /** @type {!proto.decloak.MlResponse} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional bool cloaked = 1;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.decloak.MlResponse.prototype.getCloaked = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldProto3(this, 1, false));
};


/** @param {boolean} value  */
proto.decloak.MlResponse.prototype.setCloaked = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string response = 2;
 * @return {string}
 */
proto.decloak.MlResponse.prototype.getResponse = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/** @param {string} value  */
proto.decloak.MlResponse.prototype.setResponse = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional ErrorType Err = 3;
 * @return {!proto.decloak.MlResponse.ErrorType}
 */
proto.decloak.MlResponse.prototype.getErr = function() {
  return /** @type {!proto.decloak.MlResponse.ErrorType} */ (jspb.Message.getFieldProto3(this, 3, 0));
};


/** @param {!proto.decloak.MlResponse.ErrorType} value  */
proto.decloak.MlResponse.prototype.setErr = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * @enum {number}
 */
proto.decloak.MlResponse.ErrorType = {
  NONE: 0,
  PROXY_FAILURE: 1,
  MODULE_FAILURE: 2
};


/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.decloak.ListWebPage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.decloak.ListWebPage.repeatedFields_, null);
};
goog.inherits(proto.decloak.ListWebPage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.decloak.ListWebPage.displayName = 'proto.decloak.ListWebPage';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.decloak.ListWebPage.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.decloak.ListWebPage.prototype.toObject = function(opt_includeInstance) {
  return proto.decloak.ListWebPage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.decloak.ListWebPage} msg The msg instance to transform.
 * @return {!Object}
 */
proto.decloak.ListWebPage.toObject = function(includeInstance, msg) {
  var f, obj = {
    webpagesList: jspb.Message.toObjectList(msg.getWebpagesList(),
    proto.decloak.WebPage.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.decloak.ListWebPage}
 */
proto.decloak.ListWebPage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.decloak.ListWebPage;
  return proto.decloak.ListWebPage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.decloak.ListWebPage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.decloak.ListWebPage}
 */
proto.decloak.ListWebPage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.decloak.WebPage;
      reader.readMessage(value,proto.decloak.WebPage.deserializeBinaryFromReader);
      msg.getWebpagesList().push(value);
      msg.setWebpagesList(msg.getWebpagesList());
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.decloak.ListWebPage} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.decloak.ListWebPage.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.decloak.ListWebPage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.decloak.ListWebPage.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getWebpagesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.decloak.WebPage.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.decloak.ListWebPage} The clone.
 */
proto.decloak.ListWebPage.prototype.cloneMessage = function() {
  return /** @type {!proto.decloak.ListWebPage} */ (jspb.Message.cloneMessage(this));
};


/**
 * repeated WebPage WebPages = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.decloak.WebPage>}
 */
proto.decloak.ListWebPage.prototype.getWebpagesList = function() {
  return /** @type{!Array.<!proto.decloak.WebPage>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.decloak.WebPage, 1));
};


/** @param {Array.<!proto.decloak.WebPage>|undefined} value  */
proto.decloak.ListWebPage.prototype.setWebpagesList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


proto.decloak.ListWebPage.prototype.clearWebpagesList = function() {
  this.setWebpagesList([]);
};


goog.object.extend(exports, proto.decloak);