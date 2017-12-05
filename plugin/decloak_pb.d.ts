// package: decloak
// file: decloak.proto

import * as jspb from "google-protobuf";

export class FetchURL extends jspb.Message {
  getUrl(): string;
  setUrl(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FetchURL.AsObject;
  static toObject(includeInstance: boolean, msg: FetchURL): FetchURL.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FetchURL, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FetchURL;
  static deserializeBinaryFromReader(message: FetchURL, reader: jspb.BinaryReader): FetchURL;
}

export namespace FetchURL {
  export type AsObject = {
    url: string,
  }
}

export class WebPage extends jspb.Message {
  getUrl(): string;
  setUrl(value: string): void;

  getStatus(): number;
  setStatus(value: number): void;

  getReason(): string;
  setReason(value: string): void;

  getRedirtype(): WebPage.RedirectType;
  setRedirtype(value: WebPage.RedirectType): void;

  getRedirurl(): string;
  setRedirurl(value: string): void;

  clearHeadersList(): void;
  getHeadersList(): Array<WebPage.KeyVal>;
  setHeadersList(value: Array<WebPage.KeyVal>): void;
  addHeaders(value?: WebPage.KeyVal, index?: number): WebPage.KeyVal;

  getBody(): string;
  setBody(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WebPage.AsObject;
  static toObject(includeInstance: boolean, msg: WebPage): WebPage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WebPage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WebPage;
  static deserializeBinaryFromReader(message: WebPage, reader: jspb.BinaryReader): WebPage;
}

export namespace WebPage {
  export type AsObject = {
    url: string,
    status: number,
    reason: string,
    redirtype: WebPage.RedirectType,
    redirurl: string,
    headersList: Array<WebPage.KeyVal.AsObject>,
    body: string,
  }

  export class KeyVal extends jspb.Message {
    getKey(): string;
    setKey(value: string): void;

    getVal(): string;
    setVal(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): KeyVal.AsObject;
    static toObject(includeInstance: boolean, msg: KeyVal): KeyVal.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: KeyVal, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): KeyVal;
    static deserializeBinaryFromReader(message: KeyVal, reader: jspb.BinaryReader): KeyVal;
  }

  export namespace KeyVal {
    export type AsObject = {
      key: string,
      val: string,
    }
  }

  export enum RedirectType {
    NONE = 0,
    HTTP = 1,
    BODY = 2,
  }
}

export class MlResponse extends jspb.Message {
  getCloaked(): boolean;
  setCloaked(value: boolean): void;

  getResponse(): string;
  setResponse(value: string): void;

  getErr(): MlResponse.ErrorType;
  setErr(value: MlResponse.ErrorType): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MlResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MlResponse): MlResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MlResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MlResponse;
  static deserializeBinaryFromReader(message: MlResponse, reader: jspb.BinaryReader): MlResponse;
}

export namespace MlResponse {
  export type AsObject = {
    cloaked: boolean,
    response: string,
    err: MlResponse.ErrorType,
  }

  export enum ErrorType {
    NONE = 0,
    PROXY_FAILURE = 1,
    MODULE_FAILURE = 2,
  }
}

export class ListWebPage extends jspb.Message {
  clearWebpagesList(): void;
  getWebpagesList(): Array<WebPage>;
  setWebpagesList(value: Array<WebPage>): void;
  addWebpages(value?: WebPage, index?: number): WebPage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListWebPage.AsObject;
  static toObject(includeInstance: boolean, msg: ListWebPage): ListWebPage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListWebPage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListWebPage;
  static deserializeBinaryFromReader(message: ListWebPage, reader: jspb.BinaryReader): ListWebPage;
}

export namespace ListWebPage {
  export type AsObject = {
    webpagesList: Array<WebPage.AsObject>,
  }
}

