var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});

// .wrangler/tmp/bundle-l0DJ0K/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// .wrangler/tmp/pages-ALQ76m/functionsWorker-0.4032073521756121.mjs
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require2 = /* @__PURE__ */ ((x) => typeof __require !== "undefined" ? __require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof __require !== "undefined" ? __require : a)[b]
}) : x)(function(x) {
  if (typeof __require !== "undefined")
    return __require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require22() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
function checkURL2(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls2.has(url.toString())) {
      urls2.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
var urls2;
var init_checked_fetch = __esm({
  "../.wrangler/tmp/bundle-AODDXG/checked-fetch.js"() {
    urls2 = /* @__PURE__ */ new Set();
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        const [request, init] = argArray;
        checkURL2(request, init);
        return Reflect.apply(target, thisArg, argArray);
      }
    });
  }
});
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_functionsRoutes_0_37632616852471723();
    init_checked_fetch();
    init_modules_watch_stub();
  }
});
var init_modules_watch_stub = __esm({
  "../node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});
var require_error = __commonJS({
  "../node_modules/replicate/lib/error.js"(exports, module) {
    init_functionsRoutes_0_37632616852471723();
    init_checked_fetch();
    init_modules_watch_stub();
    var ApiError = class extends Error {
      /**
       * Creates a representation of an API error.
       *
       * @param {string} message - Error message
       * @param {Request} request - HTTP request
       * @param {Response} response - HTTP response
       * @returns {ApiError} - An instance of ApiError
       */
      constructor(message, request, response) {
        super(message);
        this.name = "ApiError";
        this.request = request;
        this.response = response;
      }
    };
    module.exports = ApiError;
  }
});
var require_identifier = __commonJS({
  "../node_modules/replicate/lib/identifier.js"(exports, module) {
    init_functionsRoutes_0_37632616852471723();
    init_checked_fetch();
    init_modules_watch_stub();
    var ModelVersionIdentifier = class {
      /*
       * @param {string} Required. The model owner.
       * @param {string} Required. The model name.
       * @param {string} The model version.
       */
      constructor(owner, name, version = null) {
        this.owner = owner;
        this.name = name;
        this.version = version;
      }
      /*
       * Parse a reference to a model version
       *
       * @param {string}
       * @returns {ModelVersionIdentifier}
       * @throws {Error} If the reference is invalid.
       */
      static parse(ref) {
        const match2 = ref.match(
          /^(?<owner>[^/]+)\/(?<name>[^/:]+)(:(?<version>.+))?$/
        );
        if (!match2) {
          throw new Error(
            `Invalid reference to model version: ${ref}. Expected format: owner/name or owner/name:version`
          );
        }
        const { owner, name, version } = match2.groups;
        return new ModelVersionIdentifier(owner, name, version);
      }
    };
    module.exports = ModelVersionIdentifier;
  }
});
var require_util = __commonJS({
  "../node_modules/replicate/lib/util.js"(exports, module) {
    init_functionsRoutes_0_37632616852471723();
    init_checked_fetch();
    init_modules_watch_stub();
    var ApiError = require_error();
    async function validateWebhook(requestData, secret) {
      let { id, timestamp, body, signature } = requestData;
      const signingSecret = secret || requestData.secret;
      if (requestData && requestData.headers && requestData.body) {
        id = requestData.headers.get("webhook-id");
        timestamp = requestData.headers.get("webhook-timestamp");
        signature = requestData.headers.get("webhook-signature");
        body = requestData.body;
      }
      if (body instanceof ReadableStream || body.readable) {
        try {
          body = await new Response(body).text();
        } catch (err) {
          throw new Error(`Error reading body: ${err.message}`);
        }
      } else if (isTypedArray(body)) {
        body = await new Blob([body]).text();
      } else if (typeof body !== "string") {
        throw new Error("Invalid body type");
      }
      if (!id || !timestamp || !signature) {
        throw new Error("Missing required webhook headers");
      }
      if (!body) {
        throw new Error("Missing required body");
      }
      if (!signingSecret) {
        throw new Error("Missing required secret");
      }
      const signedContent = `${id}.${timestamp}.${body}`;
      const computedSignature = await createHMACSHA256(
        signingSecret.split("_").pop(),
        signedContent
      );
      const expectedSignatures = signature.split(" ").map((sig) => sig.split(",")[1]);
      return expectedSignatures.some(
        (expectedSignature) => expectedSignature === computedSignature
      );
    }
    async function createHMACSHA256(secret, data) {
      const encoder = new TextEncoder();
      let crypto = globalThis.crypto;
      if (typeof crypto === "undefined" && typeof __require2 === "function") {
        crypto = __require2("node:crypto").webcrypto;
      }
      const key = await crypto.subtle.importKey(
        "raw",
        base64ToBytes(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      );
      const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
      return bytesToBase64(signature);
    }
    function base64ToBytes(base64) {
      return Uint8Array.from(atob(base64), (m) => m.codePointAt(0));
    }
    function bytesToBase64(bytes) {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(bytes)));
    }
    async function withAutomaticRetries(request, options = {}) {
      const shouldRetry = options.shouldRetry || (() => false);
      const maxRetries = options.maxRetries || 5;
      const interval = options.interval || 500;
      const jitter = options.jitter || 100;
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      let attempts = 0;
      do {
        let delay = interval * 2 ** attempts + Math.random() * jitter;
        try {
          const response = await request();
          if (response.ok || !shouldRetry(response)) {
            return response;
          }
        } catch (error) {
          if (error instanceof ApiError) {
            const retryAfter = error.response.headers.get("Retry-After");
            if (retryAfter) {
              if (!Number.isInteger(retryAfter)) {
                const date = new Date(retryAfter);
                if (!Number.isNaN(date.getTime())) {
                  delay = date.getTime() - (/* @__PURE__ */ new Date()).getTime();
                }
              } else {
                delay = retryAfter * 1e3;
              }
            }
          }
        }
        if (Number.isInteger(maxRetries) && maxRetries > 0) {
          if (Number.isInteger(delay) && delay > 0) {
            await sleep(interval * 2 ** (options.maxRetries - maxRetries));
          }
          attempts += 1;
        }
      } while (attempts < maxRetries);
      return request();
    }
    var MAX_DATA_URI_SIZE = 1e7;
    async function transformFileInputs(inputs) {
      let totalBytes = 0;
      const result = await transform(inputs, async (value) => {
        let buffer;
        let mime;
        if (value instanceof Blob) {
          buffer = await value.arrayBuffer();
          mime = value.type;
        } else if (isTypedArray(value)) {
          buffer = value;
        } else {
          return value;
        }
        totalBytes += buffer.byteLength;
        if (totalBytes > MAX_DATA_URI_SIZE) {
          throw new Error(
            `Combined filesize of prediction ${totalBytes} bytes exceeds 10mb limit for inline encoding, please provide URLs instead`
          );
        }
        const data = bytesToBase64(buffer);
        mime = mime ?? "application/octet-stream";
        return `data:${mime};base64,${data}`;
      });
      return result;
    }
    async function transform(value, mapper) {
      if (Array.isArray(value)) {
        let copy = [];
        for (const val of value) {
          copy = await transform(val, mapper);
        }
        return copy;
      }
      if (isPlainObject(value)) {
        const copy = {};
        for (const key of Object.keys(value)) {
          copy[key] = await transform(value[key], mapper);
        }
        return copy;
      }
      return await mapper(value);
    }
    function isTypedArray(arr) {
      return arr instanceof Int8Array || arr instanceof Int16Array || arr instanceof Int32Array || arr instanceof Uint8Array || arr instanceof Uint8ClampedArray || arr instanceof Uint16Array || arr instanceof Uint32Array || arr instanceof Float32Array || arr instanceof Float64Array;
    }
    function isPlainObject(value) {
      const isObjectLike = typeof value === "object" && value !== null;
      if (!isObjectLike || String(value) !== "[object Object]") {
        return false;
      }
      const proto = Object.getPrototypeOf(value);
      if (proto === null) {
        return true;
      }
      const Ctor = Object.prototype.hasOwnProperty.call(proto, "constructor") && proto.constructor;
      return typeof Ctor === "function" && Ctor instanceof Ctor && Function.prototype.toString.call(Ctor) === Function.prototype.toString.call(Object);
    }
    function parseProgressFromLogs(input) {
      const logs = typeof input === "object" && input.logs ? input.logs : input;
      if (!logs || typeof logs !== "string") {
        return null;
      }
      const pattern = /^\s*(\d+)%\s*\|.+?\|\s*(\d+)\/(\d+)/;
      const lines = logs.split("\n").reverse();
      for (const line of lines) {
        const matches = line.match(pattern);
        if (matches && matches.length === 4) {
          return {
            percentage: parseInt(matches[1], 10) / 100,
            current: parseInt(matches[2], 10),
            total: parseInt(matches[3], 10)
          };
        }
      }
      return null;
    }
    async function* streamAsyncIterator(stream) {
      const reader = stream.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done)
            return;
          yield value;
        }
      } finally {
        reader.releaseLock();
      }
    }
    module.exports = {
      transformFileInputs,
      validateWebhook,
      withAutomaticRetries,
      parseProgressFromLogs,
      streamAsyncIterator
    };
  }
});
var require_stream = __commonJS({
  "../node_modules/replicate/vendor/eventsource-parser/stream.js"(exports, module) {
    init_functionsRoutes_0_37632616852471723();
    init_checked_fetch();
    init_modules_watch_stub();
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, {
              get: () => from[key],
              enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable
            });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var input_exports = {};
    __export(input_exports, {
      EventSourceParserStream: () => EventSourceParserStream
    });
    module.exports = __toCommonJS(input_exports);
    function createParser(onParse) {
      let isFirstChunk;
      let buffer;
      let startingPosition;
      let startingFieldLength;
      let eventId;
      let eventName;
      let data;
      reset();
      return {
        feed,
        reset
      };
      function reset() {
        isFirstChunk = true;
        buffer = "";
        startingPosition = 0;
        startingFieldLength = -1;
        eventId = void 0;
        eventName = void 0;
        data = "";
      }
      function feed(chunk) {
        buffer = buffer ? buffer + chunk : chunk;
        if (isFirstChunk && hasBom(buffer)) {
          buffer = buffer.slice(BOM.length);
        }
        isFirstChunk = false;
        const length = buffer.length;
        let position = 0;
        let discardTrailingNewline = false;
        while (position < length) {
          if (discardTrailingNewline) {
            if (buffer[position] === "\n") {
              ++position;
            }
            discardTrailingNewline = false;
          }
          let lineLength = -1;
          let fieldLength = startingFieldLength;
          let character;
          for (let index = startingPosition; lineLength < 0 && index < length; ++index) {
            character = buffer[index];
            if (character === ":" && fieldLength < 0) {
              fieldLength = index - position;
            } else if (character === "\r") {
              discardTrailingNewline = true;
              lineLength = index - position;
            } else if (character === "\n") {
              lineLength = index - position;
            }
          }
          if (lineLength < 0) {
            startingPosition = length - position;
            startingFieldLength = fieldLength;
            break;
          } else {
            startingPosition = 0;
            startingFieldLength = -1;
          }
          parseEventStreamLine(buffer, position, fieldLength, lineLength);
          position += lineLength + 1;
        }
        if (position === length) {
          buffer = "";
        } else if (position > 0) {
          buffer = buffer.slice(position);
        }
      }
      function parseEventStreamLine(lineBuffer, index, fieldLength, lineLength) {
        if (lineLength === 0) {
          if (data.length > 0) {
            onParse({
              type: "event",
              id: eventId,
              event: eventName || void 0,
              data: data.slice(0, -1)
              // remove trailing newline
            });
            data = "";
            eventId = void 0;
          }
          eventName = void 0;
          return;
        }
        const noValue = fieldLength < 0;
        const field = lineBuffer.slice(
          index,
          index + (noValue ? lineLength : fieldLength)
        );
        let step = 0;
        if (noValue) {
          step = lineLength;
        } else if (lineBuffer[index + fieldLength + 1] === " ") {
          step = fieldLength + 2;
        } else {
          step = fieldLength + 1;
        }
        const position = index + step;
        const valueLength = lineLength - step;
        const value = lineBuffer.slice(position, position + valueLength).toString();
        if (field === "data") {
          data += value ? "".concat(value, "\n") : "\n";
        } else if (field === "event") {
          eventName = value;
        } else if (field === "id" && !value.includes("\0")) {
          eventId = value;
        } else if (field === "retry") {
          const retry = parseInt(value, 10);
          if (!Number.isNaN(retry)) {
            onParse({
              type: "reconnect-interval",
              value: retry
            });
          }
        }
      }
    }
    var BOM = [239, 187, 191];
    function hasBom(buffer) {
      return BOM.every((charCode, index) => buffer.charCodeAt(index) === charCode);
    }
    var EventSourceParserStream = class extends TransformStream {
      constructor() {
        let parser;
        super({
          start(controller) {
            parser = createParser((event) => {
              if (event.type === "event") {
                controller.enqueue(event);
              }
            });
          },
          transform(chunk) {
            parser.feed(chunk);
          }
        });
      }
    };
  }
});
var require_text_decoder_stream = __commonJS({
  "../node_modules/replicate/vendor/streams-text-encoding/text-decoder-stream.js"(exports, module) {
    init_functionsRoutes_0_37632616852471723();
    init_checked_fetch();
    init_modules_watch_stub();
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var input_exports = {};
    __export(input_exports, {
      TextDecoderStream: () => TextDecoderStream
    });
    module.exports = __toCommonJS(input_exports);
    var decDecoder = Symbol("decDecoder");
    var decTransform = Symbol("decTransform");
    var TextDecodeTransformer = class {
      constructor(decoder) {
        this.decoder_ = decoder;
      }
      transform(chunk, controller) {
        if (!(chunk instanceof ArrayBuffer || ArrayBuffer.isView(chunk))) {
          throw new TypeError("Input data must be a BufferSource");
        }
        const text = this.decoder_.decode(chunk, { stream: true });
        if (text.length !== 0) {
          controller.enqueue(text);
        }
      }
      flush(controller) {
        const text = this.decoder_.decode();
        if (text.length !== 0) {
          controller.enqueue(text);
        }
      }
    };
    var TextDecoderStream = class {
      constructor(label, options) {
        const decoder = new TextDecoder(label || "utf-8", options || {});
        this[decDecoder] = decoder;
        this[decTransform] = new TransformStream(new TextDecodeTransformer(decoder));
      }
      get encoding() {
        return this[decDecoder].encoding;
      }
      get fatal() {
        return this[decDecoder].fatal;
      }
      get ignoreBOM() {
        return this[decDecoder].ignoreBOM;
      }
      get readable() {
        return this[decTransform].readable;
      }
      get writable() {
        return this[decTransform].writable;
      }
    };
    var encEncoder = Symbol("encEncoder");
    var encTransform = Symbol("encTransform");
  }
});
var require_stream2 = __commonJS({
  "../node_modules/replicate/lib/stream.js"(exports, module) {
    init_functionsRoutes_0_37632616852471723();
    init_checked_fetch();
    init_modules_watch_stub();
    var ApiError = require_error();
    var { streamAsyncIterator } = require_util();
    var {
      EventSourceParserStream
    } = require_stream();
    var { TextDecoderStream } = typeof globalThis.TextDecoderStream === "undefined" ? require_text_decoder_stream() : globalThis;
    var ServerSentEvent = class {
      /**
       * Create a new server-sent event.
       *
       * @param {string} event The event name.
       * @param {string} data The event data.
       * @param {string} id The event ID.
       * @param {number} retry The retry time.
       */
      constructor(event, data, id, retry) {
        this.event = event;
        this.data = data;
        this.id = id;
        this.retry = retry;
      }
      /**
       * Convert the event to a string.
       */
      toString() {
        if (this.event === "output") {
          return this.data;
        }
        return "";
      }
    };
    function createReadableStream({ url, fetch: fetch2, options = {} }) {
      return new ReadableStream({
        async start(controller) {
          const init = {
            ...options,
            headers: {
              ...options.headers,
              Accept: "text/event-stream"
            }
          };
          const response = await fetch2(url, init);
          if (!response.ok) {
            const text = await response.text();
            const request = new Request(url, init);
            controller.error(
              new ApiError(
                `Request to ${url} failed with status ${response.status}: ${text}`,
                request,
                response
              )
            );
          }
          const stream = response.body.pipeThrough(new TextDecoderStream()).pipeThrough(new EventSourceParserStream());
          for await (const event of streamAsyncIterator(stream)) {
            if (event.event === "error") {
              controller.error(new Error(event.data));
              break;
            }
            controller.enqueue(
              new ServerSentEvent(event.event, event.data, event.id)
            );
            if (event.event === "done") {
              break;
            }
          }
          controller.close();
        }
      });
    }
    module.exports = {
      createReadableStream,
      ServerSentEvent
    };
  }
});
var require_accounts = __commonJS({
  "../node_modules/replicate/lib/accounts.js"(exports, module) {
    init_functionsRoutes_0_37632616852471723();
    init_checked_fetch();
    init_modules_watch_stub();
    async function getCurrentAccount() {
      const response = await this.request("/account", {
        method: "GET"
      });
      return response.json();
    }
    module.exports = {
      current: getCurrentAccount
    };
  }
});
var require_collections = __commonJS({
  "../node_modules/replicate/lib/collections.js"(exports, module) {
    init_functionsRoutes_0_37632616852471723();
    init_checked_fetch();
    init_modules_watch_stub();
    async function getCollection(collection_slug) {
      const response = await this.request(`/collections/${collection_slug}`, {
        method: "GET"
      });
      return response.json();
    }
    async function listCollections() {
      const response = await this.request("/collections", {
        method: "GET"
      });
      return response.json();
    }
    module.exports = { get: getCollection, list: listCollections };
  }
});
var require_deployments = __commonJS({
  "../node_modules/replicate/lib/deployments.js"(exports, module) {
    init_functionsRoutes_0_37632616852471723();
    init_checked_fetch();
    init_modules_watch_stub();
    var { transformFileInputs } = require_util();
    async function createPrediction(deployment_owner, deployment_name, options) {
      const { stream, input, ...data } = options;
      if (data.webhook) {
        try {
          new URL(data.webhook);
        } catch (err) {
          throw new Error("Invalid webhook URL");
        }
      }
      const response = await this.request(
        `/deployments/${deployment_owner}/${deployment_name}/predictions`,
        {
          method: "POST",
          data: {
            ...data,
            input: await transformFileInputs(input),
            stream
          }
        }
      );
      return response.json();
    }
    async function getDeployment(deployment_owner, deployment_name) {
      const response = await this.request(
        `/deployments/${deployment_owner}/${deployment_name}`,
        {
          method: "GET"
        }
      );
      return response.json();
    }
    async function createDeployment(deployment_config) {
      const response = await this.request("/deployments", {
        method: "POST",
        data: deployment_config
      });
      return response.json();
    }
    async function updateDeployment(deployment_owner, deployment_name, deployment_config) {
      const response = await this.request(
        `/deployments/${deployment_owner}/${deployment_name}`,
        {
          method: "PATCH",
          data: deployment_config
        }
      );
      return response.json();
    }
    async function listDeployments() {
      const response = await this.request("/deployments", {
        method: "GET"
      });
      return response.json();
    }
    module.exports = {
      predictions: {
        create: createPrediction
      },
      get: getDeployment,
      create: createDeployment,
      update: updateDeployment,
      list: listDeployments
    };
  }
});
var require_hardware = __commonJS({
  "../node_modules/replicate/lib/hardware.js"(exports, module) {
    init_functionsRoutes_0_37632616852471723();
    init_checked_fetch();
    init_modules_watch_stub();
    async function listHardware() {
      const response = await this.request("/hardware", {
        method: "GET"
      });
      return response.json();
    }
    module.exports = {
      list: listHardware
    };
  }
});
var require_models = __commonJS({
  "../node_modules/replicate/lib/models.js"(exports, module) {
    init_functionsRoutes_0_37632616852471723();
    init_checked_fetch();
    init_modules_watch_stub();
    async function getModel(model_owner, model_name) {
      const response = await this.request(`/models/${model_owner}/${model_name}`, {
        method: "GET"
      });
      return response.json();
    }
    async function listModelVersions(model_owner, model_name) {
      const response = await this.request(
        `/models/${model_owner}/${model_name}/versions`,
        {
          method: "GET"
        }
      );
      return response.json();
    }
    async function getModelVersion(model_owner, model_name, version_id) {
      const response = await this.request(
        `/models/${model_owner}/${model_name}/versions/${version_id}`,
        {
          method: "GET"
        }
      );
      return response.json();
    }
    async function listModels() {
      const response = await this.request("/models", {
        method: "GET"
      });
      return response.json();
    }
    async function createModel(model_owner, model_name, options) {
      const data = { owner: model_owner, name: model_name, ...options };
      const response = await this.request("/models", {
        method: "POST",
        data
      });
      return response.json();
    }
    module.exports = {
      get: getModel,
      list: listModels,
      create: createModel,
      versions: { list: listModelVersions, get: getModelVersion }
    };
  }
});
var require_predictions = __commonJS({
  "../node_modules/replicate/lib/predictions.js"(exports, module) {
    init_functionsRoutes_0_37632616852471723();
    init_checked_fetch();
    init_modules_watch_stub();
    var { transformFileInputs } = require_util();
    async function createPrediction(options) {
      const { model, version, stream, input, ...data } = options;
      if (data.webhook) {
        try {
          new URL(data.webhook);
        } catch (err) {
          throw new Error("Invalid webhook URL");
        }
      }
      let response;
      if (version) {
        response = await this.request("/predictions", {
          method: "POST",
          data: {
            ...data,
            input: await transformFileInputs(input),
            version,
            stream
          }
        });
      } else if (model) {
        response = await this.request(`/models/${model}/predictions`, {
          method: "POST",
          data: {
            ...data,
            input: await transformFileInputs(input),
            stream
          }
        });
      } else {
        throw new Error("Either model or version must be specified");
      }
      return response.json();
    }
    async function getPrediction(prediction_id) {
      const response = await this.request(`/predictions/${prediction_id}`, {
        method: "GET"
      });
      return response.json();
    }
    async function cancelPrediction(prediction_id) {
      const response = await this.request(`/predictions/${prediction_id}/cancel`, {
        method: "POST"
      });
      return response.json();
    }
    async function listPredictions() {
      const response = await this.request("/predictions", {
        method: "GET"
      });
      return response.json();
    }
    module.exports = {
      create: createPrediction,
      get: getPrediction,
      cancel: cancelPrediction,
      list: listPredictions
    };
  }
});
var require_trainings = __commonJS({
  "../node_modules/replicate/lib/trainings.js"(exports, module) {
    init_functionsRoutes_0_37632616852471723();
    init_checked_fetch();
    init_modules_watch_stub();
    async function createTraining(model_owner, model_name, version_id, options) {
      const { ...data } = options;
      if (data.webhook) {
        try {
          new URL(data.webhook);
        } catch (err) {
          throw new Error("Invalid webhook URL");
        }
      }
      const response = await this.request(
        `/models/${model_owner}/${model_name}/versions/${version_id}/trainings`,
        {
          method: "POST",
          data
        }
      );
      return response.json();
    }
    async function getTraining(training_id) {
      const response = await this.request(`/trainings/${training_id}`, {
        method: "GET"
      });
      return response.json();
    }
    async function cancelTraining(training_id) {
      const response = await this.request(`/trainings/${training_id}/cancel`, {
        method: "POST"
      });
      return response.json();
    }
    async function listTrainings() {
      const response = await this.request("/trainings", {
        method: "GET"
      });
      return response.json();
    }
    module.exports = {
      create: createTraining,
      get: getTraining,
      cancel: cancelTraining,
      list: listTrainings
    };
  }
});
var require_webhooks = __commonJS({
  "../node_modules/replicate/lib/webhooks.js"(exports, module) {
    init_functionsRoutes_0_37632616852471723();
    init_checked_fetch();
    init_modules_watch_stub();
    async function getDefaultWebhookSecret() {
      const response = await this.request("/webhooks/default/secret", {
        method: "GET"
      });
      return response.json();
    }
    module.exports = {
      default: {
        secret: {
          get: getDefaultWebhookSecret
        }
      }
    };
  }
});
var require_package = __commonJS({
  "../node_modules/replicate/package.json"(exports, module) {
    module.exports = {
      name: "replicate",
      version: "0.29.1",
      description: "JavaScript client for Replicate",
      repository: "github:replicate/replicate-javascript",
      homepage: "https://github.com/replicate/replicate-javascript#readme",
      bugs: "https://github.com/replicate/replicate-javascript/issues",
      license: "Apache-2.0",
      main: "index.js",
      type: "commonjs",
      types: "index.d.ts",
      files: [
        "CONTRIBUTING.md",
        "LICENSE",
        "README.md",
        "index.d.ts",
        "index.js",
        "lib/**/*.js",
        "vendor/**/*",
        "package.json"
      ],
      engines: {
        node: ">=18.0.0",
        npm: ">=7.19.0",
        git: ">=2.11.0",
        yarn: ">=1.7.0"
      },
      scripts: {
        check: "tsc",
        format: "biome format . --write",
        "lint-biome": "biome lint .",
        "lint-publint": "publint",
        lint: "npm run lint-biome && npm run lint-publint",
        test: "jest"
      },
      optionalDependencies: {
        "readable-stream": ">=4.0.0"
      },
      devDependencies: {
        "@biomejs/biome": "^1.4.1",
        "@types/jest": "^29.5.3",
        "@typescript-eslint/eslint-plugin": "^5.56.0",
        "cross-fetch": "^3.1.5",
        jest: "^29.6.2",
        nock: "^14.0.0-beta.4",
        publint: "^0.2.7",
        "ts-jest": "^29.1.0",
        typescript: "^5.0.2"
      }
    };
  }
});
var require_replicate = __commonJS({
  "../node_modules/replicate/index.js"(exports, module) {
    init_functionsRoutes_0_37632616852471723();
    init_checked_fetch();
    init_modules_watch_stub();
    var ApiError = require_error();
    var ModelVersionIdentifier = require_identifier();
    var { createReadableStream } = require_stream2();
    var {
      withAutomaticRetries,
      validateWebhook,
      parseProgressFromLogs,
      streamAsyncIterator
    } = require_util();
    var accounts = require_accounts();
    var collections = require_collections();
    var deployments = require_deployments();
    var hardware = require_hardware();
    var models = require_models();
    var predictions = require_predictions();
    var trainings = require_trainings();
    var webhooks = require_webhooks();
    var packageJSON = require_package();
    var Replicate4 = class {
      /**
       * Create a new Replicate API client instance.
       *
       * @param {object} options - Configuration options for the client
       * @param {string} options.auth - API access token. Defaults to the `REPLICATE_API_TOKEN` environment variable.
       * @param {string} options.userAgent - Identifier of your app
       * @param {string} [options.baseUrl] - Defaults to https://api.replicate.com/v1
       * @param {Function} [options.fetch] - Fetch function to use. Defaults to `globalThis.fetch`
       */
      constructor(options = {}) {
        this.auth = options.auth || (typeof process !== "undefined" ? process.env.REPLICATE_API_TOKEN : null);
        this.userAgent = options.userAgent || `replicate-javascript/${packageJSON.version}`;
        this.baseUrl = options.baseUrl || "https://api.replicate.com/v1";
        this.fetch = options.fetch || globalThis.fetch;
        this.accounts = {
          current: accounts.current.bind(this)
        };
        this.collections = {
          list: collections.list.bind(this),
          get: collections.get.bind(this)
        };
        this.deployments = {
          get: deployments.get.bind(this),
          create: deployments.create.bind(this),
          update: deployments.update.bind(this),
          list: deployments.list.bind(this),
          predictions: {
            create: deployments.predictions.create.bind(this)
          }
        };
        this.hardware = {
          list: hardware.list.bind(this)
        };
        this.models = {
          get: models.get.bind(this),
          list: models.list.bind(this),
          create: models.create.bind(this),
          versions: {
            list: models.versions.list.bind(this),
            get: models.versions.get.bind(this)
          }
        };
        this.predictions = {
          create: predictions.create.bind(this),
          get: predictions.get.bind(this),
          cancel: predictions.cancel.bind(this),
          list: predictions.list.bind(this)
        };
        this.trainings = {
          create: trainings.create.bind(this),
          get: trainings.get.bind(this),
          cancel: trainings.cancel.bind(this),
          list: trainings.list.bind(this)
        };
        this.webhooks = {
          default: {
            secret: {
              get: webhooks.default.secret.get.bind(this)
            }
          }
        };
      }
      /**
       * Run a model and wait for its output.
       *
       * @param {string} ref - Required. The model version identifier in the format "owner/name" or "owner/name:version"
       * @param {object} options
       * @param {object} options.input - Required. An object with the model inputs
       * @param {object} [options.wait] - Options for waiting for the prediction to finish
       * @param {number} [options.wait.interval] - Polling interval in milliseconds. Defaults to 500
       * @param {string} [options.webhook] - An HTTPS URL for receiving a webhook when the prediction has new output
       * @param {string[]} [options.webhook_events_filter] - You can change which events trigger webhook requests by specifying webhook events (`start`|`output`|`logs`|`completed`)
       * @param {AbortSignal} [options.signal] - AbortSignal to cancel the prediction
       * @param {Function} [progress] - Callback function that receives the prediction object as it's updated. The function is called when the prediction is created, each time its updated while polling for completion, and when it's completed.
       * @throws {Error} If the reference is invalid
       * @throws {Error} If the prediction failed
       * @returns {Promise<object>} - Resolves with the output of running the model
       */
      async run(ref, options, progress) {
        const { wait, ...data } = options;
        const identifier = ModelVersionIdentifier.parse(ref);
        let prediction;
        if (identifier.version) {
          prediction = await this.predictions.create({
            ...data,
            version: identifier.version
          });
        } else if (identifier.owner && identifier.name) {
          prediction = await this.predictions.create({
            ...data,
            model: `${identifier.owner}/${identifier.name}`
          });
        } else {
          throw new Error("Invalid model version identifier");
        }
        if (progress) {
          progress(prediction);
        }
        const { signal } = options;
        prediction = await this.wait(
          prediction,
          wait || {},
          async (updatedPrediction) => {
            if (progress) {
              progress(updatedPrediction);
            }
            if (signal && signal.aborted) {
              await this.predictions.cancel(updatedPrediction.id);
              return true;
            }
            return false;
          }
        );
        if (progress) {
          progress(prediction);
        }
        if (prediction.status === "failed") {
          throw new Error(`Prediction failed: ${prediction.error}`);
        }
        return prediction.output;
      }
      /**
       * Make a request to the Replicate API.
       *
       * @param {string} route - REST API endpoint path
       * @param {object} options - Request parameters
       * @param {string} [options.method] - HTTP method. Defaults to GET
       * @param {object} [options.params] - Query parameters
       * @param {object|Headers} [options.headers] - HTTP headers
       * @param {object} [options.data] - Body parameters
       * @returns {Promise<Response>} - Resolves with the response object
       * @throws {ApiError} If the request failed
       */
      async request(route, options) {
        const { auth, baseUrl, userAgent } = this;
        let url;
        if (route instanceof URL) {
          url = route;
        } else {
          url = new URL(
            route.startsWith("/") ? route.slice(1) : route,
            baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`
          );
        }
        const { method = "GET", params = {}, data } = options;
        for (const [key, value] of Object.entries(params)) {
          url.searchParams.append(key, value);
        }
        const headers = {};
        if (auth) {
          headers["Authorization"] = `Token ${auth}`;
        }
        headers["Content-Type"] = "application/json";
        headers["User-Agent"] = userAgent;
        if (options.headers) {
          for (const [key, value] of Object.entries(options.headers)) {
            headers[key] = value;
          }
        }
        const init = {
          method,
          headers,
          body: data ? JSON.stringify(data) : void 0
        };
        const shouldRetry = method === "GET" ? (response2) => response2.status === 429 || response2.status >= 500 : (response2) => response2.status === 429;
        const _fetch = this.fetch;
        const response = await withAutomaticRetries(async () => _fetch(url, init), {
          shouldRetry
        });
        if (!response.ok) {
          const request = new Request(url, init);
          const responseText = await response.text();
          throw new ApiError(
            `Request to ${url} failed with status ${response.status} ${response.statusText}: ${responseText}.`,
            request,
            response
          );
        }
        return response;
      }
      /**
       * Stream a model and wait for its output.
       *
       * @param {string} identifier - Required. The model version identifier in the format "{owner}/{name}:{version}"
       * @param {object} options
       * @param {object} options.input - Required. An object with the model inputs
       * @param {string} [options.webhook] - An HTTPS URL for receiving a webhook when the prediction has new output
       * @param {string[]} [options.webhook_events_filter] - You can change which events trigger webhook requests by specifying webhook events (`start`|`output`|`logs`|`completed`)
       * @param {AbortSignal} [options.signal] - AbortSignal to cancel the prediction
       * @throws {Error} If the prediction failed
       * @yields {ServerSentEvent} Each streamed event from the prediction
       */
      async *stream(ref, options) {
        const { wait, ...data } = options;
        const identifier = ModelVersionIdentifier.parse(ref);
        let prediction;
        if (identifier.version) {
          prediction = await this.predictions.create({
            ...data,
            version: identifier.version,
            stream: true
          });
        } else if (identifier.owner && identifier.name) {
          prediction = await this.predictions.create({
            ...data,
            model: `${identifier.owner}/${identifier.name}`,
            stream: true
          });
        } else {
          throw new Error("Invalid model version identifier");
        }
        if (prediction.urls && prediction.urls.stream) {
          const { signal } = options;
          const stream = createReadableStream({
            url: prediction.urls.stream,
            fetch: this.fetch,
            options: { signal }
          });
          yield* streamAsyncIterator(stream);
        } else {
          throw new Error("Prediction does not support streaming");
        }
      }
      /**
       * Paginate through a list of results.
       *
       * @generator
       * @example
       * for await (const page of replicate.paginate(replicate.predictions.list) {
       *    console.log(page);
       * }
       * @param {Function} endpoint - Function that returns a promise for the next page of results
       * @yields {object[]} Each page of results
       */
      async *paginate(endpoint) {
        const response = await endpoint();
        yield response.results;
        if (response.next) {
          const nextPage = () => this.request(response.next, { method: "GET" }).then((r) => r.json());
          yield* this.paginate(nextPage);
        }
      }
      /**
       * Wait for a prediction to finish.
       *
       * If the prediction has already finished,
       * this function returns immediately.
       * Otherwise, it polls the API until the prediction finishes.
       *
       * @async
       * @param {object} prediction - Prediction object
       * @param {object} options - Options
       * @param {number} [options.interval] - Polling interval in milliseconds. Defaults to 500
       * @param {Function} [stop] - Async callback function that is called after each polling attempt. Receives the prediction object as an argument. Return false to cancel polling.
       * @throws {Error} If the prediction doesn't complete within the maximum number of attempts
       * @throws {Error} If the prediction failed
       * @returns {Promise<object>} Resolves with the completed prediction object
       */
      async wait(prediction, options, stop) {
        const { id } = prediction;
        if (!id) {
          throw new Error("Invalid prediction");
        }
        if (prediction.status === "succeeded" || prediction.status === "failed" || prediction.status === "canceled") {
          return prediction;
        }
        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const interval = options && options.interval || 500;
        let updatedPrediction = await this.predictions.get(id);
        while (updatedPrediction.status !== "succeeded" && updatedPrediction.status !== "failed" && updatedPrediction.status !== "canceled") {
          if (stop && await stop(updatedPrediction) === true) {
            break;
          }
          await sleep(interval);
          updatedPrediction = await this.predictions.get(prediction.id);
        }
        if (updatedPrediction.status === "failed") {
          throw new Error(`Prediction failed: ${updatedPrediction.error}`);
        }
        return updatedPrediction;
      }
    };
    module.exports = Replicate4;
    module.exports.validateWebhook = validateWebhook;
    module.exports.parseProgressFromLogs = parseProgressFromLogs;
  }
});
async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const prediction_id = url.searchParams.get("prediction_id");
  if (!prediction_id) {
    return new Response(
      JSON.stringify({ error: "prediction_id is required" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400
      }
    );
  }
  const replicateApiToken = context.env.REPLICATE_API_TOKEN;
  const replicate = new import_replicate.default({
    auth: replicateApiToken
  });
  const prediction = await replicate.predictions.cancel(prediction_id);
  return new Response(JSON.stringify(prediction), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}
var import_replicate;
var init_cancel_prediction = __esm({
  "api/cancel-prediction.js"() {
    init_functionsRoutes_0_37632616852471723();
    init_checked_fetch();
    init_modules_watch_stub();
    import_replicate = __toESM(require_replicate(), 1);
  }
});
async function onRequestPost(context) {
  const MODEL_ID = "8a89b0ab59a050244a751b6475d91041a8582ba33692ae6fab65e0c51b700328";
  const { image, prompt, num_samples, negative_prompt } = await context.request.json();
  const supabaseUrl = context.env.VITE_SUPABASE_URL;
  const replicateApiToken = context.env.REPLICATE_API_TOKEN;
  const replicate = new import_replicate2.default({
    auth: replicateApiToken
  });
  const prediction = await replicate.predictions.create({
    version: MODEL_ID,
    input: {
      image,
      prompt,
      negative_prompt,
      num_samples: parseInt(num_samples)
    }
  });
  return new Response(JSON.stringify(prediction), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}
var import_replicate2;
var init_create_prediction = __esm({
  "api/create-prediction.js"() {
    init_functionsRoutes_0_37632616852471723();
    init_checked_fetch();
    init_modules_watch_stub();
    import_replicate2 = __toESM(require_replicate(), 1);
  }
});
async function onRequestGet2(context) {
  const url = new URL(context.request.url);
  const prediction_id = url.searchParams.get("prediction_id");
  if (!prediction_id) {
    return new Response(
      JSON.stringify({ error: "prediction_id is required" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400
      }
    );
  }
  const replicateApiToken = context.env.REPLICATE_API_TOKEN;
  const replicate = new import_replicate3.default({
    auth: replicateApiToken
  });
  const prediction = await replicate.predictions.get(prediction_id);
  return new Response(JSON.stringify(prediction), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}
var import_replicate3;
var init_get_prediction = __esm({
  "api/get-prediction.js"() {
    init_functionsRoutes_0_37632616852471723();
    init_checked_fetch();
    init_modules_watch_stub();
    import_replicate3 = __toESM(require_replicate(), 1);
  }
});
var routes;
var init_functionsRoutes_0_37632616852471723 = __esm({
  "../.wrangler/tmp/pages-ALQ76m/functionsRoutes-0.37632616852471723.mjs"() {
    init_cancel_prediction();
    init_create_prediction();
    init_get_prediction();
    routes = [
      {
        routePath: "/api/cancel-prediction",
        mountPath: "/api",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet]
      },
      {
        routePath: "/api/create-prediction",
        mountPath: "/api",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost]
      },
      {
        routePath: "/api/get-prediction",
        mountPath: "/api",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet2]
      }
    ];
  }
});
init_functionsRoutes_0_37632616852471723();
init_checked_fetch();
init_modules_watch_stub();
init_functionsRoutes_0_37632616852471723();
init_checked_fetch();
init_modules_watch_stub();
init_functionsRoutes_0_37632616852471723();
init_checked_fetch();
init_modules_watch_stub();
init_functionsRoutes_0_37632616852471723();
init_checked_fetch();
init_modules_watch_stub();
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
  var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || defaultPattern,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            route += "((?:".concat(token.pattern, ")").concat(token.modifier, ")");
          } else {
            route += "(".concat(token.pattern, ")").concat(token.modifier);
          }
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: () => {
            isFailOpen = true;
          }
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    };
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = (response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
);
init_functionsRoutes_0_37632616852471723();
init_checked_fetch();
init_modules_watch_stub();
var drainBody = async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
};
var middleware_ensure_req_body_drained_default = drainBody;
init_functionsRoutes_0_37632616852471723();
init_checked_fetch();
init_modules_watch_stub();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
var jsonError = async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
};
var middleware_miniflare3_json_error_default = jsonError;
pages_template_worker_default.middleware = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default,
  ...pages_template_worker_default.middleware ?? []
].filter(Boolean);
var middleware_insertion_facade_default = pages_template_worker_default;
init_functionsRoutes_0_37632616852471723();
init_checked_fetch();
init_modules_watch_stub();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (worker.middleware === void 0 || worker.middleware.length === 0) {
    return worker;
  }
  for (const middleware of worker.middleware) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  };
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      };
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
function wrapWorkerEntrypoint(klass) {
  if (klass.middleware === void 0 || klass.middleware.length === 0) {
    return klass;
  }
  for (const middleware of klass.middleware) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody2 = async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
};
var middleware_ensure_req_body_drained_default2 = drainBody2;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError2(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError2(e.cause)
  };
}
var jsonError2 = async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError2(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
};
var middleware_miniflare3_json_error_default2 = jsonError2;

// .wrangler/tmp/bundle-l0DJ0K/middleware-insertion-facade.js
middleware_loader_entry_default.middleware = [
  middleware_ensure_req_body_drained_default2,
  middleware_miniflare3_json_error_default2,
  ...middleware_loader_entry_default.middleware ?? []
].filter(Boolean);
var middleware_insertion_facade_default2 = middleware_loader_entry_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__2 = [];
function __facade_register__2(...args) {
  __facade_middleware__2.push(...args.flat());
}
function __facade_invokeChain__2(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__2(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
function __facade_invoke__2(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__2(request, env, ctx, dispatch, [
    ...__facade_middleware__2,
    finalMiddleware
  ]);
}

// .wrangler/tmp/bundle-l0DJ0K/middleware-loader.entry.ts
var __Facade_ScheduledController__2 = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__2)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler2(worker) {
  if (worker.middleware === void 0 || worker.middleware.length === 0) {
    return worker;
  }
  for (const middleware of worker.middleware) {
    __facade_register__2(middleware);
  }
  const fetchDispatcher = function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  };
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__2(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      };
      return __facade_invoke__2(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
function wrapWorkerEntrypoint2(klass) {
  if (klass.middleware === void 0 || klass.middleware.length === 0) {
    return klass;
  }
  for (const middleware of klass.middleware) {
    __facade_register__2(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__2(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__2(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
var WRAPPED_ENTRY2;
if (typeof middleware_insertion_facade_default2 === "object") {
  WRAPPED_ENTRY2 = wrapExportedHandler2(middleware_insertion_facade_default2);
} else if (typeof middleware_insertion_facade_default2 === "function") {
  WRAPPED_ENTRY2 = wrapWorkerEntrypoint2(middleware_insertion_facade_default2);
}
var middleware_loader_entry_default2 = WRAPPED_ENTRY2;
export {
  middleware_loader_entry_default2 as default
};
//# sourceMappingURL=functionsWorker-0.4032073521756121.js.map
